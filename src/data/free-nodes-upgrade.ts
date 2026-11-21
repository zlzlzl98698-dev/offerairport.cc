export interface FreeChannelRow {
  category: string;
  cost: string;
  quotaAndCycle: string;
  clientsAndProtocols: string;
  stability: string;
  aiAndStreaming: string;
  limitsAndRisks: string;
  verifiedNote: string;
}

export interface FreeClientRow {
  platform: string;
  clientName: string;
  coreEngine: string;
  licenseCost: string;
  officialSource: string;
  cautionNote: string;
}

export interface DecisionBranch {
  id: string;
  scenario: string;
  budget: string;
  recommendedPath: string;
  avoidAction: string;
  nextHref: string;
  nextLabel: string;
}

export interface UpgradeFaqItem {
  question: string;
  answer: string;
  anchorHref?: string;
  anchorLabel?: string;
}

export const FREE_CHANNELS_COMPARISON: FreeChannelRow[] = [
  {
    category: '公开免费节点池（GitHub / Telegram 分享）',
    cost: '¥0（零费用）',
    quotaAndCycle: '无固定配额，按公开池轮换，常见几小时至 1–2 天失效',
    clientsAndProtocols: '常见 SS / VMess / Trojan / 少量 VLESS；需手动导入通用客户端',
    stability: '极不稳定，晚高峰（20:00–23:00）大面积 Timeout 或严重限速',
    aiAndStreaming: '极差（公共出口 IP 普遍被 ChatGPT、Claude 与 Netflix 风控屏蔽）',
    limitsAndRisks: '存在流量嗅探、HTTP 广告注入与钓鱼蜜罐风险；严禁登录任何重要账号',
    verifiedNote: '行业公开规律核实（2026-11-20），本站不分发未核验陌生订阅 URL',
  },
  {
    category: '来路不明的「永久免费破解 VPN App」',
    cost: '表面 ¥0（隐性隐私成本极高）',
    quotaAndCycle: '宣称不限时/不限量，实际常伴随高频强制看广告或随时停服',
    clientsAndProtocols: '闭源第三方打包客户端（Android APK / 浏览器扩展居多）',
    stability: '低，且常限制单线程速率',
    aiAndStreaming: '多数无法稳定解锁，易触发异常人机验证',
    limitsAndRisks: '可能要求安装自定义根证书解密 HTTPS、读取设备信息或将本地宽带寄生为住宅代理出口',
    verifiedNote: '风险情报审计结论（2026-11-20），强烈不建议使用',
  },
  {
    category: '商业 VPN 官方受限免费层（Freemium）',
    cost: '¥0 起（依赖付费用户补贴）',
    quotaAndCycle: '通常每月限额 2GB–10GB，或仅开放 2–3 个拥挤国家节点',
    clientsAndProtocols: '官方专用闭源客户端；常见 OpenVPN / WireGuard / 自研封装',
    stability: '在允许直连的网络环境较稳，但在复杂跨境网络下标准端口连通率偏低',
    aiAndStreaming: '免费节点通常封禁流媒体解锁，AI 可用性随共享拥挤度波动',
    limitsAndRisks: '需注册验证邮箱，部分产品对免费层限制 P2P 与设备数量（通常限 1 台）',
    verifiedNote: '商业模式审计结论（2026-11-20）',
  },
  {
    category: '开源免费第三方代理客户端软件（不含节点）',
    cost: '¥0（桌面/安卓永久开源免费；iOS 视应用而定）',
    quotaAndCycle: '无流量限制（软件仅做本地调度，需配合自有节点或合规订阅）',
    clientsAndProtocols: 'Clash Verge Rev、FlClash、v2rayN、Hiddify、Karing（支持全主流协议）',
    stability: '取决于上游节点与本地内核版本（推荐 Mihomo / sing-box）',
    aiAndStreaming: '客户端自身支持精细规则分流（可将 AI 域名单独指向美日节点）',
    limitsAndRisks: '认准 GitHub Releases 并核对 SHA256；NekoBox 严禁使用 Play 商店第三方控制版',
    verifiedNote: '核实自《第三方代理客户端.txt》（2026-11-20）',
  },
  {
    category: '一次性不限时流量包（低频 / 灾备替代）',
    cost: '¥99–¥147 一次性买断（不可单月拆买）',
    quotaAndCycle: '100GB–247GB 永久不过期（不按月清零，用完为止）',
    clientsAndProtocols: '二猫云/唯兔云/一翻云/星岛梦/光速云支持 Clash 通用订阅；无忧/Firefly 仅专属端',
    stability: 'IEPL/IPLC 专线为主，远高于公开免费节点，仍受服务商长期运营周期约束',
    aiAndStreaming: '资料多标注支持主流流媒体与 AI，其中光速云等明确提示 ChatGPT/Gemini 视节点切换',
    limitsAndRisks: '单 GB 买断成本约 ¥0.60–¥1.08；部分特殊套餐明确不支持退款',
    verifiedNote: '核实自《32家机场品牌清单.txt》及《光速云品牌信息.txt》（2026-10-19）',
  },
  {
    category: '入门月付 / 年付小包（高频日常替代）',
    cost: '真实月付 ¥18–¥25/月；年付小包 ¥79.9–¥99/年（折合 ¥6.6–¥8.25/月）',
    quotaAndCycle: '年付小包 40GB–69GB/月重置；标准月付 100GB–168GB/月重置',
    clientsAndProtocols: '支持 VLESS / Trojan / Hysteria 2 / SS；建议优先挑支持第三方订阅品牌',
    stability: '可先通过单月 ¥18–¥25 实测本地宽带晚高峰表现，降低长期锁死风险',
    aiAndStreaming: '可用独立规则分流访问 AI 与流媒体，实际解锁仍建议按月实测确认',
    limitsAndRisks: '5.6 元档 5 家存在高度同质化与链接缺 #/ 异常；多数年付特价不适用优惠码且不退款',
    verifiedNote: '核实自品牌数据库 32 档案审计与 2026-08-11 测速档案',
  },
];

export const FREE_CLIENTS_MATRIX: FreeClientRow[] = [
  {
    platform: 'Windows / macOS / Linux',
    clientName: 'Clash Verge Rev',
    coreEngine: 'Mihomo (Clash.Meta)',
    licenseCost: '开源免费',
    officialSource: 'GitHub Releases (clash-verge-rev)',
    cautionNote: 'Mac 严格区分 aarch64 (M系列) 与 x64 (Intel)；慎防中文搜索竞价仿冒官网',
  },
  {
    platform: 'Windows / macOS / Linux / Android',
    clientName: 'FlClash',
    coreEngine: 'Mihomo',
    licenseCost: '开源免费',
    officialSource: 'GitHub Releases',
    cautionNote: '界面跨桌面与安卓高度统一，适合直接导入标准 Clash YAML 订阅',
  },
  {
    platform: 'Windows / macOS / Linux',
    clientName: 'v2rayN',
    coreEngine: 'Xray / sing-box / Mihomo',
    licenseCost: '开源免费',
    officialSource: 'GitHub Releases',
    cautionNote: '同时兼容单条分享链接（vless:// 等）、Base64 通用订阅与 Clash YAML',
  },
  {
    platform: '全平台 (桌面 + 移动)',
    clientName: 'Hiddify / Karing',
    coreEngine: 'sing-box',
    licenseCost: '开源免费（iOS 视外区上架）',
    officialSource: 'GitHub / 外区 App Store',
    cautionNote: '对新手友好、支持自动节点选择；复杂 JS 覆写仍建议用 Mihomo 客户端',
  },
  {
    platform: 'Android',
    clientName: 'v2rayNG / Clash Meta for Android',
    coreEngine: 'Xray / Mihomo',
    licenseCost: '开源免费',
    officialSource: 'GitHub Releases',
    cautionNote: '注意：NekoBox 官方提示维护资源有限且警告切勿使用 Google Play 第三方控制版',
  },
  {
    platform: 'iOS / iPadOS',
    clientName: 'Clash Mi / Karing / SFI（另有付费小火箭/Stash）',
    coreEngine: 'Mihomo / sing-box',
    licenseCost: '部分免费（小火箭/Stash/圈X 在美区为付费应用）',
    officialSource: '非国区 App Store',
    cautionNote: '仅在 App Store 内部切换外区账号下载，严禁在系统设置 iCloud 登录陌生共享账号',
  },
  {
    platform: 'OpenWrt 软路由 / Linux 服务器',
    clientName: 'OpenClash / PassWall2 / Nikki / v2rayA',
    coreEngine: 'Mihomo / Xray / sing-box',
    licenseCost: '开源免费',
    officialSource: 'GitHub',
    cautionNote: 'Nikki 明确要求 OpenWrt 24.10+；部署前需确认架构、包管理器及 fw4/nftables 依赖',
  },
];

export const DECISION_BRANCHES: DecisionBranch[] = [
  {
    id: 'branch-zero',
    scenario: '只查 1–2 次公开技术文档或下载 GitHub 开源安装包',
    budget: '¥0（零预算应急）',
    recommendedPath: '仅在独立浏览器无痕窗口配合开源客户端测试临时可用节点，不登录任何账号，下载后立刻执行 SHA256 校验。',
    avoidAction: '切勿为了图省事安装来源不明的破解免费 VPN 或要求安装系统根证书的加速器。',
    nextHref: '/clash/verify-client-checksum/',
    nextLabel: '查看 SHA256 校验方法',
  },
  {
    id: 'branch-backup',
    scenario: '每月用量不足 10GB，或为主力线路准备一条断联热备',
    budget: '¥99–¥147（一次买断用半年到两年）',
    recommendedPath: '优先选择支持第三方 Clash 订阅的百元级一次性不限时流量包（如二猫云 ¥99/100G、唯兔云 ¥100/100G、一翻云 ¥100/100G、光速云 ¥147/247G），配合 Clash Fallback 故障转移。',
    avoidAction: '不要购买仅限专属 App 的不限时包作软路由灾备；也不要一次买近千元 1TB 永久包承担长期运营风险。',
    nextHref: '/reviews/onetime-traffic-airports-guide/',
    nextLabel: '查看不限时包单 GB 对比',
  },
  {
    id: 'branch-ai-dev',
    scenario: '每天高频使用 ChatGPT / Claude / Gemini、GitHub 与终端工具',
    budget: '¥18–¥25/月（真实按月付费）',
    recommendedPath: '选择保留第三方订阅、明示 IEPL 与协议的月付入门档先测当地晚高峰（如一翻云 ¥20/150G、唯兔云 ¥19.9/150G、光速云 ¥25/168G 或速界 ¥25/150G），并开启 Clash AI 独立分流与 TUN 模式。',
    avoidAction: '不要用公开免费节点注册或登录主力 OpenAI / Anthropic 账号；不要长期使用香港节点直连 AI。',
    nextHref: '/clash/verge-rules-and-proxy-groups/',
    nextLabel: '获取 AI 分流覆写脚本',
  },
  {
    id: 'branch-student',
    scenario: '学生或轻度日常访问（每月 40–60GB 以内，预算极敏感）',
    budget: '¥79–¥99/年（折合约 ¥6.6–¥8.25/月）',
    recommendedPath: '在了解「年付小包通常不支持退款与优惠码」的前提下，优先挑选仍支持通用 Clash 订阅的成熟品牌轻量年付（如唯兔云 ¥79.9、二猫云 ¥89、光速云 ¥99），或先试一个月低价月付再转年付。',
    avoidAction: '警惕规格高度雷同的 5.6 元集群及缺少 #/ 的异常链接，勿为省几元购买两年/三年超长周期。',
    nextHref: '/comparisons/cheap-annual-airports-audit/',
    nextLabel: '查看低价年付审计报告',
  },
  {
    id: 'branch-business',
    scenario: 'TikTok 直播、跨境多店铺防关联、企业远程固定出口',
    budget: '¥600+/月（独享静态原生 IP 定制）',
    recommendedPath: '脱离公共共享池与普通月付机场，选择独享原生 IP 与独立带宽定制方案（如光速云 ¥680/月定制、暮光 ¥600/月定制或正规独立云服务器自建），同时做好 WebRTC 与时区环境隔离。',
    avoidAction: '绝对禁止使用免费节点或几十元多人共享机场登录高价值海外电商店铺或收款账户。',
    nextHref: '/reviews/remote-work-vpn-vs-proxy/',
    nextLabel: '查看远程办公与独享方案评测',
  },
];

export const FREE_NODES_FAQS: UpgradeFaqItem[] = [
  {
    question: '为什么本页不直接贴出「每日更新免费 Clash/V2Ray 订阅链接」？',
    answer: '核心原因是可核实性与安全边界。公开抓取的免费订阅池平均寿命只有几小时，不仅极易在发布后迅速失效、产生大量死链，而且本站无法验证未知匿名服务器运营方是否记录明文流量或投放恶意规则。因此本页坚持只提供可核实的开源客户端渠道、7 步隔离自测方法与透明的低成本替代数据。',
    anchorHref: '#free-node-origins',
    anchorLabel: '查看公开免费节点来源与寿命分析',
  },
  {
    question: '有没有零元就能长期稳定用来上 ChatGPT、Claude 和看 4K Netflix 的免费节点？',
    answer: '现实中几乎不存在。ChatGPT、Claude 与 Netflix 对出口 IP 纯净度和并发请求数风控极严，免费公开节点的 IP 往往被成千上万人同时共用，绝大多数会在极短时间内被拉黑或触发无限人机验证。高频 AI 与流媒体需求建议至少选择支持分流规则的合规月付服务，并将 AI 域名固定分流至新加坡、日本或美国节点。',
    anchorHref: '#security-risks',
    anchorLabel: '查看 AI 账号封禁与风控原因',
  },
  {
    question: '只是想用免费节点临时去 GitHub 下载一个 Clash Verge Rev 安装包，怎样做到最安全？',
    answer: '可采用「无痕隔离 + 哈希校验」两道防线：第一，不在代理开启期间登录任何个人账号；第二，安装包下载完毕后立刻断开免费节点，在本地终端执行 `Get-FileHash`（Windows）或 `shasum -a 256`（macOS）比对 GitHub Releases 官方公布的 SHA256 值，完全匹配后再运行安装。',
    anchorHref: '#isolated-testing',
    anchorLabel: '查看第 1–2 步冷启动与哈希校验命令',
  },
  {
    question: '为什么很多免费梯子或破解版 VPN 要求手机「安装信任证书」或开启无障碍权限？',
    answer: '一旦你在手机或电脑上安装了未知来源的 CA 根证书，该软件就具备了对你所有 HTTPS 加密流量（包括账号密码、聊天内容和网页表单）进行中间人解密（MitM）的能力；而纯代理工具只需要系统 VPN 描述文件权限，完全不需要系统根证书、通讯录或短信权限。遇到此类要求请立即卸载。',
  },
  {
    question: '为什么在机场品牌清单中很少见到「免费试用」？哪些品牌明确声明不提供试用？',
    answer: '为了防止羊毛党批量注册机器刷光专线带宽，目前多数 IEPL/IPLC 机场已取消无门槛免费试用。例如一翻云、SOGO 云、隐形人等在资料中明确注明不提供免费试用；光速云也注明特殊商品不支持退款。因此更稳妥的试错方式是先买支持按月结算的标准月付档（如 ¥18–¥25）实测晚高峰一周。',
    anchorHref: '#low-cost-alternatives',
    anchorLabel: '查看真实月付门槛与不限时包明细',
  },
  {
    question: '我听说有些机场标注「¥5.6/月」或「¥8/月」，这是不是和免费差不多可以按月买？',
    answer: '不是按月付 ¥5.6 或 ¥8！经过对 32 个档案的核算，「¥5.6/月」（大佬云、闪电鼠、云界线、榴莲云、环球梯）和「¥8/月」（光速云轻量版 ¥99/年、星岛梦 ¥96/年）全部属于年付总价除以 12 的「折算月均价」，结账时必须一次性付清全年费用。真正能只买 1 个月体验的价格，主流集中在 ¥18–¥27/月。',
  },
  {
    question: '在测试陌生免费节点或新购机场时，测速显示 500Mbps 是不是就代表晚高峰不会卡？',
    answer: '不一定。正如本站《2026-08-11 测速实测资料包》所揭示的，测速图往往是特定时间点（如凌晨或午后非晚高峰）在珠海联通 5Gbps/9Gbps 机房跑出的 32 线程峰值快照，并不代表晚上 20:00–23:00 你本地家用宽带的单线程观看体验。测试时务必看清时间戳、平均速度以及 0B 失效节点比例。',
    anchorHref: '#isolated-testing',
    anchorLabel: '查看第 5 步测速读数规范',
  },
  {
    question: '手机端（iPhone 与 Android）不想花钱买客户端，有哪些正规免费的开源替代品？',
    answer: 'Android 端所有主流客户端（FlClash、v2rayNG、Clash Meta for Android、Hiddify、Karing）均在 GitHub 免费开源；iOS 端在非大陆区 App Store 可查看 Karing、Clash Mi、sing-box (SFI) 或 Streisand 是否免费上架（注意 Shadowrocket 小火箭、Stash 与 Quantumult X 在美区均为付费买断应用）。同时请记住安卓端切勿从 Google Play 下载第三方控制的 NekoBox。',
    anchorHref: '#channels-comparison',
    anchorLabel: '查看开源客户端完整清单',
  },
  {
    question: '开启免费节点或便宜代理后，为什么国内网站也变慢，而且月底流量莫名少了几十 GB？',
    answer: '主要有两个原因：第一，客户端误处于 `Global（全局模式）` 而非 `Rule（规则模式）`，导致国内视频、网盘和系统更新全走代理；第二，未设置 `PROCESS-NAME` 进程直连或未启用国内 DNS 分流，使 BT/P2P 下载器偷偷走代理隧道。开启规则模式并配置本地直连规则即可解决。',
  },
  {
    question: '如果我实在每月只用几个 GB 查资料，不想按月续费，最划算的方案是什么？',
    answer: '建议采用「开源通用客户端 + 百元级一次性不限时流量包」。比如二猫云（¥99 / 100GB）、唯兔云（¥100 / 100GB）、一翻云（¥100 / 100GB）、星岛梦（¥100 / 100GB）或光速云致敬斯诺克 147 永久套餐（¥147 / 247GB，约 ¥0.595/GB），流量不会按月清零，若每月仅查文字资料可用一年以上。',
    anchorHref: '#decision-branches',
    anchorLabel: '查看决策分支与适用条件',
  },
];

export const FREE_NODES_INTERNAL_LINKS = [
  {
    title: '公开免费节点的来源、寿命与安全边界（专项精简教程）',
    href: '/resources/free-nodes-security-guide/',
    purpose: '补充独立教程页中的精简安全守则与隔离浏览步骤',
  },
  {
    title: '免费梯子与公开节点安全审计',
    href: '/guides/free-proxy-security-risks/',
    purpose: '深入拆解免费代理背后的广告劫持与账号风控逻辑',
  },
  {
    title: '免费 VPN 隐私政策与商业模式拆解',
    href: '/guides/free-vpn-privacy-audit/',
    purpose: '对比 Freemium 限额免费层与高危破解 App 的本质差异',
  },
  {
    title: '应急免费梯子 vs 低成本合规替代方案',
    href: '/guides/low-cost-vs-free-proxy/',
    purpose: '核算时间损耗与按需不限时包的长期总成本',
  },
  {
    title: '无代理冷启动安全获取 GitHub 官方客户端',
    href: '/guides/safe-client-download-without-vpn/',
    purpose: '解决第一次配置工具还没有代理时怎么安全拿到正版安装包',
  },
  {
    title: '安装包 SHA256 数字指纹校验指南',
    href: '/clash/verify-client-checksum/',
    purpose: '复制即可用的 Windows/macOS/Linux 哈希校验命令',
  },
  {
    title: '科学解读节点测速截图：RTT、HTTPS 与单日快照局限',
    href: '/resources/how-to-test-nodes/',
    purpose: '配合实测截图学会辨别真正可用的节点',
  },
  {
    title: 'IP 纯净度与 AI / 流媒体解锁检测教程',
    href: '/resources/ip-purity-and-unlock-check/',
    purpose: '验证节点能否实际打开 ChatGPT、Claude 与 Netflix',
  },
  {
    title: '浏览器 WebRTC、DNS 泄漏与时区指纹排查',
    href: '/guides/webrtc-and-timezone-leak-prevention/',
    purpose: '防止挂上节点后依然暴露真实本地网络位置',
  },
  {
    title: '一次性不限时流量包机场盘点与单 GB 核算',
    href: '/reviews/onetime-traffic-airports-guide/',
    purpose: '对比 11 家提供不过期流量包的品牌费用与第三方兼容性',
  },
  {
    title: '5.6–8 元年付入门档机场横向审计',
    href: '/comparisons/cheap-annual-airports-audit/',
    purpose: '识别同质化集群、异常链接与年付沉没风险',
  },
  {
    title: '机场跑路预警清单：6 大前兆与风控原则',
    href: '/resources/airport-exit-scam-warning-signs/',
    purpose: '避免被超低价两年/三年付收割',
  },
];
