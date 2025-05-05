"use client";

import Script from "next/script";

export default function IubendaLinks() {
  return (
    <div className="iubenda-footer">
      {/* Privacy Policy Link */}
      <a
        href="https://www.iubenda.com/privacy-policy/34502914"
        className="iubenda-white no-brand iubenda-noiframe iubenda-embed iubenda-noiframe iub-body-embed"
        title="Privacy Policy"
      >
        Privacy Policy
      </a>

      {/* Cookie Policy Link */}
      <a
        href="https://www.iubenda.com/privacy-policy/34502914/cookie-policy"
        className="iubenda-white no-brand iubenda-noiframe iubenda-embed iubenda-noiframe iub-body-embed"
        title="Cookie Policy"
      >
        Cookie Policy
      </a>

      {/* Iubenda Script */}
      <Script
        src="https://cdn.iubenda.com/iubenda.js"
        strategy="lazyOnload"
      />

      {/* <script type="text/javascript">(function (w,d) {var loader = function () {var s = d.createElement("script"), tag = d.getElementsByTagName("script")[0]; s.src="https://cdn.iubenda.com/iubenda.js"; tag.parentNode.insertBefore(s,tag);}; if(w.addEventListener){w.addEventListener("load", loader, false);}else if(w.attachEvent){w.attachEvent("onload", loader);}else{w.onload = loader;}})(window, document);</script> */}
    </div>
  );
}
