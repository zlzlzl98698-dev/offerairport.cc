export interface ClusterDef {
  id: string;
  title: string;
  description: string;
  primaryKeyword: string;
  pageType: 'tutorial' | 'review' | 'comparison' | 'commercial' | 'topic';
  targetUrl: string;
}

export interface SubTopicItem {
  slug: string;
  title: string;
  href: string;
  description: string;
  primaryKeyword: string;
  clusters: ClusterDef[];
}

export interface MainNavItem {
  id: 'airport' | 'vpn' | 'clash' | 'resources';
  title: string;
  href: string;
  shortDesc: string;
  description: string;
  icon: 'plane' | 'shield' | 'terminal' | 'radar';
  subtopics: SubTopicItem[];
}

export const MAIN_NAVIGATION: MainNavItem[] = [
  {
    id: 'airport',
    title: '机场推荐',
    href: '/airport/',
    shortDesc: '选型指南、品牌评测、性价比排行与线路分析',
    description:
      '系统梳理 IEPL/IPLC 专线与中转机场的真实参数、套餐计费逻辑、历史实测记录与不同预算下的选型方法。',
    icon: 'plane',
    subtopics: [
      {
        slug: 'tuijian',
        title: '机场推荐',
        href: '/airport/tuijian/',
        description: '按使用场景、预算与客户端兼容性整理机场服务评估标准与代表品牌。',
        primaryKeyword: '机场推荐',
        clusters: [
          {
            id: 'airport-tuijian-guide',
            title: '2026 机场推荐与选型方法论',
            description: '从线路协议、计费透明度、客服与退款规则拆解如何挑机场。',
            primaryKeyword: '2026机场推荐',
            pageType: 'review',
            targetUrl: '/reviews/2026-airport-selection-methodology/',
          },
          {
            id: 'airport-tuijian-ai',
            title: 'AI 办公与开发场景机场选择',
            description: '面向 ChatGPT、Claude、Gemini 等工具的节点与原生 IP 考量。',
            primaryKeyword: 'AI专用机场推荐',
            pageType: 'comparison',
            targetUrl: '/comparisons/ai-friendly-airports-comparison/',
          },
        ],
      },
      {
        slug: 'paihang',
        title: '机场排行',
        href: '/airport/paihang/',
        description: '基于可核实测速快照、协议清晰度与套餐透明度的独立横向比较。',
        primaryKeyword: '机场排行',
        clusters: [
          {
            id: 'airport-paihang-evidence',
            title: '基于实测档案的机场横向对比',
            description: '区分品牌宣传与实测截图，呈现延迟、速度与节点覆盖对比。',
            primaryKeyword: '机场排行榜',
            pageType: 'comparison',
            targetUrl: '/comparisons/2026-airport-speedtest-benchmark/',
          },
          {
            id: 'airport-paihang-iepl',
            title: 'IEPL 与 IPLC 专线机场对比集群',
            description: '对比主流专线机场套餐档位、倍率及并发设备限制。',
            primaryKeyword: '专线机场排行',
            pageType: 'comparison',
            targetUrl: '/comparisons/iepl-iplc-line-comparison/',
          },
        ],
      },
      {
        slug: 'xingjiabi',
        title: '性价比机场',
        href: '/airport/xingjiabi/',
        description: '分析月付 15–35 元主流档位与年付折算套餐的实际单 GB 成本。',
        primaryKeyword: '性价比机场',
        clusters: [
          {
            id: 'airport-xingjiabi-18-25',
            title: '18–25 元主流月付性价比对比',
            description: '光速云、暮光加速、飞猫云、一翻云与速界的月付套餐细算。',
            primaryKeyword: '高性价比机场推荐',
            pageType: 'comparison',
            targetUrl: '/comparisons/budget-18-25-yuan-airports/',
          },
          {
            id: 'airport-xingjiabi-onetime',
            title: '不限时流量包与按需付费集群',
            description: '梳理支持一次性不限时套餐的品牌与低频使用成本控制。',
            primaryKeyword: '不限时流量机场',
            pageType: 'review',
            targetUrl: '/reviews/onetime-traffic-airports-guide/',
          },
        ],
      },
      {
        slug: 'wending',
        title: '稳定机场',
        href: '/airport/wending/',
        description: '关注运营年限、晚高峰丢包率、多入口容灾与专线架构的稳定型选择。',
        primaryKeyword: '稳定机场',
        clusters: [
          {
            id: 'airport-wending-veteran',
            title: '老牌运营与多入口架构分析',
            description: '考察 2020 年起运营品牌及晚高峰 BGP/IEPL 抗波动机制。',
            primaryKeyword: '稳定机场推荐',
            pageType: 'review',
            targetUrl: '/reviews/guangsuyun-deep-review/',
          },
          {
            id: 'airport-wending-backup',
            title: '主力机场 + 备用订阅双活策略',
            description: '如何通过 Clash 故障转移策略组实现断流无感切换。',
            primaryKeyword: '稳定科学上网方案',
            pageType: 'tutorial',
            targetUrl: '/guides/multi-airport-failover-strategy/',
          },
        ],
      },
      {
        slug: 'pianyi',
        title: '便宜机场',
        href: '/airport/pianyi/',
        description: '辨别年付折算月均价与真实月付价，避开低价超售与短期跑路风险。',
        primaryKeyword: '便宜机场',
        clusters: [
          {
            id: 'airport-pianyi-56',
            title: '5.6–8 元年付入门档位对比与风险',
            description: '实事求是解析年付小包限制、低价陷阱与适用人群。',
            primaryKeyword: '便宜机场推荐',
            pageType: 'comparison',
            targetUrl: '/comparisons/cheap-annual-airports-audit/',
          },
          {
            id: 'airport-pianyi-student',
            title: '轻量查资料与学生预算配置指南',
            description: '60GB/月内轻量需求如何避免为闲置流量付费。',
            primaryKeyword: '学生党便宜机场',
            pageType: 'review',
            targetUrl: '/reviews/lightweight-budget-airports/',
          },
        ],
      },
      {
        slug: 'mianfei-tizi',
        title: '免费梯子',
        href: '/airport/mianfei-tizi/',
        description: '客观说明免费梯子的隐私边界、限速规律以及安全替代方案。',
        primaryKeyword: '免费梯子',
        clusters: [
          {
            id: 'airport-mianfei-risk',
            title: '免费梯子安全审计与隐私风险说明',
            description: '为什么大部分免费节点存在日志监控、广告注入与高断流率。',
            primaryKeyword: '免费梯子安全吗',
            pageType: 'tutorial',
            targetUrl: '/guides/free-proxy-security-risks/',
          },
          {
            id: 'airport-mianfei-alt',
            title: '低成本合规替代与试用注意事项',
            description: '应急查资料时如何评估低门槛月付或开源自建。',
            primaryKeyword: '免费科学上网替代',
            pageType: 'tutorial',
            targetUrl: '/guides/low-cost-vs-free-proxy/',
          },
        ],
      },
      {
        slug: 'kexue-shangwang',
        title: '科学上网',
        href: '/airport/kexue-shangwang/',
        description: '从原理、协议演进到合规使用边界的零基础中文知识普及。',
        primaryKeyword: '科学上网',
        clusters: [
          {
            id: 'airport-kxsw-basics',
            title: '代理协议与传输链路入门原理',
            description: '讲清 Shadowsocks、VLESS、Trojan、Hysteria2 与 IEPL 的本质区别。',
            primaryKeyword: '科学上网原理教程',
            pageType: 'tutorial',
            targetUrl: '/guides/proxy-protocols-explained/',
          },
          {
            id: 'airport-kxsw-clients',
            title: '全平台科学上网客户端选型矩阵',
            description: 'Windows、macOS、iOS、Android 与 Linux 通用客户端对照表。',
            primaryKeyword: '科学上网客户端',
            pageType: 'tutorial',
            targetUrl: '/guides/cross-platform-proxy-clients/',
          },
        ],
      },
    ],
  },
  {
    id: 'vpn',
    title: 'VPN 与加速器',
    href: '/vpn/',
    shortDesc: 'VPN 协议差异、移动端应用评测与跨境加速对比',
    description:
      '系统区分传统商业 VPN、游戏加速器与机场代理工具在协议特征、抗干扰能力、分流粒度与跨区解锁上的差异。',
    icon: 'shield',
    subtopics: [
      {
        slug: 'tuijian',
        title: 'VPN 推荐',
        href: '/vpn/tuijian/',
        description: '解析传统 VPN 在跨境网络环境下的真实可用性与替代考量。',
        primaryKeyword: 'VPN 推荐',
        clusters: [
          {
            id: 'vpn-tuijian-vs',
            title: '传统 VPN 与规则代理机场对比指南',
            description: 'WireGuard/OpenVPN 与 VLESS/Mihomo 分流场景如何选择。',
            primaryKeyword: 'VPN和机场区别',
            pageType: 'comparison',
            targetUrl: '/comparisons/vpn-vs-airport-proxy/',
          },
          {
            id: 'vpn-tuijian-scenarios',
            title: '远程办公与海外合规访问场景指南',
            description: '企业级组网、外贸办公与常规跨境访问的协议匹配。',
            primaryKeyword: '办公VPN推荐',
            pageType: 'review',
            targetUrl: '/reviews/remote-work-vpn-vs-proxy/',
          },
        ],
      },
      {
        slug: 'mianfei',
        title: '免费 VPN',
        href: '/vpn/mianfei/',
        description: '梳理常见免费 VPN 的流量限制、隐私条款与潜在安全隐患。',
        primaryKeyword: '免费 VPN',
        clusters: [
          {
            id: 'vpn-mianfei-audit',
            title: '免费 VPN 隐私政策与商业模式拆解',
            description: '没有免费午餐的网络带宽背后：日志收集与带宽限速机制。',
            primaryKeyword: '免费VPN有哪些坑',
            pageType: 'tutorial',
            targetUrl: '/guides/free-vpn-privacy-audit/',
          },
          {
            id: 'vpn-mianfei-emergency',
            title: '临时应急下载客户端的安全步骤',
            description: '首次配置代理软件时如何安全获取 GitHub 官方安装包。',
            primaryKeyword: '应急免费VPN',
            pageType: 'tutorial',
            targetUrl: '/guides/safe-client-download-without-vpn/',
          },
        ],
      },
      {
        slug: 'shouji',
        title: '手机 VPN',
        href: '/vpn/shouji/',
        description: '覆盖 Android 与 iOS（Shadowrocket、Stash、FlClash、v2rayNG）安装指引。',
        primaryKeyword: '手机 VPN',
        clusters: [
          {
            id: 'vpn-shouji-ios',
            title: 'iPhone / iPad 代理客户端配置全攻略',
            description: 'Shadowrocket、Stash、Quantumult X 与 Karing 差异与选择。',
            primaryKeyword: 'iOS代理客户端',
            pageType: 'tutorial',
            targetUrl: '/guides/ios-proxy-clients-guide/',
          },
          {
            id: 'vpn-shouji-android',
            title: 'Android 安卓端客户端选型与省电优化',
            description: 'v2rayNG、FlClash、Clash Meta for Android 与 Hiddify 实操。',
            primaryKeyword: '安卓VPN客户端',
            pageType: 'tutorial',
            targetUrl: '/guides/android-proxy-clients-guide/',
          },
        ],
      },
      {
        slug: 'pingce',
        title: 'VPN 软件评测',
        href: '/vpn/pingce/',
        description: '从内核性能、内存占用、DNS 防泄漏与规则引擎深度评测主流客户端软件。',
        primaryKeyword: 'VPN 软件评测',
        clusters: [
          {
            id: 'vpn-pingce-desktop',
            title: '桌面端代理软件性能与规则引擎评测',
            description: 'Clash Verge Rev、FlClash、v2rayN 与 Hiddify 实测对比。',
            primaryKeyword: '代理软件评测',
            pageType: 'comparison',
            targetUrl: '/comparisons/desktop-proxy-clients-benchmark/',
          },
          {
            id: 'vpn-pingce-ios',
            title: 'iOS 付费与免费代理软件横评',
            description: '对比 App Store 价格、规则兼容性与内存稳定性。',
            primaryKeyword: 'iOS代理软件评测',
            pageType: 'review',
            targetUrl: '/reviews/ios-proxy-apps-review/',
          },
        ],
      },
      {
        slug: 'jiasuqi',
        title: 'VPN 加速器',
        href: '/vpn/jiasuqi/',
        description: '解析网络加速器在游戏联机、流媒体与海外 AI 工具访问中的不同原理。',
        primaryKeyword: 'VPN 加速器',
        clusters: [
          {
            id: 'vpn-jiasuqi-routing',
            title: '游戏加速器与全流量代理的路由区别',
            description: '为什么普通游戏加速器无法代理浏览器与 ChatGPT。',
            primaryKeyword: '加速器与VPN区别',
            pageType: 'tutorial',
            targetUrl: '/guides/game-booster-vs-proxy/',
          },
          {
            id: 'vpn-jiasuqi-udp',
            title: 'UDP 转发、FullCone NAT 与游戏联机设置',
            description: 'Clash TUN 模式与 UDP 开启对联机延迟与 NAT 类型的影响。',
            primaryKeyword: '代理UDP设置',
            pageType: 'tutorial',
            targetUrl: '/clash/tun-mode-udp-guide/',
          },
        ],
      },
      {
        slug: 'duibi',
        title: '加速器对比',
        href: '/vpn/duibi/',
        description: '对比不同线路类型（BGP 中转 vs IEPL 专线 vs 直连）在晚高峰的丢包差异。',
        primaryKeyword: '加速器对比',
        clusters: [
          {
            id: 'vpn-duibi-lines',
            title: 'IEPL、IPLC 与公网中转线路技术对比',
            description: '从物理路径、QoS 抗干扰与价格结构看专线到底值不值得买。',
            primaryKeyword: 'IEPL与中转对比',
            pageType: 'comparison',
            targetUrl: '/comparisons/iepl-vs-bgp-transit/',
          },
          {
            id: 'vpn-duibi-protocols',
            title: 'VLESS Reality、Trojan 与 Hysteria2 对比',
            description: '弱网环境、高延迟链路与高带宽场景的协议选择依据。',
            primaryKeyword: '代理协议对比',
            pageType: 'comparison',
            targetUrl: '/comparisons/vless-trojan-hysteria2-comparison/',
          },
        ],
      },
      {
        slug: 'haoyong',
        title: '好用的 VPN',
        href: '/vpn/haoyong/',
        description: '以易用性、少折腾与跨端体验为核心标准的工具与服务筛选。',
        primaryKeyword: '好用的 VPN',
        clusters: [
          {
            id: 'vpn-haoyong-beginner',
            title: '零配置门槛客户端与专属客户端对比',
            description: '专属客户端登录即用 vs 通用客户端订阅导入的利弊分析。',
            primaryKeyword: '好用不折腾的代理',
            pageType: 'comparison',
            targetUrl: '/comparisons/custom-app-vs-universal-client/',
          },
          {
            id: 'vpn-haoyong-macos',
            title: 'macOS Apple Silicon 代理工具推荐与配置',
            description: 'M 系列芯片原生支持、系统代理与增强模式稳定性实测。',
            primaryKeyword: 'Mac好用VPN工具',
            pageType: 'tutorial',
            targetUrl: '/guides/macos-proxy-clients-guide/',
          },
        ],
      },
    ],
  },
  {
    id: 'clash',
    title: 'Clash 客户端',
    href: '/clash/',
    shortDesc: 'Clash Verge Rev 官方下载、订阅配置、TUN 模式与排障手册',
    description:
      '全站核心技术教程阵地：涵盖 Clash Verge Rev、Mihomo 内核、v2rayN、FlClash 等通用客户端的安装、订阅、DNS、TUN 模式与报错排查。',
    icon: 'terminal',
    subtopics: [
      {
        slug: 'tuijian',
        title: 'Clash 推荐',
        href: '/clash/tuijian/',
        description: '按 Windows、macOS、Linux、Android、OpenWrt 梳理仍在维护的 Clash 系客户端。',
        primaryKeyword: 'Clash 推荐',
        clusters: [
          {
            id: 'clash-tuijian-matrix',
            title: '2026 活跃维护的 Clash 系客户端清单',
            description: 'Clash Verge Rev、FlClash、Clash Nyanpasu 与 OpenClash 选型指南。',
            primaryKeyword: 'Clash客户端推荐',
            pageType: 'tutorial',
            targetUrl: '/clash/active-clash-clients-2026/',
          },
          {
            id: 'clash-tuijian-legacy',
            title: '停更旧版客户端迁移到 Mihomo 指南',
            description: '如何从已停止维护的 Clash for Windows 安全迁移配置与规则。',
            primaryKeyword: 'Clash迁移教程',
            pageType: 'tutorial',
            targetUrl: '/clash/migrate-from-cfw-to-verge/',
          },
        ],
      },
      {
        slug: 'verge',
        title: 'Clash Verge',
        href: '/clash/verge/',
        description: 'Clash Verge Rev 核心架构、Mihomo 内核特性、界面功能与进阶配置说明。',
        primaryKeyword: 'Clash Verge',
        clusters: [
          {
            id: 'clash-verge-overview',
            title: 'Clash Verge Rev 完整指南与核心功能解析',
            description: '全面理解 Mihomo 内核、系统代理、TUN 虚拟网卡与覆写脚本。',
            primaryKeyword: 'Clash Verge Rev教程',
            pageType: 'tutorial',
            targetUrl: '/clash/verge-complete-guide/',
          },
          {
            id: 'clash-verge-rules',
            title: 'Clash Verge 分流规则与策略组编写入门',
            description: '实现国内直连、海外代理、AI 工具专用节点与广告屏蔽。',
            primaryKeyword: 'Clash Verge分流规则',
            pageType: 'tutorial',
            targetUrl: '/clash/verge-rules-and-proxy-groups/',
          },
        ],
      },
      {
        slug: 'verge-download',
        title: 'Clash Verge 下载',
        href: '/clash/verge-download/',
        description: '核实 GitHub 官方发布渠道、校验安装包哈希与区分架构版本，远离山寨钓鱼包。',
        primaryKeyword: 'Clash Verge 下载',
        clusters: [
          {
            id: 'clash-verge-dl-official',
            title: 'Clash Verge Rev 官方下载与各平台安装包选择',
            description: '区分 Windows x64/arm64、macOS Intel/Apple Silicon 与 Linux 包格式。',
            primaryKeyword: 'Clash Verge Rev官方下载',
            pageType: 'tutorial',
            targetUrl: '/clash/verge-official-download-guide/',
          },
          {
            id: 'clash-verge-dl-verify',
            title: '安装包安全校验与防钓鱼指南',
            description: '如何识别仿冒官网并校验 SHA256 防止恶意客户端植入。',
            primaryKeyword: 'Clash Verge防钓鱼下载',
            pageType: 'tutorial',
            targetUrl: '/clash/verify-client-checksum/',
          },
        ],
      },
      {
        slug: 'verge-subscribe',
        title: 'Clash Verge 订阅',
        href: '/clash/verge-subscribe/',
        description: '一键导入、手动粘贴 URL、自动更新间隔与 Sub-Store/覆写转换方法。',
        primaryKeyword: 'Clash Verge 订阅',
        clusters: [
          {
            id: 'clash-verge-sub-import',
            title: 'Clash Verge 订阅导入与自动更新设置教程',
            description: '手把手演示新建配置、更新订阅、查看剩余流量与到期时间。',
            primaryKeyword: 'Clash Verge订阅导入',
            pageType: 'tutorial',
            targetUrl: '/clash/verge-subscription-import-guide/',
          },
          {
            id: 'clash-verge-sub-convert',
            title: '通用订阅与 Clash YAML 格式不兼容解决方法',
            description: '当机场提供 V2Ray/Base64 链接时如何安全转换为 Clash 配置。',
            primaryKeyword: 'Clash订阅格式转换',
            pageType: 'tutorial',
            targetUrl: '/clash/subscription-format-conversion/',
          },
        ],
      },
      {
        slug: 'meta',
        title: 'Clash Meta',
        href: '/clash/meta/',
        description: '深入理解 Mihomo（原 Clash.Meta）内核支持的 VLESS、Hysteria2、TUIC 与嗅探机制。',
        primaryKeyword: 'Clash Meta',
        clusters: [
          {
            id: 'clash-meta-mihomo',
            title: 'Mihomo (Clash Meta) 内核特性与协议支持清单',
            description: '解析 VLESS-Reality、Hysteria2、Sniffer 域名嗅探与 Fake-IP。',
            primaryKeyword: 'Mihomo内核配置',
            pageType: 'tutorial',
            targetUrl: '/clash/mihomo-core-features-guide/',
          },
          {
            id: 'clash-meta-dns',
            title: 'Clash Meta DNS 防泄漏与 Fake-IP / Redir-Host 详解',
            description: '解决国内站点解析慢、海外域名污染与 WebRTC/DNS 泄漏问题。',
            primaryKeyword: 'Clash DNS配置教程',
            pageType: 'tutorial',
            targetUrl: '/clash/dns-fakeip-configuration-guide/',
          },
        ],
      },
      {
        slug: 'tutorials',
        title: 'Clash 使用教程',
        href: '/clash/tutorials/',
        description: '系统代理、全局模式、TUN 模式、局域网共享与软路由 OpenClash 实战操作。',
        primaryKeyword: 'Clash 使用教程',
        clusters: [
          {
            id: 'clash-tut-tun',
            title: 'Clash Verge TUN 模式开启教程与终端代理配置',
            description: '让游戏、命令行终端、Docker 与不支持系统代理的应用走代理。',
            primaryKeyword: 'Clash TUN模式教程',
            pageType: 'tutorial',
            targetUrl: '/clash/tun-mode-udp-guide/',
          },
          {
            id: 'clash-tut-modes',
            title: '规则模式、全局模式与直连模式切换实战',
            description: '什么时候切全局，为什么日常强烈建议保持 Rule 规则模式。',
            primaryKeyword: 'Clash规则模式和全局模式',
            pageType: 'tutorial',
            targetUrl: '/clash/rule-vs-global-mode/',
          },
        ],
      },
      {
        slug: 'troubleshooting',
        title: 'Clash 故障排查',
        href: '/clash/troubleshooting/',
        description: '针对节点超时、订阅更新失败、开启代理后无法上网等高频故障的诊断清单。',
        primaryKeyword: 'Clash 故障排查',
        clusters: [
          {
            id: 'clash-fix-timeout',
            title: 'Clash 节点全部 Timeout 超时排查九步法',
            description: '从系统时间校准、本地端口冲突、TUN 权限到节点失效逐层定位。',
            primaryKeyword: 'Clash节点超时怎么办',
            pageType: 'tutorial',
            targetUrl: '/clash/fix-node-timeout-errors/',
          },
          {
            id: 'clash-fix-sub',
            title: 'Clash Verge 订阅下载/更新失败报错解决大全',
            description: '排查 TLS 证书错误、机场域名被墙、UA 被拦截与代理死循环。',
            primaryKeyword: 'Clash订阅更新失败',
            pageType: 'tutorial',
            targetUrl: '/clash/fix-subscription-update-failed/',
          },
        ],
      },
    ],
  },
  {
    id: 'resources',
    title: '资源与情报',
    href: '/resources/',
    shortDesc: '跑路预警、节点检测工具、订阅异常处置与新手百科',
    description:
      '汇总行业风险情报、跑路预警识别信号、节点测速与流媒体检测方法、订阅故障百科及新手基础问答。',
    icon: 'radar',
    subtopics: [
      {
        slug: 'free-nodes',
        title: '免费节点',
        href: '/resources/free-nodes/',
        description: '剖析公开免费节点池的安全性、存活规律与合规测试使用建议。',
        primaryKeyword: '免费节点',
        clusters: [
          {
            id: 'res-free-nodes-truth',
            title: '公开免费节点的来源、寿命与安全边界',
            description: '理解公共订阅节点为什么极易失效，以及绝对不能用于敏感账号。',
            primaryKeyword: '免费节点安全吗',
            pageType: 'tutorial',
            targetUrl: '/resources/free-nodes-security-guide/',
          },
          {
            id: 'res-free-nodes-test',
            title: '免费节点可用性检测与本地验证方式',
            description: '如何在隔离环境中检查公共节点的延迟、TLS 与出口归属。',
            primaryKeyword: '免费节点怎么测速',
            pageType: 'tutorial',
            targetUrl: '/resources/how-to-test-nodes/',
          },
        ],
      },
      {
        slug: 'risk-alerts',
        title: '跑路预警',
        href: '/resources/risk-alerts/',
        description: '识别低价超长年付、官网失联、工单停摆与域名频繁变更等机场跑路前兆。',
        primaryKeyword: '跑路预警',
        clusters: [
          {
            id: 'res-risk-signals',
            title: '机场跑路前兆清单与资金风险控制原则',
            description: '为什么不建议新品牌一上来买两年/三年付，以及 6 大异常信号。',
            primaryKeyword: '机场跑路预警信号',
            pageType: 'tutorial',
            targetUrl: '/resources/airport-exit-scam-warning-signs/',
          },
          {
            id: 'res-risk-recovery',
            title: '主力机场失联或被攻击时的应急处置',
            description: '保留备用订阅、查找官方发布页与避免下载不明替代客户端。',
            primaryKeyword: '机场失联怎么办',
            pageType: 'tutorial',
            targetUrl: '/resources/airport-outage-recovery/',
          },
        ],
      },
      {
        slug: 'faq',
        title: '机场 FAQ',
        href: '/resources/faq/',
        description: '高频概念解答：什么是流量倍率、设备数限制、原生 IP、IPLC 与专线。',
        primaryKeyword: '机场 FAQ',
        clusters: [
          {
            id: 'res-faq-terms',
            title: '机场术语百科：倍率、原生IP、IEPL 与审计规则',
            description: '一文读懂商家宣传页中所有专业缩写与计费陷阱。',
            primaryKeyword: '机场术语解释',
            pageType: 'tutorial',
            targetUrl: '/resources/airport-glossary-faq/',
          },
          {
            id: 'res-faq-billing',
            title: '年付折算价、重置日与退款规则常见问答',
            description: '为什么「8元/月」往往需要一次性年付 96 元，以及流量的计算方式。',
            primaryKeyword: '机场套餐常见问题',
            pageType: 'tutorial',
            targetUrl: '/resources/airport-billing-faq/',
          },
        ],
      },
      {
        slug: 'risk-intel',
        title: '机场风险情报',
        href: '/resources/risk-intel/',
        description: '追踪品牌资料缺口、同系品牌关联、专属客户端封闭性及合规披露审计。',
        primaryKeyword: '机场风险情报',
        clusters: [
          {
            id: 'res-intel-audit',
            title: '31 个机场品牌资料审计与同质化特征分析',
            description: '揭秘 5.6 元档同规格品牌、联盟链接格式差异与品牌信息透明度。',
            primaryKeyword: '机场品牌资料审计',
            pageType: 'review',
            targetUrl: '/reviews/brand-data-transparency-audit/',
          },
          {
            id: 'res-intel-privacy',
            title: '专属客户端与第三方订阅的隐私权衡',
            description: '封闭闭源专属客户端与开源 Clash/sing-box 客户端在权限与审计上的差异。',
            primaryKeyword: '专属客户端安全吗',
            pageType: 'tutorial',
            targetUrl: '/resources/proprietary-client-risks/',
          },
        ],
      },
      {
        slug: 'node-check',
        title: '节点检测',
        href: '/resources/node-check/',
        description: '延迟测试、下载测速、IP 纯净度检测、Netflix/ChatGPT 解锁验证方法。',
        primaryKeyword: '节点检测',
        clusters: [
          {
            id: 'res-check-speed',
            title: '科学解读节点测速图：RTT、HTTPS 延迟与带宽曲线',
            description: '看懂 MAI-TEST-BOT 测速报告，理解单次测速快照的局限性。',
            primaryKeyword: '节点测速怎么看',
            pageType: 'tutorial',
            targetUrl: '/resources/how-to-test-nodes/',
          },
          {
            id: 'res-check-unlock',
            title: 'IP 纯净度与 AI / 流媒体解锁检测教程',
            description: '使用 RegionRestrictionCheck 与浏览器检测 ChatGPT、Claude 与 Netflix。',
            primaryKeyword: '流媒体解锁检测',
            pageType: 'tutorial',
            targetUrl: '/resources/ip-purity-and-unlock-check/',
          },
        ],
      },
      {
        slug: 'subscription-issues',
        title: '订阅问题',
        href: '/resources/subscription-issues/',
        description: '处理订阅链接泄漏、流量异常消耗、端口被封与客户端无法解析配置问题。',
        primaryKeyword: '订阅问题',
        clusters: [
          {
            id: 'res-sub-leak',
            title: '订阅流量莫名暴涨或疑似泄漏如何排查与重置',
            description: '重置订阅 Token、检查局域网共享开关与本地 BT/P2P 流量规则。',
            primaryKeyword: '机场流量消耗异常',
            pageType: 'tutorial',
            targetUrl: '/resources/subscription-traffic-leak-fix/',
          },
          {
            id: 'res-sub-convert',
            title: '订阅转换安全指南与本地规则覆写',
            description: '为什么不要把敏感订阅链接随意粘贴进不可信的在线转换后端。',
            primaryKeyword: '订阅转换安全吗',
            pageType: 'tutorial',
            targetUrl: '/clash/subscription-format-conversion/',
          },
        ],
      },
      {
        slug: 'beginner-help',
        title: '新手帮助',
        href: '/resources/beginner-help/',
        description: '从零开始的学习路径：先装客户端还是先选服务、手机和电脑如何共用账号。',
        primaryKeyword: '新手帮助',
        clusters: [
          {
            id: 'res-help-start',
            title: '零基础入门路线图：从下载安装到稳定访问',
            description: '4 步理清客户端、订阅链接、节点测速与规则分流的核心概念。',
            primaryKeyword: '机场新手入门教程',
            pageType: 'tutorial',
            targetUrl: '/guides/beginner-onboarding-roadmap/',
          },
          {
            id: 'res-help-browser',
            title: '开启代理后浏览器无法访问与证书错误修复',
            description: '解决 Windows 代理残余设置、Chrome 扩展冲突与系统代理切换失败。',
            primaryKeyword: '开代理上不了网',
            pageType: 'tutorial',
            targetUrl: '/clash/fix-node-timeout-errors/',
          },
        ],
      },
    ],
  },
];

export function getNavHub(id: MainNavItem['id']): MainNavItem {
  const hub = MAIN_NAVIGATION.find((n) => n.id === id);
  if (!hub) throw new Error(`Missing nav hub: ${id}`);
  return hub;
}

export function getAllSubtopics() {
  return MAIN_NAVIGATION.flatMap((hub) =>
    hub.subtopics.map((sub) => ({
      ...sub,
      hubId: hub.id,
      hubTitle: hub.title,
      hubHref: hub.href,
    }))
  );
}
