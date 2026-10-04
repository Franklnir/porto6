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
    type: 'text',
    label: '01 / Intro',
    title: "We're a bunch of makers.",
    desc: "It's time to make AI accessible for everyone. We run on coffee, code, and crazy ideas.",
  },
  {
    id: 'b-2',
    gridClass: 'b-2',
    type: 'image',
    image: '/assets/culture/culture-01-makers.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',
    alt: 'Tim Xichi berkolaborasi',
  },
  {
    id: 'b-3',
    gridClass: 'b-3',
    type: 'image',
    image: '/assets/culture/culture-02-prototyping.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1553406830-ef2513450d76?auto=format&fit=crop&w=800&q=80',
    alt: 'Prototyping sirkuit elektronika ESP32',
  },
  {
    id: 'b-4',
    gridClass: 'b-4',
    type: 'text',
    center: true,
    icon: '★',
    title: 'Smart',
    desc: "When things get complicated, we don't freak out. Smart solutions that crack the toughest tech nuts.",
  },
  {
    id: 'b-5',
    gridClass: 'b-5',
    type: 'image',
    image: '/assets/culture/culture-03-coding-night.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?auto=format&fit=crop&w=800&q=80',
    alt: 'Sesi coding larut malam firmware Xichi',
  },
  {
    id: 'b-6',
    gridClass: 'b-6',
    type: 'image',
    image: '/assets/culture/culture-04-coding-session.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
    alt: 'Pair programming and testing hardware',
  },
  {
    id: 'b-7',
    gridClass: 'b-7',
    type: 'image',
    image: '/assets/culture/culture-05-team-unity.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80',
    alt: 'Kebersamaan dan kolaborasi tim komunitas',
  },
  {
    id: 'b-8',
    gridClass: 'b-8',
    type: 'text',
    center: true,
    icon: '♥',
    title: 'Community',
    desc: 'Built by the community, for the community. Join our open-source journey.',
  },
];
