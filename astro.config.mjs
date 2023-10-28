import { defineConfig, squooshImageService } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  // compressHTML: false,
  site: 'https://www.canena.de',
  integrations: [mdx(), sitemap(), tailwind({
    applyBaseStyles: false
  })],
  image: {
    service: squooshImageService(),
  },
  redirects: {
    "/home": "/",
    "/tags/bem": "/tags#bem",
    "/tags/cicd": "/tags#cicd",
    "/tags/code-crypt": "/tags#code-crypt",
    "/tags/docker": "/tags#docker",
    "/tags/elm": "/tags#elm",
    "/tags/gaming": "/tags#gaming",
    "/tags/html": "/tags#html",
    "/tags/javascript": "/tags#javascript",
    "/tags/learning": "/tags#learning",
    "/tags/legacy-code": "/tags#legacy-code",
    "/tags/life": "/tags#life",
    "/tags/music": "/tags#music",
    "/tags/self-improvement": "/tags#self-improvement",
    "/tags/tech": "/tags#tech",
    "/tags/web": "/tags#web",
    "/tags/writing": "/tags#writing",
  },
});
