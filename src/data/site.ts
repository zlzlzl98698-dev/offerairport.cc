export const SITE_CONFIG = {
  name: '机场优选',
  englishName: 'OfferAirport',
  domain: 'https://offerairport.cc',
  tagline: '中文代理客户端教程、独立评测媒体与机场套餐数据库',
  description:
    '机场优选（offerairport.cc）专注于 Clash Verge Rev、Mihomo 等代理客户端中文实操教程、独立机场与 VPN 横向评测、节点测速档案与透明套餐数据库。',
  language: 'zh-CN',
  author: '机场优选编辑部',
  email: 'editorial@offerairport.cc',
  affiliateDisclosureText:
    '含推广链接，通过链接注册可能为本站带来佣金，不影响用户支付价格。独立评测结论与商业合作优先级相互隔离，所有价格与节点状态以核实日期为准。',
  vendorDataDisclaimer:
    '标注「品牌资料显示」的参数来源于服务商公开资料或历史记录，本站不将其冒充为独立实测结果。',
  lastUpdated: '2026-11-21',
} as const;

/**
 * 搜索引擎站长平台 HTML Meta 验证槽位（未提供验证码时留空，不在源码中输出假验证码）。
 * 填写后重新运行 npm run build 即可直接静态输出到全站 <head>：
 * - google: Google Search Console (`google-site-verification`)
 * - bing: Bing Webmaster Tools (`msvalidate.01`)
 * - shenma: 神马站长平台 (`shenma-site-verification`)
 * - baidu: 百度搜索资源平台 (`baidu-site-verification`)
 */
export const SITE_VERIFICATION = {
  google: '',
  bing: '',
  shenma: '',
  baidu: '',
} as const;

export const PAGE_TYPES = {
  tutorial: {
    label: '技术教程',
    badgeClass: 'bg-blue-50 text-blue-700 border-blue-200',
    allowAutoAffiliateCta: false,
  },
  review: {
    label: '独立评测',
    badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    allowAutoAffiliateCta: true,
  },
  comparison: {
    label: '横向对比',
    badgeClass: 'bg-amber-50 text-amber-700 border-amber-200',
    allowAutoAffiliateCta: true,
  },
  commercial: {
    label: '品牌与套餐',
    badgeClass: 'bg-slate-100 text-slate-800 border-slate-300',
    allowAutoAffiliateCta: true,
  },
  topic: {
    label: '专题聚合',
    badgeClass: 'bg-sky-50 text-sky-700 border-sky-200',
    allowAutoAffiliateCta: false,
  },
} as const;
