import type { APIRoute } from 'astro';
import { hardwareProducts } from '../../data/products';

export const GET: APIRoute = async () => {
  return new Response(JSON.stringify(hardwareProducts, null, 2), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
