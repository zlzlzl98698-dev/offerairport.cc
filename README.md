<div align="center">
  <img src="public/images/og-cover.png" alt="机场优选 offerairport.cc 封面" width="760" />

  <h1>机场优选（OfferAirport.cc）</h1>

  <p>
    <strong>面向中文用户的代理客户端实操教程、独立评测媒体与透明套餐数据库</strong>
  </p>

  <p>
    <img src="https://img.shields.io/badge/Astro-5.1-BC52EE?style=flat-square&logo=astro&logoColor=white" alt="Astro 5" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
    <img src="https://img.shields.io/badge/Search-Pagefind_1.6-10B981?style=flat-square" alt="Pagefind" />
    <img src="https://img.shields.io/badge/Static_Pages-158_Pages-2563EB?style=flat-square" alt="158 Pages" />
    <img src="https://img.shields.io/badge/QA_Audit-PASS-16A34A?style=flat-square" alt="QA Pass" />
    <img src="https://img.shields.io/badge/Deploy-Cloudflare_Pages-F38020?style=flat-square&logo=cloudflare&logoColor=white" alt="Cloudflare Pages" />
  </p>

  <p>
    <a href="https://offerairport.cc/">正式站点</a> ·
    <a href="#单站三分区架构">三分区架构</a> ·
    <a href="#项目规模与核实数据">内容规模</a> ·
    <a href="#本地开发与验收">本地运行</a> ·
    <a href="#cloudflare-pages-部署配置">部署清单</a>
  </p>
</div>

---

## 项目简介

**机场优选（[`offerairport.cc`](https://offerairport.cc/)）** 是一个全静态构建（`output: 'static'`）的中文网络代理技术内容站与品牌结构化资料库，围绕 **Clash Verge Rev / Mihomo / v2rayN / OpenWrt** 配置排障、**真实测速快照归档** 与 **透明计费审计** 搭建而成。

项目拒绝黑盒榜单与模板化软文，坚持**可核实时间窗口、区分「年付折算均价」与「真实单月实付」、缺失资料如实标明「待核实」**，并以「单站三分区」作为核心内容治理准则。

---

## 单站三分区架构

全站从路由布局、Schema 类型到推广外链约束，在构建阶段即进行隔离校验（由 [`scripts/qa-audit.mjs`](scripts/qa-audit.mjs) 自动门禁拦截）：

| 分区定位 | 路由范围 | 布局组件 | 核心规则与商业隔离 |
| :--- | :--- | :--- | :--- |
| **1. 教程与知识区** | `/clash/*` · `/guides/*` · `/resources/*` | `TutorialLayout` / `TopicLayout` | **零推广红线**：强制 0 商业注册按钮、0 推广外链，专注客户端开源下载、SHA256 校验、DNS Fake-IP、TUN 与排障 |
| **2. 独立评测与横比区** | `/reviews/*` · `/comparisons/*` | `ReviewLayout` / `ComparisonLayout` | **证据优先**：先呈核心结论与限制边界，保留 `0B/s` 失效测试样本与测试时间戳，透明披露合作关系 |
| **3. 品牌档案与套餐区** | `/brands/*` · `/offers/` | `CommercialLayout` | **透明计费**：结构化读取 `src/data/brands/`，拆分月付实价与年付折算，推广链接统一强制 `rel="nofollow sponsored noopener"` |
| **4. 信任与治理中心** | `/about/` · `/methodology/` · `/disclaimer/` | `BaseLayout` | 公开单站三分区原则、珠海后端测速采样边界、更正机制（`contact@offerairport.cc`）与零跟踪隐私声明 |

---

## 项目规模与核实数据

- **构建静态产出**：**158** 个 HTML 页面（含首页、4 大一级枢纽、28 个二级子专题、83 篇三级长尾正文、32 个品牌档案、3 个 E-E-A-T 信任治理页及站内检索/404 页）
- **一级核心枢纽（4 + 1 万字级专题）**：
  - `/airport/`（机场推荐专题）
  - `/vpn/`（VPN 与加速器专题）
  - `/clash/`（Clash 客户端与排障专题）
  - `/resources/`（资源情报与新手百科）与 `/resources/free-nodes/`（免费节点专题）
- **三级集群正文（83/83 全量扩厚完成）**：
  - `src/content/tutorials/`：**51 篇**全平台客户端与排障教程（0 推广外链）
  - `src/content/reviews/`：**19 篇**独立品牌单测、方法论与透明度审计
  - `src/content/comparisons/`：**13 篇**多品牌/多协议/多内核横向对比
- **品牌数据库**：`src/data/brands/` 收录去重审计后的 **32 个**独立品牌档案，支持前端零后端实时搜索、价格/专线/客户端/不限时包多维筛选。
- **全文检索与 SEO/GEO 基础设施**：
  - Pagefind 中文全文索引：**155** 页 / **70,462** 词条（纯本地静态检索，不回传用户行为）
  - 统一 `SEOHead.astro`：唯一 Title/Description、自引用 HTTPS Canonical（404 除外）、`1200×630` 横版 `og-cover.png`、预留 `SITE_VERIFICATION`（Google / Bing / 神马 / 百度）静态验证槽位
  - 结构化数据：按页面类型精确生成 `Organization`、`WebSite`、`AboutPage`、`CollectionPage`、`ItemList`、`Article`/`BlogPosting`、`BreadcrumbList`、`Service`（`AggregateOffer`）与图文一致的 `FAQPage`

---

## 目录结构

```text
offerairport.cc/
├── astro.config.mjs              # Astro 静态输出、trailingSlash 与 @astrojs/sitemap 过滤配置
├── public/
│   ├── images/                   # 站点头像、1200×630 默认 OG 封面与实测截图素材
│   ├── logos/                    # 品牌本地图标资源
│   ├── robots.txt                # 爬虫抓取规则（放行 Googlebot/bingbot/Baiduspider/yisouspider）
│   ├── _headers                  # Cloudflare Pages 安全响应头与静态资源缓存策略
│   └── _redirects                # Cloudflare Pages 归一化重定向规则（含 /sitemap.xml -> /sitemap-index.xml）
├── scripts/
│   └── qa-audit.mjs              # 构建后全站死链、Canonical、推广 rel 属性与教程分区隔离审计
├── src/
│   ├── components/
│   │   ├── cards/                # 文章卡片与信息展示卡
│   │   ├── charts/               # Network Observatory 测速、解码与拓扑可视化组件
│   │   ├── commercial/           # 品牌价目表、优惠卡、推广披露条与跳转按钮
│   │   ├── common/               # Header、Footer、TOC、FaqAccordion（支持行内 Markdown）、SubtopicGuideSection
│   │   └── seo/                  # 统一 SEOHead.astro（Meta / OG / 验证槽位 / JSON-LD 输出）
│   ├── content/
│   │   ├── comparisons/          # 13 篇横向对比文章
│   │   ├── reviews/              # 19 篇独立深度评测
│   │   └── tutorials/            # 51 篇技术教程与排障百科
│   ├── data/
│   │   ├── brands/               # 32 家品牌统一数据源及类型定义
│   │   ├── *-hub-upgrade.ts      # 4 大一级专题与免费节点万字内容数据层
│   │   ├── l2-subtopic-*.ts      # 27 个二级子专题场景对比表与 FAQ 数据层
│   │   ├── navigation.ts         # 4 大导航 + 28 子专题拓扑定义
│   │   └── site.ts               # 站点配置、编辑披露文本与 4 大站长验证预留槽位 SITE_VERIFICATION
│   ├── layouts/                  # BaseLayout、TopicLayout、TutorialLayout、ReviewLayout、ComparisonLayout、CommercialLayout
│   ├── pages/                    # 首页、四大栏目路由、品牌库、优惠汇总、搜索页及 about/methodology/disclaimer
│   └── utils/                    # SEO Schema 生成、行内 Markdown 解析、品牌数据辅助及内容聚合工具
├── PROGRESS.md                   # 分阶段建设进度与验收记录
└── package.json
```

---

## 本地开发与验收

### 1. 环境准备

- **Node.js**：建议 `v20+`（或 `v22+`）
- **包管理器**：`npm`

### 2. 常用命令

```bash
# 安装依赖
npm install

# 启动本地开发服务器
npm run dev

# 运行 Astro 与 TypeScript 全量诊断检查
npm run check

# 构建静态站点 (dist/) 并自动生成 Pagefind 中文全文检索索引
npm run build

# 在本地预览完整生产构建结果 (默认 http://localhost:4321)
npm run preview

# 运行自动化上线 QA 审计脚本
npm run qa
```

### 3. 站长平台验证码接入方式

获取 Google Search Console、Bing Webmaster Tools、神马站长平台或百度搜索资源平台验证码后，直接编辑 [`src/data/site.ts`](src/data/site.ts) 中的 `SITE_VERIFICATION` 对象并重新运行 `npm run build` 即可静态注入全站 `<head>`（未填入时不会生成多余空标签）。

---

## Cloudflare Pages 部署配置

| 配置项 | 推荐值 |
| :--- | :--- |
| **Framework preset** | `Astro` |
| **Production branch** | `main` |
| **Root directory** | `/` |
| **Build command** | `npm run build` |
| **Build output directory** | `dist` |
| **Custom domain** | `offerairport.cc` |

**上线后控制台核查建议**：
1. 若为 `www.offerairport.cc` 配置了 DNS，请在 Cloudflare **Redirect Rules** 设置 `https://www.offerairport.cc/*` 永久 `301` 重定向至 `https://offerairport.cc/$1`。
2. 确保 WAF / Bot Fight Mode 未对 `Googlebot`、`bingbot`、`Baiduspider`、`yisouspider` 返回 JS Challenge 或 `403`/`429`。

---

## 内容与安全边界声明

- 本项目所载网络工具配置与服务档案仅供**技术学习、开源软件核验、学术资料检索与跨境业务合规参照**。
- 站内所有测速快照均严格受限于标注的测试时间、测试工具与测试端带宽，不代表全地区全天候绝对速率保证。
