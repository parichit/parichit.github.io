/* ============================================================================
   design-mode.js — loads the live "Design studio" (Tweaks) panel ONLY when the
   page is viewed inside the design preview (an iframe). On your real github.io
   site this does nothing, so visitors never receive React/Babel. Shared by
   every page. You don't need to edit this.
   ============================================================================ */
(function () {
  var designMode = (window.self !== window.top) ||
                   /[?&](design|tweaks)\b/.test(location.search);
  if (!designMode) return;

  function add(src, opts) {
    return new Promise(function (res) {
      var s = document.createElement("script");
      s.src = src; s.onload = res;
      if (opts && opts.integrity) { s.integrity = opts.integrity; s.crossOrigin = "anonymous"; }
      document.head.appendChild(s);
    });
  }
  add("https://unpkg.com/react@18.3.1/umd/react.development.js",
      { integrity: "sha384-hD6/rw4ppMLGNu3tX5cjIb+uRZ7UkRJ6BPkLpg4hAu/6onKUg4lLsHAs9EBPT82L" })
    .then(function () {
      return add("https://unpkg.com/react-dom@18.3.1/umd/react-dom.development.js",
        { integrity: "sha384-u6aeetuaXnQ38mYT8rp6sbXaQe3NL9t+IBXmnYxwkUI2Hw4bsp2Wvmx4yRQF1uAm" });
    })
    .then(function () {
      return add("https://unpkg.com/@babel/standalone@7.29.0/babel.min.js",
        { integrity: "sha384-m08KidiNqLdpJqLq95G/LEi8Qvjl/xUYll3QILypMoQ65QorJ9Lvtp2RXYGBFj1y" });
    })
    .then(function () {
      ["tweaks-panel.jsx", "tweaks-app.jsx"].forEach(function (src) {
        var s = document.createElement("script");
        s.type = "text/babel";
        s.setAttribute("data-presets", "react");
        s.src = src;
        document.body.appendChild(s);
      });
      window.Babel.transformScriptTags();
    });
})();
