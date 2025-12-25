import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "q-learn.dev.qutell.net",
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
    },
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
