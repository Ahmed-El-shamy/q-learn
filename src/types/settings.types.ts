export interface ContactSetting {
    contact_email: string,
    contact_phone: string,
    contact_address: string,
    hot_line: string,
    iframe: string,
}
export interface Settings extends ContactSetting {
    site_name: string,
    site_description: string,
    site_logo: string,
    site_favicon: string,
    copyright_text: string,
    hot_line: string,
    whats_numper: string,
    social_facebook: string,
    social_twitter: string,
    social_instagram: string,
    social_linkedin: string,
    seo_meta_title: string,
    seo_meta_description: string,
    seo_meta_keywords: string, og_image: string
}