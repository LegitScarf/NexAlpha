<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>NexAlpha — Project README</title>
<link href="https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Orbitron:wght@400;700;900&family=Syne:wght@300;400;600;800&display=swap" rel="stylesheet">
<style>
  :root {
    --bg: #020507;
    --surface: #070e13;
    --surface2: #0b1820;
    --green: #00ff88;
    --amber: #ffb800;
    --red: #ff3b5c;
    --cyan: #00d4ff;
    --blue: #0066ff;
    --text: #c8dde8;
    --text-dim: #4a6a7a;
    --border: rgba(0,255,136,0.12);
    --glow: 0 0 30px rgba(0,255,136,0.25);
    --glow-amber: 0 0 30px rgba(255,184,0,0.25);
    --glow-cyan: 0 0 30px rgba(0,212,255,0.25);
  }

  * { margin:0; padding:0; box-sizing:border-box; }
  html { scroll-behavior: smooth; }

  body {
    background: var(--bg);
    color: var(--text);
    font-family: 'Syne', sans-serif;
    overflow-x: hidden;
    min-height: 100vh;
  }

  /* ── CANVAS PARTICLES ── */
  #particles {
    position: fixed;
    inset: 0;
    z-index: 0;
    pointer-events: none;
  }

  /* ── SCAN LINES ── */
  body::before {
    content:'';
    position:fixed; inset:0;
    background: repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.04) 3px, rgba(0,0,0,0.04) 4px);
    pointer-events:none;
    z-index:9998;
  }

  /* ── GRID BG ── */
  body::after {
    content:'';
    position:fixed; inset:0;
    background-image:
      linear-gradient(rgba(0,255,136,0.025) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0,255,136,0.025) 1px, transparent 1px);
    background-size: 48px 48px;
    pointer-events:none;
    z-index:0;
  }

  .wrap {
    position: relative;
    z-index: 10;
    max-width: 960px;
    margin: 0 auto;
    padding: 0 32px 120px;
  }

  /* ── HERO ── */
  .hero {
    padding: 80px 0 60px;
    text-align: center;
    position: relative;
  }

  .hero-glow {
    position: absolute;
    top: 50%; left: 50%;
    transform: translate(-50%,-50%);
    width: 600px; height: 300px;
    background: radial-gradient(ellipse, rgba(0,255,136,0.06) 0%, transparent 70%);
    pointer-events: none;
  }

  .badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-family: 'Share Tech Mono', monospace;
    font-size: 10px;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: var(--green);
    border: 1px solid rgba(0,255,136,0.25);
    background: rgba(0,255,136,0.05);
    padding: 6px 16px;
    margin-bottom: 32px;
    animation: fadeSlideDown 0.8s ease forwards;
    opacity: 0;
  }

  .badge-dot {
    width: 5px; height: 5px;
    background: var(--green);
    border-radius: 50%;
    animation: pulse 1.5s ease-in-out infinite;
  }

  @keyframes pulse {
    0%,100% { opacity:1; transform: scale(1); }
    50% { opacity:0.4; transform: scale(0.7); }
  }

  .hero h1 {
    font-family: 'Orbitron', monospace;
    font-size: clamp(36px, 6vw, 80px);
    font-weight: 900;
    line-height: 1;
    letter-spacing: -2px;
    margin-bottom: 20px;
    animation: fadeSlideDown 0.8s ease 0.2s forwards;
    opacity: 0;
  }

  .hero h1 .g { color: var(--green); text-shadow: var(--glow); }
  .hero h1 .a { color: var(--amber); text-shadow: var(--glow-amber); }
  .hero h1 .w { color: var(--text); }

  .hero-sub {
    font-size: 16px;
    color: var(--text-dim);
    line-height: 1.7;
    max-width: 560px;
    margin: 0 auto 40px;
    animation: fadeSlideDown 0.8s ease 0.4s forwards;
    opacity: 0;
  }

  .hero-sub strong { color: var(--text); }

  .hero-tags {
    display: flex;
    justify-content: center;
    gap: 12px;
    flex-wrap: wrap;
    animation: fadeSlideDown 0.8s ease 0.6s forwards;
    opacity: 0;
  }

  .htag {
    font-family: 'Share Tech Mono', monospace;
    font-size: 10px;
    letter-spacing: 2px;
    padding: 5px 12px;
    border: 1px solid;
    text-transform: uppercase;
  }

  .htag.green { color: var(--green); border-color: rgba(0,255,136,0.3); background: rgba(0,255,136,0.05); }
  .htag.amber { color: var(--amber); border-color: rgba(255,184,0,0.3); background: rgba(255,184,0,0.05); }
  .htag.cyan  { color: var(--cyan);  border-color: rgba(0,212,255,0.3);  background: rgba(0,212,255,0.05); }
  .htag.red   { color: var(--red);   border-color: rgba(255,59,92,0.3);   background: rgba(255,59,92,0.05); }

  @keyframes fadeSlideDown {
    from { opacity:0; transform: translateY(-20px); }
    to   { opacity:1; transform: translateY(0); }
  }

  /* ── DIVIDER ── */
  .divider {
    height: 1px;
    background: linear-gradient(to right, transparent, rgba(0,255,136,0.3), transparent);
    margin: 48px 0;
  }

  /* ── STATS ROW ── */
  .stats-row {
    display: grid;
    grid-template-columns: repeat(4,1fr);
    gap: 2px;
    margin: 48px 0;
  }

  .stat-box {
    background: var(--surface);
    border: 1px solid var(--border);
    padding: 28px 20px;
    text-align: center;
    position: relative;
    overflow: hidden;
    transition: border-color 0.3s;
  }

  .stat-box::before {
    content:'';
    position:absolute; bottom:0; left:0; right:0;
    height: 2px;
    background: var(--green);
    transform: scaleX(0);
    transition: transform 0.4s ease;
    transform-origin: left;
  }

  .stat-box:hover { border-color: rgba(0,255,136,0.35); }
  .stat-box:hover::before { transform: scaleX(1); }

  .stat-val {
    font-family: 'Orbitron', monospace;
    font-size: 32px;
    font-weight: 900;
    color: var(--green);
    display: block;
    text-shadow: var(--glow);
    line-height: 1;
    margin-bottom: 8px;
  }

  .stat-lbl {
    font-family: 'Share Tech Mono', monospace;
    font-size: 9px;
    letter-spacing: 2px;
    color: var(--text-dim);
    text-transform: uppercase;
  }

  /* ── SECTION ── */
  .section {
    margin: 64px 0;
    opacity: 0;
    transform: translateY(40px);
    transition: opacity 0.7s ease, transform 0.7s ease;
  }

  .section.visible {
    opacity: 1;
    transform: none;
  }

  .section-header {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 32px;
  }

  .section-icon {
    width: 40px; height: 40px;
    border: 1px solid var(--border);
    display: flex; align-items: center; justify-content: center;
    font-size: 16px;
    background: var(--surface);
    flex-shrink: 0;
  }

  .section-label {
    font-family: 'Share Tech Mono', monospace;
    font-size: 9px;
    letter-spacing: 3px;
    color: var(--green);
    text-transform: uppercase;
    margin-bottom: 4px;
  }

  .section-title {
    font-family: 'Orbitron', monospace;
    font-size: clamp(18px, 2.5vw, 26px);
    font-weight: 700;
    color: var(--text);
    line-height: 1.2;
  }

  .section-title em { font-style:normal; color: var(--green); }

  /* ── PRODUCT CARDS ── */
  .product-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }

  .product-card {
    background: var(--surface);
    border: 1px solid var(--border);
    padding: 32px;
    position: relative;
    overflow: hidden;
    transition: all 0.35s;
    cursor: default;
  }

  .product-card::after {
    content:'';
    position:absolute;
    top:-60%; left:-60%;
    width:220%; height:220%;
    background: radial-gradient(circle, rgba(0,255,136,0.04) 0%, transparent 60%);
    opacity:0;
    transition: opacity 0.4s;
    pointer-events:none;
  }

  .product-card:hover { border-color: rgba(0,255,136,0.35); transform: translateY(-4px); box-shadow: 0 20px 60px rgba(0,0,0,0.4); }
  .product-card:hover::after { opacity:1; }

  .product-card.amber-card:hover { border-color: rgba(255,184,0,0.35); }
  .product-card.amber-card::after { background: radial-gradient(circle, rgba(255,184,0,0.04) 0%, transparent 60%); }

  .pc-tag {
    font-family: 'Share Tech Mono', monospace;
    font-size: 9px;
    letter-spacing: 3px;
    text-transform: uppercase;
    padding: 4px 10px;
    display: inline-block;
    margin-bottom: 16px;
  }

  .pc-tag.green { color: var(--green); border: 1px solid rgba(0,255,136,0.3); background: rgba(0,255,136,0.06); }
  .pc-tag.amber { color: var(--amber); border: 1px solid rgba(255,184,0,0.3);  background: rgba(255,184,0,0.06); }

  .pc-name {
    font-family: 'Orbitron', monospace;
    font-size: 22px;
    font-weight: 900;
    color: var(--text);
    margin-bottom: 4px;
  }

  .pc-name .g { color: var(--green); }
  .pc-name .a { color: var(--amber); }

  .pc-sub {
    font-family: 'Share Tech Mono', monospace;
    font-size: 10px;
    letter-spacing: 2px;
    color: var(--text-dim);
    text-transform: uppercase;
    margin-bottom: 16px;
  }

  .pc-desc {
    font-size: 13px;
    color: var(--text-dim);
    line-height: 1.7;
    margin-bottom: 20px;
  }

  .pc-features {
    display: flex;
    flex-direction: column;
    gap: 7px;
  }

  .pf {
    font-family: 'Share Tech Mono', monospace;
    font-size: 11px;
    color: var(--text-dim);
    display: flex;
    align-items: flex-start;
    gap: 8px;
    line-height: 1.5;
  }

  .pf::before { content: '▸'; flex-shrink:0; margin-top:1px; }
  .pf.g::before { color: var(--green); }
  .pf.a::before { color: var(--amber); }

  .pc-status {
    position: absolute;
    top: 20px; right: 20px;
    font-family: 'Share Tech Mono', monospace;
    font-size: 9px;
    letter-spacing: 2px;
    color: var(--red);
    border: 1px solid rgba(255,59,92,0.35);
    background: rgba(255,59,92,0.08);
    padding: 3px 8px;
    text-transform: uppercase;
  }

  /* ── TECH TABLE ── */
  .tech-table {
    width: 100%;
    border-collapse: collapse;
    font-family: 'Share Tech Mono', monospace;
    font-size: 12px;
  }

  .tech-table thead tr {
    border-bottom: 1px solid rgba(0,255,136,0.2);
  }

  .tech-table th {
    font-size: 9px;
    letter-spacing: 3px;
    color: var(--green);
    text-transform: uppercase;
    padding: 12px 16px;
    text-align: left;
    font-weight: 400;
  }

  .tech-table td {
    padding: 14px 16px;
    color: var(--text-dim);
    border-bottom: 1px solid rgba(255,255,255,0.04);
    vertical-align: top;
    line-height: 1.6;
    transition: background 0.2s;
  }

  .tech-table tr:hover td { background: rgba(0,255,136,0.03); }

  .tech-table td:first-child {
    color: var(--cyan);
    white-space: nowrap;
    width: 180px;
  }

  /* ── TERMINAL ── */
  .terminal {
    background: #010608;
    border: 1px solid rgba(0,255,136,0.18);
    position: relative;
    overflow: hidden;
  }

  .terminal::before {
    content:'';
    position:absolute; inset:0;
    background: repeating-linear-gradient(0deg, transparent, transparent 24px, rgba(0,255,136,0.015) 24px, rgba(0,255,136,0.015) 25px);
    pointer-events:none;
  }

  .term-bar {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px 16px;
    border-bottom: 1px solid rgba(0,255,136,0.1);
    background: rgba(0,255,136,0.03);
  }

  .term-dot { width:10px; height:10px; border-radius:50%; }
  .term-dot.r { background: #ff5f57; }
  .term-dot.y { background: #ffbd2e; }
  .term-dot.g { background: #28ca41; }

  .term-title {
    font-family: 'Share Tech Mono', monospace;
    font-size: 10px;
    color: var(--text-dim);
    letter-spacing: 2px;
    margin-left: 8px;
  }

  .term-body {
    padding: 24px 24px 32px;
    font-family: 'Share Tech Mono', monospace;
    font-size: 12px;
    line-height: 2;
  }

  .tl { display: block; }
  .tl .p  { color: var(--green); }
  .tl .c  { color: var(--cyan); }
  .tl .o  { color: var(--text-dim); padding-left: 20px; }
  .tl .up { color: var(--green); }
  .tl .dn { color: var(--red); }
  .tl .am { color: var(--amber); }
  .tl .cm { color: #3a5a6a; }

  .tcursor {
    display: inline-block;
    width: 8px; height: 13px;
    background: var(--green);
    vertical-align: middle;
    animation: blink 0.9s step-end infinite;
  }

  @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }

  /* ── ROADMAP ── */
  .roadmap {
    display: flex;
    flex-direction: column;
    gap: 0;
    position: relative;
  }

  .roadmap::before {
    content:'';
    position:absolute;
    left: 19px; top:0; bottom:0;
    width:1px;
    background: linear-gradient(to bottom, var(--green), rgba(0,255,136,0.05));
  }

  .rm-item {
    display: flex;
    align-items: flex-start;
    gap: 20px;
    padding: 20px 0;
    border-bottom: 1px solid rgba(255,255,255,0.04);
    position: relative;
    transition: all 0.3s;
  }

  .rm-item:last-child { border-bottom: none; }
  .rm-item:hover { padding-left: 8px; }

  .rm-dot {
    width: 38px; height: 38px;
    border-radius: 50%;
    border: 1px solid;
    display: flex; align-items: center; justify-content: center;
    font-size: 14px;
    flex-shrink: 0;
    background: var(--bg);
    position: relative;
    z-index: 1;
    transition: all 0.3s;
  }

  .rm-dot.done  { border-color: var(--green); background: rgba(0,255,136,0.08); }
  .rm-dot.todo  { border-color: var(--text-dim); background: var(--bg); }
  .rm-dot.next  { border-color: var(--amber); background: rgba(255,184,0,0.08); animation: rmPulse 2s ease-in-out infinite; }

  @keyframes rmPulse {
    0%,100% { box-shadow: 0 0 0 0 rgba(255,184,0,0); }
    50% { box-shadow: 0 0 0 6px rgba(255,184,0,0.1); }
  }

  .rm-item:hover .rm-dot.todo { border-color: var(--text); }

  .rm-content { padding-top: 6px; }

  .rm-title {
    font-family: 'Orbitron', monospace;
    font-size: 13px;
    font-weight: 700;
    color: var(--text);
    margin-bottom: 4px;
  }

  .rm-desc {
    font-size: 13px;
    color: var(--text-dim);
    line-height: 1.6;
  }

  .rm-item.done-item .rm-title { color: var(--green); }
  .rm-item.next-item .rm-title { color: var(--amber); }

  /* ── STRUCTURE ── */
  .file-tree {
    background: var(--surface);
    border: 1px solid var(--border);
    padding: 28px 32px;
    font-family: 'Share Tech Mono', monospace;
    font-size: 12px;
    line-height: 2.2;
  }

  .ft-dir { color: var(--cyan); }
  .ft-file { color: var(--text-dim); }
  .ft-file span { color: var(--green); }
  .ft-comment { color: #2a4a5a; }

  /* ── DISCLAIMER ── */
  .disclaimer {
    background: rgba(255,59,92,0.04);
    border: 1px solid rgba(255,59,92,0.2);
    padding: 24px 28px;
    display: flex;
    gap: 16px;
    align-items: flex-start;
  }

  .disc-icon {
    font-size: 18px;
    flex-shrink: 0;
    color: var(--red);
    line-height: 1.6;
  }

  .disc-text {
    font-family: 'Share Tech Mono', monospace;
    font-size: 11px;
    color: #7a4a52;
    letter-spacing: 0.5px;
    line-height: 1.8;
  }

  .disc-text strong { color: var(--red); }

  /* ── FOOTER ── */
  .footer {
    margin-top: 80px;
    padding-top: 40px;
    border-top: 1px solid var(--border);
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 20px;
  }

  .footer-logo {
    font-family: 'Orbitron', monospace;
    font-size: 20px;
    font-weight: 900;
    color: var(--green);
    text-shadow: var(--glow);
    letter-spacing: 3px;
  }

  .footer-logo span { color: var(--amber); }

  .footer-copy {
    font-family: 'Share Tech Mono', monospace;
    font-size: 10px;
    color: var(--text-dim);
    letter-spacing: 1px;
    line-height: 2;
    text-align: right;
  }

  /* ── GLOW LINES (decoration) ── */
  .gline {
    height: 1px;
    margin: 64px 0;
    background: linear-gradient(to right, transparent, rgba(0,212,255,0.2), transparent);
  }

  /* ── CODE BLOCK ── */
  .code-block {
    background: #010608;
    border: 1px solid rgba(0,212,255,0.12);
    padding: 20px 24px;
    font-family: 'Share Tech Mono', monospace;
    font-size: 12px;
    line-height: 2;
    overflow-x: auto;
    position: relative;
  }

  .code-block .cb-lang {
    position: absolute;
    top: 10px; right: 14px;
    font-size: 9px;
    letter-spacing: 2px;
    color: var(--text-dim);
    text-transform: uppercase;
  }

  .cb-kw  { color: var(--cyan); }
  .cb-str { color: var(--amber); }
  .cb-cmt { color: #2a4a5a; }
  .cb-fn  { color: var(--green); }
  .cb-num { color: var(--red); }

  /* ── NOTE BOX ── */
  .note-box {
    background: rgba(255,184,0,0.04);
    border-left: 3px solid var(--amber);
    padding: 16px 20px;
    margin: 20px 0;
  }

  .note-box p {
    font-family: 'Share Tech Mono', monospace;
    font-size: 11px;
    color: #8a6a30;
    letter-spacing: 0.5px;
    line-height: 1.8;
  }

  .note-box strong { color: var(--amber); }

  /* ── SCROLL PROGRESS ── */
  #progress {
    position: fixed;
    top: 0; left: 0;
    height: 2px;
    background: linear-gradient(to right, var(--green), var(--cyan));
    z-index: 9999;
    transition: width 0.1s linear;
    box-shadow: 0 0 10px rgba(0,255,136,0.5);
  }

  /* ── NAV SIDEBAR DOTS ── */
  #nav-dots {
    position: fixed;
    right: 24px;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    flex-direction: column;
    gap: 12px;
    z-index: 100;
  }

  .nav-dot {
    width: 6px; height: 6px;
    border: 1px solid var(--text-dim);
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.3s;
    position: relative;
  }

  .nav-dot.active {
    background: var(--green);
    border-color: var(--green);
    box-shadow: 0 0 8px rgba(0,255,136,0.6);
  }

  .nav-dot:hover { border-color: var(--green); }

  .nav-dot .nd-label {
    position: absolute;
    right: 16px; top: 50%;
    transform: translateY(-50%);
    font-family: 'Share Tech Mono', monospace;
    font-size: 9px;
    letter-spacing: 1px;
    color: var(--text-dim);
    white-space: nowrap;
    opacity: 0;
    transition: opacity 0.2s;
    pointer-events: none;
    text-transform: uppercase;
  }

  .nav-dot:hover .nd-label { opacity: 1; }

  @media (max-width: 700px) {
    .product-grid { grid-template-columns: 1fr; }
    .stats-row { grid-template-columns: 1fr 1fr; }
    #nav-dots { display: none; }
    .footer { flex-direction: column; text-align: center; }
    .footer-copy { text-align: center; }
  }
</style>
</head>
<body>

<div id="progress"></div>
<canvas id="particles"></canvas>

<div id="nav-dots">
  <div class="nav-dot active" onclick="scrollTo(0,0)"><span class="nd-label">Top</span></div>
  <div class="nav-dot" onclick="document.getElementById('s-overview').scrollIntoView({behavior:'smooth'})"><span class="nd-label">Overview</span></div>
  <div class="nav-dot" onclick="document.getElementById('s-products').scrollIntoView({behavior:'smooth'})"><span class="nd-label">Products</span></div>
  <div class="nav-dot" onclick="document.getElementById('s-tech').scrollIntoView({behavior:'smooth'})"><span class="nd-label">Tech Stack</span></div>
  <div class="nav-dot" onclick="document.getElementById('s-deploy').scrollIntoView({behavior:'smooth'})"><span class="nd-label">Deploy</span></div>
  <div class="nav-dot" onclick="document.getElementById('s-roadmap').scrollIntoView({behavior:'smooth'})"><span class="nd-label">Roadmap</span></div>
</div>

<div class="wrap">

  <!-- HERO -->
  <div class="hero">
    <div class="hero-glow"></div>
    <div class="badge"><div class="badge-dot"></div> Project Documentation · v0.1 Beta</div>
    <h1>
      <span class="g">NEX</span><span class="a">ALPHA</span><br>
      <span class="w" style="font-size:0.45em; letter-spacing:4px; font-weight:400;">INTELLIGENT MARKET SYSTEMS</span>
    </h1>
    <p class="hero-sub">
      A static company website built to showcase two <strong>AI-powered financial intelligence products</strong> for the Indian markets — deployed on GitHub Pages.
    </p>
    <div class="hero-tags">
      <span class="htag green">HTML5</span>
      <span class="htag amber">GitHub Pages</span>
      <span class="htag cyan">Multi-Agent AI</span>
      <span class="htag green">Nifty50</span>
      <span class="htag red">Beta v0.1</span>
      <span class="htag cyan">AWS ap-south-1</span>
    </div>
  </div>

  <!-- STATS -->
  <div class="stats-row section" id="s-overview">
    <div class="stat-box">
      <span class="stat-val" data-target="2">0</span>
      <span class="stat-lbl">Live Products</span>
    </div>
    <div class="stat-box">
      <span class="stat-val" data-target="50">0</span>
      <span class="stat-lbl">Instruments Tracked</span>
    </div>
    <div class="stat-box">
      <span class="stat-val" style="font-size:22px; padding-top:4px" data-static="1">1</span>
      <span class="stat-lbl">HTML File</span>
    </div>
    <div class="stat-box">
      <span class="stat-val" style="font-size:22px; padding-top:4px" data-static="24/7">24/7</span>
      <span class="stat-lbl">Market Intelligence</span>
    </div>
  </div>

  <!-- OVERVIEW TERMINAL -->
  <div class="section" id="s-overview2">
    <div class="section-header">
      <div class="section-icon">◈</div>
      <div>
        <div class="section-label">// Overview</div>
        <div class="section-title">What is <em>NexAlpha</em>?</div>
      </div>
    </div>

    <div class="terminal">
      <div class="term-bar">
        <div class="term-dot r"></div>
        <div class="term-dot y"></div>
        <div class="term-dot g"></div>
        <span class="term-title">nexalpha — project_overview.sh</span>
      </div>
      <div class="term-body">
        <span class="tl"><span class="p">$</span> <span class="c">cat README.overview</span></span>
        <span class="tl"><span class="o cm">──────────────────────────────────────────────────</span></span>
        <span class="tl"><span class="o">NexAlpha is the product brand for a suite of multi-agent</span></span>
        <span class="tl"><span class="o">AI systems built for the Indian financial markets.</span></span>
        <span class="tl"><span class="o cm">──────────────────────────────────────────────────</span></span>
        <span class="tl"><span class="p">$</span> <span class="c">ls -la products/</span></span>
        <span class="tl"><span class="o"><span class="up">drwxr-xr-x</span>  OptiTrade/         <span class="am">[ F&O · OPTIONS · NIFTY50 ]</span>    STATUS: <span class="up">BETA LIVE</span></span></span>
        <span class="tl"><span class="o"><span class="up">drwxr-xr-x</span>  BharatAlpha/       <span class="am">[ EQUITY · RESEARCH · BSE·NSE ]</span> STATUS: <span class="up">BETA LIVE</span></span></span>
        <span class="tl"><span class="p">$</span> <span class="c">git log --oneline -3</span></span>
        <span class="tl"><span class="o"><span class="am">a1f9c3e</span> feat: initial static site deployment</span></span>
        <span class="tl"><span class="o"><span class="am">8b2d71a</span> feat: add OptiTrade product card with SVG chart</span></span>
        <span class="tl"><span class="o"><span class="am">3e50c9f</span> feat: add BharatAlpha product card with animations</span></span>
        <span class="tl"><span class="p">$</span> <span class="tcursor"></span></span>
      </div>
    </div>
  </div>

  <div class="divider"></div>

  <!-- PRODUCTS -->
  <div class="section" id="s-products">
    <div class="section-header">
      <div class="section-icon">⬡</div>
      <div>
        <div class="section-label">// Products</div>
        <div class="section-title">Two AI-Native <em>Market Systems</em></div>
      </div>
    </div>

    <div class="product-grid">
      <div class="product-card">
        <div class="pc-status">Beta v0.1</div>
        <div class="pc-tag green">F&O · Options · Nifty50</div>
        <div class="pc-name"><span class="g">Opti</span>Trade</div>
        <div class="pc-sub">Multi-Agent Options Trading Assistant</div>
        <p class="pc-desc">A sophisticated multi-agent system purpose-built for Nifty50 Futures & Options trading. Multiple specialized agents collaborate in real time to scan the market and surface actionable signals.</p>
        <div class="pc-features">
          <span class="pf g">Real-time Nifty50 options chain monitoring</span>
          <span class="pf g">Multi-agent signal synthesis & validation</span>
          <span class="pf g">Open interest and IV analysis</span>
          <span class="pf g">Risk-calibrated trade recommendations</span>
          <span class="pf g">Live P&L tracking and Greeks dashboard</span>
        </div>
      </div>

      <div class="product-card amber-card">
        <div class="pc-status">Beta v0.1</div>
        <div class="pc-tag amber">Equity · Research · India</div>
        <div class="pc-name"><span class="a">Bharat</span>Alpha</div>
        <div class="pc-sub">AI Equity Research & Intelligence Platform</div>
        <p class="pc-desc">A deep equity research platform built specifically for the Indian market. Designed to give investors access to institutional-grade fundamental and sector-level intelligence.</p>
        <div class="pc-features">
          <span class="pf a">BSE and NSE comprehensive coverage</span>
          <span class="pf a">AI-driven fundamental & technical analysis</span>
          <span class="pf a">Sector rotation and macro intelligence</span>
          <span class="pf a">Company-specific research report generation</span>
          <span class="pf a">Portfolio screening and risk assessment</span>
        </div>
      </div>
    </div>
  </div>

  <div class="gline"></div>

  <!-- TECH STACK -->
  <div class="section" id="s-tech">
    <div class="section-header">
      <div class="section-icon">⬢</div>
      <div>
        <div class="section-label">// Stack</div>
        <div class="section-title">Technology <em>Reference</em></div>
      </div>
    </div>

    <table class="tech-table">
      <thead>
        <tr>
          <th>Layer</th>
          <th>Technology</th>
        </tr>
      </thead>
      <tbody>
        <tr><td>Frontend</td><td>HTML5, CSS3, Vanilla JavaScript — zero dependencies, zero build step</td></tr>
        <tr><td>Typography</td><td>Orbitron (display), Share Tech Mono (data/labels), Syne (body) via Google Fonts</td></tr>
        <tr><td>Animations</td><td>CSS keyframes, SVG stroke-dashoffset draw-on, IntersectionObserver scroll reveals</td></tr>
        <tr><td>Visual FX</td><td>CRT scanline overlay, animated grid background, custom cursor ring, canvas particles</td></tr>
        <tr><td>Hosting</td><td>GitHub Pages — branch: main, root: /</td></tr>
        <tr><td>Product Backend</td><td>AWS Application Load Balancer — region: ap-south-1</td></tr>
        <tr><td>Product Infra</td><td>OptiTrade ALB + BharatAlpha ALB (separate endpoints)</td></tr>
      </tbody>
    </table>
  </div>

  <!-- FILE STRUCTURE -->
  <div class="section">
    <div class="section-header">
      <div class="section-icon">◻</div>
      <div>
        <div class="section-label">// Structure</div>
        <div class="section-title">Repository <em>Layout</em></div>
      </div>
    </div>

    <div class="file-tree">
      <span class="ft-dir">nexalpha/                    <span style="color:#1a3a4a"># root of repository</span></span><br>
      <span class="ft-file">├── index.html               <span>── static website (all CSS & JS inline)</span></span><br>
      <span class="ft-file">└── README.html              <span>── this documentation file</span></span>
    </div>

    <div class="note-box" style="margin-top:16px">
      <p><strong>Note:</strong> The entire site is contained in a single <code style="color:var(--green)">index.html</code> file. No build tools, package managers, or frameworks are required. Open it directly in a browser or serve with any static host.</p>
    </div>
  </div>

  <div class="divider"></div>

  <!-- LOCAL DEV -->
  <div class="section" id="s-deploy">
    <div class="section-header">
      <div class="section-icon">▷</div>
      <div>
        <div class="section-label">// Development</div>
        <div class="section-title">Running <em>Locally</em></div>
      </div>
    </div>

    <div class="terminal">
      <div class="term-bar">
        <div class="term-dot r"></div>
        <div class="term-dot y"></div>
        <div class="term-dot g"></div>
        <span class="term-title">bash — local-setup.sh</span>
      </div>
      <div class="term-body">
        <span class="tl"><span class="cm"># Clone the repository</span></span>
        <span class="tl"><span class="p">$</span> <span class="c">git clone https://github.com/your-username/your-username.github.io.git</span></span>
        <span class="tl"><span class="p">$</span> <span class="c">cd your-username.github.io</span></span>
        <span class="tl"> </span>
        <span class="tl"><span class="cm"># Option 1 — Open directly (simplest)</span></span>
        <span class="tl"><span class="p">$</span> <span class="c">open index.html</span></span>
        <span class="tl"> </span>
        <span class="tl"><span class="cm"># Option 2 — Python local server (recommended)</span></span>
        <span class="tl"><span class="p">$</span> <span class="c">python -m http.server 5500</span></span>
        <span class="tl"><span class="o up">Serving HTTP on 0.0.0.0 port 5500 ...</span></span>
        <span class="tl"> </span>
        <span class="tl"><span class="cm"># Option 3 — Node.js</span></span>
        <span class="tl"><span class="p">$</span> <span class="c">npx serve .</span></span>
        <span class="tl"><span class="o up">Serving!  →  http://localhost:3000</span></span>
      </div>
    </div>
  </div>

  <!-- DEPLOYMENT -->
  <div class="section">
    <div class="section-header">
      <div class="section-icon">↑</div>
      <div>
        <div class="section-label">// Deployment</div>
        <div class="section-title">GitHub Pages <em>Setup</em></div>
      </div>
    </div>

    <div class="terminal">
      <div class="term-bar">
        <div class="term-dot r"></div>
        <div class="term-dot y"></div>
        <div class="term-dot g"></div>
        <span class="term-title">bash — deploy.sh</span>
      </div>
      <div class="term-body">
        <span class="tl"><span class="cm"># Step 1: Push your file to GitHub</span></span>
        <span class="tl"><span class="p">$</span> <span class="c">git add index.html README.html</span></span>
        <span class="tl"><span class="p">$</span> <span class="c">git commit -m "deploy: initial release"</span></span>
        <span class="tl"><span class="p">$</span> <span class="c">git push origin main</span></span>
        <span class="tl"> </span>
        <span class="tl"><span class="cm"># Step 2: Enable GitHub Pages in repo Settings → Pages</span></span>
        <span class="tl"><span class="cm"># Source: Deploy from branch → main → / (root)</span></span>
        <span class="tl"> </span>
        <span class="tl"><span class="cm"># Step 3: Site goes live at:</span></span>
        <span class="tl"><span class="o"><span class="up">→</span>  https://your-username.github.io</span></span>
        <span class="tl"> </span>
        <span class="tl"><span class="cm"># Future updates — just push again, auto-redeploys in ~60s</span></span>
        <span class="tl"><span class="p">$</span> <span class="c">git add . && git commit -m "update" && git push</span></span>
        <span class="tl"><span class="o up">✓  Deployment triggered</span></span>
      </div>
    </div>

    <div class="note-box">
      <p><strong>HTTPS / Mixed Content Warning:</strong> The product backends currently run on HTTP (AWS ALB). Since GitHub Pages enforces HTTPS, some browsers may block navigation to HTTP URLs as mixed content. The fix is to front the ALBs with a custom domain and ACM SSL certificate. This is expected behavior during the beta phase.</p>
    </div>
  </div>

  <div class="gline"></div>

  <!-- ROADMAP -->
  <div class="section" id="s-roadmap">
    <div class="section-header">
      <div class="section-icon">→</div>
      <div>
        <div class="section-label">// Roadmap</div>
        <div class="section-title">What's <em>Coming Next</em></div>
      </div>
    </div>

    <div class="roadmap">
      <div class="rm-item done-item">
        <div class="rm-dot done">✓</div>
        <div class="rm-content">
          <div class="rm-title">Static site — initial deployment</div>
          <div class="rm-desc">Single-file HTML site deployed on GitHub Pages with trading terminal aesthetic, animated SVG charts, and live ticker bar.</div>
        </div>
      </div>
      <div class="rm-item done-item">
        <div class="rm-dot done">✓</div>
        <div class="rm-content">
          <div class="rm-title">OptiTrade Beta v0.1 — live on AWS</div>
          <div class="rm-desc">Multi-agent Nifty50 F&O assistant deployed and accessible via AWS Application Load Balancer (ap-south-1).</div>
        </div>
      </div>
      <div class="rm-item done-item">
        <div class="rm-dot done">✓</div>
        <div class="rm-content">
          <div class="rm-title">BharatAlpha Beta v0.1 — live on AWS</div>
          <div class="rm-desc">AI equity research platform for the Indian market deployed and accessible via AWS ALB (ap-south-1).</div>
        </div>
      </div>
      <div class="rm-item next-item">
        <div class="rm-dot next">⟳</div>
        <div class="rm-content">
          <div class="rm-title">HTTPS — custom domain & SSL certificate</div>
          <div class="rm-desc">Front both ALBs with a custom domain and AWS Certificate Manager to resolve mixed-content browser warnings.</div>
        </div>
      </div>
      <div class="rm-item">
        <div class="rm-dot todo">○</div>
        <div class="rm-content">
          <div class="rm-title">Live market data ticker</div>
          <div class="rm-desc">Replace static ticker values with a real-time NSE/BSE data feed or Yahoo Finance API integration.</div>
        </div>
      </div>
      <div class="rm-item">
        <div class="rm-dot todo">○</div>
        <div class="rm-content">
          <div class="rm-title">OptiTrade V2</div>
          <div class="rm-desc">Expanded instrument coverage, predictive agent capabilities, and a redesigned signal dashboard.</div>
        </div>
      </div>
      <div class="rm-item">
        <div class="rm-dot todo">○</div>
        <div class="rm-content">
          <div class="rm-title">BharatAlpha V2</div>
          <div class="rm-desc">Deeper agent collaboration, enhanced portfolio intelligence, and automated report scheduling.</div>
        </div>
      </div>
      <div class="rm-item">
        <div class="rm-dot todo">○</div>
        <div class="rm-content">
          <div class="rm-title">Early-access waitlist</div>
          <div class="rm-desc">Add a contact and waitlist form to the landing page for V2 sign-ups.</div>
        </div>
      </div>
    </div>
  </div>

  <div class="divider"></div>

  <!-- DISCLAIMER -->
  <div class="section">
    <div class="disclaimer">
      <div class="disc-icon">⚠</div>
      <div class="disc-text">
        <strong>DISCLAIMER:</strong> The content on this website and within these products is for informational purposes only and does not constitute financial advice. Trading in Futures and Options carries significant risk of loss. Users should conduct their own due diligence and consult a SEBI-registered financial advisor before making any investment decisions.
      </div>
    </div>
  </div>

  <!-- FOOTER -->
  <div class="footer">
    <div>
      <div class="footer-logo">NEX<span>ALPHA</span></div>
      <div style="font-family:'Share Tech Mono',monospace; font-size:10px; color:var(--text-dim); letter-spacing:2px; margin-top:6px; text-transform:uppercase;">Intelligent Market Systems · India</div>
    </div>
    <div class="footer-copy">
      <div>All rights reserved</div>
      <div>© 2025 NexAlpha</div>
      <div style="margin-top:6px; color:#1a3a4a;">Proprietary — Unauthorized reproduction not permitted</div>
    </div>
  </div>

</div><!-- /wrap -->

<script>
// ── PARTICLES ──
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
let W, H, particles = [];

function resize() {
  W = canvas.width = window.innerWidth;
  H = canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

function Particle() {
  this.x = Math.random() * W;
  this.y = Math.random() * H;
  this.vx = (Math.random() - 0.5) * 0.3;
  this.vy = (Math.random() - 0.5) * 0.3;
  this.r = Math.random() * 1.2 + 0.3;
  this.alpha = Math.random() * 0.4 + 0.1;
  this.color = Math.random() > 0.6 ? '0,255,136' : Math.random() > 0.5 ? '0,212,255' : '255,184,0';
}

for (let i = 0; i < 80; i++) particles.push(new Particle());

function drawParticles() {
  ctx.clearRect(0, 0, W, H);
  particles.forEach(p => {
    p.x += p.vx; p.y += p.vy;
    if (p.x < 0) p.x = W;
    if (p.x > W) p.x = 0;
    if (p.y < 0) p.y = H;
    if (p.y > H) p.y = 0;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${p.color},${p.alpha})`;
    ctx.fill();
  });
  // Draw connecting lines
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx*dx + dy*dy);
      if (dist < 100) {
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = `rgba(0,255,136,${0.06 * (1 - dist/100)})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    }
  }
  requestAnimationFrame(drawParticles);
}
drawParticles();

// ── SCROLL PROGRESS ──
const progressBar = document.getElementById('progress');
window.addEventListener('scroll', () => {
  const scrolled = window.scrollY / (document.body.scrollHeight - window.innerHeight);
  progressBar.style.width = (scrolled * 100) + '%';
});

// ── SCROLL REVEAL ──
const sections = document.querySelectorAll('.section');
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.08 });
sections.forEach(s => observer.observe(s));

// ── COUNTER ANIMATION ──
function animateCounter(el, target) {
  let current = 0;
  const step = target / 40;
  const timer = setInterval(() => {
    current += step;
    if (current >= target) { current = target; clearInterval(timer); }
    el.textContent = Math.floor(current);
  }, 30);
}

const counterObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('[data-target]').forEach(el => {
        animateCounter(el, parseInt(el.dataset.target));
      });
      counterObs.unobserve(e.target);
    }
  });
}, { threshold: 0.3 });

const statsRow = document.querySelector('.stats-row');
if (statsRow) counterObs.observe(statsRow);

// ── NAV DOTS ACTIVE STATE ──
const navSections = ['s-overview', 's-overview2', 's-products', 's-tech', 's-deploy', 's-roadmap'];
const dots = document.querySelectorAll('.nav-dot');

const navObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const idx = navSections.indexOf(e.target.id);
      if (idx >= 0) {
        dots.forEach(d => d.classList.remove('active'));
        dots[Math.min(idx + 1, dots.length - 1)].classList.add('active');
      }
    }
  });
}, { threshold: 0.5 });

navSections.forEach(id => {
  const el = document.getElementById(id);
  if (el) navObs.observe(el);
});
</script>
</body>
</html>
