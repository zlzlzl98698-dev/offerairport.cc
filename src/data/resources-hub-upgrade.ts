export interface RiskSignalRow {
  signal: string;
  severity: string;
  whatItLooksLike: string;
  immediateAction: string;
}

export interface NodeTestMetricRow {
  metricName: string;
  whatItMeasures: string;
  commonMisconception: string;
  verificationStandard: string;
}

export interface GlossaryCompareRow {
  term: string;
  realMeaning: string;
  impactOnCostOrExperience: string;
  howToVerify: string;
}

export interface ResourcesDecisionBranch {
  badge: string;
  title: string;
  condition: string;
  recommendation: string;
  avoid: string;
  steps: string[];
  href: string;
  ctaText: string;
}

export interface ResourcesActionCard {
  category: string;
  title: string;
  summary: string;
  scopeNote: string;
  href: string;
  ctaLabel: '查看教程' | '了解详情' | '获取客户端';
}

export interface ResourcesFaqItem {
  question: string;
  answer: string;
  anchorHref?: string;
  anchorLabel?: string;
}

export interface ResourcesClusterLink {
  tag: string;
  title: string;
  purpose: string;
  href: string;
}

export const EXIT_SCAM_SIGNALS_TABLE: RiskSignalRow[] = [
  {
    signal: '1. 突发低价超长多年付收割（2 年 / 3 年 / 终身）',
    severity: '极高危预警',
    whatItLooksLike: '平日稳定运营的机场突然全场 5 折促销两年付、三年付甚至大额 1TB 终身包，且仅限特定收款通道或取消月付。',
    immediateAction: '绝对不要趁折扣加仓续费；若距离现有套餐到期尚久，立刻准备一套支持 Clash 的百元不限时热备订阅。',
  },
  {
    signal: '2. 官网主域名频繁失联且无官方发布页公告',
    severity: '高危预警',
    whatItLooksLike: '原官网打不开、TG 频道或工单系统突然禁言停更超过 72 小时，找不到官方发布的防失联备用域名。',
    immediateAction: '优先排查是否为本地 DNS 阻断；确认全网普遍无法访问后立即修改相同邮箱与常用密码，切断账号撞库链。',
  },
  {
    signal: '3. 节点大面积持续 Timeout 且后台只剩极少数残余地区',
    severity: '高危预警',
    whatItLooksLike: '原有港/日/新/美数十条节点在无维护通知下连续 3 天以上全灭，或者偷偷把 IEPL 专线降级成极卡的廉价直连。',
    immediateAction: '导出最新运行日志排查本地因素；排除本地故障后即刻切换至备用订阅，不再向该账户充值。',
  },
  {
    signal: '4. 强迫卸载开源客户端改用不明闭源修改版 App',
    severity: '中高危安全警戒',
    whatItLooksLike: '突然宣布关闭原有通用 Clash 订阅接口，且新推专属客户端未开源、安装包来自网盘且要求关闭杀毒软件或安装根证书。',
    immediateAction: '切勿在存有主力资产的日常电脑/手机直接安装，必须验证哈希或换回支持标准通用订阅的服务。',
  },
  {
    signal: '5. 工单系统长期无人响应与退款承诺彻底失灵',
    severity: '中危观察信号',
    whatItLooksLike: '提交工单超过一周只剩机器人自动回复，节点长期不修补，或者客服频道出现大量删评封禁投诉用户。',
    immediateAction: '记录当前余额与到期时间，停止继续绑定或推荐他人，逐步把主力工作流迁出。',
  },
];

export const NODE_TEST_METRICS_TABLE: NodeTestMetricRow[] = [
  {
    metricName: 'RTT / TCP Ping 与 HTTPS URL-Test 延迟',
    whatItMeasures: '本地与节点握手耗时（RTT 仅测链路连通；URL-Test 模拟经节点访问 HTTP 204 的端到端响应）。',
    commonMisconception: '把测速软件显示的 25ms 绿字当成“肯定能开网页”，忽略落地出口可能被目标站风控或节点认证失效。',
    verificationStandard: '重点看 HTTPS URL-Test 而非单纯 ICMP Ping，同时核查是否与香港/新加坡物理距离合理（港节点通常 20–55ms，美西 130–185ms）。',
  },
  {
    metricName: '单线程 vs 32 线程带宽曲线（MAI-TEST-BOT / 喵速）',
    whatItMeasures: '测试机房（如珠海联通 5Gbps / 9Gbps）向机场单节点发起并发下载时的平均速率与最高峰值。',
    commonMisconception: '拿白天闲时（14:00）测到的 500Mbps 当成自己家晚高峰 21:00 的保底网速。',
    verificationStandard: '重点观察测试时间戳是否位于 20:00–23:00 晚间，以及截图中出现 0B / KB 级超时节点占比高不高。',
  },
  {
    metricName: 'NAT 类型检测（FullCone vs Symmetric 对称型）',
    whatItMeasures: '节点出口是否允许外部 UDP 回包穿透，决定 Switch/PS5/PC 联机匹配和 QUIC/语音通话质量。',
    commonMisconception: '认为只要能下载网页，游戏联机就能自动达到 NAT Type A / Open。',
    verificationStandard: '联机或语音玩家应在支持 UDP 的节点下实测 STUN NAT 状态，并确保 Clash TUN 转发正常。',
  },
  {
    metricName: 'IP 纯净度与流媒体 / AI 解锁矩阵',
    whatItMeasures: '出口 IP 属于机房段（IDC）还是家宽/原生广播段（ISP），是否被 Netflix/Disney+/OpenAI/Anthropic 拦截。',
    commonMisconception: '以为“香港节点最贵最快就一定能用 ChatGPT 或 Claude”，忽视官方地理政策限制。',
    verificationStandard: '使用 RegionRestrictionCheck 或实际无痕访问测试具体地区（AI 固定测美/日/新/台节点），区分“全节点稳定”与“视节点而定”。',
  },
];

export const GLOSSARY_MATRIX_TABLE: GlossaryCompareRow[] = [
  {
    term: '年付折算月均价 vs 真实月付价',
    realMeaning: '“¥5.6/月”或“¥8/月”往往是“年付 ¥67–¥99 ÷ 12”的折算均价，不支持单月只掏几块钱购买。',
    impactOnCostOrExperience: '年付小包常限 40–69GB/月且不支持退款与优惠码；真实可单月购买通常在 ¥15–¥27/月。',
    howToVerify: '下单前切换计费周期下拉框看 1 个月实际结算金额，切勿被首屏最低月均数诱导。',
  },
  {
    term: '流量倍率（1x vs 2x / 5x）',
    realMeaning: '节点转发 1GB 实际数据时，面板后台从你的总配额里按倍数扣除的统计规则。',
    impactOnCostOrExperience: '误用 ×3 或 ×5 倍率节点看 4K 视频，150GB 套餐实际只够跑 30–50GB 就会提前耗尽断网。',
    howToVerify: '查看节点名称尾部标注（如 ×1、0.5x、×2）及机场说明，优先锁定 1 倍主力节点。',
  },
  {
    term: '原生 IP（Native IP）vs 广播 IP',
    realMeaning: '原生 IP 指注册地与实际机房广播地区一致的本地 IP；广播 IP 则为他国机构跨区调拨广播使用。',
    impactOnCostOrExperience: '原生或住宅属性更高的 IP 在流媒体非自制剧、TikTok 地区识别与 AI 风控校验上通过率更高。',
    howToVerify: '借助 IPinfo / BGP.he.net 查询 ASN 类型（Hosting vs ISP）及 Whois 注册国与实际定位是否一致。',
  },
  {
    term: '流量重置日（按月自然日 vs 按购买日）',
    realMeaning: '包月套餐每月清零并重新下发全额流量的具体时刻算法。',
    impactOnCostOrExperience: '若商家按“每月 1 号重置”而你在 28 号付款，当月可能只有几天可用；多数主流面板现按购买日每 30 天滚动重置。',
    howToVerify: '核对面板订阅说明页的「重置周期」字段，及客户端导入后显示的到期/流量统计栏。',
  },
  {
    term: '通用第三方订阅 vs 仅专属客户端',
    realMeaning: '是否向用户开放标准 Clash/Mihomo YAML 或节点 URL 链接，还是强制只能下载官方自有 App 登录。',
    impactOnCostOrExperience: '仅专属客户端省去了配置门槛，但无法用于 OpenWrt 软路由、Linux 终端与 Clash 双活故障转移。',
    howToVerify: '查看品牌档案中的「接入方式」字段（自研+第三方 / 第三方订阅 / 仅专属端）。',
  },
];

export const RESOURCES_DECISION_BRANCHES: ResourcesDecisionBranch[] = [
  {
    badge: '失联与防跑路应急',
    title: '情景 1：主力机场突然全节点超时、官网打不开疑似跑路怎么办？',
    condition: '连续 24–72 小时所有节点超时，官方群组禁言或官网备用域名均无公告更新。',
    recommendation: '立即启动「断链降级应急三步」：优先检查本地时间与 DNS 排障，确认属服务端失联后切入百元不限时热备订阅，并立即修改在该机场用过的同款邮箱/密码。',
    avoid: '不要去搜索引擎搜该机场名字后点开来路不明的“最新官网”，也不要急着从网盘下载陌生替代客户端。',
    steps: [
      '先排查本地宽带与系统时间，确认并非单端设置故障。',
      '激活备用不限时订阅，确保 GitHub 与常用渠道沟通畅通。',
      '若该机场曾使用你的常用高权限密码注册，立刻更改该邮箱与重要账号密码。',
    ],
    href: '/resources/airport-outage-recovery/',
    ctaText: '查看机场失联应急恢复步骤',
  },
  {
    badge: '流量暴涨与防泄漏',
    title: '情景 2：明明没怎么看视频，后台剩余流量却一夜暴跌怎么办？',
    condition: '订阅后台已用流量出现非本人操作的异常陡增，或在客户端看到陌生远程连接记录。',
    recommendation: '第一时间在服务商面板点击「重置订阅链接（Reset Subscription Token）」，并关闭桌面客户端的「允许局域网连接（Allow LAN）」，检查下载软件 BT/PT 与系统更新分流规则。',
    avoid: '绝对不要把原始订阅链接原封不动提交到未知的第三方在线订阅转换网站，也不要在公共讨论区截图暴露带 Token 的完整 URL。',
    steps: [
      '登录机场后台立刻重置订阅链接并更新所有自有设备配置。',
      '核查客户端内节点是否误选高倍率节点（×2/×5），或规则切换到了 Global 模式导致国内大流量全走代理。',
      '检查网盘/BT 客户端或 Windows 更新是否走进了 TUN 虚拟网卡。',
    ],
    href: '/resources/subscription-traffic-leak-fix/',
    ctaText: '查看订阅防泄漏与重置教程',
  },
  {
    badge: '新购验收与真伪辨别',
    title: '情景 3：准备评估一家新服务，怎么看懂测速图、IP 纯净度与 AI 解锁？',
    condition: '拿到新月付订阅后需要 3 天内验收实际可用性，决定是否值得长期续费。',
    recommendation: '在无痕测试窗口下，结合晚高峰 20:30–23:00 的多地区实测（RTT + 带宽 + 解锁工具）验收，同时用品牌透明度审计标准核查协议、倍率和退款条款。',
    avoid: '不要把服务商自己放出来的午后/凌晨最高跑分图直接当作全天候体验依据，也不要对 20 元共享机场要求 100% 永不封控的原生 IP。',
    steps: [
      '在客户端内测试香港、日本、新加坡、美国四区真实延迟，观察是否有大面积 0B 死节点。',
      '重点在美/日/新节点实测一次 ChatGPT/Claude 与目标流媒体加载，香港节点不作为 AI 失效判据。',
      '对照品牌透明审计表核对是否存在同质化复制规格或异常链接。',
    ],
    href: '/resources/how-to-test-nodes/',
    ctaText: '阅读测速截图与验收解读指南',
  },
  {
    badge: '零预算与安全起步',
    title: '情景 4：只想临时查几次资料或彻底零基础，如何安全使用免费资源？',
    condition: '暂不打算办套餐，只愿在严格可控前提下验证连接或应急下载官方开源软件。',
    recommendation: '使用经过 SHA256 校验的开源免费客户端（Clash Verge Rev / FlClash / v2rayN），严守「访客空配置窗口、不装陌生根证书、不登重要账号」隔离底线，需要低成本长期备用时优先考虑百元不限时包。',
    avoid: '严禁通过来路不明的免费公共节点登录网银、主用谷歌/苹果账号、电商店铺或钱包扩展。',
    steps: [
      '只从官方 GitHub Release 获取客户端并核验 SHA256。',
      '在独立测试浏览器 Profile 中完成短暂资料检索。',
      '测完后立即清理系统代理残留与临时配置文件。',
    ],
    href: '/resources/free-nodes/',
    ctaText: '查看免费节点安全边界全指南',
  },
];

export const RESOURCES_ACTION_CARDS: ResourcesActionCard[] = [
  {
    category: '防踩坑底线 · 专项专著',
    title: '免费节点与免费代理资源安全边界全指南',
    summary: '拆解公开免费节点池真实来源、极短寿命成因、恶意根证书劫持识别，附 7 步零账号暴露隔离验证操作清单。',
    scopeNote: '本页严格遵循 A 区知识分区规范，0 商业推广外链，适合先建风控防线的读者。',
    href: '/resources/free-nodes/',
    ctaLabel: '查看教程',
  },
  {
    category: '数据审计 · 独立核查',
    title: '32 家品牌资料透明度审计与 5.6 元集群特征拆解',
    summary: '还原全站 32 家品牌档案的原始核实程度（16 完整 / 13 部分待核实 / 3 历史存档），披露文案差异、同质化模板与快狸纯测速边界。',
    scopeNote: '不靠猜测填充缺失字段，购买前先查清每家服务商信息披露到底诚实到什么程度。',
    href: '/reviews/brand-data-transparency-audit/',
    ctaLabel: '了解详情',
  },
  {
    category: '客户端起步 · 官方正版',
    title: 'Clash 客户端安全下载校验与排障专题',
    summary: '解决“没有梯子怎么上 GitHub 下载安全客户端”、PowerShell/macOS 核验 SHA256 与全节点 Timeout 九步排障核心任务。',
    scopeNote: '软件完全开源免费且不绑定任何节点，杜绝仿冒竞价站点与恶意修改版软件。',
    href: '/clash/',
    ctaLabel: '获取客户端',
  },
];

export const RESOURCES_HUB_FAQS: ResourcesFaqItem[] = [
  {
    question: '机场跑路前最常见的预警信号有哪些？一般什么时候能看出来？',
    answer: '最典型的组合前兆包括：平日低调的商家突然开启两年付、三年付甚至大额 1TB 终身五折促销且限制仅可用加密货币或特定直连通道；官网域名失联且官方发布页连续数日无公告；工单系统停摆、社群开始大量踢人删评；大量专线节点无通知降级或长期全红 Timeout。一旦同时出现其中两项，就应果断停充并启用备用订阅。',
    anchorHref: '#exit-scam-signals',
    anchorLabel: '跑路预警六大高危信号与失联处置',
  },
  {
    question: '测速图上写着“500Mbps”是不是说明我家里晚高峰看视频也能跑满 500M？',
    answer: '不是。测速机器人运行在珠海联通 5Gbps 或 9Gbps 等高带宽机房后端，测试的是节点服务器单点上限。能否跑满受四重条件限制：测速时段（凌晨/午后跑分远高于 21:00 晚高峰）、你的本地家庭宽带跨网互联质量、服务商在该线上的同时在线并发数，以及测试使用的 32 线程模式与单线程视频加载之间的差异。',
    anchorHref: '#node-testing-guide',
    anchorLabel: '节点测速、IP 纯净度与 AI/流媒体验证体系',
  },
  {
    question: '我该怎么判断自己的订阅链接是不是泄漏了？后台流量突然掉得特别快怎么办？',
    answer: '首先排除两个最常见误伤：第一，检查客户端是不是选进了 ×2/×5 高倍率节点或开启了 Global 全局模式把国内视频/网盘流量都算进代理；第二，检查 BT/PT 下载软件、Steam 更新或云盘同步有没有误进 TUN 虚拟网卡。排查掉本机原因后，立刻登录服务商用户面板点击「重置订阅链接（Token）」，并核查客户端里是否误开了 Allow LAN（允许局域网设备免密连入）。',
    anchorHref: '#subscription-and-faq',
    anchorLabel: '订阅安全管理、流量异常排查与核心术语百科',
  },
  {
    question: '什么是流量倍率？买 150GB 套餐写着 2 倍率节点意味着什么？',
    answer: '倍率是后台按节点线路成本扣除总流量的系数。使用标明「×1」或「1 倍」的节点跑 10GB 真实流量，后台就扣 10GB；使用「×2」或「×3」的高成本冷门/独享落地节点跑 10GB，后台会直接扣除 20GB 或 30GB。因此预算估算时一定要看主力常用节点到底是不是 1 倍率。',
    anchorHref: '#glossary-guide',
    anchorLabel: '高发计费概念与核心术语对照表',
  },
  {
    question: '机场宣传的“原生 IP”和“广播 IP”在实际使用里到底影响什么？',
    answer: '最直观的影响体现在流媒体版权库识别、AI 风控严苛度以及 TikTok 地区推送。原生 IP 由当地本土运营商直接持有注册并广播，Netflix 非自制剧、Disney+ 与某些地方限区服务的解锁稳定度显著优于他国机房跨区调拨过来的广播 IP。不过原生 IP 并不代表没有多人共享——低价共享机场的原生 IP 依然不宜直接用于严风控电商多店防关联。',
    anchorHref: '#glossary-guide',
    anchorLabel: '高发计费概念与核心术语对照表',
  },
  {
    question: '机场提供的所谓“自定义/审计规则”为什么有时候某些网站怎么也打不开？',
    answer: '为了防止海外服务器 IP 因版权投诉、恶意垃圾邮件、BT 侵权或金融欺诈被机房直接清退，几乎所有商用机场都会在远端网关部署审计阻断规则（如屏蔽 BT/P2P 协议、特定发信 SMTP 端口、部分敏感金融或高危域名）。当某特定冷门功能（如用本地邮件客户端 25 端口发信或开迅雷挂代理）失效时，未必是节点坏了，而是命中了服务端审计规则。',
    anchorHref: '#subscription-and-faq',
    anchorLabel: '订阅安全管理、流量异常排查与核心术语百科',
  },
  {
    question: '完全零基础的新手，应该“先下载软件还是先挑机场”，手机和电脑能用同一个账号吗？',
    answer: '推荐顺序是「先理解规则，再买 1 个月合规订阅，最后下载开源客户端导入测试」（若本地直连 GitHub 困难可先查阅无梯冷启动安全下载指南）。绝大多数主流机场均支持“多设备登录”（有的写明不限设备数，但注意禁止公网转售或多人高频跨省共享账号），你只需要把同一条订阅链接分别导入电脑 Clash Verge Rev 和手机 Shadowrocket/FlClash 即可共用同一个套餐配额。',
    anchorHref: '#beginner-roadmap',
    anchorLabel: '零基础入门路线与四类情景处置决策',
  },
  {
    question: '为什么同样叫“免费梯子”或“免费节点”，有的说不能用，你们还专设了一个免费节点专题？',
    answer: '设专题是为了用技术证据帮新手划出清晰的安全边界：区分“开源免费本地客户端（完全安全可用）”与“来源不明的免费服务端出口（寿命极短、易断流、存在流量监听和住宅代理寄生风险）”，并给出如果确实必须在隔离环境测试免费资源时的四条防泄漏红线及合法低成本替代算法。',
    anchorHref: '#beginner-roadmap',
    anchorLabel: '零基础入门路线与免费资源使用边界',
  },
  {
    question: '本站收录的 32 家品牌中，“待核实”和“历史存档”是什么意思？怎么更新？',
    answer: '本站拒绝用编造数字凑齐全站满格打分：凡是缺乏最新周期完整多档位价目表、缺少近期实测截图，或仅保留早期记录（如宇宙云、灵动云、浪网、EdgeNova、快狸）的条目，均在前端与数据文件如实标为「部分待核实」或「历史存档」，直到获取新的可交叉验证一手资料后再行更新，保障已有数据的真实可用性。',
    anchorHref: '#intel-transparency',
    anchorLabel: '风险情报审计与品牌数据透明度说明',
  },
];

export const RESOURCES_INTERNAL_CLUSTER_LINKS: ResourcesClusterLink[] = [
  {
    tag: '免费节点专著',
    title: '免费节点与免费代理资源全指南（万字版）',
    purpose: '深入剖析公开订阅池生命周期、五大高危风险、开源工具矩阵与 7 步隔离检测实操。',
    href: '/resources/free-nodes/',
  },
  {
    tag: '跑路预警',
    title: '机场跑路预警清单：6 个高危前兆与资金风控原则',
    purpose: '识别低价多年付收割、域名失联与工单停摆信号，控制单笔资金沉淀风险。',
    href: '/resources/airport-exit-scam-warning-signs/',
  },
  {
    tag: '应急处置',
    title: '主力机场失联或遭受攻击时的应急处置指南',
    purpose: '断流时的故障定界、备用热切换操作与防假冒钓鱼公告域名核验步骤。',
    href: '/resources/airport-outage-recovery/',
  },
  {
    tag: '术语百科',
    title: '机场术语百科：倍率、原生 IP、IEPL 与审计规则详解',
    purpose: '看懂推广页里所有行业缩写、计费名词与底层协议基本对应关系。',
    href: '/resources/airport-glossary-faq/',
  },
  {
    tag: '计费问答',
    title: '年付折算价、重置日与退款规则常见问答',
    purpose: '理清按自然日 vs 按购买日滚动重置流量的算法，以及特价包退款边界。',
    href: '/resources/airport-billing-faq/',
  },
  {
    tag: '数据审计',
    title: '32 个机场品牌资料审计与同质化特征分析',
    purpose: '核查 5.6 元同规格品牌复制现象、推广链接异常与待核实品牌数据缺口。',
    href: '/reviews/brand-data-transparency-audit/',
  },
  {
    tag: '客户端风控',
    title: '专属客户端与开源第三方订阅的安全隐私权衡',
    purpose: '评估闭源一键登录客户端的方便性与系统权限/透明度边界。',
    href: '/resources/proprietary-client-risks/',
  },
  {
    tag: '测速解读',
    title: '科学解读节点测速截图：RTT、32 线程曲线与单日快照局限',
    purpose: '看懂 MAI-TEST-BOT 与喵速两套测试图，避免被单一时段最高峰值误导。',
    href: '/resources/how-to-test-nodes/',
  },
  {
    tag: '解锁检测',
    title: 'IP 纯净度与 AI / 流媒体解锁实操检测教程',
    purpose: '测试 ChatGPT、Claude、Netflix 与 Disney+ 真实可用性并辨别家宽/机房段。',
    href: '/resources/ip-purity-and-unlock-check/',
  },
  {
    tag: '流量异常处理',
    title: '订阅流量莫名暴涨或疑似泄漏如何排查与重置',
    purpose: '一步步重置 Token、关闭 Allow LAN 并封堵 BT/P2P 与高倍率偷跑。',
    href: '/resources/subscription-traffic-leak-fix/',
  },
  {
    tag: '双栈修复',
    title: 'IPv6 双栈冲突与本地真实 IP 泄漏修复方案',
    purpose: '排查开启代理后检测站仍显示本机宽带 IPv6 地址的常见隐患。',
    href: '/resources/ipv6-conflict-and-dual-stack-fix/',
  },
  {
    tag: '新手路线图',
    title: '零基础入门路线图：从安装校验到规则分流上线',
    purpose: '4 步串联客户端、订阅导入、测速选节点与多端同步的核心操作主线。',
    href: '/guides/beginner-onboarding-roadmap/',
  },
];
