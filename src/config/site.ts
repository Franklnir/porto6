export interface SiteConfig {
  name: string;
  title: string;
  description: string;
  url: string;
  locale: string;
  email: string;
  links: {
    cv: string;
    cvIotEngineer: string;
    cvItSupport: string;
    github: string;
    instagram: string;
    linkedin: string;
    facebook: string;
    whatsapp: string;
  };
}

const cvIotEngineerUrl =
  import.meta.env.PUBLIC_CV_IOT_ENGINEER_URL ?? '/documents/irsyad-cv-iot-engineer.pdf';
const cvItSupportUrl =
  import.meta.env.PUBLIC_CV_IT_SUPPORT_URL ?? '/documents/irsyad-cv-it-support.pdf';

export const siteConfig = {
  name: 'Irsyad',
  title: 'Irsyad - IoT, AI & Full-Stack Systems Engineer',
  description:
    'Portofolio Irsyad: sistem IoT, embedded, backend platform, integrasi AI, dan engineering sistem real-time.',
  url: import.meta.env.PUBLIC_SITE_URL ?? 'https://portfolio.example.com',
  locale: 'id_ID',
  email: import.meta.env.PUBLIC_CONTACT_EMAIL ?? 'irsyad@example.com',
  links: {
    cv: import.meta.env.PUBLIC_CV_URL ?? cvIotEngineerUrl,
    cvIotEngineer: cvIotEngineerUrl,
    cvItSupport: cvItSupportUrl,
    github: import.meta.env.PUBLIC_GITHUB_URL ?? 'https://github.com/Franklnir',
    instagram: import.meta.env.PUBLIC_INSTAGRAM_URL ?? 'https://www.instagram.com/ir_syad2612/',
    linkedin:
      import.meta.env.PUBLIC_LINKEDIN_URL ?? 'https://www.linkedin.com/in/irsyad-062a30373/',
    facebook: import.meta.env.PUBLIC_FACEBOOK_URL ?? 'https://www.facebook.com/ir_syad2612',
    whatsapp: import.meta.env.PUBLIC_WHATSAPP_URL ?? 'https://wa.me/6289531832365',
  },
} as const satisfies SiteConfig;
