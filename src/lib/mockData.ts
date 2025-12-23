export interface BatikMotif {
  name: string;
  origin: string;
  imageUrl: string;
  description: string;
  philosophy: string;
  history: string;
}
export const galleryItems: BatikMotif[] = [
  {
    name: "Parang Rusak",
    origin: "Solo/Yogyakarta",
    imageUrl: "https://images.unsplash.com/photo-1590595978583-39b73b490244?auto=format&fit=crop&q=80&w=800",
    description: "Motif Parang Rusak menggambarkan jalinan ombak yang tak pernah putus, melambangkan perjuangan manusia yang tidak pernah menyerah.",
    philosophy: "Melambangkan ketajaman, kekuatan, dan kewaspadaan. Garis diagonalnya melambangkan penghormatan dan cita-cita luhur.",
    history: "Diciptakan oleh Panembahan Senopati, pendiri Kesultanan Mataram, saat mengamati deburan ombak di Pantai Selatan Jawa yang mengikis karang tanpa henti."
  },
  {
    name: "Mega Mendung",
    origin: "Cirebon",
    imageUrl: "https://images.unsplash.com/photo-1620121692029-d088224ddc74?auto=format&fit=crop&q=80&w=800",
    description: "Khas Cirebon dengan motif awan, melambangkan kesabaran dan kesejukan hati bagi pemakainya.",
    philosophy: "Awan melambangkan dunia atas yang luas dan bebas. Gradasi warnanya melambangkan proses kedewasaan dan ketenangan jiwa dalam menghadapi cobaan.",
    history: "Berakar dari pengaruh kebudayaan Tiongkok yang dibawa oleh para pedagang ke pelabuhan Cirebon, kemudian diadaptasi dengan sentuhan lokal Jawa Barat."
  },
  {
    name: "Sogan",
    origin: "Solo",
    imageUrl: "https://images.unsplash.com/photo-1544273677-2415152755b9?auto=format&fit=crop&q=80&w=800",
    description: "Batik klasik dengan dominasi warna coklat tanah, mencerminkan kesederhanaan dan kedekatan dengan alam.",
    philosophy: "Warna coklat sogan melambangkan bumi dan kerendahan hati. Motifnya seringkali membawa pesan tentang keseimbangan antara manusia dan alam.",
    history: "Merupakan jenis batik tertua yang diproduksi oleh keraton-keraton di Jawa, menggunakan pewarna alami dari kulit kayu pohon soga."
  },
  {
    name: "Kawung",
    origin: "Yogyakarta",
    imageUrl: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&q=80&w=800",
    description: "Berbentuk empat lingkaran yang berpusat pada satu titik, melambangkan keadilan, kemurnian, dan kesempurnaan.",
    philosophy: "Mengajarkan tentang pengendalian diri dan hati yang bersih tanpa prasangka. Bentuknya melambangkan empat penjuru mata angin yang berpusat pada Tuhan.",
    history: "Dahulu hanya boleh dikenakan oleh keluarga kerajaan. Motif ini terinspirasi dari irisan buah atap atau kolang-kaling (buah pohon aren)."
  },
  {
    name: "Sekar Jagad",
    origin: "Yogyakarta",
    imageUrl: "https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?auto=format&fit=crop&q=80&w=800",
    description: "Kumpulan berbagai motif dalam satu kain, melambangkan keberagaman budaya Indonesia yang menyatu indah.",
    philosophy: "Sekar berarti bunga dan Jagad berarti dunia. Mencerminkan keindahan taman bunga di seluruh dunia yang beragam namun harmonis.",
    history: "Berkembang pada abad ke-18 sebagai simbol persatuan dan keindahan yang terbentuk dari perbedaan motif-motif batik di seluruh Nusantara."
  },
  {
    name: "Sidomukti",
    origin: "Solo",
    imageUrl: "https://images.unsplash.com/photo-1558270135-592922592b43?auto=format&fit=crop&q=80&w=800",
    description: "Sering digunakan untuk pengantin, melambangkan harapan akan kemuliaan dan kesejahteraan hidup.",
    philosophy: "Sido berarti menjadi/tercapai dan Mukti berarti mulia/makmur. Harapan agar pemakainya mencapai kehidupan yang terhormat dan berkecukupan.",
    history: "Batik ini merupakan warisan budaya dari Keraton Surakarta yang biasanya dikenakan oleh pengantin dalam upacara pernikahan adat Jawa."
  }
];
export const scannerResults = [
  {
    name: "Batik Parang",
    origin: "Solo/Yogyakarta",
    confidence: 98,
    imageUrl: "https://images.unsplash.com/photo-1590595978583-39b73b490244?auto=format&fit=crop&q=80&w=800",
    description: "Motif tertua di Indonesia dengan susunan 'S' yang saling menjalin tanpa putus.",
    philosophy: "Melambangkan ketajaman, kekuatan, dan kewaspadaan seorang pemimpin atau ksatria dalam menghadapi tantangan hidup.",
    history: "Diciptakan oleh Panembahan Senopati, pendiri Kesultanan Mataram, saat mengamati deburan ombak di Pantai Selatan Jawa yang mengikis karang tanpa henti."
  },
  {
    name: "Batik Kawung",
    origin: "Yogyakarta",
    confidence: 94,
    imageUrl: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&q=80&w=800",
    description: "Motif geometris yang menyerupai buah aren (kawung) yang dibelah melintang.",
    philosophy: "Mengajarkan tentang pengendalian diri, hati yang bersih tanpa prasangka, dan pengabdian kepada sesama.",
    history: "Dahulu hanya boleh dikenakan oleh keluarga kerajaan. Motif ini terinspirasi dari irisan buah atap atau kolang-kaling (buah pohon aren)."
  },
  {
    name: "Batik Mega Mendung",
    origin: "Cirebon",
    confidence: 96,
    imageUrl: "https://images.unsplash.com/photo-1620121692029-d088224ddc74?auto=format&fit=crop&q=80&w=800",
    description: "Motif awan bergradasi yang berasal dari Cirebon, dipengaruhi oleh budaya Tiongkok.",
    philosophy: "Awan melambangkan dunia atas yang membawa kesuburan, sementara gradasinya melambangkan kematangan jiwa.",
    history: "Berakar dari pengaruh kebudayaan Tiongkok yang dibawa oleh para pedagang ke pelabuhan Cirebon, kemudian diadaptasi dengan sentuhan lokal Jawa Barat."
  }
];