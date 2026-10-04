export interface McpToolPillar {
  id: string;
  title: string;
  description: string;
  count: string;
  countNum: number;
  iconType: 'music' | 'memory' | 'education' | 'code' | 'heart' | 'worship' | 'cloud' | 'home';
  highlightTools: string[];
}

export const mcpToolPillars: McpToolPillar[] = [
  {
    id: 'media-youtube',
    title: 'Media & YouTube',
    description: 'Streaming YouTube mandiri, transcode Opus, kontrol playback via suara.',
    count: '06',
    countNum: 6,
    iconType: 'music',
    highlightTools: ['YouTube Audio Transcoder', 'Auto Queue', 'Volume Control', 'Spotify Meta Search', 'SFX Player', 'Radio Stream'],
  },
  {
    id: 'semantic-memory',
    title: 'Memori Semantik',
    description: 'Ingat percakapan jangka panjang via vector embedding.',
    count: '04',
    countNum: 4,
    iconType: 'memory',
    highlightTools: ['Vector Episodic Memory', 'User Profile Graph', 'Personal Diary Vault', 'Context Retention'],
  },
  {
    id: 'edusmart-solver',
    title: 'EduSmart Solver',
    description: 'Bantu kerjakan soal matematika, fisika, kimia step-by-step.',
    count: '05',
    countNum: 5,
    iconType: 'education',
    highlightTools: ['Math Step Solver', 'Physics Formula Parser', 'Vision OCR Math', 'Socratic Questioning', 'Quiz Generator'],
  },
  {
    id: 'coding-devops',
    title: 'Coding & DevOps',
    description: 'Debugging, code review, dan penjelasan konsep IT/DevOps.',
    count: '05',
    countNum: 5,
    iconType: 'code',
    highlightTools: ['ESP32 Pinout Helper', 'Git Commit Analyzer', 'Server Health Pinger', 'Code Refactor Coach', 'Regex Builder'],
  },
  {
    id: 'fallacy-cbt',
    title: 'Fallacy & CBT',
    description: 'Deteksi sesat pikir & panduan CBT psikologis.',
    count: '04',
    countNum: 4,
    iconType: 'heart',
    highlightTools: ['Cognitive Fallacy Detector', 'CBT Thought Reframing', 'Stress Decompressor', 'Guided Breathing'],
  },
  {
    id: 'spiritual-worship',
    title: 'Panduan Ibadah',
    description: 'Referensi 6+ agama: jadwal sholat, kitab suci, panduan spiritual.',
    count: '04',
    countNum: 4,
    iconType: 'worship',
    highlightTools: ['GPS Prayer Times Azan', 'Qibla Direction Calc', 'Multi-Religion Daily Quote', 'Meditation Bells'],
  },
  {
    id: 'public-info',
    title: 'Info Publik',
    description: 'BMKG gempa terkini, KBBI, dan data publik Indonesia.',
    count: '04',
    countNum: 4,
    iconType: 'cloud',
    highlightTools: ['BMKG Realtime Earthquake', 'Hourly Weather Forecast', 'Air Quality Index AQI', 'KBBI Definisi & Sinonim'],
  },
  {
    id: 'smart-home',
    title: 'Smart Home',
    description: 'Kontrol dual relay, saklar, lampu via suara bahasa Indonesia.',
    count: '04',
    countNum: 4,
    iconType: 'home',
    highlightTools: ['ESP-NOW & MQTT Relay Protocol', 'Virtual Switcher', 'Smart Timer & Scheduler', 'Energy Metering'],
  },
];
