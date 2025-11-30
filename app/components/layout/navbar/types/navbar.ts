export interface LinkItem {
  href: string;
  label: string;
}

export interface NavbarProps {
  links?: LinkItem[];
  logoText?: string;
  logoImg?: string;
}
