export interface VpnTypeComparisonRow {
  category: string;
  coreProtocols: string;
  networkPath: string;
  routingGranularity: string;
  aiAndStreaming: string;
  typicalCostAndBilling: string;
  clientControl: string;
  bestFor: string;
}

export interface ProtocolComparisonRow {
  protocol: string;
  transportLayer: string;
  handshakeAndRtt: string;
  antiProbeAbility: string;
  weakNetworkBehavior: string;
  mobileBatteryAndCompat: string;
  recommendedScenario: string;
}

export interface MobileClientRow {
  client: string;
  os: string;
  coreOrCompat: string;
  acquisitionChannel: string;
  costModel: string;
  caveatsAndStrengths: string;
  detailHref: string;
}

export interface LineComparisonRow {
  lineType: string;
  crossBorderPath: string;
  peakCongestionResistance: string;
  latencyJitter: string;
  typicalMonthlyPrice: string;
  verificationMethod: string;
}

export interface VpnDecisionBranch {
  title: string;
  badge: string;
  condition: string;
  recommendation: string;
  avoid: string;
  steps: string[];
  href: string;
  ctaText: string;
}

export interface VpnActionCard {
  title: string;
  category: string;
  summary: string;
  scopeNote: string;
  href: string;
  ctaLabel: '查看教程' | '了解详情' | '获取客户端';
}

export interface VpnFaqItem {
  question: string;
  answer: string;
  anchorHref?: string;
  anchorLabel?: string;
}

export interface VpnClusterLink {
  title: string;
  purpose: string;
  href: string;
  tag: string;
}

export const VPN_TYPE_MATRIX: VpnTypeComparisonRow[] = [
  {
    category: '传统海外商业 VPN（如 Nord / Express 等体系）',
    coreProtocols: 'OpenVPN、WireGuard、IKEv2 或自研隧道变体',
    networkPath: '本地宽带直连海外公共 VPN 网关，无国内 BGP/IEPL 入口中转',
    routingGranularity: '以整机全局加密隧道或粗粒度 Split Tunneling 为主',
    aiAndStreaming: '海外公共出口多人共享 IP 高度集中，易触发 Cloudflare / AI 平台验证',
    typicalCostAndBilling: '多在 $5–$12/月（约 ¥35–¥85/月），常以 1–2 年长周期拉低标价',
    clientControl: '必须依赖厂商闭源专用客户端，无法导入通用 YAML 规则',
    bestFor: '身处海外时在公共 Wi-Fi 下做全盘加密防窃听，或访问常规国际站点',
  },
  {
    category: '规则代理机场（Clash / Mihomo / VLESS / IEPL）',
    coreProtocols: 'VLESS-Reality、Trojan、Hysteria 2、Shadowsocks AEAD',
    networkPath: '国内多线 BGP 入口中转，中高端采用 IEPL/IPLC 点对点内网专线过境',
    routingGranularity: '按域名、GeoSite、GeoIP、进程名毫秒级分流（国内直连 / 海外代理 / AI 专用组）',
    aiAndStreaming: '可为 OpenAI / Claude / Netflix 单独指派新加坡/日本/美国家宽或流媒体解锁组',
    typicalCostAndBilling: '实测主流月付 ¥15–¥27/月区间，支持月付或按需不限时流量包',
    clientControl: '标准订阅可无缝对接 Clash Verge Rev、FlClash、Shadowrocket、Stash 等开源/独立客户端',
    bestFor: '国内日常跨区开发、AI 办公、流媒体观影与高频访问海内外站点共存用户',
  },
  {
    category: '合规网游加速器（UU / 雷神 / 奇游等体系）',
    coreProtocols: '自研 UDP/TCP 专用游戏转发加速协议',
    networkPath: '国内多线加速节点直连指定游戏联机服务器或平台登录节点',
    routingGranularity: '严格进程与端口白名单，仅接管游戏列表内进程与 UDP 联机包',
    aiAndStreaming: '不支持（浏览器、Git、Docker、ChatGPT 等不在白名单的流量完全走本地宽带）',
    typicalCostAndBilling: '月度计时或包月会员（多见按小时暂停或 ¥20–¥45/月区间）',
    clientControl: '官方专属软件运行，与 Clash TUN 虚拟网卡同时开启极易冲突断网',
    bestFor: 'PC/主机游戏联机降延迟、减少 P2P 房间掉线，绝非网页跨境工具替代品',
  },
  {
    category: '企业合规远程 VPN / 自建内网组网',
    coreProtocols: 'WireGuard、Tailscale（DERP/直连）、OpenVPN / IPSec',
    networkPath: '客户端加密接入公司自建网关或私有云主机，无共享商业池概念',
    routingGranularity: '按企业内网网段（CIDR）或白名单子网路由下发策略',
    aiAndStreaming: '取决于企业网关或自建 VPS 所在机房 IP 属性，部分数据中心段仍受 AI 平台风控',
    typicalCostAndBilling: '企业自维或自有海外轻量 VPS（需自行承担维护、被阻断换 IP 与安全更新成本）',
    clientControl: '官方 WireGuard / Tailscale 客户端或企业 IT 统一下发配置文件',
    bestFor: '远程接入公司 OA/内网代码仓、NAS 点对点穿透与研发团队协同办公',
  },
  {
    category: '免费 VPN（商业限额体验版 vs 来路不明免费 App）',
    coreProtocols: '多为标准 WireGuard/OpenVPN 或未知私有打包内核',
    networkPath: '拥挤公共免费出口，几乎无中转优化；高危软件可能借用用户家庭宽带做 P2P 出口',
    routingGranularity: '极粗粒度或根本无国内直连规则，常伴有流量配额或强制限速',
    aiAndStreaming: '公共出口已被海量滥用封禁，极难稳定解锁 Netflix/ChatGPT',
    typicalCostAndBilling: '标价 ¥0，但合理版限 2GB–10GB/月体验；来路不明免费版常以收集日志或寄生带宽变现',
    clientControl: '高度封闭且常要求敏感设备权限，部分恶意软件甚至诱导安装系统根证书',
    bestFor: '仅部分知名厂商正规限额版可用于应急验证，长期主力与敏感登录强烈不推荐',
  },
];

export const PROTOCOL_COMPARISON_TABLE: ProtocolComparisonRow[] = [
  {
    protocol: 'VLESS (XTLS-Vision / Reality)',
    transportLayer: 'TCP + TLS 1.3 或无自有证书 Reality 伪装',
    handshakeAndRtt: '支持 0-RTT/1-RTT 快速建连，无额外加密嵌套损耗',
    antiProbeAbility: '极强（Reality 可借用真实海外大站公钥响应主动探测）',
    weakNetworkBehavior: '在稳定线路极佳；遇高丢包公网直连仍受传统 TCP 拥塞窗口回退限制',
    mobileBatteryAndCompat: '极低功耗；Mihomo、Xray、sing-box、Shadowrocket、v2rayN 全面支持',
    recommendedScenario: '日常高隐蔽性网页浏览、开发者终端、企业办公与主力长期挂机',
  },
  {
    protocol: 'Trojan',
    transportLayer: 'TCP + 标准 TLS 1.3（模仿标准 HTTPS 443 流量）',
    handshakeAndRtt: '依赖标准 TLS 握手，配合多路复用（Mux）或专线表现稳健',
    antiProbeAbility: '强（主动探测回落至伪装 Web 站点，但需服务商配置有效域证书）',
    weakNetworkBehavior: '依赖底层链路质量，IEPL 专线上几乎无感，公网直连晚高峰易波动',
    mobileBatteryAndCompat: '兼容性最广，几乎全部现代及较早期客户端均可识别',
    recommendedScenario: '老旧设备兼容、专线机场通用标准节点与流媒体常规播放',
  },
  {
    protocol: 'Hysteria 2',
    transportLayer: 'UDP（基于定制 QUIC 与 Brutal 主动发包拥塞控制）',
    handshakeAndRtt: '基于 QUIC 极快握手，减少线头阻塞',
    antiProbeAbility: '中强（伪装成普通 HTTP/3 流量，但面对极端限制 UDP 的校园网/企业网易受阻）',
    weakNetworkBehavior: '极强（在 5%–15% 丢包的拥堵跨境公网上仍能靠策略抢出可用高带宽）',
    mobileBatteryAndCompat: '需支持新协议的 Mihomo / sing-box / Shadowrocket；高频 UDP 并发略增手机耗电',
    recommendedScenario: '晚高峰移动/校园网高丢包宽带急救、低价公网直连线大文件传输',
  },
  {
    protocol: 'Shadowsocks (2022 / AEAD)',
    transportLayer: 'TCP / UDP 轻量流加密（SS-2022 强化重放防护）',
    handshakeAndRtt: '极简协议头，几乎零握手延迟开销',
    antiProbeAbility: '单独暴露在公网易受特征识别；但在 IEPL/IPLC 物理内网专线中完全合规且高效',
    weakNetworkBehavior: '在专线内部速度天花板极高、延迟最稳定；不建议裸奔跑长距离跨境公网直连',
    mobileBatteryAndCompat: '移动端最省电、路由吞吐效率最高，几乎所有工具通吃',
    recommendedScenario: '已部署国内 BGP 入口 + IEPL/IPLC 内网专线的高速机场主力节点',
  },
  {
    protocol: 'OpenVPN / WireGuard (传统 VPN)',
    transportLayer: 'UDP / TCP 经典隧道协议（WireGuard 仅 UDP）',
    handshakeAndRtt: 'WireGuard 极快且轻量；OpenVPN 握手与内核上下文切换较重',
    antiProbeAbility: '极弱（协议特征在跨境环境中辨识度极高，极易被精准限速或断流）',
    weakNetworkBehavior: '标准 WireGuard 面对运营商 UDP QoS 时容易直接断连',
    mobileBatteryAndCompat: 'WireGuard 移动端极为省电；企业组网与内网穿透极佳，不适合直接跨境穿越',
    recommendedScenario: '合规远程内网穿透、Tailscale/公司固定服务器互联或海外本地公共 Wi-Fi',
  },
];

export const LINE_ARCHITECTURE_TABLE: LineComparisonRow[] = [
  {
    lineType: '公网直连线路',
    crossBorderPath: '本地家庭宽带直接跨越运营商国际公网出口连接海外 VPS',
    peakCongestionResistance: '较弱（晚高峰极易受到国际出口 QoS 拥堵影响，跨网丢包严重）',
    latencyJitter: '昼夜落差极大（凌晨流畅，20:00–23:00 抖动翻倍甚至超时）',
    typicalMonthlyPrice: '常见 ¥5–¥12/月 极低价档位或自建单台低价 VPS',
    verificationMethod: '可在晚高峰 21:00 对比 32 线程测速与 YouTube 4K 缓冲波动验证',
  },
  {
    lineType: '公网 BGP 中转线路',
    crossBorderPath: '本地先连国内多线 BGP 入口机房，再经优化后的公网路由出海落地',
    peakCongestionResistance: '中等（本地三网接入稳定性大幅提升，但跨境段仍可能受骨干网波动波及）',
    latencyJitter: '明显平稳于直连，常规浏览与高清视频流畅',
    typicalMonthlyPrice: '常见 ¥15–¥25/月 入门与均衡档位',
    verificationMethod: '核查入口机房地区是否覆盖移动/联通/电信三网优化及晚高峰丢包',
  },
  {
    lineType: 'IEPL / IPLC 物理内网专线',
    crossBorderPath: '国内入口接入后，通过运营商点对点内网专线直接跨境到达香港/日/新落地机房',
    peakCongestionResistance: '强（物理路径绕开拥堵公网国际出口，抗晚高峰波动能力最突出）',
    latencyJitter: '延迟抖动最小，适合视频会议、高频 AI 交互与稳定长期挂机',
    typicalMonthlyPrice: '实测主流月付 ¥18–¥27（部分品牌年付折算可下探至 ¥5.6–¥11/月，但注意勿盲目囤多年付）',
    verificationMethod: '仍需警惕单一“超售严重”专线；务必先用月付或小额试用验证晚高峰并发表现',
  },
];

export const MOBILE_VPN_CLIENT_MATRIX: MobileClientRow[] = [
  {
    client: 'Shadowrocket（小火箭）',
    os: 'iOS / iPadOS / macOS (Apple Silicon)',
    coreOrCompat: '自主核心，兼容 SS、VLESS-Reality、Trojan、Hysteria 2 与多数机场订阅',
    acquisitionChannel: '仅限非国区 App Store 搜索官方原名获取',
    costModel: 'App Store 一次性付费买断（外区美区 $2.99 左右，视地区汇率而定）',
    caveatsAndStrengths: 'iOS 普及度最高、省电且协议覆盖全面；注意防伪装山寨同名 App，绝不用未知共享 iCloud 登录系统设置',
    detailHref: '/guides/ios-proxy-clients-guide/',
  },
  {
    client: 'Stash',
    os: 'iOS / iPadOS / macOS (Apple Silicon)',
    coreOrCompat: '完整面向 Clash / Mihomo YAML 语法与 Override 覆写生态设计',
    acquisitionChannel: '非国区 App Store 官方商店',
    costModel: '外区 App Store 一次性付费购买（价格高于小火箭）',
    caveatsAndStrengths: '最适合把电脑端 Clash Verge Rev 的配置和 AI/流媒体分流规则无缝沿用到 iPhone 与 iPad',
    detailHref: '/guides/stash-ios-clash-override/',
  },
  {
    client: 'Quantumult X（圈 X）',
    os: 'iOS / iPadOS',
    coreOrCompat: '强于 HTTP/HTTPS 复写、脚本扩展与自定义规则分流',
    acquisitionChannel: '非国区 App Store 官方商店',
    costModel: '美区 App Store 付费购买',
    caveatsAndStrengths: '高阶规则与脚本生态丰富；新协议（如部分最新形态）更新节奏与原生 Clash 语法兼容性不如 Stash 直观',
    detailHref: '/reviews/ios-proxy-apps-review/',
  },
  {
    client: 'Surge 5',
    os: 'iOS / macOS',
    coreOrCompat: '专业网络调试与高稳定性规则引擎',
    acquisitionChannel: '外区 App Store 官方下载核心壳',
    costModel: 'App Store 免费下载，完整高级功能需较贵的应用内购订阅',
    caveatsAndStrengths: '稳定性与网络调试能力顶级，主要面向开发者、重度 Apple 生态用户与高预算群体',
    detailHref: '/reviews/ios-proxy-apps-review/',
  },
  {
    client: 'Karing / Hiddify / Clash Mi / SFI',
    os: 'iOS / Android / 桌面多端',
    coreOrCompat: '基于 sing-box 或 Mihomo 的开源/免费跨端客户端',
    acquisitionChannel: 'iOS 通过外区 App Store 下载；Android/桌面通过 GitHub 官方 Release 获取',
    costModel: '免费开源（无内置付费节点）',
    caveatsAndStrengths: '非常适合不愿为 iOS 工具额外付费或希望手机、电脑统一免费起步的用户；高阶脚本自定义相对精简',
    detailHref: '/clash/hiddify-karing-beginner-guide/',
  },
  {
    client: 'FlClash / Clash Meta for Android (CMFA)',
    os: 'Android',
    coreOrCompat: '内置 Mihomo（Clash.Meta）内核，完整支持现代协议与分应用代理',
    acquisitionChannel: 'GitHub 官方 Release（注意区分 arm64-v8a / universal 安装包）',
    costModel: '免费开源',
    caveatsAndStrengths: 'FlClash 桌面与安卓交互统一；CMFA 规则细分完善。务必在手机电池设置中设为「不限制后台」，防止锁屏断连',
    detailHref: '/guides/android-proxy-clients-guide/',
  },
  {
    client: 'v2rayNG / SFA (sing-box for Android)',
    os: 'Android',
    coreOrCompat: 'Xray-core (v2rayNG) / sing-box (SFA)',
    acquisitionChannel: 'GitHub 官方 Release / F-Droid 开源库核验发布',
    costModel: '免费开源',
    caveatsAndStrengths: '安卓端极端轻量稳定；需注意若使用过早期流行的 NekoBox for Android，原版维护有限且 Google Play 曾出现被接管风险，务必核验原始发布仓库',
    detailHref: '/guides/android-proxy-clients-guide/',
  },
];

export const VPN_DECISION_BRANCHES: VpnDecisionBranch[] = [
  {
    title: '分支 1：国内日常开发、AI 工具与国内外网站高频混合使用',
    badge: '绝大多数用户首选',
    condition: '需要同时顺畅打开微信、淘宝、公司内网，以及 GitHub、Docker、ChatGPT、Claude、YouTube 4K，希望网速快且价格可控。',
    recommendation: '放弃传统国际商业 VPN，选择开源「Clash Verge Rev / FlClash / Shadowrocket」配合具备 IEPL/IPLC 专线与多地区节点的规则代理订阅（主流月付 ¥15–¥27 区间即可起步）。',
    avoid: '不要买动辄五六百元一年的国际商业 VPN 期望直连翻越；也不要把规则模式长期切成 Global 全局模式。',
    steps: [
      '依据操作系统选对开源客户端（Win/Mac 用 Clash Verge Rev，iPhone 用小火箭/Stash/Karing，Android 用 FlClash/CMFA）。',
      '在品牌筛选库核对线路类型（IEPL 专线 vs BGP 中转）及原生 Clash 订阅支持，坚持先月付实测再决定是否续费。',
      '开启 Rule 规则模式并用 Merge 覆写固定 AI 专用组节点，避免频繁换 IP 触发账号验证。',
    ],
    href: '/comparisons/vpn-vs-airport-proxy/',
    ctaText: '查看 VPN 与规则代理深层对照',
  },
  {
    title: '分支 2：电商多店铺、TikTok 直播运营或海外金融/企业严风控',
    badge: '隔离防关联路线',
    condition: '运营 Amazon / Shopify / TikTok 店铺、管理 PayPal 资金账号，或者严格禁止多用户共用同一个出口 IP。',
    recommendation: '必须使用「独享静态原生 IP 定制方案」（例如服务商提供的独享定制线，业内公开定制报价多在 ¥600–¥680/月左右）或企业合规专线/独立纯净住宅资源，切勿混用几十元一月的共享机场。',
    avoid: '绝对禁止在 ¥15–¥30/月的共享大众机场上登录高价值电商主账号或进行高额金融结算，一人违规封 IP 会连带整车用户受损。',
    steps: [
      '评估业务对固定归属地与住宅 ASN 纯净度的硬性要求，明确每月合规预算空间。',
      '与独享 IP 环境搭配隔离浏览器配置与独立设备指纹策略，测试出口 IP 纯净度（IPinfo / Scamalytics）与 WebRTC/时区防泄漏。',
      '企业内网代码或内部系统访问则同步搭配 WireGuard / Tailscale 点对点内网通道。',
    ],
    href: '/reviews/remote-work-vpn-vs-proxy/',
    ctaText: '阅读远程办公与独享 IP 边界评测',
  },
  {
    title: '分支 3：Steam / Switch / PS5 联机玩家与延迟敏感竞技场景',
    badge: '游戏联机专用',
    condition: '主要痛点是海外联机掉线、高 Ping 瞬移、P2P 房间无法匹配（NAT Strict），不需要通过该软件看网页或用 AI。',
    recommendation: '游戏联机优先使用合规主流网游加速器，或确保代理线路端具备稳定 FullCone NAT + UDP 转发并通过 OpenWrt / Clash TUN 单独承载主机/游戏流量，且两者绝不同时启用。',
    avoid: '切勿在电脑上同时启动网游加速器加速进程与 Clash Verge TUN 模式，两块虚拟网卡抢夺默认路由极易直接断网。',
    steps: [
      '只打游戏不查外网资料时，关闭桌面 Clash 客户端与系统代理，单独开启合规网游加速器。',
      '若要用自己的专线机场带主机（Switch/PS5/Xbox）联机，优先在旁路由 OpenClash / PassWall2 或 PC 开启允许局域网 + TUN 配合 UDP 转发实测 NAT 类型。',
    ],
    href: '/guides/game-booster-vs-proxy/',
    ctaText: '看清游戏加速器与代理路由差异',
  },
  {
    title: '分支 4：临时应急、校园网弱网高丢包或无梯新机起步',
    badge: '应急与弱网路线',
    condition: '处于高丢包校园网/移动晚高峰，或刚拿到一台全新电脑还没有安装正版客户端与购买正式订阅。',
    recommendation: '先按安全冷启动步骤获取经过 SHA256 核验的正版开源客户端，绝不下未知免费破解 VPN；校园网极端限速环境下优先切 Hysteria 2 协议测试；如因预算仅偶发查阅资料，可选择可靠服务的按需不限时小流量包代替高危免费 VPN。',
    avoid: '远离搜索引擎广告里号称“永久免费不限速不限量”的陌生 VPN 客户端和要求安装系统根证书的加速器。',
    steps: [
      '拒绝使用他人分享的未知 Apple ID 登录 iCloud，仅按安全规范获取开源或官方客户端。',
      '若遇本地宽带对 UDP 严重限速导致 Hysteria 2 失效，及时切换 VLESS-Reality 或 Trojan TCP 链路验证。',
      '短期低频需求转至低门槛按量不限时方案并做敏感账号隔离。',
    ],
    href: '/guides/free-vpn-privacy-audit/',
    ctaText: '查看免费 VPN 拆解与安全自检',
  },
];

export const VPN_ACTION_CARDS: VpnActionCard[] = [
  {
    title: 'VPN 与规则代理方案及 32 家品牌筛查库',
    category: '服务筛选 · 月付实价与专线核查',
    summary: '如果你已明确需要支持 Clash/VLESS 协议、具备 IEPL/IPLC 专线或按量不限时套餐的合规订阅来源，可直接按月付实价、协议支持、流媒体/AI 解锁及审计状态自主筛选。',
    scopeNote: '严格遵循 A 区知识分区规范，本页不设外部推广按钮，所有商业评测与参数对照均集中于独立品牌库与评测区。',
    href: '/brands/',
    ctaLabel: '了解详情',
  },
  {
    title: '全平台客户端安全获取与 Clash 配置完全手册',
    category: '工具起步 · Win / Mac / iOS / Android',
    summary: '覆盖 Clash Verge Rev、FlClash、v2rayN、Shadowrocket、Stash 与安卓端 GitHub 安全校验流程，手把手完成导入、TUN 虚拟网卡开启与 DNS 防泄漏设置。',
    scopeNote: '所有推荐客户端均为空白本地代理软件，下载过程注意核对 SHA256 与硬件架构。',
    href: '/clash/',
    ctaLabel: '获取客户端',
  },
  {
    title: '桌面代理性能对比与 2026 机场选型方法论',
    category: '避坑读本 · 先测后付原则',
    summary: '在掏钱购买任何长期方案或商业 VPN 前，先读懂“不囤多年付、查明倍率与设备限制、用 32 线程并发与 AI 实测验收”的四条通用风控法则。',
    scopeNote: '帮你把试错成本控制在单月体验门槛以内，远离跑路包与虚假年付折算。',
    href: '/reviews/2026-airport-selection-methodology/',
    ctaLabel: '查看教程',
  },
];

export const VPN_HUB_FAQS: VpnFaqItem[] = [
  {
    question: '为什么很多知名度很高的国际商业 VPN，在国内实际连不上或经常断流？',
    answer: '绝大多数国际老牌商业 VPN 面向全球市场设计，主要解决海外公共 Wi-Fi 防窃听与跨区看流媒体需求。它们默认使用的 OpenVPN、IKEv2 或标准 WireGuard 端口具有极明显的通信特征，且服务器入口都在海外公网直连，没有经过国内 BGP 入口中转或 IEPL 内网专线优化，因此在复杂网络环境中极易遇到协议特征干扰或国际出口晚高峰剧烈丢包。',
    anchorHref: '#vpn-vs-proxy-matrix',
    anchorLabel: '传统 VPN vs 规则代理 vs 游戏加速器总对比',
  },
  {
    question: '游戏加速器（如 UU / 雷神）能顺便拿来上 Google 或用 ChatGPT 吗？',
    answer: '不能。合规网游加速器采用严格的“进程 + 服务器 IP 白名单”驱动机制，只接管加速库里收录的特定游戏进程与 UDP 联机数据包；你的 Chrome 浏览器、PowerShell 终端以及 ChatGPT/Claude 请求压根不会被加速器接管，依然会直接走本地宽带出去。更要注意不要在电脑上同时开着游戏加速器和 Clash 的 TUN 模式，否则容易争夺默认路由引发整机断网。',
    anchorHref: '#booster-vs-proxy',
    anchorLabel: '游戏加速器与全流量代理的路由边界',
  },
  {
    question: '苹果 iPhone / iPad 上用哪个“手机 VPN”或代理工具最省心？一定要花钱吗？',
    answer: 'iOS 上功能最稳定、兼容性最广的是老牌买断制 App Shadowrocket（俗称小火箭），而如果你希望直接沿用桌面 Clash Verge 的 YAML 规则与覆写配置，则优选 Stash；这两款都需要使用非国区 Apple ID 在 App Store 付费购买。如果不想额外购买客户端软件，也可以在非国区 App Store 免费获取 Karing、Hiddify、Clash Mi 或 sing-box 官方版（SFI）。无论哪种工具，都务必仅在 App Store 临时切换账号下载软件，绝不在“系统设置”顶栏登录陌生共享 iCloud 账号。',
    anchorHref: '#mobile-vpn-guide',
    anchorLabel: '移动端（iOS / Android）工具选择与省电保活',
  },
  {
    question: '免费 VPN 到底能不能用？有哪些必须识别的高危风险？',
    answer: '必须区分“知名商业厂商限额体验版”与“来路不明的无主体永久免费 VPN”。国际大厂的 Freemium 版通常严格限制每月 2GB–10GB 流量或只开放拥挤节点，依靠付费用户补贴成本；真正高危的是没有任何清晰公司主体和隐私政策，却宣称“永久免费不限速”的不明 APK 或浏览器插件——它们往往通过收集浏览行为变现、劫持广告，甚至在后台把你的家用宽带变成他人使用的 P2P 住宅出口节点，把违法合规风险直接甩给你的本地宽带 IP。',
    anchorHref: '#free-vpn-audit',
    anchorLabel: '免费 VPN 商业模式拆解与四项安全红线',
  },
  {
    question: '选协议时总是看到 VLESS-Reality、Trojan 和 Hysteria 2，普通人该选哪种？',
    answer: '如果你购买的服务商已经使用了 IEPL/IPLC 物理专线入口，VLESS、Trojan 与 Shadowsocks 2022 的日常体验和速度差别极小，哪条延迟更稳选哪条即可；但如果你所在地区处于校园网或某些移动晚高峰高丢包公网环境下，基于 QUIC UDP 拥塞控制的 Hysteria 2 往往能比普通 TCP 协议抢出高得多的带宽。唯独当本地运营商明确对 UDP 做了严厉 QoS 限速时，再果断切回 VLESS-Reality 或 Trojan。',
    anchorHref: '#protocol-principles',
    anchorLabel: '主流传输协议与弱网抗丢包原理解析',
  },
  {
    question: '宣传“IEPL 物理专线”的加速订阅就一定不会在晚高峰卡顿吗？',
    answer: '不一定，专线解决的是“跨境那一段绕开拥堵公网国际出口”的问题，而不是包治百病的免死金牌。一条标榜 IEPL 的线路在晚高峰（20:00–23:00）是否依然坚挺，还取决于三个现实条件：1）你当地电信/联通/移动宽带连向服务商国内入口机房（如沪/粤 BGP）的跨网质量；2）该服务商在这条专线带宽上到底超售了多少并发用户；3）海外落地节点本身是否拥堵或 IP 被 AI/流媒体拉黑。因此任何宣称都要先以月付实测为准。',
    anchorHref: '#line-architecture',
    anchorLabel: '公网直连、BGP 中转与 IEPL/IPLC 专线对比',
  },
  {
    question: '用几十元一个月的普通共享专线机场登录海外电商店铺或银行账号安全吗？',
    answer: '风险极高，强烈不建议。月费 ¥15–¥30 档位的常规订阅服务属于成百上千用户共享相同的几个海外落地出口 IP。哪怕传输层已加密不会被窃听明文，一旦同 IP 上有其他用户触犯了 Amazon、TikTok、PayPal 或海外银行的风控规则，平台会直接判定该 IP 关联的所有店铺或账号存在异常关联而冻结或强制审核。涉商、资金和主力海外运营场景请使用独享静态原生 IP 定制方案或合规自建独立线路。',
    anchorHref: '#remote-work-and-ip',
    anchorLabel: '远程办公、防关联与独享原生 IP 的合规边界',
  },
  {
    question: '开启 VPN 或 Clash 后浏览国内网页（微信、淘宝、B站）变得奇慢无比怎么办？',
    answer: '十有八九是你错用成了传统 VPN 的全局隧道接管模式，或者在 Clash/小火箭里把路由切换成了「Global 全局模式」或没有加载最新国内直连分流规则。正确状态下应长期锁定为「Rule 规则模式 / 配置分流模式」，让国内 IP 与常用国内域名通过 DIRECT 本地宽带直出，只有海外域名才转发至代理节点。如果开了规则模式依然卡顿，请继续排查本地 DNS 是否被强行全部丢给海外解析以及本地 IPv6 泄漏问题。',
    anchorHref: '#dns-webrtc-leaks',
    anchorLabel: '分流防拖慢与 DNS / WebRTC / IPv6 防泄漏自检',
  },
  {
    question: '自己买一台便宜的海外云服务器（VPS）自建 WireGuard 或 VLESS 会比买成熟服务更省钱吗？',
    answer: '单纯算硬件年租金，入门廉价海外 VPS 有时看似只需一两百元一年，但隐性门槛与隐性成本往往远高于预期：普通廉价 VPS 走公网直连，一到晚高峰国际出口依然丢包卡顿；如果你要买带 CN2 GIA 或三网优化的高速直连机房，单台服务器月租往往就远远超过普通机场几倍；此外自建一旦端口或 IP 受损，换 IP 费与运维排障时间成本全由自己承担。自建仅适合对运维有掌控欲、需要独享固定 IP 或想顺便承载私有服务的开发者。',
    anchorHref: '#line-architecture',
    anchorLabel: '自建直连线路与商用中转/专线的成本与路径对比',
  },
];

export const VPN_INTERNAL_CLUSTER_LINKS: VpnClusterLink[] = [
  {
    title: '传统商业 VPN 与规则代理机场深度对比',
    purpose: '从 OpenVPN/WireGuard 特征阻断、分流粒度到月度真实支出做一次系统对比。',
    href: '/comparisons/vpn-vs-airport-proxy/',
    tag: 'VPN 推荐',
  },
  {
    title: '免费 VPN 隐私政策与商业模式拆解',
    purpose: '看懂 Freemium 限流版与高危“寄生住宅代理/窃取日志”免费工具的分界线。',
    href: '/guides/free-vpn-privacy-audit/',
    tag: '免费 VPN 避坑',
  },
  {
    title: 'iPhone / iPad 代理客户端配置全攻略',
    purpose: '详细对比 Shadowrocket、Stash、Quantumult X 与免费跨端工具 Karing/Hiddify。',
    href: '/guides/ios-proxy-clients-guide/',
    tag: '手机端 · iOS',
  },
  {
    title: 'Android 安卓端客户端选型与省电优化',
    purpose: '覆盖 FlClash、CMFA、v2rayNG、SFA 与防杀后台保活关键设置。',
    href: '/guides/android-proxy-clients-guide/',
    tag: '手机端 · Android',
  },
  {
    title: '游戏加速器与全流量代理的路由区别',
    purpose: '解释为什么开网游加速器打不开 ChatGPT，以及如何避免 TUN 网卡冲突断网。',
    href: '/guides/game-booster-vs-proxy/',
    tag: '加速器边界',
  },
  {
    title: 'IEPL / IPLC 专线与公网 BGP 中转技术对比',
    purpose: '理清物理内网专线与公网入口中转的价格差距及晚高峰丢包真实成因。',
    href: '/comparisons/iepl-vs-bgp-transit/',
    tag: '线路对比',
  },
  {
    title: 'VLESS-Reality、Trojan 与 Hysteria 2 横向对比',
    purpose: '结合校园网/移动弱网与 IEPL 专线场景，判断不同协议的耗电与速度表现。',
    href: '/comparisons/vless-trojan-hysteria2-comparison/',
    tag: '协议原理',
  },
  {
    title: '远程办公、外贸独立站与独享原生 IP 方案评测',
    purpose: '划分共享机场节点与独享静态原生 IP（定制方案）之间的账号风控安全边界。',
    href: '/reviews/remote-work-vpn-vs-proxy/',
    tag: '办公防关联',
  },
  {
    title: 'sing-box 与 Mihomo 内核架构差异对比',
    purpose: '理解下一代多端工具 Karing/Hiddify/SFA 与 Clash 系内核的分流规则生态差别。',
    href: '/comparisons/sing-box-vs-mihomo-core/',
    tag: '内核对比',
  },
  {
    title: 'WebRTC、时区与 DNS 防泄漏实用校验清单',
    purpose: '防止表面 IP 已切换海外，但真实浏览器 WebRTC 或时区语言仍暴露本地位置。',
    href: '/guides/webrtc-and-timezone-leak-prevention/',
    tag: '隐私防泄漏',
  },
  {
    title: 'iOS 付费与免费代理软件深度横评',
    purpose: '围绕价格成本、Clash YAML 兼容性与后台内存稳定性评估 iOS 热门代理 App。',
    href: '/reviews/ios-proxy-apps-review/',
    tag: '软件评测',
  },
  {
    title: '专属定制 App 与开源通用 Clash 客户端对比',
    purpose: '衡量“下载即登录一键用”厂商专用端与开源客户端在安全透明度上的权衡。',
    href: '/comparisons/custom-app-vs-universal-client/',
    tag: '好用与可控',
  },
];
