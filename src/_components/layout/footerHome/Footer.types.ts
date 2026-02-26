export type FooterLink = {
  label?: string;
  /** Translation key under footer namespace (e.g. "linkAboutUs") */
  labelKey?: string;
  link: string;
  icon?: string;
};

export type FooterSection = {
  title: string;
  links: FooterLink[];
};
