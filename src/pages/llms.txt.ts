import type { APIRoute } from 'astro';
import { site as siteInfo, social } from '../config';

// llms.txt — a curated, Markdown index that points AI tools at the most useful
// pages. (Curation, not access control — the crawler stance lives in robots.txt.)
// Spec: https://llmstxt.org/
export const GET: APIRoute = ({ site }) => {
  const url = (path: string) => (site ? new URL(path, site).href : path);

  const body = `# ${siteInfo.name}

> ${siteInfo.description} The site has three photo galleries, two blogs (a Tech Blog and a Photo Blog), and a short biography. Content may be cited with attribution; please do not use the images or text to train machine-learning models.

## Galleries
- [Visuals](${url('/visuals')}): architecture visuals.

## Blog
- [Blog](${url('/')}): full projects.

## About
- [About](${url('/about')}): a short biography of ${siteInfo.name}.
- [Contact](${url('/contact')}): ways to follow and reach out.

## Elsewhere
- Threads: ${social.threads}
- GitHub: ${social.github}
`;

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
