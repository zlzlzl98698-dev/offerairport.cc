import type { FAQItem } from '../utils/seo';
import { L2_SUBTOPIC_GUIDES, type SubtopicEnrichment } from './l2-subtopic-guides';
import { EXTRA_L2_SUBTOPIC_GUIDES } from './l2-subtopic-guides-extra';

const CORE_8_DEFAULT_FAQS: Record<string, FAQItem[]> = {
  'airport/xingjiabi': [
    {
      question: '月付 20 元左右和百元不限时流量包怎么选更划算？',
      answer:
        '每月用量高于 35–40GB 时，包月 ¥19.9–¥25（约 ¥0.13–¥0.15/GB）显著划算；每月不到 10GB 或需挂双活容灾的读者更适合一次性不限时按量包（约 ¥0.60–¥1.00/GB）。',
    },
    {
      question: '为什么低价套餐里有的不限设备但仍提示不能公开合租？',
      answer:
        '「不限设备数」仅针对个人自用多终端（手机、电脑、平板），若在后台检测到跨省市异地高并发 IP 同时在线仍会被风控拦截。',
    },
  ],
  'airport/pianyi': [
    {
      question: '写着 ¥5.6/月 或 ¥8.25/月 的套餐能花 8 块钱单买一个月试用吗？',
      answer:
        '绝大多数不能。此类标价系年付轻量小包（¥67.2–¥99/年）除以 12 折算出的月均参考价，下单时仍需一次预付全年款且大多不退。',
    },
    {
      question: '¥5.6/月 档几家品牌文案看起来几乎一样，该如何评估风险？',
      answer:
        '在站内审计中大佬云、闪电鼠、云界线、榴莲云与环球梯结构高度雷同且缺少独立测速证据，强烈建议避开盲目多年付或直接改选透明度更高的档位测试。',
    },
  ],
  'airport/wending': [
    {
      question: '想让远程办公与 AI 访问全年不断流，只靠买一家贵机场够吗？',
      answer:
        '没有任何单家线路能绝对保障全年 0 秒维护。最稳妥的工程架构是在 Clash Verge Rev 中通过 `fallback` 策略组串联「包月主力 + 另一家不限时热备」。',
    },
    {
      question: '为什么老牌运营时间（如 2020 年起）和开源第三方订阅这么重要？',
      answer:
        '运营历经多轮波动周期说明供应链与运维连续性较强，而支持第三方 Clash/通用订阅则是你在客户端搭建自动故障转移与自定义规则的硬前提。',
    },
  ],
  'airport/paihang': [
    {
      question: '为什么同一批 2026-08-11 实测图，本站却坚决不排「全网第 1 到第 16 名」？',
      answer:
        '因为各品牌抓取时间从凌晨 00:21 跨越至晚间 22:46，且使用了 `MAI-TEST-BOT` 与喵速等不同测试后端与协议，强行排单榜在统计学上不成立。',
    },
    {
      question: '看测速图除了最高 Mbps，最该看哪两栏数据？',
      answer:
        '优先看**测试北京时间**（是否落在 20:00–23:00 晚高峰）、**`0B` 超时节点占比**以及 **HTTPS 真实响应延迟**。',
    },
  ],
  'clash/verge-download': [
    {
      question: '百度搜「Clash 下载」排第一的中文精美网站能直接下载吗？',
      answer:
        '千万别点！大量搜索引擎前排存在高仿钓鱼打包站。请认准开源仓库官方 GitHub Releases 并在安装前用 PowerShell `Get-FileHash` / `shasum -a 256` 核验 SHA256。',
    },
    {
      question: 'macOS M 芯片装了 `x64.dmg` 会怎样？',
      answer:
        '会被迫经过 Rosetta 2 转译运行，发热与掉电显著上升；Apple Silicon（M1–M4）必须下载标明 `aarch64` 或 `arm64` 的原生版 `.dmg`。',
    },
  ],
  'clash/troubleshooting': [
    {
      question: '节点延迟明明全是绿字，为什么打开谷歌仍然 Timeout？',
      answer:
        '首先核对电脑本地系统时间误差是否超过 90 秒，其次检查是否同时开启了网游加速器或公司 VPN 抢占端口、以及本地 DNS/IPv6 双栈解析冲突。',
    },
    {
      question: '浏览器翻墙正常，为什么 Git、npm 和微软商店还是不通？',
      answer:
        '命令行与 UWP 应用不走常规 HTTP 系统代理；在 Clash Verge Rev 设置中先安装「服务模式（Service Mode）」，随后开启 **TUN 模式**即可一并打通。',
    },
  ],
  'vpn/shouji': [
    {
      question: 'iPhone 下小火箭可以去网上买十块钱的共享 Apple ID 直接在系统设置登录吗？',
      answer:
        '绝对不要！在系统设置主账号页登录陌生共享 ID 会触发防盗锁死变砖风险；正确做法仅在 App Store 商店右上角头像内切换合规非国区账号，并彻底退出。',
    },
    {
      question: '安卓手机锁屏几分钟就断连，怎么保活？',
      answer:
        '必须在国产手机系统「应用耗电管理」改为无限制后台运行，并在最近任务界面下拉锁定 客户端卡片，同时用分应用代理绕过微信与国内银行软件。',
    },
  ],
  'vpn/duibi': [
    {
      question: 'IEPL 物理专线和 VLESS-Reality 协议哪个对提速更重要？',
      answer:
        '两者不在同一个层面。物理专线解决跨境干线拥堵（决定晚高峰稳不稳），而 VLESS-Reality/Trojan/Hy2 决定入网抗探测与弱网丢包容忍度；IEPL 配主流现代协议是当前最稳组合。',
    },
    {
      question: '为什么 Hysteria2 在家里飞快，在高校宿舍晚高峰却动不动归零？',
      answer:
        '校园网网关常对突发大流量 UDP (QUIC) 实施严格 QoS 限流；此时应切回基于 TCP 443 伪装的 VLESS-Reality 或确认使用支持多端口跳跃的订阅配置。',
    },
  ],
};

export function getL2SubtopicGuide(key: string): SubtopicEnrichment | undefined {
  const raw = L2_SUBTOPIC_GUIDES[key] || EXTRA_L2_SUBTOPIC_GUIDES[key];
  if (!raw) return undefined;
  if (raw.faqs && raw.faqs.length > 0) return raw;
  return {
    ...raw,
    faqs: CORE_8_DEFAULT_FAQS[key] || [],
  };
}
