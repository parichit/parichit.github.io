/* ============================================================================
   render.js — builds each page from window.SITE. You won't normally edit this.

   PAGES
     • Home (index.html)      → hero + About + Research + Contact
     • publications.html      → Publications
     • teaching.html          → Teaching
     • writing.html           → Writing
     • CV                     → opens assets/cv.pdf in the browser (nav link)

   Each page sets window.PAGE before this script runs.
   ============================================================================ */
(function () {
  var S = window.SITE || {};
  var PAGE = window.PAGE || "home";

  /* ---- helpers ------------------------------------------------------------ */
  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }
  function md(s) {
    s = esc(s);
    s = s.replace(/\[([^\]]+)\]\(([^)]+)\)/g, function (_, t, u) {
      return '<a href="' + u + '" rel="noopener">' + t + "</a>";
    });
    s = s.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
    s = s.replace(/(^|[^*])\*([^*\n]+)\*/g, "$1<em>$2</em>");
    return s;
  }
  function has(v) { return v != null && v !== ""; }

  // "2026-03-12" → "March 12, 2026"
  function fmtDate(s) {
    if (!has(s)) return "";
    var d = new Date(s + (s.length === 10 ? "T00:00:00" : ""));
    if (isNaN(d)) return s;
    return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  }
  // crude but fine word count across a post body
  function readingTime(post) {
    var words = 0;
    (post.body || []).forEach(function (b) {
      var t = b.p || b.h || b.quote || b.code || (b.list ? b.list.join(" ") : "") || "";
      words += String(t).split(/\s+/).filter(Boolean).length;
    });
    (post.footnotes || []).forEach(function (f) { words += String(f).split(/\s+/).filter(Boolean).length; });
    var mins = Math.max(1, Math.round(words / 200));
    return { words: words, mins: mins };
  }
  function isPost(it) { return has(it.slug) && Array.isArray(it.body); }

  /* ---- SVG icons ---------------------------------------------------------- */
  var ICON = {
    email:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>',
    scholar: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 3 1 9l11 6 9-4.9V17h2V9z"/><path d="M5 13.2V17c0 1.7 3.1 3 7 3s7-1.3 7-3v-3.8l-7 3.8z"/></svg>',
    orcid:   '<svg viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="9" cy="7.6" r="1.1"/><rect x="8.2" y="10" width="1.6" height="7"/><path d="M12.4 10h3.1c2.2 0 3.7 1.5 3.7 3.5S17.7 17 15.5 17h-3.1zm1.6 1.5v4h1.4c1.4 0 2.2-.9 2.2-2s-.8-2-2.2-2z"/></svg>',
    github:  '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.5 2 2 6.6 2 12.3c0 4.5 2.9 8.4 6.8 9.7.5.1.7-.2.7-.5v-1.7c-2.8.6-3.4-1.4-3.4-1.4-.5-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.6 2.4 1.1 3 .9.1-.7.4-1.1.6-1.4-2.2-.3-4.6-1.1-4.6-5 0-1.1.4-2 1-2.7-.1-.3-.5-1.3.1-2.7 0 0 .8-.3 2.7 1a9.3 9.3 0 0 1 5 0c1.9-1.3 2.7-1 2.7-1 .6 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.9-2.4 4.7-4.6 5 .4.3.7.9.7 1.9v2.8c0 .3.2.6.7.5 3.9-1.3 6.8-5.2 6.8-9.7C22 6.6 17.5 2 12 2z"/></svg>',
    linkedin:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5A2.5 2.5 0 1 0 5 8.5a2.5 2.5 0 0 0 0-5zM3 9h4v12H3zM9 9h3.8v1.7h.1c.5-1 1.8-2 3.7-2 4 0 4.7 2.6 4.7 6V21h-4v-5.3c0-1.3 0-2.9-1.8-2.9s-2 1.4-2 2.8V21H9z"/></svg>',
    twitter: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.2 2H21l-6.5 7.4L22 22h-6l-4.7-6.1L5.9 22H3l7-8L2 2h6.2l4.2 5.6zm-2.1 18h1.7L8 3.8H6.2z"/></svg>',
    loc:     '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/></svg>',
    cv:      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M9 13h6M9 17h6"/></svg>',
    menu:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
    up:      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 19V5m0 0-6 6m6-6 6 6"/></svg>',
  };
  var SOCIAL_ORDER = [
    ["email", "Email", function (v) { return "mailto:" + v; }],
    ["scholar", "Google Scholar", id],
    ["orcid", "ORCID", id],
    ["github", "GitHub", id],
    ["linkedin", "LinkedIn", id],
    ["twitter", "X / Twitter", id],
  ];
  function id(v) { return v; }

  function socialsHTML() {
    var L = S.links || {}, out = "";
    SOCIAL_ORDER.forEach(function (row) {
      var key = row[0], label = row[1], href = row[2], v = L[key];
      if (!has(v)) return;
      out += '<a href="' + href(v) + '" aria-label="' + label + '" title="' + label +
        '" rel="noopener"' + (key === "email" ? "" : ' target="_blank"') + ">" + ICON[key] + "</a>";
    });
    return '<div class="socials">' + out + "</div>";
  }

  function sectionHead(kicker, heading) {
    return '<div class="sec-head reveal"><span class="kick">' + esc(kicker) +
      '</span><h2>' + esc(heading) + '</h2><span class="rule"></span></div>';
  }

  function portraitHTML(photo, label) {
    if (!has(photo)) {
      return '<div class="portrait ph"><span>' + esc(label || "portrait") + "</span></div>";
    }
    return '<div class="portrait"><img src="' + esc(photo) + '" alt="Portrait" ' +
      'onerror="this.parentNode.classList.add(\'ph\');this.parentNode.innerHTML=\'<span>add ' +
      esc(photo) + '</span>\'"></div>';
  }

  /* ---- HERO --------------------------------------------------------------- */
  function hero() {
    var I = S.identity || {}, T = S.theme || {};
    var heroStyle = T.hero || "editorial";
    var avail = has(I.availability) ? '<div class="avail">' + esc(I.availability) + "</div>" : "";
    var loc = has(I.location) ? '<span class="loc">' + ICON.loc + esc(I.location) + "</span>" : "";
    var cvLink = has(I.cv) ? '<a href="' + esc(I.cv) + '" target="_blank" rel="noopener">View CV →</a>' : "";
    var metaInner = [loc, cvLink].filter(Boolean).join("");
    var meta = metaInner ? '<div class="meta">' + metaInner + "</div>" : "";

    var text =
      '<div class="hero-text reveal">' +
        avail +
        "<h1>" + esc(I.name) + "</h1>" +
        '<div class="tagline">' + esc(I.tagline) + "</div>" +
        '<p class="pitch">' + esc(I.pitch) + "</p>" +
        socialsHTML() + meta +
      "</div>";
    var portrait = '<div class="reveal portrait-wrap">' + portraitHTML(I.photo, "your photo") + "</div>";

    if (heroStyle === "minimal") {
      return '<header class="hero" data-hero="minimal" data-screen-label="Hero"><div class="wrap">' +
        '<div class="hero-grid">' + portrait + text + "</div></div></header>";
    }
    if (heroStyle === "panel") {
      return '<header class="hero" data-hero="panel" data-screen-label="Hero">' +
        '<div class="panel-band"><div class="wrap"><div class="hero-grid">' + portrait + text +
        "</div></div></div></header>";
    }
    return '<header class="hero" data-hero="editorial" data-screen-label="Hero"><div class="wrap">' +
      '<div class="hero-grid">' + text + portrait + "</div></div></header>";
  }

  /* ---- ABOUT -------------------------------------------------------------- */
  function about() {
    var A = S.about; if (!A || !A.enabled) return "";
    var paras = (A.paragraphs || []).map(function (p) { return "<p>" + md(p) + "</p>"; }).join("");
    var facts = (A.facts || []).map(function (f) {
      return '<div class="fact"><div class="l">' + esc(f.label) + '</div><div class="v">' + esc(f.value) + "</div></div>";
    }).join("");
    var factsBox = facts ? '<div class="facts reveal">' + facts + "</div>" : "";
    return '<section class="section" id="about" data-screen-label="About"><div class="wrap">' +
      sectionHead("About", A.heading || "About") +
      '<div class="about-grid"><div class="prose reveal">' + paras + "</div>" + factsBox + "</div></div></section>";
  }

  /* ---- RESEARCH ----------------------------------------------------------- */
  function research() {
    var R = S.research; if (!R || !R.enabled) return "";
    var intro = has(R.intro) ? '<p class="intro reveal">' + esc(R.intro) + "</p>" : "";
    var cards = (R.projects || []).map(function (p) {
      var tags = (p.tags || []).map(function (t) { return '<span class="tag">' + esc(t) + "</span>"; }).join("");
      var thumb = has(p.image)
        ? '<div class="thumb"><img src="' + esc(p.image) + '" alt="" style="width:100%;height:100%;object-fit:cover" onerror="this.parentNode.innerHTML=\'<span>image</span>\'"></div>'
        : '<div class="thumb"><span>image</span></div>';
      var body = '<div class="body"><h3>' + esc(p.title) + '</h3><p class="blurb">' + esc(p.blurb) +
        '</p><div class="tags">' + tags + "</div></div>";
      if (has(p.link)) return '<a class="card linked reveal" href="' + esc(p.link) + '" rel="noopener">' + thumb + body + "</a>";
      return '<div class="card reveal">' + thumb + body + "</div>";
    }).join("");
    return '<section class="section" id="research" data-screen-label="Research"><div class="wrap">' +
      sectionHead("Themes", R.heading || "Research") + intro + '<div class="cards">' + cards + "</div></div></section>";
  }

  /* ---- PUBLICATIONS ------------------------------------------------------- */
  function publications() {
    var P = S.publications; if (!P || !P.enabled) return "";
    var note = has(P.note) ? '<p class="pub-note reveal">' + esc(P.note) + "</p>" : "";
    var LINK_LABELS = { pdf: "PDF", code: "Code", bibtex: "BibTeX", project: "Project" };
    var items = (P.items || []).map(function (p) {
      var links = "";
      Object.keys(LINK_LABELS).forEach(function (k) {
        if (p.links && has(p.links[k])) links += '<a href="' + esc(p.links[k]) + '" rel="noopener">' + LINK_LABELS[k] + "</a>";
      });
      var badge = p.featured ? '<span class="badge">Selected</span>' : "";
      var plinks = links ? '<div class="plinks">' + links + "</div>" : "";
      return '<div class="pub reveal ' + (p.featured ? "feat" : "") + '"><div class="yr">' + esc(p.year) +
        '</div><div>' + badge + "<h3>" + esc(p.title) + '</h3><div class="authors">' + md(p.authors) +
        '</div><div class="venue">' + esc(p.venue) + "</div>" + plinks + "</div></div>";
    }).join("");
    return '<section class="section" id="publications" data-screen-label="Publications"><div class="wrap">' +
      sectionHead("Papers", P.heading || "Publications") + note + '<div class="pubs">' + items + "</div></div></section>";
  }

  /* ---- TEACHING ----------------------------------------------------------- */
  function teaching() {
    var T = S.teaching; if (!T || !T.enabled) return "";
    var intro = has(T.intro) ? '<p class="intro reveal">' + esc(T.intro) + "</p>" : "";
    var rows = (T.items || []).map(function (it) {
      return '<div class="row-item reveal"><div><div class="role">' + esc(it.role) +
        '</div><h3>' + esc(it.title) + '</h3><div class="org">' + esc(it.org) +
        '</div></div><div class="when">' + esc(it.year) + "</div></div>";
    }).join("");
    return '<section class="section" id="teaching" data-screen-label="Teaching"><div class="wrap">' +
      sectionHead("Courses", T.heading || "Teaching") + intro + '<div class="rows">' + rows + "</div></div></section>";
  }

  /* ---- WRITING (list) ----------------------------------------------------- */
  function blog() {
    var B = S.blog; if (!B || !B.enabled) return "";
    var intro = has(B.intro) ? '<p class="intro reveal">' + esc(B.intro) + "</p>" : "";
    var items = (B.items || []).map(function (it) {
      var post = isPost(it);
      var href = post ? ("post.html?p=" + encodeURIComponent(it.slug)) : (it.link || "#");
      var ext = !post;
      var tags = (it.tags || []).map(function (t) { return '<span class="b-tag">' + esc(t) + "</span>"; }).join("");
      var rt = post ? '<span class="rt">' + readingTime(it).mins + " min read</span>" : '<span class="ext">External ↗</span>';
      var meta = '<div class="b-meta"><div class="when">' + esc(fmtDate(it.date)) + "</div>" +
        (tags ? '<div class="b-tags">' + tags + "</div>" : "") + rt + "</div>";
      var attrs = ext ? ' target="_blank" rel="noopener"' : "";
      return '<a class="blog-item reveal" href="' + esc(href) + '"' + attrs + ">" + meta +
        "<h3>" + esc(it.title) + ' <span class="arrow">→</span></h3>' +
        '<p class="blurb">' + esc(it.blurb) + "</p></a>";
    }).join("");
    return '<section class="section" id="writing" data-screen-label="Writing"><div class="wrap">' +
      sectionHead("Blog", B.heading || "Writing") + intro + '<div class="rows">' + items + "</div></div></section>";
  }

  /* ---- SINGLE POST (post.html?p=slug) ------------------------------------- */
  function fnExpand(text) {
    // turn [^1] into a superscript link; collect order
    return md(text).replace(/\[\^(\d+)\]/g, function (_, n) {
      return '<sup class="fnref" id="fnref-' + n + '"><a href="#fn-' + n + '">' + n + "</a></sup>";
    });
  }
  function blockHTML(b) {
    if (b.h)     return "<h2>" + esc(b.h) + "</h2>";
    if (b.p)     return "<p>" + fnExpand(b.p) + "</p>";
    if (b.quote) return "<blockquote>" + fnExpand(b.quote) + "</blockquote>";
    if (b.list)  return "<ul>" + b.list.map(function (li) { return "<li>" + fnExpand(li) + "</li>"; }).join("") + "</ul>";
    if (b.code)  return '<pre>' + (has(b.lang) ? '<span class="lang">' + esc(b.lang) + "</span>" : "") +
                        "<code>" + esc(b.code) + "</code></pre>";
    if (b.image) return '<figure><img src="' + esc(b.image) + '" alt="' + esc(b.caption || "") +
                        '" onerror="this.style.display=\'none\'">' +
                        (has(b.caption) ? "<figcaption>" + esc(b.caption) + "</figcaption>" : "") + "</figure>";
    return "";
  }
  function getParam(name) {
    var m = new RegExp("[?&]" + name + "=([^&]+)").exec(location.search);
    return m ? decodeURIComponent(m[1].replace(/\+/g, " ")) : "";
  }
  function postPage() {
    var B = S.blog || {};
    var posts = (B.items || []).filter(isPost);
    var slug = getParam("p");
    var idx = -1;
    posts.forEach(function (p, i) { if (p.slug === slug) idx = i; });
    if (idx < 0) {
      return '<main class="subpage"><div class="wrap"><div class="post-missing">' +
        "<h1>Post not found</h1><p>This article may have moved. " +
        '<a href="writing.html">← Back to all writing</a></p></div></div></main>';
    }
    var p = posts[idx];
    var rt = readingTime(p);
    var I = S.identity || {};
    var tags = (p.tags || []).map(function (t) { return '<span class="b-tag">' + esc(t) + "</span>"; }).join("");
    var meta = '<div class="post-meta"><span>' + esc(fmtDate(p.date)) + "</span>" +
      '<span class="sep">·</span><span>' + esc((I.name || "").replace(/,.*$/, "")) + "</span>" +
      '<span class="sep">·</span><span>' + rt.words + " words · " + rt.mins + " min read</span>" +
      (tags ? '<span class="sep">·</span>' + tags : "") + "</div>";
    var body = (p.body || []).map(blockHTML).join("");
    var fns = (p.footnotes || []);
    var fnHTML = fns.length
      ? '<section class="footnotes"><h2>Notes</h2><ol>' + fns.map(function (f, i) {
          var n = i + 1;
          return '<li id="fn-' + n + '">' + md(f) +
            ' <a class="fn-back" href="#fnref-' + n + '" aria-label="Back to text">↩</a></li>';
        }).join("") + "</ol></section>"
      : "";
    // prev / next within the post list
    var navHTML = "";
    var prev = posts[idx + 1], next = posts[idx - 1]; // list is newest-first
    if (prev || next) {
      navHTML = '<nav class="post-nav">' +
        (prev ? '<a class="prev" href="post.html?p=' + encodeURIComponent(prev.slug) + '"><span class="dir">← Older</span>' + esc(prev.title) + "</a>" : "<span></span>") +
        (next ? '<a class="next" href="post.html?p=' + encodeURIComponent(next.slug) + '"><span class="dir">Newer →</span>' + esc(next.title) + "</a>" : "<span></span>") +
        "</nav>";
    }
    return '<main class="subpage"><article class="post"><div class="wrap">' +
      '<a class="back" href="writing.html">← All writing</a>' +
      "<h1>" + esc(p.title) + "</h1>" + meta +
      '<div class="prose">' + body + fnHTML + "</div></div></article>" +
      (navHTML ? '<div class="wrap">' + navHTML + "</div>" : "") + "</main>";
  }

  /* ---- CONTACT ------------------------------------------------------------ */
  function contact() {
    var C = S.contact; if (!C || !C.enabled) return "";
    var I = S.identity || {}, L = S.links || {};
    var emailBtn = has(L.email) ? '<a class="btn" href="mailto:' + esc(L.email) + '">' + ICON.email + "Email me</a>" : "";
    var cvBtn = has(I.cv) ? '<a class="btn ghost" href="' + esc(I.cv) + '" target="_blank" rel="noopener">' + ICON.cv + "View CV</a>" : "";
    var btns = '<div class="contact-btns">' + emailBtn + cvBtn + "</div>";
    return '<section class="section" id="contact" data-screen-label="Contact"><div class="wrap">' +
      sectionHead("Contact", C.heading || "Get in touch") +
      '<div class="contact-grid reveal"><p class="blurb">' + esc(C.blurb) + "</p>" + btns + "</div></div></section>";
  }

  /* ---- NAV + FOOTER ------------------------------------------------------- */
  function nav() {
    var I = S.identity || {};
    var items = [];
    if (S.about && S.about.enabled)        items.push({ label: "About",        href: "index.html#about" });
    if (S.research && S.research.enabled)  items.push({ label: "Research",     href: "index.html#research" });
    if (S.publications && S.publications.enabled) items.push({ label: "Publications", href: "publications.html", page: "publications" });
    if (S.teaching && S.teaching.enabled)  items.push({ label: "Teaching",     href: "teaching.html", page: "teaching" });
    if (S.blog && S.blog.enabled)          items.push({ label: "Writing",      href: "writing.html", page: "writing" });
    if (S.contact && S.contact.enabled)    items.push({ label: "Contact",      href: "index.html#contact" });
    var lis = items.map(function (it) {
      var act = (it.page && it.page === PAGE) ? ' class="active"' : "";
      return '<a href="' + it.href + '"' + act + ">" + it.label + "</a>";
    }).join("");
    var cv = has(I.cv) ? '<a class="nav-cv" href="' + esc(I.cv) + '" target="_blank" rel="noopener">CV ↗</a>' : "";
    var firstName = (I.name || "").split(/[\s,]/)[0] || "Home";
    return '<nav class="nav"><div class="wrap">' +
      '<a class="brand" href="index.html">' + esc(firstName) + '<span class="dot">.</span></a>' +
      '<button class="nav-toggle" aria-label="Menu">' + ICON.menu + "</button>" +
      '<div class="nav-links">' + lis + cv + "</div></div></nav>";
  }

  function footer() {
    var I = S.identity || {};
    var note = has(S.footer) ? "<span>" + esc(S.footer) + "</span>" : "<span></span>";
    return '<footer class="foot"><div class="wrap"><span>© ' + new Date().getFullYear() + " " +
      esc(I.name) + "</span>" + note + "</div></footer>";
  }

  /* ---- PER-PAGE TITLE + DESCRIPTION --------------------------------------- */
  function setMeta() {
    var I = S.identity || {};
    if (PAGE === "post") {
      var posts = ((S.blog || {}).items || []).filter(isPost);
      var slug = getParam("p"), p = null;
      posts.forEach(function (x) { if (x.slug === slug) p = x; });
      if (p) {
        document.title = p.title + " — " + (I.name || "");
        var mdesc = document.querySelector('meta[name="description"]');
        if (mdesc && has(p.blurb)) mdesc.setAttribute("content", p.blurb);
      }
      return;
    }
    var m = {
      home:         { t: I.name + " — " + I.tagline, d: I.pitch },
      publications: { t: "Publications — " + I.name,  d: "Research publications by " + I.name + "." },
      teaching:     { t: "Teaching — " + I.name,      d: "Teaching and mentoring by " + I.name + "." },
      writing:      { t: "Writing — " + I.name,       d: "Notes and essays by " + I.name + "." },
    }[PAGE] || { t: I.name, d: I.pitch };
    if (m.t) document.title = m.t;
    var md = document.querySelector('meta[name="description"]');
    if (md && m.d) md.setAttribute("content", m.d);
  }

  /* ---- THEME -------------------------------------------------------------- */
  function applyTheme(t) {
    t = t || S.theme || {};
    var r = document.documentElement;
    r.dataset.accent = t.accent || "terracotta";
    r.dataset.font = t.fontPair || "sans";
    r.dataset.hero = t.hero || "editorial";
    r.dataset.density = t.density || "regular";
    if (t.theme === "dark" || t.dark) r.dataset.theme = "dark"; else r.removeAttribute("data-theme");

    // Load any custom Google Fonts named in theme.googleFonts (once)
    if (Array.isArray(t.googleFonts) && t.googleFonts.length && !document.getElementById("__customFonts")) {
      var fam = t.googleFonts.map(function (f) { return "family=" + String(f).replace(/ /g, "+"); }).join("&");
      var link = document.createElement("link");
      link.id = "__customFonts"; link.rel = "stylesheet";
      link.href = "https://fonts.googleapis.com/css2?" + fam + "&display=swap";
      document.head.appendChild(link);
    }
    // Custom font-family overrides (fall back to the fontPair defaults when "")
    if (has(t.headingFont)) r.style.setProperty("--font-head", '"' + t.headingFont + '", Georgia, serif');
    else r.style.removeProperty("--font-head");
    if (has(t.bodyFont)) r.style.setProperty("--font-body", '"' + t.bodyFont + '", system-ui, sans-serif');
    else r.style.removeProperty("--font-body");
    // Photo size multiplier
    r.style.setProperty("--photo-scale", t.photoScale != null ? t.photoScale : 1);
  }
  window.__applyTheme = applyTheme;

  /* ---- BUILD -------------------------------------------------------------- */
  function build() {
    document.documentElement.classList.add("js");
    applyTheme(S.theme);
    setMeta();
    var main;
    if (PAGE === "publications") main = '<main class="subpage">' + publications() + "</main>";
    else if (PAGE === "teaching") main = '<main class="subpage">' + teaching() + "</main>";
    else if (PAGE === "writing")  main = '<main class="subpage">' + blog() + "</main>";
    else if (PAGE === "post")     main = postPage();
    else main = hero() + about() + research() + contact(); // home

    var html = nav() + '<a id="top"></a>' + main + footer() +
      '<button class="totop" aria-label="Back to top">' + ICON.up + "</button>";
    var app = document.getElementById("app");
    app.innerHTML = html;
    wire();
  }
  window.__rebuild = build; // used by the design-mode Tweaks panel (home only)

  /* ---- INTERACTIONS ------------------------------------------------------- */
  function wire() {
    var toggle = document.querySelector(".nav-toggle");
    var links = document.querySelector(".nav-links");
    if (toggle && links) {
      toggle.addEventListener("click", function () { links.classList.toggle("open"); });
      links.addEventListener("click", function (e) { if (e.target.tagName === "A") links.classList.remove("open"); });
    }
    var reveals = [].slice.call(document.querySelectorAll(".reveal"));
    if (matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
      reveals.forEach(function (n) { n.classList.add("in"); });
    } else {
      var showIfVisible = function (n) {
        var r = n.getBoundingClientRect();
        if (r.top < (window.innerHeight || 800) * 0.96 && r.bottom > 0) { n.classList.add("in"); return true; }
        return false;
      };
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
      }, { rootMargin: "0px 0px -8% 0px", threshold: 0.04 });
      reveals.forEach(function (n) { if (!showIfVisible(n)) io.observe(n); });
      setTimeout(function () { reveals.forEach(showIfVisible); }, 1000);
    }
    var totop = document.querySelector(".totop");
    if (totop) {
      totop.addEventListener("click", function () { window.scrollTo({ top: 0, behavior: "smooth" }); });
      window.addEventListener("scroll", function () { totop.classList.toggle("show", window.scrollY > 600); }, { passive: true });
    }
    // if arriving with a #hash, nudge into view after layout
    if (location.hash && location.hash.length > 1) {
      var target = document.getElementById(location.hash.slice(1));
      if (target) setTimeout(function () { window.scrollTo(0, target.getBoundingClientRect().top + window.scrollY - 70); }, 60);
    }
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", build);
  else build();
})();
