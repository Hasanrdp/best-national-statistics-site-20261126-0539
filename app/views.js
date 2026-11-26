// Perender halaman Arunika. Setiap rute hash (#/, #/penduduk, ...) punya
// satu fungsi render yang membangun HTML-nya dari data.js dan menggambar
// grafik lewat charts.js. Semua kontrol di halaman ini bekerja: pemilih
// tahun, pengalih metrik, pencarian provinsi, pengurutan tabel, dan
// unduh CSV.
(function () {
  "use strict";

  var D = window.ARUNIKA_DATA;
  var C = window.ArunikaCharts;
  var esc = C.esc;

  function kpiCards(list) {
    return list.map(function (k) {
      return '<article class="kpi">' +
        '<div class="kpi-label">' + esc(k.label) + '</div>' +
        '<div class="kpi-value">' + esc(k.value) + '</div>' +
        '<p class="kpi-detail">' + esc(k.detail) + '</p>' +
        '<p class="kpi-source">Sumber: ' + esc(k.source) + '</p>' +
        '</article>';
    }).join("");
  }

  function sectionHead(title, sub, link) {
    return '<div class="section-head"><h2>' + esc(title) + '</h2>' +
      (sub ? '<span class="fine">' + esc(sub) + '</span>' : "") +
      (link ? '<a class="more" href="' + esc(link.href) + '">' + esc(link.text) + ' &rarr;</a>' : "") +
      "</div>";
  }

  function hero() {
    return '<section class="hero"><div class="wrap">' +
      '<span class="kicker">Portal Statistik Indonesia</span>' +
      '<h1>Angka Indonesia, dalam satu tempat.</h1>' +
      '<p class="lede">Penduduk, ekonomi, kesehatan, pendidikan, dan ketenagakerjaan — ' +
      'setiap angka dengan sumber dan tahunnya, diperbarui dari publikasi resmi BPS dan kementerian.</p>' +
      '<div class="hero-actions">' +
      '<a class="btn btn-amber" href="#/penduduk">Jelajahi penduduk</a>' +
      '<a class="btn btn-ghost" href="#/ekonomi">Lihat ekonomi 2024</a>' +
      '<a class="btn btn-ghost" href="#/provinsi">38 provinsi</a>' +
      "</div></div></section>";
  }

  function renderHome(el) {
    var popPoints = D.pendudukTahunan.map(function (r) { return { x: String(r.tahun), y: r.penduduk }; });
    var gdpBars = D.pdbTahunan.map(function (r) { return { x: String(r.tahun).slice(2), y: r.tumbuh }; });
    var topProv = D.provinsiBesar.map(function (r) { return { label: r.nama, value: r.penduduk }; });
    el.innerHTML =
      hero() +
      '<div class="wrap"><div class="kpi-grid">' + kpiCards(D.kpi) + "</div></div>" +
      '<div class="wrap">' +
      '<section class="block">' +
      sectionHead("Sekilas Indonesia 2024", "Angka kunci dari publikasi BPS terbaru", { href: "#/metodologi", text: "Lihat sumber data" }) +
      '<div class="grid-2">' +
      '<div class="card"><h3>Penduduk 2015–2024</h3>' +
      '<div class="chart-box">' + C.lineChart(popPoints, { decimals: 1, showValues: false }) + "</div>" +
      '<p class="chart-note">Juta jiwa, estimasi pertengahan tahun. 2020 memakai hasil Sensus Penduduk. Sumber: BPS, 2024.</p></div>' +
      '<div class="card"><h3>Pertumbuhan ekonomi 2015–2024</h3>' +
      '<div class="chart-box">' + C.barChart(gdpBars, { decimals: 2, showValues: true, highlightLast: true }) + "</div>" +
      '<p class="chart-note">Pertumbuhan PDB riil, persen per tahun. Kontraksi 2020 adalah dampak pandemi COVID-19. Sumber: BPS, 2024.</p></div>' +
      "</div></section>" +
      '<section class="block">' +
      sectionHead("Di mana penduduk tinggal", "Sepuluh provinsi berpenduduk terbesar, 2024", { href: "#/provinsi", text: "Semua 38 provinsi" }) +
      '<div class="grid-2">' +
      '<div class="card"><h3>Penduduk menurut provinsi</h3>' +
      '<div class="chart-box">' + C.hbarChart(topProv, { decimals: 1, unit: "jt" }) + "</div>" +
      '<p class="chart-note">Juta jiwa, estimasi BPS pertengahan 2024. Pulau Jawa dihuni 55,9% penduduk Indonesia.</p></div>' +
      '<div class="card"><h3>Perdagangan luar negeri 2024</h3>' +
      '<ul class="fact-list">' + D.perdagangan2024.map(function (r) {
        return "<li><span>" + esc(r.label) + '</span><span class="fact-value">' + esc(C.fmtNum(r.nilai, 2) + " " + r.satuan) + "</span></li>";
      }).join("") + "</ul>" +
      '<p class="src">Sumber: BPS, Statistik Perdagangan Luar Negeri 2024; cadangan devisa: Bank Indonesia, Desember 2024.</p>' +
      '<h3 style="margin-top:1.2rem">Pangan 2024</h3>' +
      '<ul class="fact-list">' + D.pangan2024.map(function (r) {
        return "<li><span>" + esc(r.label) + '</span><span class="fact-value">' + esc(r.value) + '<span class="fact-source">Sumber: ' + esc(r.source) + "</span></span></li>";
      }).join("") + "</ul></div>" +
      "</div></section>" +
      '<section class="block"><div class="callout"><p><b>Kenapa angka di sini bisa dipercaya?</b> ' +
      "Setiap angka menampilkan sumber dan tahunnya. Angka yang dibulatkan diberi keterangan, dan halaman Metodologi " +
      "menjelaskan cara setiap indikator dihitung. Tidak ada angka tanpa jejak.</p></div></section>" +
      "</div>";
  }

  function renderPenduduk(el) {
    var points = D.pendudukTahunan.map(function (r) { return { x: String(r.tahun), y: r.penduduk }; });
    var umur = D.strukturUmur.map(function (r) { return { label: r.kelompok, value: r.persen }; });
    var topProv = D.provinsiBesar.map(function (r) { return { label: r.nama, value: r.penduduk }; });
    el.innerHTML =
      '<div class="wrap"><section class="block">' +
      '<p><a href="#/">&larr; Beranda</a> <span class="badge">Penduduk</span></p>' +
      "<h1>Penduduk Indonesia</h1>" +
      '<p class="lede">281,6 juta jiwa pada pertengahan 2024 (BPS). Indonesia adalah negara berpenduduk terbesar keempat di dunia, ' +
      "dengan 68,9% penduduk berada pada usia produktif 15–64 tahun — jendela bonus demografi yang mencapai puncaknya pada 2030-an.</p>" +
      '<div class="controls"><label for="rentangTahun">Rentang tahun</label>' +
      '<div class="pill-group" id="rentangTahun" role="group" aria-label="Rentang tahun">' +
      '<button type="button" data-range="all" aria-pressed="true">2015–2024</button>' +
      '<button type="button" data-range="recent" aria-pressed="false">2020–2024</button>' +
      "</div></div>" +
      '<div class="grid-2">' +
      '<div class="card"><h3>Jumlah penduduk</h3><div class="chart-box" id="grafikPenduduk">' +
      C.lineChart(points, { decimals: 1, showValues: true }) + "</div>" +
      '<p class="chart-note">Juta jiwa. Sumber: BPS, estimasi pertengahan tahun; 2020 hasil Sensus Penduduk.</p></div>' +
      '<div class="card"><h3>Struktur umur 2024</h3><div class="donut-wrap">' +
      C.donutChart(umur, { size: 200 }) +
      '<ul class="legend">' + D.strukturUmur.map(function (r, i) {
        return '<li><span class="swatch" style="background:' + C.palette[i % C.palette.length] + '"></span>' +
          esc(r.kelompok) + ' <span class="pct">' + esc(C.fmtNum(r.persen, 1)) + "% · " + esc(r.jiwa) + "</span></li>";
      }).join("") + "</ul></div>" +
      '<p class="chart-note">Rasio ketergantungan 2024: 45,0 — setiap 100 penduduk usia produktif menanggung 45 penduduk non-produktif. Sumber: BPS, 2024.</p></div>' +
      "</div></section>" +
      '<section class="block">' +
      sectionHead("Provinsi terpadat", "Penduduk 2024, juta jiwa", { href: "#/provinsi", text: "Tabel semua provinsi" }) +
      '<div class="card"><div class="chart-box">' + C.hbarChart(topProv, { decimals: 1, unit: "jt" }) + "</div>" +
      '<p class="chart-note">Enam provinsi teratas semuanya berada di Pulau Jawa dan Sumatera. Sumber: BPS, estimasi pertengahan 2024.</p></div>' +
      "</section></div>";
    var buttons = el.querySelectorAll("#rentangTahun button");
    buttons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        buttons.forEach(function (b) { b.setAttribute("aria-pressed", "false"); });
        btn.setAttribute("aria-pressed", "true");
        var subset = btn.getAttribute("data-range") === "recent"
          ? points.filter(function (p) { return Number(p.x) >= 2020; })
          : points;
        document.getElementById("grafikPenduduk").innerHTML =
          C.lineChart(subset, { decimals: 1, showValues: true });
      });
    });
  }

  function renderEkonomi(el) {
    var gdpBars = D.pdbTahunan.map(function (r) { return { x: String(r.tahun).slice(2), y: r.pdb }; });
    var growthBars = D.pdbTahunan.map(function (r) { return { x: String(r.tahun).slice(2), y: r.tumbuh }; });
    var inflPoints = D.inflasiTahunan.map(function (r) { return { x: String(r.tahun), y: r.inflasi }; });
    var sektor = D.sektor2024.map(function (r) { return { label: r.sektor, value: r.pangsa }; });    el.innerHTML =
      '<div class="wrap"><section class="block">' +
      '<p><a href="#/">&larr; Beranda</a> <span class="badge">Ekonomi</span></p>' +
      "<h1>Ekonomi Indonesia</h1>" +
      '<p class="lede">PDB 2024 mencapai Rp22.139 triliun dengan pertumbuhan 5,03% (BPS). Ekonomi terbesar di Asia Tenggara ini ' +
      "ditopang industri pengolahan, perdagangan, dan pertanian — dan tumbuh di atas 5% dalam tiga tahun berturut-turut.</p>" +
      '<div class="controls"><label>Metrik PDB</label>' +
      '<div class="pill-group" id="metrikPdb" role="group" aria-label="Metrik PDB">' +
      '<button type="button" data-metric="nilai" aria-pressed="true">Nilai PDB (Rp T)</button>' +
      '<button type="button" data-metric="tumbuh" aria-pressed="false">Pertumbuhan (%)</button>' +
      "</div></div>" +
      '<div class="grid-2">' +
      '<div class="card"><h3 id="judulPdb">PDB harga berlaku 2015–2024</h3><div class="chart-box" id="grafikPdb">' +
      C.barChart(gdpBars, { decimals: 0, showValues: false }) + "</div>" +
      '<p class="chart-note" id="catatanPdb">Triliun rupiah, harga berlaku. Sumber: BPS, 2024.</p></div>' +
      '<div class="card"><h3>Inflasi 2015–2024</h3><div class="chart-box">' +
      C.lineChart(inflPoints, { decimals: 2, showValues: true }) + "</div>" +
      '<p class="chart-note">Inflasi Desember, year-on-year, persen. Lonjakan 2022 mengikuti penyesuaian harga BBM bersubsidi. Sumber: BPS, 2024.</p></div>' +
      "</div></section>" +
      '<section class="block"><div class="grid-2">' +
      '<div class="card"><h3>Lima sektor terbesar 2024</h3><div class="donut-wrap">' +
      C.donutChart(sektor.slice(0, 5), { size: 200 }) +
      '<ul class="legend">' + sektor.slice(0, 5).map(function (r, i) {
        return '<li><span class="swatch" style="background:' + C.palette[i % C.palette.length] + '"></span>' +
          esc(r.label) + ' <span class="pct">' + esc(C.fmtNum(r.value, 1)) + "%</span></li>";
      }).join("") + "</ul></div>" +
      '<p class="chart-note">Pangsa terhadap PDB harga berlaku. “Lainnya” (36,7%) mencakup transportasi, informasi dan komunikasi, keuangan, dan jasa. Sumber: BPS, 2024.</p></div>' +
      '<div class="card"><h3>Perdagangan dan cadangan 2024</h3>' +
      '<ul class="fact-list">' + D.perdagangan2024.map(function (r) {
        return "<li><span>" + esc(r.label) + '</span><span class="fact-value">' + esc(C.fmtNum(r.nilai, 2) + " " + r.satuan) + "</span></li>";
      }).join("") + "</ul>" +
      '<p class="src">Sumber: BPS, 2024; cadangan devisa: Bank Indonesia, Desember 2024.</p>' +
      '<h3 style="margin-top:1.2rem">Pangan 2024</h3>' +
      '<ul class="fact-list">' + D.pangan2024.map(function (r) {
        return "<li><span>" + esc(r.label) + '</span><span class="fact-value">' + esc(r.value) + '<span class="fact-source">Sumber: ' + esc(r.source) + "</span></span></li>";
      }).join("") + "</ul></div>" +
      "</div></section></div>";
    var buttons = el.querySelectorAll("#metrikPdb button");
    buttons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        buttons.forEach(function (b) { b.setAttribute("aria-pressed", "false"); });
        btn.setAttribute("aria-pressed", "true");
        var metric = btn.getAttribute("data-metric");
        if (metric === "nilai") {
          document.getElementById("judulPdb").textContent = "PDB harga berlaku 2015–2024";
          document.getElementById("grafikPdb").innerHTML = C.barChart(gdpBars, { decimals: 0, showValues: false });
          document.getElementById("catatanPdb").textContent = "Triliun rupiah, harga berlaku. Sumber: BPS, 2024.";
        } else {
          document.getElementById("judulPdb").textContent = "Pertumbuhan PDB riil 2015–2024";
          document.getElementById("grafikPdb").innerHTML = C.barChart(growthBars, { decimals: 2, showValues: true, highlightLast: true });
          document.getElementById("catatanPdb").textContent = "Persen per tahun, harga konstan 2010. Kontraksi 2020 dampak pandemi COVID-19. Sumber: BPS, 2024.";
        }
      });
    });
  }

  function renderKesehatan(el) {
    var ipmPoints = D.ipmTahunan.map(function (r) { return { x: String(r.tahun), y: r.ipm }; });
    el.innerHTML =
      '<div class="wrap"><section class="block">' +
      '<p><a href="#/">&larr; Beranda</a> <span class="badge">Kesehatan</span></p>' +
      "<h1>Kesehatan dan pembangunan manusia</h1>" +
      '<p class="lede">Umur harapan hidup Indonesia mencapai 74,2 tahun pada 2024, dan Indeks Pembangunan Manusia naik ke 75,02 — ' +
      "kategori tinggi — namun stunting balita masih 19,8%, di atas target pemerintah 14% pada 2024.</p>" +
      '<div class="grid-2">' +
      '<div class="card"><h3>Indikator kesehatan 2024</h3>' +
      '<ul class="fact-list">' + D.kesehatan.map(function (r) {
        return "<li><span>" + esc(r.label) + '</span><span class="fact-value">' + esc(r.value) + '<span class="fact-source">Sumber: ' + esc(r.source) + "</span></span></li>";
      }).join("") + "</ul>" +
      '<div class="callout" style="margin-top:1rem"><p><b>Stunting 19,8% (SSGI 2024).</b> Hampir satu dari lima balita Indonesia mengalami ' +
      "stunting — turun dari 21,6% pada 2023, tetapi masih di atas target 14%.</p></div></div>" +
      '<div class="card"><h3>Indeks Pembangunan Manusia 2020–2024</h3><div class="chart-box">' +
      C.lineChart(ipmPoints, { decimals: 2, showValues: true }) + "</div>" +
      '<p class="chart-note">IPM menggabungkan umur harapan hidup, pendidikan, dan standar hidup layak. Kategori “tinggi” dimulai dari 70,00. Sumber: BPS, 2024.</p></div>' +
      "</div></section></div>";
  }

  function renderPendidikan(el) {
    el.innerHTML =
      '<div class="wrap"><section class="block">' +
      '<p><a href="#/">&larr; Beranda</a> <span class="badge">Pendidikan</span></p>' +
      "<h1>Pendidikan Indonesia</h1>" +
      '<p class="lede">Rata-rata lama sekolah penduduk usia 25 tahun ke atas mencapai 9,05 tahun pada 2024 — setara kelas 3 SMP — ' +
      "sementara anak yang masuk sekolah pada 2024 diharapkan bersekolah 13,33 tahun, setara semester awal perguruan tinggi.</p>" +
      '<div class="grid-2">' +
      '<div class="card"><h3>Indikator pendidikan 2024</h3>' +
      '<ul class="fact-list">' + D.pendidikan.map(function (r) {
        return "<li><span>" + esc(r.label) + "<br><span class=\"fine\">" + esc(r.detail) + "</span></span>" +
          '<span class="fact-value">' + esc(r.value) + '<span class="fact-source">Sumber: ' + esc(r.source) + "</span></span></li>";
      }).join("") + "</ul>" +
      '<p class="src">Rata-rata dan harapan lama sekolah: BPS, 2024. Anggaran pendidikan: Kementerian Keuangan, APBN 2024. Pengguna internet: APJII, 2024.</p></div>' +
      '<div class="card"><h3>Harapan lama sekolah, 2020–2024</h3><div class="chart-box">' +
      C.lineChart([
        { x: "2020", y: 12.91 }, { x: "2021", y: 13.03 }, { x: "2022", y: 13.10 },
        { x: "2023", y: 13.28 }, { x: "2024", y: 13.33 }
      ], { decimals: 2, showValues: true }) + "</div>" +
      '<p class="chart-note">Tahun, dari anak usia 7 tahun. Kenaikan melambat pada 2024 karena capaian pendidikan menengah yang sudah tinggi. Sumber: BPS, 2020–2024.</p>' +
      '<div class="callout" style="margin-top:1rem"><p><b>Anggaran 20% APBN.</b> UUD 1945 mewajibkan sekurang-kurangnya 20% APBN ' +
      "untuk pendidikan — Rp665 triliun pada 2024.</p></div></div>" +
      "</div></section></div>";
  }

  function renderKerja(el) {
    var tptPoints = D.pengangguranTahunan.map(function (r) { return { x: String(r.tahun), y: r.tpt }; });
    var miskinPoints = D.kemiskinanTahunan.map(function (r) { return { x: String(r.tahun), y: r.persen }; });
    el.innerHTML =
      '<div class="wrap"><section class="block">' +
      '<p><a href="#/">&larr; Beranda</a> <span class="badge">Ketenagakerjaan</span></p>' +
      "<h1>Ketenagakerjaan dan kemiskinan</h1>" +
      '<p class="lede">Tingkat pengangguran terbuka turun ke 4,91% pada Agustus 2024 — terendah sejak sebelum pandemi — dan ' +
      "kemiskinan turun ke 9,03% pada Maret 2024, dengan 25,22 juta penduduk masih hidup di bawah garis kemiskinan.</p>" +
      '<div class="grid-2">' +
      '<div class="card"><h3>Pengangguran terbuka, Agustus 2019–2024</h3><div class="chart-box">' +
      C.lineChart(tptPoints, { decimals: 2, showValues: true }) + "</div>" +
      '<p class="chart-note">Persen angkatan kerja. Lonjakan 2020 adalah dampak pandemi; pemulihan penuh tercapai pada 2024. Sumber: BPS, Sakernas Agustus.</p></div>' +
      '<div class="card"><h3>Kemiskinan, Maret 2019–2024</h3><div class="chart-box">' +
      C.lineChart(miskinPoints, { decimals: 2, showValues: true }) + "</div>" +
      '<p class="chart-note">Persen penduduk. Garis kemiskinan Maret 2024: Rp582.932 per kapita per bulan. Sumber: BPS, 2024.</p></div>' +
      "</div></section>" +
      '<section class="block">' +
      sectionHead("Kemiskinan menurut tahun", "Maret, 2019–2024") +
      '<div class="table-wrap"><table><thead><tr><th>Tahun</th><th class="num">Persentase</th><th class="num">Jumlah (juta jiwa)</th><th>Garis kemiskinan (Rp/kapita/bulan)</th></tr></thead><tbody>' +
      [
        ["2019", "9,41%", "25,14", "Rp425.250"],
        ["2020", "9,78%", "26,42", "Rp454.652"],
        ["2021", "10,14%", "27,54", "Rp472.525"],
        ["2022", "9,54%", "26,16", "Rp505.469"],
        ["2023", "9,36%", "25,90", "Rp550.458"],
        ["2024", "9,03%", "25,22", "Rp582.932"]
      ].map(function (r) {
        return "<tr><td>" + r[0] + '</td><td class="num">' + r[1] + '</td><td class="num">' + r[2] + "</td><td>" + r[3] + "</td></tr>";
      }).join("") +
      "</tbody></table></div>" +
      '<p class="chart-note">Sumber: BPS, Profil Kemiskinan di Indonesia, Maret 2019–2024. Rasio gini Maret 2024: 0,379 (BPS).</p>' +
      "</section></div>";
  }

  function renderProvinsi(el) {
    var rows = D.semuaProvinsi.slice().sort(function (a, b) { return b.penduduk - a.penduduk; });
    el.innerHTML =
      '<div class="wrap"><section class="block">' +
      '<p><a href="#/">&larr; Beranda</a> <span class="badge">Provinsi</span></p>' +
      "<h1>38 provinsi Indonesia</h1>" +
      '<p class="lede">Penduduk menurut provinsi, estimasi BPS pertengahan 2024. Cari nama provinsi, saring menurut pulau, ' +
      "atau urutkan tabel dengan mengeklik judul kolom.</p>" +
      '<div class="controls">' +
      '<label for="cariProvinsi">Cari provinsi</label>' +
      '<input type="search" id="cariProvinsi" placeholder="mis. Jawa Barat" aria-label="Cari provinsi">' +
      '<label for="saringPulau">Pulau</label>' +
      '<select id="saringPulau"><option value="">Semua pulau</option>' +
      ["Sumatera", "Jawa", "Bali dan Nusa Tenggara", "Kalimantan", "Sulawesi", "Maluku dan Papua"].map(function (p) {
        return '<option value="' + esc(p) + '">' + esc(p) + "</option>";
      }).join("") + "</select>" +
      '<button class="btn btn-line" type="button" id="unduhCsv">Unduh CSV</button>' +
      '<span class="fine" id="hitungBaris"></span></div>' +
      '<div class="table-wrap"><table id="tabelProvinsi"><thead><tr>' +
      '<th><button class="sort" type="button" data-key="nama">Provinsi</button></th>' +
      '<th><button class="sort" type="button" data-key="pulau">Pulau</button></th>' +
      '<th class="num"><button class="sort" type="button" data-key="penduduk">Penduduk 2024 (jt jiwa)</button></th>' +
      '<th class="num">Pangsa</th><th>Penduduk (grafik)</th>' +
      "</tr></thead><tbody></tbody></table></div>" +
      '<p class="chart-note">Penduduk dibulatkan ke 0,1 juta jiwa. Pangsa dihitung terhadap total nasional 281,6 juta jiwa. Sumber: BPS, estimasi pertengahan 2024.</p>' +
      "</section></div>";
    var tbody = el.querySelector("#tabelProvinsi tbody");
    var countEl = el.querySelector("#hitungBaris");
    var state = { q: "", pulau: "", key: "penduduk", dir: -1 };
    function draw() {
      var list = rows.filter(function (r) {
        var okQ = !state.q || r.nama.toLowerCase().indexOf(state.q) !== -1;
        var okP = !state.pulau || r.pulau === state.pulau;
        return okQ && okP;
      });
      list.sort(function (a, b) {
        var av = a[state.key], bv = b[state.key];
        var cmp = typeof av === "number" ? av - bv : String(av).localeCompare(String(bv), "id");
        return cmp * state.dir;
      });
      tbody.innerHTML = list.map(function (r) {
        var pangsa = (r.penduduk / 281.6) * 100;
        var bar = (r.penduduk / 50.4) * 100;
        return "<tr><td>" + esc(r.nama) + "</td><td>" + esc(r.pulau) + '</td><td class="num">' +
          esc(C.fmtNum(r.penduduk, 1)) + '</td><td class="num">' + esc(C.fmtNum(pangsa, 1)) + "%</td>" +
          '<td><span class="bar-cell"><span class="bar-track"><span class="bar-fill" style="width:' + bar.toFixed(1) + '%"></span></span></span></td></tr>';
      }).join("") || '<tr><td colspan="5">Tidak ada provinsi yang cocok. Coba kata kunci lain.</td></tr>';
      countEl.textContent = list.length + " dari 38 provinsi";
    }
    el.querySelector("#cariProvinsi").addEventListener("input", function (e) {
      state.q = e.target.value.trim().toLowerCase();
      draw();
    });
    el.querySelector("#saringPulau").addEventListener("change", function (e) {
      state.pulau = e.target.value;
      draw();
    });
    el.querySelectorAll("#tabelProvinsi th button.sort").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var key = btn.getAttribute("data-key");
        if (state.key === key) { state.dir = -state.dir; } else { state.key = key; state.dir = key === "penduduk" ? -1 : 1; }
        draw();
      });
    });
    el.querySelector("#unduhCsv").addEventListener("click", function () {
      window.ArunikaApp.downloadCsv("provinsi-indonesia-2024.csv", rows);
    });
    draw();
  }

  function renderMetodologi(el) {
    el.innerHTML =
      '<div class="wrap"><section class="block">' +
      '<p><a href="#/">&larr; Beranda</a> <span class="badge">Metodologi</span></p>' +
      "<h1>Metodologi dan sumber data</h1>" +
      '<p class="lede">Arunika menyajikan angka resmi Indonesia apa adanya: setiap angka di situs ini ' +
      "menyebutkan sumber dan tahunnya, dan halaman ini menjelaskan dari mana angka itu berasal dan bagaimana ia dihitung.</p>" +
      '<div class="grid-2">' +
      '<div class="card"><h3>Sumber data</h3><ul class="source-list">' + D.sumber.map(function (s) {
        return '<li><span class="src-name">' + esc(s.nama) + '</span> <span class="src-addr">(' + esc(s.alamat) + ")</span><br>" + esc(s.keterangan) + "</li>";
      }).join("") + "</ul></div>" +
      '<div class="card"><h3>Cara membaca angka</h3>' +
      "<ul class=\"fact-list\">" +
      "<li><span>Estimasi penduduk</span><span class=\"fact-value\">Pertengahan tahun</span></li>" +
      "<li><span>Pertumbuhan PDB</span><span class=\"fact-value\">Harga konstan 2010</span></li>" +
      "<li><span>Inflasi</span><span class=\"fact-value\">Desember, y-on-y</span></li>" +
      "<li><span>Pengangguran</span><span class=\"fact-value\">Sakernas Agustus</span></li>" +
      "<li><span>Kemiskinan</span><span class=\"fact-value\">Maret, garis kemiskinan BPS</span></li>" +
      "<li><span>IPM</span><span class=\"fact-value\">0–100, kategori tinggi ≥ 70</span></li>" +
      "</ul>" +
      '<p class="src">Angka provinsi dibulatkan ke 0,1 juta jiwa dari estimasi BPS pertengahan 2024; pembulatan dapat membuat jumlah provinsi tidak persis sama dengan total nasional.</p>' +
      '<button class="btn btn-teal" type="button" id="unduhSemua">Unduh semua indikator (CSV)</button></div>' +
      "</div></section>" +
      '<section class="block"><div class="callout"><p><b>Tentang Arunika.</b> Arunika adalah situs statistik independen yang ' +
      "dibuat untuk menampilkan data Indonesia dengan jelas. Arunika bukan situs resmi BPS atau pemerintah; " +
      "angka resmi selalu merujuk pada publikasi sumbernya, yang tercantum di setiap halaman.</p></div></section>" +
      "</div>";
    el.querySelector("#unduhSemua").addEventListener("click", function () {
      window.ArunikaApp.downloadAllCsv();
    });
  }

  window.ArunikaViews = {
    home: renderHome,
    penduduk: renderPenduduk,
    ekonomi: renderEkonomi,
    kesehatan: renderKesehatan,
    pendidikan: renderPendidikan,
    kerja: renderKerja,
    provinsi: renderProvinsi,
    metodologi: renderMetodologi
  };
})();
