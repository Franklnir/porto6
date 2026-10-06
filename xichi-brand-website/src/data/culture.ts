export interface BentoItem {
  id: string;
  gridClass: string;
  type: 'text' | 'image';
  label?: string;
  title?: string;
  desc?: string;
  icon?: string;
  center?: boolean;
  image?: string;
  fallbackImage?: string;
  alt?: string;
}

export const bentoItems: BentoItem[] = [
  {
    id: 'b-1',
    gridClass: 'b-1',
    type: 'image',
    image: '/assets/culture/studio7.webp',
    fallbackImage: '/assets/culture/studio7.jpg',
    alt: 'Chronchi Smartwatch ESP32 di stand lab IrsyadLabs',
  },
  {
    id: 'b-2',
    gridClass: 'b-2',
    type: 'image',
    image: '/assets/culture/studio5.webp',
    fallbackImage: '/assets/culture/studio5.jpg',
    alt: 'Eksperimen prototipe hardware ESP32-S3 dan baterai Xichi',
  },
  {
    id: 'b-3',
    gridClass: 'b-3',
    type: 'image',
    image: '/assets/culture/studio2.webp',
    fallbackImage: '/assets/culture/studio2.jpg',
    alt: 'Workspace perakitan dan pengujian hardware Xichi AI',
  },
  {
    id: 'b-4',
    gridClass: 'b-4',
    type: 'image',
    image: '/assets/culture/studio8.webp',
    fallbackImage: '/assets/culture/studio8.jpg',
    alt: 'Prototipe robot interaktif Xichi Voice AI',
  },
  {
    id: 'b-5',
    gridClass: 'b-5',
    type: 'image',
    image: '/assets/culture/studio3.webp',
    fallbackImage: '/assets/culture/studio3.jpg',
    alt: 'Setup meja kerja dan riset perangkat IoT Voice AI',
  },
  {
    id: 'b-6',
    gridClass: 'b-6',
    type: 'image',
    image: '/assets/culture/xichi-pocket.webp',
    fallbackImage: '/assets/culture/xichi-pocket.jpg',
    alt: 'Komponen hardware DIY Xichi Pocket di atas cutting mat',
  },
  {
    id: 'b-7',
    gridClass: 'b-7',
    type: 'image',
    image: '/assets/culture/studio1.webp',
    fallbackImage: '/assets/culture/studio1.jpg',
    alt: 'Laboratorium & Studio Kerja Xichi Maker IrsyadLabs',
  },
  {
    id: 'b-8',
    gridClass: 'b-8',
    type: 'image',
    image: '/assets/culture/studio9.webp',
    fallbackImage: '/assets/culture/studio9.jpg',
    alt: 'Pengujian menu OS Xiaozhi dan Chronchi pada perangkat Xichi',
  },
  {
    id: 'b-9',
    gridClass: 'b-9',
    type: 'image',
    image: '/assets/culture/studio6.webp',
    fallbackImage: '/assets/culture/studio6.jpg',
    alt: 'Suasana studio kerja dan prototyping hardware IrsyadLabs',
  },
];
