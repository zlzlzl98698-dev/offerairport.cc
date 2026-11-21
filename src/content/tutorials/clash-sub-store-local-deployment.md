---
title: "Sub-Store 本地部署教程：安全清洗订阅节点、加倍率标签与多机场合并"
description: "手把手演示通过 Docker 或桌面端在本地运行开源 Sub-Store，杜绝公共在线订阅转换泄密风险，实现多机场订阅聚合、节点关键词过滤与 Clash YAML 生成。"
pubDate: 2026-11-16
updatedDate: 2026-11-21
category: "Clash Verge 订阅"
subtopic: "verge-subscribe"
tags: ["Sub-Store", "订阅转换", "Docker", "隐私安全", "进阶教程"]
author: "机场优选编辑部"
pageType: "tutorial"
searchIntent: "informational"
platform: "Windows / macOS / Linux (Docker)"
urlPath: "/clash/sub-store-local-deployment/"
relatedSlugs:
  - "/clash/subscription-format-conversion/"
  - "/guides/multi-airport-failover-strategy/"
sources:
  - "Sub-Store 开源项目文档"
faqs:
  - question: "把 Sub-Store 部署在自己本地电脑（127.0.0.1）和用网上现成的转换链接有什么本质区别？"
    answer: "把带有付费密码与校验 Token 的订阅 URL 粘贴给互联网上的第三方在线转换站，等价于直接把你全年的订阅密码和剩余流量敞开交给陌生站长。而将开源 Sub-Store 部署在自己本机 `127.0.0.1` 或家用内网 NAS 上后，拉取节点列表、正则清洗规则与格式重封装都在你自己的内存里封闭完成，零第三方服务器经手，彻底杜绝泄密盗刷与恶意注入分流规则。"
  - question: "我已经用了 Clash Verge Rev，还需要额外装 Sub-Store 吗？"
    answer: "如果只有 1 家本身直接提供标准 Clash YAML 订阅的服务商，完全不需要多此一举装 Sub-Store，直接用 Clash Verge Rev 自带的订阅导入配合 Merge 覆写脚本就够了。只有当你遇到下面三种情况时才建议上 Sub-Store：1）买了只给 V2Ray/Base64 通用链接的机场想转为干净的 Clash 配置；2）需要把两三家机场的节点聚合成一条统一分组且过滤掉“官网地址/剩余流量”虚假提示节点；3）需要在电脑上统一处理好后给 iPhone Stash / Shadowrocket / 软路由分发。"
  - question: "Docker 命令里的 `127.0.0.1:3001:3001` 为什么要加前面的 `127.0.0.1`？能删掉吗？"
    answer: "建议保留，切勿在有公网 IP 的云主机上裸奔映射 `0.0.0.0:3001`！加了 `127.0.0.1` 后，只有你本机浏览器和本机 Clash 客户端可以访问管理界面；如果你是在家里仅内网可达的 NAS 或软路由上部署想让内网手机也能连，改用内网映射并一定要给 Sub-Store 后端配置强随机 API 访问路径前缀（`SUB_STORE_BACKEND_PREFIX`），避免同局域网被扫描发现。"
  - question: "Sub-Store 聚合生成本地订阅给 Clash Verge Rev 后，每天自动更新会跟着拉到新节点吗？"
    answer: "会的。当你点击 Sub-Store 生成的本地组合订阅链接更新时，Sub-Store 后端会实时向上游几家机场拉取最新节点列表，重新套用你的正则清洗、重命名和地区分组脚本后，吐出最新版的 Clash YAML 返回给客户端。"
  - question: "更新上游机场后，为什么 Sub-Store 组合配置里没有同步显示“剩余流量与到期时间”提示？"
    answer: "组合订阅包含多家不同服务商的汇总节点，HTTP 响应头 `subscription-userinfo` 通常只适配单一上游账号；如果你希望清晰看到主力账号的流量余量，可在 Sub-Store 中选择主订阅作为流量头透传来源，或者保留主力单条订阅在 Clash 中独立显示余量。"
---

## 核心结论：本地一条 Docker 命令即可搭建完全私密的订阅管理中心

只要同时使用超过一家订阅服务（例如主力包月机场 + 百元不限时备用订阅池），或者手头攒着几台自建节点与只给 Base64 链接的服务，很多用户第一步想到的都是去搜索引擎找一个“免费在线订阅转换网站”。

**请立刻停手并守住底线：永远不要把付费机场的原始订阅链接填进任何来路不明的公网在线订阅转换站！** 这条链接里包含你的全部账号身份令牌，一旦上传就相当于交出了全部节点控制权与流量密码（相关隐私风险详见 [通用订阅转换安全方案](/clash/subscription-format-conversion/)）。真正安全且省心的终极解法，是在本地电脑或家庭内网运行开源的 **Sub-Store**，几分钟即可搭建出一套专属于自己的隐私级订阅加工与多机场聚合中心。

---

## 一、自建本地 Sub-Store vs 公共在线转换站核心对比

| 评估维度 | 本机 / 内网部署 Sub-Store | 来路不明的公网在线转换网站 | Clash Verge Rev 本地 JS 覆写 |
| :--- | :--- | :--- | :--- |
| **订阅 Token 隐私安全性** | **极高**（100% 留在自己设备内存与硬盘中） | **高风险**（站长后台可记录并盗用你全年的付费订阅） | 极高（仅本机运行） |
| **多格式输入转换** | **原生通吃 Clash、V2Ray/Base64、sing-box 与单节点** | 通吃但有泄露隐患 | 仅能对已是 Clash YAML 的配置做二次改写 |
| **多机场一键聚合** | **强项**：支持多条不同格式订阅拼装成单一统一订阅 | 拼接灵活但暴露多家密钥 | 需配合写较复杂 JS Merge 脚本读取多源 |
| **适合场景** | 多机场双活聚合、清洗高倍率节点、跨端统一下发 | **不推荐使用**（除非你自己搭的私有容器） | 单一标准 Clash 订阅追加 AI 分流规则 |

---

## 二、使用 Docker 在本机安全部署 Sub-Store

如果你的 Windows / macOS 电脑装有 Docker Desktop，或者家里有支持 Docker 的 Linux 小主机 / NAS，只需运行一条容器命令即可把完整的 Sub-Store 前后端跑在仅本机可访的 `127.0.0.1:3001` 端口（配置数据自动保存在本地文件夹，容器重建不丢失）。

### Windows PowerShell 启动命令：

```powershell
# 在当前目录创建持久化数据文件夹并仅监听 127.0.0.1（防外网扫描）
mkdir sub-store-data -Force
docker run -d --name sub-store `
  --restart unless-stopped `
  -p 127.0.0.1:3001:3001 `
  -v "${PWD}\sub-store-data:/opt/app/data" `
  xream/sub-store:latest
```

### macOS / Linux 终端启动命令：

```bash
mkdir -p ./sub-store-data
docker run -d --name sub-store \
  --restart unless-stopped \
  -p 127.0.0.1:3001:3001 \
  -v "$(pwd)/sub-store-data:/opt/app/data" \
  xream/sub-store:latest
```

> **安全加强提示（NAS 或家庭局域网共享部署必看）**：如果你不是只在 `127.0.0.1` 本机使用，而是装在家里 NAS 上想同时给手机上的 Shadowrocket/Stash 更新订阅，需要把端口放行到局域网网段时，务必按照官方环境变量文档加设高强度随机路径前缀（如 `-e SUB_STORE_BACKEND_API_PATH=/your_random_long_secret`）并配合内网防火墙限制来源 IP，绝对不要无密码暴露到公共互联网！

---

## 三、Sub-Store 四大高频实战操作流

启动容器后，浏览器打开 `http://127.0.0.1:3001` 即可进入图形管理界面：

### 1. 录入多条单节点订阅（主力 + 备用 + 自建）
进入 **「订阅」** 页面点击右下角 `+` 号，选择「单条订阅」依次添加你持有的服务：
- 假如主力订阅支持 Clash YAML 格式，直接粘贴即可；如果另一家只提供 Base64 通用链接，甚至你自己在海外 VPS 部署了几条 `vless://` 单节点文本，在「本地订阅」或链接框贴进去照样能够统一识别解析。
- 贴心建议：若某家机场域名平时被运营商拦截、直连拉取会超时，可在单条订阅编辑页把 User-Agent 调整或勾选走当前本机代理通道拉取（对应端口填入你正在运行 Clash 的 `http://127.0.0.1:7897`）。

### 2. 用节点过滤操作清洗掉“公告占位节点”与“高倍率坑节点”
服务商下发的节点前几条往往写着「剩余流量：140GB」「官网最新网址」或者「×3 专线高倍节点」。若放任不管，在 Clash 开启自动测速时客户端反复请求假公告节点甚至意外切入 ×3 倍率节点会白白浪费额度和报错。在 Sub-Store 的单条或组合订阅里点 **「编辑 → 节点操作（Node Operations）」**：
- 添加 **「正则过滤（Regex Filter）」**：设置过滤关键词（如匹配包含 `剩余`、`到期`、`官网`、`套餐`、`×3`、`×5` 的字样并设为丢弃排除），生成的输出订阅将瞬间变得清爽极简；
- 添加 **「正则重命名（Regex Rename）」** 或 **「地区旗帜自动重命名」**：给每家节点名称前面统一加上来源标识前缀（例如 `[主] 香港 01`、`[备] 新加坡 01`），以后在 Clash 里一眼就知道哪条走的是包月主力、哪条走的是不限时灾备流量！

### 3. 搭建「组合订阅」一键合并多家机场做 Fallback 双活
进入订阅页切换到 **「组合订阅（Collections）」**：
- 勾选刚才处理干净的主力订阅与百元级不限时备用订阅；
- 这套组合非常适合用来搭建 [多机场主力 + 备用双活容灾架构](/guides/multi-airport-failover-strategy/)——让主力组与备用组聚合成同一套带清晰优先级的 YAML 输出给电脑和手机使用。

### 4. 生成干净的标准 Clash Meta（Mihomo）订阅导入客户端
在生成好的「组合订阅」卡片右下角，点击复制或预览图标，目标客户端格式选择 **`ClashMeta`（即 Mihomo 现代格式，能完整保留 VLESS-Reality 与 Hysteria 2 节点参数）**。复制这串类似 `http://127.0.0.1:3001/download/collection/MyAll?target=ClashMeta` 的纯内网地址，粘贴回 Clash Verge Rev 的「订阅」导入框并启用即可！

---

## 四、使用本地 Sub-Store 的常见排障指南

| 遇到问题 | 原因定位 | 解决方法 |
| :--- | :--- | :--- |
| Clash 导入 `127.0.0.1:3001` 订阅报网络超时或被代理绕走 | 客户端开着「通过代理更新」且规则没放行 `127.0.0.1` 或 Docker 容器未就绪 | 在 Clash 该条订阅设置**关闭**「使用代理更新」，确保先直连访问本机容器端口 |
| 复制出来的链接无法在其他没有开电脑的手机上直接更新 | `127.0.0.1` 仅代表电脑本机回环地址，手机拿不到 | 电脑上可用，手机如需同网络拉取请使用电脑/NAS 的局域网内网 IP 并注意开启访问路径校验 |
| 生成出的 YAML 缺少 Hysteria 2 或 VLESS 节点 | 导出目标错选成了老旧 `Clash` 而非 `ClashMeta` | 在 Sub-Store 生成参数明确选用 `target=ClashMeta`，或确认前端使用 [Mihomo 内核客户端](/clash/mihomo-core-features-guide/) |

---

## 延伸阅读与上溯导航

- 返回父专题看清全平台订阅与格式机制：[Clash 客户端订阅管理与格式转换专题](/clash/#subscription-workflow)
- 不想装 Docker 时的其他安全替代方案：[通用订阅与 Clash YAML 安全转换完全指南](/clash/subscription-format-conversion/)
- 订阅导入后如何防偷跑与重置 Token：[订阅流量暴涨排查与泄漏修复](/resources/subscription-traffic-leak-fix/)
- 用不限时包给主力买份保险：[一次性不限时流量包品牌成本盘点](/reviews/onetime-traffic-airports-guide/)
