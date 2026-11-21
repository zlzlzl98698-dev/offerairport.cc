---
title: "Clash Verge 分流规则与策略组实战：实现国内直连、海外代理与 AI 节点分流"
description: "详解 Mihomo 规则匹配顺序、策略组类型差异与 no-resolve 作用，附带可直接复用的 YAML Merge 防偷跑规则与 JS 全局扩展脚本（自动组建 AI 专用组），实现更新不覆盖。"
pubDate: 2026-10-22
updatedDate: 2026-11-21
category: "Clash Verge"
subtopic: "verge"
tags: ["Clash分流规则", "策略组", "AI分流", "Clash Verge", "Global Script"]
author: "机场优选编辑部"
pageType: "tutorial"
searchIntent: "informational"
platform: "Windows / macOS / Linux"
appVersion: "Clash Verge Rev v2.x (Mihomo)"
featured: false
urlPath: "/clash/verge-rules-and-proxy-groups/"
relatedSlugs:
  - "/clash/verge-complete-guide/"
  - "/clash/dns-fakeip-configuration-guide/"
  - "/clash/rule-vs-global-mode/"
  - "/resources/subscription-traffic-leak-fix/"
  - "/guides/multi-airport-failover-strategy/"
sources:
  - "Mihomo Rules、Proxy-Groups 与 Clash Verge Rev 全局扩展脚本规范"
faqs:
  - question: "为什么我把主节点切到香港后，ChatGPT 或 Claude 总是提示当前地区不可用？"
    answer: "因为 OpenAI 和 Anthropic 官方均对香港地区 IP 实施访问限制。通过分流规则把 `openai.com`、`chatgpt.com`、`claude.ai` 等域名单独指派给仅筛选日本、新加坡或美国节点的 `AI-Tools` 策略组，就能在不影响日常香港低延迟浏览的同时稳定使用 AI 工具。"
  - question: "规则列表是不是越多越好？塞入几万条自定义规则会拖慢网速吗？"
    answer: "并非越多越好。数万条未归并的零散文本规则会显著增加启动解析耗时与内存占用。Mihomo 内核内置了高性能二进制 `GeoSite` 与 `GeoIP` 数据库，仅用 `GEOSITE,cn,DIRECT` 和 `GEOIP,CN,DIRECT,no-resolve` 两行即可覆盖绝大部分国内直连，高效且精简。"
  - question: "在机场原生订阅 YAML 文件里直接改规则，为什么过几天又变回去了？"
    answer: "因为订阅开启自动更新或手动刷新后，远程下发的配置文件会完整覆盖本地订阅原文件。正确做法是在 Clash Verge Rev 中使用「全局扩展覆写（Merge）」或「全局扩展脚本（Script）」，这样每次订阅刷新后系统都会自动将你的自定义逻辑注入最新配置。"
  - question: "为什么不能把 AI 账号或网银服务放在 `load-balance` 负载均衡策略组里？"
    answer: "负载均衡策略组会把不同的请求分散到多个不同地区或不同出口 IP 的节点上，短时间内频繁切换登录 IP 极易触发 ChatGPT、Claude、PayPal 或银行风控系统的异地异常判定，导致封号或强制退出。关键会话类服务必须使用 `select`（手动指定单一稳定地区）或 `fallback`（主节点断线才切换）。"
  - question: "规则里的 `no-resolve` 参数起什么作用？什么时候必须加上它？"
    answer: "当规则类型为 `IP-CIDR`、`IP-CIDR6` 或 `GEOIP` 时，如果用户访问的是域名，内核必须先做一次 DNS 解析拿到 IP 才能对比这些 IP 规则。在配合 Fake-IP 或规则前置时，为不需要提前消耗本地解析的 IP 规则加上 `no-resolve`，可以避免提前触发慢速本地 DNS 查询并防止部分海外 IP 误泄漏解析。"
---

## 核心结论：用「主力香港/狮城 + AI 专用组 + 进程防偷跑」打造零干预分流

一套成熟的日常代理配置，应当做到无需频繁手动来回切换节点：网页、视频与开发工具走延迟最低的香港或邻近节点；**ChatGPT、Claude、Gemini** 等存在明确地区封锁的 AI 服务自动锁定日本、新加坡或美国节点；本地局域网、国内软件以及 **BT 下载/网盘/游戏更新器** 全程 `DIRECT` 直连，既保证本地满速，又杜绝订阅流量被后台下载软件无声偷跑。

要达成这种「一次配置、订阅更新不丢失」的自动化体验，核心在于掌握 **Mihomo 规则匹配引擎顺序**、**四大策略组特性**，以及 Clash Verge Rev 的 **全局扩展覆写（Merge）与扩展脚本（Script）**。更多内核 DNS 协同与原则总览可参考 [Mihomo DNS 与规则专题](/clash/#mihomo-dns-rules)。

---

## 一、Mihomo 规则匹配引擎的核心法则：自上而下，命中即停

无论你的配置文件里写了多少行规则，Mihomo 内核在处理每一条新建立的连接请求时，都严格遵守同一铁律：**从 `rules:` 列表的第一行开始自上而下逐条比对，一旦命中某一条符合条件的规则，立刻停止向下检查并直接执行该条指定的动作（策略组、`DIRECT` 或 `REJECT`）。**

因此，合理且不出错的规则优先级金字塔必须遵循以下五层结构：

1. **第一层（最高优先级）：进程防偷跑与高频人工特例**。例如将迅雷、qBittorrent、百度网盘等高流量 P2P/下载进程直接锁定 `DIRECT`，或强制将公司内网、个别需要特殊区域的网站排在最前。
2. **第二层：局域网与私有地址段直连**。包含 `192.168.0.0/16`、`10.0.0.0/8`、`127.0.0.0/8`、`GEOSITE,private`，防止内网 NAS、路由器后台被误送进代理隧道。
3. **第三层：专项业务分流（AI / 流媒体 / 广告屏蔽）**。将 `openai`、`anthropic`、`netflix` 等指派给特定策略组，将广告域名指派给 `REJECT`。
4. **第四层：国内域名与国内 IP 直连兜底**。用 `GEOSITE,cn,DIRECT` 与 `GEOIP,CN,DIRECT,no-resolve` 放行常规国内互联网流量。
5. **第五层（最低优先级）：全局终极兜底 `MATCH`**。所有前四层均未命中的未知海外站点与服务，统一由 `MATCH,节点选择` 交由主策略组代理出站。

> **最常见的顺序陷阱**：不少新手习惯直接把自写的规则追加到 `rules:` 末尾，殊不知原配置文件倒数第一行往往已经是 `MATCH,节点选择`——写在 `MATCH` 下方的任何规则永远都不会被执行。在 Clash Verge Rev 覆写中，新增自定义规则务必使用 **`prepend-rules`**（前置插入）或通过 JS `unshift` 压入数组头部。

---

## 二、常见规则语法与四大策略组类型实战对比

### 1. 高频规则类型速查表

| 规则类型 | 标准写法示例 | 匹配机理与性能说明 |
| :--- | :--- | :--- |
| **`DOMAIN-SUFFIX`** | `DOMAIN-SUFFIX,openai.com,AI-Tools` | 匹配主域名及所有子域名（如 `chat.openai.com`），**日常首选，效率极高** |
| **`DOMAIN`** | `DOMAIN,api.ipify.org,节点选择` | 仅精确匹配完全一致的单个域名，适合精准微调 |
| **`DOMAIN-KEYWORD`** | `DOMAIN-KEYWORD,claude,AI-Tools` | 域名任意位置包含关键词即命中，慎用短词以免误伤国内站点 |
| **`PROCESS-NAME`** | `PROCESS-NAME,qbittorrent.exe,DIRECT` | 按发起请求的本地进程文件名分流（Windows 含 `.exe`，macOS/Linux 不含） |
| **`IP-CIDR`** | `IP-CIDR,192.168.0.0/16,DIRECT,no-resolve` | 按目标 IP 网段匹配；加 `no-resolve` 可防止域名请求提前触发本地 DNS 解析 |
| **`GEOSITE` / `GEOIP`** | `GEOSITE,cn,DIRECT` | 直接调用 Mihomo 内置高效二进制地理库，大幅减少文本规则数量 |

### 2. 四大策略组（Proxy Groups）工作机制对比

机场订阅中的策略组并非都一样，选错类型往往是「账号风控」或「节点老是乱跳」的元凶：

| 策略组类型 | 调度逻辑 | 优缺点评估 | 典型适用场景 |
| :--- | :--- | :--- | :--- |
| **`select`（手动选择）** | 由用户在面板手动点击决定当前出口 | **IP 绝对稳定可控**，不会意外乱跳地区 | 主力日常浏览组、**AI 工具组、银行/支付/账号登录** |
| **`url-test`（自动测速）** | 定期对组内节点并发测速，自动选延迟最低者 | 省心免维护，但节点延迟抖动时可能频繁切换出口 IP | 轻量网页浏览、看视频等对 IP 一致性不敏感的场景 |
| **`fallback`（故障转移）** | 严格按列表顺序使用第一个可用节点，断线才切下一个 | 平时保持 IP 不变，挂了才自动灾备切换 | **主力 + 备用节点高可用容灾**（配合单向稳定性要求） |
| **`load-balance`（负载均衡）** | 按轮询或散列把不同连接分配到多个不同节点并发出站 | 提升并发吞吐，但**出口 IP 短时间剧烈漂移** | 仅适合多线并发爬虫或纯下载测试，**严禁用于 AI 与登录业务** |

---

## 三、用全局扩展覆写（Merge）保护流量与注入基础规则

永远不要直接去手动修改订阅页面里导入的原文件。点击订阅右侧或全局设置中的 **全局扩展覆写（Global Merge）**，每次订阅刷新都会自动将下面内容合并到最新配置中。

以下 Merge 模板专门用于解决两类最高频痛点：**阻止 BT/网盘/游戏更新器在 TUN 模式下偷跑流量**，以及**提前拦截常见系统遥测或特定域名**：

```yaml
prepend-rules:
  # 1. 防止高带宽下载/网盘/游戏平台在 TUN 模式下消耗机场流量
  - PROCESS-NAME,qbittorrent.exe,DIRECT
  - PROCESS-NAME,Transmission.exe,DIRECT
  - PROCESS-NAME,Thunder.exe,DIRECT
  - PROCESS-NAME,baidunetdisk.exe,DIRECT
  - PROCESS-NAME,AliyunDrive.exe,DIRECT
  - PROCESS-NAME,steam.exe,DIRECT
  # 2. Windows 平台常见局域网发现与连通性检测直连兜底
  - DOMAIN-SUFFIX,msftconnecttest.com,DIRECT
  - DOMAIN-SUFFIX,msftncsi.com,DIRECT
  # 3. 示例：强制某个工作专用域名固定直连或走指定已有策略组
  - DOMAIN-SUFFIX,github.com,节点选择
```

如果你的核心诉求是发现流量莫名快速见底，除了上述 `PROCESS-NAME` 拦截之外，也建议结合 [订阅流量异常暴涨排查指南](/resources/subscription-traffic-leak-fix/) 同步核验订阅凭证安全性。

---

## 四、用全局扩展脚本（Script）自动组建 `AI-Tools` 专用策略组

单纯的 YAML Merge 很难解决一个现实问题：**不同机场给节点起的名字千差万别**（有的叫 `美国 01`，有的叫 `[US] 洛杉矶`，还有的根本不知道原订阅主策略组叫 `节点选择` 还是 `Proxy`）。使用 Clash Verge Rev 内置的 **全局扩展脚本（JavaScript）**，可以动态读取当前机场真实节点名称，用正则表达式精准挑出支持 AI 的地区节点，安全组建专属策略组而不破坏原订阅结构。

进入 Clash Verge Rev「订阅」页面 → 启用并右键编辑 **全局扩展脚本（Global Script）**，填入以下经过容错设计的脚本：

```javascript
function main(config) {
  const proxies = Array.isArray(config.proxies) ? config.proxies : [];
  const proxyNames = proxies.map((p) => p.name);

  // 正则匹配美、日、新、台、韩等支持主流 AI 服务的节点名称（自动排除信息提示假节点）
  const aiCandidates = proxyNames.filter(
    (name) =>
      /(美国|日本|新加坡|狮城|台湾|韩国|US|JP|SG|TW|KR|America|Japan|Singapore)/i.test(name) &&
      !/(剩余流量|套餐到期|官网|重置|过期|异常)/i.test(name)
  );

  // 兜底保护：如果机场节点全不含上述关键词，则回退到所有可用节点，防止空策略组导致内核报错崩溃
  const groupProxies = aiCandidates.length > 0 ? aiCandidates : proxyNames;

  if (groupProxies.length > 0) {
    config["proxy-groups"] = Array.isArray(config["proxy-groups"])
      ? config["proxy-groups"]
      : [];

    // 避免重复注入同名策略组
    const exists = config["proxy-groups"].some((g) => g.name === "AI-Tools");
    if (!exists) {
      config["proxy-groups"].unshift({
        name: "AI-Tools",
        type: "select",
        proxies: groupProxies,
      });
    }

    const aiRules = [
      "DOMAIN-SUFFIX,openai.com,AI-Tools",
      "DOMAIN-SUFFIX,chatgpt.com,AI-Tools",
      "DOMAIN-SUFFIX,oaistatic.com,AI-Tools",
      "DOMAIN-SUFFIX,oaiusercontent.com,AI-Tools",
      "DOMAIN-SUFFIX,anthropic.com,AI-Tools",
      "DOMAIN-SUFFIX,claude.ai,AI-Tools",
      "DOMAIN-SUFFIX,gemini.google.com,AI-Tools",
      "DOMAIN-SUFFIX,aistudio.google.com,AI-Tools",
      "DOMAIN-SUFFIX,generativelanguage.googleapis.com,AI-Tools",
      "DOMAIN-SUFFIX,perplexity.ai,AI-Tools",
    ];

    config.rules = [...aiRules, ...(config.rules || [])];
  }

  return config;
}
```

### 脚本生效与验证步骤
1. 保存上述脚本后，回到「订阅」列表，**手动刷新一次当前激活的订阅**（或者点击全局脚本后的应用重载按钮）触发脚本注入。
2. 切换到左侧 **「代理」** 页面，如果最顶部出现了一个名为 **`AI-Tools`** 的策略组，且内部只包含美国、日本、新加坡等合规地区节点，说明注入成功。
3. 在 `AI-Tools` 组内手动点击选中一个延迟稳定、能通过检测的日本或美国节点；同时将你原本的 `节点选择` 主力策略组放心切回香港节点，日常高速访问与 AI 工具使用就此互不干扰。

---

## 五、`Rule-Providers` 外部规则集与内置 GeoSite 的取舍

有些进阶配置会挂载大量第三方远程 `rule-providers`（规则集合）。在 Mihomo 内核时代，**能用内置 `GEOSITE` 解决的基础分流（如 `GEOSITE,cn,DIRECT`、`GEOSITE,category-ads-all,REJECT`）尽量优先调用内核内置二进制库**，既不用等客户端冷启动时反复去 GitHub 拉取几十个规则文本，内存占用也更低。

只有当内置 GeoSite 尚未细化某类极小众域名（例如某特定科研数据库或冷门行业域名包），且你确实需要远程同步维护时，再在配置中挂载轻量化的 `behavior: domain`、格式为二进制 `.mrs` 或简洁 `.yaml` 的 `rule-providers` 规则集。同时留意 `interval: 86400` 更新周期，避免高频拉取消耗无谓连接。

---

## 六、多场景分层策略组设计与隐性排障坑位

### 1. 用 `url-test` 容差（`tolerance`）减少连接中断
如果你在脚本或自定义模板中希望除了手动选区的 `AI-Tools` 之外，再增设一个日常自动选择最低延迟的 `Auto-Fast` 策略组，千万要注意配置 **`interval`**（测速周期，建议 `300` 秒即 5 分钟以上，避免高频测速白白消耗并发）以及 **`tolerance`**（容差，建议设为 `50` 到 `100` 毫秒）。

没有设置 `tolerance` 时，哪怕两个节点的延迟只在 `42ms` 和 `45ms` 之间轻微波动，内核也会认为发生了「新最优节点」而瞬间把主流量切走，导致正在进行的 SSH 终端会话或长视频缓冲突然中断。加上 `tolerance: 80` 后，只有新节点比当前节点快出超过 80 毫秒时才会平滑切换，稳定性将成倍提升。

### 2. 分流规则实战中最易忽略的三个隐性坑位
- **`PROCESS-NAME` 在不同操作系统写法不一致**：在 Windows 下进程名必须完整包含 `.exe` 后缀（例如 `qbittorrent.exe`）；而在 macOS 与 Linux 上进程名没有 `.exe`，且部分应用实际发起网络请求的是内部 Helper 子进程（例如某些桌面端的 `Electron Helper`）。若发现某软件按名字拦截失败，最稳妥的方法是先打开软件发起一次请求，随后立刻在 Clash Verge Rev 的「连接」面板里直接查看内核实际捕获到的精确进程名，再原样抄写到规则中。
- **双栈环境下的 `IP-CIDR6` 遗漏**：如果你的电脑启用了 IPv6 而配置文件中仅写了 `IP-CIDR,192.168.0.0/16,DIRECT` 却忽略了本地 IPv6 私有网段（如 `fc00::/7` 或 `fe80::/10`），部分走 IPv6 的局域网传输或 NAS 互访仍可能落入末尾的 `MATCH` 兜底规则。不过只要在 `GEOSITE,private,DIRECT` 或 `dns:` 中合理配置 `ipv6: false`，通常即可避免此问题。
- **关键词规则误伤（`DOMAIN-KEYWORD` 慎用）**：尽量避免为了图省事而写诸如 `DOMAIN-KEYWORD,ai,AI-Tools` 或 `DOMAIN-KEYWORD,google,节点选择` 这类过短的词条。像国内无数带有 `ai` 拼音字母组合的网址（如 `zhaopin`、`baidu` 等含类似子串的非目标站点，或国内某企业域名刚好包含该字母片段）都可能被意外牵连。日常优先使用精确度高且支持树形索引的 **`DOMAIN-SUFFIX`**，兼顾准确性与极低 CPU 消耗。

---

## 七、如何验证规则是否真的命中？日志与连接实操排查

配置写好之后，千万不要靠「感觉网速变没变」来猜测是否生效。Clash Verge Rev 提供了极直观的运行时验证面板：

1. **在「连接（Connections）」面板实时追踪**：打开目标网页或启动某个应用，在「连接」列表顶部搜索框输入目标域名（例如 `claude.ai` 或 `steam`），观察该条记录右侧展示的 **「规则（Rule）」** 与 **「代理链路（Chains）」** 列。如果显示 `DOMAIN-SUFFIX,claude.ai -> AI-Tools -> 日本节点`，说明精确命中；如果显示 `MATCH -> 节点选择`，说明规则拼写或顺序排在了 `MATCH` 之后。
2. **排查「规则模式 vs 全局模式」误操作**：确认左上角或底部模式栏处于 **「规则（Rule）」** 状态，如果误点成了 **「全局（Global）」**，那么所有精心编写的 `DIRECT`、`AI-Tools` 分流规则都会被直接绕过。二者切换边界详见 [规则模式与全局模式到底什么时候切换](/clash/rule-vs-global-mode/)。
3. **配合本地 CLI 或 DNS 测试排除残留缓存**：改完规则后若浏览器仍提示地区不支持，通常是因为浏览器或操作系统残留了旧的 DNS 缓存或 Cookie，请先清理该站点的 Cookie 并新开无痕窗口验证，必要时参照 [Mihomo DNS 与 Fake-IP 配置指南](/clash/dns-fakeip-configuration-guide/) 检查浏览器自带安全 DNS 是否干扰了规则匹配。

---

## 下一步阅读

- [回到 Mihomo DNS 与规则专题](/clash/#mihomo-dns-rules)
- [回到 Clash 订阅与配置工作流](/clash/#subscription-workflow)
- [Clash Verge Rev 2026 完全使用指南](/clash/verge-complete-guide/)
- [主力机场 + 备用订阅双活故障转移策略](/guides/multi-airport-failover-strategy/)
