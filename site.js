(() => {
  const cfg = window.SYLIA_SITE || {};
  const links = cfg.links || {};
  const ledger = cfg.ledger || {};

  const setHref = (id, href) => {
    const el = document.getElementById(id);
    if (el && href) el.href = href;
  };

  setHref("discordLink", links.discord);
  setHref("tipsyLink", links.tipsy);
  setHref("youtubeLink", links.youtube);
  setHref("sunoLink", links.suno);
  setHref("ledgerTopLink", ledger.pageUrl || "bot-ledger.html");
  setHref("openLedger", ledger.pageUrl || "bot-ledger.html");

  // Lightweight poster fallback for browsers that cannot play the MP4.
  const video = document.getElementById("heroVideo");
  if (video) {
    const fallback = () => {
      const img = document.createElement("img");
      img.className = "gif-fallback";
      img.src = "assets/sylia-banner-poster.jpg";
      img.alt = "Sylia gothic landing banner";
      video.replaceWith(img);
    };
    video.addEventListener("error", fallback, {once:true});
    const p = video.play();
    if (p && typeof p.catch === "function") p.catch(() => {});
  }

  // Music
  const music = document.getElementById("siteMusic");
  const musicCard = document.getElementById("musicCard");
  const musicButton = document.getElementById("musicButton");
  if (music && musicButton) {
    music.volume = 0.28;
    musicButton.addEventListener("click", async () => {
      try {
        if (music.paused) {
          await music.play();
          musicCard?.classList.add("playing");
          musicButton.textContent = "pause Sylia's Cottage ♫";
        } else {
          music.pause();
          musicCard?.classList.remove("playing");
          musicButton.textContent = "play Sylia's Cottage ♫";
        }
      } catch {
        musicButton.textContent = "tap again to play ♫";
      }
    });
  }

  // Optional ledger status endpoint.
  const badge = document.getElementById("ledgerBadge");
  const statusText = document.getElementById("ledgerStatusText");
  const botCount = document.getElementById("ledgerBotCount");
  const lastSaved = document.getElementById("ledgerLastSaved");
  const lastEditor = document.getElementById("ledgerLastEditor");

  if (!ledger.statusEndpoint) {
    if (statusText) statusText.textContent = "Reserved for Nyx & Mav";
    if (botCount) botCount.textContent = "not connected";
    if (lastSaved) lastSaved.textContent = "not connected";
    if (lastEditor) lastEditor.textContent = "Sylia";
    return;
  }

  fetch(ledger.statusEndpoint, {headers:{"Accept":"application/json"}})
    .then(r => {
      if (!r.ok) throw new Error("status request failed");
      return r.json();
    })
    .then(data => {
      if (!data || data.ok === false) throw new Error("ledger offline");
      badge?.classList.add("live");
      if (statusText) statusText.textContent = "Ledger connected";
      if (botCount) botCount.textContent = String(data.botCount ?? "connected");
      if (lastSaved) {
        const d = data.lastSaved ? new Date(data.lastSaved) : null;
        lastSaved.textContent = d && !Number.isNaN(d.valueOf()) ? d.toLocaleString() : "connected";
      }
      if (lastEditor) lastEditor.textContent = data.lastEditor || "Sylia";
    })
    .catch(() => {
      if (statusText) statusText.textContent = "Ledger status unavailable";
      if (botCount) botCount.textContent = "offline";
      if (lastSaved) lastSaved.textContent = "offline";
    });
})();
