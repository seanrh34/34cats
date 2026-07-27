import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Sean Hardjanto — Product Engineer",
    short_name: "Sean Hardjanto",
    description: "Portfolio of Sean Richardson Hardjanto, product engineer in Singapore.",
    start_url: "/seanhardjanto.com/",
    display: "standalone",
    background_color: "#f2f0e9",
    theme_color: "#101813",
    icons: [{ src: "/seanhardjanto.com/34cats_svg.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
