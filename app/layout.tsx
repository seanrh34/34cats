import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Inter_Tight, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import { SiteChrome } from "./components/site-chrome";
import { asset, siteUrl } from "./data";
import "./styles/tokens.css";
import "./styles/base.css";
import "./styles/chrome.css";
import "./styles/sections.css";

const sans = Inter_Tight({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains", display: "swap" });

const title = "Sean Hardjanto · AI & Software Engineer";
const description =
  "Sean Richardson Hardjanto is an AI & software engineer and NUS Computer Science student in Singapore. He builds products at Guidesify.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: "%s · Sean Hardjanto",
  },
  description,
  keywords: [
    "Sean Hardjanto",
    "Sean Richardson Hardjanto",
    "34cats",
    "AI engineer Singapore",
    "software engineer Singapore",
    "NUS computer science",
    "Guidesify",
  ],
  authors: [{ name: "Sean Richardson Hardjanto", url: siteUrl }],
  creator: "Sean Richardson Hardjanto",
  alternates: { canonical: `${siteUrl}/` },
  openGraph: {
    type: "profile",
    url: "/",
    title,
    description: "AI & software engineer and NUS CS student. Proudest project: the GenAI SEO Writer at Guidesify.",
    siteName: "34cats",
    images: [
      {
        url: asset("/images/sean-main.jpg"),
        width: 1050,
        height: 1400,
        alt: "Sean Hardjanto smiling at a graduation dinner",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: "AI & software engineer & NUS CS student in Singapore.",
    images: [asset("/images/sean-main.jpg")],
  },
  robots: { index: true, follow: true },
  icons: { icon: asset("/34cats_svg.svg") },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0f" },
    { media: "(prefers-color-scheme: light)", color: "#f5f1ea" },
  ],
  colorScheme: "dark light",
};

const themeInit = `(function(){try{var t=localStorage.getItem("34cats-theme");if(t!=="light"&&t!=="dark")t="dark";document.documentElement.dataset.theme=t}catch(e){}})();`;

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html
      lang="en-SG"
      data-theme="dark"
      className={`${sans.variable} ${serif.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <body>
        <script id="theme-init" dangerouslySetInnerHTML={{ __html: themeInit }} />
        <noscript
          dangerouslySetInnerHTML={{
            __html:
              "<style>[data-reveal]{opacity:1 !important;transform:none !important;}.hero-caret{display:none !important;}</style>",
          }}
        />
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
