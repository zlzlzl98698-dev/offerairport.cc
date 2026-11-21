---
title: "Clash 节点全部 Timeout 超时怎么办？9 步逐层定位与修复方案"
description: "解决 Clash Verge Rev / Mihomo 所有节点测速 Timeout 或开启代理后完全无法上网的问题，涵盖系统时间校准、端口占用与代理残余清理、防火墙、IPv6 冲突与日志报错排查。"
pubDate: 2026-10-20
updatedDate: 2026-11-20
category: "Clash 故障排查"
subtopic: "troubleshooting"
tags: ["节点超时", "Timeout", "Clash故障排查", "连接失败", "教程"]
author: "机场优选编辑部"
pageType: "tutorial"
searchIntent: "informational"
platform: "Windows / macOS / Android"
appVersion: "全版本通用"
featured: true
urlPath: "/clash/fix-node-timeout-errors/"
relatedSlugs:
  - "/clash/fix-subscription-update-failed/"
  - "/clash/verge-subscription-import-guide/"
  - "/clash/tun-mode-udp-guide/"
  - "/clash/windows-firewall-and-uwp-loopback/"
  - "/resources/airport-outage-recovery/"
sources:
  - "Mihomo 常见连接异常排障记录"
  - "Clash Verge Rev 故障排查文档"
faqs:
  - question: "为什么手机上同一个订阅能用，电脑上 Clash Verge 却全部显示 Timeout？"
    answer: "90% 以上情况出在电脑端本地环境而非服务端。最常见原因依次为：双系统或主板电池老化导致 Windows 系统时间与标准时间相差超过 60 秒；电脑上残余了旧版代理软件、浏览器 SwitchyOmega 插件或系统代理环境变量；以及电脑与手机所处的宽带/校园网防火墙策略不同。"
  - question: "节点测速全部 Timeout，但浏览器其实还能打开网页是怎么回事？"
    answer: "这通常说明节点本身传输链路是通的，只是测速使用的默认目标地址（如 gstatic generate_204）在当前地区或节点出口受到干扰或延迟过高触发测速超时。可进入「设置 → 测速链接」将其更换为 http://cp.cloudflare.com/generate_204 后再重测验证。"
  - question: "打开 Clash Verge 后不仅海外打不开，连百度、淘宝等国内网站也跟着断网怎么修？"
    answer: "通常是本地代理端口未正常启动或系统代理残留错误端口导致。此时系统把国内网页请求也送去了无效的本地代理端口。先关闭软件中的「系统代理」开关（或进入 Windows 网络设置手动关闭代理服务器），再排查是否开启了错误的全局模式或存在多软件抢占端口。"
  - question: "老旧版本 Clash 客户端全员 Timeout，换到新机场也没用是什么原因？"
    answer: "早年停更的 Clash for Windows 或原版 Clash 内核不支持 VLESS-Reality、Hysteria2、TUIC 等现代协议。如果新服务商全线采用了这类抗封锁协议，旧客户端会全部识别失败或直接报错超时，必须更换为搭载 Mihomo 内核的 Clash Verge Rev 或 FlClash。"
  - question: "更换节点、校准时间并切换热点后仍然全部超时的最后排查底线是什么？"
    answer: "检查服务商后台是否已经流量耗尽、套餐到期、或者官方发布了新的订阅域名通知要求重置更新订阅。若官网同样无法打开且多日无维护通告，建议对照机场失联与应急恢复指南及时切换备用线路。"
---

## 核心结论与分诊路径：按「时间 → 订阅 → 端口与残留 → 防火墙与日志」排障

打开客户端点击测速，看到几十个地区节点一排整齐变红显示 **`Timeout`**，是桌面端用户最容易感到无从下手的故障场景。但从网络工程概率来看，**几十台分布在不同国家、不同机房的服务器在同一秒全部物理宕机的可能性微乎其微**。

绝大多数全员 `Timeout` 问题，都发生在「你的设备发出请求 → 抵达机场入口服务器」这一段本机或本地宽带链路中。为了避免病急乱投医地反复重装软件或盲目重置订阅，请先根据症状做一次快速分诊：

- **情况 A（全员 Timeout + 网页全部打不开）**：先执行**第一阶段 4 步（1 分钟速查）**，重点排查系统时间偏差、订阅过期、内核协议不支持。
- **情况 B（手机 5G 同账号正常，唯独电脑端全员 Timeout）**：直接重点看**第二阶段第 5–7 步**，问题高度集中在浏览器扩展、本地端口抢占、残留环境变量或 Windows 防火墙拦截。
- **情况 C（测速显示 Timeout，但网页实际能慢速打开）**：直接看**第 8 步**，更换测速测试地址即可。
- **情况 D（个别节点 Timeout，其余绿色正常）**：属于单台落地机器临时维护或晚高峰拥塞，直接切换其他可用绿色节点，无需改动本地设置。

---

## 第一阶段：最快 1 分钟见效的 4 项基础核验

### 第 1 步：校准电脑系统时间（最高频隐形杀手）

VMess、VLESS、Trojan 以及所有依赖 TLS 1.3 / Reality 证书握手的现代代理协议，在建立加密隧道时都会校验客户端与服务端的时间戳偏差。**只要电脑系统时间与真实标准时间相差超过 60–90 秒，服务端就会直接丢弃握手包，客户端界面统一表现为全员 `Timeout`。**

这类问题高发于两类电脑：安装了 Windows + Linux / macOS 双系统的主机（两套系统对主板硬件时钟 RTC 的时区解析冲突）、主板 CMOS 电池亏电的台式机。

在 Windows 上，按 `Win + X` 以管理员身份打开 PowerShell，执行以下两条命令强制开启时间服务并立即与 NTP 服务器同步：

```powershell
# 启动 Windows 时间服务并强制向系统 NTP 服务器对齐时间
Start-Service w32time
w32tm /resync /force
```

如果命令提示时间服务未配置或同步报错，可进入「设置 → 时间和语言 → 日期和时间」，开启「自动设置时间」并点击「立即同步」。

在 macOS 上，进入「系统设置 → 通用 → 日期与时间」，确认「自动设定日期与时间」已打开；也可以在终端通过以下指令手动对时：

```bash
sudo sntp -sS time.apple.com
```

### 第 2 步：在直连状态下重新拉取一次最新订阅

机场运营方为了应对网络波动或中转线路维护，会不定期更换入口 IP 地址与转发端口。如果你的本地订阅已经数周未自动更新，客户端里保存的依然是旧入口地址，自然全员失联：

1. **先关闭软件内的「系统代理」和「TUN 模式」**（这一步至关重要！如果开着已失效的代理去刷新订阅，刷新请求本身也会超时失败，陷入死循环）。
2. 进入「订阅（Profiles）」页面，点击当前高亮订阅卡片上的刷新图标，确认弹出「更新成功」提示。
3. 回到「代理」页面重新点击测速。如果连刷新订阅本身都报错失败，请跳转参考 [Clash Verge 订阅更新失败报错解决大全](/clash/fix-subscription-update-failed/)。

### 第 3 步：核实套餐有效期、流量余额与设备限制

在「订阅」卡片底部查看进度条，或登录服务商网页端面板核实两件事：
- **流量是否已耗尽或套餐已到期**：一旦总流量归零（例如 `100.0 GB / 100.0 GB`）或到期时间已过，服务商后端审计系统会自动吊销你的 UUID 认证权限，软件表面依然能看到节点列表，但所有连接都会在握手阶段被拒并显示超时。
- **是否触发并发 IP / 设备数封禁**：部分严格限制同时在线设备数的套餐，如果你把订阅分享给了多名室友或同时在路由器、多台电脑手机开启自动测速，可能会被临时限流封禁几分钟到数小时。

### 第 4 步：核对内核是否支持现代代理协议

不少老用户仍在使用多年前留存的旧版 Clash for Windows 或原版 Clash 内核。随着 2026 年主流机场广泛转向 **VLESS-Reality、Hysteria2、TUIC** 等抗干扰协议，停更的老内核完全无法解析这些节点字段，表现为要么导入报错、要么节点全灰 Timeout。

在 Clash Verge Rev 中，进入「设置 → Clash 内核」，确保运行的是 **`Mihomo`（原 Clash.Meta）** 正式内核。如果你确定自己还在使用停更老客户端，请参照 [从停更 Clash for Windows 迁移至 Clash Verge Rev 指南](/clash/migrate-from-cfw-to-verge/) 完成平滑升级。

---

## 第二阶段：系统级网络环境与冲突排查（第 5–9 步）

如果前 4 步全部核查无误但依然全员超时，说明本地网络栈存在软件抢占、路由残留或防火墙拦截。

### 第 5 步：排查浏览器代理扩展程序的端口错配

很多资深用户习惯在 Chrome 或 Edge 中安装 **SwitchyOmega、ZeroOmega** 等代理切换扩展。常见的隐蔽故障是：几年前你曾把 SwitchyOmega 的情景模式固定写死为 `127.0.0.1:7890`（老版 Clash 默认端口），而新安装的 Clash Verge Rev 默认混合端口是 **`7897`**。

这会导致浏览器把所有流量送进空无一人的 `7890` 端口，或者客户端本身测速正常但网页全部超时。排查方法非常简单：**临时在浏览器扩展管理中关闭 SwitchyOmega 等全部代理插件**，改回让浏览器直接读取「系统代理」；若必须配合使用，请将插件内的代理端口修改为与 Clash Verge Rev「设置 → 混合端口」完全一致的数值。

### 第 6 步：清理多客户端端口抢占、WinHTTP 与残余环境变量

同一台电脑如果同时安装或运行过 v2rayN、Hiddify、抓包调试工具（Charles、Fiddler、Whistle、mitmproxy）、或者各类网游加速器，它们在启动和退出时极易互相覆盖 Windows 注册表里的代理设置，或强占本地监听端口。

请按以下三步彻底清理本机代理残余：

1. 彻底关闭其他所有代理工具、抓包工具与网游加速器，在任务管理器确认无残留核心进程（如 `xray.exe`、`sing-box.exe`、`clash-win64.exe`）。
2. 在 Windows PowerShell 中运行以下命令，核查是否存在遗留的 **系统环境变量代理** 或 **WinHTTP 底层代理**（许多开发工具和终端会被残留的 `HTTP_PROXY` 环境变量毒害）：

```powershell
# 查看当前用户的环境变量中是否写死了旧代理端口
Get-ChildItem Env: | Where-Object { $_.Name -match "PROXY" }

# 查看 Windows 系统级 WinHTTP 代理配置
netsh winhttp show proxy
```

如果 `Env:` 输出中出现了指向陌生端口的 `HTTP_PROXY` / `HTTPS_PROXY`，可在「系统属性 → 环境变量」中将其删除；如果 `netsh winhttp` 显示了多余的固定代理，可执行 `netsh winhttp reset proxy` 重置为直接访问。

3. 检查 Windows「设置 → 网络和 Internet → 代理」，先关闭 Clash Verge Rev 的「系统代理」，手动确认系统设置中的「使用代理服务器」已变为关，然后再回到 Clash Verge Rev 重新打开「系统代理」。

### 第 7 步：手机热点交叉对照、防火墙放行与 IPv6 双栈修复

遇到宽带运营商临时路由抽风、校园网策略拦截或本地安全软件静默封锁时，可以通过**网络切换对照法**一秒划清边界：

1. 暂时断开电脑的宽带 Wi-Fi 或网线，用手机开启 4G/5G 个人热点让电脑连上。
2. 在手机热点环境下刷新测速：
   - **如果连上手机热点立刻全绿可用**：100% 证明你的电脑与客户端完全健康，故障出在**原有宽带路由器 DNS 劫持、校园网认证防火墙、公司内网安全策略或路由器 IPv6 兼容性异常**。此时若使用的是校园网，可重点查看 [Hysteria2 协议在校园网下的调优策略](/resources/hysteria2-campus-network-tuning/)；若家庭宽带开启了双栈 IPv6 后频繁超时，可查阅 [IPv6 冲突与双栈代理断流修复方案](/resources/ipv6-conflict-and-dual-stack-fix/)。
   - **如果连上手机热点依然全部 Timeout**：说明阻断发生在电脑本机内部。此时务必打开 **Windows Defender 防火墙** 或第三方杀毒软件（如火绒、360、卡巴斯基等），确认 `clash-verge.exe` 与核心进程 `verge-mihomo.exe` 已被允许访问「专用网络」和「公用网络」。详细的防火墙与回环放行操作见 [Windows 防火墙放行与 UWP 回环解除指南](/clash/windows-firewall-and-uwp-loopback/)。

### 第 8 步：更换测速测试地址（Test URL）与超时阈值

Mihomo 内核测速的本质，是通过节点向一个指定的 HTTP 接口发起请求并等待返回 `204 No Content` 状态码。如果默认测试 URL（常见为 `http://www.gstatic.com/generate_204`）刚好遭遇目标节点的出口地区屏蔽或网络波动，就会出现「测速按钮一按全 Timeout，但实际上网页能正常打开」的假死现象。

解决方法是进入 Clash Verge Rev **「设置 → 测速链接（Test URL）」**，将其替换为更轻量、全球 Anycast 覆盖率更高的接口之一：

- `http://cp.cloudflare.com/generate_204`
- `http://www.msftconnecttest.com/connecttest.txt`

同时在「设置」中检查测速超时时间是否被人为调得过低（推荐保持默认的 `5000ms` 即 5 秒，不要调成几百毫秒，否则欧美远距离节点在建立 TLS 握手时来不及返回结果就会被误判超时）。关于延迟测速与真实下载吞吐量的科学区分，可进一步参考 [节点科学测速方法论](/resources/#node-testing-guide)。

### 第 9 步：通过「日志（Logs）」抓取精确错误代码

如果以上八步依然未能定位问题，千万不要盲目猜测。打开 Clash Verge Rev 左侧的 **「日志（Logs）」** 页面，将右上角日志等级切换到 **`Info`** 或 **`Debug`**，随后切换一个节点并尝试在浏览器访问 `https://www.google.com`，观察终端刷出的红字或黄字告警信息，对照下表直接定位：

| 日志核心报错关键字 | 故障所属环节 | 最常见直接诱因 | 精准处置方式 |
| :--- | :--- | :--- | :--- |
| `context deadline exceeded` 或 `i/o timeout` | 本地至入口中转链路 | 入口 IP 被当前宽带阻断、端口丢包或节点彻底宕机 | 更新最新订阅、切换同机场其他入口或尝试开启节点不同的传输协议 |
| `tls: failed to verify certificate` | TLS 加密握手层 | 本机系统时间错误，或本地宽带/代理工具实施了 HTTPS 中间人劫持 | 立即校准电脑时间；排查本地是否挂了抓包代理或安装了公司审计证书 |
| `connection refused`（针对 127.0.0.1） | 本地核心进程通信 | Mihomo 核心崩溃未正常启动，或服务模式抢占导致核心重启失败 | 重启 Clash Verge Rev，或切换至稳定版内核并清理旧 Service 服务 |
| `EOF` 或 `connection reset by peer` | 节点认证与协议层 | 账号流量已用尽、UUID/密码被重置，或高干扰环境下协议特征被断流 | 核对后台流量余额并重新导入订阅；优先改用 VLESS-Reality 等强抗封锁节点 |
| `dns resolve failed` / `no such host` | 域名解析层 | 本机 DNS 被死锁、机场节点域名过期，或配置文件内 `dns` 模块配置错误 | 检查系统网卡 DNS，或排查是否启用了冲突的覆写脚本，联动调整 Fake-IP |

---

## 第三阶段：局部场景超时与机场服务商端故障的底线判断

有时你会发现客户端里节点测速全是绿色，浏览器也能打开谷歌，但偏偏某些特定应用依然报连接超时。这类「半吊子超时」通常属于以下两类边界问题：

1. **浏览器通，但 Git / Docker / PowerShell / 微软商店全超时**：这是因为你只开启了「系统代理」，而终端和 UWP 应用默认不读取系统代理。解决方案是安装 Service Mode 并开启 TUN 虚拟网卡模式，完整配置见 [Clash Verge TUN 模式开启与 UDP 转发教程](/clash/tun-mode-udp-guide/)。
2. **仅 DNS 查询或部分海外网站超时**：可能是订阅里下发的远端 DNS 服务器被本地拦截，或者 Fake-IP 与局部网络发生冲突，可配合阅读 [Mihomo DNS 配置与 Fake-IP 指南](/clash/dns-fakeip-configuration-guide/) 调优。

如果经过前面全部 9 步验证——时间已对齐、多网络环境（宽带 + 手机 5G 热点）交叉复测均全员超时、日志持续报错 `i/o timeout` 或 `connection refused`，且打开服务商官方网站也无法连通、无法更新订阅，那么问题大概率已经不在你本地，而是服务商入口大面积故障或面临跑路风险。此时建议按以下步骤止损与自救：

- 先查阅 [机场失联或跑路前兆排查清单](/resources/airport-exit-scam-warning-signs/) 评估服务商现状；
- 依据 [机场宕机与失联后的应急恢复流程](/resources/airport-outage-recovery/) 启用备用线路或核查防失联发布页。

---

## 安全排障红线与核心枢纽跳转

在排查连接超时过程中，务必坚守两条安全底线：
- **绝不为了省事长期关闭 Windows Defender 实时防护或系统防火墙**，正确做法是只为 `clash-verge.exe` 与 `verge-mihomo.exe` 添加精确的进程放行白名单。
- **绝不在网上下载所谓的「Clash 一键断网修复工具」或陌生 `.bat` 脚本**，系统代理重置只需要在 Windows 设置界面或使用本文提供的两条原生 PowerShell 指令即可完成，来路不明的脚本存在修改系统 hosts 或植入木马的风险。

更多体系化排障文档与配置指南，请返回以下核心枢纽查阅：
- 查阅更多报错代码与订阅失败方案：[Clash 故障排查总手册](/clash/#troubleshooting-handbook)
- 排查订阅本身无法拉取问题：[Clash Verge 订阅更新失败解决大全](/clash/fix-subscription-update-failed/)
- 了解客户端整体配置与覆写思路：[Clash Verge Rev 2026 完全指南](/clash/verge-complete-guide/)
- 确认各平台可信替代软件：[Clash 客户端选型矩阵](/clash/#client-matrix)
