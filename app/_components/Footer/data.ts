import { FooterLink, FooterSection } from "./Footer.types";

export type LocationInfo = {
    address: string;
    phoneNumber: string;
    email: string;
};

export const locationInfo: LocationInfo = {
    address: "123 Education Street, Learning City, LC 12345",
    phoneNumber: "+1 (555) 123-4567",
    email: "info@qutell-learning.com",
};

export const footerLinks: FooterLink[] = [
    {
        label: "About Us",
        link: "/about",
    },
    {
        label: "Terms and Conditions",
        link: "/terms-and-conditions",
    },
    {
        label: "Privacy Policy",
        link: "/privacy-policy",
    },
    {
        label: "Cookie Policy",
        link: "/cookie-policy",
    },
    {
        label: "Refund Policy",
        link: "/refund-policy",
    },
    {
        label: "FAQs",
        link: "/faqs",
    },
    {
        label: "Contact Us",
        link: "/contact",
    },
    {
        label: "Help Center",
        link: "/help",
    },
];

export const socialMediaLinks: FooterLink[] = [
    {
        label: "Facebook",
        link: "https://facebook.com/qutell-learning",
    },
    {
        label: "Twitter",
        link: "https://twitter.com/qutell-learning",
    },
    {
        label: "Instagram",
        link: "https://instagram.com/qutell-learning",
    },
    {
        label: "LinkedIn",
        link: "https://linkedin.com/company/qutell-learning",
    },
    {
        label: "YouTube",
        link: "https://youtube.com/@qutell-learning",
    },
    {
        label: "TikTok",
        link: "https://tiktok.com/@qutell-learning",
    },
];

export const footerSections: FooterSection[] = [
    {
        title: "Company",
        links: [
            {
                label: "About Us",
                link: "/about",
            },
            {
                label: "Contact Us",
                link: "/contact",
            },
            {
                label: "Careers",
                link: "/careers",
            },
            {
                label: "Blog",
                link: "/blog",
            },
        ],
    },
    {
        title: "Legal",
        links: [
            {
                label: "Terms and Conditions",
                link: "/terms-and-conditions",
            },
            {
                label: "Privacy Policy",
                link: "/privacy-policy",
            },
            {
                label: "Cookie Policy",
                link: "/cookie-policy",
            },
            {
                label: "Refund Policy",
                link: "/refund-policy",
            },
        ],
    },
    {
        title: "Support",
        links: [
            {
                label: "FAQs",
                link: "/faqs",
            },
            {
                label: "Help Center",
                link: "/help",
            },
            {
                label: "Documentation",
                link: "/docs",
            },
            {
                label: "Community",
                link: "/community",
            },
        ],
    },
];

