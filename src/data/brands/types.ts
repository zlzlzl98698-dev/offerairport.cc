export type DataStatus = 'measured' | 'vendor' | 'historical' | 'partial' | 'untested';

export type UnlockStatus =
  | 'measured-yes'
  | 'measured-no'
  | 'partial-nodes'
  | 'vendor-claimed'
  | 'not-tested';

export interface BrandPlan {
  name: string;
  billingCycle: '月付' | '季付' | '半年付' | '年付' | '两年付' | '三年付' | '一次性付费';
  priceCny: number;
  trafficGb: number | null;
  trafficDisplay: string;
  trafficReset: '每月重置' | '一次性不限时' | '待核实';
  isMonthlyAmortized?: boolean;
  verifiedStatus: DataStatus;
  note?: string;
}

export interface SpeedSample {
  region: string;
  latencyMs: number | null;
  downloadMbps: number | null;
  uploadMbps?: number | null;
  packetLoss?: string;
}

export interface SpeedReport {
  testedAt: string;
  isPeakHour: boolean;
  environment: string;
  dataSource: string;
  status: DataStatus;
  screenshotPath?: string;
  samples: SpeedSample[];
  summaryNote?: string;
}

export interface StreamingItem {
  service:
    | 'ChatGPT'
    | 'Claude'
    | 'Gemini'
    | 'Netflix'
    | 'Disney+'
    | 'YouTube'
    | 'HBO Max'
    | 'TikTok'
    | 'Spotify';
  status: UnlockStatus;
  note?: string;
}

export interface BrandRecord {
  slug: string;
  name: string;
  englishName: string;
  aliases: string[];
  accentColor: string;
  logo?: string;
  cover?: string;
  officialSite: string;
  affiliateCode: string;
  promoCode?: string;
  promoNote?: string;
  sinceYear?: number;
  isPrimaryPartner?: boolean;
  dataCompleteness: 'full' | 'partial' | 'historical';
  summary: string;
  positioning: string;
  lineType: string;
  lineTags: ('IEPL' | 'IPLC' | 'BGP中转' | '原生IP' | '多线优化')[];
  protocols: string[];
  clientMode: '自研客户端 + 第三方订阅' | '仅专属客户端（无通用订阅）' | '第三方客户端订阅' | '待核实';
  supportedClients: string[];
  nodeRegions: string[];
  nodeCountLabel: string;
  deviceLimit: string;
  paymentMethods: string[];
  startingMonthlyDisplay: string;
  startingMonthlyCny: number;
  startingPriceIsAmortized: boolean;
  hasOnetimePlan: boolean;
  plans: BrandPlan[];
  speedReport?: SpeedReport;
  streamingMatrix: StreamingItem[];
  pros: string[];
  cons: string[];
  suitableFor: string[];
  riskNotes: string[];
  sources: string[];
  verifiedAt: string;
  updatedAt: string;
  discrepancyNotes?: string[];
  reviewSlug?: string;
}
