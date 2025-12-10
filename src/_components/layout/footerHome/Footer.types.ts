export type FooterLink = {
  label?: string;
  link: string;
  icon?: string;
};

export type FooterSection = {
  title: string;
  links: FooterLink[];
};
