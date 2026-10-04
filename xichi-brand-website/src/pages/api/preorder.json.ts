import type { APIRoute } from 'astro';
import { hardwareProducts } from '../../data/products';
import { pricingTiers } from '../../data/pricing';

export const GET: APIRoute = async () => {
  return new Response(
    JSON.stringify(
      {
        endpoint: '/api/preorder',
        service: 'Xichi Pre-Order Backend Specification',
        status: 'ready',
        version: '1.0.0',
        availableTiers: pricingTiers.map((t) => ({
          id: t.id,
          title: t.title,
          price: t.priceNumber,
          priceFormatted: t.priceFormatted,
        })),
        availableVariants: hardwareProducts.map((p) => ({
          id: p.id,
          name: p.name,
          code: p.code,
          chipset: p.chipset,
          price: p.priceValue,
        })),
        instructions: {
          whatsappDirect: 'Use https://wa.me/[NUMBER]?text=[ENCODED_MESSAGE] for instant ordering',
          serverAdapter: 'Install @astrojs/cloudflare or @astrojs/node to enable live POST database recording',
        },
      },
      null,
      2
    ),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=3600',
      },
    }
  );
};
