import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
  return new Response(
    JSON.stringify(
      {
        name: 'Xichi Firmware Distribution',
        version: '1.4.2',
        releaseDate: '2026-10-01',
        channel: 'stable',
        builds: [
          {
            chipFamily: 'ESP32-S3',
            board: 'Xichi Core (N16R8)',
            fileName: 'xichi_core_v1.4.2.bin',
            flashOffset: '0x00010000',
            baudRate: 921600,
            features: ['GC9A01 LCD', 'I2S Audio', 'Hugging Xiaozhi', 'YouTube Streamer', '47 MCP Tools'],
          },
          {
            chipFamily: 'ESP32-S3',
            board: 'Xichi Vision Pro (CAM)',
            fileName: 'xichi_vision_v1.4.2.bin',
            flashOffset: '0x00010000',
            baudRate: 921600,
            features: ['OV2640 Camera', 'OCR Vision', 'IPS Display', 'I2S Audio'],
          },
          {
            chipFamily: 'ESP32-C3',
            board: 'Xichi Pocket (SuperMini)',
            fileName: 'xichi_pocket_v1.4.2.bin',
            flashOffset: '0x00010000',
            baudRate: 460800,
            features: ['PTT Button', 'OLED 0.96', 'Smart Relay Switch'],
          },
        ],
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
