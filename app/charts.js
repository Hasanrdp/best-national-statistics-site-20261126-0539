// Pembangun grafik SVG untuk Arunika. Semua grafik digambar sebagai SVG
// murni dari data di data.js, tanpa pustaka luar, supaya muatan awal
// tetap kecil dan situs bekerja tanpa jaringan.
(function () {
  "use strict";

  var INK = "#1c2420";
  var MUTED = "#5c6b64";
  var GRID = "#e3e0d8";
  var TEAL = "#0e4f4a";
  var TEAL_SOFT = "#2a7a72";
  var AMBER = "#d97706";
  var AMBER_SOFT = "#e8a317";
  var RED = "#b3402e";
  var PALETTE = [TEAL, AMBER, "#3a6ea5", "#7a5ea8", "#4d8a4f", "#b3402e"];

  function esc(text) {
    return String(text)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function niceMax(max) {
    var step = Math.pow(10, Math.floor(Math.log10(max)));
    var scaled = max / step;
    var stops = [1, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10];
    var nice = 10;
    for (var i = 0; i < stops.length; i++) {
      if (scaled <= stops[i]) { nice = stops[i]; break; }
    }
    return nice * step;
  }

  function fmtNum(n, decimals) {
    return Number(n).toLocaleString("id-ID", {
      minimumFractionDigits: decimals || 0,
      maximumFractionDigits: decimals || 0
    });
  }

  // Grafik garis dengan titik dan label nilai.
  // points: [{x: label, y: number}], opts: {height, color, unit, decimals, ymin}
  function lineChart(points, opts) {
    var o = opts || {};
    var w = o.width || 640;
    var h = o.height || 260;
    var padL = 46, padR = 14, padT = 18, padB = 30;
    var values = points.map(function (p) { return p.y; });
    var min = o.ymin !== undefined ? o.ymin : Math.min.apply(null, values);
    var max = niceMax(Math.max.apply(null, values) * 1.05);
    if (min > 0 && (max - min) / max > 0.6) min = 0;
    // Ketika datanya berkumpul dalam pita sempit (misalnya IPM 71–75),
    // longgarkan batas bawah supaya garis tidak menempel di dasar.
    if (min > 0 && (max - min) / max < 0.35) {
      min = Math.max(0, min - (max - min) * 0.3);
    }
    var iw = w - padL - padR;
    var ih = h - padT - padB;
    function X(i) { return padL + (iw * i) / (points.length - 1); }
    function Y(v) { return padT + ih - ((v - min) / (max - min)) * ih; }
    var out = [];
    out.push('<svg viewBox="0 0 ' + w + ' ' + h + '" role="img" aria-label="Grafik garis">');
    var ticks = 4, t;
    for (t = 0; t <= ticks; t++) {
      var tv = min + ((max - min) * t) / ticks;
      var ty = Y(tv);
      out.push('<line x1="' + padL + '" y1="' + ty.toFixed(1) + '" x2="' + (w - padR) + '" y2="' + ty.toFixed(1) + '" stroke="' + GRID + '" stroke-width="1"/>');
      out.push('<text x="' + (padL - 8) + '" y="' + (ty + 4).toFixed(1) + '" text-anchor="end" font-size="11" fill="' + MUTED + '">' + esc(fmtNum(tv, o.decimals || 0)) + '</text>');
    }
    var path = points.map(function (p, i) {
      return (i === 0 ? "M" : "L") + X(i).toFixed(1) + " " + Y(p.y).toFixed(1);
    }).join(" ");
    var area = path + " L" + X(points.length - 1).toFixed(1) + " " + (padT + ih).toFixed(1) +
      " L" + X(0).toFixed(1) + " " + (padT + ih).toFixed(1) + " Z";
    out.push('<path d="' + area + '" fill="' + (o.color || TEAL) + '" fill-opacity="0.08"/>');
    out.push('<path d="' + path + '" fill="none" stroke="' + (o.color || TEAL) + '" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>');
    points.forEach(function (p, i) {
      var cx = X(i), cy = Y(p.y);
      out.push('<circle cx="' + cx.toFixed(1) + '" cy="' + cy.toFixed(1) + '" r="3.5" fill="#fff" stroke="' + (o.color || TEAL) + '" stroke-width="2"/>');
      if (o.showValues) {
        out.push('<text x="' + cx.toFixed(1) + '" y="' + (cy - 10).toFixed(1) + '" text-anchor="middle" font-size="11" font-weight="600" fill="' + INK + '">' + esc(fmtNum(p.y, o.decimals || 0)) + '</text>');
      }
      if (i % Math.ceil(points.length / 6) === 0 || i === points.length - 1) {
        out.push('<text x="' + cx.toFixed(1) + '" y="' + (h - 8) + '" text-anchor="middle" font-size="11" fill="' + MUTED + '">' + esc(p.x) + '</text>');
      }
    });
    out.push("</svg>");
    return out.join("");
  }

  // Grafik batang vertikal.
  // bars: [{x: label, y: number}], opts: {height, color, decimals, highlightLast}
  function barChart(bars, opts) {
    var o = opts || {};
    var w = o.width || 640;
    var h = o.height || 260;
    var padL = 46, padR = 14, padT = 22, padB = 30;
    var values = bars.map(function (b) { return b.y; });
    var max = niceMax(Math.max.apply(null, values.map(Math.abs)) * 1.08);
    var min = Math.min.apply(null, values) < 0 ? -max * 0.25 : 0;
    var iw = w - padL - padR;
    var ih = h - padT - padB;
    var slot = iw / bars.length;
    var bw = Math.min(44, slot * 0.62);
    function Y(v) { return padT + ih - ((v - min) / (max - min)) * ih; }
    var out = [];
    out.push('<svg viewBox="0 0 ' + w + ' ' + h + '" role="img" aria-label="Grafik batang">');
    var ticks = 4, t;
    for (t = 0; t <= ticks; t++) {
      var tv = min + ((max - min) * t) / ticks;
      var ty = Y(tv);
      out.push('<line x1="' + padL + '" y1="' + ty.toFixed(1) + '" x2="' + (w - padR) + '" y2="' + ty.toFixed(1) + '" stroke="' + GRID + '" stroke-width="1"/>');
      out.push('<text x="' + (padL - 8) + '" y="' + (ty + 4).toFixed(1) + '" text-anchor="end" font-size="11" fill="' + MUTED + '">' + esc(fmtNum(tv, o.decimals || 0)) + '</text>');
    }
    var zeroY = Y(0);
    bars.forEach(function (b, i) {
      var cx = padL + slot * i + slot / 2;
      var yTop = Y(Math.max(b.y, 0));
      var yBot = b.y >= 0 ? zeroY : Y(b.y);
      var fill = b.y < 0 ? RED : (o.highlightLast && i === bars.length - 1 ? AMBER : (o.color || TEAL));
      out.push('<rect x="' + (cx - bw / 2).toFixed(1) + '" y="' + yTop.toFixed(1) + '" width="' + bw.toFixed(1) + '" height="' + Math.max(1, yBot - yTop).toFixed(1) + '" rx="3" fill="' + fill + '"/>');
      if (o.showValues) {
        var vy = b.y >= 0 ? yTop - 7 : yBot + 14;
        out.push('<text x="' + cx.toFixed(1) + '" y="' + vy.toFixed(1) + '" text-anchor="middle" font-size="11" font-weight="600" fill="' + INK + '">' + esc(fmtNum(b.y, o.decimals || 0)) + '</text>');
      }
      out.push('<text x="' + cx.toFixed(1) + '" y="' + (h - 8) + '" text-anchor="middle" font-size="11" fill="' + MUTED + '">' + esc(b.x) + '</text>');
    });
    out.push("</svg>");
    return out.join("");
  }

  // Grafik batang horizontal dengan label di kiri.
  // rows: [{label, value}], opts: {barHeight, decimals, unit}
  function hbarChart(rows, opts) {
    var o = opts || {};
    var w = o.width || 640;
    var rowH = o.rowHeight || 34;
    var h = rows.length * rowH + 16;
    var labelW = o.labelWidth || 190;
    var padR = 56;
    var max = Math.max.apply(null, rows.map(function (r) { return r.value; }));
    var out = [];
    out.push('<svg viewBox="0 0 ' + w + ' ' + h + '" role="img" aria-label="Grafik batang horizontal">');
    rows.forEach(function (r, i) {
      var y = 8 + i * rowH;
      var bw = ((w - labelW - padR) * r.value) / max;
      var color = PALETTE[i % PALETTE.length];
      out.push('<text x="0" y="' + (y + 15) + '" font-size="12" fill="' + INK + '">' + esc(r.label) + '</text>');
      out.push('<rect x="' + labelW + '" y="' + y + '" width="' + Math.max(2, bw).toFixed(1) + '" height="20" rx="4" fill="' + color + '"/>');
      out.push('<text x="' + (labelW + Math.max(2, bw) + 8).toFixed(1) + '" y="' + (y + 15) + '" font-size="12" font-weight="600" fill="' + INK + '">' + esc(fmtNum(r.value, o.decimals === undefined ? 1 : o.decimals)) + (o.unit ? " " + esc(o.unit) : "") + '</text>');
    });
    out.push("</svg>");
    return out.join("");
  }

  // Diagram donat dengan legenda.
  // slices: [{label, value}], opts: {size}
  function donutChart(slices, opts) {
    var o = opts || {};
    var size = o.size || 220;
    var cx = size / 2, cy = size / 2, r = size / 2 - 8, inner = r * 0.62;
    var total = slices.reduce(function (s, x) { return s + x.value; }, 0);
    var out = [];
    out.push('<svg viewBox="0 0 ' + size + ' ' + size + '" role="img" aria-label="Diagram donat">');
    var angle = -Math.PI / 2;
    slices.forEach(function (s, i) {
      var frac = s.value / total;
      var a0 = angle, a1 = angle + frac * Math.PI * 2;
      angle = a1;
      var large = frac > 0.5 ? 1 : 0;
      var x0 = cx + r * Math.cos(a0), y0 = cy + r * Math.sin(a0);
      var x1 = cx + r * Math.cos(a1), y1 = cy + r * Math.sin(a1);
      var xi1 = cx + inner * Math.cos(a1), yi1 = cy + inner * Math.sin(a1);
      var xi0 = cx + inner * Math.cos(a0), yi0 = cy + inner * Math.sin(a0);
      var color = PALETTE[i % PALETTE.length];
      if (frac >= 0.999) {
        out.push('<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="' + color + '"/>');
        out.push('<circle cx="' + cx + '" cy="' + cy + '" r="' + inner + '" fill="#fff"/>');
      } else {
        out.push('<path d="M' + x0.toFixed(1) + ' ' + y0.toFixed(1) + ' A' + r + ' ' + r + ' 0 ' + large + ' 1 ' + x1.toFixed(1) + ' ' + y1.toFixed(1) +
          ' L' + xi1.toFixed(1) + ' ' + yi1.toFixed(1) + ' A' + inner + ' ' + inner + ' 0 ' + large + ' 0 ' + xi0.toFixed(1) + ' ' + yi0.toFixed(1) + ' Z" fill="' + color + '"/>');
      }
    });
    out.push('<text x="' + cx + '" y="' + (cy - 2) + '" text-anchor="middle" font-size="22" font-weight="700" fill="' + INK + '">' + esc(fmtNum(total, 1)) + '%</text>');
    out.push('<text x="' + cx + '" y="' + (cy + 18) + '" text-anchor="middle" font-size="11" fill="' + MUTED + '">total pangsa</text>');
    out.push("</svg>");
    return out.join("");
  }

  window.ArunikaCharts = {
    lineChart: lineChart,
    barChart: barChart,
    hbarChart: hbarChart,
    donutChart: donutChart,
    esc: esc,
    fmtNum: fmtNum,
    palette: PALETTE,
    colors: { ink: INK, muted: MUTED, teal: TEAL, tealSoft: TEAL_SOFT, amber: AMBER, amberSoft: AMBER_SOFT, red: RED }
  };
})();
