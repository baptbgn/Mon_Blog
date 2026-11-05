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
// Menu « Études » : le mot « Études » ouvre sa page,
// et la flèche affiche uniquement les deux sous-catégories.
const etudesNav = document.querySelector('.nav-etudes');
if (etudesNav) {
  const etudesToggle = etudesNav.querySelector('.nav-etudes-toggle');

  const setEtudesOpen = (isOpen) => {
    etudesNav.classList.toggle('is-open', isOpen);
    etudesToggle.setAttribute('aria-expanded', String(isOpen));
  };

  etudesToggle.addEventListener('click', () => {
    setEtudesOpen(!etudesNav.classList.contains('is-open'));
  });

  document.addEventListener('click', (event) => {
    if (!etudesNav.contains(event.target)) setEtudesOpen(false);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && etudesNav.classList.contains('is-open')) {
      setEtudesOpen(false);
      etudesToggle.focus();
    }
  });
}
