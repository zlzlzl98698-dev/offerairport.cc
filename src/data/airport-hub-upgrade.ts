export interface AirportCoreCompareRow {
  slug: string;
  name: string;
  sinceYear: string;
  realMonthlyStart: string;
  annualAmortized: string;
  multiplierAndDevices: string;
  lineAndProtocols: string;
  clientMode: string;
  aiAndVerification: string;
  limitsAndSource: string;
}

export interface OnetimePlanRow {
  slug: string;
  brand: string;
  planName: string;
  oneTimePrice: string;
  totalTraffic: string;
  unitCost: string;
  clientCompat: string;
  note: string;
}

export interface BudgetAnnualRow {
  brand: string;
  slug?: string;
  annualPrice: string;
  amortizedMonthly: string;
  monthlyQuota: string;
  protocolAndLine: string;
  clientMode: string;
  auditStatus: string;
}

export interface BrandDeepDigest {
  slug: string;
  name: string;
  positioningTag: string;
  recommendationBasis: string;
  suitableFor: string;
  notSuitableFor: string;
  pricingBreakdown: string;
  keyLimitsAndDiscrepancies: string;
  reviewHref?: string;
}

export interface AirportDecisionBranch {
  badge: string;
  title: string;
  condition: string;
  recommendation: string;
  avoid: string;
  steps: string[];
  href: string;
  ctaText: string;
}

export interface AirportFaqItem {
  question: string;
  answer: string;
  anchorHref?: string;
  anchorLabel?: string;
}

export interface AirportClusterLink {
  tag: string;
  title: string;
  purpose: string;
  href: string;
}

export const AIRPORT_CORE_COMPARE_ROWS: AirportCoreCompareRow[] = [
  {
    slug: 'guangsuyun',
    name: '光速云',
    sinceYear: '2020',
    realMonthlyStart: '¥25/月（极速版 168GB/月，折约 ¥0.15/GB）',
    annualAmortized: '¥99/年（轻量版 69GB/月，折约 ¥8.25/月；历史摘要曾记 59GB）',
    multiplierAndDevices: '不限设备数量；单节点标称 2.5Gbps；倍率待官网确认',
    lineAndProtocols: 'IEPL + 企业级内网专线；标称 VLESS（2026-08-11 截图显 SS）',
    clientMode: '自研客户端 + 第三方订阅（Clash / 小火箭等）',
    aiAndVerification: 'Claude 标注支持，ChatGPT/Gemini 需切换节点；含 08-11 截图与非晚高峰样本',
    limitsAndSource: '特殊商品不支持退款；数据源：光速云档案 & 清单（核实：2026-10-19）',
  },
  {
    slug: 'weitu',
    name: '唯兔云',
    sinceYear: '2023',
    realMonthlyStart: '¥19.9/月（普通版 150GB/月，折约 ¥0.13/GB；节假日限时 ¥14.9/100GB）',
    annualAmortized: '¥79.9/年（限量款 45GB/月，折约 ¥6.66/月）或 ¥120/年（75GB/月）',
    multiplierAndDevices: '全节点 1 倍流量；不限设备连接',
    lineAndProtocols: 'IPLC 专线（三网优化）；标称 Trojan（08-11 截图显 SS）',
    clientMode: '第三方客户端订阅（Clash / 小火箭 / v2rayN / QX）',
    aiAndVerification: 'ChatGPT/Claude 标注支持，Gemini 视节点定；含 2026-08-11 13:55 截图',
    limitsAndSource: '14.9 元为节假日限时款非全天候常驻；数据源：清单 & 08-11 包（2026-10-19）',
  },
  {
    slug: 'yifan',
    name: '一翻云',
    sinceYear: '2025',
    realMonthlyStart: '¥20/月（轻享版 150GB/月，折约 ¥0.13/GB）',
    annualAmortized: '¥98/年（年付小包 60GB/月，折约 ¥8.17/月）',
    multiplierAndDevices: '不限速、不限设备数量；支持 100GB/250GB/500GB 不限时包',
    lineAndProtocols: 'IEPL 物理专线；Hysteria 2 + VLESS-Reality + SS 三协议全支持',
    clientMode: '第三方客户端订阅（Clash Verge Rev / FlClash / v2rayN / 小火箭）',
    aiAndVerification: 'ChatGPT/Claude 标注支持，Gemini 视节点定；含 2026-08-11 00:21 截图',
    limitsAndSource: '官方明确无免费试用且 2025 年新品牌历史较短；数据源：清单 & 08-11 包（2026-10-19）',
  },
  {
    slug: 'ermao',
    name: '二猫云',
    sinceYear: '2023',
    realMonthlyStart: '¥20/月（白猫 130GB/月，折约 ¥0.15/GB）',
    annualAmortized: '¥89/年（年付小包 60GB/月，折约 ¥7.42/月）',
    multiplierAndDevices: '不限设备连接数；支持 ¥99/100GB 不限时包',
    lineAndProtocols: '全线 IEPL 专线；标称 VLESS（08-11 截图显 SS）',
    clientMode: '自研定制客户端 + 第三方订阅',
    aiAndVerification: 'ChatGPT 标注支持，Claude/Gemini 视节点定；含 2026-08-11 10:45 截图',
    limitsAndSource: '地区早期以港日美为主（测速含新加坡）；数据源：清单 & 08-11 包（2026-10-19）',
  },
  {
    slug: 'xingdaomeng',
    name: '星岛梦',
    sinceYear: '2020',
    realMonthlyStart: '¥25/月（超量 150GB/月，折约 ¥0.17/GB）',
    annualAmortized: '¥96/年（贴心小包 60GB/月，折约 ¥8.00/月）',
    multiplierAndDevices: '全线 1 倍流量；不限设备使用；支持 100G/300G/1TB 不限时',
    lineAndProtocols: 'IEPL 专线；Trojan（08-11 截图显 SS），含韩/东南亚小众区',
    clientMode: '第三方客户端订阅（Clash / OpenClash / 小火箭 / v2rayN）',
    aiAndVerification: 'ChatGPT/Claude 标注支持，Gemini 视节点定；含 2026-08-11 01:48 截图',
    limitsAndSource: '不限时 100GB 定价 ¥100 偏稳健；数据源：清单 & 08-11 包（2026-10-19）',
  },
  {
    slug: 'weifeng',
    name: '微风网络',
    sinceYear: '2023',
    realMonthlyStart: '¥27/月（乘风 200GB/月，折约 ¥0.135/GB）',
    annualAmortized: '¥137/年（清风 100GB/月，折约 ¥11.42/月）',
    multiplierAndDevices: '设备限制待核实；支持 270GB/¥200 与 570GB/¥370 不限时包',
    lineAndProtocols: 'IEPL 专线 + 原生 IP 节点；标称 VLESS（08-11 截图显 SS）',
    clientMode: '第三方客户端订阅',
    aiAndVerification: 'ChatGPT/Claude 标注支持；配有 7×24 在线与 AI 夜间客服；含 08-11 截图',
    limitsAndSource: '首行摘要曾写约 7 元/月 50GB 与详情表 ¥137/年有差异；数据源：清单 & 08-11 包（2026-10-19）',
  },
  {
    slug: 'sujie',
    name: '速界',
    sinceYear: '2024',
    realMonthlyStart: '¥25/月（标准月付 150GB/月，折约 ¥0.17/GB）',
    annualAmortized: '其余年付/大流量档位待补充',
    multiplierAndDevices: '设备数与倍率细节待核实',
    lineAndProtocols: 'IEPL 专线；VLESS（08-11 截图显 SS）',
    clientMode: '自研客户端 + 第三方订阅',
    aiAndVerification: '突出 ChatGPT/Claude/Gemini 场景且明示不保永久；含 08-11 15:39 截图',
    limitsAndSource: '缺少完整多周期价目表；数据源：清单 & 08-11 包（2026-08-11）',
  },
  {
    slug: 'kexin',
    name: '可信云',
    sinceYear: '2024',
    realMonthlyStart: '¥25/月（基础月付 150GB/月，折约 ¥0.17/GB）',
    annualAmortized: '其余周期套餐待补充',
    multiplierAndDevices: '设备数与地区清单待核实',
    lineAndProtocols: 'IEPL 专线；VLESS（08-11 截图显 SS）',
    clientMode: '第三方客户端订阅',
    aiAndVerification: '官方主动标注 AI/流媒体缺统一实测；含 15:32 截图（批次日待复核）',
    limitsAndSource: '不夸大宣传，信息披露克制；数据源：清单 & 08-11 包（2026-08-11）',
  },
  {
    slug: 'feimao',
    name: '飞猫云',
    sinceYear: '2023',
    realMonthlyStart: '¥25/月（星耀版 150GB/月，折约 ¥0.17/GB）',
    annualAmortized: '¥84/年（学生版 50GB/月，折合 ¥7.00/月）',
    multiplierAndDevices: '设备限制待核实；支持 1000GB/¥680 不限时',
    lineAndProtocols: '轻量加速多线优化（未标纯专线）；08-11 截图显 SS',
    clientMode: '仅官方专属客户端（不支持第三方订阅导出）',
    aiAndVerification: 'ChatGPT/Claude/Netflix 标注支持；含 2026-08-11 08:52 截图',
    limitsAndSource: '无法导入 Clash/OpenClash；数据源：清单 & 08-11 包（2026-10-19）',
  },
  {
    slug: 'firefly',
    name: 'Firefly 萤火虫',
    sinceYear: '待核实',
    realMonthlyStart: '¥25/月（Lite 150GB/月，折约 ¥0.17/GB）',
    annualAmortized: '¥96/年（年付版 60GB/月，折合 ¥8.00/月）',
    multiplierAndDevices: '品牌称不限设备；支持 ¥100/100GB 不限时包',
    lineAndProtocols: 'IPLC 专线 + 原生 IP；VLESS',
    clientMode: '仅官方专属客户端（2026-10 后不再提供通用订阅）',
    aiAndVerification: '非晚高峰样本美国达 30Mbps；尚缺 2026-08-11 独立截图档案',
    limitsAndSource: '清单存两份历史优惠记录；数据源：32家品牌清单（2026-10-19）',
  },
];

export const AIRPORT_ONETIME_COMPARE_ROWS: OnetimePlanRow[] = [
  {
    slug: 'guangsuyun',
    brand: '光速云',
    planName: '致敬斯诺克 147 永久套餐',
    oneTimePrice: '¥147',
    totalTraffic: '247GB 不过期',
    unitCost: '约 ¥0.595/GB',
    clientCompat: '自研 + Clash / 小火箭等第三方订阅',
    note: '数据库已知单 GB 成本最低的百元级可接入 Clash 不限时包；不参与优惠码且不退款。',
  },
  {
    slug: 'weifeng',
    brand: '微风网络',
    planName: '信风·不限时 / 长风·不限时',
    oneTimePrice: '¥200 / ¥370',
    totalTraffic: '270GB / 570GB',
    unitCost: '约 ¥0.74 / ¥0.65/GB',
    clientCompat: '第三方通用订阅（Clash / 小火箭）',
    note: '适合既想做备用又需要 270GB 以上长期余量的用户。',
  },
  {
    slug: 'weitu',
    brand: '唯兔云',
    planName: '永久不限时 100G / 200G',
    oneTimePrice: '¥100 / ¥160',
    totalTraffic: '100GB / 200GB',
    unitCost: '¥1.00 / ¥0.80/GB',
    clientCompat: '第三方通用订阅（Trojan / Clash）',
    note: '200G 档单 GB 跌破 0.8 元，适合作为双活灾备订阅池第二线路。',
  },
  {
    slug: 'ermao',
    brand: '二猫云',
    planName: '二猫云·不限时套餐',
    oneTimePrice: '¥99',
    totalTraffic: '100GB',
    unitCost: '¥0.99/GB',
    clientCompat: '自研 + 第三方通用订阅',
    note: '百元以内起步且不限设备数。',
  },
  {
    slug: 'yifan',
    brand: '一翻云',
    planName: '轻享版·不限时包',
    oneTimePrice: '¥100',
    totalTraffic: '100GB',
    unitCost: '¥1.00/GB',
    clientCompat: '第三方通用订阅（Hysteria2 / VLESS / SS）',
    note: '可作为校园网/弱网环境 Hysteria2 备用订阅。',
  },
  {
    slug: 'xingdaomeng',
    brand: '星岛梦',
    planName: '永久不限时 100',
    oneTimePrice: '¥100',
    totalTraffic: '100GB',
    unitCost: '¥1.00/GB',
    clientCompat: '第三方通用订阅（Clash / OpenClash）',
    note: '2020 年起运营，含韩国与东南亚小众区域节点。',
  },
  {
    slug: 'wuyou',
    brand: '无忧链接',
    planName: '100G 永久不限时',
    oneTimePrice: '¥108',
    totalTraffic: '100GB',
    unitCost: '¥1.08/GB',
    clientCompat: '仅专属客户端（2026-10 后）',
    note: '无法放进 Clash 故障转移组，只适合单独装专属端备用。',
  },
  {
    slug: 'sogo',
    brand: 'SOGO 云',
    planName: 'SOGO 基础餐不限时版',
    oneTimePrice: '¥120',
    totalTraffic: '120GB',
    unitCost: '¥1.00/GB',
    clientCompat: '仅专属客户端',
    note: '覆盖 15 国节点，适合偶发查询多国 IP 但不使用 Clash 的用户。',
  },
];

export const AIRPORT_ANNUAL_BUDGET_ROWS: BudgetAnnualRow[] = [
  {
    brand: '无忧链接（MINI 链接）',
    slug: 'wuyou',
    annualPrice: '¥79/年',
    amortizedMonthly: '¥6.58/月',
    monthlyQuota: '40GB/月',
    protocolAndLine: '标准中转优化 / 协议待核实',
    clientMode: '仅专属客户端',
    auditStatus: '2025 年新品牌，月均流量偏紧且不支持 Clash',
  },
  {
    brand: '唯兔云（年付限量款）',
    slug: 'weitu',
    annualPrice: '¥79.9/年',
    amortizedMonthly: '¥6.66/月',
    monthlyQuota: '45GB/月',
    protocolAndLine: 'IPLC 专线 / Trojan',
    clientMode: '支持第三方订阅',
    auditStatus: '含 08-11 实测截图，适合已测试后纯轻量补充',
  },
  {
    brand: '飞猫云（学生版）',
    slug: 'feimao',
    annualPrice: '¥84/年',
    amortizedMonthly: '¥7.00/月',
    monthlyQuota: '50GB/月',
    protocolAndLine: '轻量多线优化 / SS',
    clientMode: '仅专属客户端',
    auditStatus: '含 08-11 截图，免订阅新手向，非软路由可选',
  },
  {
    brand: '二猫云（年付小包）',
    slug: 'ermao',
    annualPrice: '¥89/年',
    amortizedMonthly: '¥7.42/月',
    monthlyQuota: '60GB/月',
    protocolAndLine: 'IEPL 专线 / VLESS',
    clientMode: '自研 + 第三方订阅',
    auditStatus: '2023 年运营，含 08-11 截图，60GB 较宽裕',
  },
  {
    brand: '星岛梦（贴心小包）',
    slug: 'xingdaomeng',
    annualPrice: '¥96/年',
    amortizedMonthly: '¥8.00/月',
    monthlyQuota: '60GB/月',
    protocolAndLine: 'IEPL 专线 / Trojan',
    clientMode: '支持第三方订阅',
    auditStatus: '2020 年老牌 + 含 08-11 截图，全线 1 倍率不限设备',
  },
  {
    brand: '光速云（轻量版）',
    slug: 'guangsuyun',
    annualPrice: '¥99/年',
    amortizedMonthly: '¥8.25/月',
    monthlyQuota: '69GB/月（历史摘要曾记 59GB）',
    protocolAndLine: 'IEPL + 内网专线 / VLESS',
    clientMode: '自研 + 第三方订阅',
    auditStatus: '2020 年老牌 + 多套实测图集，但年付小包不支持退换',
  },
  {
    brand: '5.6 元同质化集群（大佬云 / 闪电鼠 / 云界线 / 榴莲云 / 环球梯）',
    slug: 'dalaoyun',
    annualPrice: '折算约 ¥67.2/年（按 ¥5.6/月推算）',
    amortizedMonthly: '¥5.60/月',
    monthlyQuota: '60GB/月',
    protocolAndLine: '均标 IEPL + VLESS（榴莲云未明标协议）',
    clientMode: '自研 + 第三方订阅',
    auditStatus: '⚠️ 高风险待谨慎：2024 年规格高度雷同，无独立测速截图且缺完整价目表；云界线/环球梯链接缺 `#/`',
  },
];

export const AIRPORT_BRAND_DIGESTS: BrandDeepDigest[] = [
  {
    slug: 'guangsuyun',
    name: '光速云（GuangSuYun）',
    positioningTag: '2020 老牌综合 · 12 国节点 · 147 永久 & ¥25/168GB',
    recommendationBasis: '数据库内历史连续度最长（2020 年起步）的代表之一，同时保留自研与第三方通用 Clash 订阅，具备 2026-08-11 与 08-19 多批次图集档案，覆盖港台日新美英法德等 12 个国家/地区（57+ 节点）。',
    suitableFor: '重视运营年限、多国家节点（含欧洲/南美）、需要兼顾桌面自研上手与后期平滑过渡 Clash 的用户，以及想配一台长期备用 147 永久流量包（247GB）的人群。',
    notSuitableFor: '要求「全部节点无脑稳定直连 ChatGPT/Gemini」不愿切节点的用户；特殊套餐不支持退款且美国节点非晚高峰样本约 18Mbps，对美西单线程高带宽有极高刚需者建议先月付验证。',
    pricingBreakdown: '真实月付极速版 ¥25/168GB、流光版 ¥34/268GB、量子版 ¥68/568GB、无界版 ¥138/900GB；年付轻量版 ¥99/年（折 ¥8.25/月）；一次性 147 永久版 ¥147/247GB；定制独享原生 IP ¥680/月。新人优惠码 AMM（年付轻量及 147 不参与）。',
    keyLimitsAndDiscrepancies: '历史文件对轻量版月流量分别出现过 59GB 与 69GB 两种记载；08-11 测速截图显示 protocol 为 Shadowsocks 而最新资料主推 VLESS，以导入后订阅实况为准。',
    reviewHref: '/reviews/guangsuyun-deep-review/',
  },
  {
    slug: 'weitu',
    name: '唯兔云（V2Yun）',
    positioningTag: 'IPLC 1 倍率 · ¥19.9/150GB · Trojan 兼容佳',
    recommendationBasis: '在 ¥20 以下真实月付区间给出了极其均衡的规格：常规普通版 ¥19.9/月含 150GB（约 ¥0.13/GB），全节点 1 倍倍率、不限设备、IPLC 专线搭配 Trojan 协议，并有 2026-08-11 午后完整 MAI-TEST-BOT 截图。',
    suitableFor: '每月用量在 100GB–300GB、重视 1 倍率计费透明且习惯在 Clash Verge Rev / 小火箭 / QX 运行 Trojan 节点的高性价比月付用户；200G/¥160 不限时包也很适合做灾备池。',
    notSuitableFor: '依赖官方专属傻瓜客户端、完全不愿配置第三方工具的新手；注意其 ¥14.9/100GB 属于节假日限时开启款，并非任何日期都能买到。',
    pricingBreakdown: '真实月付普通版 ¥19.9/150GB、进阶版 ¥29.9/200GB、专业版 ¥59.9/500GB、至尊版 ¥119.9/1TB（限时款 ¥14.9/100GB）；年付限量 ¥79.9/45GB 或加强 ¥120/75GB；不限时 ¥100/100GB、¥160/200GB、¥340/500GB；优惠码 weitu666。',
    keyLimitsAndDiscrepancies: '优惠活动可能随节假日上下架，下单前在官网确认当前可购规格与折扣比例。',
    reviewHref: '/reviews/weitu-review/',
  },
  {
    slug: 'yifan',
    name: '一翻云（YiFanYun）',
    positioningTag: '三协议全兼容 · Hysteria 2 + Reality · ¥20/150GB',
    recommendationBasis: '少数在 ¥20/月 150GB（¥0.13/GB）档位同时完整下发 Hysteria 2、VLESS-Reality 与 Shadowsocks 三套主流协议的 IEPL 专线服务，适合不同运营商宽带和校园网在客户端灵活切换协议。',
    suitableFor: '熟练使用 Mihomo/Clash Verge Rev 或 FlClash，居住在移动晚高峰丢包高或校园网限制多的环境、急需用 Hysteria 2 / Reality 对比测速的技术向与进阶用户。',
    notSuitableFor: '希望先零成本免费白嫖试用的用户（官方明确不提供免费试用），以及非要选择 5 年以上老字号才能安心的极保守买家（一翻云 2025 年上线，运营周期较短）。',
    pricingBreakdown: '真实月付轻享版 ¥20/150GB、舒享版 ¥35/350GB、尊享版 ¥55/600GB、极致版 ¥95/1.2TB；年付小包 ¥98/60GB；不限时 ¥100/100GB、¥200/250GB、¥400/500GB；折扣码 yfy6666（正文另记 1FLYYUN 享 9 折）。',
    keyLimitsAndDiscrepancies: '「晚高峰 0 丢包」「原生住宅 IP」为厂商资料陈述；08-11 截图于凌晨 00:21 测得，晚高峰并发仍建议首月自测验证。',
    reviewHref: '/reviews/yifan-review/',
  },
  {
    slug: 'xingdaomeng',
    name: '星岛梦（XDM）',
    positioningTag: '2020 老牌 · 韩国/东南亚小众区 · 1 倍率不限设备',
    recommendationBasis: '同样自 2020 年运营至今的老牌梯队，采用 IEPL 专线与 Trojan 协议、全线 1 倍率不限设备，除常规港台日新美外还覆盖韩国及东南亚地区，保留 2026-08-11 01:48 截图。',
    suitableFor: '看重老牌历史连续性、家庭或工作室多台设备同时挂机、以及有韩国节点（如韩服游戏/韩区流媒体/办公）和东南亚节点需求的用户。',
    notSuitableFor: '100GB 永久不限时包 ¥100 的单价与月付 ¥25/150GB 相比差距悬殊，高频重度流量用户不应买不限时包当主力；美国方向节点样本同样约 18Mbps。',
    pricingBreakdown: '真实月付 ¥25/150GB、¥50/300GB、¥70/500GB、¥130/1000GB；年付贴心小包 ¥96/60GB；永久不限时 ¥100/100GB、¥300/300GB、¥600/1TB；优惠码 nmw888。',
    keyLimitsAndDiscrepancies: '建议首购直接选 ¥25 月付档测试当地电信/联通/移动三网夜间表现，勿直接跨年锁定。',
    reviewHref: '/reviews/xingdaomeng-review/',
  },
  {
    slug: 'ermao',
    name: '二猫云 & 微风网络（月付均衡双对比）',
    positioningTag: '二猫云 ¥20/130GB · 微风网络 ¥27/200GB + AI 夜间客服',
    recommendationBasis: '两家均自 2023 年运营并保留 2026-08-11 测速截图，均主打 IEPL + VLESS。二猫云支持自研与第三方双模式，¥20/130GB 且不限设备；微风网络月付 ¥27 档直给 200GB（约 ¥0.135/GB）并配备 7×24 及夜间客服，适合怕找不到人的新手。',
    suitableFor: '二猫云适合 20 元预算想多拿 30GB（相对常规 100GB 档）且偶需百元内 ¥99 不限时包的用户；微风适合 200GB 中高月消耗且重视工单客服响应的用户。',
    notSuitableFor: '二猫云标注 Claude 与 Gemini 视具体节点而定，若全天只跑 Claude 的开发者需要实测特定地区；微风入门年付表（¥137/100GB）与摘要行历史文案（7 元/月 50GB）存在不一致，选微风建议直接月付 ¥27 档更干脆。',
    pricingBreakdown: '二猫云：月付 ¥20/130GB 起（另有 40/80/160 元档），年付 ¥89/60GB，不限时 ¥99/100GB（优惠码 ermao5555）；微风：月付 ¥27/200GB 起（57/127 元档），年付 ¥137/100GB，不限时 ¥200/270GB（优惠码 flat888）。',
    keyLimitsAndDiscrepancies: '注意两家早期图文清单和最新套餐说明存在地区或文案小幅差异，已在本站品牌详情页原样列出核对说明。',
    reviewHref: '/reviews/ermao-review/',
  },
  {
    slug: 'sujie',
    name: '速界 & 可信云（AI 工具定向与信息透明派）',
    positioningTag: '均为 2024 年 IEPL + VLESS · ¥25/150GB 月付门槛',
    recommendationBasis: '两者均支持第三方 Clash/小火箭通用订阅，在 25 元档给出了诚实清晰的产品边界：速界聚焦 ChatGPT、Claude、Gemini 等 AI 使用场景且不作违背风控规律的“绝对永久”空头支票；可信云则在资料里主动声明“AI 与流媒体缺乏统一实测”，拒绝虚假承诺。',
    suitableFor: '速界适合主攻 AI 办公并自己搭配 Clash 分流规则组的开发者；可信云适合看重品牌方坦诚度、日常偏重常规海外技术资料查询的用户。',
    notSuitableFor: '目前两家数据库均属于「部分待核实」档案，缺少完整多档年付/超大流量价目表与多维流媒体解锁详测，需要透明查看全部历史档位的极稳妥买家可优先对比光速云或唯兔云。',
    pricingBreakdown: '速界：标准月付 ¥25/150GB（优惠码 sss1111）；可信云：基础月付 ¥25/150GB（优惠码 kkk333）；其余高阶档位尚待后续核实补充。',
    keyLimitsAndDiscrepancies: '可信云 2026-08-11 截图（15:32:35）图片底部日期有裁切，归档为同批次待复核记录。',
    reviewHref: '/comparisons/ai-friendly-airports-comparison/',
  },
  {
    slug: 'feimao',
    name: '飞猫云 / Firefly / 无忧链接 / SOGO云（专属客户端阵营）',
    positioningTag: '官网下载登录即用 · 零订阅配置门槛 · 无法对接 Clash',
    recommendationBasis: '自 2026 年下半年起，飞猫云、Firefly 萤火虫、无忧链接、SOGO 云、全球云、灵猫网络、隐形人等品牌纷纷转向「仅提供自研专属客户端」，新手免去了找 GitHub、校验 SHA256 与复制 YAML 订阅的折腾过程。其中飞猫云（¥84/年学生版，¥25/150GB）、Firefly（IPLC 原生 IP，¥25/150GB）、SOGO（15 国覆盖）均有清晰套餐梯队。',
    suitableFor: '完全不想理解什么是 Clash、订阅 URL 或 YAML，只需要像装普通软件一样输入账号密码点一下连接按钮的轻量手机与电脑用户。',
    notSuitableFor: '使用 OpenWrt 软路由（OpenClash / Nikki / PassWall2）、习惯统一用 Shadowrocket / Clash Verge Rev 管理多机场故障转移、或者对闭源软件本地权限透明度要求极高的进阶玩家。',
    pricingBreakdown: '常规月付集中在 ¥19–¥25（100–150GB），年付入门集中在 ¥79–¥98/年（40–60GB/月）；专属客户端与通用客户端的底层取舍详见对比专文。',
    keyLimitsAndDiscrepancies: '无忧链接早期汇总表曾记“订阅无需转换”而 2026-10 正文改为仅专属客户端；SOGO 云与 Firefly 亦受相同限制，下单前务必确认你的主力设备（尤其是 Linux 或软路由）是否在官方客户端支持列表内。',
    reviewHref: '/comparisons/custom-app-vs-universal-client/',
  },
];

export const AIRPORT_DECISION_BRANCHES: AirportDecisionBranch[] = [
  {
    badge: '最稳起步路径',
    title: '分支 1：首次买机场的新手 / 追求省心长期主力（预算 ¥20–¥34/月）',
    condition: '不想踩年付坑，需要稳定看 YouTube 4K、用 AI 工具且希望既能上手快又保留 Clash 自主控制权。',
    recommendation: '优先从「支持第三方通用订阅 + 有完整实测档案 + 支持真实月付」的品牌起步：如光速云（极速版 ¥25/168GB）、唯兔云（普通版 ¥19.9/150GB）或星岛梦（¥25/150GB）；如果完全拒绝配订阅，仅接受专属 App 可选飞猫云（¥25/150GB）或 Firefly（¥25/150GB）。',
    avoid: '第一家千万不要图省钱直接掏钱买 ¥79–¥99 年付，也不要买任何 ¥5.6/月 缺乏测速记录的同质化小包。',
    steps: [
      '先装好经过 GitHub 校验的正版 Clash Verge Rev（电脑）或 Shadowrocket / FlClash（手机）。',
      '购买 1 个月基础月付套餐，连续测试本地电信/联通/移动宽带在晚上 20:30–23:00 的视频加载与 AI 连通率。',
      '确认稳定无跨网严重丢包后，再决定是否按季度或半年续费，同时保留百元级不限时包作备份。',
    ],
    href: '/reviews/2026-airport-selection-methodology/',
    ctaText: '阅读完整选型方法论',
  },
  {
    badge: '技术与 AI 办公',
    title: '分支 2：开发者 / 程序员 / 高频 ChatGPT & Claude 生产力用户',
    condition: '高频拉取 GitHub、Docker、npm，同时深度依赖 OpenAI / Claude / Gemini，需要精准控制哪些流量直连、哪些固定走纯净美国/新加坡节点。',
    recommendation: '剔除全部“仅专属客户端”品牌，只选明确支持 Clash / Mihomo 通用订阅且具 IEPL 专线的服务：重点对比一翻云（三协议全支持 ¥20/150GB）、速界（¥25 AI 场景定向）、光速云（¥25/168GB）或唯兔云（¥19.9/150GB）。',
    avoid: '不要让国内下载源走代理浪费高速流量，也不要用香港节点访问 ChatGPT/Claude，更别让 url-test 自动乱跳 IP 触发 AI 封号。',
    steps: [
      '选用支持第三方订阅的 IEPL 专线品牌并导入 Clash Verge Rev。',
      '用 Merge 前置覆写设置 AI 专用策略组，锁定一条洁净的日本、新加坡或美国节点。',
      '终端命令行或 Docker 需要代理时安装服务模式并开启 TUN 虚拟网卡，加配 fake-ip-filter 放行国内开发源。',
    ],
    href: '/comparisons/ai-friendly-airports-comparison/',
    ctaText: '查看 AI 机场横向对比',
  },
  {
    badge: '极低频与灾备',
    title: '分支 3：每月只用几次查资料 / 主力机场断流应急热备（一次性百元档）',
    condition: '平时很少看海外高清视频，每月流量不到 10GB，或者已经有一家主力月付但担心晚间故障断网影响工作。',
    recommendation: '购买支持 Clash 的一次性不过期「不限时流量包」，预算严格控制在 ¥99–¥200 之内：首选光速云·致敬斯诺克 147（¥147/247GB，约 ¥0.595/GB），其次唯兔云（¥100/100GB 或 ¥160/200GB）、二猫云（¥99/100GB）、一翻云（¥100/100GB）、星岛梦（¥100/100GB）。',
    avoid: '不要买“仅限专属客户端”的不限时包（因为无法放进 Clash Fallback 自动故障转移组），也不要花上千元一次性囤 1TB 所谓永久包（运营周期变数大于单价折扣）。',
    steps: [
      '购入百元档支持第三方订阅的不限时流量包。',
      '在 Clash Verge Rev 中通过 Sub-Store 或订阅混合脚本将该备用池加进 Fallback 故障转移组。',
      '每隔 1–2 个月打开客户端自动更新一次备用订阅以防域名变更失联。',
    ],
    href: '/reviews/onetime-traffic-airports-guide/',
    ctaText: '查看全部不限时流量包盘点',
  },
  {
    badge: '预算敏感与学生',
    title: '分支 4：预算压到百元以内 / 学生轻量查文献（避开 5.6 元雷同坑）',
    condition: '确实只能接受一年百元以内总支出，每月消耗严格控制在 40–60GB 以内（不频繁看 4K 视频、不拉大镜像）。',
    recommendation: '优先在具备完整价格梯队与实测截图档案的品牌里挑年付小包：支持第三方订阅看二猫云（¥89/年 60GB）、星岛梦（¥96/年 60GB）、光速云（¥99/年 69GB）或唯兔云（¥79.9/年 45GB）；免配客户端可看飞猫云学生版（¥84/年 50GB）。',
    avoid: '避开大佬云、闪电鼠、云界线、榴莲云、环球梯这组 specs 高度复制粘贴且无独立测速图的 ¥5.6 档位，尤其注意核查异常链接格式与沉没成本。',
    steps: [
      '核算自己真实月消耗是否确实低于 50GB（打开几个高清视频测算即可发现很快超标）。',
      '年付小包大多不支持优惠码且不支持退款，下单前核实支持客户端形式与节点可用地区。',
    ],
    href: '/comparisons/cheap-annual-airports-audit/',
    ctaText: '看 5.6–8 元年付档横向审计',
  },
  {
    badge: '跨境运营严风控',
    title: '分支 5：亚马逊 / TikTok 店铺、PayPal 资金或企业级独立防关联',
    condition: '任何账务资金、多店铺矩阵或对外投放账号，绝不允许与其他陌生用户共用同一个出口落地 IP。',
    recommendation: '不要选 18–25 元大众共享机场，应评估光速云（¥680/月 500GB 定制独享原生 IP）、暮光加速（¥600/月独享定制）或海外自建合规静态住宅/独立纯净云主机。',
    avoid: '切勿用几十元的共享订阅登录 Amazon 主账号或高频发布 TikTok 带货直播间，连带关联风控远超省下的几百元差价。',
    steps: [
      '明确目标业务所在地区与静态原生 ASN 需求，与服务商线下确认定制交付与售后边界。',
      '配合独立浏览器隔离环境、关闭 WebRTC 暴露并校对当地时区与系统语言。',
    ],
    href: '/reviews/remote-work-vpn-vs-proxy/',
    ctaText: '查看独享原生 IP 与办公边界评测',
  },
];

export const AIRPORT_HUB_FAQS: AirportFaqItem[] = [
  {
    question: '为什么很多榜单一上来写“只要 5.6 元或 8 元/月”，点进去却要一次性付将近 100 块？',
    answer: '这是行业最普遍的营销展示手法——把“年付入门小包总价 ÷ 12”写成所谓的月均低价（例如 ¥67.2/年折算 ¥5.6/月、¥99/年折算 ¥8.25/月），实际上根本不提供按单个自然月购买的 5.6 元套餐，且这类年付小包往往月流量仅 40–69GB、还不支持退款或优惠码。本站所有对比表和品牌库均强制把「真实按月购买价（通常 ¥15–¥27/月）」与「年付折算月均价」拆分并列呈现。',
    anchorHref: '#core-candidates-table',
    anchorLabel: '核心候选机场横向对比总表',
  },
  {
    question: '新手第一次购买机场，是买月付 ¥20 档还是直接买 ¥96 年付小包划算？',
    answer: '强烈建议首次买真实月付（¥19.9–¥25），绝不建议直接买年付。因为不同省市的电信、联通、移动和校园网连向同一家机场国内入口机房（沪/广/深 BGP）的跨网质量天差地别；另外哪怕再稳定的品牌，晚高峰 21:00–23:00 的体验也必须用你自己的真实宽带跑过才知道。先拿二十元月付测两周确认好再谈长期续费，是成本最低的风控动作。',
    anchorHref: '#decision-paths',
    anchorLabel: '按预算与经验划分的五条选型决策分支',
  },
  {
    question: '为什么同样标着 150GB 流量，有的机场用不到月底就扣光了？（倍率陷阱解释）',
    answer: '部分机场会在节点名称上写「×2」「×3」甚至「×10」倍率，意思是每跑 1GB 真实数据后台会扣掉你 2GB、3GB 甚至 10GB 套餐流量（常出现在昂贵专线落地或冷门地区如日本/美国原生 IP 节点上）。选购前务必先核实是否标注「全线 1 倍流量（如星岛梦、唯兔云、灵猫网络明确标 1 倍）」或在节点列表里挑明低倍率主力节点。',
    anchorHref: '#pricing-and-metrics',
    anchorLabel: '计费规则、倍率陷阱与实测截图读法',
  },
  {
    question: '“专属客户端”机场和“支持第三方 Clash/小火箭订阅”的机场，我该选哪一种？',
    answer: '取决于你的动手意愿与设备生态：如果你只想下载一个官方 App 输入邮箱密码一键连接，完全不想看 GitHub 下载 Clash Verge Rev 或导入订阅链接，飞猫云、Firefly、无忧链接、SOGO 云这类专属客户端省事省心；但如果你会同时用多设备、要配置 OpenWrt 软路由、想用 Clash 分流 AI/国内直连，或者准备用两家机场做自动灾备切换，就务必选择光速云、唯兔云、一翻云、星岛梦、二猫云等支持通用第三方订阅的品牌。',
    anchorHref: '#brand-digests',
    anchorLabel: '代表品牌与两大客户端阵营解析',
  },
  {
    question: '为什么 2026-08-11 测速图里大家跑分都在 400–500Mbps，我却不应该只看跑分下结论？',
    answer: '因为本站收录的 2026-08-11 批次截图采集时刻从凌晨 00:21 跨越至晚间 22:46，且测试工具并不完全相同（宇宙云与快狸为 9Gbps 喵速 VLESS 界面，其余为 5Gbps MAI-TEST-BOT 界面）；同时部分 2026-10-19 清单样本明确标注为“非晚高峰”。白天闲时测出 500Mbps 并不难，真正拉开差距的是晚间 20:30–23:00 跨网并发丢包率、0B 失效节点占比以及客服修复故障的速度。',
    anchorHref: '#pricing-and-metrics',
    anchorLabel: '如何科学看懂测速图与测试时段差异',
  },
  {
    question: '大佬云、闪电鼠、云界线、榴莲云、环球梯 5 家 ¥5.6 档位为什么看起来一模一样？还能买吗？',
    answer: '经本站数据交叉审计，这 5 家均保留在 2024 年记录，几乎全部套用“¥5.6/月、60GB/月、IEPL + VLESS、季付 7 折”完全雷同的模板文案，均缺少 2026-08-11 独立测速截图和完整月付多档位价格表，且云界线与环球梯官网链接格式缺失 `#/`。此类极低价高度同质化项目不确定性较高，绝不能作为工作学习唯一主力依赖。',
    anchorHref: '#budget-annual-audit',
    anchorLabel: '年付百元以内小包及 5.6 元同质化集群审计',
  },
  {
    question: '买“一次性不过期不限时流量包”以后，万一这家机场半年后关站了怎么办？',
    answer: '这是“永久不过期”最容易被忽视的前提条件：所谓永久不限时，是指“服务商正常持续运营期间你的余量不会按月清零重置”，而不是由第三方平台担保你终身使用。因此购买不限时包有两条铁律：1）优先选择自 2020–2023 年已连续运行多年的品牌（如光速云、星岛梦、唯兔云、二猫云、微风）；2）单笔金额控制在 ¥100–¥200 的轻量包作低频备用，千万不要花七八百甚至上千元去囤大额永久流量。',
    anchorHref: '#onetime-plans-compare',
    anchorLabel: '一次性不限时流量包横向对比',
  },
  {
    question: '明明机场宣传全支持 ChatGPT，为什么我一连上最快的香港节点还是打不开？',
    answer: '因为 OpenAI（ChatGPT）与 Anthropic（Claude）官方地区政策本身就不向香港特别行政区和国内开放接入。哪怕一条香港 IEPL 专线延迟低至 22ms、带宽高达 500Mbps，只要从香港落地 IP 出去就会直接被平台地理拦截。正确用法是在客户端切到新加坡、日本、台湾或美国节点，或者直接用 Clash Merge 规则把 AI 域名固定路由到可用解锁地区组。',
    anchorHref: '#ai-failover-and-risk',
    anchorLabel: 'AI 办公分流、独享 IP 边界与双活灾备',
  },
  {
    question: '宇宙云、灵动云、浪网、EdgeNova、快狸在站内品牌库怎么被标记为“待核实 / 历史存档”？',
    answer: '本着对实测与价格透明度负责的原则，宇宙云缺最新完整价目表（仅保留 08-11 晚间 VLESS 截图），灵动云、浪网、EdgeNova 停留在 2026-08 历史存档未补全最新周期，快狸则只有测速截图暂缺文字档案。在本站拿到可交叉核对的新周期价格与可用性验证前，这 5 家保持「待核实 / 历史存档」透明状态，绝不靠猜价格去凑榜。',
    anchorHref: '#data-sources-and-gaps',
    anchorLabel: '资料来源、待核实品牌与透明度声明',
  },
];

export const AIRPORT_INTERNAL_CLUSTER_LINKS: AirportClusterLink[] = [
  {
    tag: '选型纲领',
    title: '2026 机场选型方法论：如何系统筛出靠谱服务',
    purpose: '从线路、协议、计费透明度、退款与测试方法建立完整的购前评估框架。',
    href: '/reviews/2026-airport-selection-methodology/',
  },
  {
    tag: '18–25 元月付',
    title: '18–25 元主流月付性价比横向对比（8 家）',
    purpose: '逐一精算光速云、唯兔云、一翻云、二猫云、暮光加速、极连云、光年梯、速界单 GB 成本。',
    href: '/comparisons/budget-18-25-yuan-airports/',
  },
  {
    tag: '测速档案',
    title: '2026-08-11 实测截图档案横向对照（15 家）',
    purpose: '按时间点与工具类型（MAI-TEST-BOT vs 喵速）真实还原截图背景，拒绝伪排行。',
    href: '/comparisons/2026-airport-speedtest-benchmark/',
  },
  {
    tag: '不限时备用',
    title: '一次性不限时流量包品牌盘点与评测',
    purpose: '梳理 12 家提供永久流量的品牌成本（¥0.595–¥1.08/GB）与 Clash 灾备接入对比。',
    href: '/reviews/onetime-traffic-airports-guide/',
  },
  {
    tag: 'AI 工具适配',
    title: 'AI 办公与开发场景机场横向对比（ChatGPT/Claude）',
    purpose: '对比速界、光速云、唯兔云、一翻云、可信云 AI 解锁态度及节点分流注意事项。',
    href: '/comparisons/ai-friendly-airports-comparison/',
  },
  {
    tag: '低价审计',
    title: '5.6–8 元年付入门档横向审计与同质化警报',
    purpose: '拆解 5 家 5.6 元模板化品牌与 ¥79–¥99 年付小包的限制与链接格式异常。',
    href: '/comparisons/cheap-annual-airports-audit/',
  },
  {
    tag: '客户端阵营',
    title: '专属定制 App vs 开源通用 Clash 客户端对比',
    purpose: '帮你权衡飞猫云/Firefly/SOGO 一键客户端与第三方通用订阅的长期自由度。',
    href: '/comparisons/custom-app-vs-universal-client/',
  },
  {
    tag: '跑路与风控',
    title: '机场跑路前兆预警清单与高危信号识别',
    purpose: '识别低价超售大额度多年付、频繁失联与篡改订阅等常见跑路前摇信号。',
    href: '/resources/airport-exit-scam-warning-signs/',
  },
  {
    tag: '双活容灾',
    title: '主力包月 + 备用不限时包 Clash 双活容灾策略',
    purpose: '手把手用 Fallback 策略组实现主力机场维护或波动时自动切换备用线路。',
    href: '/guides/multi-airport-failover-strategy/',
  },
  {
    tag: '专线原理',
    title: 'IEPL / IPLC 专线与公网 BGP 中转技术对比',
    purpose: '搞清物理专线溢价究竟买在哪里，以及为什么写着 IEPL 依然要先月付试跑。',
    href: '/comparisons/iepl-vs-bgp-transit/',
  },
  {
    tag: '单品牌深评',
    title: '光速云 2026 深度独立评测（含实测与解锁图集）',
    purpose: '深入剖析 2020 年老牌服务的多档位价格结构、优势与 AI 需切节点边界。',
    href: '/reviews/guangsuyun-deep-review/',
  },
  {
    tag: '全库筛选',
    title: '进入 32 家机场品牌交互筛选数据库',
    purpose: '按月付实价、IEPL/IPLC、不限时包、第三方订阅与数据完整度自由组合检索。',
    href: '/brands/',
  },
];
