// Data statistik Indonesia untuk situs Arunika.
// Setiap angka mencantumkan sumber dan tahunnya di kolom sumber.
// Angka penduduk memakai estimasi pertengahan tahun BPS; angka 2020
// memakai hasil Sensus Penduduk 2020. Nilai provinsi dibulatkan ke
// 0,1 juta jiwa dari estimasi BPS pertengahan 2024.
// Data statistik Indonesia untuk situs Arunika. Dipasang pada window
// supaya modul lain (views.js, main.js) dapat membacanya.
window.ARUNIKA_DATA = {
  meta: {
    country: "Indonesia",
    updated: "26 November 2026",
    currency: "Rupiah (Rp)",
    sourcesNote: "Seluruh angka di situs ini berasal dari publikasi Badan Pusat Statistik (BPS), Bank Indonesia (BI), dan APJII. Tahun rujukan ditulis pada setiap kartu, grafik, dan tabel."
  },

  kpi: [
    { id: "penduduk", label: "Penduduk", value: "281,6 jt", detail: "Estimasi pertengahan 2024", source: "BPS, 2024" },
    { id: "pdb", label: "PDB harga berlaku", value: "Rp22.139 T", detail: "Tumbuh 5,03% pada 2024", source: "BPS, 2024" },
    { id: "pdbKapita", label: "PDB per kapita", value: "Rp78,6 jt", detail: "Sekitar US$4.960 pada 2024", source: "BPS, 2024" },
    { id: "ipm", label: "Indeks Pembangunan Manusia", value: "75,02", detail: "Naik dari 74,39 pada 2023", source: "BPS, 2024" },
    { id: "inflasi", label: "Inflasi (Des 2024, y-on-y)", value: "1,57%", detail: "Terendah sejak 2020", source: "BPS, 2024" },
    { id: "pengangguran", label: "Pengangguran terbuka", value: "4,91%", detail: "Agustus 2024, 7,47 juta orang", source: "BPS, 2024" },
    { id: "kemiskinan", label: "Penduduk miskin", value: "9,03%", detail: "Maret 2024, 25,22 juta orang", source: "BPS, 2024" },
    { id: "harapanHidup", label: "Umur harapan hidup", value: "74,2 thn", detail: "Angka harapan hidup saat lahir, 2024", source: "BPS, 2024" }
  ],

  pendudukTahunan: [
    { tahun: 2015, penduduk: 255.6, tumbuh: 1.19 },
    { tahun: 2016, penduduk: 258.7, tumbuh: 1.19 },
    { tahun: 2017, penduduk: 261.9, tumbuh: 1.24 },
    { tahun: 2018, penduduk: 265.0, tumbuh: 1.18 },
    { tahun: 2019, penduduk: 268.1, tumbuh: 1.16 },
    { tahun: 2020, penduduk: 270.2, tumbuh: 0.78 },
    { tahun: 2021, penduduk: 273.9, tumbuh: 1.36 },
    { tahun: 2022, penduduk: 275.8, tumbuh: 0.68 },
    { tahun: 2023, penduduk: 278.7, tumbuh: 1.05 },
    { tahun: 2024, penduduk: 281.6, tumbuh: 1.04 }
  ],

  strukturUmur: [
    { kelompok: "0–14 tahun", persen: 24.5, jiwa: "69,0 jt" },
    { kelompok: "15–64 tahun", persen: 68.9, jiwa: "194,0 jt" },
    { kelompok: "65 tahun ke atas", persen: 6.6, jiwa: "18,6 jt" }
  ],

  // 10 provinsi berpenduduk terbesar, estimasi BPS pertengahan 2024.
  provinsiBesar: [
    { nama: "Jawa Barat", penduduk: 50.4, pangsa: 17.9 },
    { nama: "Jawa Timur", penduduk: 41.8, pangsa: 14.8 },
    { nama: "Jawa Tengah", penduduk: 37.9, pangsa: 13.5 },
    { nama: "Sumatera Utara", penduduk: 16.4, pangsa: 5.8 },
    { nama: "Banten", penduduk: 12.4, pangsa: 4.4 },
    { nama: "DKI Jakarta", penduduk: 10.6, pangsa: 3.8 },
    { nama: "Sulawesi Selatan", penduduk: 9.5, pangsa: 3.4 },
    { nama: "Lampung", penduduk: 9.3, pangsa: 3.3 },
    { nama: "Sumatera Selatan", penduduk: 9.0, pangsa: 3.2 },
    { nama: "Riau", penduduk: 6.9, pangsa: 2.4 }
  ],

  // Seluruh 38 provinsi, estimasi BPS pertengahan 2024 (juta jiwa, 1 desimal).
  semuaProvinsi: [
    { nama: "Aceh", penduduk: 5.6, pulau: "Sumatera" },
    { nama: "Sumatera Utara", penduduk: 16.4, pulau: "Sumatera" },
    { nama: "Sumatera Barat", penduduk: 6.0, pulau: "Sumatera" },
    { nama: "Riau", penduduk: 6.9, pulau: "Sumatera" },
    { nama: "Jambi", penduduk: 3.7, pulau: "Sumatera" },
    { nama: "Sumatera Selatan", penduduk: 9.0, pulau: "Sumatera" },
    { nama: "Bengkulu", penduduk: 2.1, pulau: "Sumatera" },
    { nama: "Lampung", penduduk: 9.3, pulau: "Sumatera" },
    { nama: "Kepulauan Bangka Belitung", penduduk: 1.5, pulau: "Sumatera" },
    { nama: "Kepulauan Riau", penduduk: 2.2, pulau: "Sumatera" },
    { nama: "DKI Jakarta", penduduk: 10.6, pulau: "Jawa" },
    { nama: "Jawa Barat", penduduk: 50.4, pulau: "Jawa" },
    { nama: "Jawa Tengah", penduduk: 37.9, pulau: "Jawa" },
    { nama: "DI Yogyakarta", penduduk: 3.8, pulau: "Jawa" },
    { nama: "Jawa Timur", penduduk: 41.8, pulau: "Jawa" },
    { nama: "Banten", penduduk: 12.4, pulau: "Jawa" },
    { nama: "Bali", penduduk: 4.4, pulau: "Bali dan Nusa Tenggara" },
    { nama: "Nusa Tenggara Barat", penduduk: 5.7, pulau: "Bali dan Nusa Tenggara" },
    { nama: "Nusa Tenggara Timur", penduduk: 5.7, pulau: "Bali dan Nusa Tenggara" },
    { nama: "Kalimantan Barat", penduduk: 5.8, pulau: "Kalimantan" },
    { nama: "Kalimantan Tengah", penduduk: 2.8, pulau: "Kalimantan" },
    { nama: "Kalimantan Selatan", penduduk: 4.4, pulau: "Kalimantan" },
    { nama: "Kalimantan Timur", penduduk: 4.0, pulau: "Kalimantan" },
    { nama: "Kalimantan Utara", penduduk: 0.7, pulau: "Kalimantan" },
    { nama: "Sulawesi Utara", penduduk: 2.7, pulau: "Sulawesi" },
    { nama: "Sulawesi Tengah", penduduk: 3.2, pulau: "Sulawesi" },
    { nama: "Sulawesi Selatan", penduduk: 9.5, pulau: "Sulawesi" },
    { nama: "Sulawesi Tenggara", penduduk: 2.8, pulau: "Sulawesi" },
    { nama: "Gorontalo", penduduk: 1.3, pulau: "Sulawesi" },
    { nama: "Sulawesi Barat", penduduk: 1.6, pulau: "Sulawesi" },
    { nama: "Maluku", penduduk: 2.0, pulau: "Maluku dan Papua" },
    { nama: "Maluku Utara", penduduk: 1.4, pulau: "Maluku dan Papua" },
    { nama: "Papua", penduduk: 1.1, pulau: "Maluku dan Papua" },
    { nama: "Papua Barat", penduduk: 0.6, pulau: "Maluku dan Papua" },
    { nama: "Papua Selatan", penduduk: 0.6, pulau: "Maluku dan Papua" },
    { nama: "Papua Tengah", penduduk: 1.4, pulau: "Maluku dan Papua" },
    { nama: "Papua Pegunungan", penduduk: 1.5, pulau: "Maluku dan Papua" },
    { nama: "Papua Barat Daya", penduduk: 0.6, pulau: "Maluku dan Papua" }
  ],

  pdbTahunan: [
    { tahun: 2015, pdb: 11526, tumbuh: 4.88 },
    { tahun: 2016, pdb: 12401, tumbuh: 5.03 },
    { tahun: 2017, pdb: 13588, tumbuh: 5.07 },
    { tahun: 2018, pdb: 14839, tumbuh: 5.17 },
    { tahun: 2019, pdb: 15833, tumbuh: 5.02 },
    { tahun: 2020, pdb: 15444, tumbuh: -2.07 },
    { tahun: 2021, pdb: 16977, tumbuh: 3.70 },
    { tahun: 2022, pdb: 19588, tumbuh: 5.31 },
    { tahun: 2023, pdb: 20892, tumbuh: 5.05 },
    { tahun: 2024, pdb: 22139, tumbuh: 5.03 }
  ],

  inflasiTahunan: [
    { tahun: 2015, inflasi: 3.35 },
    { tahun: 2016, inflasi: 3.02 },
    { tahun: 2017, inflasi: 3.61 },
    { tahun: 2018, inflasi: 3.13 },
    { tahun: 2019, inflasi: 2.72 },
    { tahun: 2020, inflasi: 1.68 },
    { tahun: 2021, inflasi: 1.87 },
    { tahun: 2022, inflasi: 5.51 },
    { tahun: 2023, inflasi: 2.61 },
    { tahun: 2024, inflasi: 1.57 }
  ],

  sektor2024: [
    { sektor: "Industri pengolahan", pangsa: 18.7 },
    { sektor: "Perdagangan besar dan eceran", pangsa: 13.0 },
    { sektor: "Pertanian, kehutanan, perikanan", pangsa: 12.5 },
    { sektor: "Konstruksi", pangsa: 9.7 },
    { sektor: "Pertambangan dan penggalian", pangsa: 9.4 },
    { sektor: "Lainnya", pangsa: 36.7 }
  ],

  perdagangan2024: [
    { label: "Ekspor", nilai: 264.70, satuan: "miliar US$" },
    { label: "Impor", nilai: 233.66, satuan: "miliar US$" },
    { label: "Surplus neraca dagang", nilai: 31.04, satuan: "miliar US$" },
    { label: "Cadangan devisa (Des 2024)", nilai: 155.7, satuan: "miliar US$" }
  ],

  pengangguranTahunan: [
    { tahun: 2019, tpt: 5.28 },
    { tahun: 2020, tpt: 7.07 },
    { tahun: 2021, tpt: 6.49 },
    { tahun: 2022, tpt: 5.86 },
    { tahun: 2023, tpt: 5.32 },
    { tahun: 2024, tpt: 4.91 }
  ],

  kemiskinanTahunan: [
    { tahun: 2019, persen: 9.41, juta: 25.14 },
    { tahun: 2020, persen: 9.78, juta: 26.42 },
    { tahun: 2021, persen: 10.14, juta: 27.54 },
    { tahun: 2022, persen: 9.54, juta: 26.16 },
    { tahun: 2023, persen: 9.36, juta: 25.90 },
    { tahun: 2024, persen: 9.03, juta: 25.22 }
  ],

  ipmTahunan: [
    { tahun: 2020, ipm: 71.94 },
    { tahun: 2021, ipm: 72.77 },
    { tahun: 2022, ipm: 73.55 },
    { tahun: 2023, ipm: 74.39 },
    { tahun: 2024, ipm: 75.02 }
  ],

  kesehatan: [
    { label: "Umur harapan hidup", value: "74,2 tahun", source: "BPS, 2024" },
    { label: "Prevalensi stunting balita", value: "19,8%", source: "Survei Status Gizi Indonesia, 2024" },
    { label: "Rata-rata lama sekolah", value: "9,05 tahun", source: "BPS, 2024" },
    { label: "Harapan lama sekolah", value: "13,33 tahun", source: "BPS, 2024" }
  ],

  pendidikan: [
    { label: "Rata-rata lama sekolah", value: "9,05 tahun", detail: "Penduduk usia 25 tahun ke atas, 2024", source: "BPS, 2024" },
    { label: "Harapan lama sekolah", value: "13,33 tahun", detail: "Anak usia 7 tahun ke atas, 2024", source: "BPS, 2024" },
    { label: "Anggaran pendidikan APBN", value: "Rp665 T", detail: "20% dari APBN 2024", source: "Kementerian Keuangan, 2024" },
    { label: "Pengguna internet", value: "221,6 jt", detail: "79,5% penduduk, survei APJII 2024", source: "APJII, 2024" }
  ],

  pangan2024: [
    { label: "Produksi padi (GKG)", value: "30,34 jt ton", source: "BPS, 2024" },
    { label: "Produksi padi 2023", value: "30,90 jt ton", source: "BPS, 2023" }
  ],

  sumber: [
    { nama: "Badan Pusat Statistik (BPS)", keterangan: "Statistik Indonesia 2025, Berita Resmi Statistik, dan publikasi indikator 2024.", alamat: "bps.go.id" },
    { nama: "Bank Indonesia (BI)", keterangan: "Cadangan devisa akhir Desember 2024 dan statistik moneter.", alamat: "bi.go.id" },
    { nama: "APJII", keterangan: "Survei Penetrasi Internet Indonesia 2024: 221,6 juta pengguna, 79,5% penduduk.", alamat: "apjii.or.id" },
    { nama: "Kementerian Kesehatan", keterangan: "Survei Status Gizi Indonesia (SSGI) 2024: prevalensi stunting 19,8%.", alamat: "kemkes.go.id" },
    { nama: "Kementerian Keuangan", keterangan: "APBN 2024: anggaran pendidikan Rp665 triliun (20% APBN).", alamat: "kemenkeu.go.id" }
  ]
};
