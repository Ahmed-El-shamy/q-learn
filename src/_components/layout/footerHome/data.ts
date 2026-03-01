import { FooterLink } from "./Footer.types";

export const supportLinks: FooterLink[] = [
  { labelKey: "linkUnlockPotential", link: "/static/unlock-your-potential" },
  { labelKey: "linkPrivacyPolicy", link: "/static/privacy-policy" },
  { labelKey: "linkSitemap", link: "/static/sitemap" },
  { labelKey: "linkFeaturedCourses", link: "/static/featured-courses" },
  { labelKey: "linkJoinUs", link: "/static/join-us" },
];

export const infoLinks: FooterLink[] = [
  { labelKey: "linkLearnWithQutell", link: "/static/learn" },
  { labelKey: "linkTeachOnQutell", link: "/static/teach" },
  { labelKey: "linkGetTheApp", link: "/static/git-the-app" },
  { labelKey: "linkAboutUs", link: "/about-us" },
  { labelKey: "linkContactUs", link: "/contact-us" },
];

export const serviceLinks: FooterLink[] = [
  { labelKey: "linkCareers", link: "/static/careers" },
  { labelKey: "linkBlog", link: "/static/blog" },
  { labelKey: "linkHelpSupport", link: "/static/help" },
  { labelKey: "linkTerms", link: "/static/terms" },
  { labelKey: "linkCertificateVerification", link: "/static/certificate" },
  { labelKey: "linkFreeCourse", link: "/static/free-course" },
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
