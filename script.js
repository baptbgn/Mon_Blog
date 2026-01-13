document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Merci pour votre message, Baptiste vous répondra bientôt !");
      form.reset();
    });
  }
});
document.getElementById("download-cv")?.addEventListener("click", () => {
  if (window.gtag) {
    window.gtag("event", "download_cv", {
      event_category: "engagement",
      event_label: "CV Baptiste Bergeon"
    });
  }

  // léger délai pour laisser partir l'event
  setTimeout(() => {
    window.location.href = "CV_Baptiste_Bergeon.pdf";
  }, 150);
});
