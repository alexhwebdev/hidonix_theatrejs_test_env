'use client';

import Script from 'next/script';
// import { useEffect } from 'react';

export default function IubendaConsent() {
  // useEffect(() => {}, []);

  return (
    <>
      <Script id="iubenda-config" strategy="beforeInteractive" dangerouslySetInnerHTML={{
        __html: `
          var _iub = _iub || [];
          _iub.csConfiguration = {
            "askConsentAtCookiePolicyUpdate": true,
            "ccpaAcknowledgeOnDisplay": true,
            "ccpaApplies": true,
            "consentOnContinuedBrowsing": false,
            "enableCcpa": true,
            "enableRemoteConsent": true,
            "invalidateConsentWithoutLog": true,
            "perPurposeConsent": true,
            "siteId": 1927160,
            "whitelabel": false,
            "cookiePolicyId": 34502914,
            "banner": {
              "acceptButtonColor": "#363636",
              "acceptButtonDisplay": true,
              "closeButtonRejects": true,
              "customizeButtonColor": "#363636",
              "customizeButtonDisplay": true,
              "explicitWithdrawal": true,
              "fontSize": "13px",
              "listPurposes": true,
              "logo": null,
              "position": "float-bottom-left",
              "rejectButtonColor": "#363636",
              "rejectButtonDisplay": true
            }
          };
          _iub.csLangConfiguration = {
            "en": { "cookiePolicyId": 34502914 },
            "it": { "cookiePolicyId": 71271408 }
          };
        `
      }} />

      <Script
        src="https://cs.iubenda.com/sync/1927160.js"
        strategy="afterInteractive"
      />
      <Script
        src="https://cdn.iubenda.com/cs/ccpa/stub.js"
        strategy="afterInteractive"
      />
      <Script
        src="https://cdn.iubenda.com/cs/iubenda_cs.js"
        strategy="afterInteractive"
        charSet="UTF-8"
      />
    </>
  );
}
