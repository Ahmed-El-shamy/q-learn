import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
    output: "standalone",
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "dash-learn.dev.qutell.net",
                pathname: "/**"
            },

            // 👇 لو عندك CDN أو API domains تانية للصور
            // {
            //   protocol: "https",
            //   hostname: "cdn.example.com",
            // },

            // 👇 لو حابب تسمح بكل subdomains (اختياري)
            // {
            //   protocol: "https",
            //   hostname: "**.qutell.net",
            // },
        ],
        qualities: [75, 90, 100],
    },
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
