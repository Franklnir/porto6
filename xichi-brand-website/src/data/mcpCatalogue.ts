export interface McpToolItem {
  id: string;
  name: string;
  badge?: string;
  description: string;
  promptExample?: string;
  parameters?: string;
}

export interface McpCategory {
  id: string;
  number: string;
  icon: string;
  title: string;
  tagline: string;
  tools: McpToolItem[];
}

export const mcpCatalogue: McpCategory[] = [
  {
    id: 'study-suite',
    number: '01',
    icon: '🎓',
    title: 'Pembelajaran & Akademik',
    tagline: 'Study Suite · Tutor AI Matematika, Sains, Sastra & Riset Akademis',
    tools: [
      {
        id: 'solve_study_problem',
        name: 'solve_study_problem',
        description: 'Menyelesaikan soal latihan/ujian secara bertahap: Identifikasi data (Diketahui/Ditanya), Teori/Rumus dasar, Langkah kalkulasi step-by-step, Jawaban akhir, dan Tips agar tidak terjebak.',
        promptExample: 'Xiaozhi, bantu selesaikan soal bola dilempar ke atas dengan kecepatan awal 20 m/s, berapa tinggi maksimumnya?',
      },
      {
        id: 'explain_concept',
        name: 'explain_concept',
        description: 'Menjelaskan konsep rumit dengan 2 tingkat penjelasan: Definisi Akademik Resmi (cocok untuk ujian/tugas) dan Analogi Sederhana Dunia Nyata (ELI5) agar langsung paham logikanya.',
        promptExample: 'Jelaskan apa itu Polymorphism dalam pemrograman dengan analogi sederhana.',
      },
      {
        id: 'quiz_me',
        name: 'quiz_me',
        description: 'Membuat kuis latihan interaktif (pilihan ganda atau esai singkat) berdasarkan topik yang sedang dipelajari lengkap dengan kunci jawaban dan pembahasan.',
        promptExample: 'Xiaozhi, uji saya dengan 3 soal kuis tentang Hukum Termodinamika.',
      },
      {
        id: 'lookup_formula',
        name: 'lookup_formula',
        description: 'Mencari rumus cepat, unit satuan SI, dan variabel untuk Matematika, Fisika, Kimia, atau Ekonomi.',
        promptExample: 'Apa rumus menghitung gaya gravitasi Newton?',
      },
      {
        id: 'academic_english_helper',
        name: 'academic_english_helper',
        description: 'Membantu penulisan akademik bahasa Inggris: proofreading grammar, pemilihan kata formal untuk abstrak/skripsi, dan parafrase anti-plagiarisme.',
        promptExample: 'Perbaiki kalimat abstrak bahasa Inggris ini agar lebih formal dan akademis.',
      },
      {
        id: 'lookup_kbbi',
        name: 'lookup_kbbi',
        description: 'Mengecek ejaan baku, bentuk tidak baku, kelas kata (nomina, verba, adjektiva), dan definisi resmi bahasa Indonesia menurut KBBI.',
        promptExample: 'Kata yang baku itu mempesona atau memukau menurut KBBI?',
      },
      {
        id: 'search_wikipedia',
        name: 'search_wikipedia',
        description: 'Mengambil informasi ensiklopedia faktual resmi dari Wikipedia bahasa Indonesia secara ringkas dan bebas halusinasi.',
        promptExample: 'Siapa itu Alan Turing dan apa pengaruhnya bagi dunia komputer menurut Wikipedia?',
      },
    ],
  },
  {
    id: 'specialist-analysis',
    number: '02',
    icon: '🧠',
    title: 'Analisis Spesialis',
    tagline: 'Filsafat, Psikologi Kognitif & Senior IT Architecture',
    tools: [
      {
        id: 'detect_logical_fallacy',
        name: 'detect_logical_fallacy',
        description: 'Membedah argumen, opini, atau teks debat untuk mendeteksi cacat logika (Ad Hominem, Straw Man, False Dilemma, Slippery Slope, Circular Reasoning, dll) serta teknik rekonstruksi argumen (steel-manning).',
        promptExample: "Bedah argumen ini apakah ada sesat pikirnya: 'Kamu masih bocah tahu apa tentang negara ini!'.",
      },
      {
        id: 'identify_cognitive_bias',
        name: 'identify_cognitive_bias',
        description: 'Menganalisis distorsi pola pikir dan bias kognitif (Confirmation Bias, Sunk Cost Fallacy, Dunning-Kruger, Catastrophizing), dilengkapi pertanyaan sokratik refleksi dan teknik pembingkaian ulang (CBT Reframing).',
        promptExample: 'Saya takut gagal terus sampai tidak mau mulai kerjaan baru, bias kognitif apa yang terjadi pada saya?',
      },
      {
        id: 'it_code_and_architecture_helper',
        name: 'it_code_and_architecture_helper',
        description: 'Panduan berstandar Senior Software Engineer untuk debugging kode (root cause & Big-O), GoF Design Patterns, arsitektur Clean/Microservices, optimasi database SQL/NoSQL, dan DevOps (Docker & Git CLI).',
        promptExample: 'Kapan saya harus memakai Repository Pattern dibanding arsitektur MVC sederhana?',
      },
    ],
  },
  {
    id: 'worship-suite',
    number: '03',
    icon: '🕊️',
    title: 'Kitab Suci & Tata Cara Ibadah',
    tagline: 'Bimbingan Doa, Fikih & Liturgi Lintas Agama',
    tools: [
      {
        id: 'lookup_scripture_and_verse',
        name: 'lookup_scripture_and_verse',
        description: 'Mencari nama surat, kitab suci, pasal, dan nomor ayat untuk 7 tradisi agama (Islam, Kristen, Katolik, Hindu, Buddha, Konghucu, Yahudi) lengkap dengan transliterasi fonetik latin, terjemahan Indonesia, dan hikmahnya.',
        promptExample: "Xiaozhi, bacakan surat Al-Ikhlas beserta arti dan transliterasinya, atau bacakan Mazmur 23.",
      },
      {
        id: 'get_prayer_and_worship_guide',
        name: 'get_prayer_and_worship_guide',
        description: 'Bimbingan doa harian dan tata cara ibadah langkah-demi-langkah (Sholat 5 waktu & wudhu, Doa Bapa Kami & Salam Maria, Liturgi Misa Katolik, Puja Tri Sandhya Hindu, Meditasi Metta Buddhis, Sembahyang Tian Konghucu, Doa Shabbat Yahudi).',
        promptExample: 'Pandu saya tata cara Sholat Subuh lengkap dengan niat dan doanya, atau bagaimana lafal doa Bapa Kami?',
      },
    ],
  },
  {
    id: 'bmkg-realtime',
    number: '04',
    icon: '🌍',
    title: 'Cuaca, Gempa BMKG & Kurs',
    tagline: 'Realtime Data Sensor Kebencanaan & Keuangan Pasar',
    tools: [
      {
        id: 'get_weather_bmkg',
        name: 'get_weather_bmkg',
        badge: 'BMKG Realtime',
        description: 'Mengecek kondisi cuaca, suhu (°C), kelembapan, dan prakiraan cuaca realtime untuk kota/kabupaten di seluruh Indonesia.',
        promptExample: 'Xiaozhi, bagaimana cuaca di Jakarta hari ini?',
      },
      {
        id: 'get_earthquake_info',
        name: 'get_earthquake_info',
        badge: 'Early Warning',
        description: 'Mengambil data resmi BMKG Indonesia tentang gempa bumi terkini (magnitudo, kedalaman, koordinat pusat gempa, potensi tsunami, dan daftar wilayah yang merasakan).',
        promptExample: 'Apakah ada info gempa terkini dari BMKG hari ini?',
      },
      {
        id: 'convert_currency',
        name: 'convert_currency',
        description: 'Mengonversi nilai tukar mata uang global (USD, IDR, EUR, JPY, SGD, MYR, dll) menggunakan kurs pasar terbaru.',
        promptExample: 'Berapa rupiah untuk 50 dolar Amerika saat ini?',
      },
    ],
  },
  {
    id: 'knowledge-base',
    number: '05',
    icon: '📚',
    title: 'Knowledge Base Pribadi',
    tagline: 'Repositori Catatan, Jadwal, Dokumen & API Live',
    tools: [
      {
        id: 'search_course_materials',
        name: 'search_course_materials',
        description: 'Mencari materi perkuliahan, catatan tugas, atau jadwal ujian di database materi akun kamu.',
      },
      {
        id: 'read_live_api_data',
        name: 'read_live_api_data',
        description: 'Membaca data API realtime dinamis yang dikonfigurasi di dashboard.',
      },
      {
        id: 'read_material_database',
        name: 'read_material_database',
        description: 'Membaca daftar seluruh materi kuliah/dokumen yang tersimpan di akun.',
      },
      {
        id: 'read_material_detail',
        name: 'read_material_detail',
        description: 'Membaca satu materi secara mendalam berdasarkan ID atau judul materi.',
      },
    ],
  },
  {
    id: 'smart-home-relay',
    number: '06',
    icon: '🏠',
    title: 'Smart Home & Relay Fisik ESP32',
    tagline: 'Kendali Saklar Ruangan Virtual & Modul Relay Nyata',
    tools: [
      {
        id: 'control_relay',
        name: 'control_relay',
        description: 'Mengontrol relay virtual berdasarkan nomor channel (1-8) atau nama ruangan (Ruang Tamu, Kamar Tidur, Dapur, dll).',
        promptExample: 'Xiaozhi, nyalakan lampu ruang tamu.',
      },
      {
        id: 'control_smart_home_room',
        name: 'control_smart_home_room',
        description: 'Mengontrol perangkat pintar rumah virtual berdasarkan nama ruangan langsung.',
        promptExample: 'Xiaozhi, matikan semua lampu di kamar tidur.',
      },
      {
        id: 'get_relay_status',
        name: 'get_relay_status',
        description: 'Membaca status semua saklar relay virtual (apakah sedang menyala atau mati).',
        promptExample: 'Xiaozhi, cek status relay rumah.',
      },
      {
        id: 'all_relays_on',
        name: 'all_relays_on',
        description: 'Menyalakan seluruh saklar relay virtual di seluruh ruangan secara serentak.',
        promptExample: 'Xiaozhi, nyalakan semua saklar rumah.',
      },
      {
        id: 'all_relays_off',
        name: 'all_relays_off',
        description: 'Mematikan seluruh saklar relay virtual di seluruh ruangan secara serentak.',
        promptExample: 'Xiaozhi, matikan semua saklar sekarang.',
      },
      {
        id: 'get_registered_devices',
        name: 'get_registered_devices',
        description: 'Menampilkan daftar seluruh node mikrokontroler ESP32 dan modul relay yang terdaftar di jaringan lokal/cloud.',
        promptExample: 'Xiaozhi, perangkat ESP32 apa saja yang terdaftar?',
      },
      {
        id: 'control_real_relay_by_voice',
        name: 'control_real_relay_by_voice',
        badge: 'Hardware GPIO',
        description: 'Mengontrol modul relay fisik nyata yang terhubung ke pin GPIO mikrokontroler ESP32 via polling HTTP token perangkat.',
        promptExample: 'Xiaozhi, aktifkan relay fisik pin 2.',
      },
      {
        id: 'get_real_relay_status',
        name: 'get_real_relay_status',
        description: 'Membaca status real-time relay fisik pada hardware ESP32.',
        promptExample: 'Xiaozhi, bagaimana status relay fisik saat ini?',
      },
      {
        id: 'all_real_relays_on',
        name: 'all_real_relays_on',
        description: 'Menyalakan seluruh saluran relay fisik nyata pada hardware ESP32 secara bersamaan.',
        promptExample: 'Xiaozhi, nyalakan semua relay fisik.',
      },
      {
        id: 'all_real_relays_off',
        name: 'all_real_relays_off',
        description: 'Mematikan seluruh saluran relay fisik nyata pada hardware ESP32 secara bersamaan.',
        promptExample: 'Xiaozhi, matikan semua relay fisik.',
      },
    ],
  },
  {
    id: 'deep-research-osint',
    number: '07',
    icon: '🌐',
    title: 'Riset Cerdas, Internet & Intelijen',
    tagline: 'Web Deep Scraper, Social Media Mining & Passive OSINT',
    tools: [
      {
        id: 'search_web_deep',
        name: 'search_web_deep',
        badge: 'Deep Reader AI',
        description: 'Riset multi-sumber mendalam menggabungkan Wikipedia Ensiklopedia, Google News RSS, dan Automated Clean Article Scraper (ekstraksi hingga 1.500 karakter teks bersih per artikel). Menghasilkan analisis faktual yang kaya dan komprehensif.',
        parameters: 'query (wajib), max_results (1-10), read_content (true/false)',
        promptExample: 'XiaoZhi, lakukan riset mendalam tentang arsitektur komputer RISC-V dan rangkum intisarinya.',
      },
      {
        id: 'search_social_media',
        name: 'search_social_media',
        badge: 'Social Mining',
        description: 'Menelusuri opini publik, ulasan jujur komunitas, sentimen pengguna, dan topik viral di Reddit, X (Twitter), dan YouTube secara real-time tanpa batas kuota rate-limit.',
        parameters: "query (wajib), platform ('all' | 'reddit' | 'x' | 'youtube'), max_results",
        promptExample: 'Apa kata orang di Reddit dan Twitter tentang performa ESP32-S3 vs ESP32-C3?',
      },
      {
        id: 'osint_recon',
        name: 'osint_recon',
        badge: 'Passive OSINT',
        description: 'Investigasi intelijen sumber terbuka pasif (100% aman & legal): Username scan paralel di 12+ platform (GitHub, Reddit, Twitter, Telegram), IP Geolocation/ISP/ASN/rDNS, Domain A/AAAA & Certificate Transparency (crt.sh).',
        parameters: "target (wajib), target_type ('auto' | 'username' | 'ip' | 'domain')",
        promptExample: "XiaoZhi, telusuri jejak digital username 'franklnir' di internet, atau periksa IP 8.8.8.8.",
      },
      {
        id: 'search_web',
        name: 'search_web',
        description: 'Pencarian cepat mesin web untuk verifikasi fakta singkat, informasi umum, dan definisi istilah harian.',
        promptExample: 'XiaoZhi, siapa penemu mikrokontroler pertama kali?',
      },
      {
        id: 'search_news',
        name: 'search_news',
        description: 'Mencari tajuk berita terkini dari berbagai portal berita tepercaya di Indonesia maupun internasional.',
        promptExample: 'XiaoZhi, ada berita terkini apa seputar teknologi hari ini?',
      },
    ],
  },
  {
    id: 'youtube-multimedia',
    number: '08',
    icon: '🎵',
    title: 'Multimedia & Streaming Musik',
    tagline: 'YouTube Audio Player, Personal Playlist & Top Tracks',
    tools: [
      {
        id: 'play_youtube_song',
        name: 'play_youtube_song',
        description: 'Mencari lagu di YouTube dan mengirimkan audio stream langsung ke speaker perangkat keras ESP32.',
        promptExample: 'Xiaozhi, putar lagu Laskar Pelangi di YouTube.',
      },
      {
        id: 'play_playlist_song',
        name: 'play_playlist_song',
        badge: 'Playlist',
        description: 'Memutar lagu dari daftar Playlist Musik YouTube pribadi pengguna berdasarkan nomor urut lagu (contoh: "1", "nomor 2") atau judul lagu.',
        promptExample: 'Xiaozhi, putar playlist nomor 1, atau putar lagu Bohemian Rhapsody dari playlist.',
      },
      {
        id: 'list_user_playlist',
        name: 'list_user_playlist',
        badge: 'Playlist',
        description: 'Menampilkan seluruh daftar lagu yang tersimpan di Playlist Musik YouTube akun pengguna dari menu Playlist dashboard.',
        promptExample: 'Xiaozhi, apa saja lagu yang tersimpan di playlist saya?',
      },
      {
        id: 'get_playlist_top_played',
        name: 'get_playlist_top_played',
        badge: 'Top Tracks',
        description: 'Mengecek daftar lagu di Playlist pengguna yang paling sering diputar (Top Played Tracks / Lagu Terfavorit).',
        promptExample: 'Xiaozhi, lagu apa yang paling sering saya putar?',
      },
      {
        id: 'get_playback_status',
        name: 'get_playback_status',
        description: 'Melihat status pemutaran audio yang sedang aktif, judul lagu, dan progress durasi lagu.',
        promptExample: 'Xiaozhi, lagu apa yang sedang diputar sekarang?',
      },
      {
        id: 'stop_youtube_song',
        name: 'stop_youtube_song',
        description: 'Menghentikan pemutaran audio musik streaming YouTube yang sedang berjalan di speaker ESP32.',
        promptExample: 'Xiaozhi, hentikan musik.',
      },
    ],
  },
  {
    id: 'utilities-daily',
    number: '09',
    icon: '⚙️',
    title: 'Utilitas & Produktivitas Harian',
    tagline: 'Kalkulasi Rumit, Terjemahan Bahasa & Alarm Pengingat',
    tools: [
      {
        id: 'calculate',
        name: 'calculate',
        description: 'Menghitung ekspresi matematika kompleks, rumus trigonometri, persentase, atau konversi satuan.',
        promptExample: 'Berapa 15 persen dari 350 ribu ditambah akar 144?',
      },
      {
        id: 'translate_text',
        name: 'translate_text',
        description: 'Menerjemahkan teks atau percakapan antar berbagai bahasa asing dengan tata bahasa natural dan kontekstual.',
        promptExample: "Terjemahkan ke bahasa Jepang: 'Senang bertemu dengan Anda hari ini'.",
      },
      {
        id: 'set_reminder',
        name: 'set_reminder',
        description: 'Membuat pengingat agenda, alarm pengingat waktu, atau instruksi jadwal kegiatan tertentu.',
        promptExample: 'Xiaozhi, ingatkan aku minum obat dalam 30 menit.',
      },
    ],
  },
  {
    id: 'memory-semantic',
    number: '10',
    icon: '🧠',
    title: 'Memori Semantik & Profil Pengguna',
    tagline: 'Vector Database PostgreSQL & Personalisasi Akrab',
    tools: [
      {
        id: 'save_chat_history',
        name: 'save_chat_history',
        description: 'Menyimpan catatan riwayat percakapan penting secara otomatis ke database PostgreSQL dan dashboard akun.',
      },
      {
        id: 'recall_chat_memory',
        name: 'recall_chat_memory',
        badge: 'Semantic Vector AI',
        description: 'Mengingat kembali riwayat obrolan masa lalu (long-term memory) berbasis makna/semantik. Mampu menemukan percakapan meski menggunakan sinonim atau konsep serupa.',
        promptExample: 'Xiaozhi, kemarin apa masalah keuanganku?, atau ingat nggak kita tadi bahas apa?',
      },
      {
        id: 'remember_user_profile',
        name: 'remember_user_profile',
        badge: 'User Persona',
        description: 'Mencatat dan menyimpan preferensi pribadi, hobi, makanan favorit, cita-cita, nama panggilan, atau gaya bicara yang disukai pengguna ke profil jangka panjang.',
        promptExample: 'Xiaozhi, panggil aku Kak Frank ya dan hobiku main catur.',
      },
      {
        id: 'get_user_profile',
        name: 'get_user_profile',
        badge: 'Personalized',
        description: 'Mengambil profil dan preferensi pengguna yang tersimpan agar gaya bicara, pendekatan, dan jawaban Xiaozhi terasa sangat akrab dan personal.',
        promptExample: 'Xiaozhi, sesuaikan jawaban dengan gaya favoritku.',
      },
    ],
  },
];
