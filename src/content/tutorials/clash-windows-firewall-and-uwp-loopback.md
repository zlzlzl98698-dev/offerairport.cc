---
title: "Windows 代理开启后微软商店 / UWP 应用与 WSL2 无法联网解决指南"
description: "解决 Windows 开启 Clash Verge Rev 系统代理后 Microsoft Store、Xbox、OneDrive、Copilot 与 WSL2 子系统依然断网的问题，覆盖 TUN 与回环豁免两种方案。"
pubDate: 2026-11-17
updatedDate: 2026-11-21
category: "Clash 故障排查"
subtopic: "troubleshooting"
tags: ["UWP回环", "WSL2代理", "Windows代理", "微软商店无法联网"]
author: "机场优选编辑部"
pageType: "tutorial"
searchIntent: "informational"
platform: "Windows 10 / 11"
urlPath: "/clash/windows-firewall-and-uwp-loopback/"
relatedSlugs:
  - "/clash/tun-mode-udp-guide/"
  - "/clash/fix-node-timeout-errors/"
sources:
  - "Windows AppContainer 网络隔离与 WSL2 网络架构"
faqs:
  - question: "为什么 Chrome 已经能高速上外网了，微软商店（Microsoft Store）和 Copilot 却一直转圈圈？"
    answer: "因为 Windows 现代 UWP 应用运行在 AppContainer 沙盒中，出于安全设计系统默认禁止它们访问 `127.0.0.1` 本地回环代理端口。解决办法有两个：要么直接开启 Clash Verge Rev 的 TUN 虚拟网卡模式，要么用 UWP 回环豁免工具解除对应应用的隔离限制。"
  - question: "我用回环豁免工具把 Microsoft Store 勾上了，为什么里面的应用还是下载进度卡在 0%？"
    answer: "第一要排查微软商店本身或下载分发组件（如 Delivery Optimization / Windows Update 相关后台进程）是否在豁免清单中遗漏；第二微软商店直连国内 CDN 其实速度更快，如果强行把所有微软下载域名全路由去海外低速节点反而会卡死，建议保留规则里的微软国内直连分流。"
  - question: "开启 TUN 模式后 WSL2（Ubuntu）还是提示 Temporary failure in name resolution 怎么办？"
    answer: "这是 WSL2 默认 NAT 模式下虚拟网卡与宿主机 Clash Fake-IP / DNS 监听接口对接异常导致的经典现象。建议在 Windows 11 22H2+ 中通过 `.wslconfig` 启用 `networkingMode=mirrored` 镜像网络模式，并在 clash-verge 设置里配合 `dns.enhanced-mode` 与可访问的 `listen` 绑定。"
  - question: "打开 Allow LAN（允许局域网连接）把 WSL 代理指向宿主机 IP 有什么安全隐患吗？"
    answer: "一旦在未设限的公共 Wi-Fi 或公司大内网中开启无密码验证的 Allow LAN，同局域网内的其他人都可以扫描并蹭用你的代理端口消耗你的机场流量。只在受信任的家庭路由器内使用，或者务必在客户端内配置端口验证密码与 Windows 防火墙仅放行 WSL 子网规则。"
  - question: "关闭 Clash 后发现整个电脑甚至国内网站也全都上不去网了，怎么快速恢复？"
    answer: "通常是因为软件异常退出导致 Windows 系统代理或残余静态 DNS 没恢复。打开系统「设置 → 网络和 Internet → 代理」，确认手动代理开关处于关闭状态；若用过 TUN 模式，检查网卡适配器设置里的 DNS 是否变回自动获取（DHCP），重启网卡即可瞬间复原。"
---

## 核心结论：开启 TUN 模式可一劳永逸解决 95% 的 UWP 与 WSL2 断连问题

刚在 Windows 上装好 [Clash Verge Rev](/clash/verge-complete-guide/) 或 v2rayN 的用户，最常遇见的诡异现象就是：**Chrome、Edge 刷视频飞快，但旁边的 Microsoft Store 却提示「检查连接」、Xbox 客户端登录转圈、新版微软应用无法加载，或者一打开 WSL2 Ubuntu 终端跑 `apt update`、`git clone` 就超时报错。** 这并非你的机场节点失效，而是 Windows 底层 **AppContainer 沙盒回环隔离机制** 与 **WSL2 独立虚拟网络栈** 故意拦截了对宿主机 `127.0.0.1` 系统代理的访问。

下面将问题拆解为「Microsoft Store / UWP 应用」和「WSL2 Linux 子系统」两大场景，提供从零配置兜底方案到精细化控制工具的完整操作流。

---

## 一、故障成因与解决路线速查

| 受影响对象 | 核心隔离原因 | 最省心推荐方案 | 精细化替代方案（不开 TUN 时） |
| :--- | :--- | :--- | :--- |
| **Microsoft Store / Xbox / 新版应用** | UWP 沙盒（AppContainer）默认禁止访问 `127.0.0.1` 回环地址 | 安装服务模式后直接启用 **TUN 模式** | 使用客户端内置 **UWP 回环豁免（Loopback Exemption）** |
| **PowerShell / Git / curl / Docker** | 绝大多数终端工具不读取 Windows IE 系统代理注册表 | 启用 **TUN 模式** 接管三层网卡流量 | 手动在终端 export `http_proxy` / `https_proxy` |
| **WSL2 (Ubuntu / Debian 等)** | 传统 NAT 模式下子系统处于独立子网，无法直连宿主 `127.0.0.1` | Win11 启用 **`mirrored` 镜像网络** + TUN 模式 | 开启 Allow LAN 并配置跨宿主防火墙与环境变量 |

深入理解系统代理与虚拟网卡的分界原理，请先参照 [TUN 模式与系统代理全对比教程](/clash/tun-mode-udp-guide/)。

---

## 二、解决 Microsoft Store 与所有 UWP 应用断网（两种方案）

### 方案 A：开启 Clash Verge Rev 服务模式 + TUN 虚拟网卡（最稳妥）

1. 打开 Clash Verge Rev 左侧「设置（Settings）」。
2. 在 **「服务模式（Service Mode）」** 卡片点击管理图标安装系统服务（按提示允许 UAC 管理员提权，直至右侧出现绿色激活状态指示）。
3. 回到上方开启 **「TUN 模式（Tun Mode）」** 开关。
4. 此时所有经过系统的 TCP/UDP 请求都会被虚拟网卡在更底层拦截并分流，**UWP 应用根本感知不到 `127.0.0.1` 本地代理的存在，自然彻底绕过 AppContainer 回环隔离限制。**

> **注意**：开启 TUN 后可关闭右上角或主页上的「系统代理（System Proxy）」避免冗余绕行；此外确保你的机场分流规则把国内微软商店下载域名放行直连，以免商店拉取几 GB 安装包时走国际代理消耗套餐流量。

### 方案 B：不启用 TUN 时手动解除 UWP 回环限制

如果你的工作电脑受限不便开启 TUN 虚拟网卡，只运行普通系统代理：

1. 在 Clash Verge Rev「设置 → 系统代理与工具」区域，找到 **「UWP 应用回环豁免（Open UWP Tool）」** 按钮并点击启动辅助界面（部分客户端亦可通过开源工具 `EnableLoopback` 实现）。
2. 在弹出的应用清单中，勾选你想允许通过本地代理端口通信的应用（如 `Microsoft Store`、`Xbox`、`OneDrive`、`Microsoft Copilot` 或特定 UWP 客户端）。
3. 如果你拿不准哪个隐藏后台组件负责更新鉴权，也可先小范围勾选核心商店组件，点击顶部 **「Save Changes」** 保存。
4. 完全关闭 Microsoft Store 进程后重新打开，此时系统代理才会对其生效。

---

## 三、WSL2（Ubuntu / Debian）优雅联通宿主机代理

许多程序员在 WSL2 里运行 Python `pip`、Node `npm` 或拉取 GitHub 仓库时，经常因为宿主机防火墙拦截与 DNS 解析异常而失败。根据你的 Windows 11 系统版本，按以下优先级配置：

### 路线一：Windows 11 22H2 及以上首选 `mirrored` 镜像网络

这是目前与 Clash / Mihomo 配合最顺滑、彻底摆脱动态改 IP 脚本的方法：

1. 在 Windows 资源管理器地址栏输入 `%UserProfile%` 回车，找到（或新建一个）纯文本文件，命名为 **`.wslconfig`**（注意前面有个点，且没有 `.txt` 后缀！）。
2. 用记事本或 VS Code 写入以下内容保存：

```ini
[wsl2]
networkingMode=mirrored
dnsTunneling=true
autoProxy=true
```

3. 打开 Windows PowerShell 运行 `wsl --shutdown` 彻底重启 WSL 实例。
4. 开启宿主机的 Clash Verge Rev **TUN 模式**。重启后的 WSL2 会与宿主机共享镜像环回与代理能力，不仅可以直接无感联通宿主机代理，甚至 `curl http://127.0.0.1:7897` 也能直接命中宿主机端口，不再因为宿主机虚拟网段 IP 每次重启随机变动而失联。

### 路线二：旧版 Win10 / 传统 NAT 模式下的环境配置与防火墙放行

若你的 Windows 10 无法开启镜像网络，需按下面三步打通：

1. **宿主机端设置**：在 Clash Verge Rev 首页开启 **「允许局域网连接（Allow LAN）」**，并记下代理端口（默认通常为 `7897`）。
2. **Windows Defender 防火墙放行 WSL 虚拟网段（关键一步）**：大量用户配好了代理依然 `Connection timed out`，就是因为 Windows 防火墙把来自 `vEthernet (WSL)` 这张虚拟网卡的入站数据包全丢弃了。在管理员身份运行的 PowerShell 中执行以下命令建立精准放行规则（仅放行 WSL 虚拟接口，比直接关闭整个防火墙安全百倍）：

```powershell
New-NetFirewallRule -DisplayName "Allow WSL Inbound" -Direction Inbound -InterfaceAlias "vEthernet (WSL)" -Action Allow
```

3. **WSL 终端内动态读取宿主机路由 IP 设置代理变量**：在 WSL 的 `~/.bashrc` 或 `~/.zshrc` 中加入一段快捷函数，每次需要走代理时自动读取 `/etc/resolv.conf` 中的宿主机网关 IP 并导出 `http_proxy` / `https_proxy`（注意把端口改为你客户端实际使用的混合端口）。

---

## 四、常见遗留问题排查清单

1. **开启 TUN 后部分银行客户端或企业 VPN 打不开**：建议进入企业内网前先一键关闭客户端 TUN 模式，或在 Mihomo 的 `tun.route-exclude-address` 中排除企业内网私网段。
2. **Microsoft Store 提示错误代码 `0x80072EFD` 或网页打不开**：优先检查是不是开启过某款已停更客户端留下了残余注册表代理地址，或者电脑同时挂着第三方游戏加速器抢占了 LSP/WFP 协议栈；运行 `netsh winsock reset`（需要重启）往往可以清除长期积累的系统网络钩子冲突。
3. **节点本身全部无响应导致商店和 WSL 一起连不上**：如果浏览器也同步无法打开国际站，应第一时间转向节点层排查，参照 [节点全部 Timeout 排查九步法](/clash/fix-node-timeout-errors/) 检查机场流量是否耗尽或系统时间是否偏移。

更多桌面网络排障与防火墙规则调优，可继续查看 [Clash 故障排查专题](/clash/#troubleshooting-handbook) 与 [2026 桌面端软件架构横比](/comparisons/desktop-proxy-clients-benchmark/)。
