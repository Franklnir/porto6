import { describe, expect, it } from 'vitest';
import { siteConfig } from '../../src/config/site';

describe('siteConfig', () => {
  it('has the required SEO fields', () => {
    expect(siteConfig.name).toBe('Irsyad');
    expect(siteConfig.title.length).toBeGreaterThan(20);
    expect(siteConfig.description.length).toBeGreaterThan(50);
  });

  it('has both CV download links', () => {
    expect(siteConfig.links.cvIotEngineer).toBe('/documents/irsyad-cv-iot-engineer.pdf');
    expect(siteConfig.links.cvItSupport).toBe('/documents/irsyad-cv-it-support.pdf');
  });
});
