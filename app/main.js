// Router dan utilitas unduhan Arunika.
// Rute hash: #/ (beranda), #/penduduk, #/ekonomi, #/kesehatan,
// #/pendidikan, #/kerja, #/provinsi, #/metodologi.
// Unduh CSV dibuat di peramban dari data.js — tanpa jaringan.
(function () {
  "use strict";

  var D = window.ARUNIKA_DATA;
  var VIEWS = window.ArunikaViews;
  var C = window.ArunikaCharts;

  var ROUTES = {
    "": "home",
    "penduduk": "penduduk",
    "ekonomi": "ekonomi",
    "kesehatan": "kesehatan",
    "pendidikan": "pendidikan",
    "kerja": "kerja",
    "provinsi": "provinsi",
    "metodologi": "metodologi"
  };

  function routeName() {
    var hash = window.location.hash || "#/";
    var path = hash.replace(/^#\/?/, "").split("?")[0].split("/")[0];
    return ROUTES[path] || "home";
  }

  function render() {
    var name = routeName();
    var el = document.getElementById("view");
    VIEWS[name](el);
    document.querySelectorAll(".mainnav a").forEach(function (a) {
      var href = a.getAttribute("href") || "";
      var key = href.replace(/^#\/?/, "").split("/")[0];
      a.classList.toggle("active", (ROUTES[key] || "home") === name);
    });
    document.title = "Arunika · Statistik Indonesia" + (name === "home" ? "" : " · " + name.charAt(0).toUpperCase() + name.slice(1));
    window.scrollTo(0, 0);
  }

  function csvCell(value) {
    var s = String(value);
    if (/[",\n]/.test(s)) return '"' + s.replace(/"/g, '""') + '"';
    return s;
  }

  function downloadText(filename, text) {
    var blob = new Blob([text], { type: "text/csv;charset=utf-8" });
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
  }

  function downloadCsv(filename, rows) {
    var lines = ["Provinsi,Pulau,Penduduk 2024 (juta jiwa),Pangsa nasional (%)"];
    rows.forEach(function (r) {
      lines.push([
        csvCell(r.nama),
        csvCell(r.pulau),
        csvCell(C.fmtNum(r.penduduk, 1)),
        csvCell(C.fmtNum((r.penduduk / 281.6) * 100, 1))
      ].join(","));
    });
    lines.push("Sumber,BPS estimasi pertengahan 2024,,");
    downloadText(filename, lines.join("\n"));
  }

  function downloadAllCsv() {
    var lines = ["Indikator,Nilai,Tahun,Sumber"];
    D.kpi.forEach(function (k) {
      lines.push([csvCell(k.label), csvCell(k.value), csvCell("2024"), csvCell(k.source)].join(","));
    });
    D.pendudukTahunan.forEach(function (r) {
      lines.push([csvCell("Penduduk"), csvCell(r.penduduk + " juta jiwa"), csvCell(r.tahun), csvCell("BPS")].join(","));
    });
    D.pdbTahunan.forEach(function (r) {
      lines.push([csvCell("PDB harga berlaku"), csvCell(r.pdb + " triliun rupiah"), csvCell(r.tahun), csvCell("BPS")].join(","));
      lines.push([csvCell("Pertumbuhan PDB"), csvCell(r.tumbuh + "%"), csvCell(r.tahun), csvCell("BPS")].join(","));
    });
    D.kemiskinanTahunan.forEach(function (r) {
      lines.push([csvCell("Penduduk miskin"), csvCell(r.persen + "% (" + r.juta + " juta jiwa)"), csvCell(r.tahun), csvCell("BPS")].join(","));
    });
    downloadText("indikator-indonesia-2024.csv", lines.join("\n"));
  }

  window.ArunikaApp = {
    downloadCsv: downloadCsv,
    downloadAllCsv: downloadAllCsv,
    render: render
  };

  window.addEventListener("hashchange", render);
  document.addEventListener("DOMContentLoaded", render);
})();
