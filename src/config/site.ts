export interface SiteConfig {
  name: string;
  title: string;
  description: string;
  url: string;
  locale: string;
  email: string;
  links: {
    cv: string;
    github: string;
    linkedin: string;
  };
}

export const siteConfig = {
  name: 'Irsyad',
  title: 'Irsyad — IoT, AI & Full-Stack Systems Engineer',
  description:
    'Portofolio Irsyad: sistem IoT, embedded, backend platform, integrasi AI, dan engineering sistem real-time.',
  url: import.meta.env.PUBLIC_SITE_URL ?? 'https://portfolio.example.com',
  locale: 'id_ID',
  email: import.meta.env.PUBLIC_CONTACT_EMAIL ?? 'irsyad@example.com',
  links: {
    cv: import.meta.env.PUBLIC_CV_URL ?? '#contact',
    github: import.meta.env.PUBLIC_GITHUB_URL ?? '#contact',
    linkedin: import.meta.env.PUBLIC_LINKEDIN_URL ?? '#contact',
  },
} as const satisfies SiteConfig;
