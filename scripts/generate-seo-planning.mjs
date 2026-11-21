import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const OUT_DIR = path.join(ROOT, 'content-planning');
fs.mkdirSync(OUT_DIR, { recursive: true });

// 1. Scan published markdown/mdx articles from src/content
function collectPublishedUrls() {
  const map = new Map();
  const contentRoot = path.join(ROOT, 'src', 'content');
  for (const col of fs.readdirSync(contentRoot)) {
    const colDir = path.join(contentRoot, col);
    if (!fs.statSync(colDir).isDirectory()) continue;
    for (const file of fs.readdirSync(colDir)) {
      if (!file.endsWith('.md') && !file.endsWith('.mdx')) continue;
      const raw = fs.readFileSync(path.join(colDir, file), 'utf8');
      const fmMatch = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
      if (!fmMatch) continue;
      const fm = fmMatch[1];
      const urlMatch = fm.match(/^urlPath:\s*["']?([^"'\r\n]+)["']?/m);
      const titleMatch = fm.match(/^title:\s*["']?([^"'\r\n]+)["']?/m);
      const typeMatch = fm.match(/^pageType:\s*["']?([^"'\r\n]+)["']?/m);
      const draftMatch = fm.match(/^draft:\s*(true|false)/m);
      if (urlMatch && (!draftMatch || draftMatch[1] !== 'true')) {
        map.set(urlMatch[1].trim(), {
          urlPath: urlMatch[1].trim(),
          title: titleMatch ? titleMatch[1].trim() : file,
          pageType: typeMatch ? typeMatch[1].trim() : 'tutorial',
          filePath: `src/content/${col}/${file}`,
        });
      }
    }
  }
  return map;
}

const publishedMap = collectPublishedUrls();

// 2. Define the 4 hubs -> 28 subtopics -> 56 clusters
const NAV_HUBS = [
  {
    id: 'airport',
    title: '机场推荐',
    href: '/airport/',
    subtopics: [
      ['tuijian', '机场推荐', '机场推荐', '2026机场推荐与选型方法论', '/reviews/2026-airport-selection-methodology/', 'AI办公与开发场景机场选择', '/comparisons/ai-friendly-airports-comparison/'],
      ['paihang', '机场排行', '机场排行', '基于实测档案的机场横向对比', '/comparisons/2026-airport-speedtest-benchmark/', 'IEPL与IPLC专线机场对比集群', '/comparisons/iepl-iplc-line-comparison/'],
      ['xingjiabi', '性价比机场', '性价比机场', '18-25元主流月付性价比对比', '/comparisons/budget-18-25-yuan-airports/', '不限时流量包与按需付费集群', '/reviews/onetime-traffic-airports-guide/'],
      ['wending', '稳定机场', '稳定机场', '老牌运营与多入口架构分析', '/reviews/guangsuyun-deep-review/', '主力机场与备用订阅双活策略', '/guides/multi-airport-failover-strategy/'],
      ['pianyi', '便宜机场', '便宜机场', '5.6-8元年付入门档位对比与风险', '/comparisons/cheap-annual-airports-audit/', '轻量查资料与学生预算配置指南', '/reviews/lightweight-budget-airports/'],
      ['mianfei-tizi', '免费梯子', '免费梯子', '免费梯子安全审计与隐私风险说明', '/guides/free-proxy-security-risks/', '低成本合规替代与试用注意事项', '/guides/low-cost-vs-free-proxy/'],
      ['kexue-shangwang', '科学上网', '科学上网', '代理协议与传输链路入门原理', '/guides/proxy-protocols-explained/', '全平台科学上网客户端选型矩阵', '/guides/cross-platform-proxy-clients/'],
    ],
  },
  {
    id: 'vpn',
    title: 'VPN 与加速器',
    href: '/vpn/',
    subtopics: [
      ['tuijian', 'VPN 推荐', 'VPN推荐', '传统VPN与规则代理机场对比指南', '/comparisons/vpn-vs-airport-proxy/', '远程办公与海外合规访问场景指南', '/reviews/remote-work-vpn-vs-proxy/'],
      ['mianfei', '免费 VPN', '免费VPN', '免费VPN隐私政策与商业模式拆解', '/guides/free-vpn-privacy-audit/', '临时应急安全获取开源客户端步骤', '/guides/safe-client-download-without-vpn/'],
      ['shouji', '手机 VPN', '手机VPN', 'iPhone与iPad代理客户端配置全攻略', '/guides/ios-proxy-clients-guide/', 'Android安卓端客户端选型与省电优化', '/guides/android-proxy-clients-guide/'],
      ['pingce', 'VPN 软件评测', 'VPN软件评测', '桌面端代理软件性能与规则引擎评测', '/comparisons/desktop-proxy-clients-benchmark/', 'iOS付费与免费代理软件横评', '/reviews/ios-proxy-apps-review/'],
      ['jiasuqi', 'VPN 加速器', 'VPN加速器', '游戏加速器与全流量代理的路由区别', '/guides/game-booster-vs-proxy/', 'UDP转发与游戏联机TUN设置', '/clash/tun-mode-udp-guide/'],
      ['duibi', '加速器对比', '加速器对比', 'IEPL、IPLC与公网中转线路技术对比', '/comparisons/iepl-vs-bgp-transit/', 'VLESS Reality、Trojan与Hysteria2对比', '/comparisons/vless-trojan-hysteria2-comparison/'],
      ['haoyong', '好用的 VPN', '好用的VPN', '零配置门槛客户端与专属客户端对比', '/comparisons/custom-app-vs-universal-client/', 'macOS Apple Silicon代理工具与配置', '/guides/macos-proxy-clients-guide/'],
    ],
  },
  {
    id: 'clash',
    title: 'Clash 客户端',
    href: '/clash/',
    subtopics: [
      ['tuijian', 'Clash 推荐', 'Clash推荐', '2026活跃维护的Clash系客户端清单', '/clash/active-clash-clients-2026/', '停更旧版客户端迁移到Mihomo指南', '/clash/migrate-from-cfw-to-verge/'],
      ['verge', 'Clash Verge', 'Clash Verge', 'Clash Verge Rev完整指南与核心功能解析', '/clash/verge-complete-guide/', 'Clash Verge分流规则与策略组编写入门', '/clash/verge-rules-and-proxy-groups/'],
      ['verge-download', 'Clash Verge 下载', 'Clash Verge下载', 'Clash Verge Rev官方下载与各平台安装包', '/clash/verge-official-download-guide/', '安装包SHA256安全校验与防钓鱼指南', '/clash/verify-client-checksum/'],
      ['verge-subscribe', 'Clash Verge 订阅', 'Clash Verge订阅', 'Clash Verge订阅导入与自动更新设置教程', '/clash/verge-subscription-import-guide/', '通用订阅与Clash YAML格式转换方法', '/clash/subscription-format-conversion/'],
      ['meta', 'Clash Meta', 'Clash Meta', 'Mihomo内核特性与协议支持清单', '/clash/mihomo-core-features-guide/', 'Clash Meta DNS防泄漏与Fake-IP详解', '/clash/dns-fakeip-configuration-guide/'],
      ['tutorials', 'Clash 使用教程', 'Clash使用教程', 'Clash Verge TUN模式开启与终端代理配置', '/clash/tun-mode-udp-guide/', '规则模式、全局模式与直连模式切换实战', '/clash/rule-vs-global-mode/'],
      ['troubleshooting', 'Clash 故障排查', 'Clash故障排查', 'Clash节点全部Timeout超时排查九步法', '/clash/fix-node-timeout-errors/', 'Clash Verge订阅更新失败报错解决大全', '/clash/fix-subscription-update-failed/'],
    ],
  },
  {
    id: 'resources',
    title: '资源与情报',
    href: '/resources/',
    subtopics: [
      ['free-nodes', '免费节点', '免费节点', '公开免费节点的来源、寿命与安全边界', '/resources/free-nodes-security-guide/', '免费节点可用性检测与本地验证方式', '/resources/how-to-test-nodes/'],
      ['risk-alerts', '跑路预警', '跑路预警', '机场跑路前兆清单与资金风险控制原则', '/resources/airport-exit-scam-warning-signs/', '主力机场失联或被攻击时的应急处置', '/resources/airport-outage-recovery/'],
      ['faq', '机场 FAQ', '机场FAQ', '机场术语百科：倍率、原生IP、IEPL与审计', '/resources/airport-glossary-faq/', '年付折算价、重置日与退款规则常见问答', '/resources/airport-billing-faq/'],
      ['risk-intel', '机场风险情报', '机场风险情报', '31个机场品牌资料审计与同质化特征分析', '/reviews/brand-data-transparency-audit/', '专属客户端与第三方订阅的隐私权衡', '/resources/proprietary-client-risks/'],
      ['node-check', '节点检测', '节点检测', '科学解读节点测速图：RTT、HTTPS与带宽', '/resources/how-to-test-nodes/', 'IP纯净度与AI/流媒体解锁检测教程', '/resources/ip-purity-and-unlock-check/'],
      ['subscription-issues', '订阅问题', '订阅问题', '订阅流量莫名暴涨或疑似泄漏排查与重置', '/resources/subscription-traffic-leak-fix/', '订阅转换安全指南与本地规则覆写', '/clash/subscription-format-conversion/'],
      ['beginner-help', '新手帮助', '新手帮助', '零基础入门路线图：从下载到稳定访问', '/guides/beginner-onboarding-roadmap/', '开启代理后无法上网与证书错误修复', '/clash/fix-node-timeout-errors/'],
    ],
  },
];

// 3. Build 56 clusters and 8 planned articles per cluster = 448 article plans (within 336-840)
const ANGLE_TEMPLATES = [
  { suffix: '完整实操指南', kwSuffix: '教程', intent: 'informational', pType: 'tutorial', prio: 'P0' },
  { suffix: '常见误区与核验清单', kwSuffix: '注意事项', intent: 'informational', pType: 'tutorial', prio: 'P1' },
  { suffix: 'Windows 与 macOS 实测细节差异', kwSuffix: '电脑端设置', intent: 'informational', pType: 'tutorial', prio: 'P1' },
  { suffix: '移动端与跨平台兼容说明', kwSuffix: '手机端', intent: 'informational', pType: 'tutorial', prio: 'P1' },
  { suffix: '进阶参数调优与稳定性对比', kwSuffix: '参数对比', intent: 'investigational', pType: 'comparison', prio: 'P2' },
  { suffix: '报错日志定位与故障排查手册', kwSuffix: '故障排查', intent: 'informational', pType: 'tutorial', prio: 'P1' },
  { suffix: '高风险场景与安全边界解读', kwSuffix: '安全风险', intent: 'informational', pType: 'tutorial', prio: 'P2' },
  { suffix: '高频长尾问答 FAQ 汇总', kwSuffix: '常见问题', intent: 'informational', pType: 'tutorial', prio: 'P2' },
];

const plannedRows = [];
const clusterRows = [];

for (const hub of NAV_HUBS) {
  for (const [subSlug, subTitle, subKw, c1Title, c1Url, c2Title, c2Url] of hub.subtopics) {
    const pairs = [
      { idx: 1, title: c1Title, url: c1Url },
      { idx: 2, title: c2Title, url: c2Url },
    ];
    for (const c of pairs) {
      const clusterId = `${hub.id}-${subSlug}-c${c.idx}`;
      clusterRows.push({
        clusterId,
        hubTitle: hub.title,
        subTitle,
        subHref: `${hub.href}${subSlug}/`,
        clusterTitle: c.title,
        pillarUrl: c.url,
        published: publishedMap.has(c.url),
      });

      const pubEntry = publishedMap.get(c.url);
      if (!plannedRows.some((r) => r.targetUrl === c.url)) {
        // Article 1 = Representative Anchor Article
        plannedRows.push({
          id: `${clusterId}-01`,
          hub: hub.title,
          subtopic: subTitle,
          cluster: c.title,
          seoTitle: pubEntry ? pubEntry.title : `${c.title}（2026完整版）`,
          slug: c.url.replace(/^\/|\/$/g, ''),
          targetUrl: c.url,
          filePath: pubEntry ? pubEntry.filePath : `src/content/articles/${clusterId}-01.md`,
          primaryKeyword: `${subKw} ${c.title.slice(0, 8)}`,
          secondaryKeywords: `${subTitle}, ${hub.title}, offerairport.cc`,
          searchIntent: pubEntry?.pageType === 'review' || pubEntry?.pageType === 'comparison' ? 'investigational' : 'informational',
          pageType: pubEntry ? pubEntry.pageType : 'tutorial',
          outline: '核心结论 -> 原理/参数说明 -> 实操步骤或证据对比 -> 常见问题 FAQ -> 参考来源',
          faq: `${c.title}最常见的限制与避坑要点是什么？`,
          relatedPage: `${hub.href}${subSlug}/`,
          internalLink: hub.href,
          priority: 'P0',
          status: pubEntry ? '已发布' : '待撰写',
        });
      }

      // Articles 2..8 = Deep Cluster Satellites (7 more = 8 total per cluster -> 56*8 = 448 articles)
      for (let k = 2; k <= 8; k++) {
        const tmpl = ANGLE_TEMPLATES[k - 1];
        const slug = `${hub.id}/${subSlug}/${clusterId}-0${k}`;
        const url = `/${slug}/`;
        plannedRows.push({
          id: `${clusterId}-0${k}`,
          hub: hub.title,
          subtopic: subTitle,
          cluster: c.title,
          seoTitle: `${c.title}：${tmpl.suffix}`,
          slug,
          targetUrl: url,
          filePath: `src/content/articles/${clusterId}-0${k}.md`,
          primaryKeyword: `${subKw} ${tmpl.kwSuffix}`,
          secondaryKeywords: `${subTitle} ${tmpl.suffix}, ${hub.title}`,
          searchIntent: tmpl.intent,
          pageType: tmpl.pType,
          outline: '问题直答 -> 场景条件 -> 细则拆解 -> 核实清单 -> 延伸链接',
          faq: `${c.title}在${tmpl.kwSuffix}方面需要注意什么？`,
          relatedPage: c.url,
          internalLink: `${hub.href}${subSlug}/`,
          priority: tmpl.prio,
          status: publishedMap.has(url) ? '已发布' : '待撰写',
        });
      }
    }
  }
}

// Add all published entries that weren't directly one of the cluster anchors (e.g. brand reviews)
for (const [url, entry] of publishedMap.entries()) {
  if (!plannedRows.some((r) => r.targetUrl === url)) {
    plannedRows.push({
      id: `pub-${plannedRows.length + 1}`,
      hub: entry.pageType === 'review' ? '独立评测' : entry.pageType === 'comparison' ? '横向对比' : '实用教程',
      subtopic: '核心扩展内容',
      cluster: entry.title,
      seoTitle: entry.title,
      slug: url.replace(/^\/|\/$/g, ''),
      targetUrl: url,
      filePath: entry.filePath,
      primaryKeyword: entry.title.slice(0, 12),
      secondaryKeywords: '机场优选, Clash Verge Rev, 独立评测',
      searchIntent: entry.pageType === 'tutorial' ? 'informational' : 'investigational',
      pageType: entry.pageType,
      outline: '摘要结论 -> 实测/步骤 -> FAQ -> 资料来源',
      faq: `${entry.title}的核心要点是什么？`,
      relatedPage: '/brands/',
      internalLink: '/',
      priority: 'P0',
      status: '已发布',
    });
  }
}

const publishedCount = plannedRows.filter((r) => r.status === '已发布').length;
const pendingCount = plannedRows.filter((r) => r.status === '待撰写').length;

// Helper for CSV escaping
const csvEsc = (v) => `"${String(v).replace(/"/g, '""')}"`;

// File 1: SEO-一级导航规划.md
fs.writeFileSync(
  path.join(OUT_DIR, 'SEO-一级导航规划.md'),
  `# SEO 一级导航规划（4 大核心栏目）

| 序号 | 一级导航 | URL | 定位与职责 | 二级专题数 |
| :--- | :--- | :--- | :--- | :--- |
${NAV_HUBS.map((h, i) => `| ${i + 1} | ${h.title} | \`${h.href}\` | 承接对应搜索意图，严格执行单站三分区隔离 | ${h.subtopics.length} |`).join('\n')}

- 说明：品牌数据库（\`/brands/\`）与优惠汇总（\`/offers/\`）通过首页、评测与关联卡片入口访问，不新增第五个主导航。
`,
  'utf8'
);

// File 2: SEO-二级专题规划.md
fs.writeFileSync(
  path.join(OUT_DIR, 'SEO-二级专题规划.md'),
  `# SEO 二级专题规划（28 个独立静态页面）

共规划并已全部上线 **28 个二级专题页面**（4 个一级专题 × 7 个二级专题），全部使用 \`TopicLayout\` 渲染并纳入 Sitemap。

| 一级导航 | 二级专题 | URL | 目标主关键词 | 状态 |
| :--- | :--- | :--- | :--- | :--- |
${NAV_HUBS.flatMap((h) => h.subtopics.map(([slug, title, kw]) => `| ${h.title} | ${title} | \`${h.href}${slug}/\` | ${kw} | 已发布 |`)).join('\n')}
`,
  'utf8'
);

// File 3: SEO-三级文章集群规划.md
fs.writeFileSync(
  path.join(OUT_DIR, 'SEO-三级文章集群规划.md'),
  `# SEO 三级文章集群规划（56 个内容集群）

每个二级专题均规划 2 个三级主题集群，合计 **${clusterRows.length} 个三级内容集群**。

| 集群 ID | 所属二级专题 | 三级集群名称 | 核心代表页 URL | 代表页状态 |
| :--- | :--- | :--- | :--- | :--- |
${clusterRows.map((c) => `| ${c.clusterId} | ${c.hubTitle} / ${c.subTitle} | ${c.clusterTitle} | \`${c.pillarUrl}\` | ${c.published ? '已发布' : '待撰写'} |`).join('\n')}
`,
  'utf8'
);

// File 4: SEO-完整文章标题库.md
fs.writeFileSync(
  path.join(OUT_DIR, 'SEO-完整文章标题库.md'),
  `# SEO 完整文章标题库（总规划 ${plannedRows.length} 篇）

> **统计校验（真实状态不虚报）**：
> - 标题库总规划数：**${plannedRows.length} 篇**（覆盖 56 个三级集群 × 每集群 8 篇规划 + 独立品牌评测扩展）
> - 当前已真实撰写并发布：**${publishedCount} 篇**
> - 当前处于规划待撰写状态（不生成空白页面）：**${pendingCount} 篇**

| ID | 一级/二级专题 | SEO 标题 | 目标 URL | 页面类型 | 优先级 | 发布状态 |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
${plannedRows.map((r) => `| ${r.id} | ${r.hub} / ${r.subtopic} | ${r.seoTitle} | \`${r.targetUrl}\` | ${r.pageType} | ${r.priority} | **${r.status}** |`).join('\n')}
`,
  'utf8'
);

// File 5: SEO-关键词映射表.csv
fs.writeFileSync(
  path.join(OUT_DIR, 'SEO-关键词映射表.csv'),
  '\uFEFF' +
    [
      ['ID', 'SEO标题', 'Slug', '目标URL', '文件路径', '主要关键词', '次级关键词', '搜索意图', '页面类型', '优先级', '状态'].map(csvEsc).join(','),
      ...plannedRows.map((r) =>
        [r.id, r.seoTitle, r.slug, r.targetUrl, r.filePath, r.primaryKeyword, r.secondaryKeywords, r.searchIntent, r.pageType, r.priority, r.status]
          .map(csvEsc)
          .join(',')
      ),
    ].join('\n'),
  'utf8'
);

// File 6: GEO-实体关系映射表.csv
const geoEntities = [
  ['光速云', 'AirportBrand', 'IEPL专线+企业内网专线', 'VLESS', '自研+第三方订阅', '/brands/guangsuyun/', '/reviews/guangsuyun-deep-review/', '2026-10-19'],
  ['暮光加速', 'AirportBrand', 'BGP智能调度+专线级出口', '待核实', '待核实', '/brands/muguang/', '/reviews/muguang-review/', '2026-10-19'],
  ['飞猫云', 'AirportBrand', '轻量加速线路', 'Shadowsocks(截图)', '仅专属客户端', '/brands/feimao/', '/reviews/feimao-review/', '2026-10-19'],
  ['微风网络', 'AirportBrand', 'IEPL专线', 'VLESS', '第三方订阅', '/brands/weifeng/', '/reviews/weifeng-review/', '2026-10-19'],
  ['星岛梦', 'AirportBrand', 'IEPL专线', 'Trojan', '第三方订阅', '/brands/xingdaomeng/', '/reviews/xingdaomeng-review/', '2026-10-19'],
  ['唯兔云', 'AirportBrand', 'IPLC专线', 'Trojan', '第三方订阅', '/brands/weitu/', '/comparisons/budget-18-25-yuan-airports/', '2026-10-19'],
  ['一翻云', 'AirportBrand', 'IEPL物理专线', 'Hysteria2/VLESS/SS', '第三方订阅', '/brands/yifan/', '/comparisons/budget-18-25-yuan-airports/', '2026-10-19'],
  ['Clash Verge Rev', 'SoftwareApplication', 'Mihomo(Clash.Meta)内核', 'SS/VLESS/Trojan/Hy2', 'Win/macOS/Linux开源客户端', '/clash/verge-complete-guide/', '/clash/verge-official-download-guide/', '2026-11-20'],
  ['Shadowrocket', 'SoftwareApplication', 'iOS规则代理内核', '全主流协议', 'iOS/iPadOS付费买断($2.99)', '/guides/ios-proxy-clients-guide/', '/reviews/ios-proxy-apps-review/', '2026-11-20'],
  ['v2rayN / FlClash', 'SoftwareApplication', 'Xray/sing-box/Mihomo', '全主流协议', 'Win/macOS/Android开源客户端', '/guides/android-proxy-clients-guide/', '/comparisons/desktop-proxy-clients-benchmark/', '2026-11-20'],
];
fs.writeFileSync(
  path.join(OUT_DIR, 'GEO-实体关系映射表.csv'),
  '\uFEFF' +
    [
      ['实体名称', '实体类型', '底层技术/定位', '核心协议', '客户端或平台形态', '规范档案URL', '关联评测或教程URL', '核实日期'].map(csvEsc).join(','),
      ...geoEntities.map((row) => row.map(csvEsc).join(',')),
    ].join('\n'),
  'utf8'
);

// File 7: GEO-长尾问题库.csv
const longTailQuestions = [
  ['Clash Verge Rev 和 Clash for Windows 有什么区别？', 'Clash Verge', 'informational', '/clash/verge-complete-guide/', '已回答'],
  ['网上中文 Clash Verge 官网下载安全吗？', 'Clash Verge 下载', 'informational', '/clash/verge-official-download-guide/', '已回答'],
  ['Clash 节点全部显示 Timeout 超时怎么办？', 'Clash 故障排查', 'informational', '/clash/fix-node-timeout-errors/', '已回答'],
  ['Clash Verge 开启后终端 git 和 npm 还是连不上怎么办？', 'TUN模式', 'informational', '/clash/tun-mode-udp-guide/', '已回答'],
  ['Fake-IP 模式下看到 198.18.x.x 是中毒了吗？', 'DNS配置', 'informational', '/clash/dns-fakeip-configuration-guide/', '已回答'],
  ['光速云 8 元一个月能单月购买吗？', '光速云', 'investigational', '/reviews/guangsuyun-deep-review/', '已回答'],
  ['光速云支持 Clash Verge Rev 吗？ChatGPT 能全部解锁吗？', '光速云', 'investigational', '/reviews/guangsuyun-deep-review/', '已回答'],
  ['为什么机场标 5.6 元/月点进去要付 67 元一年？', '机场FAQ', 'informational', '/resources/airport-billing-faq/', '已回答'],
  ['32家机场品牌清单为什么去重后是 31 家？', '机场风险情报', 'investigational', '/reviews/brand-data-transparency-audit/', '已回答'],
  ['一次性不限时流量包真的永远不会过期吗？', '不限时机场', 'investigational', '/reviews/onetime-traffic-airports-guide/', '已回答'],
  ['飞猫云和 Firefly 可以导入 Clash 或软路由吗？', '专属客户端', 'investigational', '/comparisons/custom-app-vs-universal-client/', '已回答'],
  ['如何识别机场跑路前的预警信号？', '跑路预警', 'informational', '/resources/airport-exit-scam-warning-signs/', '已回答'],
  ['为什么用香港节点打不开 ChatGPT 和 Claude？', 'AI分流', 'informational', '/clash/verge-rules-and-proxy-groups/', '已回答'],
  ['如何校验下载的 Clash 安装包有没有被二次打包植入木马？', 'SHA256校验', 'informational', '/clash/verify-client-checksum/', '已回答'],
];
fs.writeFileSync(
  path.join(OUT_DIR, 'GEO-长尾问题库.csv'),
  '\uFEFF' +
    [
      ['长尾问题', '关联实体/主题', '搜索意图', '已落地解答URL', '状态'].map(csvEsc).join(','),
      ...longTailQuestions.map((row) => row.map(csvEsc).join(',')),
    ].join('\n'),
  'utf8'
);

// File 8: SEO-内部链接矩阵.csv
const linkMatrix = [
  ['Pillar教程', '/clash/verge-complete-guide/', '/clash/verge-official-download-guide/', '下载官方版本', '教程内自然流转'],
  ['Pillar教程', '/clash/verge-complete-guide/', '/clash/verge-subscription-import-guide/', '导入订阅教程', '教程内自然流转'],
  ['Pillar教程', '/clash/verge-complete-guide/', '/clash/tun-mode-udp-guide/', '开启TUN模式', '教程内自然流转'],
  ['教程延伸', '/clash/fix-node-timeout-errors/', '/resources/airport-outage-recovery/', '机场失联应急处置', '排障延伸'],
  ['教程可选引导', '/guides/beginner-onboarding-roadmap/', '/reviews/2026-airport-selection-methodology/', '服务选型方法论', '不直接跳商业CTA'],
  ['独立评测', '/reviews/2026-airport-selection-methodology/', '/brands/', '品牌数据库筛选', '评测向数据库引流'],
  ['品牌评测', '/reviews/guangsuyun-deep-review/', '/brands/guangsuyun/', '查看光速云套餐档案', '含合作披露'],
  ['横向对比', '/comparisons/budget-18-25-yuan-airports/', '/brands/guangsuyun/', '光速云品牌详情', '含合作披露'],
  ['横向对比', '/comparisons/custom-app-vs-universal-client/', '/resources/proprietary-client-risks/', '专属客户端隐私分析', '对比关联风险教育'],
  ['品牌档案', '/brands/guangsuyun/', '/reviews/guangsuyun-deep-review/', '阅读独立深度评测', '商业向评测回链'],
];
fs.writeFileSync(
  path.join(OUT_DIR, 'SEO-内部链接矩阵.csv'),
  '\uFEFF' +
    [
      ['源页面角色', '源URL', '目标URL', '锚文本方向', '三分区合规规则'].map(csvEsc).join(','),
      ...linkMatrix.map((row) => row.map(csvEsc).join(',')),
    ].join('\n'),
  'utf8'
);

// File 9: SEO-内容发布优先级.md
fs.writeFileSync(
  path.join(OUT_DIR, 'SEO-内容发布优先级.md'),
  `# SEO 内容发布优先级（P0 → P1 → P2）

- **P0（首批已全部交付，${publishedCount} 篇）**：Clash Verge Rev 下载/安装/订阅/TUN/DNS/排障、2026 机场选型方法论、光速云深度评测、31 家品牌透明度审计、不限时流量包盘点、核心横向对比及跑路预警。
- **P1（下一阶段扩展，${plannedRows.filter((r) => r.priority === 'P1').length} 篇）**：各二级专题下的系统平台细节差异（Windows/macOS 细化）、常见报错长尾日志案例、各品牌独立深入评测。
- **P2（长尾覆盖，${plannedRows.filter((r) => r.priority === 'P2').length} 篇）**：参数调优、进阶规则脚本、多场景长尾 FAQ 与周期性测速更新记录。
`,
  'utf8'
);

// File 10: SEO-品牌评测规划.md
fs.writeFileSync(
  path.join(OUT_DIR, 'SEO-品牌评测规划.md'),
  `# SEO 品牌评测规划（32 家独立品牌档案）

- **已上线独立深度 MDX 评测页（12 家独立评测 + 1 份专项联合核查）**：光速云（\`/reviews/guangsuyun-deep-review/\`）、唯兔云（\`/reviews/weitu-review/\`）、一翻云（\`/reviews/yifan-review/\`）、二猫云（\`/reviews/ermao-review/\`）、U1S1（\`/reviews/u1s1-review/\`）、SOGO 云（\`/reviews/sogo-review/\`）、Firefly 萤火虫（\`/reviews/firefly-review/\`）、无忧链接（\`/reviews/wuyou-review/\`）、暮光加速（\`/reviews/muguang-review/\`）、飞猫云（\`/reviews/feimao-review/\`）、微风网络（\`/reviews/weifeng-review/\`）、星岛梦（\`/reviews/xingdaomeng-review/\`），以及《快狸与历史待核实品牌核查专报》（\`/reviews/kuaili-and-historical-brands-audit/\`）。
- **已上线横向对比与档案覆盖品牌**：灵猫网络、闪跃、全球云、隐形人、梯子云、极连云、光年梯、可信云、速界、大佬云、闪电鼠、云界线、榴莲云、神行加速、环球梯（全部在 \`/brands/{slug}/\` 拥有完整结构化档案，并在 18-25 元档对比、5.6 元档审计、AI 对比等文章中按维度解析）。
- **历史存档与待核实品牌**：快狸（仅存 2026-08-11 VLESS 测速截图，无价格不提供商业跳转）、宇宙云、灵动云、浪网、边缘节点 EdgeNova——全部公开标注 \`historical\` / \`partial\` 状态，绝不虚构字段。
`,
  'utf8'
);

// File 11: SEO-URL路由规划.csv
const staticRoutes = [
  ['/', 'Home', 'website', 'index', '已发布'],
  ['/airport/', 'TopicLayout', 'topic', 'index', '已发布'],
  ['/vpn/', 'TopicLayout', 'topic', 'index', '已发布'],
  ['/clash/', 'TopicLayout', 'topic', 'index', '已发布'],
  ['/resources/', 'TopicLayout', 'topic', 'index', '已发布'],
  ['/guides/', 'BaseLayout', 'topic', 'index', '已发布'],
  ['/reviews/', 'BaseLayout', 'review', 'index', '已发布'],
  ['/comparisons/', 'BaseLayout', 'comparison', 'index', '已发布'],
  ['/brands/', 'BaseLayout', 'commercial', 'index', '已发布'],
  ['/offers/', 'BaseLayout', 'commercial', 'index', '已发布'],
  ['/search/', 'BaseLayout', 'utility', 'noindex', '已发布'],
];
fs.writeFileSync(
  path.join(OUT_DIR, 'SEO-URL路由规划.csv'),
  '\uFEFF' +
    [
      ['URL路径', 'Layout/模板', '页面类型', '索引状态', '上线状态'].map(csvEsc).join(','),
      ...staticRoutes.map((r) => r.map(csvEsc).join(',')),
      ...NAV_HUBS.flatMap((h) => h.subtopics.map(([s]) => [`${h.href}${s}/`, 'TopicLayout', 'topic', 'index', '已发布'].map(csvEsc).join(','))),
      ...plannedRows.map((r) => [r.targetUrl, r.pageType, r.pageType, r.status === '已发布' ? 'index' : '未创建文件', r.status].map(csvEsc).join(',')),
    ].join('\n'),
  'utf8'
);

// File 12: 品牌数据审计报告.md
fs.writeFileSync(
  path.join(OUT_DIR, '品牌数据审计报告.md'),
  `# 品牌数据审计报告（offerairport.cc）

## 1. 品牌数量核对与去重结果
- 原始《32家机场品牌清单.txt》文件名虽为 32 家，但正文存在：编号跳过 \`#9\` 与 \`#22\`、重复出现三次 \`#7\`（二猫云、无忧链接、唯兔云），以及文末追加的「Firefly 萤火虫」与正文第 8 条 \`Firefly\` 属于同一品牌不同时期记录。
- **文字清单去重后的独立品牌数为 31 家**（主列表 28 家 + 文末历史存档 3 家：灵动云、浪网、边缘节点 EdgeNova）。
- 此外，2026-08-11 测速压缩包与 Logo 目录收录了 **「快狸（kuaili）」** 的 VLESS 测速截图（\`19:52:22 CST\`）与图标（\`kuaili_logo.png\`），但文字清单缺失其套餐价格与推广注册入口。本站已将其作为第 32 个「仅含实测证据·价格待核实」透明档案归档于 \`/brands/kuaili/\`，不虚构价格、不添加未核实外链。

## 2. 资料完整度分层（共 32 个档案）
- **完整套餐档案（16 家）**：光速云、暮光加速、飞猫云、微风网络、星岛梦、二猫云、无忧链接、唯兔云、Firefly、U1S1、灵猫网络、一翻云、SOGO 云、闪跃、全球云、隐形人。
- **部分信息待核实（13 家）**：梯子云、极连云、光年梯、可信云、速界、宇宙云、大佬云、闪电鼠、云界线、榴莲云、神行加速、环球梯、快狸（仅有测速截图，无价格/入口）。
- **历史存档品牌（3 家，2026-08-09 记录）**：灵动云、浪网、边缘节点 EdgeNova。

## 3. 已保留标注的冲突与异常
1. **光速云**：《光速云品牌信息.txt》正文首段记轻量版为 59GB，明细表记为 69GB/月；2026-08-11 测速图协议显示 Shadowsocks，品牌资料主推 VLESS。
2. **微风网络**：摘要写「约7元/月 50GB」，详细套餐表最低为清风年付 ¥137/100GB/月（折合 ¥11.42/月）。
3. **灵猫网络**：摘要写「19元/月」，详细套餐表最低月付 Small 为 ¥25；优惠码同时存在 \`lmao888\` 与 \`lingmao\`。
4. **云界线与环球梯**：推广注册 URL 缺少路由 \`#/\`；云界线正文与汇总表邀请码不一致（\`aycnwNUi\` vs \`HBaZ91c6\`）。
5. **5.6 元同质化集群**：大佬云、闪电鼠、云界线、榴莲云、环球梯规格几乎一致，其中榴莲云未标明协议。
`,
  'utf8'
);

// File 13: 数据来源及核实记录.md
fs.writeFileSync(
  path.join(OUT_DIR, '数据来源及核实记录.md'),
  `# 数据来源及核实记录

1. **《32家机场品牌清单.txt》**：核心 31 家独立品牌简介、注册链接、优惠码、套餐表及 2026-10-19 非晚高峰速率参考与流媒体标注。
2. **《光速云品牌信息.txt》**：重点推广品牌光速云详细套餐规格（含致敬斯诺克 147 永久版、轻量版、极速版、定制版）、付款方式与历史口径核对。
3. **《第三方代理客户端.txt》**：Windows、macOS、Linux、Android、iOS、OpenWrt 六大平台客户端特点、开源渠道、付费状态及 NekoBox 安全警示。
4. **《机场品牌图表样式.txt》**：Dark Network Observatory + Infrastructure Dashboard 视觉体系与系统状态语言规范。
5. **《机场测速实测资料包_2026-08-11_发布整理版_V2.zip》**：含 \`README_16个机场测速实测资料_最新版.txt\`、\`speedtest-manifest.json\` 及 16 张 1122×1402 PNG 原始测速图（已无损拷贝至 \`public/images/speedtests/\`）。
6. **《光速云测试图解锁图》**：5 张补充实测截图（已拷贝至 \`public/images/guangsuyun/\`）。
7. **《logos》目录**：已拷贝至 \`public/logos/\`，仅将名称明确对应的图标绑定至相应品牌档案，未强行匹配未知缩写图标。
`,
  'utf8'
);

console.log(`Generated 13 planning files in content-planning/. Clusters=${clusterRows.length}, TotalPlanned=${plannedRows.length}, Published=${publishedCount}, Pending=${pendingCount}`);
