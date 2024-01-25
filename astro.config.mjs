import { defineConfig } from 'astro/config';
import vercel from "@astrojs/vercel/serverless";
import tailwind from "@astrojs/tailwind";

import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind()],
  output: 'server',
  adapter: vercel({
    analytics: true
  }),
  experimental: {
    assets: true
   },
   markdown: {
		remarkPlugins: [remarkMath],
		rehypePlugins: [rehypeKatex]
	}
});