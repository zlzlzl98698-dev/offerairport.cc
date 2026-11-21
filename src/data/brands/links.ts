/**
 * 统一品牌推广注册链接表（全站唯一出口，禁止在 Markdown/MDX 中硬编码推广地址）
 * 所有外部注册链接输出时必须附带 target="_blank" rel="nofollow sponsored noopener"
 */
export interface BrandAffiliateEntry {
  slug: string;
  name: string;
  registerUrl: string;
  promoCode?: string;
  promoDiscountNote?: string;
  linkAnomalyNote?: string;
}

export const BRAND_AFFILIATE_LINKS: Record<string, BrandAffiliateEntry> = {
  guangsuyun: {
    slug: 'guangsuyun',
    name: '光速云',
    registerUrl: 'https://sahude.gsyvipaff.com/#/?code=keqgvT5Y',
    promoCode: 'AMM',
    promoDiscountNote: '新人优惠券（部分特价套餐不打折）',
  },
  muguang: {
    slug: 'muguang',
    name: '暮光加速',
    registerUrl: 'https://varnexa.twilightaff.com/#/?code=D1LHglg3',
    promoCode: 'muguang5555',
  },
  feimao: {
    slug: 'feimao',
    name: '飞猫云',
    registerUrl: 'https://guangs.flycataff.com/#/?code=6uq0Xe9y',
    promoCode: 'flycat888',
  },
  weifeng: {
    slug: 'weifeng',
    name: '微风网络',
    registerUrl: 'https://edp01.breezenetaff.com/#/?code=t3huofyI',
    promoCode: 'flat888',
  },
  dalaoyun: {
    slug: 'dalaoyun',
    name: '大佬云',
    registerUrl: 'https://qwerty.dalaoyunaff.com/#/?code=jCPLmoWN',
    promoCode: 'dly888',
    promoDiscountNote: '季付及以上 7 折（品牌资料标注）',
  },
  xingdaomeng: {
    slug: 'xingdaomeng',
    name: '星岛梦',
    registerUrl: 'https://guangs.xingdaomeng.com/#/?code=1TynBYnR',
    promoCode: 'nmw888',
  },
  ermao: {
    slug: 'ermao',
    name: '二猫云',
    registerUrl: 'https://guangs.2maoyunaff.cc/#/?code=7mjvgGbW',
    promoCode: 'ermao5555',
  },
  wuyou: {
    slug: 'wuyou',
    name: '无忧链接',
    registerUrl: 'https://wep01.worryfreeaff.com/#/?code=4ZoSbLdL',
    promoCode: 'wuyou666',
  },
  weitu: {
    slug: 'weitu',
    name: '唯兔云',
    registerUrl: 'https://guangs.v2yunvipaff.com/#/?code=xIutqOBA',
    promoCode: 'weitu666',
  },
  firefly: {
    slug: 'firefly',
    name: 'Firefly 萤火虫',
    registerUrl: 'https://vip02.fireflyaff.com/#/?code=2n7VURre',
    promoCode: 'firefly',
    promoDiscountNote: '新用户 8 折（年付版不适用）；历史记录另有 code=jTp9wSgZ',
  },
  yuzhou: {
    slug: 'yuzhou',
    name: '宇宙云',
    registerUrl: 'https://wzjc.yuzoucloud.cc/#/?code=yrThwMP1',
    promoCode: 'YUZHOU553',
    promoDiscountNote: '历史资料称新用户 8 折（待核实）',
  },
  u1s1: {
    slug: 'u1s1',
    name: 'U1S1',
    registerUrl: 'https://guangs.vipaff.cc/#/?code=xhX5X22f',
    promoCode: 'akaka',
  },
  lingmao: {
    slug: 'lingmao',
    name: '灵猫网络',
    registerUrl: 'https://vip01.civetnet.com/#/?code=8MIAyxak',
    promoCode: 'lmao888',
    promoDiscountNote: '正文另记载 lingmao 为 8 折（年付小包不适用），下单前请核实',
  },
  jilian: {
    slug: 'jilian',
    name: '极连云',
    registerUrl: 'https://guangs.jlyvipaff.com/#/?code=VM1rKGUu',
    promoCode: 'ji8888',
  },
  guangnian: {
    slug: 'guangnian',
    name: '光年梯',
    registerUrl: 'https://guangs.gntaff.com/#/?code=X1FoxjGE',
    promoCode: 'gnt6666',
  },
  yifan: {
    slug: 'yifan',
    name: '一翻云',
    registerUrl: 'https://guangs.1flyunaff.cc/#/register?code=Yr7FhB7r',
    promoCode: 'yfy6666',
    promoDiscountNote: '正文另记载 1FLYYUN 可打 9 折',
  },
  sogo: {
    slug: 'sogo',
    name: 'SOGO 云',
    registerUrl: 'https://guangs.sogoyunaff.cc/#/?code=327Vs0w7',
    promoCode: 'SOGO10000',
    promoDiscountNote: '9 折（总表另记 sss777，下单前请核对）',
  },
  kexin: {
    slug: 'kexin',
    name: '可信云',
    registerUrl: 'https://guangs.kosingaff.com/#/register?code=UYDtNlCY',
    promoCode: 'kkk333',
  },
  sujie: {
    slug: 'sujie',
    name: '速界',
    registerUrl: 'https://guangs.speedworldaff.cc/#/register?code=xgXzEfZB',
    promoCode: 'sss1111',
  },
  shanyue: {
    slug: 'shanyue',
    name: '闪跃',
    registerUrl: 'https://vip02.flashleapaff.com/#/?code=3lgzm9mm',
    promoCode: 'shanyue',
    promoDiscountNote: '8 折（仅限月付周期档，年付版不适用）',
  },
  quanqiu: {
    slug: 'quanqiu',
    name: '全球云',
    registerUrl: 'https://guangs.gcvipaff.com/#/?code=Ov2nvU9C',
    promoCode: 'qq88',
    promoDiscountNote: '8 折（总表另记 qqy7777）',
  },
  shandianshu: {
    slug: 'shandianshu',
    name: '闪电鼠',
    registerUrl: 'https://qwerty.shandianshuaff.com/#/?code=rUE75iYh',
    promoCode: 'sd88',
    promoDiscountNote: '季付及以上 7 折（品牌资料标注）',
  },
  yunjiexian: {
    slug: 'yunjiexian',
    name: '云界线',
    registerUrl: 'https://qwerty.yunjiexianaff.com/?code=aycnwNUi',
    promoCode: 'yjx888',
    promoDiscountNote: '季付及以上 7 折（品牌资料标注）',
    linkAnomalyNote: '该链接缺少路由 # 符号，且汇总表曾出现另一邀请码 HBaZ91c6，访问前请确认页面可用。',
  },
  liulianyun: {
    slug: 'liulianyun',
    name: '榴莲云',
    registerUrl: 'https://qwerty.liulianyunaff.com#/?code=hS5pvbfE',
    promoCode: 'll88',
    promoDiscountNote: '季付及以上 7 折（品牌资料标注）',
  },
  shenxing: {
    slug: 'shenxing',
    name: '神行加速',
    registerUrl: 'https://qwerty.shenxingaff.com/#/?code=gawDQqVE',
    promoCode: 'xs0077',
    promoDiscountNote: '新用户 7 折（品牌资料标注）',
  },
  huanqiuti: {
    slug: 'huanqiuti',
    name: '环球梯',
    registerUrl: 'https://qwerty.huanqiutiaff.com/?code=9I4KRNPH',
    promoCode: 'HQ66',
    promoDiscountNote: '季付及以上 7 折（品牌资料标注）',
    linkAnomalyNote: '该链接缺少路由 # 符号，访问前请确认域名正常解析。',
  },
  yinxingren: {
    slug: 'yinxingren',
    name: '隐形人',
    registerUrl: 'https://yinxingren1.invisibleaff.com/#/?code=kcyEeoJT',
    promoCode: 'yxr888',
    promoDiscountNote: '正文另记 moon80 为 8 折',
  },
  tiziyun: {
    slug: 'tiziyun',
    name: '梯子云',
    registerUrl: 'https://tiziyun3.ladderaff.com/#/?code=7EmnpHs0',
    promoCode: 'tiziyun',
  },
  lingdongyun: {
    slug: 'lingdongyun',
    name: '灵动云',
    registerUrl: 'https://varnexa.lingdongaff.com/#/?code=wZvEhEoI',
    linkAnomalyNote: '历史记录（2026-08-09），不保证当前入口有效，优惠码待核实。',
  },
  langwang: {
    slug: 'langwang',
    name: '浪网',
    registerUrl: 'https://varnexa.wavenetaff.com/#/?code=xwAM4tTd',
    linkAnomalyNote: '历史记录（2026-08-09），不保证当前入口有效，优惠码待核实。',
  },
  edgenova: {
    slug: 'edgenova',
    name: '边缘节点 EdgeNova',
    registerUrl: 'https://work.edgenovaaff.cc/#/register?code=cl3iB5YG',
    promoCode: 'TH888',
    promoDiscountNote: '历史记录标注 8 折（2026-08-09）',
    linkAnomalyNote: '历史记录（2026-08-09），不保证当前入口有效。',
  },
};

export function getBrandAffiliate(slug: string): BrandAffiliateEntry | undefined {
  return BRAND_AFFILIATE_LINKS[slug];
}
