import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { basePath, siteUrl } from "./data";
import "./styles.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Sean Hardjanto — Forward-Deployed Product Engineer",
    template: "%s · Sean Hardjanto",
  },
  description:
    "Sean Richardson Hardjanto is a Singapore-based product engineer building useful web products across customer needs, software, data, and deployment.",
  keywords: [
    "Sean Hardjanto",
    "Sean Richardson Hardjanto",
    "forward deployed engineer Singapore",
    "product engineer Singapore",
    "full stack developer Singapore",
    "NUS computer science",
  ],
  authors: [{ name: "Sean Richardson Hardjanto", url: siteUrl }],
  creator: "Sean Richardson Hardjanto",
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    url: "/",
    title: "Sean Hardjanto — Forward-Deployed Product Engineer",
    description:
      "I work where customer problems meet product, software, and deployment.",
    siteName: "Sean Hardjanto",
    images: [
      {
        url: "/images/sean_photo_resized.jpg",
        width: 1200,
        height: 1200,
        alt: "Sean Richardson Hardjanto",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sean Hardjanto — Forward-Deployed Product Engineer",
    description:
      "I work where customer problems meet product, software, and deployment.",
    images: ["/images/sean_photo_resized.jpg"],
  },
  robots: { index: true, follow: true },
  icons: { icon: `${basePath}/34cats_svg.svg` },
};

export const viewport: Viewport = {
  themeColor: "#101813",
  colorScheme: "light",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en-SG">
      <body>{children}</body>
    </html>
  );
}
