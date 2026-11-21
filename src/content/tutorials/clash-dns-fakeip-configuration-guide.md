---
title: "Clash Meta (Mihomo) DNS 配置详解：Fake-IP 与 Redir-Host 原理及防泄漏设置"
description: "讲透 Mihomo 内核 DNS 工作机制，对比 Fake-IP 与 Redir-Host 两种增强模式优缺点，附带防泄漏防国内绕路 YAML DNS 覆写模板、Sniffer 嗅探与 CLI 排障方法。"
pubDate: 2026-10-19
updatedDate: 2026-11-21
category: "Clash Meta"
subtopic: "meta"
tags: ["DNS配置", "Fake-IP", "Redir-Host", "Mihomo", "Clash Meta", "防DNS泄漏"]
author: "机场优选编辑部"
pageType: "tutorial"
searchIntent: "informational"
platform: "Windows / macOS / Linux / OpenWrt"
appVersion: "Mihomo v1.18+"
featured: false
urlPath: "/clash/dns-fakeip-configuration-guide/"
relatedSlugs:
  - "/clash/tun-mode-udp-guide/"
  - "/clash/mihomo-core-features-guide/"
  - "/clash/verge-rules-and-proxy-groups/"
  - "/clash/fix-node-timeout-errors/"
  - "/resources/ipv6-conflict-and-dual-stack-fix/"
sources:
  - "Mihomo 官方 DNS 与 Sniffer 架构规范"
faqs:
  - question: "Fake-IP 模式下看到连接的 IP 全是 198.18.x.x 是电脑中毒了吗？"
    answer: "不是中毒。`198.18.0.0/15` 是 IANA 预留的网络基准测试专用网段。Mihomo 在 Fake-IP 模式下向本机迅速返回一个该网段的虚拟 IP，使本地应用跳过缓慢的海外 DNS 等待，随即由内核将真实域名直接送入代理隧道由远程节点完成真实解析。"
  - question: "为什么配置好代理和 DNS 后，访问国内网站反而变慢或卡顿？"
    answer: "最常见原因是把海外 DoH（例如 8.8.8.8 或 1.1.1.1）写进了默认解析器且未配置策略分流，导致淘宝、B站或网盘域名也被送往海外服务器解析，最终被调度到了远离大陆的海外 CDN 节点。正确做法是使用 `nameserver-policy` 或 `direct-nameserver` 将国内域名强制分配给阿里或腾讯国内 DoH。"
  - question: "如何在本地快速检测自己是否存在 DNS 泄漏？"
    answer: "保持规则模式或全局代理开启，在浏览器访问常见网络检测站点观察 DNS 解析出口归属地。如果你当前连接的是香港、日本或新加坡节点，检测列表里却出现了大量你本地宽带运营商所在省市的 DNS 服务器 IP，就说明存在 DNS 泄漏。"
  - question: "开启 TUN 模式后，为什么个别软件或游戏联机在 Fake-IP 下还是异常？"
    answer: "部分 P2P 联机工具、企业内网 VPN、Windows 网络状态探针或游戏反作弊程序需要直接拿到真实的对端 IP 才能握手，拿到 `198.18.x.x` 虚拟 IP 会直接报错。将对应域名加入 `fake-ip-filter` 排除列表，或在软路由特殊场景切回 `redir-host` 模式即可解决。"
  - question: "为什么浏览器明明设置了分流规则，却完全没经过 Clash 的 DNS 模块？"
    answer: "Chrome、Edge 等现代浏览器默认可能开启了「使用安全 DNS（DoH）」。开启后浏览器会直接通过 HTTPS 向内置加密 DNS 服务器发起请求，绕过操作系统的虚拟网卡与本地 DNS 监听端口，导致 Fake-IP 和部分域名分流失效。建议在浏览器隐私安全设置中关闭自带安全 DNS。"
---

## 核心结论：桌面主力用 Fake-IP 兼顾速度与隐私，特殊内网按需切 Redir-Host

在 Mihomo（Clash.Meta）内核的网络处理链条中，**DNS 配置直接决定两项核心体验：国内站点打开快不快（能否精准命中本地运营商 CDN 节点），以及海外访问安不安全（请求的域名是否会在本地宽带侧明文泄漏或遭到 DNS 污染）。**

对于 Clash Verge Rev、FlClash 等桌面端以及绝大多数移动端日常使用场景，最佳实践是启用 **`enhanced-mode: fake-ip`**，配合 **`nameserver-policy`** 划分国内外解析通道，并开启 **`sniffer`** 域名嗅探兜底。这样既能实现零本地等待的毫秒级响应，又能保证海外域名彻底不经国内明文 DNS 解析。更多核内机制与规则组合，可查阅 [Mihomo DNS 与规则专题](/clash/#mihomo-dns-rules)。

---

## 一、Fake-IP 与 Redir-Host 底层原理深度对比

在理解 YAML 参数之前，必须先厘清客户端收到应用程序发起的域名请求后，两种模式截然不同的内部流转路径：

- **Fake-IP 模式流转路径**：应用程序向系统询问某海外域名 IP 时，Mihomo 本地 DNS 模块（如 `1053` 或 `53` 端口）不向外界等待结果，而是立刻从 `198.18.0.0/15` 虚拟地址池分配一个映射 IP（例如 `198.18.0.25`）返回给应用，并在内存记录 `198.18.0.25 <-> 目标域名`。应用随后向该虚拟 IP 发起连接，流量进入 Mihomo 内核后立即还原出原始域名：若命中直连规则则现场用国内 DNS 解析真实 IP 直连；若命中代理规则，则直接把「域名字符串」发给海外机场节点，由远端节点完成真实解析并建连。
- **Redir-Host 模式流转路径**：应用程序发起请求时，Mihomo 必须先向配置的外部 DoH 或 Fallback 上游发起真实 DNS 查询，拿到真实的公网 IP 返回给应用；待应用向该真实 IP 发起流量后，内核再根据记录的 IP 与域名映射关系匹配分流规则。

| 对比维度 | Fake-IP（桌面推荐默认） | Redir-Host（特殊兼容备选） |
| :--- | :--- | :--- |
| **本地解析耗时** | **极快**，几乎零本地阻塞，立即进入匹配阶段 | **较慢**，需要等待上游真实 DNS 往返后才开始建连 |
| **防 DNS 污染与泄漏** | **极强**，海外域名完全不经过本地真实解析通道 | 依赖本地可信 DoH/DoT 与 `fallback` 过滤机制，配置不当易泄漏 |
| **内存与连接日志直观度** | 日志常见 `198.18.x.x`，需结合内核映射域名排查 | 连接列表直接显示真实目标 IP，直观对应外网路由 |
| **软件兼容性** | 局域网发现、部分下载器、STUN 联机与企业内网可能冲突 | 兼容几乎所有强依赖真实 IP 握手的软件与部分软路由环境 |
| **核心调优抓手** | 精细维护 `fake-ip-filter` 排除不需要虚拟映射的域名 | 精细调整 `fallback-filter` 与 GeoIP 校验防污染 |

---

## 二、防泄漏、不绕路的标准 YAML DNS 覆写模板

请不要直接修改订阅源文件（因为每次刷新订阅都会把修改抹除），应当在 Clash Verge Rev 的「订阅」页面中打开 **全局扩展覆写（Merge）**，填入以下经过生产环境验证的 Mihomo DNS 模板：

```yaml
dns:
  enable: true
  ipv6: false
  listen: 0.0.0.0:1053
  enhanced-mode: fake-ip
  fake-ip-range: 198.18.0.1/16
  respect-rules: true
  use-hosts: true
  fake-ip-filter:
    - "*.lan"
    - "*.local"
    - "localhost.ptlogin2.qq.com"
    - "+.stun.*.*"
    - "+.stun.*.*.*"
    - "+.stun.*.*.*.*"
    - "time.*.com"
    - "ntp.*.com"
    - "+.msftconnecttest.com"
    - "+.msftncsi.com"
    - "*.mcdn.bilivideo.cn"
    - "+.market.xiaomi.com"
  default-nameserver:
    - 223.5.5.5
    - 119.29.29.29
  proxy-server-nameserver:
    - https://dns.alidns.com/dns-query
    - https://doh.pub/dns-query
  direct-nameserver:
    - https://dns.alidns.com/dns-query
    - https://doh.pub/dns-query
  nameserver:
    - https://dns.cloudflare.com/dns-query
    - https://dns.google/dns-query
  nameserver-policy:
    "geosite:cn,private":
      - https://dns.alidns.com/dns-query
      - https://doh.pub/dns-query
    "geosite:geolocation-!cn":
      - "https://dns.cloudflare.com/dns-query#节点选择"
      - "https://dns.google/dns-query#节点选择"
```

### 关键配置字段的工程含义解析

1. **`default-nameserver` 只能填纯 IP**：它的唯一职责是在启动阶段解析像 `dns.alidns.com` 这类 DoH 域名本身对应的服务器 IP。如果在此处填入域名或 HTTPS DoH 地址，系统会陷入「解析域名需要 DoH、连接 DoH 又需要解析其域名」的死锁，导致全部网络瘫痪。建议固定填写低延迟国内公共纯 IP（如阿里 `223.5.5.5`、腾讯 `119.29.29.29`）。
2. **`proxy-server-nameserver` 防止节点域名死锁**：专门负责解析机场节点服务器域名本身的 IP。设为国内 DoH 可以确保客户端在建立加密代理隧道前，以最快速度定位到国内中转入口或落地机地址，避免出现「连不上代理导致无法解析代理域名」的循环报错。
3. **`direct-nameserver` 与 `nameserver-policy` 分离国内外解析**：注意上文模板中 `nameserver-policy` 为 `geosite:geolocation-!cn` 指定了 `#节点选择`（请确保名字与你机场订阅主代理策略组名称完全一致，否则会因找不到策略组而报错；若不同，可改用 JS 脚本自动读取主策略组名或保留 `respect-rules: true` 让规则直接引导解析）。通过这种显式切分，国内域名只走国内加密 DoH 拿最近 CDN，海外域名绝不在本地裸露解析。
4. **`fake-ip-filter` 的必要性**：如果把 `msftconnecttest.com` 放进 Fake-IP，Windows 系统状态栏会经常误判为「无 Internet 访问」图标（小地球）；如果把 `stun` 域名放进 Fake-IP，音视频通话或部分联机对战将无法打洞直连。排除这类域名是保证日常零感知体验的关键。

---

## 三、配合 `sniffer` 域名嗅探解决「应用绕过 Fake-IP」顽疾

即便配置好了完美的 DNS，部分桌面软件、手机 App 或浏览器内核依然会自己缓存历史真实 IP，或者跳过系统 DNS 直接拿内置 IP 发起 TCP/UDP 请求。此时如果没有域名嗅探（Sniffer），Mihomo 只能看到一串未知 IP，无法触发你的 `DOMAIN-SUFFIX` 分流规则。

在同一份全局扩展覆写（Merge）中追加以下 `sniffer` 段，可以让内核从 TLS 握手包（SNI）与 HTTP 请求头（Host）里主动提取真实域名，再次送入分流规则匹配：

```yaml
sniffer:
  enable: true
  force-dns-mapping: true
  parse-pure-ip: true
  override-destination: true
  sniff:
    HTTP:
      ports: [80, 8080-8880]
      override-destination: true
    TLS:
      ports: [443, 8443]
    QUIC:
      ports: [443, 8443]
  skip-domain:
    - "Mijia Cloud"
    - "+.push.apple.com"
```

开启 `parse-pure-ip: true` 与 `force-dns-mapping: true` 后，哪怕某款客户端自己硬编码了 IP 发起 TLS 443 连接，Mihomo 也能瞬间识别其真实域名归属。注意将苹果推送服务 `+.push.apple.com` 与米家设备域名加入 `skip-domain`，避免打断系统后台推送通道。关于 TUN 模式与 Sniffer 协同机制的更多细节，可阅读 [Mihomo 内核核心特性解析](/clash/mihomo-core-features-guide/) 与 [TUN 模式与 UDP 转发教程](/clash/tun-mode-udp-guide/)。

---

## 四、高阶进阶：Redir-Host 模式下 `fallback` 与 `fake-ip-filter` 精细调优

### 1. 何时切回 Redir-Host？标准防污染 YAML 怎么写
如果你的电脑需要长期挂着企业内网 VPN、运行依赖真实 IP 映射的本地开发容器，或者在软路由网关上发现部分智能家居/游戏主机在 Fake-IP 下工作异常，可以将 `enhanced-mode` 切换为 **`redir-host`**。在 Redir-Host 模式下，由于客户端必须先收到真实 IP，**必须开启 `fallback` 与 `fallback-filter` 防污染机制**，否则海外域名一旦在本地运营商拿到污染 IP 就会直接建连失败：

```yaml
dns:
  enable: true
  ipv6: false
  enhanced-mode: redir-host
  respect-rules: true
  default-nameserver:
    - 223.5.5.5
    - 119.29.29.29
  nameserver:
    - https://dns.alidns.com/dns-query
    - https://doh.pub/dns-query
  fallback:
    - https://dns.cloudflare.com/dns-query
    - https://dns.google/dns-query
  fallback-filter:
    geoip: true
    geoip-code: CN
    ipcidr:
      - 240.0.0.0/4
      - 0.0.0.0/32
    domain:
      - "+.google.com"
      - "+.openai.com"
      - "+.github.com"
```

这段逻辑的精妙之处在于：客户端同时向国内 DoH（`nameserver`）和海外 DoH（`fallback`）发起询问。如果国内 DNS 返回的 IP 经由 `GeoIP` 数据库判定属于中国大陆（`CN`）且不在被污染保留段（`240.0.0.0/4`）内，系统就采信国内解析结果实现本地极速 CDN 直连；一旦返回了非大陆 IP 或虚假污染 IP，则丢弃国内结果并自动采纳 `fallback` 的干净结果。

### 2. 日常高频场景的 `fake-ip-filter` 补充建议
即便坚持使用性能最好的 Fake-IP 模式，如果你发现以下几类特定软件出现异常，也只需在 `fake-ip-filter` 列表中精准放行对应域名，就能既享受 Fake-IP 的速度又解决兼容性问题：
- **国内游戏联机与语音通话**：如 Discord 语音底层打洞、Steam/Battle.net 联机大厅或部分客户端 P2P 语音，保留 `+.stun.*.*`、`+.stun.*.*.*` 通配符非常关键，能防止语音一直处于「正在连接 RTC」状态。
- **桌面网盘与本地快捷扫码登录**：例如微信或 QQ 电脑版有时会请求本地回环域名 `localhost.ptlogin2.qq.com`，以及部分本地硬件控制面板（如路由器登录域名 `router.asus.com`、`miwifi.com` 或 `*.local`），若被替换成 `198.18.x.x` 就会导致网页扫码框无法唤起本机客户端。
- **苹果生态推送与同步服务**：如果 iOS 或 macOS 设备开启了 Fake-IP 后出现延迟推送或 iMessage 激活转圈，可在 `fake-ip-filter` 中补充 `+.push.apple.com` 与 `+.ess.apple.com` 等基础校验域名。
- **自定义本地静态域名映射（`use-hosts`）**：在需要测试本地服务器或把某个固定内网域名指向局域网主机 IP 时，开启 `use-hosts: true` 后可以直接在配置文件的 `hosts:` 段内写入静态映射，Mihomo 会优先于外部 DNS 直接响应该固定 IP。

---

## 五、IPv6 双栈冲突、浏览器 DoH 干扰与命令行检测

很多时候用户在 YAML 里写对了全部参数，浏览器测出来的 DNS 仍然有泄漏，或者部分网站打开需要转圈十几秒。这通常源自以下两个外部环境干扰：

### 1. 宽带 IPv6 引发的泄漏与超时
如果本地家庭宽带或校园网已分配公网 IPv6 地址，而你选用的机场节点仅支持 IPv4 出口（或本地 DNS 优先返回了 AAAA 记录），浏览器就会尝试跳过 IPv4 代理直接走本地 IPv6 发出查询或流量，直接造成 IPv6 DNS 泄漏甚至卡死超时。在确认节点全面支持 IPv6 之前，建议在 `dns:` 段落保持 `ipv6: false`。如遇到必须排查双栈的环境，可对照 [IPv6 冲突与双栈修复指南](/resources/ipv6-conflict-and-dual-stack-fix/)。

### 2. 关闭浏览器自带「安全 DNS」
Chrome、Edge 和 Firefox 的现代版本默认常常处于「使用当前服务提供商」或「自动启用安全 DNS」状态。在打开 TUN 模式与 Fake-IP 时，浏览器一旦自己走内置 DoH，就会直接绕开 Clash Verge 的 DNS 接管逻辑。
- **Chrome / Edge 关闭路径**：进入「设置 → 隐私和安全 → 安全」，找到 **「使用安全 DNS」** 并关闭开关，交由操作系统与代理内核统一调度。
- 涉及更深层的浏览器端隐私防护（如 WebRTC 暴露内网 IP 与时区冲突），可继续参考 [WebRTC 与时区防泄漏教程](/guides/webrtc-and-timezone-leak-prevention/)。

### 3. CLI 终端验证 DNS 接管与 Fake-IP 状态

通过终端命令可以不依赖第三方网页，直接在本地核验 Clash DNS 是否真正生效：

```powershell
# Windows PowerShell：检查系统当前 DNS 与 Fake-IP 虚拟响应
# 1. 查看当前网卡是否已被 TUN（如 Meta 虚拟网卡）接管 DNS
Get-DnsClientServerAddress -AddressFamily IPv4

# 2. 直接向本地 Clash DNS 监听端口（如 1053）测试海外域名是否返回 198.18.x.x
nslookup -port=1053 www.google.com 127.0.0.1
```

```bash
# macOS / Linux：核对系统 DNS 解析器并测试 Fake-IP 映射结果
# macOS 查看系统路由与 DNS 分发详情
scutil --dns | grep -A 5 "resolver #1"

# 使用 dig 向本地 1053 端口发起查询，预期 A 记录应落在 198.18.0.0/15 网段
dig @127.0.0.1 -p 1053 www.google.com +short
```

---

## 五、DNS 常见异常症状排查对照表

| 故障现象表现 | 最可能的根因定位 | 针对性排查与修复措施 |
| :--- | :--- | :--- |
| **所有节点有延迟数据但网页打不开** | `default-nameserver` 误填了加密 DoH 域名导致死锁 | 改回纯 IP（如 `223.5.5.5`）并重启 Mihomo 内核 |
| **国内视频/淘宝加载极慢、图片刷不出** | 国内域名误走了海外 DNS，拿到了国外节点 CDN | 补齐 `nameserver-policy` 中 `geosite:cn` 走国内 DoH |
| **日志出现找不到 `#策略组名称` 报错** | 模板中 `#节点选择` 与订阅实际策略组名不符 | 对照「代理」界面真实策略组名称修改后缀，或移除后缀 |
| **Windows 任务栏持续提示无网络连接** | `msftconnecttest.com` 被 Fake-IP 接管了 | 将 `+.msftconnecttest.com` 与 `+.msftncsi.com` 加入 `fake-ip-filter` |
| **网页端始终测出本地宽带运营商 DNS** | 浏览器开启了安全 DNS，或开启了本地 IPv6 泄漏 | 关闭浏览器自带 DoH，并在 DNS 段设置 `ipv6: false` |

---

## 下一步阅读

- [回到 Mihomo DNS 与规则专题首页](/clash/#mihomo-dns-rules)
- [回到全站高频故障排查手册](/clash/#troubleshooting-handbook)
- [Clash Verge 分流规则与策略组实战（含 JS 脚本示例）](/clash/verge-rules-and-proxy-groups/)
- [TUN 模式开启与终端/游戏 UDP 代理配置](/clash/tun-mode-udp-guide/)
- [全节点显示 Timeout 超时九步系统排障法](/clash/fix-node-timeout-errors/)
