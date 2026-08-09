/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_SITE_URL?: string;
  readonly PUBLIC_CONTACT_EMAIL?: string;
  readonly PUBLIC_CV_URL?: string;
  readonly PUBLIC_GITHUB_URL?: string;
  readonly PUBLIC_LINKEDIN_URL?: string;
  readonly PUBLIC_ENABLE_SEQUENCE_HERO?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
