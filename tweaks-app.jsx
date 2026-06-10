/* ============================================================================
   tweaks-app.jsx — the "Design studio" panel.
   IMPORTANT: this only loads inside the preview (an iframe). It is NEVER loaded
   on your live github.io site, so visitors get a clean, fast, vanilla page.
   Use it to try directions live, then copy the values into content.js.
   ============================================================================ */

const ACCENTS = [
  { name: "terracotta", hex: "#c2693f" },
  { name: "amber",      hex: "#c08a36" },
  { name: "clay",       hex: "#b1503f" },
  { name: "sage",       hex: "#7d9472" },
];

function AccentChips({ value, onChange }) {
  return (
    <div className="twk-row">
      <div className="twk-lbl"><span>Accent</span></div>
      <div style={{ display: "flex", gap: "6px" }}>
        {ACCENTS.map((a) => (
          <button key={a.name} type="button" title={a.name}
            onClick={() => onChange(a.name)}
            style={{
              flex: 1, height: "30px", borderRadius: "7px", cursor: "pointer",
              background: a.hex, border: "0",
              boxShadow: value === a.name
                ? "0 0 0 2px rgba(0,0,0,.8), 0 1px 3px rgba(0,0,0,.2)"
                : "0 0 0 .5px rgba(0,0,0,.15), 0 1px 2px rgba(0,0,0,.08)",
            }} />
        ))}
      </div>
    </div>
  );
}

function TweaksApp() {
  const base = { accent: "terracotta", fontPair: "sans", hero: "editorial", density: "regular", dark: false };
  const init = Object.assign({}, base, (window.SITE && window.SITE.theme) || {});
  const [t, setTweak] = useTweaks(init);
  const prevHero = React.useRef(undefined);

  React.useEffect(() => {
    window.SITE.theme = Object.assign({}, window.SITE.theme, t);
    if (prevHero.current !== undefined && prevHero.current !== t.hero && window.__rebuild) {
      window.__rebuild();
    } else if (window.__applyTheme) {
      window.__applyTheme(t);
    }
    prevHero.current = t.hero;
  }, [t]);

  const copySettings = () => {
    const block =
      "  theme: {\n" +
      '    accent:   "' + t.accent + '",\n' +
      '    fontPair: "' + t.fontPair + '",\n' +
      '    hero:     "' + t.hero + '",\n' +
      '    density:  "' + t.density + '",\n' +
      "    dark:     " + (t.dark ? "true" : "false") + ",\n" +
      "  },";
    try {
      navigator.clipboard.writeText(block);
      window.__twkToast && window.__twkToast("Copied! Paste the theme block into content.js");
    } catch (e) {
      window.prompt("Copy this into content.js:", block);
    }
  };

  return (
    <TweaksPanel title="Design studio">
      <TweakSection label="Layout" />
      <TweakRadio label="Hero style" value={t.hero}
        options={["editorial", "panel", "minimal"]}
        onChange={(v) => setTweak("hero", v)} />
      <TweakRadio label="Density" value={t.density}
        options={["compact", "regular", "comfy"]}
        onChange={(v) => setTweak("density", v)} />

      <TweakSection label="Type" />
      <TweakRadio label="Headings" value={t.fontPair}
        options={[{ value: "sans", label: "Sans" }, { value: "serif", label: "Serif" }]}
        onChange={(v) => setTweak("fontPair", v)} />

      <TweakSection label="Color" />
      <AccentChips value={t.accent} onChange={(v) => setTweak("accent", v)} />
      <TweakToggle label="Dark mode" value={t.dark}
        onChange={(v) => setTweak("dark", v)} />

      <TweakSection label="Save your pick" />
      <div style={{ fontSize: "10.5px", color: "rgba(41,38,27,.55)", lineHeight: 1.5, marginBottom: "2px" }}>
        Happy with it? Copy these settings and paste the <b>theme</b> block into <b>content.js</b> to make it permanent.
      </div>
      <TweakButton label="Copy theme settings" onClick={copySettings} />
    </TweaksPanel>
  );
}

(function mountTweaks() {
  const host = document.createElement("div");
  document.body.appendChild(host);
  ReactDOM.createRoot(host).render(<TweaksApp />);

  // tiny toast
  window.__twkToast = function (msg) {
    let el = document.getElementById("__twk_toast");
    if (!el) {
      el = document.createElement("div");
      el.id = "__twk_toast";
      el.style.cssText = "position:fixed;left:50%;bottom:24px;transform:translateX(-50%);z-index:2147483647;" +
        "background:rgba(41,38,27,.95);color:#fff;padding:10px 16px;border-radius:8px;font:13px/1.4 system-ui;" +
        "box-shadow:0 8px 30px rgba(0,0,0,.3);transition:opacity .3s;opacity:0;pointer-events:none";
      document.body.appendChild(el);
    }
    el.textContent = msg;
    el.style.opacity = "1";
    clearTimeout(window.__twkToastT);
    window.__twkToastT = setTimeout(() => { el.style.opacity = "0"; }, 2600);
  };
})();
