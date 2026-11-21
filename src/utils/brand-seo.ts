import type { BrandRecord } from '../data/brands/types';
import type { FAQItem } from './seo';

export function buildBrandFaqs(brand: BrandRecord): FAQItem[] {
  const monthlyPlans = brand.plans.filter((p) => p.billingCycle === '月付');
  const lowestMonthly =
    monthlyPlans.length > 0
      ? monthlyPlans.reduce((min, p) => (p.priceCny < min.priceCny ? p : min), monthlyPlans[0])
      : null;

  const billingAnswer =
    brand.plans.length === 0
      ? `${brand.name} 当前在站内数据库标注的参考信息为「${brand.startingMonthlyDisplay}」，由于原始归档缺少完整分档价格表，下单前请务必前往官网核对按月购买还是需一次性预付整年。`
      : brand.startingPriceIsAmortized
        ? `请注意区分：${brand.name} 展示的最低入门参考（${brand.startingMonthlyDisplay}）属于年付折算月均价，结账时需一次性支付整年费用。${
            lowestMonthly
              ? `若仅想单月试用，当前已核实的最低真实月付方案为「${lowestMonthly.name}」（¥${lowestMonthly.priceCny}/月 · ${lowestMonthly.trafficDisplay}）。`
              : '建议优先在官网确认是否提供可单月结账的测试套餐后再下单。'
          }${brand.hasOnetimePlan ? ' 此外，该品牌还提供一次性不限时按量流量包。' : ''}`
        : `当前已核实的起步参考为「${brand.startingMonthlyDisplay}」。${
            brand.hasOnetimePlan
              ? '同时该品牌还登记有一次性不限时流量包方案，适合低频使用或充当故障转移热备。'
              : '常规周期套餐一般按月重置可用流量，不累计滚存至下一周期。'
          }${brand.promoCode ? ` 登记优惠码为 \`${brand.promoCode}\`（${brand.promoNote || '以结算页实际适用范围为准'}）。` : ''}`;

  const clientAnswer =
    brand.clientMode === '仅专属客户端（无通用订阅）'
      ? `${brand.name} 登记为「仅专属客户端（无通用订阅）」，支持列明环境（${brand.supportedClients.join(' · ')}）。意味着你无需手动导入 YAML，但也无法直接接入 Clash Verge Rev、Shadowrocket 或 OpenWrt/OpenClash 软路由。`
      : brand.clientMode === '待核实'
        ? `${brand.name} 当前的客户端接口模式在原始归档中仍标记为「待核实」（支持清单记录：${brand.supportedClients.join(' · ')}），若需搭配 Clash Verge Rev 或软路由使用，请先在官网后台核实是否发放通用订阅链接。`
        : `${brand.name} 支持「${brand.clientMode}」，常见兼容工具覆盖 ${brand.supportedClients.join(' · ')}。多设备并发规则登记为「${brand.deviceLimit}」，日常使用仍建议遵循仅个人自用、不公开分享订阅链接的原则。`;

  const unlockedServices = brand.streamingMatrix
    .filter((s) => s.status === 'measured-yes' || s.status === 'vendor-claimed')
    .map((s) => s.service);
  const failedServices = brand.streamingMatrix
    .filter((s) => s.status === 'measured-no')
    .map((s) => s.service);

  const speedAndUnlockAnswer = `${brand.name} 登记线路架构为 ${brand.lineType}，协议涵盖 ${brand.protocols.join('、')}。${
    brand.speedReport
      ? `站内保留了标注时间 \`${brand.speedReport.testedAt}\`（${brand.speedReport.environment} · ${brand.speedReport.isPeakHour ? '晚高峰窗口' : '非晚高峰样本'}）的测速证据，实际速度仍以你本地运营商接入测试为准。`
      : '站内暂未归档该品牌的独立第三方测速截图，已如实保留为待补充测试证据状态。'
  }${
    unlockedServices.length > 0
      ? ` 解锁记录显示支持或申报支持 ${unlockedServices.join('、')}。`
      : ''
  }${
    failedServices.length > 0
      ? ` 历史测试亦曾观察到 ${failedServices.join('、')} 存在失败或受限情况，AI/流媒体刚需用户建议先行单月实测。`
      : ''
  }`;

  const riskAnswer =
    brand.dataCompleteness !== 'full'
      ? `${brand.name} 目前在数据库标记为「${brand.dataCompleteness === 'historical' ? '历史存档' : '部分资料待核实'}」状态，${
          brand.discrepancyNotes?.length ? brand.discrepancyNotes.join('；') : '可能缺少完整分档或近期连续复测'
        }。强烈建议首次尝试仅选最短周期小额测试，切勿盲目大额多年付。`
      : `${brand.name}（${brand.sinceYear ? `${brand.sinceYear} 年起运营` : '运营起点待核实'}）支持付款方式包括 ${brand.paymentMethods.join('、')}。${
          brand.riskNotes.length > 0
            ? `需留意的风控与边界提示：${brand.riskNotes.join('；')}。`
            : '建议初次购买先选 1 个月周期在当地 20:00–23:00 晚高峰连续验收两三天后再决定是否续费。'
        }`;

  return [
    {
      question: `${brand.name} 真实月付价格是多少？是否有年付折算或不限时套餐？`,
      answer: billingAnswer,
    },
    {
      question: `${brand.name} 是否支持 Clash Verge Rev、小火箭与 OpenWrt 软路由？`,
      answer: clientAnswer,
    },
    {
      question: `${brand.name} 的线路协议、测速快照与 ChatGPT / 流媒体解锁情况如何？`,
      answer: speedAndUnlockAnswer,
    },
    {
      question: `购买 ${brand.name} 前最需要关注哪些限制条件与风险提示？`,
      answer: riskAnswer,
    },
  ];
}

export function computePlanUnitCostSummary(brand: BrandRecord): string[] {
  const lines: string[] = [];
  for (const plan of brand.plans) {
    if (plan.trafficGb && plan.trafficGb > 0) {
      const unit =
        plan.billingCycle === '年付'
          ? plan.priceCny / (plan.trafficGb * 12)
          : plan.billingCycle === '季付'
            ? plan.priceCny / (plan.trafficGb * 3)
            : plan.billingCycle === '半年付'
              ? plan.priceCny / (plan.trafficGb * 6)
              : plan.priceCny / plan.trafficGb;
      lines.push(
        `「${plan.name}」（${plan.billingCycle} ¥${plan.priceCny} · ${plan.trafficDisplay}）：折合有效单价约 ¥${unit.toFixed(2)}/GB（${plan.trafficReset}）。`
      );
    }
  }
  return lines;
}
