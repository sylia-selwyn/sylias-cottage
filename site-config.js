/*
  SYLIA SITE CONFIG
  Mav: edit this file first.

  IMPORTANT:
  - Do not paste private GitHub tokens, PATs or API secrets here.
  - This file is public when the site is published.
*/
window.SYLIA_SITE = {
  links: {
    discord: "https://discord.gg/mUpmzAUXRK",
    tipsy: "https://tipsy.chat/profile/1772922250908843841?tab=Characters",
    youtube: "https://www.youtube.com/channel/UC1XHCKAry81lm6rTPPmYl3g"
  },

  ledger: {
    // Keep this filename if you replace the included placeholder with Sylia's real ledger.
    pageUrl: "https://script.google.com/macros/s/AKfycbxKAFKE3E_vR1GYkCmMpJFRHimbJWrP6cQAu3RsuGhwPZTaHIfcjsKO2Wh4zMeuss5l/exec",

    // OPTIONAL:
    // If Sylia's backend later exposes a public READ-ONLY JSON status route,
    // place that URL here. Leave blank if you only want the Open Ledger button.
    //
    // Expected JSON:
    // {
    //   "ok": true,
    //   "botCount": 12,
    //   "lastSaved": "2026-09-03T19:00:00Z",
    //   "lastEditor": "Sylia"
    // }
    statusEndpoint: ""
  }
};
