import { FooterLink } from "./Footer.types";

export const supportLinks: FooterLink[] = [
  { labelKey: "linkUnlockPotential", link: "/unlock-your-potential" },
  { labelKey: "linkPrivacyPolicy", link: "/privacy-policy" },
  { labelKey: "linkSitemap", link: "/sitemap" },
  { labelKey: "linkFeaturedCourses", link: "/featured-courses" },
  { labelKey: "linkJoinUs", link: "/join-us" },
];

export const infoLinks: FooterLink[] = [
  { labelKey: "linkLearnWithQutell", link: "/learn" },
  { labelKey: "linkTeachOnQutell", link: "/teach" },
  { labelKey: "linkGetTheApp", link: "/git-the-app" },
  { labelKey: "linkAboutUs", link: "/about-us" },
  { labelKey: "linkContactUs", link: "/contact-us" },
];

export const serviceLinks: FooterLink[] = [
  { labelKey: "linkCareers", link: "/careers" },
  { labelKey: "linkBlog", link: "/blog" },
  { labelKey: "linkHelpSupport", link: "/help" },
  { labelKey: "linkTerms", link: "/terms" },
  { labelKey: "linkCertificateVerification", link: "/certificate" },
  { labelKey: "linkFreeCourse", link: "/free-course" },
];

export const socialMediaLinks: FooterLink[] = [
  {
    icon: "/images/footer/gitlab.svg",
    link: "https://gitlab.com/qutell-learning",
  },

  {
    icon: "/images/footer/youtube.svg",
    link: "https://youtube.com/@qutell-learning",
  },


];

export const paymentMethods = [
  { image: "/images/footer/paypal.webp" },
  { image: "/images/footer/stripe.webp" },
  { image: "/images/footer/paystack.webp" },
  { image: "/images/footer/razorpay.webp" },
  { image: "/images/footer/paytm.webp" },
  { image: "/images/footer/mollie.webp" },
  { image: "/images/footer/jazzcash.webp" },
  { image: "/images/footer/ccavenue.webp" },
];
