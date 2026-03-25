import { defineConfig } from 'astro/config';
import vercel from "@astrojs/vercel";
import sitemap from "@astrojs/sitemap";

import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

export default defineConfig({
  site: "https://thopay.dev",
  integrations: [sitemap()],
  output: 'server',
  adapter: vercel(),
  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex]
  }
});
