import { readFile, writeFile } from "node:fs/promises";

// Next.js collapses a root canonical to the bare origin when trailingSlash is
// off (resolveAbsoluteUrlWithPathname returns the origin for pathname "/").
// Cloudflare Pages serves the site from the domain root, so patch the home
// page canonical back to "https://<domain>/" after the static export.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const siteUrl = `https://34cats.com${basePath}`;

const file = "out/index.html";
let html = await readFile(file, "utf8");
const bare = `<link rel="canonical" href="${siteUrl}"/>`;
const rooted = `<link rel="canonical" href="${siteUrl}/"/>`;
if (html.includes(bare)) {
  html = html.replace(bare, rooted);
  await writeFile(file, html);
  console.log(`fix-canonical: patched home canonical to ${siteUrl}/`);
}
