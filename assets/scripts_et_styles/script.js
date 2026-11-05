// Le formulaire de contact est géré dans contact.html via /api/contact.
// Il ne doit pas être intercepté une seconde fois par ce script.

document.getElementById("download-cv")?.addEventListener("click", (event) => {
  event.preventDefault();

  if (window.gtag) {
    window.gtag("event", "download_cv", {
      event_category: "engagement",
      event_label: "CV Baptiste Bergeon"
    });
  }

  // Léger délai pour laisser partir l'événement de suivi.
  setTimeout(() => {
    window.location.href = "./assets/CV_Baptiste_Bergeon.pdf";
  }, 150);
});
