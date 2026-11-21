import type { SubtopicEnrichment } from './l2-subtopic-guides';

export const EXTRA_L2_SUBTOPIC_GUIDES: Record<string, SubtopicEnrichment> = {
  'airport/tuijian': {
    key: 'airport/tuijian',
    heading: '机场推荐场景选型对照：按月流量、AI 解锁与客户端自由度分层决策',
    intro:
      '不同读者对“好用”的定义截然不同：写代码查文档每月只需要 40–60GB 但极度依赖 ChatGPT/Claude 稳定 IP；全家看 4K 视频与主机联机则离不开开放第三方订阅的 IEPL 专线与 OpenWrt 软路由适配。下表按四大主流使用画像列出核验过关的筛选框架：',
    tableTitle: '四大常见需求画像对应套餐结构与代表方向',
    headers: ['核心使用场景', '建议预算与流量配额', '关键硬件与协议门槛', '优先选型重点与避坑'],
    rows: [
      {
        col1: 'AI 开发与日常远程办公',
        col2: '¥20–¥35/月 · 120–268GB/月',
        col3: 'VLESS / Trojan + 第三方 Clash 订阅',
        col4: '用 Clash 独立规则固定美/日节点访问 Claude/ChatGPT，严禁开启随机切节点或负载均衡',
      },
      {
        col1: '4K 视频流媒体与多设备共享',
        col2: '¥19.9–¥35/月 · 150–350GB/月',
        col3: 'IEPL/IPLC 专线 · 常规 1x 倍率',
        col4: '核实本地三网（电信/联通/移动）晚 20:00–23:00 实际缓冲，慎买仅限专属 App 的品牌',
      },
      {
        col1: '极轻度查资料 / 双活灾备',
        col2: '¥98–¥147 一次性 · 100–247GB 不限时',
        col3: '支持 Clash Verge Rev / 小火箭导入',
        col4: '挂载于客户端 Fallback 策略组作主力失联兜底；不参与优惠码且多不支持退款',
      },
      {
        col1: '低预算纯网页与文档查阅',
        col2: '¥79.9–¥99/年 · 45–69GB/月',
        col3: '须先确认是否可先试单月或口碑完整',
        col4: '区分「年付折算月均价」与单月实付价；对 ¥5.6 档同质化集群新站建议先观察',
      },
    ],
    checkpointsTitle: '机场下单前务必核对的三条铁律',
    checkpoints: [
      '永远把「先掏 1 个月单月付测试当地宽带晚高峰」作为第一单铁律，切忌上来直接买两年/三年超长周期。',
      '核实订阅后台是否开放标准 Clash YAML / V2Ray Base64 导入，这决定了今后能否自由切换客户端及部署主备容灾。',
      '阅读对应品牌档案中的缺点、历史口径差异和 2026-08-11 测试时间戳，不轻信“全网第一/永久不限速”绝对化营销话术。',
    ],
    parentHubHref: '/airport/#core-candidates-table',
    parentHubLabel: '进入机场推荐总览查看 10 家详细参数对比表',
    faqs: [
      {
        question: '同一家品牌在别人家电信很快，为什么在我家移动或校园网却经常抽风？',
        answer:
          '不同省市运营商出口接入机房路由不同，校园网也常对 UDP 限流。建议优先挑选三网 BGP 多线入口 + 支持 VLESS/Trojan 与 Hysteria2 多协议共存的订阅，并通过单月付实地测试当地晚高峰。',
      },
      {
        question: '应该选「仅专属客户端」的机场还是「支持第三方 Clash 订阅」的机场？',
        answer:
          '完全不想学规则、仅 1–2 台普通设备查资料可选用同时兼顾口碑的专属客户端品牌；但凡需要上 OpenWrt 软路由、配 AI 专属分流规则或构建双机场容灾，请务必选保留第三方订阅导入的品牌。',
      },
      {
        question: '为什么站内部分品牌页显示「部分待核实」或「暂无测速截图」？',
        answer:
          '本站严格执行零编造准则：当原始品牌资料缺失某周期报价、协议写明不清或未抓取到当期测速截图时，均以真实缺口状态展示，不靠猜测估算补充数据。',
      },
    ],
  },
  'airport/mianfei-tizi': {
    key: 'airport/mianfei-tizi',
    heading: '免费梯子的真实运作成本与低成本安全替代矩阵',
    intro:
      '网络上长期流通的「永久免费梯子」与公开爬虫节点，实质往往面临万人同挤秒失效、恶意数据捕获或浏览器 Cookie 暴露等隐患。对于每月仅查几次文档的轻度读者，对比隐性安全与时间成本尤为关键：',
    tableTitle: '公开免费工具与低门槛合规替代方案四维对比',
    headers: ['获取方式', '可见费用与维护耗时', '隐私与账号风控等级', '合规理性替代策略'],
    rows: [
      {
        col1: '爬虫公开节点池 / 免费订阅',
        col2: '¥0 · 日均找码/换链耗时极高',
        col3: '高危：共用黑名单 IP、极易触发 AI/Google 封号',
        col4: '仅限无痕窗口读取无需登录的公开开源文件（需验证 SHA256）',
      },
      {
        col1: '来源不明免费破解版 VPN App',
        col2: '¥0 · 安装即用看似省心',
        col3: '极高危：闭源夹带木马、广告劫持与剪贴板偷窃风险',
        col4: '坚决卸载；代理客户端软件（如 Clash Verge Rev）本就免费开源',
      },
      {
        col1: '一次性不限时按量流量包',
        col2: '约 ¥98–¥147 一次（可用 6–12 个月）',
        col3: '良好：独立认证、稳定专线出口',
        col4: '每月仅用数 GB 查资料用户的最优解，均摊每月成本不到十元',
      },
      {
        col1: '入门标准月付试水（¥18–¥25）',
        col2: '单月约 ¥20 · 无长周期绑架',
        col3: '良好：可控按月停用、支撑高频研发与流媒体',
        col4: '适合天天用 AI 工具与看高清视频的主力用户验证本地网络',
      },
    ],
    checkpointsTitle: '应急使用免费通道时必须守住的四道隔离红线',
    checkpoints: [
      '绝不在公开免费代理或来路不明免费 VPN 下登录 Google 主号、Apple ID、工作邮箱、GitHub 私有库及金融网银。',
      '下载开源客户端后，哪怕通过临时通道拉取安装包，也必须用系统终端校验 GitHub 官方 SHA256 数字指纹后再运行。',
      '不要使用第三方站点打包修改版，也不要把任何带 `?token=` 的付费个人订阅发进免费测试群换节点。',
    ],
    parentHubHref: '/resources/free-nodes/',
    parentHubLabel: '查看免费节点专题万字安全审计与核验指南',
    faqs: [
      {
        question: '为什么不能用免费节点注册 ChatGPT 或 Claude？',
        answer:
          '公开免费节点每日承载大量自动化爬虫与批量注册请求，出口 IP 在 OpenAI 和 Anthropic 风控库中污染分极高，极易导致新号当场拒登或遭连坐封禁。',
      },
      {
        question: '正规开源客户端 Clash Verge Rev 或 FlClash 需要花钱买“VIP 破解版”吗？',
        answer:
          '完全不需要！Clash Verge Rev、FlClash、v2rayN、v2rayNG 等均属 GitHub 免费开源软件，所有打着收费破解旗号的下载页均属钓鱼欺诈。',
      },
      {
        question: '一个月只查两次英文论文或拉几百兆 Git 代码，选什么最划算？',
        answer:
          '建议在核实支持第三方订阅的品牌中选择支持按量计费的「一次性不限时流量包」，用多少扣多少、不会按自然月清零作废。',
      },
    ],
  },
  'airport/kexue-shangwang': {
    key: 'airport/kexue-shangwang',
    heading: '零基础科学上网四层知识体系：软件、通道、分流与协议对照',
    intro:
      '许多新手把客户端软件（空壳播放器）和机场订阅（加密传输信号源）混为一谈，导致软件下好却全网不通。理顺以下四层核心组件的分工，30 分钟即可跑通多设备稳定工作流：',
    tableTitle: '完整代理工作流的四个独立层级对照表',
    headers: ['架构层级', '实际作用与比喻', '常见正确选型', '新手高频误区'],
    rows: [
      {
        col1: '1. 客户端播放器 (Client)',
        col2: '负责拦截系统请求、运行分流规则并完成加密打包',
        col3: '桌面 Clash Verge Rev / v2rayN；安卓 FlClash；iOS 小火箭',
        col4: '误以为安装完客户端不买/不填订阅就能免费直连外网',
      },
      {
        col1: '2. 订阅链路 (Subscription)',
        col2: '服务商下发的节点地址与加密鉴权 URL',
        col3: '按本地宽带月付测试后选择的 IEPL/BGP 服务商',
        col4: '把含个人 Token 的订阅地址贴入陌生在线网页工具转化',
      },
      {
        col1: '3. 分流策略 (Rule Mode)',
        col2: '区分百度/微信走直连（DIRECT），Google/AI 走海外节点',
        col3: '日常锁定在「Rule 规则模式」+ 下载进程直连规则',
        col4: '长期挂着「Global 全局模式」开网盘/迅雷耗光套餐流量',
      },
      {
        col1: '4. 传输协议与线路',
        col2: '决定抗探测伪装能力（协议）及晚高峰拥堵情况（线路）',
        col3: 'VLESS-Reality / Trojan / Hy2 + 跨境内网或 BGP 中转',
        col4: '盲目只看协议缩写，忽略底层是普通公网直连还是 IEPL 专线',
      },
    ],
    checkpointsTitle: '零基础上手最推荐的 4 步启动路径',
    checkpoints: [
      '先装软件再选服务：参照官方 GitHub 核对 SHA256 装好 Clash Verge Rev 或手机 FlClash/Shadowrocket。',
      '用单月付或小额不限时包实测当地晚高峰（20:00–23:00）真实延迟与 YouTube 缓冲速度，确认可用后再做后续续费。',
      '熟悉 Fake-IP 防 DNS 泄漏及 `Rule` 模式规则划分，避免把国内金融应用及大流量下载软件送入国际出口通道。',
    ],
    parentHubHref: '/guides/beginner-onboarding-roadmap/',
    parentHubLabel: '阅读零基础科学上网四步入门完全路线图',
    faqs: [
      {
        question: '电脑、iPhone 和安卓手机需要分别买三个机场账号吗？',
        answer:
          '不需要。绝大多数支持第三方订阅的品牌支持多终端导入同一条个人订阅 URL（受套餐设备数政策约束，切勿将链接公开分享给陌生人）。',
      },
      {
        question: 'IEPL/IPLC 物理专线和传统 Shadowsocks/VLESS 协议是什么关系？',
        answer:
          '专线决定数据包跨境段是否走昂贵内网点对点物理光缆（抗晚高峰丢包）；协议决定数据包从你电脑加密送到入口服务器时怎么封装防探测，两者属于正交配合关系。',
      },
      {
        question: '为什么浏览器已经通了，Terminal/Git/Docker 命令行还是连不上外网？',
        answer:
          '普通系统代理只服务于遵循系统代理配置的浏览器；命令行、WSL2 与微软商店应用需要开启客户端服务模式下的「TUN 虚拟网卡模式」或手动配置终端环境变量。',
      },
    ],
  },
  'vpn/tuijian': {
    key: 'vpn/tuijian',
    heading: 'VPN 推荐与理性选型：传统商业 VPN vs 规则代理机场 vs 企业专线',
    intro:
      '面对跨国办公、海外研发与常规流媒体需求，传统海外商业 VPN（WireGuard/OpenVPN 架构）与现代规则代理（Clash/Mihomo/sing-box 体系）在底层防阻断机制、分流精度与国内软件兼容性上存在根本分工：',
    tableTitle: '三类跨境网络方案在 2026 国内环境下的适用边界对照',
    headers: ['方案类型', '典型底层协议与计费', '抗复杂出口干扰能力', '适用人群与明显缺点'],
    rows: [
      {
        col1: '规则分流代理（通用机场+开源端）',
        col2: 'VLESS-Reality / Trojan / Hy2 · ¥18–¥35/月起',
        col3: '较高（配合 IEPL 专线及现代 TLS 伪装抗特征识别强）',
        col4: '适合日常开发/AI/流媒体混合且国内 App 频繁并用的用户；需具备基础订阅导入概念',
      },
      {
        col1: '海外老牌商业 VPN',
        col2: 'WireGuard / OpenVPN · 约 $3–$12/月（外币卡）',
        col3: '在复杂公网跨境阻断环境下易遇端口特征限速或直连波动',
        col4: '适合已身处海外、重度看重统一无日志审计或需接入欧美企业标准协议的用户',
      },
      {
        col1: '企业合规 SD-WAN / 独立专线',
        col2: '定制独立网关与静态独享出口 · 百元至上千元/月',
        col3: '极高（点对点保障 SLA 与独立固定企业白名单 IP）',
        col4: '适合外贸企业办公、多门店/跨境收款与长期团队协作，普通个人性价比低',
      },
    ],
    checkpointsTitle: '国内用户选择传统 VPN 前必须预先核实的三件事',
    checkpoints: [
      '不要轻易被英文评测榜“年度最佳 VPN”诱导一次性付 2–3 年美金账单——许多海外知名商业 VPN 在中国大陆公网环境下根本无法稳定握手连接。',
      '传统 VPN 多采用三层全局隧道，一旦打开会导致访问淘宝、微信、高德地图速度骤降甚至网银风控；规则分流客户端则能精确做到国内外毫秒互不干涉。',
      '远程办公若需要极洁净不撞车的固定归属 IP（例如公司堡垒机白名单或海外店铺后台），应选择独享静态出口或合规企业组网而非十几块的共享节点池。',
    ],
    parentHubHref: '/vpn/#vpn-vs-proxy-matrix',
    parentHubLabel: '返回 VPN 专题查看底层架构全维对比矩阵',
    faqs: [
      {
        question: '为什么大厂海外知名 VPN 在国外好用，一拿回国内连晚高峰就断流？',
        answer:
          '主流海外商业 VPN 面向全球常规隐私需求设计，其公开服务器 IP 段与 WireGuard/OpenVPN 默认握手特征在跨境公网中极易被识别降速或阻断。',
      },
      {
        question: '规则代理机场（Clash/sing-box）能保护隐私吗？会不会把国内银行密码也发给节点？',
        answer:
          '在正确保持在 `Rule（规则）` 模式下，微信、支付宝、网银与国内主流域名均通过 `DIRECT` 直接由本地宽带出站，根本不经过第三方代理服务器；访问境外 HTTPS 网站时依然受 TLS 端到端加密保护。',
      },
      {
        question: '外贸和 TikTok 商用账号能不能用几十块钱一个月的常规服务？',
        answer:
          '日常娱乐刷视频可行，但严肃的跨境店铺后台、海外广告户与商业直播推流由于对出口 IP 唯一性与时区指纹极度敏感，共享节点极易连带限流，建议采用独立静态原生 IP 方案。',
      },
    ],
  },
  'vpn/mianfei': {
    key: 'vpn/mianfei',
    heading: '免费 VPN 隐私审计与商业变现模式拆解',
    intro:
      '维持海外高速节点、BGP 入口与抗封锁运维每月都需要真金白银支出。面向全网开放的「完全免费 VPN」究竟靠什么赚钱？搞清这背后的四种常见变现模式，才能看透为什么免费工具往往最昂贵：',
    tableTitle: '常见免费 VPN 软件与节点来源的四大隐蔽成本',
    headers: ['免费产品模式', '典型用户表象', '幕后常见变现 / 获利途径', '对终端设备与隐私的风险'],
    rows: [
      {
        col1: '免费增值诱导版 (Freemium)',
        col2: '每月送 2–10GB、仅 2–3 个拥挤地区节点',
        col3: '用严苛限速与极低额度倒逼用户升级高价付费订阅',
        col4: '正规知名国外大厂尚相对规范，但在国内往往无法有效直连',
      },
      {
        col1: '流量劫持 / 广告插件捆绑端',
        col2: '界面简陋但“永久免费不限流量”',
        col3: '在非严格加密页面强行插广告、收集 DNS 浏览画像出售给数据分析商',
        col4: '高危隐私暴露，且容易导致账号 Cookie 与访问记录泄露',
      },
      {
        col1: 'P2P 住宅出口共享节点池',
        col2: '免费给你挂，让你安装某桌面驻留服务',
        col3: '直接把你的电脑/手机家庭宽带也做成节点借给其他付费或灰产用户出站',
        col4: '极高风险：他人利用你家宽带从事异常访问造成的合规后果由你承担',
      },
      {
        col1: '二次重打包钓鱼免费版',
        col2: '搜索引擎排名前列的“绿色汉化免配置包”',
        col3: '直接内置远控木马、偷取浏览器保存密码与加密钱包剪贴板',
        col4: '最高级别安全灾难，必须仅从 GitHub 官方仓库校验 SHA256 下载开源端',
      },
    ],
    checkpointsTitle: '真处于冷启动无梯过渡期时的安全自救顺序',
    checkpoints: [
      '优先用手机热点或朋友已连外网设备，直接前往真实 GitHub Releases 仓库把正版 Clash Verge Rev / FlClash / v2rayN 拉回来，并核对 SHA256 指纹。',
      '若非得临时用免费测试通道查公开资料，务必在无痕浏览器窗口操作、不输入任何密码、不使用 Chrome/Edge 自动同步登录态。',
      '长期仅极低频使用的用户，改用百元级别不限时流量包即可彻底摆脱免费 VPN 的安全噩梦。',
    ],
    parentHubHref: '/vpn/#free-vpn-audit',
    parentHubLabel: '返回 VPN 专题查看免费软件隐私审计细节',
    faqs: [
      {
        question: '为什么有些免费 VPN 要在手机系统里强制安装一个「描述文件 / 根证书」？',
        answer:
          '安装自定义根证书理论上可以让对方解密、查看并篡改你手机发出的一切 HTTPS 加密请求（包括网页账号表单）。纯科学上网工具（如小火箭默认模式或 Clash Verge）正常情况下绝不要求信任第三方 CA 根证书。',
      },
      {
        question: '正规开源客户端没有自带节点，怎样安全度过新电脑冷启动下载期？',
        answer:
          '先用已配好的手机从 GitHub 下载电脑端安装包并记录官方 SHA256 值，传回电脑用 PowerShell `Get-FileHash` 比对一字不差后再安装。',
      },
      {
        question: '怎么看一个开源代理软件是不是被人篡改投毒过？',
        answer:
          '首先核对作者 GitHub 仓库拼写是否真实，其次下载后通过系统终端验证散列值是否与 Releases 页面同步公布的 `sha256sums.txt` 完全匹配。',
      },
    ],
  },
  'vpn/pingce': {
    key: 'vpn/pingce',
    heading: 'VPN 与代理客户端评测基准：内核引擎、内存表现与防泄漏核验',
    intro:
      '评价一款客户端软件好不好用，绝不只看皮肤好不好看，而要从底层代理内核（Mihomo / sing-box / Xray）、Rule-Provider 规则集处理吞吐、TUN 虚拟网卡稳定性、Fake-IP DNS 抗污染能力以及移动端电量控制五大维度综合衡量：',
    tableTitle: '2026 主流活跃代理软件关键工程维度对比',
    headers: ['客户端软件', '底层内核与平台', '核心评测优势', '主要短板或注意边界'],
    rows: [
      {
        col1: 'Clash Verge Rev',
        col2: 'Mihomo · Win/Mac/Linux',
        col3: '覆写/脚本引擎极强，TUN 服务模式完整覆盖 UWP 与终端',
        col4: '高并发复杂规则时 Tauri+内核内存略高于极简命令行工具',
      },
      {
        col1: 'FlClash',
        col2: 'Mihomo · 全桌面+Android',
        col3: 'Flutter 统一现代界面、移动端锁屏续航与轻量化平衡突出',
        col4: '高阶自定义 JS 覆写及冷门网络调试面板不如 Verge Rev 深',
      },
      {
        col1: 'v2rayN (7.x)',
        col2: 'Xray + sing-box + Mihomo · 三端桌面',
        col3: '同时解析单链 `vless://`、Base64 与 YAML，极客单节点调试首选',
        col4: '界面偏工程师工具风格，多策略复杂 Clash 规则直观性略弱',
      },
      {
        col1: 'Shadowrocket / Stash',
        col2: '多协议 / Mihomo · iOS 付费',
        col3: 'Shadowrocket 极省电兼容全；Stash 可直接迁移 Clash 覆写逻辑',
        col4: '均需非国区 Apple ID 且需外区 App Store 一次性购买',
      },
    ],
    checkpointsTitle: '判定任何客户端合格与否的三项必测实验室动作',
    checkpoints: [
      '打开 `ipleak.net` 核验 DNS 列表是否出现本地电信/联通/移动 IP，以及公网 IPv6 是否发生绕过代理泄漏。',
      '电脑端开启代理后打开 PowerShell / Terminal 运行 `curl -I https://www.google.com`，检查未配环境变量的 CLI 工具是否能在 TUN 下通畅响应。',
      '手机端关闭画面锁屏放置 15 分钟后再点亮切换浏览器，观测国内定制系统（澎湃/ColorOS/鸿蒙）加锁与电源白名单后的不断流表现。',
    ],
    parentHubHref: '/comparisons/desktop-proxy-clients-benchmark/',
    parentHubLabel: '阅读桌面客户端全维度实测对比专题',
    faqs: [
      {
        question: '为什么网上偶尔看到推荐「Mihomo Party」却没放到本站默认首推首位？',
        answer:
          '依据站内核实清单说明，部分衍生客户端（如 Mihomo Party）需随版本跟进核实上游仓活跃维护情况与签名发布链路；对普通用户推荐首选社区共识极稳的 Clash Verge Rev、FlClash 与 v2rayN。',
      },
      {
        question: '同一台电脑同时安装 Clash Verge Rev 和 v2rayN 做备用测试会冲突吗？',
        answer:
          '仅安装不运行或不同时激活接管系统代理与 TUN 虚拟网卡时不会冲突；但不可同时点击开启两个工具的系统代理或虚拟网卡。',
      },
      {
        question: '苹果 Mac M 系列芯片如果不小心装了 Intel 版 (x64) 怎么分辨？',
        answer:
          '打开「活动监视器」看架构列是否标注为 `Apple` 而非 `Intel`；Apple Silicon Mac 必须下载文件名包含 `aarch64` 或 `arm64` 的 `.dmg` 安装包。',
      },
    ],
  },
  'vpn/jiasuqi': {
    key: 'vpn/jiasuqi',
    heading: 'VPN 加速器与网游加速器区别：进程路由、UDP NAT 与延迟优化',
    intro:
      '很多人以为充了“XX 游戏加速器会员”就能顺便打开 ChatGPT 或浏览海外开发文档，结果却毫无反应；而另一些用户开着通用 Clash 代理打外服游戏却发现频繁掉线或 NAT 严格。核心原因在于两者的驱动层拦截定位完全不同：',
    tableTitle: '合规网游加速器 vs 通用规则代理工具（Clash TUN）技术差异',
    headers: ['对比维度', '主流商业网游加速器', '通用规则代理（开启 TUN + UDP）', '选型决策关键'],
    rows: [
      {
        col1: '流量劫持目标',
        col2: '仅拦截白名单特定游戏 `.exe` 进程与部分对战 UDP 端口',
        col3: '按域名/IP/进程规则接管浏览器、终端、AI 工具及全网卡通信',
        col4: '两者无法相互完全取代，网游加速器不管网页与大模型 API',
      },
      {
        col1: 'UDP 与 NAT 表现',
        col2: '专为游戏房间心跳设计极低抖动与 FullCone NAT 优化',
        col3: '依赖客户端 TUN 服务模式开启 `udp: true` 与机场节点 NAT 支持度',
        col4: '联机射击/主机匹配看重 NAT 类型（FullCone 最优），需查阅测速 UDP 栏',
      },
      {
        col1: '并发冲突风险',
        col2: '依赖 LSP / WFP 网络驱动钩子抢占系统网关',
        col3: '依赖 Wintun / gVisor 虚拟网卡接管三层路由表',
        col4: '绝对不可在同一时刻既开网游加速器又开 Clash TUN 模式',
      },
    ],
    checkpointsTitle: '兼顾联机游戏与科学上网的无冲突操作规范',
    checkpoints: [
      '需要打游戏开网游加速器时，先在 Clash Verge Rev 里彻底关闭「TUN 模式」并关闭「系统代理」，避免双虚拟路由表互斥造成整机断网。',
      '如果一定要用 Clash 代理玩轻度海外联机游戏或用 Discord/Telegram 语音，务必安装并激活服务模式开启 TUN 且确认节点开启 UDP 支持。',
      '校园网打游戏或挂机发觉 Hysteria2 极不稳定时，往往是宿舍网关对连续 UDP 发包限速，可切换 TCP 伪装链路验证或调校端口跳跃范围。',
    ],
    parentHubHref: '/guides/game-booster-vs-proxy/',
    parentHubLabel: '查看游戏加速器与科学上网代理深度分流对比',
    faqs: [
      {
        question: '为什么开了网游加速器加速 Steam 商店，旁边的 Google Chrome 依然上不了网？',
        answer:
          '因为游戏加速器的白名单只注入了你选定的游戏启动程序与游戏服务器 IP 段，浏览器和命令行进程并没有被接入它的转发通道，也不具备通用规则分流器。',
      },
      {
        question: '打外服游戏开 Clash TUN 模式延迟显示只有 45ms，为什么进游戏还是连不上匹配房？',
        answer:
          '绝大多数对战游戏匹配走的是 UDP 协议且对 NAT 类型要求严格（需 FullCone NAT）。请确认你启用的机场节点与客户端配置同时开启了 `udp: true` 转发，且未在校园网下被 UDP QoS 截流。',
      },
      {
        question: '装完某个网游加速器之后，哪怕把它退出了我的 Clash 也突然再也连不上网怎么办？',
        answer:
          '部分加速器退出后可能留下异常系统代理注册表或 Winsock LSP 残留。可尝试先关闭加速器内置的“系统代理修复/重置网络”工具，或在管理员终端执行 `netsh winsock reset` 重启系统。',
      },
    ],
  },
  'vpn/haoyong': {
    key: 'vpn/haoyong',
    heading: '零配置门槛对比：机场自研专属客户端 vs 开源第三方通用端',
    intro:
      '衡量工具“好用不折腾”有两个层面：新手期追求下载完输入邮箱密码直接点亮开关，但用了半年后往往追求换品牌不重学软件、能自动主备防掉线、能精确分流不走多余流量。用下面这张矩阵看懂两边取舍：',
    tableTitle: '专属免配 App 与开源通用客户端（支持一键导入）权衡对照',
    headers: ['评估纬度', '机场专属客户端（无外部订阅）', '双轨支持 / 通用开源客户端', '真实好用的判断参考'],
    rows: [
      {
        col1: '首次冷启动速度',
        col2: '极快：注册 → 下客户端 → 账号直登',
        col3: '中等：下正版 Clash Verge Rev / 小火箭 → 点一键导入',
        col4: '“一键导入 Clash”机制成熟后，通用端首次操作其实也就两分钟',
      },
      {
        col1: '闭源权限与隐私透明度',
        col2: '较低：闭源编译包，普通用户无法审查网络权限调用',
        col3: '极高：全开源在 GitHub，安装前可用 SHA256 验证未篡改',
        col4: '办公机/开发机强烈建议使用源码公开可查的开源客户端',
      },
      {
        col1: '多设备与苹果生态',
        col2: '视品牌是否配齐 Win/Mac/安卓/iOS 私有包及企业签稳不稳',
        col3: '外区 ID 装一次 Shadowrocket/Karing 后，换任何机场永不重装',
        col4: '通用端一次学会即可通吃市面上绝大部分开放订阅服务商',
      },
      {
        col1: '高可用容灾与软路由',
        col2: '无法叠加第二家不限时备用订阅，基本不能进 OpenWrt',
        col3: '完美支持 `proxy-providers` + `fallback` 与 OpenWrt 家庭网关',
        col4: '代表双支持品牌（光速云、一翻云、二猫云等）兼顾了双端便利',
      },
    ],
    checkpointsTitle: '兼顾“好用省心”与“不被单一商家锁定”的最佳实践',
    checkpoints: [
      '对于苹果电脑 Mac 用户，务必选标有 `aarch64`/`arm64`（M 系列芯片）的原生开源包（Clash Verge Rev 或 FlClash），省电安静且兼容全部主流订阅。',
      '即便你是零基础新手，只要选“支持一键导入通用订阅”的品牌并花 5 分钟走完 Clash Verge Rev 导入，日后换备用线路、配 AI 专用组将彻底毫无阻碍。',
      '尽量避开完全闭源且在失联危机期间通过陌生网址诱导临时更换的不明专属客户端包。',
    ],
    parentHubHref: '/comparisons/custom-app-vs-universal-client/',
    parentHubLabel: '阅读专属客户端与通用客户端优劣势深度横评',
    faqs: [
      {
        question: '既然 Clash Verge Rev 已经是中文图形界面且机场官网都支持「一键导入」，为什么还有专属 App？',
        answer:
          '主要面向彻底不想看任何文字说明的非技术用户，同时也能帮助商家把中转域名动态下发及防止部分订阅链路被无授权抓取转发。',
      },
      {
        question: '家里长辈只用 iPad 看视频新闻，选哪种方案最省事？',
        answer:
          '可以由你提前用合规外区账号帮 iPad 一次性配置好 Shadowrocket 或 Karing（打开按需连接及规则模式），之后无论后台切换什么通用订阅长辈都完全不用二次操作。',
      },
      {
        question: 'MacBook 每次合盖再打开后系统代理经常失效，选哪款客户端表现更稳？',
        answer:
          '建议使用保持高频更新维护的 Clash Verge Rev 或 FlClash（arm64 原生版），并依据自身需求决定启用系统代理或搭配服务模式 TUN，减少 Rosetta 转译带来的休眠兼容断联。',
      },
    ],
  },
  'clash/tuijian': {
    key: 'clash/tuijian',
    heading: '2026 全平台活跃 Clash / Mihomo 系客户端官方维护清单',
    intro:
      '原版 Clash 内核与 Clash for Windows 已于 2023 年底彻底停更删库。任何宣称还有“CFW 2026 最新汉化版”的站点均存在极高安全风险。当前真正活跃维护并支持现代 VLESS-Reality 与 Hysteria2 协议的客户端应从以下矩阵筛选：',
    tableTitle: '六大操作系统正统活跃开源及主流替代方案矩阵',
    headers: ['目标操作系统', '主力首选客户端', '备选 / 专业分支', '选型避坑注意事项'],
    rows: [
      {
        col1: 'Windows 10 / 11',
        col2: 'Clash Verge Rev',
        col3: 'FlClash / v2rayN (带 Mihomo 核心) / Clash Nyanpasu',
        col4: 'Mihomo Party 需逐版核实活跃维护状况；谨防百度前排钓鱼仿冒域名',
      },
      {
        col1: 'macOS (MacBook / iMac)',
        col2: 'Clash Verge Rev / FlClash',
        col3: 'v2rayN / Hiddify / Karing / Surge Mac (商业付费)',
        col4: 'M1–M4 芯片务必认准 `aarch64`/`arm64` 原生镜像，切忌下 `x64`',
      },
      {
        col1: 'Android 安卓手机',
        col2: 'FlClash / v2rayNG / Hiddify',
        col3: 'Clash Meta for Android (CMFA) / Karing / Clash Mi',
        col4: '严禁使用 Google Play 上以 NekoBox 名义上架的第三方接管控制包',
      },
      {
        col1: 'OpenWrt 软路由',
        col2: 'OpenClash / Nikki / PassWall2',
        col3: 'HomeProxy (原生 sing-box 体系)',
        col4: 'Nikki 明确要求 OpenWrt 24.10+ fw4 环境；刷入前必查 CPU 架构与包格式',
      },
    ],
    checkpointsTitle: '从老旧停更客户端安全过渡的三个步骤',
    checkpoints: [
      '如果您目前电脑上还残留原版 Clash for Windows (CFW)，请先导出自己修改过的自定义节点与规则片段，再彻底卸载并移除残留 Windows 服务后安装 Clash Verge Rev。',
      '所有开源桌面与安卓包下载完后，请坚持先核对一次 GitHub Releases 公布的 SHA256 指纹再安装。',
      '遇到同时拥有自建 `vless://` 单链与标准 Clash YAML 订阅的场景，可常备 `v2rayN 7.x` 作为极客万能工具箱辅助。',
    ],
    parentHubHref: '/clash/#client-matrix',
    parentHubLabel: '返回 Clash 专题查阅全平台客户端生态总表',
    faqs: [
      {
        question: '旧版 Clash for Windows 还能连上现有节点，我有必要费事换掉它吗？',
        answer:
          '非常有必要替换。CFW 已多年无安全漏洞补丁，且其停更时的老内核完全无法识别 VLESS-Reality、Hysteria2 等当前主流抗干扰协议，继续使用既容易大面积连不上新节点，也存在严重系统隐患。',
      },
      {
        question: 'Clash Verge Rev、FlClash 和 Clash Nyanpasu 都是 Mihomo 内核，怎么选？',
        answer:
          '需要深度的规则覆写、JS 脚本扩展、完善的 Windows/macOS TUN 及 UWP 工具优先选 Clash Verge Rev；注重移动端和桌面端统一极简 Flutter 颜值与省电表现可考虑 FlClash。',
      },
      {
        question: '为什么不建议在搜索引擎找所谓“Clash 绿色便携打包版”？',
        answer:
          '安全黑产常把真正的开源软件解包后注入一行剪贴板监控或窃密木马，再买下高仿域名竞价推流，普通用户仅凭运行界面真假难辨，必须核对官方仓库源与 SHA256。',
      },
    ],
  },
  'clash/verge': {
    key: 'clash/verge',
    heading: 'Clash Verge Rev 核心架构功能速览：服务模式、TUN 与全局扩展覆写',
    intro:
      '把 Clash Verge Rev 只当作一个点开关切节点的面板，等于浪费了它 70% 的实力。理解下面四项核心内置能力后，你的多机场切换、AI 分流锁定、BT 直连屏蔽与终端加速全部都可以一次配置永久自动化生效：',
    tableTitle: 'Clash Verge Rev 四大核心功能模块与实战价值',
    headers: ['内置核心功能', '所处界面路径', '解决的痛点问题', '使用关键前提'],
    rows: [
      {
        col1: '服务模式 (Service Mode)',
        col2: '设置 → Clash 服务模式',
        col3: '赋予非管理员界面提权创建底层虚拟网卡的能力，彻底免去弹窗授权',
        col4: '开启 TUN 虚拟网卡之前必须先成功安装并绿灯启用该后台服务',
      },
      {
        col1: 'TUN 虚拟网卡模式',
        col2: '首页 / 设置 → Tun 模式开关',
        col3: '强力接管系统三层网络，打通 git、npm、Docker、WSL2 及 UWP 商店',
        col4: '严禁与企业 VPN 或网游加速器同时开启，以免发生路由表抢占冲突',
      },
      {
        col1: '全局扩展配置 (Merge / Script)',
        col2: '订阅 (Profiles) → 全局扩展编辑',
        col3: '无侵入追加私人规则（如强制迅雷直连、加第二机场容灾组），订阅更新不丢失',
        col4: 'YAML 缩进须严格对齐空格，且所指策略组名必须与主配置一字不差',
      },
      {
        col1: '连接与实时日志面板',
        col2: '左侧菜单 → 连接 / 日志',
        col3: '一秒看清哪一个进程吃掉了大流量，以及具体域名命中了 `DIRECT` 还是 `PROXY`',
        col4: '遇到网速异常或疑似流量偷跑时，打开「连接」按下载量降序排序查现行',
      },
    ],
    checkpointsTitle: '长期保持 Clash Verge Rev 顺畅运行的配置技巧',
    checkpoints: [
      '通过「全局扩展配置」的 `prepend-rules` 固定前置把 `qbittorrent.exe`、`Thunder.exe` 与百度网盘加入 `DIRECT`，永不触发机场服务端 BT 审计也不用冤枉流量。',
      '保持常规规则 `Rule` 模式工作，尽量避免使用 `Global`，只有在明确排错某个冷门未知国外域名时才短暂开启验证。',
      '配置好后可将扩展脚本及个人精简规则通过软件内置的 WebDAV 备份或导出保存，重装系统瞬间一键还原全套策略。',
    ],
    parentHubHref: '/clash/verge-complete-guide/',
    parentHubLabel: '阅读 Clash Verge Rev 从入门到进阶完整专著教程',
    faqs: [
      {
        question: 'Clash Verge Rev 默认混合端口 `7897` 被其他软件占用了怎么办？',
        answer:
          '进入「设置 → Clash 设置 → 混合端口」，修改为一个未被占用的高位数端口（例如 `17897`）并保存重启内核即可恢复正常工作。',
      },
      {
        question: '为什么在「全局扩展脚本 (Script)」写规则有时不如用「全局扩展配置 (Merge YAML)」稳妥？',
        answer:
          'Merge 采用结构化 YAML 合并机制，写一条 `prepend-rules` 直观且不易受机场原配置字段结构变化牵连；除非需要复杂正则批量过滤节点名称并动态重构策略组，普通用户用 Merge 更省心。',
      },
      {
        question: '已经开启服务模式和 TUN，为什么我关掉软件后 Windows 还是没法直连百度？',
        answer:
          '可能是之前异常强制结束进程导致系统 HTTP 手动代理开关未清理或网卡静态 DNS 残留。打开 Windows 网络设置确认代理已关闭且网卡 DNS 回到自动获取即可瞬间恢复。',
      },
    ],
  },
  'clash/verge-subscribe': {
    key: 'clash/verge-subscribe',
    heading: 'Clash 订阅接入与格式转换指南：YAML、Base64 与本地 Sub-Store',
    intro:
      '机场后台往往提供一键导入按钮、通用 Base64 订阅地址与标准 Clash YAML 链接等多种入口。理解各自差异并杜绝把个人订阅随手粘贴到陌生在线转换网站，是防止订阅密钥泄漏与格式报错的关键：',
    tableTitle: '三类订阅形态导入方式与安全兼容性对照',
    headers: ['订阅或链接类型', 'Clash Verge Rev 原生兼容度', '正确接入/转换处理思路', '安全警示重点'],
    rows: [
      {
        col1: '标准 Clash YAML 订阅 URL',
        col2: '原生 100% 兼容（含全部策略组）',
        col3: '在 Profiles 页粘贴链接点导入，或由官网一键唤起客户端安装',
        col4: '更新失败报错 `403` 时检查是否需要修改 UA 或开启走代理更新',
      },
      {
        col1: '通用 Base64 / V2Ray 订阅',
        col2: 'Clash Verge 需先转为 YAML（或改用 v2rayN）',
        col3: '优先查机场后台自带的 Clash 转换参数开关，或本地自托管 Sub-Store 转换',
        col4: '切勿贴入来路不明的公网在线免费订阅转换站点，防 `?token=` 失窃',
      },
      {
        col1: '单条自建节点链接（`vless://` 等）',
        col2: 'Clash Verge Rev 需写成 YAML proxy 段，不如 v2rayN 直接粘贴方便',
        col3: '零散单链接建议直接使用 v2rayN 剪贴板导入，或用本地 Sub-Store 汇总生成 YAML',
        col4: '注意校对服务器时间误差不得大于 90 秒，以免 TLS/VMess 握手报错',
      },
    ],
    checkpointsTitle: '订阅链接管理中的三大高阶防坑习惯',
    checkpoints: [
      '不要把自动更新间隔（Update Interval）设得过于频繁（如每 10 分钟拉一次），一般保持 `12–24 小时`（`720–1440` 分钟）即可减少不必要的面板接口封锁。',
      '如果截图发群聊排查报错，务必把页面里的订阅 URL 与末尾 `?token=` 密钥完全打码，一旦疑心泄露立刻去官网后台点「重置订阅链接」。',
      '需要把两家不同机场（如包月主站 + 不限时备胎）混合编排并剔除 `2x` 高倍率节点时，在本地 Docker 或桌面部署 `Sub-Store` 是目前最安全可控的做法。',
    ],
    parentHubHref: '/clash/#subscription-workflow',
    parentHubLabel: '返回 Clash 专题订阅导入与转换管理规范',
    faqs: [
      {
        question: '为什么点击机场网页上的「一键导入 Clash」浏览器毫无反应？',
        answer:
          '因为部分浏览器禁用了唤醒 `clash://` 自定义协议，或电脑上尚未完成默认软件注册。最稳妥的办法永远是复制「订阅链接 URL」，手动打开 Clash Verge Rev 的「订阅」页面粘贴点「导入」。',
      },
      {
        question: '导入成功了也能显示剩余流量和到期日，但点开代理列表全是空的怎么办？',
        answer:
          '首先核对机场是否发了未适配 Mihomo 格式的新配置、或套餐尚未完成生效激活；其次查看「订阅日志」是不是拿到了一个返回 HTML 防火墙拦截页的假 YAML 响应体。',
      },
      {
        question: '把 Base64 链接丢到网上公开的订阅转换站有什么实际后果？',
        answer:
          '订阅 URL 本身包含等效于账号钥匙的身份凭证，第三方在线接口在内存中完成转换时完全能顺手留存你的真实订阅，极少数黑产转换站甚至将其盗用并导致账户因异地并发超标封号。',
      },
    ],
  },
  'clash/meta': {
    key: 'clash/meta',
    heading: 'Mihomo（原 Clash.Meta）内核核心特性与防泄漏 DNS 解析结构',
    intro:
      '目前活跃的 Clash Verge Rev、FlClash、OpenClash、Stash 与 Nikki 底层几乎全部运行在 **Mihomo（Clash.Meta）内核** 之上。相比早在 2023 年停更的原版 Clash 内核，Mihomo 在现代抗干扰协议、域名嗅探（Sniffer）与防污染 Fake-IP DNS 引擎上实现了代际跨越：',
    tableTitle: 'Mihomo 内核关键升级能力与日常配置收益',
    headers: ['内核核心能力', '原版 Clash 时代状态', 'Mihomo (Meta) 现行支持标准', '对终端用户的直观改善'],
    rows: [
      {
        col1: '现代抗探测协议支持',
        col2: '不支持 VLESS、Reality、Hysteria2',
        col3: '原生支持 VLESS-Vision/Reality、Hysteria2、TUIC v5 与 SS-2022',
        col4: '兼容全部 2026 主流新锐高速机场节点与自建高抗干扰节点',
      },
      {
        col1: 'Sniffer 域名流量嗅探',
        col2: '缺乏稳定完善的自动嗅探补全',
        col3: '支持基于 TLS SNI 与 HTTP Host 自动还原 IP 请求对应的真实域名',
        col4: '彻底解决代理接管终端/游戏/特定应用只发纯 IP 时无法命中域名分流的问题',
      },
      {
        col1: 'Fake-IP + 双层 Nameserver DNS',
        col2: '配置繁琐，极易引发国内外解析互相抢占污染',
        col3: '按 `default-nameserver` / `nameserver` / `fallback` 分流搭配 `respect-rules`',
        col4: '浏览器输入网址免等待 DNS 往返瞬间响应，同时杜绝 `ipleak.net` 国内泄漏',
      },
      {
        col1: 'Geosite / Rule-Provider 规则引擎',
        col2: '依赖庞大的静态行文本规则列表',
        col3: '内置高效 SRS / MRS 二进制与远程规则集合并发匹配，支持 `PROCESS-NAME`',
        col4: '内存占用大幅降低、更新迅速，轻松针对单一应用做精准分流',
      },
    ],
    checkpointsTitle: '编写或排查 Mihomo 核心配置的三个关键点',
    checkpoints: [
      '如遇双栈家庭宽带访问海外网页先空白转圈 10 秒，检查 DNS 配置中是否误开了无代理支持的 `ipv6: true`，及时调整为 `ipv6: false` 即可。',
      'Fake-IP 模式下，`198.18.0.0/16` 段虚拟 IP 由本地内核即时下发并直接送进对应节点出口解析，若排查某软件异常建议保留合理 `fake-ip-filter` 国内域名白名单。',
      '尽量使用已预置正确 `dns.respect-rules` 的防污染模板（见本站专项指南），勿随意拼接来源未知的两套冲突覆盖参数。',
    ],
    parentHubHref: '/clash/#mihomo-dns-rules',
    parentHubLabel: '返回 Clash 专题深入研读 Mihomo 与 DNS 防泄漏体系',
    faqs: [
      {
        question: '为什么开启了 Fake-IP 模式后，`ping google.com` 返回的是 `198.18.0.x`？是不是中病毒了？',
        answer:
          '完全正常！`198.18.0.0/15` 是 IANA 专门保留的基准测试私网保留段。Fake-IP 引擎故意给海外域名立即分配这个内网假地址，从而绕开本地运营商 DNS 污染等待并把真正解析顺移到海外节点完成。',
      },
      {
        question: 'Sniffer 嗅探功能必须要开吗？不开会有什么现象？',
        answer:
          '建议开启常规 TLS/HTTP 嗅探。当某些应用先自己通过系统查出 IP 再直连目标端口（跳过客户端常规 DNS 映射阶段）时，不开嗅探会导致规则无法匹配域名而误走直连或错选策略组。',
      },
      {
        question: '怎么检查自己的 Mihomo 配置文件是否真的做到了“零国内 DNS 泄漏”？',
        answer:
          '连接海外节点后在浏览器的无痕窗口打开 `ipleak.net` 静待结果列表，只要下面显示的 DNS 服务器地址全部是你选定出口地区或可信海外 DoH 服务器（无中国三大运营商省市节点），且关闭了浏览器内置安全 DNS，即算防泄漏合格。',
      },
    ],
  },
  'clash/tutorials': {
    key: 'clash/tutorials',
    heading: 'Clash 日常使用操作全解：模式切换、TUN 代理与全局避坑规范',
    intro:
      '软件装好且订阅导入成功只是第一步。在日常办公、终端开发与居家多设备上用得顺手省流量，取决于是否搞懂「系统代理 vs TUN 虚拟网卡」「Rule vs Global vs Direct」「Allow LAN 局域网共享密码安全」这三组核心日常操作切换：',
    tableTitle: 'Clash 常见工作模式与日常运行开关搭配指南',
    headers: ['操作控制项', '最推荐日常保持状态', '切错之后常见后果', '例外临时调整场景'],
    rows: [
      {
        col1: '出站工作模式 (Mode)',
        col2: '始终保持 `Rule`（规则模式）',
        col3: '切成 `Global` 会导致国内网银慢半拍，且下迅雷/网盘瞬间烧干流量',
        col4: '仅临时排查某个小众海外站点是否没被分流规则收录时短暂验证 1 分钟',
      },
      {
        col1: '代理接管层级',
        col2: '日常网页用「系统代理」；开发用「TUN 模式」',
        col3: '不开 TUN 时 git/curl/Docker/微软商店不走代理；多软件同开 TUN 会死机断网',
        col4: '需要运行网游加速器或公司企业 VPN 前，提前关停 Clash TUN 开关',
      },
      {
        col1: '允许局域网 (Allow LAN)',
        col2: '公共 Wi-Fi/学校内网务必保持关闭',
        col3: '在公共 Wi-Fi 无鉴权打开等于允许同网段陌生人直接连接 `7897` 蹭流白嫖',
        col4: '仅在可信家庭路由内临时给 Switch / 电视分享代理时打开并用完关闭',
      },
      {
        col1: 'Windows UWP / WSL2 环境',
        col2: '开启服务模式 TUN，或配 Win11 `mirrored` 镜像网',
        col3: 'Microsoft Store 转圈、Copilot 连不上或 WSL2 `apt` 全线超时',
        col4: '受限电脑可点客户端内一键「UWP 回环豁免」工具放行商店进程',
      },
    ],
    checkpointsTitle: '新手日常使用绝不踩坑的四条铁习惯',
    checkpoints: [
      '不要每次切不同应用都去点“连接/断开”开关，保持在 `Rule` 模式配合 AI 单独美/日策略组规则即可自动各行其道。',
      '发现流量莫名快速减少，第一时间点开左侧「连接（Connections）」按流量降序找进程，把下载器或云盘备份加入 `PROCESS-NAME,xxx,DIRECT`。',
      '苹果 Mac、Linux 桌面（Ubuntu/Fedora）及无界面主机（v2rayA Web 控制）各有专属权限处理方法，切勿生搬 Windows 经验硬改环境变量。',
    ],
    parentHubHref: '/clash/#system-proxy-vs-tun',
    parentHubLabel: '返回 Clash 专题查看系统代理与 TUN 完整对照解析',
    faqs: [
      {
        question: '既然 TUN 模式能管终端和所有程序，那是不是一辈子一直开着 TUN、把“系统代理”永远关掉更好？',
        answer:
          '对于常开终端开发的程序员确实更推荐只开 TUN 并保持良好直连规则；但如果是日常频繁开关公司内网 VPN、网游加速器或使用校园网网页认证的电脑，平时仅用轻量级「系统代理」反而冲突最少。',
      },
      {
        question: '开着 Clash「规则模式」访问百度，为什么有时也会走代理或者慢一秒？',
        answer:
          '先查看 Clash「连接」列表确认百度到底命中了 `DIRECT` 还是 `MATCH`；如发现误走代理，多半是你导入了一套缺失中国大陆最新域名/IP 库的精简规则集，更换内置标准 Geosite CN 分流或补一条直连规则即可。',
      },
      {
        question: '我想把电脑上的 Clash 分享给客厅的 Nintendo Switch 下载游戏补丁，最安全做法是什么？',
        answer:
          '确认在家庭可信私网 Wi-Fi 下开启「允许局域网连接 (Allow LAN)」（建议顺带设置本地鉴权账密），记住电脑当前内网 IP 与端口填入 Switch 网络代理，更新完游戏立刻关闭 Allow LAN 开关。',
      },
    ],
  },
  'resources/beginner-help': {
    key: 'resources/beginner-help',
    heading: '零基础入门指引：4 步理清概念、安装安全客户端与防踩坑起步',
    intro:
      '面对陌生的客户端名称、真假难辨的搜索推广页以及“月付/年付折算”报价，第一次接触网络代理最容易走弯路。按以下 4 步标准化起步地图逐项核对，零基础也能在半小时内建成安全可备份的稳定环境：',
    tableTitle: '新人从 0 到 1 起步四阶段行动清单与重点避坑',
    headers: ['阶段顺序', '你需要完成的核心动作', '对照遵循的标准页面', '切忌踩中的高危行为'],
    rows: [
      {
        col1: '第 1 步：选正版客户端',
        col2: '分清「客户端只是空壳播放器」，先从官方 GitHub/外区商店装正版',
        col3: '桌面 Clash Verge Rev；安卓 FlClash；iOS Shadowrocket',
        col4: '百度搜“XX 官网”点竞价下载站，或未验 SHA256 运行陌生包',
      },
      {
        col1: '第 2 步：算清预算选试水包',
        col2: '确认每月真实用量（30G 文档 / 150G 视频 / 不限时备用）',
        col3: '先选单月付 ¥18–¥25（或低频用一次性不限时流量包）',
        col4: '贪年付低折算价一上来直接冲 1 年甚至 2–3 年特价不退款款',
      },
      {
        col1: '第 3 步：导入订阅跑通 `Rule`',
        col2: '粘贴订阅 URL 刷新出节点，确认开关站在规则模式并测通晚高峰',
        col3: '在 20:00–23:00 实测当地宽带下高清起播与网页响应时间',
        col4: '大白天测试秒开就放心，或者长期误开 Global 模式下载大文件',
      },
      {
        col1: '第 4 步：做好双活与备灾准备',
        col2: '读懂倍率/重置日条款，记录官网发布页并用单独强密码注册',
        col3: '高依赖人群加入第二家不限时包做 Clash `fallback` 容灾',
        col4: '多家网站复用同一常见密码、把含 Token 订阅贴进陌生在线转换',
      },
    ],
    checkpointsTitle: '遇到问题时的第一步求助诊断思路',
    checkpoints: [
      '不要上来直接删软件重装——首先在客户端列表点「连接 / 日志」核对是本地系统时间慢了超 90 秒、还是端口被加速器抢占、还是节点整体维护。',
      '如果你同时使用微信、国内银行 App 却感到卡顿或弹窗警报，立即在桌面端开启 `Rule`（手机端配置分应用代理白名单绕过国内软件）。',
      '记住任何网络通道服务都存在波动周期，独立保管好永久发布页邮箱信息并避免把全部办公希望压在单一站点。',
    ],
    parentHubHref: '/resources/#beginner-roadmap',
    parentHubLabel: '返回资源专题查看新手全套入门指引总表',
    faqs: [
      {
        question: '手机在地铁 5G 下老断线，是买错机场了还是手机后台配置问题？',
        answer:
          '国产安卓系统（小米/OPPO/vivo/华为）默认在锁屏后激进杀掉后台常驻 VPN 进程，首先务必进入系统省电设置将该客户端改为「无限制允许后台运行」并在多任务卡片下拉加锁；若是切换 Wi-Fi 瞬间断流也可尝试改用支持按需连接配置或切回 TCP 伪装节点。',
      },
      {
        question: '已经下了 Clash 为什么点开关连百度都打不开？',
        answer:
          '第一确认有没有彻底导入有效订阅并选中其中延迟正常的可用节点；第二检查电脑是不是之前开启过别的代理留了残余静态设置，或者把所有网络无差别发往了一个已经失效的超期节点。',
      },
      {
        question: '月付 ¥20 的 150GB 套餐到月底只用了 30GB，剩下的下个月能滚存吗？',
        answer:
          '不能。标准包月或包年按月重置套餐到重置日都会清零上期剩余配额。只有专门标明「一次性不限时按量计费」的产品才允许余量跨月永久留存直至用完。',
      },
    ],
  },
  'resources/faq': {
    key: 'resources/faq',
    heading: '机场常见术语与计费百科速查：看懂倍率、原生 IP、专线与重置规则',
    intro:
      '机场销售面板和各类评测贴中高频出现 `IEPL`、`1x/2x 倍率`、`原生 vs 广播 IP`、`YouTube 送中`、`并发审计` 等术语。下表将最易让人产生误解或财务纠纷的概念浓缩拆解，买前花一分钟对表查清底细：',
    tableTitle: '购买与排查阶段必知的高频行业术语速查表',
    headers: ['常见专业名词', '准确技术含义', '对钱包或实际体验的真实影响', '应对及避坑重点'],
    rows: [
      {
        col1: 'IEPL / IPLC 专线 vs BGP 中转',
        col2: '跨境物理内网直通专线 vs 国内多线机房再经公网出口转发',
        col3: '专线物理避开拥堵公网国际出口，晚高峰丢包及波动显著更低',
        col4: '专线采购成本高昂，警惕极超低价却宣称全段不限速真专线',
      },
      {
        col1: '流量倍率（`0.5x / 1x / 2x`）',
        col2: '消耗 1GB 实际带宽时后台从总剩余额度里乘以多少扣除',
        col3: '连 `2x` 节点看 10GB 视频，面板直接扣掉 `20GB` 配额',
        col4: '选择常规节点写明 1 倍计费的服务，大下载优先换低倍率或直连',
      },
      {
        col1: '年付折算价 vs 真实月付价',
        col2: '把年付小包总款除以 12 当作广告标价，而非真的允许按单月购买',
        col3: '标题写 ¥5.6–8/月，结账往往要一次划走 ¥67–¥99 且不支持退款',
        col4: '站内品牌库与对比表均已强制分列标注，首试务必单月买',
      },
      {
        col1: '原生 IP vs 广播 IP / 送中',
        col2: '注册地与落地国一致叫原生；被大量手机定位拖累回国内库叫送中',
        col3: '影响 Netflix 版权剧集及部分 AI 平台风控，不代表节点网速慢',
        col4: '按 `ping0.cc` + YouTube 角落地区代码交叉核验真实解锁状态',
      },
    ],
    checkpointsTitle: '阅读任何品牌说明与购买协议时的三个核对清单',
    checkpoints: [
      '确认重置周期机制：到底是以购买日期每满 30 天重置，还是全站每月 1 号零点统一重置已用流量。',
      '查明「不限设备数」真实边界：只允许买家自己名下的电脑手机多端登录，把链接丢给宿舍大群或多人异地高并发共享一样会触发审计封停。',
      '搞清“特殊特价款排除优惠码/不支持退款”规则，例如 Firefly、闪跃、灵猫、光速云均在各自特价档中写明了折扣排除限制。',
    ],
    parentHubHref: '/resources/#glossary-guide',
    parentHubLabel: '返回资源专题查看完整术语解释与计费说明',
    faqs: [
      {
        question: '节点后面带了 `x0.2` 和 `x2` 分别代表什么意思，哪个更适合日常用？',
        answer:
          '`x1` 是按真实耗用 1:1 扣除；`x2` 用 1GB 会扣套餐 2GB（常见于成本高或稀有专线地区）；`x0.2` 仅扣 0.2GB（常用于廉价中转大下载分流）。日常优选稳定 `x1` 主力节点即可。',
      },
      {
        question: '机场后台封禁 BT/PT 下载和 25 端口发邮件是故意克扣用户自由吗？',
        answer:
          '不是克扣，而是保命防连坐规则。只要一台共用海外服务器上有一个人开了代理挂 BT 种子，上游机房收到版权方投诉函就会整机拔线冻结；在本地用 `PROCESS-NAME` 将下载软件设为 `DIRECT` 直连其实更省流量且更快。',
      },
      {
        question: '节点显示「YouTube 送中」会把我的个人 Google 账号连带封禁吗？',
        answer:
          '不会封禁个人账号。它仅表示 Google 数据库误以为该公共出口 IP 在中国境内（导致 YouTube 地区字母消失或部分内容不可见），换一条其他没送中的正常海外地区节点即可解决。',
      },
    ],
  },
  'resources/node-check': {
    key: 'resources/node-check',
    heading: '节点检测与验真教程：读懂 32 线程测速图、IP 纯净度及 AI 真解锁',
    intro:
      '测速海报上的峰值带宽动辄几百 Mbps，可自己买回家连上 ChatGPT 还是报错 Access Denied、Netflix 还是只能看自制剧。学会把「速度通道测压」「IP 纯净度检测」与「浏览器无痕实战验证」拆开评估，能瞬间看清节点的真实含金量：',
    tableTitle: '节点三大核心健康维度检测工具与及格判断标准',
    headers: ['检测目标维度', '正确实操验证手段', '需要盯紧的关键异常信号', '科学判断边界'],
    rows: [
      {
        col1: '真实下载与抗拥堵速率',
        col2: '在 20:00–23:00 晚高峰看 YouTube 4K 统计速率，对照测速图时间戳',
        col3: '仅低 RTT（<40ms）但 HTTPS 延迟飙过 600ms，或全节点出现大量 `0B/s` 红叉',
        col4: '凌晨闲时跑分与跨不同测试工具数值不能硬拿来跨品牌排榜单',
      },
      {
        col1: '出口 IP 纯净度与归属',
        col2: '无痕打开 `ping0.cc`、`ipinfo.io` 与 `scamalytics.com` 交叉查询',
        col3: '高危欺诈风险分标红、或挂名日本实际为多跳广播乱序机房 IP',
        col4: '日常看视频可用通用机房段；严格跨境电商与店铺养号才需昂贵静态原生',
      },
      {
        col1: 'AI & 流媒体真解锁验证',
        col2: '锁定非港地区无痕开 `chatgpt.com`/`claude.ai`；Netflix 搜《绝命毒师》',
        col3: 'YouTube Logo 旁地区代号消失（送中），或 Netflix 搜不到第三方版权大剧',
        col4: '单日解锁状态随风控库动态变化，建议 AI 与主力看剧节点拆开分流',
      },
      {
        col1: '本地 DNS 与 WebRTC 泄漏',
        col2: '连代理状态下访问 `ipleak.net` 与 `test-ipv6.com` 静待检测',
        col3: 'DNS 列表中出现国内电信/联通/移动本地 IP，或露出 `240e/2409` 国内 IPv6',
        col4: '泄漏往往出自未启用 Fake-IP、未关浏览器自带 DoH 或未设 `ipv6: false`',
      },
    ],
    checkpointsTitle: '提高 AI 账号与测速验货准确度的三条实用做法',
    checkpoints: [
      '不要拿到新账号就开着 32 线程狂刷几十 GB 测速打榜，这不仅烧掉大量有效配额，还会触犯部分品牌限流阈值；直接跑晚高峰 4K 流媒体观察稳定性更接地气。',
      'Claude 对机房 IP 与 IP 跳跃极其敏感，必须配置 Clash 专用规则将其锁定在验证干净的单一美国或日本固定节点上，严禁设为自动延迟轮询切换。',
      '当遇到机场标称解锁但浏览器打不开时，先清除旧 Cookie 开无痕窗口试一次，排除本地缓存或 WebRTC 穿透干扰。',
    ],
    parentHubHref: '/resources/#node-testing-guide',
    parentHubLabel: '返回资源专题查看测速截图规范与解锁验证全览',
    faqs: [
      {
        question: '为什么测速列表里某节点延迟显示绿色 55ms，实际打开外网却完全超时转圈？',
        answer:
          'Clash 与小火箭默认 Ping 测试有时仅反映你到国内中转入口机房的三次握手 TCP RTT；如果后段跨境隧道断联或目标服务被阻断，照样绿字打不开页面。应切换到发送 HTTPS 204 真实连接请求（URL Test）核验。',
      },
      {
        question: '同一机场的日本节点解锁脚本说全解锁，但我打开 ChatGPT 还是提示 Access Denied？',
        answer:
          '脚本仅做单次特征报文探测，而浏览器交互还会受历史报错 Cookie、本地安全 DNS 泄漏、WebRTC 暴露或当日并发人数激增影响，换无痕窗口再重切一次干净节点往往即可核实。',
      },
      {
        question: '测速图上看到某品牌有两三个 0B 超时节点，是不是证明这家已经不能用了？',
        answer:
          '不一定。大型多节点池中冷门地区或极少数维护中转机器在单次抓取快照时偶发 0B 十分常见；要结合核心常用地区（港、台、日、新、美）总体可用比例与平均下行速度来看。',
      },
    ],
  },
  'resources/risk-alerts': {
    key: 'resources/risk-alerts',
    heading: '机场跑路预警与突发性失联应急处置：止损改密与平滑迁出',
    intro:
      '面对突发线路维护、官网域名被局部屏蔽乃至极端跑路事件，盲目慌乱并在中文搜索引擎寻找所谓“最新官网入口”往往会直接坠入二次钓鱼诈骗或木马包陷阱。用下面这套客观红绿灯信号区分「常规波动」与「停摆前兆」：',
    tableTitle: '日常波动维护 vs 实质跑路前兆对照与紧急动作表',
    headers: ['观察现象类型', '疑似常规维护 / 域名屏蔽', '高度危险跑路 / 清盘信号', '立即执行对应动作'],
    rows: [
      {
        col1: '面板与官方社群动态',
        col2: '仅某一个官网后缀失联，永久发布页或通知频道几小时内发出新域',
        col3: '全渠道停更数周、用户交流群全体永久禁言、工单长期石沉大海',
        col4: '借备用节点或热点核实原始邮箱记录的官方发布页，绝不百度现搜域名',
      },
      {
        col1: '促销行为与定价动作',
        col2: '节假日偶尔发少量常规八折码或限时百元月付小活动',
        col3: '反常推出全场三折、买一年送两年、几百块终身无限且仅收不可逆转虚拟币',
        col4: '坚决拒绝为任何超过 1 年期的超低价促销充值，锁定风险上线',
      },
      {
        col1: '节点大面积超时持续期',
        col2: '局部机房遭攻击临时下线或维护，24–48 小时内陆续恢复备线',
        col3: '半数以上区域节点全红超一周无任何增量替换，官网持续 522/NXDOMAIN',
        col4: '立刻切换备用不限时订阅，并更改在失联机场复用过的所有重要网站密码',
      },
      {
        col1: '客户端提示更新异常',
        col2: '常规客户端更新提示正常可回退核实开源 GitHub Release',
        col3: '突然发公告逼用户卸载 Clash，改下未开源且报毒的新专属 `.exe` 恢复连接',
        col4: '高危收割骗局！立即拒绝安装并检查电脑是否留存可疑后台项目',
      },
    ],
    checkpointsTitle: '把停服与失联损失压缩到接近零的四项日常防线',
    checkpoints: [
      '养成注册任何机场账户均使用“互不相同的独立密码 + 开启主力邮箱两步验证”习惯，彻底防堵小站数据库泄露导致的撞库牵连。',
      '购买第一天就把官方「永久防失联发布页、通知频道地址与客服邮箱」写进本地加密备忘录，免得某天节点挂了连公告页也进不去。',
      '依靠「常规包月主站 + 百元级不过期不限时备胎订阅」接入 Clash `fallback` 策略组，即使主用站点半夜停服也不耽误正常上班上课。',
    ],
    parentHubHref: '/resources/#exit-scam-signals',
    parentHubLabel: '返回资源专题查看 6 大高危信号详细解读',
    faqs: [
      {
        question: '运营了三五年的老品牌（如 2020 年起步的品牌）是不是就肯定永远安全不会跑路？',
        answer:
          '没有任何服务能承诺绝对 100% 永不跑路。较长运营历史仅代表团队经历过更多轮风控与供应链迭代检验，相对短期新盘跑路率更低，但依然建议把单笔预付控制在月付至标准一年以内。',
      },
      {
        question: '主力机场节点突然全部挂了且官网进不去，连 Telegram 公告都打不开怎么破局？',
        answer:
          '先花几十元备一条完全不同上游且不过期的不限时小流量包在客户端作为冷备；失联瞬间切到备用包就能立刻恢复外网去查看真实公告与备份迁移。',
      },
      {
        question: '百度搜原来用的某知名机场名弹出来的“官方最新迁移网址”可以点吗？',
        answer:
          '绝大多数属于诈骗团伙花钱抢占品牌词拦截老用户的李鬼站（经常诱导重新付几十块“迁移激活费”或下载捆绑木马软件）。只认准自己最初官方渠道备份的发布入口。',
      },
    ],
  },
  'resources/risk-intel': {
    key: 'resources/risk-intel',
    heading: '机场品牌资料透明度与同质化结构审计情报',
    intro:
      '在对全站收录的 32 家品牌档案、官网文案、客户端形态与 2026-08-11 测速证据进行逐行交叉比对后，我们识别出当前行业内最值得新手在掏钱前高度警惕的三类信息结构性风险：',
    tableTitle: '站内品牌库审计揭露的三大透明性与结构隐患清单',
    headers: ['审计发现异常模式', '具体涉及档案分布', '反映的客观风险含义', '给用户的实操避坑态度'],
    rows: [
      {
        col1: '¥5.6/月档高度同质化文案集群',
        col2: '大佬云、闪电鼠、云界线、榴莲云、环球梯 5 家',
        col3: '套餐结构/年付折算极其雷同，云界线与环球梯链接缺标准锚点、部分缺独立测速与协议明确',
        col4: '资料完整性较低的新站或高度雷同套壳盘，绝不直接大额年付押注',
      },
      {
        col1: '单份文件前后矛盾 / 资料断档',
        col2: '如某老牌档案摘要写 59GB 而明细表写 69GB；快狸仅有测速图缺报价表',
        col3: '反映品牌长期迭代中文案未同步修订，或第三方收集清单缺完整官网核对',
        col4: '购前必须以当前登录官方结算面板最新显示流量与周期为最终准绳',
      },
      {
        col1: '完全封闭第三方通用订阅导出',
        col2: '飞猫云、SOGO 云、Firefly、闪跃、全球云、隐形人、无忧链接、灵猫网络等',
        col3: '无法使用开源 Clash Verge Rev、Shadowrocket 与软路由插件，丧失双活容灾能力',
        col4: '除非纯粹不愿学配置且只用一两台普通手机电脑，否则极客用户慎选',
      },
      {
        col1: '历史存档与近期断测品牌',
        col2: '如灵动云（07 月实测部分节点失败）、浪网、边缘节点 EdgeNova 等',
        col3: '缺乏近 30 天持续跟踪复测依据，当前实际线路可用度属未知状态',
        col4: '一律降级保持「历史存档/待核实」，先看最新口碑复测且只试最低短周期',
      },
    ],
    checkpointsTitle: '筛选高透明度品牌的三项硬指标',
    checkpoints: [
      '是否清晰拆分展示「单月付实价」与「年付折算均价」，且不靠模糊文字诱导误点全年不退特价包。',
      '是否同时具备开源第三方订阅导出支持（或自研+通用双轨）以及可验证的运营时间起点与多期历史观测快照。',
      '面对不同宽带兼容性不回避缺点限制（例如清楚说明部分协议需切节点、不适用促销码与不提供免费试用），比满屏吹嘘“全能满分”的服务更值得信任。',
    ],
    parentHubHref: '/reviews/brand-data-transparency-audit/',
    parentHubLabel: '阅读 31 家机场品牌资料透明度审计全文报告',
    faqs: [
      {
        question: '为什么站点收录了资料不完整的“快狸”或“EdgeNova”等品牌却不直接把它们删掉？',
        answer:
          '保留这些已出现在本地实测包或行业参考清单中的档案并如实标记为「仅有测速缺价目（快狸）」或「历史存档（EdgeNova）」，能够帮搜到该品牌名的用户第一时间看清公开证据缺口，避免盲目听信外部营销帖踩坑。',
      },
      {
        question: '为什么不少机场都写“仅限专属客户端”？是不是所有专属 App 都不安全？',
        answer:
          '并非所有专属客户端都是恶意软件。大型成熟品牌自研客户端有防范订阅爬虫与降低小白上手难度的客观商业动机；只是因为其闭源不可审计且剥夺了双活备用和软路由灵活度，站内有必要如实提示两者的权衡。',
      },
      {
        question: '发现两个不同名字的品牌不仅价格分毫未差、连优惠说明和页面介绍结构都一模一样是怎么回事？',
        answer:
          '业界俗称多品牌马甲盘或共享同一后端上游面板的衍生站。遇到此类高度雷同矩阵时，千万不要误以为同时买了这两家就能起到异构容灾防跑路作用——因为它们很可能跑在同一套底层服务器上。',
      },
    ],
  },
  'resources/subscription-issues': {
    key: 'resources/subscription-issues',
    heading: '订阅异常处置全攻略：更新失败报错 403/SSL 与流量异常暴涨抓凶',
    intro:
      '客户端提示订阅更新失败（`failed to fetch` / `403 Forbidden`）或刚充完的百 GB 流量几天内离奇蒸发，95% 都可以在本机 Clash 面板的“更新方式切换”“连接流量降序抓现行”以及官网后台“一键重置订阅 Token”中 5 分钟自愈：',
    tableTitle: '两类高频订阅异常（拉取报错 vs 流量偷跑）诊断矩阵',
    headers: ['异常报错或现象', '背后最常见原因', '第一手现场查证步骤', '彻底修复与防范措施'],
    rows: [
      {
        col1: '更新订阅提示 `failed to fetch` / 超时',
        col2: '当前官网/订阅域名直连遭屏蔽，或全节点失效下误勾选了“通过代理更新”',
        col3: '在 Profiles 右键设置检查是否勾了 Proxy 更新；尝试用手机浏览器打开链接看能否拉取',
        col4: '若官网新域名正常就换最新订阅；被直连墙了则先切备用节点后勾选“走代理更新”',
      },
      {
        col1: '更新返回 `403` / 下载出一个几百字节 HTML 文件',
        col2: '旧订阅密钥 Token 已被重置、或 User-Agent 触发防火墙 WAF 误拦截',
        col3: '用文本编辑器看下载下来的是真实 YAML proxies 还是网页拦截页源码',
        col4: '登录官方后台重新复制最新完整链接；或在订阅属性把 UA 改为常见 `clash-verge`',
      },
      {
        col1: '后台剩余流量莫名暴跌数十 GB',
        col2: 'TUN/Global 下开着迅雷/qBittorrent/百度网盘/iCloud 备份，或误用了 `2x/3x` 倍率节点',
        col3: '打开 Clash Verge Rev「连接（Connections）」按总流量降序直接抓出跑流量进程',
        col4: '将所有下载与 PCDN 进程用 `PROCESS-NAME` 写入 `DIRECT` 规则，日常选 `1x` 节点',
      },
      {
        col1: '关机整夜但后台流量依旧减少 / 多地 IP 上线',
        col2: '带 `?token=` 订阅 URL 曾在群截图暴露，或粘贴给过不安全在线转换网站',
        col3: '登录机场后台查看「最近在线 IP 数 / 设备数记录」是否出现非本人陌生城市',
        col4: '立即点后台「重置订阅链接 (Reset Token)」，并重新导入安全设备停用三方转换',
      },
    ],
    checkpointsTitle: '保护订阅链路免于被盗用与偷流量的三条铁习惯',
    checkpoints: [
      '不要因为节点一直正常就常年不关公共 Wi-Fi 下的「Allow LAN（允许局域网连接）」开关，外出咖啡馆/机场若未设端口密码极易被同网段脚本扫走白嫖。',
      '记住服务商流量计费几乎全部采取「双向累计（上行 + 下行总和）× 节点倍率」，往国外云盘传 20GB 文件挂着 `2x` 节点等同扣掉 `40GB`。',
      '需要把老格式、Base64 与多家订阅融合整理成规范 YAML，推荐本地自跑 Docker / 桌面版 `Sub-Store` 而非公网未知转换网页。',
    ],
    parentHubHref: '/resources/#subscription-and-faq',
    parentHubLabel: '返回资源专题查看订阅问题与 FAQ 全套排查指引',
    faqs: [
      {
        question: '订阅 URL 只是截图发朋友看了一眼怎么选中导入，会有盗用风险吗？',
        answer:
          '如果图里完整露出了 URL 末尾类似 `?token=xxxxxxxx` 的 16–32 位随机鉴权字符串，就等同把家门钥匙晒在公共视野下。建议立刻前往服务商后台点「重置订阅地址」作废旧链接。',
      },
      {
        question: '我的机场账号买了 150GB/月，在后台看到“重置订阅信息”按钮，点下去会把我的剩余流量清空吗？',
        answer:
          '不会。「重置订阅链接 / UUID」只会作废原来的拉取地址并重新分配一组全新密钥，你已经付款购买的周期天数与剩余未用流量额度会完好保留，只须把新链接重导回设备即可。',
      },
      {
        question: '为什么我在 Windows 上开着系统代理下国内百度网盘完全不扣机场流量，开启 TUN 模式后一晚上却烧光了半个月配额？',
        answer:
          '开启 TUN 虚拟网卡后系统底层全流量被代理引擎接管；如果百度网盘、迅雷或游戏下载器的后台进程或 P2P 连接未命中直连白名单，就会全部兜去海外节点走一圈高额计费。务必在全局扩展配置写死下载器进程 `DIRECT`！',
      },
    ],
  },
};
