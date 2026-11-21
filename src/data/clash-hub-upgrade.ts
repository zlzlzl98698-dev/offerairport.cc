export interface ClashClientRow {
  name: string;
  platform: string;
  core: string;
  archOrFormat: string;
  subscriptionSupport: string;
  maintenanceAndCaveats: string;
  targetUser: string;
  detailHref: string;
}

export interface DesktopClientDeepRow {
  client: string;
  coreEngine: string;
  uiStack: string;
  tunAndService: string;
  overrideCapability: string;
  bestFor: string;
  status: string;
}

export interface ModeCompareRow {
  dimension: string;
  optionA: string;
  optionB: string;
  optionC?: string;
}

export interface DecisionBranch {
  title: string;
  badge: string;
  condition: string;
  recommendation: string;
  avoid: string;
  steps: string[];
  href: string;
  ctaText: string;
}

export interface ClashFaqItem {
  question: string;
  answer: string;
  anchorHref?: string;
  anchorLabel?: string;
}

export interface ActionGuideCard {
  title: string;
  category: string;
  summary: string;
  scopeNote: string;
  href: string;
  ctaLabel: '获取客户端' | '查看教程' | '了解详情';
}

export interface InternalClusterLink {
  title: string;
  purpose: string;
  href: string;
  tag: string;
}

export const CLASH_PLATFORM_MATRIX: ClashClientRow[] = [
  {
    name: 'Clash Verge Rev',
    platform: 'Windows / macOS / Linux',
    core: 'Mihomo (原 Clash.Meta)',
    archOrFormat: 'Win x64 / arm64；Mac Intel x64 / Apple Silicon aarch64；Linux .deb / .rpm / .AppImage',
    subscriptionSupport: '原生支持 Clash / Mihomo YAML、Sub-Store 转换后配置与全局/局部覆写',
    maintenanceAndCaveats: '开源持续维护（桌面端主力）；下载时须核对 GitHub 官方 Release 与 SHA256，防仿冒钓鱼站点',
    targetUser: '绝大多数 Windows / macOS / Linux 新手与进阶用户',
    detailHref: '/clash/verge-complete-guide/',
  },
  {
    name: 'FlClash',
    platform: 'Windows / macOS / Linux / Android',
    core: 'Mihomo',
    archOrFormat: '桌面端安装包 + Android APK，界面基于 Flutter 统一渲染',
    subscriptionSupport: '原生 Clash / Mihomo YAML 订阅，支持基础规则与节点测速',
    maintenanceAndCaveats: '活跃维护中；跨桌面与安卓端操作逻辑一致，占用适中，但高阶 JS 覆写脚本生态不如 Verge Rev 丰富',
    targetUser: '希望电脑与安卓手机共用同一套界面习惯的跨平台用户',
    detailHref: '/clash/flclash-cross-platform-guide/',
  },
  {
    name: 'v2rayN',
    platform: 'Windows / macOS / Linux',
    core: '多内核调度（Xray / sing-box / Mihomo）',
    archOrFormat: '绿色压缩包或安装版（依赖 .NET 运行时或自带包）',
    subscriptionSupport: '既可直连 V2Ray/Base64 单节点订阅，也可切换 Mihomo 内核加载部分配置',
    maintenanceAndCaveats: '开源高活跃；界面偏工程向、信息密度高，适合多协议调试与同时管理几十条杂乱订阅',
    targetUser: '熟悉节点协议参数、需要多内核切换与精细路由的进阶玩家',
    detailHref: '/clash/v2rayn-multi-core-guide/',
  },
  {
    name: 'Clash Nyanpasu',
    platform: 'Windows / macOS / Linux',
    core: 'Mihomo / Clash Rs 可选',
    archOrFormat: 'Win / Mac (x64 & arm64) / Linux 常规发行包',
    subscriptionSupport: '完整 Clash YAML 与 Profile 合并脚本（Chain / JS / Lua）',
    maintenanceAndCaveats: '开源维护中；核心切换与配置链设计清晰，适合习惯自定义多段分流脚本的高级桌面用户',
    targetUser: '折腾多配置文件合并、关注内核版本切换的桌面进阶用户',
    detailHref: '/clash/clash-nyanpasu-overview/',
  },
  {
    name: 'Hiddify / Karing / Clash Mi',
    platform: 'Win / Mac / Linux / Android / iOS',
    core: 'sing-box 或 Mihomo（视具体工具而定）',
    archOrFormat: '跨端统一包（iOS 需使用非国区 Apple ID 从 App Store 获取）',
    subscriptionSupport: '普遍兼容通用订阅与 Clash/sing-box 混合导入，开箱规则较简化',
    maintenanceAndCaveats: '交互最简化、新手易上手；高级自定义策略组和细粒度分流控制弱于 Clash Verge Rev 或 Stash',
    targetUser: '追求“粘贴订阅即连”、极少修改规则的跨端轻量用户',
    detailHref: '/clash/hiddify-karing-beginner-guide/',
  },
  {
    name: 'Clash Meta for Android (CMFA)',
    platform: 'Android',
    core: 'Mihomo',
    archOrFormat: 'APK（区分 arm64-v8a / armeabi-v7a / universal）',
    subscriptionSupport: '标准 Clash / Mihomo YAML 订阅、分应用代理（黑白名单）',
    maintenanceAndCaveats: '安卓端经典 Mihomo 客户端；注意配合省电白名单避免后台被杀，下载需认准官方 GitHub 仓库',
    targetUser: '安卓端需要使用完整 Mihomo 规则分流与覆写的用户',
    detailHref: '/guides/android-proxy-clients-guide/',
  },
  {
    name: 'Shadowrocket / Stash / Quantumult X',
    platform: 'iOS / iPadOS（部分支持 macOS Apple Silicon）',
    core: '各自闭源或 Clash-兼容引擎（Stash 兼容 Mihomo 语义）',
    archOrFormat: '仅限外区 App Store 付费购买（非国区 Apple ID）',
    subscriptionSupport: 'Shadowrocket 兼容最广；Stash 原生直接支持 Clash YAML 订阅与 Override 覆写',
    maintenanceAndCaveats: 'Stash 最适合把桌面 Clash 配置直接复用到 iPhone；Surge 5 功能最强但完整功能需内购',
    targetUser: 'iPhone / iPad 主力用户（追求 Clash 语义一致优先选 Stash）',
    detailHref: '/reviews/ios-proxy-apps-review/',
  },
  {
    name: 'OpenClash / Nikki / PassWall2',
    platform: 'OpenWrt 软路由 / 旁路由',
    core: 'Mihomo (OpenClash / Nikki)；sing-box / Xray (PassWall2)',
    archOrFormat: '.ipk / .apk 路由器插件包（依赖固件架构 x86_64 / aarch64 等）',
    subscriptionSupport: 'OpenClash 与 Nikki 直接使用 Clash YAML 配置；PassWall2 偏向节点池与分流列表',
    maintenanceAndCaveats: 'Nikki 明确要求 OpenWrt 24.10 及以上系统环境；OpenClash 生态成熟但内存占用相对较高',
    targetUser: '家庭全屋透明代理、NAS、主机游戏联机与旁路由部署用户',
    detailHref: '/comparisons/openclash-vs-passwall2-vs-nikki/',
  },
  {
    name: 'Clash for Windows (CFW) / 原版 ClashX',
    platform: '历史存档（已停止维护）',
    core: '旧版 Clash / Clash Premium 内核',
    archOrFormat: '原作者仓库已于 2023 年 11 月停更并下线',
    subscriptionSupport: '不支持 VLESS-Reality、Hysteria2、TUIC v5 等现代协议',
    maintenanceAndCaveats: '不建议继续新装或从不明网盘下载“汉化修改版”，建议立即平滑迁移至 Clash Verge Rev',
    targetUser: '仅针对仍在运行老旧版本、准备导出旧配置迁移的存量用户',
    detailHref: '/clash/migrate-from-cfw-to-verge/',
  },
];

export const DESKTOP_DEEP_COMPARISON: DesktopClientDeepRow[] = [
  {
    client: 'Clash Verge Rev',
    coreEngine: '内置 Mihomo，支持内核更新',
    uiStack: 'Tauri + Rust + React（低内存、启动快）',
    tunAndService: '原生提供 Service Mode 服务模式，一键授权开启真 TUN 虚拟网卡',
    overrideCapability: '支持全局扩展配置（Merge）与 JavaScript 扩展脚本（Script）',
    bestFor: '兼顾日常稳定性、低占用、AI 分流规则覆写与排障可视化',
    status: '主力首选（开源持续更新）',
  },
  {
    client: 'FlClash',
    coreEngine: '内置 Mihomo',
    uiStack: 'Flutter（桌面与安卓 UI 完全一致）',
    tunAndService: '支持虚拟网卡接管与常规系统代理',
    overrideCapability: '基础规则切换与界面设置完善，高阶批量脚本相对精简',
    bestFor: 'Windows + Android 双持用户、偏好现代 Material 视觉风格',
    status: '主力备选（活跃维护）',
  },
  {
    client: 'v2rayN',
    coreEngine: '可调度 Xray / sing-box / Mihomo',
    uiStack: 'C# / Avalonia（跨平台重写后支持 Win/Mac/Linux）',
    tunAndService: '支持开启 TUN 模式（配合 sing-box/Mihomo 内核）与本地 Mixed 端口',
    overrideCapability: '重点强在批量测速、多服务器路由规则与自定义底层 JSON/YAML',
    bestFor: '同时拥有 V2Ray 链接、自建 VPS 节点与机场 YAML 的重度技术用户',
    status: '极客首选（高活跃）',
  },
  {
    client: 'Clash Nyanpasu',
    coreEngine: 'Mihomo / Clash Rs 多内核架构',
    uiStack: 'Tauri + React，侧重配置文件链式管理',
    tunAndService: '支持系统服务安装与 TUN 虚拟网卡模式',
    overrideCapability: '强于多配置 Profile Merge 与链式修改器',
    bestFor: '熟悉 Clash 规则树结构、经常对比不同版本内核差异的开发者',
    status: '进阶备选（活跃维护）',
  },
  {
    client: 'Mihomo Party',
    coreEngine: 'Mihomo',
    uiStack: 'Electron（界面直观、内置较多快捷开关）',
    tunAndService: '支持虚拟网卡与轻量服务接管',
    overrideCapability: '图形化覆写项细致，免手写基础 YAML',
    bestFor: '仅建议先核实上游仓库近期更新状态后再评估选用，勿盲信非官方分发包',
    status: '备选观察（需核实维护状态）',
  },
];

export const PROXY_MODE_COMPARISON: ModeCompareRow[] = [
  {
    dimension: '流量接管方式：系统代理 vs TUN 虚拟网卡',
    optionA: '系统代理（System Proxy）：仅修改操作系统的 HTTP/HTTPS/SOCKS5 代理端口（默认如 7897），只对浏览器等主动读取系统设置的软件生效。',
    optionB: 'TUN 模式（虚拟网卡）：在系统网络层创建虚拟网卡（如 Meta / utun）并接管三层/四层流量，强制接管终端 git/npm/curl、Docker、游戏客户端、微软商店 UWP 应用及全部 UDP 流量。',
    optionC: '实际建议：日常浏览网页开「系统代理」更省电且不干扰局域网设备；只要发现终端、游戏或非浏览器客户端不走代理，再开启 TUN + 服务模式。',
  },
  {
    dimension: '出站路由：Rule（规则）vs Global（全局）vs Direct（直连）',
    optionA: 'Rule（规则模式，日常必选）：按订阅内 rules 或本地规则集判断，国内 IP/域名直连（Direct），海外与 AI 走对应代理策略组，屏蔽项走 REJECT。',
    optionB: 'Global（全局模式，仅限排障）：所有未匹配特殊规则的请求全部塞进 GLOBAL 策略组；若在里面选了代理节点，访问淘宝、微信、网银都会绕道海外导致极慢甚至风控。',
    optionC: 'Direct（直连模式）：完全放行所有流量不走远程节点，仅用于临时暂停代理而不关闭软件或配合调试工具。',
  },
  {
    dimension: 'DNS 映射模式：Fake-IP vs Redir-Host',
    optionA: 'Fake-IP（198.18.0.0/16 保留段）：收到 DNS 请求立即返回虚拟 IP，把真实域名传给远端节点解析。连接极快、零 DNS 污染风险，是 Mihomo 默认推荐模式。',
    optionB: 'Redir-Host：本地先向上游查询真实海外 IP 再连接代理。部分内网穿透软件、公司 VPN 或某些严格校验真实 IP 的本地服务会要求用 Redir-Host。',
    optionC: '实际建议：普通与 AI 用户保持 Fake-IP 并加配 fake-ip-filter 放行公司内网域名、BT/游戏与局域网检测域名；特殊内网冲突时再切 Redir-Host。',
  },
  {
    dimension: '内核代际：Mihomo（Clash.Meta）vs 原版 Clash vs sing-box',
    optionA: 'Mihomo 内核：兼容传统 Clash YAML 语法，同时完整支持 VLESS-Reality、Hysteria2、TUIC、Sniffer 域名嗅探、GEOSITE/GEOIP、Sub-Rule 与现代 DNS 分流。',
    optionB: '原版停更 Clash / Premium：仅停留在早期 SS/SSR/VMess/Trojan 阶段，无法解析现代机场常用的 Reality 与 Hysteria2 节点，导入即报错或整段节点消失。',
    optionC: 'sing-box 内核：结构化 JSON 驱动，性能优秀、多协议通用（Hiddify/Karing/SFA/PassWall2 采用），但配置语法与 Clash YAML 不互通，需经转换。',
  },
];

export const CLASH_DECISION_BRANCHES: DecisionBranch[] = [
  {
    title: '分支 A：Windows / macOS 普通用户（追求稳妥、省心、不踩坑）',
    badge: '最推荐路线',
    condition: '日常主力访问网页、YouTube/Netflix、ChatGPT/Claude，希望软件长期可更新且不乱改系统网络。',
    recommendation: '安装 Clash Verge Rev（Mac 请先核对 Intel x64 与 M 系列 Apple Silicon 对应版本），保持 Rule 规则模式 + 系统代理，仅在用终端或游戏时切 TUN。',
    avoid: '切勿在百度等搜索引擎竞价广告里点击“Clash 官网”或下载修改版 Clash for Windows；不要长期挂在 Global 全局模式看国内视频。',
    steps: [
      '通过官方 GitHub Releases 核对发行包与 SHA256 后安装。',
      '从已审计服务商后台复制 Clash / Mihomo 专用订阅链接，在“订阅”页粘贴导入。',
      '打开“系统代理”开关，并在策略组对海外组执行延迟测速选择低延迟可用节点。',
      '遇到浏览器正常但客户端工具连不上时，再进入设置启用“服务模式 + TUN 模式”。',
    ],
    href: '/clash/verge-official-download-guide/',
    ctaText: '获取官方安全下载与校验指南',
  },
  {
    title: '分支 B：开发者 / 终端重度用户 / PC 联机玩家',
    badge: '全流量接管路线',
    condition: '高频使用 git、npm、pip、Docker、WSL2、Steam/主机加速器代理或需要完整 UDP 转发。',
    recommendation: '使用 Clash Verge Rev 或 Clash Nyanpasu 开启 Service Mode + TUN（gvisor 或 system 栈），或使用 v2rayN 搭配 sing-box/Mihomo 内核实现进程级与局域网精细控制。',
    avoid: '不要依赖命令行临时 export http_proxy 后忘记取消导致国内源镜像走代理；WSL2 / Docker 若遇网络回环异常需开启 Allow LAN 并放行防火墙规则。',
    steps: [
      '在客户端内先完成“服务模式（Service Mode）”安装并重启生效，否则 TUN 开关无法真正建起虚拟网卡。',
      '在 Fake-IP 过滤列表加入本地镜像源域名、内网域名及 NTP 时间服务器。',
      '确认机场节点本身支持 UDP 转发，并在策略/配置确认 udp: true 已启用。',
      'Windows 微软商店应用、Xbox 或 Edge 扩展若仍无网，运行一次 UWP 回环豁免工具。',
    ],
    href: '/clash/tun-mode-udp-guide/',
    ctaText: '查看 TUN 虚拟网卡与终端配置',
  },
  {
    title: '分支 C：Android / iOS 手机平板用户（跨端一致体验）',
    badge: '移动端路线',
    condition: '在手机端需要稳定分流、看流媒体、不希望在后台频繁杀进程或规则冲突。',
    recommendation: 'Android 优先选择 FlClash（界面直观）或 Clash Meta for Android；iOS 若希望直接沿用 Clash YAML 与覆写脚本选 Stash，预算优先兼重兼容选 Shadowrocket，免费轻量选 Karing / Hiddify / Clash Mi。',
    avoid: 'Android 切忌在不明第三方应用商店下载所谓“加速优化版 NekoBox / Clash”；iOS 勿使用陌生共享 Apple ID 登录 iCloud（只可在 App Store 临时登录下载）。',
    steps: [
      'Android 下载 APK 后务必核对 CPU 架构（主流现代手机为 arm64-v8a）并把应用设为电池“不受限制”。',
      'iOS 使用非国区 Apple ID 仅登录 App Store 下载软件后立即切回自己账号，绝不在系统“设置”顶端登录未知 ID。',
      '若服务商只提供 V2Ray 链接却要在 Stash/CMFA 使用，先通过本地/可信转换或 Sub-Store 转为 Mihomo 格式。',
    ],
    href: '/guides/ios-proxy-clients-guide/',
    ctaText: '查看移动端全平台客户端指南',
  },
  {
    title: '分支 D：OpenWrt 软路由 / Linux 无桌面服务端用户',
    badge: '旁路由与运维路线',
    condition: '希望家中电视盒子、Switch/PS5、Apple TV 全自动无感分流，或在无 GUI 的 Ubuntu/Debian 主机上部署。',
    recommendation: 'OpenWrt 传统固件选 OpenClash 或 PassWall2，OpenWrt 24.10+ 现代 nftables 固件可评估 Nikki 或 HomeProxy；无桌面 Linux 服务器推荐使用 v2rayA 或直接运行独立 Mihomo 二进制配合 systemd。',
    avoid: '不要在 Flash/RAM 仅 128MB 的低配老路由器硬塞大型 GeoIP/GeoSite 数据库，极易引发内存溢出整网断流。',
    steps: [
      '确认路由器固件版本号及架构（如 OpenWrt 24.10+ 对 Nikki 是硬性前提）。',
      '合理设置旁路由网关与 DNS 指向，避免与主路由 DHCP 形成环路。',
      '开启精简版规则集并定期清理内核日志，防止占满路由器存储空间。',
    ],
    href: '/comparisons/openclash-vs-passwall2-vs-nikki/',
    ctaText: '查看 OpenWrt 三大插件对比',
  },
];

export const CLASH_ACTION_CARDS: ActionGuideCard[] = [
  {
    title: 'Clash Verge Rev 官方安全下载与架构区分指南',
    category: '安装与校验 · 零风险起步',
    summary: '核实 GitHub 官方仓库归属，区分 Windows x64/ARM64、macOS Intel/Apple Silicon 与 Linux 安装包，并附 SHA256 哈希核验与仿冒广告识别方法。',
    scopeNote: '不含任何商业诱导链接，直达官方核验流程与各系统报错处置。',
    href: '/clash/verge-official-download-guide/',
    ctaLabel: '获取客户端',
  },
  {
    title: '订阅导入、格式转换与九步排障全景教程',
    category: '配置与排障 · 从入门到进阶',
    summary: '涵盖订阅 URL 导入、User-Agent 被拒处理、Base64 转 Clash YAML、TUN 与 Fake-IP DNS 防泄漏配置，以及全节点 Timeout 逐层诊断。',
    scopeNote: '适合已完成客户端安装、需要一次把分流、AI 节点和排障逻辑跑通的用户。',
    href: '/clash/verge-complete-guide/',
    ctaLabel: '查看教程',
  },
  {
    title: '客户端只是壳：如何配合独立品牌数据筛选合适订阅？',
    category: '选型延展 · 商业与架构分流',
    summary: 'Clash 客户端本身不提供任何网络节点。若你正在比较线路稳定性（IEPL 专线 vs 公网中转）、月付/不限时定价或 Clash 订阅原生支持情况，可进入方法论与品牌筛选库独立评估。',
    scopeNote: '保持教程区纯洁性，商业套餐、测速证据与合规筛选全部收敛至评测与品牌数据库。',
    href: '/reviews/2026-airport-selection-methodology/',
    ctaLabel: '了解详情',
  },
];

export const CLASH_HUB_FAQS: ClashFaqItem[] = [
  {
    question: '为什么我搜 Clash 官网下载并安装后，界面全是广告甚至被提示高风险？',
    answer: '原版 Clash 核心与 Clash for Windows 已于 2023 年 11 月停止维护并撤下官方仓库，目前网络上大量以“clash官网”、“clash中文网”等名义购买搜索引擎竞价排名的站点并非原作者所有，其中不少甚至捆绑木马、劫持浏览器首页或盗取账号凭证。请务必核对开源项目的官方 GitHub Releases，并在下载后核对 SHA256 校验值；若本地暂时无法直连 GitHub，可查看站内无梯冷启动与校验教程。',
    anchorHref: '#official-download',
    anchorLabel: '官方安全下载、架构识别与校验流程',
  },
  {
    question: '我把之前的机场订阅导入旧版 Clash，为什么节点数量变少甚至全部报错？',
    answer: '因为主流服务商自 2024 年起已广泛切换为 VLESS-Reality、Hysteria2 或 TUIC v5 等现代协议，而停更的旧版 Clash 内核并不认识这些字段，导致整批节点被跳过或直接解析报错 YAML syntax/type error。将客户端替换为内置 Mihomo 内核的 Clash Verge Rev、FlClash 或 Clash Nyanpasu 即可直接兼容绝大多数现代 Clash Meta 订阅。',
    anchorHref: '#mihomo-dns-rules',
    anchorLabel: 'Mihomo 内核特性与协议代际差异',
  },
  {
    question: '为什么测速全部显示绿色低延迟（比如 40ms），网页和 ChatGPT 却依然打不开或 Timeout？',
    answer: '客户端里的 URL-Test 延迟测速通常只测算本地到订阅节点的 HTTP 204 握手耗时，不代表节点出口没被目标站风控、也不代表你本地 DNS 或系统时间正确。建议按顺序排查：1）核对电脑/手机系统时间误差是否在 30 秒内；2）是否误把全局切换到了 Direct 或没有激活选中的节点；3）查看内核日志是否出现 DNS timeout 或 TLS handshake error；4）检查是否和 360/火绒/UU加速器/旧代理残留产生端口或 TUN 冲突。',
    anchorHref: '#troubleshooting-handbook',
    anchorLabel: '高频故障排查手册与九步诊断',
  },
  {
    question: '开启 Clash Verge 的系统代理后，为什么终端（git / npm / curl）还是直连超时？',
    answer: '大多数命令行工具、Docker 容器以及部分游戏客户端并不会自动读取 Windows 或 macOS 的“系统代理（System Proxy）”。你有两种解决思路：一是临时在当前终端写入 HTTP_PROXY/ALL_PROXY 环境变量指向本地 Mixed 端口（如 7897）；二是直接在 Clash Verge Rev 中安装并启用“服务模式（Service Mode）”，随后打开“TUN 模式”，在网卡层无缝接管全部命令行和客户端流量。',
    anchorHref: '#system-proxy-vs-tun',
    anchorLabel: '系统代理 vs TUN 虚拟网卡与 UDP 实战',
  },
  {
    question: 'Fake-IP 和 Redir-Host 该选哪个？开启后影响微信、网银或公司内网吗？',
    answer: '日常推荐保持 Mihomo 默认的 Fake-IP 模式：它在收到域名解析请求时先返回 198.18.0.x 段的虚拟地址，响应极快且能显著降低本地 DNS 泄漏与污染概率。但如果你在公司内网需要登录绑定特定内网 DNS 解析的 OA 系统、使用某些网银安全控件或游戏反作弊程序，可将相关域名加入配置中的 fake-ip-filter 放行列表，或者临时切换至 Redir-Host 模式验证兼容性。',
    anchorHref: '#mihomo-dns-rules',
    anchorLabel: 'Fake-IP vs Redir-Host 与 DNS 防泄漏',
  },
  {
    question: '为什么在 macOS（特别是 M1/M2/M3/M4 芯片）安装 Clash Verge Rev 后提示“已损坏，无法打开”？',
    answer: '这通常是两个原因之一：第一，下错了 CPU 架构包——Apple Silicon 芯片应下载 aarch64/arm64 版本，Intel 芯片才下载 x64 版本；第二，开源桌面工具未向苹果缴纳高额企业公证费，macOS Gatekeeper 隔离属性会拦截未签名应用。确认包体来自官方 GitHub 且 SHA256 核验无误后，可在“系统设置 -> 隐私与安全性”点击“仍要打开”，或在终端用官方推荐命令移除隔离属性。',
    anchorHref: '#official-download',
    anchorLabel: 'macOS 架构识别与 Gatekeeper 处理',
  },
  {
    question: '机场只提供了通用订阅或 Base64 链接，Clash Verge 导入后提示错误怎么办？',
    answer: 'Clash Verge Rev 原生需要 YAML 结构的配置文件，直接粘贴由节点链接拼接的 Base64 文本会解析失败。最稳妥的方法是：先在服务商后台查看是否有“Clash / Clash Meta 一键导入”或切换订阅链接后缀参数；若确实只有通用链接，优先选择客户端内置/本地自托管的 Sub-Store 服务做转换，或直接使用原生通吃多格式的 v2rayN、Karing、Hiddify，尽量避免将私人订阅地址提交给来路不明的公网在线订阅转换站。',
    anchorHref: '#subscription-workflow',
    anchorLabel: '订阅导入、格式转换与隐私安全',
  },
  {
    question: 'Clash 软件完全免费开源，里面为什么没有任何节点，还需要另外买服务吗？',
    answer: '是的。Clash Verge Rev、FlClash、v2rayN、Clash Nyanpasu 等都是纯粹的本地网络代理客户端外壳，不含任何服务器带宽。要实现跨境访问，你需要导入合规来源或自建的节点订阅配置。注意不要轻信网上随意捆绑免费节点的一键修改版客户端，也不要把重要账号密码暴露给来路不明的免费公共订阅池。',
    anchorHref: '#next-steps-and-brands',
    anchorLabel: '客户端与服务的分离边界与选型路径',
  },
  {
    question: '开启 Clash 后打开 IP 检测网站，发现本机真实 IPv6 或国内 DNS 还是暴露了怎么办？',
    answer: '这通常是因为本地宽带已分配公网 IPv6，而当前订阅配置或机场节点未妥善接管/屏蔽 IPv6 流量，导致浏览器优先走了本地直连 IPv6 通道（即所谓 IPv6 泄漏）。可在客户端配置中核查 ipv6 开关与 dns.ipv6 设置，确保使用覆写配置开启 DNS 分流（nameserver 与 fallback 明确拆分国内 DOH 与海外加密 DNS），并在不支持 IPv6 转发的节点环境下按需关闭或拦截出站 IPv6。',
    anchorHref: '#mihomo-dns-rules',
    anchorLabel: 'IPv6 双栈冲突与 DNS 防泄漏配置',
  },
];

export const CLASH_INTERNAL_CLUSTER_LINKS: InternalClusterLink[] = [
  {
    title: '2026 活跃维护的 Clash 系客户端清单',
    purpose: '对比桌面、移动端与软路由仍持续更新的主力工具，避开已停更或被接管风险项目。',
    href: '/clash/active-clash-clients-2026/',
    tag: 'Clash 推荐',
  },
  {
    title: '从已停更的 Clash for Windows 安全迁移',
    purpose: '无痛迁移旧版 Profiles、保留自建分流规则并升级至 Clash Verge Rev。',
    href: '/clash/migrate-from-cfw-to-verge/',
    tag: '平滑迁移',
  },
  {
    title: '安装包安全校验与防钓鱼指南',
    purpose: 'PowerShell / macOS / Linux 下三步核对 SHA256，识破搜索引擎竞价李鬼网站。',
    href: '/clash/verify-client-checksum/',
    tag: '安全下载',
  },
  {
    title: '通用订阅与 Clash YAML 格式不兼容解决方法',
    purpose: '区分 User-Agent 参数、Base64 格式与 Sub-Store 本地无泄漏转换方案。',
    href: '/clash/subscription-format-conversion/',
    tag: '订阅转换',
  },
  {
    title: 'Sub-Store 本地化部署与多订阅聚合',
    purpose: '把多家不同协议或格式的服务商订阅聚合成单一规范的 Mihomo 配置。',
    href: '/clash/sub-store-local-deployment/',
    tag: '进阶管理',
  },
  {
    title: 'Clash Verge 分流规则与 AI 策略组编写入门',
    purpose: '手把手通过 Merge 覆写实现 ChatGPT/Claude 独立走美日家宽/纯净节点。',
    href: '/clash/verge-rules-and-proxy-groups/',
    tag: '规则覆写',
  },
  {
    title: 'Mihomo (Clash Meta) 内核特性与协议支持清单',
    purpose: '解析 VLESS-Reality、Hysteria2、Sniffer 域名嗅探与 Sub-Rule 参数。',
    href: '/clash/mihomo-core-features-guide/',
    tag: '内核原理',
  },
  {
    title: 'Clash Meta DNS 防泄漏与 Fake-IP 详解',
    purpose: '解决国内站点解析变慢、WebRTC/DNS 泄漏以及公司内网 OA 冲突。',
    href: '/clash/dns-fakeip-configuration-guide/',
    tag: 'DNS 调优',
  },
  {
    title: 'Windows 防火墙与 UWP 应用回环豁免教程',
    purpose: '解决开启系统代理或 TUN 后微软商店、Edge、OneDrive 依然无网的问题。',
    href: '/clash/windows-firewall-and-uwp-loopback/',
    tag: '系统排障',
  },
  {
    title: 'Clash Verge 订阅下载/更新失败报错解决大全',
    purpose: '排查 403 Forbidden、TLS 证书错误、UA 被拦截与代理死循环。',
    href: '/clash/fix-subscription-update-failed/',
    tag: '订阅排障',
  },
  {
    title: '桌面端四大主力代理客户端性能实测对比',
    purpose: '量化对比 Clash Verge Rev、FlClash、v2rayN 与 Hiddify 的内存与调度差异。',
    href: '/comparisons/desktop-proxy-clients-benchmark/',
    tag: '横向对比',
  },
  {
    title: '专属客户端登录即用 vs 通用 Clash 客户端对比',
    purpose: '评估一键专属软件的便利性边界与 Clash 开源生态的长期可控优势。',
    href: '/comparisons/custom-app-vs-universal-client/',
    tag: '选型决策',
  },
];
