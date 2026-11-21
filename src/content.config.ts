import { z, defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';

const baseContentSchema = z.object({
  title: z.string(),
  description: z.string().max(220),
  pubDate: z.coerce.date(),
  updatedDate: z.coerce.date().optional(),
  category: z.string(),
  subtopic: z.string().optional(),
  tags: z.array(z.string()).default([]),
  cover: z.string().optional(),
  coverAlt: z.string().optional(),
  author: z.string().default('机场优选编辑部'),
  pageType: z.enum(['tutorial', 'review', 'comparison', 'commercial', 'topic']),
  searchIntent: z.enum([
    'informational',
    'investigational',
    'transactional',
    'navigational',
  ]),
  relatedSlugs: z.array(z.string()).default([]),
  brandSlugs: z.array(z.string()).default([]),
  draft: z.boolean().default(false),
  featured: z.boolean().default(false),
  pillar: z.boolean().default(false),
  sources: z.array(z.string()).default([]),
  verifiedAt: z.coerce.date().optional(),
  affiliateDisclosure: z.boolean().default(false),
  platform: z.string().optional(),
  appVersion: z.string().optional(),
  faqs: z
    .array(
      z.object({
        question: z.string(),
        answer: z.string(),
      })
    )
    .default([]),
  pros: z.array(z.string()).default([]),
  cons: z.array(z.string()).default([]),
  suitableFor: z.array(z.string()).default([]),
  notSuitableFor: z.array(z.string()).default([]),
  verdict: z.string().optional(),
  urlPath: z.string(),
});

const tutorials = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/tutorials' }),
  schema: baseContentSchema.extend({
    pageType: z.literal('tutorial'),
  }),
});

const articles = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/articles' }),
  schema: baseContentSchema,
});

const reviews = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/reviews' }),
  schema: baseContentSchema.extend({
    pageType: z.literal('review'),
  }),
});

const comparisons = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/comparisons' }),
  schema: baseContentSchema.extend({
    pageType: z.literal('comparison'),
  }),
});

const commercial = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/commercial' }),
  schema: baseContentSchema.extend({
    pageType: z.literal('commercial'),
  }),
});

const topics = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/topics' }),
  schema: baseContentSchema.extend({
    pageType: z.literal('topic'),
  }),
});

export const collections = {
  tutorials,
  articles,
  reviews,
  comparisons,
  commercial,
  topics,
};
