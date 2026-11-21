import { PRIMARY_BRANDS } from './tier-primary';
import { SECONDARY_BRANDS } from './tier-secondary';
import type { BrandRecord } from './types';

export * from './types';
export * from './links';

/**
 * 经本地清单去重与审计后的全部 32 家独立品牌档案（PRIMARY 16 家 + SECONDARY 16 家 = 32 家）
 * 说明：文字清单《32家机场品牌清单.txt》去重后实含 31 家（主清单 28 家 + 文末历史存档 3 家：灵动云、浪网、边缘节点 EdgeNova）；
 * 另《2026-08-11 测速实测资料包》与图标库收录「快狸」，已作为第 32 家「仅含实测截图·缺失价格待核实」透明归档，不虚构任何套餐或链接。
 */
export const ALL_BRANDS: BrandRecord[] = [...PRIMARY_BRANDS, ...SECONDARY_BRANDS];

export function getBrandBySlug(slug: string): BrandRecord | undefined {
  return ALL_BRANDS.find((b) => b.slug === slug);
}

export function getFeaturedBrands(): BrandRecord[] {
  return ALL_BRANDS.filter((b) => b.dataCompleteness === 'full').slice(0, 6);
}
