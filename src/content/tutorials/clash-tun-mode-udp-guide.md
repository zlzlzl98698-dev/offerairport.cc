---
title: "Clash Verge TUN 模式开启教程：让命令行终端、Docker 与游戏 UDP 稳定走代理"
description: "详述 Clash Verge Rev 中 TUN 虚拟网卡模式的工作原理、Service Mode 服务模式安装、Mixed/System/gVisor 堆栈选型、UDP 转发与路由冲突排查。"
pubDate: 2026-10-18
updatedDate: 2026-11-20
category: "Clash 使用教程"
subtopic: "tutorials"
tags: ["TUN模式", "Clash Verge", "终端代理", "UDP转发", "虚拟网卡"]
author: "机场优选编辑部"
pageType: "tutorial"
searchIntent: "informational"
platform: "Windows / macOS / Linux"
appVersion: "Clash Verge Rev v2.x (Mihomo)"
featured: true
urlPath: "/clash/tun-mode-udp-guide/"
relatedSlugs:
  - "/clash/verge-complete-guide/"
  - "/clash/dns-fakeip-configuration-guide/"
  - "/clash/fix-node-timeout-errors/"
  - "/clash/windows-firewall-and-uwp-loopback/"
  - "/resources/ipv6-conflict-and-dual-stack-fix/"
sources:
  - "Mihomo (Clash.Meta) TUN 配置文档"
  - "Clash Verge Rev Service Mode 官方说明"
faqs:
  - question: "开启 TUN 模式后，还需要再开「系统代理」吗？"
    answer: "通常不需要同时开启。TUN 模式工作在操作系统网络层（L3 虚拟网卡），会自动接管绝大多数不遵循系统 HTTP 代理变量的进程与浏览器流量。关闭系统代理仅保留 TUN 模式，反而能避免部分软件对同一请求进行双重代理或产生端口兼容冲突。"
  - question: "为什么我在 Clash Verge 里点 TUN 模式开关直接回弹关闭，或提示无权限？"
    answer: "在操作系统中创建虚拟网卡驱动并接管全局路由表需要管理员或 root 权限。请先进入「设置」页面点击安装并启动「服务模式（Service Mode）」，待服务状态显示绿色运行中后，再开启 TUN 模式开关。"
  - question: "开启 TUN 模式会不会明显增加电脑耗电，或者影响国内网游延迟？"
    answer: "TUN 模式需要内核处理本机全部 IP 数据包与 DNS 劫持，CPU 占用比纯系统代理会高出约 1%–3%。在玩《英雄联盟》《无畏契约》《CS2》等国内竞技网游时，如果规则库匹配不完整或开启了严格路由，可能会引发微小抖动，建议游玩国服电竞游戏时临时关闭 TUN，或核实国内 IP 段已被完整分流至 DIRECT。"
  - question: "开启 TUN 后打不开公司内网系统、NAS 或局域网共享打印机怎么解决？"
    answer: "请进入 TUN 细节设置检查「严格路由（Strict Route）」开关，普通用户应保持关闭；同时确认配置文件中的 tun.route-exclude-address 或绕过列表已包含局域网私有网段（如 192.168.0.0/16、10.0.0.0/8）及公司内网特定网段。"
  - question: "我已经开了 TUN 模式，为什么联机游戏还是显示 NAT 类型受限或语音连不上？"
    answer: "TUN 模式只是负责把本机的 UDP 流量送进 Mihomo 内核，最终能否顺利实现 UDP 转发还取决于服务商节点本身是否支持 UDP 转发（部分廉价中转节点关闭了 UDP），以及配置中节点参数是否开启了 udp: true。"
---

## 核心结论：系统代理管浏览器，TUN 虚拟网卡管全系统 TCP/UDP 流量

许多开发者、跨平台办公用户或游戏玩家在初次配置好 Clash Verge Rev 后，都会遇上同一个困惑：**Chrome 和 Edge 浏览器已经可以秒开 Google 与 GitHub 网页，但在 PowerShell 或 macOS 终端里执行 `git clone`、`npm install`、`pip install`、`brew`、`docker pull`、`curl` 时却卡在连接超时；或者 Discord 语音连不上、微软商店应用无法加载。**

造成这种割裂的根源在于协议分层机制：**「系统代理（System Proxy）」仅仅是在操作系统设置里挂了一个应用层地址标签（`127.0.0.1:7897`）**。只有主动读取该环境变量或系统参数的浏览器才会把流量交过去；而大量底层命令行工具、Go/Rust 编译脚本、游戏客户端、UWP 应用以及走 UDP 协议的语音软件根本不认系统代理，直接从物理网卡直连出去，最终撞墙超时。

要彻底解决这类进程的代理盲区，标准工程方案就是启用 **TUN 模式（Virtual Network Interface 虚拟网卡模式）**。TUN 模式会在操作系统网络层（L3）虚拟出一张真实网卡并改写系统路由表，把本机所有符合路由规则的 TCP、UDP 与 DNS 数据包强制引入 Mihomo 内核进行统一分流。

---

## 一、系统代理 vs TUN 模式：场景边界与选型对照表

在决定是否常驻开启 TUN 模式前，先对照下表判断自己当前的真实需求。并非所有场景都需要开 TUN，合理按需切换才能兼顾续航、性能与网络稳定性：

| 对比维度 | 系统代理模式（System Proxy） | TUN 虚拟网卡模式（TUN Mode） | 工程建议 |
| :--- | :--- | :--- | :--- |
| **工作层级** | 应用层（HTTP / SOCKS5 代理端口） | 系统网络层（L3 虚拟网卡 + 路由表接管） | 按需二选一即可，一般不建议同时开 |
| **覆盖软件范围** | 主流浏览器、支持填写代理的少数客户端 | 几乎全系统进程：CLI 终端、Docker、游戏、UWP、桌面程序 | 开发或游戏场景必开 TUN |
| **UDP 协议支持** | 仅极少数支持 SOCKS5 UDP 的应用可用 | **完整接管本机 UDP 流量（如游戏、Discord、QUIC）** | 语音/联机/HTTP3 必须开 TUN |
| **系统权限要求** | 普通用户权限即可运行 | 必须安装 Service Mode（管理员/root 权限） | 首次需 UAC / 密码授权安装服务 |
| **与内网/组网软件兼容** | 极佳，基本不干扰 Tailscale 或公司 VPN | 易与 WireGuard/Tailscale/Docker 虚拟网卡产生路由冲突 | 需配合排除网段或错峰使用 |

---

## 二、Windows / macOS / Linux 开启 Service Mode 与 TUN 完整步骤

由于接管系统网卡与路由表涉及底层权限，Clash Verge Rev 通过引入独立守护进程 **Service Mode（服务模式）** 来安全提权，避免平时每次打开主程序都要弹管理员确认框。

### 第 1 步：彻底清理旧版残留服务（仅迁移用户必看）

如果你之前在这台电脑上安装过已停更的 **Clash for Windows** 且启用过它的 Service Mode，**在开启新版服务前必须先彻底卸载旧版服务**。两套虚拟网卡守护服务同时运行会互相争夺默认网关路由，直接导致开机断网或蓝屏冲突。具体清理步骤见 [从停更 Clash for Windows 迁移至 Clash Verge Rev 指南](/clash/migrate-from-cfw-to-verge/)。

### 第 2 步：安装并激活 Service Mode 服务模式

1. 打开 Clash Verge Rev，进入左侧 **「设置（Settings）」**。
2. 找到 **「服务模式（Service Mode）」** 选项，点击右侧的小盾牌图标或「安装（Install）」按钮。
3. 在系统弹出的权限确认窗口中完成授权（Windows 点击 UAC 的「是」，macOS 输入开机管理员密码）。
4. 安装并启动成功后，状态旁会出现绿色标识或「运行中（Active）」。

在 Windows 上，你可以在 PowerShell 中验证后台服务是否真正处于运行状态：

```powershell
# 查询 Clash Verge 后台守护服务状态
Get-Service | Where-Object { $_.Name -match "clash|verge" } | Format-Table Name, Status, StartType
```

正常情况下可以看到对应服务的 `Status` 为 `Running`。如果服务启动失败，优先排查国产安全软件是否拦截了服务注册，或参考 [Windows 防火墙放行与 UWP 回环解除指南](/clash/windows-firewall-and-uwp-loopback/) 检查系统权限。

### 第 3 步：打开 TUN 开关并校验核心参数

服务模式就绪后，点击开启 **「TUN 模式（TUN Mode）」** 开关，并强烈建议先**关闭「系统代理」**开关。随后点击 TUN 模式旁边的设置齿轮，核对或通过全局覆写（Merge）微调以下关键参数：

```yaml
# Mihomo 内核 TUN 模块标准推荐参数（可在设置面板微调或通过 Merge 覆写）
tun:
  enable: true
  stack: mixed
  auto-route: true
  auto-detect-interface: true
  strict-route: false
  dns-hijack:
    - "any:53"
    - "tcp://any:53"
```

各项核心参数的工程含义如下：

| 核心参数 | 推荐设置 | 技术作用与避坑说明 |
| :--- | :--- | :--- |
| **`stack`（网络堆栈）** | **`mixed`**（备选 `gvisor`） | `system` 性能最高但极易触发部分企业杀软拦截；`gvisor` 兼容性最好但略占 CPU；`mixed` 采用 TCP 走系统栈、UDP 走 gVisor 的混合策略，兼顾性能与稳定，为 2026 年默认首选 |
| **`auto-route`（自动路由）** | **`true`（开启）** | 让内核自动配置系统的默认路由规则把流量引流至虚拟网卡；若关闭则需手动写路由表，新手切勿关闭 |
| **`strict-route`（严格路由）** | **`false`（家用默认关闭）** | 开启后会严格限制流量只能走虚拟网卡，极易导致局域网打印机、NAS、投影仪或内网服务器失联；仅在防极少数应用绕过泄漏时按需开启 |
| **`auto-detect-interface`** | **`true`（开启）** | 当笔记本电脑从有线网口拔下切换至公司 Wi-Fi 时，自动绑定当前活动的物理出口网卡，避免断网 |
| **`dns-hijack`（DNS 劫持）** | `any:53` 与 `tcp://any:53` | 将操作系统向任何外部 IP 53 端口发起的 UDP/TCP DNS 解析请求统一拦截到 Mihomo 内核处理，这是 TUN 模式能正常按域名分流的前提 |

### 第 4 步：在 macOS 与 Linux 上的差异化验证

- **macOS**：开启 TUN 后，系统会自动创建一张名为 `utunX`（如 `utun4`）的虚拟隧道接口。你可以通过终端命令 `ifconfig | grep -A 3 utun` 确认虚拟网卡已经分配了隧道 IP（例如 `198.18.0.1`）。
- **Linux 桌面**：如果未使用服务模式而直接用普通用户权限启动，有时会提示 `permission denied` 无法创建 `tun` 设备。除了安装官方 Service 外，也可以根据发行版赋予内核二进制文件 `CAP_NET_ADMIN` 权限，更多 Linux 环境细节见 [Linux 桌面与 v2rayA 透明代理指南](/guides/linux-desktop-and-v2raya-guide/)。

---

## 三、开启后实战验证：确认终端 TCP、DNS 与代理链均已生效

千万不要以为拨动一下开关就算大功告成。在终端中执行以下三步验证，确保整个链路无死角：

### 1. 验证命令行 HTTPS（TCP）连通性

在 Windows PowerShell 或 macOS/Linux 终端中执行以下命令（注意：确保当前终端**没有**手动 export 任何 `HTTP_PROXY` 环境变量，以真实检验纯 TUN 接管能力）：

```bash
curl -I https://www.google.com
```

如果几秒内返回 `HTTP/2 200`（或者 `302` 状态码），说明终端的 TCP 出站流量已经被 TUN 虚拟网卡成功接管并经过代理节点转发；如果依然报 `Connection timed out`，说明 TUN 路由未生效或节点本身超时。

### 2. 验证本地 DNS 是否已被内核正确接管

在 TUN 模式下，系统默认的 DNS 请求必须经过 Mihomo 内部处理（尤其是配合 Fake-IP 模式时，海外域名会被直接映射为 `198.18.0.0/16` 保留网段 IP）。在终端运行：

```bash
nslookup www.google.com
```

如果当前开启了 Fake-IP（强烈推荐在 TUN 模式下启用），返回的解析地址应当落在 **`198.18.x.x`** 网段，这证明 Mihomo 已经成功接管并完成了零污染虚拟解析；如果返回的 IP 明显是国内污染地址或报错 `DNS request timed out`，说明 `dns-hijack` 未生效或订阅文件缺少 `dns` 模块。关于 Fake-IP 与 Redir-Host 的核心原理与标准配置模板，请务必阅读 [Mihomo DNS 配置与 Fake-IP 防泄漏指南](/clash/dns-fakeip-configuration-guide/)。

### 3. 验证 Git / Docker 等高频开发工具

对于开发场景，直接运行一次轻量 Git 远端探测即可确认 SSH/HTTPS 仓库拉取已打通：

```bash
git ls-remote https://github.com/MetaCubeX/mihomo.git HEAD
```

能够迅速输出最新 commit hash 即代表所有基于标准网络栈的开发工具均已正常工作。

---

## 四、游戏联机与 UDP 转发深层避坑指南

很多玩家开启 TUN 模式就是为了给主机加速、Steam 联机或使用 Discord 语音，但开启后依然发现语音断断续续、游戏大厅进不去。UDP 转发链路比普通网页 TCP 苛刻得多，通常卡在以下三个环节：

1. **订阅节点本身不支持或关闭了 UDP**：并非所有服务商的所有节点都开启了 UDP 转发。部分低价公网中转线路为了节省带宽或规避运营商针对大流量 UDP 的 QoS 限速，会在服务端直接禁用 UDP。在客户端侧，你也可以检查订阅配置文件中节点对象里是否明确包含 `udp: true`（现代面板一般默认下发，若被手动改成 `false` 则无法转发）。
2. **NAT 类型受限与游戏加速定位差异**：普通代理机场的核心设计目标是高吞吐网页、流媒体和开发资源拉取，节点出口大多处于多用户共享 NAT 环境下。如果你玩的是对端到端 P2P NAT 类型要求极严的 FPS 联机游戏，使用专用网游加速器在固定游戏路由上的稳定性往往优于通用机场。两者的技术边界对比见 [网游加速器 vs 代理机场深度对比](/guides/game-booster-vs-proxy/)。
3. **QUIC（UDP 443）丢包导致视频卡顿**：YouTube 与部分现代应用默认会尝试通过基于 UDP 的 QUIC（HTTP/3）协议传输。在部分宽带运营商对 UDP 大包实施严格限速的晚高峰，开启 TUN 后由于 UDP 被完整转发出去，反而可能比走系统代理（仅 TCP）更容易出现视频掉帧卡顿。如果遇到开 TUN 后看 YouTube 反而卡顿，可以在浏览器禁用实验性 QUIC 协议，或在分流规则顶部屏蔽 UDP 443 迫使浏览器回退至稳定的 TCP 传输。

---

## 五、开启 TUN 后彻底断网或冲突的 5 步故障排查树

如果打开 TUN 开关后不但没打通终端，反而连本机原有网页和局域网都全部断联，请严格按以下 5 个高发故障点逐一排查：

### 故障点 1：配置文件缺失 `dns` 模块或开启失败

这是 TUN 模式断网排名第一的原因。在传统系统代理模式下，浏览器把域名字符串原封不动交给 Clash，由远程节点去解析域名，哪怕订阅里没有 `dns` 配置块也能上网；**但在 TUN 模式下，本机内核拿到的是已经解析或待解析的 IP 包，必须依赖 Mihomo 自身启用 `dns.enable: true` 来响应系统的 53 端口查询**。

排查方式：检查你的订阅配置或全局覆写中是否把 `dns.enable` 设为了 `false`，或者 `nameserver` 字段为空。确保引入了一套完整且包含国内可用 DoH/UDP 上游（如 `223.5.5.5`）的 DNS 配置，详情参阅 [Mihomo DNS 配置指南](/clash/dns-fakeip-configuration-guide/)。

### 故障点 2：本机 IPv6 双栈地址泄漏或抢占

很多家庭宽带和高校校园网已经默认分配了公网 IPv6 地址。开启 TUN 模式时，如果虚拟网卡仅接管了 IPv4 路由而放任系统的 IPv6 直出（或节点本身不支持 IPv6 转发），海外网站的 DNS 返回 AAAA 记录后，系统会绕开 TUN 直接从本地 IPv6 网卡撞墙，表现为长达数十秒的卡顿或超时。解决方法与双栈排查方案详见 [IPv6 冲突与双栈代理断流修复](/resources/ipv6-conflict-and-dual-stack-fix/)。

### 故障点 3：与 Tailscale / ZeroTier / WireGuard / 企业 VPN 路由打架

当电脑里同时运行了 Tailscale、ZeroTier、WireGuard 或公司深信服/Cisco AnyConnect VPN 时，系统里同时存在两张抢着修改默认网关的虚拟网卡，极易产生死循环丢包。工程上的缓解做法有两种：
- 不使用组网或公司内网 VPN 时将其完全退出；
- 如果必须与 Tailscale 等内网穿透工具共存，在全局 Merge 覆写的 `tun` 字段中追加 **`route-exclude-address`**，将对方的虚拟组网段排除出 Clash TUN 路由接管范围（例如 Tailscale 使用 `100.64.0.0/10`，Docker Desktop 常用 `172.17.0.0/16`）：

```yaml
tun:
  route-exclude-address:
    - 100.64.0.0/10
    - 172.17.0.0/16
    - 192.168.0.0/16
```

### 故障点 4：第三方安全软件拦截虚拟网卡与内核进程

部分国产安全卫士的「ARP 防火墙」「网络攻击拦截」或企业终端安全管控软件（EDR），会把本地软件突然创建的虚拟网卡及 `any:53` DNS 劫持行为误判为异常流量劫持并直接阻断。临时关闭安全软件验证是否为其拦截；确认后将 `clash-verge.exe`、`verge-mihomo.exe` 以及 Service 服务目录加入安全软件白名单，切记排查完毕恢复防护开启，勿长期裸奔。

### 故障点 5：WSL2 / Hyper-V 虚拟机内部无法走通宿主机的 TUN

在 Windows 11 中使用 WSL2（Ubuntu 子系统）时，默认 NAT 网络模式下，WSL2 内部的 DNS 和部分路由有时无法穿透进宿主机的普通系统代理。确保宿主机 Clash Verge Rev 的 TUN 模式正常开启的同时，若仍不通，可在 Windows 11 的 `.wslconfig` 中启用 **`networkingMode=mirrored`（镜像网络模式）**，让 WSL2 直接共享宿主机的本地回环与 TUN 虚拟网卡，这是 2026 年打通 WSL2 代理最彻底的微软原生方案。

---

## 六、操作安全红线与核心枢纽导航

在使用 TUN 模式与服务模式期间，请务必注意：
- **所有虚拟网卡服务权限都直接触及操作系统底层路由，因此绝不能运行来历不明的魔改版客户端**，务必核验官方源码发布与哈希值，参考 [Clash Verge Rev 官方安全下载教程](/clash/verge-official-download-guide/)。
- **使用完毕或遇未知网络异常时，优先通过软件界面切换回关闭 TUN 观察系统是否立刻恢复**，不要手动胡乱删改系统注册表中的网卡驱动项。

延伸学习与相关枢纽页跳转：
- 深入学习 TUN 与系统代理选型总纲：[系统代理与 TUN 模式核心对比枢纽](/clash/#system-proxy-vs-tun)
- 彻底搞懂 Fake-IP 与 DNS 防泄漏配置：[Mihomo DNS 配置与 Fake-IP 指南](/clash/dns-fakeip-configuration-guide/)
- 遇到节点本身全员超时而非 TUN 问题：[Clash 节点全部 Timeout 9 步排障法](/clash/fix-node-timeout-errors/)
- 回到完整故障排查手册：[Clash 故障排查与排错总纲](/clash/#troubleshooting-handbook)
