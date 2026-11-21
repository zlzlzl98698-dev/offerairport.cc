---
title: "从停更旧版 Clash for Windows 平滑迁移到 Clash Verge Rev 指南"
description: "手把手指导老用户从已停更的 Clash for Windows 迁移至 Clash Verge Rev：涵盖原订阅提取、Service Mode 彻底卸载、7890 到 7897 端口适配及旧版 Parsers 规则平滑转换。"
pubDate: 2026-10-24
updatedDate: 2026-11-21
category: "Clash 推荐"
subtopic: "tuijian"
tags: ["Clash for Windows", "Clash Verge Rev", "迁移教程", "Service Mode", "7897端口"]
author: "机场优选编辑部"
pageType: "tutorial"
searchIntent: "informational"
platform: "Windows / macOS"
appVersion: "CFW → Clash Verge Rev v2.x"
featured: false
urlPath: "/clash/migrate-from-cfw-to-verge/"
relatedSlugs:
  - "/clash/verge-official-download-guide/"
  - "/clash/verge-complete-guide/"
  - "/clash/verge-rules-and-proxy-groups/"
  - "/clash/fix-node-timeout-errors/"
  - "/clash/windows-firewall-and-uwp-loopback/"
sources:
  - "第三方代理客户端.txt"
  - "Clash Verge Rev 与旧版 Clash for Windows 配置及端口架构对照"
faqs:
  - question: "不卸载旧版 Clash for Windows，直接再装一个 Clash Verge Rev 换着用行吗？"
    answer: "极其不建议同时保留甚至并行启动，尤其是你以前在 CFW 中开启过 Service Mode（系统服务/虚拟网卡）时。旧版系统服务驻留后台会抢占虚拟网卡路由与本地代理端口，导致新安装的 Clash Verge Rev 启动内核报错或整个电脑彻底断网。"
  - question: "我已经找不到当初买机场的官网了，订阅链接还能从旧版 CFW 里捞出来吗？"
    answer: "可以。只要你的旧版 CFW 还在电脑上或保留着用户配置文件夹，进入客户端 Profiles 页面右键属性即可查看完整 URL，或者直接打开系统目录 `%USERPROFILE%\\.config\\clash\\profiles\\list.yml`（macOS 为 `~/.config/clash/profiles/list.yml`），在文本中明文找到 `url:` 字段复制出来。"
  - question: "为什么迁移到 Clash Verge Rev 之后，浏览器 SwitchyOmega 或终端 Git/Python 突然代理连不上了？"
    answer: "因为两款软件默认本地混合代理端口不同：旧版 CFW 默认是 `7890`，而新版 Clash Verge Rev 默认改为 `7897`。将第三方软件的代理端口改为 `7897`，或者在 Clash Verge Rev 设置里手动把混合端口改回 `7890` 即可恢复兼容。"
  - question: "之前我在 CFW 里手写过 `Parsers` 预处理规则，能直接原封不动复制到 Clash Verge Rev 吗？"
    answer: "不能直接原封不动运行。CFW 的 `Parsers` 配置包裹层（如 `yaml:` 下的 `prepend-rules` 结构或特定 JS 回调写法）与 Clash Verge Rev 的全局扩展覆写（Merge）及 JS `function main(config)` 接口略有区别，需要去掉外层 `parsers:` 包装后按 Verge 规范填入。"
  - question: "如果我在卸载 CFW 前忘了卸载 Service Mode，现在装完 Verge 连不上网怎么办？"
    answer: "可以在管理员身份运行的 Windows 终端（PowerShell / CMD）中使用 `sc query` 查找残留的 `Clash Core Service` 服务项并执行停止与删除命令，同时确认 Windows 网络设置中的代理开关已交由 Clash Verge Rev 接管，重启电脑即可彻底清除冲突。"
---

## 核心结论：为什么必须告别 CFW，且迁移务必先清旧服务再装新端

虽然旧版 **Clash for Windows（简称 CFW）** 依然能在部分电脑上勉强打开，但自原仓库删库停更以来，它已经彻底丧失了安全补丁与协议迭代能力。当前主流服务商已大面积启用 **VLESS-Reality**、**Hysteria2** 等高性能抗审查传输协议，旧版 CFW 内置的 Clash Premium 老内核根本无法解析这些节点，导致许多老用户陷入「明明套餐没过期、官网一切正常，软件里却总显示部分节点消失或测速全超时」的困境。

从 CFW 平滑迁移到基于 **Mihomo（Clash.Meta）内核** 的 **Clash Verge Rev**，只需按「提取保留订阅 → 彻底清理旧服务与系统代理 → 安全安装新客户端 → 重建覆写规则与适配端口」四步推进，即可在 10 分钟内无痛完成升级。全平台现代客户端矩阵可参阅 [Clash 活跃客户端选型总览](/clash/#client-matrix)。

---

## 一、迁移前必读：CFW 与 Clash Verge Rev 核心架构差异

提前了解两代客户端在底层与默认参数上的五项差异，能避开 90% 的迁移后困惑：

| 对比维度 | Clash for Windows（已停更） | Clash Verge Rev（活跃首选） | 迁移时需做的适配动作 |
| :--- | :--- | :--- | :--- |
| **底层代理内核** | 旧版 Clash Premium | **Mihomo（Clash.Meta）** | 自动解锁 VLESS-Reality、Hysteria2 等新协议 |
| **前端框架占用** | Electron 架构，内存占用偏高 | **Tauri 架构**，轻量化、后台常驻极省内存 | 整体运行更轻快，界面交互逻辑一致易上手 |
| **默认混合端口** | **`7890`** | **`7897`** | 须同步更新 SwitchyOmega/终端代理端口，或改回 `7890` |
| **规则覆写机制** | `Settings → Parsers` 预处理 | **全局扩展覆写（Merge）** 与 **扩展脚本（Script）** | 去掉 `parsers` 外层包装迁移至 Verge 覆写区 |
| **TUN 系统服务** | Service Mode（旧版地球图标） | **内置服务模式（Clash Verge Service）** | **必须先彻底卸载 CFW 旧服务，严禁两套服务并存** |

---

## 二、第一步：无损提取原有订阅 URL 与本地配置备份

在卸载 CFW 之前，先把你的数字资产——尤其是已经记不清官网的机场订阅链接——完整提取出来并妥善保存。

### 方法 A：从图形界面提取
1. 打开电脑里现有的 Clash for Windows。
2. 点击左侧 **Profiles（配置）**，找到当前处于激活状态（绿色边框）的配置文件。
3. 将鼠标悬停或右键点击该配置文件，在弹窗或属性视图中找到 **URL** 一栏，将完整的 `https://...` 订阅地址复制保存到本地记事本。

### 方法 B：即使软件打不开，也能直接从磁盘配置目录捞出明文链接
CFW 将所有订阅元信息明文保存在用户目录下的 `list.yml` 中。即使客户端主程序崩溃打不开，你依然可以用终端一条命令直接读出历史订阅链接：

```powershell
# Windows PowerShell：直接查看 CFW 保存的历史订阅配置文件名与明文 URL
Get-Content "$env:USERPROFILE\.config\clash\profiles\list.yml"
```

```bash
# macOS 终端：查看 CFW 历史订阅记录文件
cat ~/.config/clash/profiles/list.yml
```

> **安全提醒**：提取出来的订阅 URL 含有个人鉴权 Token，请仅保存在本地离线文档中，切勿随手发到聊天群或贴给不明在线工具。如果你此前自定义过复杂的规则或机场节点排序，建议顺便把整个 `profiles` 文件夹复制到桌面作为只读备份参考。

---

## 三、第二步：彻底清除 CFW 的系统代理与 Service Mode 残留（最关键）

这是老用户迁移后出现「新软件装好了却全局断网、网页全打不开」的头号原因。如果旧版 CFW 开启过 TUN 虚拟网卡，它在操作系统底层注册了常驻内核级服务；直接拖进回收站或覆盖卸载软件，往往留下一堆幽灵服务霸占网卡路由。

### 标准图形界面卸载流程
1. 在 CFW 的 **General（常规）** 页面，依次关闭 **System Proxy（系统代理）** 与 **TUN Mode** 开关，取消勾选 **Start with Windows（开机自启）**。
2. 观察页面中 **Service Mode（服务模式）** 旁边的地球图标状态：如果是绿色或蓝色点亮状态，点击旁边的 **Manage** 按钮，然后点击 **Uninstall**，等待提示成功卸载虚拟网卡服务并变为灰色状态。
3. 右键点击系统右下角托盘区的猫咪图标选择 **Quit** 彻底退出主程序，随后通过 Windows「设置 → 应用 → 已安装的应用」正常卸载 CFW（macOS 将应用移入废纸篓并清理 `~/Library/Application Support/clash_win`）。

### 补救 CLI：如果以前忘点 Uninstall 就强行卸载了 CFW 怎么办？
如果你早就把旧版 CFW 删了，现在怀疑后台依然残存旧版虚拟网卡服务或系统代理锁死，请以**管理员身份**打开 Windows PowerShell，执行以下命令核查并清理：

```powershell
# 1. 检查是否仍存在旧版 Clash 服务进程残留
sc.exe query "Clash Core Service"

# 2. 若上方返回状态为 RUNNING 或存在该服务，依次执行停止并删除
sc.exe stop "Clash Core Service"
sc.exe delete "Clash Core Service"

# 3. 核查 Windows 注册表当前系统代理是否仍被残留占用（ProxyEnable 应为 0）
Get-ItemProperty -Path "HKCU:\Software\Microsoft\Windows\CurrentVersion\Internet Settings" | Select-Object ProxyEnable, ProxyServer
```

若发现 `ProxyEnable` 仍为 `1` 且 `ProxyServer` 指向 `127.0.0.1:7890`，先在 Windows 系统设置「网络和 Internet → 代理」里手动关闭「使用代理服务器」，再进行下一步安装。

---

## 四、第三步：安全安装 Clash Verge Rev 并导入验证

1. 务必核对本机芯片与系统架构获取官方开源安装程序：Windows 主流电脑选择 `x64` 安装包（ARM 架构笔记本选 `arm64`），macOS 务必区分 Apple Silicon（`aarch64`/`arm64`）与 Intel（`x64`），切勿混装。获取路径与核验方法请严格遵循 [Clash Verge Rev 官方安全下载指南](/clash/verge-official-download-guide/) 与 [安装包哈希校验教程](/clash/verify-client-checksum/)。
2. 安装并打开 Clash Verge Rev，进入左侧 **「订阅（Profiles）」** 栏，将第二步备份的订阅链接粘贴到顶部输入框，点击 **「导入」**。
3. 若遇到无法拉取或报 403，请参照 [订阅更新失败排障教程](/clash/fix-subscription-update-failed/) 在订阅编辑信息中检查是否需要修改 `User-Agent` 为 `clash.meta` 或关闭代理回环。
4. 导入成功后点击该订阅卡片使其高亮激活，进入 **「代理（Proxies）」** 页面做一次延迟测试。此时你会发现，之前在旧版 CFW 里完全看不见或总是灰掉的 **VLESS、Hysteria2** 等现代节点已经全部正常列出且测速通过。

---

## 五、第四步：把旧版 `Parsers` 规则平替为 Merge 覆写与适配 `7897` 端口

### 1. 转换旧版 CFW `Parsers` 配置
旧版 CFW 用户常在 `Settings → Parsers` 里写过如下预处理片段来补充直连规则：

```yaml
# 旧版 CFW Parsers 写法示例（不能直接整段粘贴到 Verge）
parsers:
  - reg: ^.*$
    yaml:
      prepend-rules:
        - DOMAIN-SUFFIX,example.com,DIRECT
```

迁移到 Clash Verge Rev 后，不再需要 `parsers:` 和 `reg:` 正则包裹层。直接右键 Clash Verge Rev 的 **「全局扩展覆写（Global Merge）」**，只保留内部规则字段即可生效：

```yaml
# 新版 Clash Verge Rev 全局扩展覆写（Merge）对应写法
prepend-rules:
  - DOMAIN-SUFFIX,example.com,DIRECT
  - PROCESS-NAME,qbittorrent.exe,DIRECT
```

如果老用户还想顺便用 JS 自动组建 AI 专用策略组，可以直接套用 [Clash Verge 规则与策略组实战](/clash/verge-rules-and-proxy-groups/) 中的 `Global Script` 模板。

### 2. 适配 `7890` 到 `7897` 的默认端口变化
迁移完最容易让人产生「明明开启了系统代理，部分工具却还是连不上」的错觉，根源几乎都是端口号从 **`7890` 变成了 `7897`**：

- **方案一（推荐跟随新标准）**：修改其他软件的代理设置以适配 `7897`：
  - 浏览器插件（如 SwitchyOmega / ZeroOmega）：将情景模式中的 SOCKS5/HTTP 端口从 `7890` 改为 **`7897`**。
  - 开发者终端环境变量（Git、pip、npm、curl 等）同步更新为 `7897`：

```powershell
# Windows PowerShell 临时设置终端代理适配 Clash Verge Rev 默认端口
$env:HTTP_PROXY = "http://127.0.0.1:7897"
$env:HTTPS_PROXY = "http://127.0.0.1:7897"
```

```bash
# macOS / Linux 终端或 ~/.zshrc 中更新环境变量
export http_proxy="http://127.0.0.1:7897"
export https_proxy="http://127.0.0.1:7897"
export all_proxy="socks5://127.0.0.1:7897"
```

- **方案二（零改动兼容所有老软件）**：如果电脑上依赖 `7890` 的脚本和软件太多不想逐一改，直接打开 Clash Verge Rev 的 **「设置 → Clash 设置 → 端口设置」**，点击 **「混合端口（Mixed Port）」** 旁的编辑按钮，手动将 `7897` 改回 **`7890`** 并保存即可（前提是确认本机已无任何程序占用 `7890`）。

最后，如果你使用的是 Windows 10/11 且迁移后发现微软商店（Microsoft Store）、Edge 等 UWP 应用依然无法走通系统代理，或者需要让终端工具彻底免配置环境变量，建议开启 Verge 的服务模式与 TUN 接管，同时做好 [Windows 防火墙与 UWP 回环豁免设置](/clash/windows-firewall-and-uwp-loopback/)。

---

## 六、迁移后必须重配的三项关键桌面能力与旧版 Mixin 重构

很多老用户完成导入并把端口从 `7890` 改好后，以为迁移就已经全部结束了，结果一打开电脑终端执行 `git clone` 或开启微软应用商店，却发现终端软件完全不听系统代理指挥。这通常是因为你漏掉了以下三项在 CFW 时代曾习以为常、在 Clash Verge Rev 中需要重新点亮的基础能力：

### 1. 重新启用服务模式（Service Mode）与 TUN 全局虚拟网卡
旧版 CFW 是通过安装老式服务并打开 `TUN Mode` 来接管命令行工具、游戏与不支持 HTTP 代理的桌面程序。在 Clash Verge Rev 中，进入左侧 **「设置 → Clash 设置」**，找到 **「服务模式（Service Mode）」** 点击旁边的盾牌或安装图标按提示授予系统管理员权限，待其状态变为已安装后，再开启 **「TUN 模式」** 开关。只有点亮了这项服务，你的 PowerShell、Docker、Steam 游戏与各类专业客户端才会真正无缝接入分流引擎。关于 TUN 模式下 UDP 转发与堆栈模式的调优，可继续阅读 [TUN 模式与终端/游戏 UDP 转发指南](/clash/tun-mode-udp-guide/)。

### 2. 开启开机自启、静默启动与 UWP 应用网络隔离解除
- **开机自启与静默运行**：在 Clash Verge Rev「设置 → Verge 设置」中打开「开机自启」与「静默启动」，避免每次重启电脑都需要手动点击托盘图标；同时确认已经把旧版 CFW 从 Windows 任务管理器「启动应用」中彻底移除，防止两套程序抢占开机启动顺位。
- **Windows UWP 应用回环豁免**：在 Windows 10/11 下，Microsoft Store、Xbox、部分系统自带天气与邮件 App 受制于微软沙盒网络回环限制，仅开启普通系统代理时常出现「连不上网」的提示。请利用 Clash Verge Rev「设置」面板内置的 **「UWP 应用回环限制（Open UWP Tool）」** 工具，一键勾选豁免需要联网的微软系应用，或直接开启上文提到的 TUN 模式从网卡底层彻底绕过此限制。详尽原理见 [Windows 防火墙与 UWP 回环豁免指南](/clash/windows-firewall-and-uwp-loopback/)。

### 3. 将旧版 CFW `Mixin` DNS 覆写迁移至 Verge 全局扩展覆写
不少老用户除了写过 `Parsers` 之外，还在 CFW 里开启过 `Mixin` 功能用来锁死自定义 DNS 参数。在 Clash Verge Rev 中不再区分 `Parsers` 与 `Mixin`，所有自定义 YAML 字段注入全部统一收拢在 **「全局扩展覆写（Global Merge）」** 中。你只需把旧版 CFW `mixin:` 字段内部原本缩进的 `dns:` 参数块（注意核对是否符合最新 Mihomo 规范，例如把过时的旧规则替换为 `nameserver-policy` 与 `default-nameserver`）直接平铺写入 Merge 文件即可。推荐直接参照 [Mihomo DNS 与 Fake-IP 防泄漏模板](/clash/dns-fakeip-configuration-guide/) 一次性升级为更安全的现代防泄漏规则结构。

---

## 七、迁移收尾七项核验清单（Checklist）

在把桌面日常主力正式交接给 Clash Verge Rev 后，花一分钟逐项核对以下七个动作，确保彻底无后顾之忧：

1. **老进程已清零**：系统右下角托盘与任务管理器中，没有任何 `Clash for Windows.exe` 或 `clash-win64.exe` 残留进程。
2. **旧版系统服务已注销**：管理员终端下确认不再存在运行中的旧版 `Clash Core Service`，防止后台端口与虚拟路由争抢。
3. **新客户端来源干净**：安装程序系从官方开源渠道获取，且已核验文件 SHA-256 与系统 CPU 架构（如 Windows x64、macOS arm64）匹配。
4. **新协议节点全部可见且测速正常**：进入代理页面，确认订阅内的 **VLESS-Reality、Hysteria2** 等节点能正常测出延迟（若仍无法看到新节点，检查订阅链接是否过于陈旧或联系服务商更新订阅）。
5. **本地端口生态已对齐**：浏览器插件、终端环境变量或 IDE 代理设置已更新为 **`7897`**（或已在 Verge 设置里主动改回 **`7890`**）。
6. **分流规则验证生效**：在「连接」面板随机观察几条国内站点与海外站点流量，确认国内直连 `DIRECT`、海外与 AI 流量按预期走向对应策略组。
7. **离线备份历史凭证**：将提取出来的原有订阅 URL 妥善加密保存后，把桌面上临时存放的旧版明文 `list.yml` 文本清理销毁，避免个人订阅凭证意外外泄。

---

## 下一步阅读

- [回到 Clash 客户端选型矩阵](/clash/#client-matrix)
- [回到 Clash 高频故障排查手册](/clash/#troubleshooting-handbook)
- [Clash Verge Rev 2026 完全配置指南](/clash/verge-complete-guide/)
- [开启 TUN 模式让终端、游戏与全部应用走代理](/clash/tun-mode-udp-guide/)
- [Clash 节点显示 Timeout 超时九步系统排查](/clash/fix-node-timeout-errors/)
