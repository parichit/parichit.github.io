/* ============================================================================
   ✏️  THIS IS THE ONLY FILE YOU NEED TO EDIT.
   ----------------------------------------------------------------------------
   Everything on your website — your name, bio, publications, news, links —
   lives here. Change the text between the quotes, save, refresh. That's it.
   You never have to touch the layout/design code.

   A few simple rules so nothing breaks:
     • Keep the quotes "like this" around text.
     • Put a comma at the end of each line inside { } and [ ].
     • To add an item to a list, copy a whole { ... } block and paste it.
     • To hide a whole section, set its "enabled" to false.
     • Use \n if you ever need a line break inside a paragraph.
   ============================================================================ */

window.SITE = {

  /* ── LOOK & FEEL ──────────────────────────────────────────────────────────
     Pick your design here. (In the preview you can flip these live with the
     Tweaks panel, then copy your favourite values back into this block.)
       accent:   "terracotta" | "amber" | "clay" | "sage"
       fontPair: "sans"  (clean sans throughout)  |  "serif" (serif headings)
       hero:     "editorial" | "panel" | "minimal"
       density:  "compact" | "regular" | "comfy"
       dark:     false | true

     FONTS — two ways to change them:
       1. Easiest: flip fontPair between "sans" and "serif" above.
       2. Custom font: type a font name into headingFont (your name + all
          headings) and/or bodyFont (paragraph text). If it's a Google Font,
          ALSO add it to googleFonts so it loads. Leave "" to use fontPair.
          Examples:
            headingFont: "Fraunces",
            bodyFont:    "Inter",
            googleFonts: ["Fraunces:opsz,wght@9..144,400;9..144,600", "Inter:wght@400;500;600"],

     PHOTO SIZE — photoScale: 1 is the default. Bump to 1.2 for a bigger
     headshot, drop to 0.8 for a smaller one. (Works in every hero style.)
       NAME SIZE — to resize just your NAME, edit ".hero h1" in site.css.        */
  theme: {
    accent:   "terracotta",
    fontPair: "serif",
    hero:     "editorial",
    density:  "compact",
    dark:     false,

    headingFont: "",
    bodyFont:    "",
    googleFonts: [],

    photoScale:  0.8,
  },

  /* ── WHO YOU ARE ──────────────────────────────────────────────────────── */
  identity: {
    name:      "Parichit Sharma, PhD",
    // The single line under your name. Keep it crisp.
    tagline:   "Postdoctoral Researcher in AI | Biology | Data Science",
    // A short, scannable positioning sentence for the hero.
    pitch:     "I build machine-learning methods that turn large, messy biological data into discoveries — at the intersection of AI, computational biology, and data science.",
    location:  "Maryland, USA",
    // Drop your photo at assets/portrait.jpg (square works best). Until you do,
    // a tasteful placeholder shows in its place.
    photo:     "assets/portrait.png",
    // Your CV. Replace the file at assets/cv.pdf with your own.
    cv:        "assets/CV.pdf",
    // Shown as a small badge when you fill it in (e.g. job-hunting status).
    // Leave as "" to hide it; edit the text anytime to show it again.
    // Example:  availability: "Open to research scientist & faculty roles — 2026",
    availability: "Open to research scientist & faculty roles - 2026",
  },

  /* ── LINKS  (set any to "" to hide that icon) ───────────────────────────── */
  links: {
    email:        "parishar@iu.edu",
    scholar:      "https://scholar.google.com/citations?user=IMuiAGIAAAAJ&hl=en&inst=13098912254855678857",
    researchGate:        "https://www.researchgate.net/profile/Parichit-Sharma/research",
    github:       "https://github.com/parichit",
    linkedin:     "https://www.linkedin.com/in/parichit-sharma-95158614a/",
    // twitter:      "https://x.com/yourhandle",
    googlescholar:"",
  },

  /* ── ABOUT  (a few short paragraphs) ────────────────────────────────────── */
  about: {
    enabled: true,
    heading: "About",
    paragraphs: [
      "I am a postdoctoral researcher working across machine learning, bioinformatics, and data science. My research designs scalable, interpretable algorithms for high-dimensional biological data — single-cell genomics, sequence models, and clustering at scale.",
      "Before my postdoc I completed my PhD in Computer Science, where I developed open-source tools used by labs worldwide. I care deeply about reproducible science, mentoring, and building software that other researchers can actually use.",
      "Outside the lab I help organise our department's reading group, mentor first-generation graduate students, and write about the craft of computational research on my blog.",
    ],
    // Small fact chips shown beside the bio. Keep them short. Empty list = hidden.
    facts: [
      { label: "Focus",     value: "ML, AI, Data Science, Life Science" },
      { label: "Expertise",     value: "Electrophysiology, Single Cell Data, Structural Biology, Genomics" },
      { label: "Tools",     value: "Python · PyTorch · R" },
      { label: "Languages", value: "English · Hindi" },
      { label: "Taught", value: "2500+ students" },
    ],
  },

  /* ── RESEARCH THEMES / PROJECTS ─────────────────────────────────────────── */
  research: {
    enabled: true,
    heading: "Research",
    intro: "Three threads run through my work — making methods scale, making them interpretable, and making them usable.",
    projects: [
      {
        title:   "Scalable single-cell clustering",
        blurb:   "Approximate, GPU-accelerated clustering that handles tens of millions of cells without sacrificing biological signal.",
        tags:    ["ML", "Genomics", "Systems"],
        link:    "",            // optional project page / repo
        // Optional image at assets/research-1.jpg — placeholder shows otherwise.
        image:   "assets/research-1.jpg",
      },
      {
        title:   "Interpretable sequence models",
        blurb:   "Attention-based models for DNA/protein sequences with built-in, faithful explanations biologists can act on.",
        tags:    ["Deep Learning", "Interpretability"],
        link:    "",
        image:   "assets/research-2.jpg",
      },
      {
        title:   "Reproducible bioinformatics tooling",
        blurb:   "Open-source pipelines and benchmarks that make computational genomics reproducible across labs.",
        tags:    ["Open Source", "Reproducibility"],
        link:    "",
        image:   "assets/research-3.jpg",
      },
    ],
  },

  /* ── PUBLICATIONS  (newest first) ───────────────────────────────────────────
       For each paper: authors (put **your name in bold** with the double stars),
       title, venue, year, and any links you want shown.                        */
  publications: {
    enabled: true,
    heading: "Publications",
    note: "* denotes equal contribution. See full list on Google Scholar.",
    items: [
      {
        authors: "**P. Sharma**, A. Researcher, B. Collaborator",
        title:   "Scalable approximate clustering for single-cell genomics",
        venue:   "International Conference on Machine Learning (ICML)",
        year:    "2026",
        featured: true,
        links: { pdf: "#", code: "https://github.com/", bibtex: "", project: "" },
      },
      {
        authors: "C. Author*, **P. Sharma***, D. Advisor",
        title:   "Faithful attention explanations for biological sequence models",
        venue:   "NeurIPS Workshop on Machine Learning in Computational Biology",
        year:    "2025",
        featured: true,
        links: { pdf: "#", code: "", bibtex: "#", project: "" },
      },
      {
        authors: "**P. Sharma**, E. Coauthor",
        title:   "A reproducible benchmark for high-dimensional clustering methods",
        venue:   "Bioinformatics",
        year:    "2024",
        featured: false,
        links: { pdf: "#", code: "https://github.com/", bibtex: "", project: "" },
      },
      {
        authors: "F. Lead, G. Second, **P. Sharma**",
        title:   "Open tooling for reproducible computational genomics pipelines",
        venue:   "Journal of Open Source Software",
        year:    "2023",
        featured: false,
        links: { pdf: "#", code: "https://github.com/", bibtex: "", project: "" },
      },
    ],
  },

  /* ── TEACHING ───────────────────────────────────────────────────────────── */
  teaching: {
    enabled: true,
    heading: "Teaching",
    intro: "I teach and mentor across machine learning, statistics, and scientific computing.",
    items: [
      { role: "Instructor", title: "Applied Machine Learning for Biology", org: "Indiana University", year: "2025–26" },
      { role: "Guest Lecturer", title: "Deep Learning for Genomics (graduate seminar)", org: "Indiana University", year: "2025" },
      { role: "Teaching Assistant", title: "Data Structures & Algorithms", org: "Prior University", year: "2019–22" },
    ],
  },

  /* ── WRITING / BLOG ─────────────────────────────────────────────────────────
       Two kinds of entry are supported:
         • A FULL on-site post — give it a "slug" and a "body" (see below).
           It opens at  post.html?p=your-slug  with a nice reading layout.
         • An EXTERNAL link — give it a "link" instead of a body. It opens that URL.

       Writing a post BODY: it's an array of blocks. Each block is one of:
         { h: "A subheading" }                         → section heading
         { p: "A paragraph. Use **bold**, *italic*, [links](url), and
                footnotes like this[^1]." }            → paragraph
         { quote: "A pulled-out quote or steel-manned counter-argument." }
         { list: ["first point", "second point"] }     → bulleted list
         { code: "pip install scquant", lang: "bash" } → code block
         { image: "assets/post-fig.jpg", caption: "Optional caption" }
       Footnotes: write [^1], [^2]… in your text, then define them in "footnotes".
     ────────────────────────────────────────────────────────────────────────── */
  blog: {
    enabled: true,
    heading: "Writing",
    intro: "Notes on computational research, the craft of building scientific tools, and academic life.",
    items: [
      {
        slug: "single-cell-clustering-4x-faster",
        date: "2026-03-12",
        title: "How we made single-cell clustering 4× faster",
        blurb: "A practical write-up of the engineering behind scQuant v2 — and why the biggest wins came from data layout, not the GPU.",
        tags: ["Engineering", "Genomics"],
        body: [
          { p: "When we set out to speed up **scQuant**, the assumption was that the bottleneck lived on the GPU. It didn't. The biggest wins came from rethinking how data moved *to* the GPU in the first place.[^1]" },
          { h: "Where the time actually went" },
          { p: "Profiling a typical run on ten million cells showed that less than half the wall-clock time was spent in the clustering kernel itself. The rest went to host-to-device transfers and repeated re-encoding of the same sparse matrices." },
          { list: [
            "**Data layout** — switching to a blocked, column-major sparse format cut transfer volume by roughly 60%.",
            "**Batching** — processing cells in fixed-size tiles kept the GPU saturated instead of stalling between mini-batches.",
            "**Caching** — memoizing the neighbour graph across resolutions removed a whole class of redundant work.",
          ] },
          { quote: "If you only optimize the kernel, you're polishing the part of the pipeline the profiler told you to ignore." },
          { h: "The unglamorous fix" },
          { p: "The change that mattered most was boring: a one-time reformatting pass that made every downstream step cheaper. It's a good reminder that *systems* thinking often beats *algorithmic* cleverness in applied work.[^2]" },
          { code: "import scquant as sq\nadata = sq.read('cells.h5ad')\nsq.cluster(adata, backend='gpu', tile=8192)", lang: "python" },
          { p: "The full benchmark suite and reproduction scripts are on [GitHub](https://github.com/). If you try it on your own data, I'd love to hear how it goes." },
        ],
        footnotes: [
          "All timings were measured on a single A100; your mileage will vary with PCIe bandwidth.",
          "This echoes a theme I keep running into: reproducible, well-structured data is a performance feature, not just a hygiene one.",
        ],
      },
      {
        slug: "reading-papers-without-drowning",
        date: "2025-12-02",
        title: "Reading papers without drowning",
        blurb: "The lightweight system I use to keep up with ML and bioinformatics literature without burning out.",
        tags: ["Academic life"],
        body: [
          { p: "There is no way to read everything, and trying to is how people burn out. What follows is the modest system that keeps me current without pretending otherwise." },
          { h: "Three passes, not one" },
          { p: "I borrow the classic three-pass idea: skim the abstract and figures, then read for the argument, then — only if it's worth it — read for the details. Most papers never make it past the first pass, and that's the point." },
          { list: [
            "**Pass 1 (1 min):** title, abstract, figures. Is this relevant to a question I actually have?",
            "**Pass 2 (10 min):** intro, method sketch, results. Can I explain the contribution in a sentence?",
            "**Pass 3 (as needed):** equations, proofs, appendix. Only for papers I plan to build on.",
          ] },
          { quote: "Reading is not the goal. Building an accurate mental model of your field is the goal — reading is just one way to update it." },
          { p: "I keep a single plain-text file of one-line summaries. When the same idea shows up three times, it's earned a place in my long-term notes." },
        ],
        footnotes: [],
      },
      {
        // This entry is an EXTERNAL link (no body). Delete "link" and add a
        // "body" + "slug" to turn it into a full on-site post instead.
        date: "2025-09-18",
        title: "A first-gen guide to the research postdoc",
        blurb: "What I wish I'd known before starting — guest post on an external blog.",
        tags: ["Mentoring"],
        link: "https://example.com/",
      },
    ],
  },

  /* ── CONTACT ────────────────────────────────────────────────────────────── */
  contact: {
    enabled: true,
    heading: "Get in touch",
    blurb: "I'm always happy to talk research, collaborations, or mentoring. The fastest way to reach me is email.",
  },

  // Footer line. Year is added automatically.
  footer: "Built with care · hosted free on GitHub Pages",
};
