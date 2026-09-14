import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    const slugs = [
      "angle-pro",
      "vistakiosk",
      "adpole",
      "edgeplay",
      "adzoview",
      "brandlite",
      "rackpro",
      "luma",
      "nexa",
      "shelfscape",
      "edgevue",
      "fleet-iq",
      "classroom-pro",
      "boardroom-elite",
      "education-plus",
      "mega-display",
    ];
    return [
      { source: "/index.html", destination: "/", permanent: true },
      ...slugs.map((slug) => ({
        source: `/products/${slug}.html`,
        destination: `/products/${slug}`,
        permanent: true,
      })),
    ];
  },
};

export default nextConfig;
