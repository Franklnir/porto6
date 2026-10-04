export interface VoiceSample {
  id: string;
  num: string;
  category: string;
  userPrompt: string;
  xichiResponse: string;
  emotion: 'smile' | 'listening' | 'thinking' | 'speaking';
  audioDuration: string;
  tonePitch: number;
}

export const voiceSamples: VoiceSample[] = [
  {
    id: 'voice-casual',
    num: '01',
    category: 'Obrolan Santai',
    userPrompt: 'Halo Xichi, bagaimana kabarmu hari ini?',
    xichiResponse:
      'Halo Frank! Kabarku sangat ceria dan siap menemanimu bekerja di meja hari ini. Jangan lupa minum air putih dan istirahat sejenak setelah sesi fokus ya!',
    emotion: 'smile',
    audioDuration: '0:06',
    tonePitch: 440,
  },
  {
    id: 'voice-music',
    num: '02',
    category: 'Streaming Musik',
    userPrompt: 'Xichi, putarkan lagu Bohemian Rhapsody di YouTube.',
    xichiResponse:
      'Siap, memutar Queen - Bohemian Rhapsody via backend streaming YouTube. Nikmati alunan vokalnya, volume saya set di 70%!',
    emotion: 'speaking',
    audioDuration: '0:08',
    tonePitch: 523,
  },
  {
    id: 'voice-learning',
    num: '03',
    category: 'Solusi Belajar',
    userPrompt: 'Xichi, jelaskan rumus gaya Lorentz dan berikan contoh soalnya.',
    xichiResponse:
      'Gaya Lorentz adalah gaya yang timbul akibat muatan listrik bergerak dalam medan magnetik: F = q(v × B) atau F = B · I · L · sin(θ). Misalnya kawat 2 meter dialiri arus 3 Ampere pada medan 0.5 Tesla tegak lurus, maka gayanya 3 Newton. Mau kita bahas kaidah tangan kanannya juga?',
    emotion: 'thinking',
    audioDuration: '0:14',
    tonePitch: 587,
  },
  {
    id: 'voice-bmkg',
    num: '04',
    category: 'Info Publik',
    userPrompt: 'Xichi, apakah ada informasi gempa bumi terkini dari BMKG?',
    xichiResponse:
      'Menurut data sensor BMKG 18 menit lalu, tercatat gempa tektonik M 5.1 di kedalaman 10 km Barat Daya Sumur-Banten. BMKG menyatakan gempa ini tidak berpotensi tsunami. Situasi aman, tetap tenang ya!',
    emotion: 'speaking',
    audioDuration: '0:11',
    tonePitch: 659,
  },
];
