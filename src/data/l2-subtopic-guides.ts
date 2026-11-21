import type { FAQItem } from '../utils/seo';

export interface SubtopicTableRow {
  col1: string;
  col2: string;
  col3: string;
  col4: string;
}

export interface SubtopicEnrichment {
  key: string;
  heading: string;
  intro: string;
  tableTitle: string;
  headers: [string, string, string, string];
  rows: SubtopicTableRow[];
  checkpointsTitle: string;
  checkpoints: string[];
  parentHubHref: string;
  parentHubLabel: string;
  faqs?: FAQItem[];
}

export const L2_SUBTOPIC_GUIDES: Record<string, SubtopicEnrichment> = {
  'airport/xingjiabi': {
    key: 'airport/xingjiabi',
    heading: '性价比机场真实单 GB 成本与选型对照（15–27 元月付 & 百元不限时）',
    intro:
      '判断一家服务商到底有没有性价比，不能只看推广文案里的最低数字，必须同时算清「真实单月实付价」、「每月重置流量（或永久总流量）」、「是否 1 倍扣流」以及「是否支持 Clash/小火箭通用订阅」。下表把 ¥20 档主力月付与高性价比不限时包拆分列出：',
    tableTitle: '主流高性价比档位实付成本与关键边界',
    headers: ['代表服务与档位', '实付费用 / 流量', '折合单 GB 成本', '协议与核心限制'],
    rows: [
      {
        col1: '唯兔云 · 普通版',
        col2: '¥19.9/月 · 150GB/月（限时款 ¥14.9/100GB）',
        col3: '约 ¥0.13/GB',
        col4: 'IPLC + Trojan（1 倍率不限设备，支持 Clash）；14.9 元仅节假日限时',
      },
      {
        col1: '一翻云 · 轻享版',
        col2: '¥20/月 · 150GB/月（舒享 ¥35/350GB）',
        col3: '约 ¥0.13/GB',
        col4: 'IEPL + Hy2/VLESS-Reality/SS 三协议全支持；无免费试用',
      },
      {
        col1: '二猫云 · 白猫套餐',
        col2: '¥20/月 · 130GB/月',
        col3: '约 ¥0.15/GB',
        col4: '全线 IEPL + VLESS，不限设备（自研+第三方）；Claude/Gemini 视节点定',
      },
      {
        col1: '光速云 · 极速版',
        col2: '¥25/月 · 168GB/月（2020 年老牌）',
        col3: '约 ¥0.15/GB',
        col4: 'IEPL+内网专线 12 国覆盖（自研+第三方）；ChatGPT/Gemini 需切节点',
      },
      {
        col1: '光速云 · 致敬斯诺克 147 永久',
        col2: '¥147 一次性 · 247GB 永久',
        col3: '约 ¥0.595/GB',
        col4: '低频/热备最优单价且支持 Clash；不打折且不支持退款',
      },
    ],
    checkpointsTitle: '性价比档位购前四项核查建议',
    checkpoints: [
      '每月消耗超过 40GB 时，包月 ¥19.9–¥25（¥0.13–¥0.15/GB）永远比不限时流量包（¥0.60–¥1.00/GB）更划算；不限时只适合 10GB 以内低频或双活灾备。',
      '18 元入门档（极连云 100GB / 光年梯 110GB）目前数据库缺少完整多周期表，追求体系透明可优先看 150–168GB 档。',
      '如需要使用 OpenWrt 软路由或 Clash Verge Rev 自动故障转移，务必避开「仅专属客户端」品牌。',
    ],
    parentHubHref: '/airport/#core-candidates-table',
    parentHubLabel: '返回机场推荐专题查看 10 家完整总表',
  },
  'airport/pianyi': {
    key: 'airport/pianyi',
    heading: '百元以内年付小包对比与 5.6 元同质化集群审计要点',
    intro:
      '搜索“便宜机场”时，页面最常出现 ¥5.6/月、¥7/月 或 ¥8/月 等字眼，但实际上绝大多数均要求一次性预付全年（¥67–¥99），且每只限 40–69GB 流量并排除退款。下表把具备完整档位与测速截图的年付入门款，与需要审慎看待的 5.6 元同质化集群放在同一平面核对：',
    tableTitle: '百元内低预算年付小包真实条件对照',
    headers: ['品牌 / 档位', '年付实付与月均折算', '每月流量与客户端', '审计评估与风险边界'],
    rows: [
      {
        col1: '二猫云 · 年付小包',
        col2: '¥89/年（折 ¥7.42/月）',
        col3: '60GB/月 · 自研 + 第三方',
        col4: '2023 年运营，含 08-11 截图档案，流量相对入门款更宽裕',
      },
      {
        col1: '星岛梦 · 贴心小包',
        col2: '¥96/年（折 ¥8.00/月）',
        col3: '60GB/月 · 支持第三方订阅',
        col4: '2020 年老牌运营，全线 1 倍率不限设备，附 08-11 截图',
      },
      {
        col1: '光速云 · 轻量版',
        col2: '¥99/年（折 ¥8.25/月）',
        col3: '69GB/月（摘要曾记 59GB）· 双支持',
        col4: '2020 年老牌 12 国覆盖，但明确不参与优惠码且不支持退款',
      },
      {
        col1: '飞猫云 · 学生版',
        col2: '¥84/年（折 ¥7.00/月）',
        col3: '50GB/月 · 仅专属客户端',
        col4: '登录即用免配订阅，含 08-11 截图，不适合软路由与 Clash 用户',
      },
      {
        col1: '5.6 元同质化 5 家集群',
        col2: '按 ¥5.6/月推算约 ¥67.2/年',
        col3: '60GB/月 · 均称 IEPL+VLESS',
        col4: '大佬云/闪电鼠/云界线/榴莲云/环球梯文案高度复制，缺独立测速图且云界线/环球梯链接缺 #/',
      },
    ],
    checkpointsTitle: '低预算用户防踩坑三条红线',
    checkpoints: [
      '第一家机场即使预算紧张，也不建议盲目用年付开启体验；先花 ¥20 左右按单月试跑本地宽带晚高峰质量。',
      '榴莲云在 5.6 元档资料中未明确协议类型，云界线存在两套前后不一致邀请码，均应谨慎核实。',
      '如月流量不足 10GB，购买百元级支持 Clash 的「一次性不限时包」（如 ¥99/100GB 或 ¥147/247GB）可跨一到两年使用，反比绑定单一品牌年付更稳。',
    ],
    parentHubHref: '/airport/#budget-annual-audit',
    parentHubLabel: '查看机场推荐专题年付审计全表',
  },
  'airport/wending': {
    key: 'airport/wending',
    heading: '稳健长期使用评估标准：运营年份、IEPL 架构与双活容灾组合',
    intro:
      '互联网代理环境下不存在“物理绝对零故障”的单一服务商。真正决定日常办公和学习不断线的三个底层条件是：团队运营连续度（是否历经多轮波动周期）、线路物理路径（是否具备 IEPL/IPLC 专线与多线 BGP 入口）、以及是否在客户端层面部署了主备双活切换。',
    tableTitle: '2020–2023 年运营梯队代表与容灾搭配方式',
    headers: ['稳定评估参考品牌', '运营起始与线路', '协议与客户端兼容', '双活组合建议'],
    rows: [
      {
        col1: '光速云（GuangSuYun）',
        col2: '2020 年起 · IEPL + 企业内网专线',
        col3: 'VLESS / SS · 自研 + Clash 通用订阅',
        col4: '极速版 ¥25/168GB 作主力，或 147 永久版作备用池',
      },
      {
        col1: '星岛梦（XDM）',
        col2: '2020 年起 · IEPL 专线（1 倍率）',
        col3: 'Trojan / SS · Clash / OpenClash',
        col4: '全线 1 倍率不限设备，覆盖韩与东南亚地区，适合配合多机场 Fallback',
      },
      {
        col1: '唯兔云 / 二猫云 / 微风网络',
        col2: '2023 年起 · IPLC / IEPL 专线',
        col3: 'Trojan / VLESS · 保留第三方订阅',
        col4: '可与光速云或一翻云交叉搭配，避免单一上游机房维护集体断网',
      },
    ],
    checkpointsTitle: '保持 99% 以上业务连续性的实战准则',
    checkpoints: [
      '不要把鸡蛋全放进一个篮子里：用 1 家包月（¥20–¥25）+ 1 家百元不限时包通过 Clash Fallback 自动切换，远比花三倍价格押注单一“神话级机场”可靠。',
      '优先选择支持通用第三方订阅的服务商，才能利用客户端自己的测速切换、Fake-IP 防泄漏与 AI 固定地区分流规则。',
    ],
    parentHubHref: '/airport/#ai-failover-and-risk',
    parentHubLabel: '进入机场推荐专题双活容灾章节',
  },
  'airport/paihang': {
    key: 'airport/paihang',
    heading: '测速档案科学读法：为什么拒绝用不同时间/工具硬排「总分榜」',
    intro:
      '网络质量受测试时刻（凌晨 0 点 vs 晚高峰 21 点）、测试机房后端（5Gbps MAI-TEST-BOT vs 9Gbps 喵速）以及测试协议（Shadowsocks vs VLESS）影响极大。本站坚持按原始时间戳与工具版本展示证据，不搞商业返佣驱动的伪科学排名。',
    tableTitle: '2026-08-11 实测档案代表时段与工具口径对照',
    headers: ['档案批次特征', '覆盖代表品牌', '测试工具与协议', '正确解读方式'],
    rows: [
      {
        col1: '晚高峰 / 晚间时段（21:04–22:46）',
        col2: '宇宙云（21:04）、U1S1（22:33）、极连云（22:46）',
        col3: '宇宙云为 9Gbps 喵速 VLESS；U1S1/极连云为 5Gbps MAI-TEST-BOT SS',
        col4: '抗拥堵参考价值高于午后图，但宇宙云缺少新周期完整价目待核实',
      },
      {
        col1: '傍晚与午后时段（13:55–18:57）',
        col2: '唯兔云、光速云、光年梯、速界、全球云、灵猫、SOGO 云',
        col3: 'MAI-TEST-BOT 2.0.0-dev（珠海联通 5Gbps）',
        col4: '可对比同工具下节点覆盖数量与 0B 失效情况，不可当晚高峰保底速率',
      },
      {
        col1: '凌晨与早间时段（00:21–10:45）',
        col2: '一翻云、星岛梦、飞猫云、二猫云',
        col3: 'MAI-TEST-BOT 2.0.0-dev',
        col4: '仅能反映节点连通与上限吞吐，晚高峰稳定性需首月自测验收',
      },
    ],
    checkpointsTitle: '阅读各品牌档案测速面板的三个关键动作',
    checkpoints: [
      '展开 `/brands/{slug}/` 中的原始测速图，重点数一数 0B 超时节点的数量与 HTTPS 真实延迟分布。',
      '注意核对清单正文中的 2026-10-19 非晚高峰速率表与 08-11 截图工具记录之间的协议演变标注。',
    ],
    parentHubHref: '/airport/#pricing-and-metrics',
    parentHubLabel: '查看机场推荐专题测速原理详述',
  },
  'clash/verge-download': {
    key: 'clash/verge-download',
    heading: 'Clash Verge Rev 官方安全下载与各系统架构核对矩阵',
    intro:
      '原版 Clash for Windows 已于 2023 年 11 月停更并下线仓库。下载桌面主力替代客户端 Clash Verge Rev 时，必须认准开源 GitHub Releases 官方发布页，切勿点击搜索引擎竞价排名的“中文官网”或网盘下载器。',
    tableTitle: '全桌面平台安装包架构后缀与校验命令速查',
    headers: ['操作系统', '推荐安装包文件名特征', '绝对禁止踩错点', '安装前校验动作'],
    rows: [
      {
        col1: 'Windows 10/11',
        col2: 'x64-setup.exe（主流 Intel/AMD）；arm64-setup.exe（仅高通 ARM 本）',
        col3: '切勿从百度广告下载 1MB“高速下载器”或所谓汉化修改版',
        col4: 'PowerShell 运行 Get-FileHash 核对 64 位 SHA256 哈希',
      },
      {
        col1: 'macOS',
        col2: 'aarch64.dmg（M1/M2/M3/M4）；x64.dmg（早期 Intel Mac）',
        col3: '勿混用停更的旧版 ClashX；Apple Silicon 勿下 x64 转译版',
        col4: '首次提示无法验证开发者时，在系统设置「隐私与安全性」点击仍要打开',
      },
      {
        col1: 'Linux 桌面 / 服务器',
        col2: '.deb（Ubuntu/Debian）；.rpm（Fedora）；通用 .AppImage',
        col3: '无桌面纯命令行服务器勿强装桌面版，改用 v2rayA 或纯 Mihomo 二进制',
        col4: '终端执行 sha256sum 核验；AppImage 需 chmod +x 并留意 libfuse2',
      },
    ],
    checkpointsTitle: '无代理环境新电脑怎么安全拿到第一个安装包？',
    checkpoints: [
      '避免在搜索引擎随便进陌生第三方下载站；可参考站内无梯冷启动指南与官方源码发布机制核验哈希一致性。',
      '下载完成安装前，如电脑装过停更的 Clash for Windows 且开启过服务模式，先卸载旧版服务并导出备份规则再切换。',
    ],
    parentHubHref: '/clash/#official-download',
    parentHubLabel: '返回 Clash 专题安全下载与迁移总章',
  },
  'clash/troubleshooting': {
    key: 'clash/troubleshooting',
    heading: 'Clash 高频报错快速定界：先查症状再按顺序排障',
    intro:
      '面对代理连不上、订阅更新报 403 或浏览器正常而命令行超时，胡乱重装往往毫无意义。先对照下表把你的症状分类，5 分钟内即可定位问题究竟在本地时间、端口冲突、订阅网络还是 TUN 权限：',
    tableTitle: '五大高频故障症状、日志信号与第一处理动作',
    headers: ['外在故障症状', '日志常见关键报错', '最常见真实根因', '第一优先动作'],
    rows: [
      {
        col1: '所有节点全红/绿字仍 Timeout',
        col2: 'dial tcp ... i/o timeout / x509',
        col3: '系统时间偏差超 60 秒、端口被加速器/旧代理占用或节点失效',
        col4: '同步系统网络时间，关闭其他 VPN/游戏加速器，测试换 5G 热点',
      },
      {
        col1: '订阅下载/更新失败',
        col2: '403 Forbidden / failed to fetch',
        col3: '未开代理直连域被拦截，或节点全死却开启了“通过代理更新”死循环',
        col4: '核对“使用代理更新”开关状态，修改 UA 为 clash-verge 或切换备用订阅域名',
      },
      {
        col1: '浏览器正常，git/npm/Docker 超时',
        col2: '无连接进入 Clash 连接监控面板',
        col3: '命令行与游戏进程不读取操作系统 HTTP 系统代理设置',
        col4: '先安装 Clash Verge Rev「服务模式」，再开启「TUN 虚拟网卡模式」',
      },
      {
        col1: '微软商店 / Xbox / OneDrive 无网',
        col2: 'UWP 应用网络报错',
        col3: 'Windows UWP 沙箱禁止访问本机 127.0.0.1 回环端口',
        col4: '运行客户端自带 UWP 回环豁免工具一键解除或启用 TUN 模式',
      },
      {
        col1: '导入后国内网站卡顿或泄真 IP',
        col2: 'DNS 走本地 / IPv6 直连出站',
        col3: '误开 Global 全局模式，或本地公网 IPv6 绕过代理规则直出',
        col4: '切回 Rule 规则模式，开启 Fake-IP + Sniffer 并在配置内屏蔽失效 IPv6 解析',
      },
    ],
    checkpointsTitle: '排障时务必养成打开「日志 + 连接面板」的习惯',
    checkpoints: [
      '把日志级别调到 info 或 debug，在 10 秒内就能看到流量到底有没有进内核、走的哪一条 rule 以及卡在哪一个节点域名。',
    ],
    parentHubHref: '/clash/#troubleshooting-handbook',
    parentHubLabel: '返回 Clash 专题九步排障总章',
  },
  'vpn/shouji': {
    key: 'vpn/shouji',
    heading: '手机 VPN / 移动端代理软件选型对照（iOS & Android）',
    intro:
      '手机端选客户端最容易掉入两个坑：iOS 误在系统顶部 iCloud 登录陌生共享账号导致锁机，Android 在非官方商店下载到被人接管的 NekoBox 变体或未给电池白名单导致锁屏 10 分钟断联。',
    tableTitle: 'iOS 与 Android 主流稳定客户端获取与成本对照',
    headers: ['移动客户端', '适用系统与核心', '官方获取与费用模式', '选型关键提示'],
    rows: [
      {
        col1: 'Shadowrocket（小火箭）',
        col2: 'iOS / iPadOS · 多协议兼容',
        col3: '非国区 App Store 一次性付费买断',
        col4: '兼容性最广且极省电；仅在 App Store 切换账号下载，绝不登系统设置 iCloud',
      },
      {
        col1: 'Stash',
        col2: 'iOS / iPadOS · Clash Meta 语义',
        col3: '非国区 App Store 一次性付费',
        col4: '最适合把电脑 Clash Verge Rev 的 YAML 规则与覆写直接复用到 iPhone',
      },
      {
        col1: 'Karing / Hiddify / Clash Mi / SFI',
        col2: 'iOS & Android · sing-box / Mihomo',
        col3: '免费开源（iOS 需外区商店，安卓 GitHub）',
        col4: '适合不想在 App Store 额外付费买软件的跨端轻量用户',
      },
      {
        col1: 'FlClash / CMFA / v2rayNG / SFA',
        col2: 'Android · Mihomo / Xray / sing-box',
        col3: 'GitHub Official Release 免费获取（选 arm64-v8a）',
        col4: '避免在第三方商店下旧 NekoBox 变体；装好后必须在手机设置设为“不限制后台电池”',
      },
    ],
    checkpointsTitle: '移动端省电与稳定不断流三步设置',
    checkpoints: [
      '安卓手机在最近任务给客户端加锁并关闭省电策略限制；网络环境稳定时优先选基于 TCP 的 VLESS-Reality 或 Shadowsocks，长时间少开多路 UDP 可减少发热掉电。',
      'iPhone 用户可配合“按需连接（Connect On Demand）”实现 Wi-Fi 与蜂窝 5G 无感切换重连。',
    ],
    parentHubHref: '/vpn/#mobile-vpn-guide',
    parentHubLabel: '返回 VPN 与加速器专题移动端总表',
  },
  'vpn/duibi': {
    key: 'vpn/duibi',
    heading: '加速线路与传输协议实战选型：为什么 IEPL 和协议不能搞混',
    intro:
      '如果跨境物理传输段在晚高峰已经严重拥堵（公网直连），换再高级的协议也只能抢回部分体验；反之在弱网校园网或运营商对 UDP 限速环境下，选错 TCP/UDP 协议同样会瞬间掉速。',
    tableTitle: '三类物理线路与三大现代协议适配矩阵',
    headers: ['技术要素', '代表名称', '抗拥堵 / 抗干扰特性', '实际选型建议'],
    rows: [
      {
        col1: '物理传输线路',
        col2: 'IEPL / IPLC 内网专线 vs 公网 BGP 中转 vs 直连',
        col3: '专线物理绕过公网国际出口 QoS，晚高峰抖动最小',
        col4: '月付 ¥18–¥27 已普及 IEPL/IPLC；仍需首月自测当地三网接入及超售情况',
      },
      {
        col1: '隐蔽 TCP 协议',
        col2: 'VLESS-Reality & Trojan',
        col3: 'Reality 借用真实大站 TLS 特征防探测且极省电',
        col4: '适合日常开发办公、长期挂机及屏蔽了大流量 UDP 的校园网/公司网',
      },
      {
        col1: '弱网抢速 UDP',
        col2: 'Hysteria 2（基于定制 QUIC）',
        col3: '在 5%–15% 丢包高延迟公网上依然保持可观吞吐',
        col4: '移动宽带/弱网救星；如当地运营商严厉封锁 UDP 则立刻切回 Reality',
      },
    ],
    checkpointsTitle: '同时握有多种协议（如一翻云等）的实测验证方法',
    checkpoints: [
      '不要在午后测出一条最快就删掉其他协议节点——晚 21:00 分别在家里宽带和手机 5G 下对比一次 Reality 与 Hysteria 2 的稳定度。',
    ],
    parentHubHref: '/vpn/#protocol-principles',
    parentHubLabel: '返回 VPN 专题查看协议与线路深层对照',
  },
};
