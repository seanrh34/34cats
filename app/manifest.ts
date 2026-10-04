import type { MetadataRoute } from "next";
import { asset } from "./data";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Sean Hardjanto · 34cats",
    short_name: "34cats",
    description: "Portfolio of Sean Richardson Hardjanto, full-stack product engineer and NUS CS student in Singapore.",
    start_url: asset("/"),
    display: "standalone",
    background_color: "#0a0a0f",
    theme_color: "#0a0a0f",
    icons: [{ src: asset("/34cats_svg.svg"), sizes: "any", type: "image/svg+xml" }],
  };
}
