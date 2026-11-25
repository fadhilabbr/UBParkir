document.addEventListener('DOMContentLoaded', () => {
  const navCards = document.querySelectorAll('.nav-card');
  const navSavedStatus = document.getElementById('navSavedStatus');

  if (navCards.length === 0) return;

  const savedApp = localStorage.getItem('ubparkir_nav_app') || 'Google Maps';
  navCards.forEach((c) => {
    const isMatch = c.getAttribute('data-app') === savedApp;
    c.classList.toggle('selected', isMatch);
    c.setAttribute('aria-checked', String(isMatch));
  });

  function selectNavCard(card) {
    const appName = card.getAttribute('data-app');
    navCards.forEach((c) => {
      c.classList.remove('selected');
      c.setAttribute('aria-checked', 'false');
    });
    card.classList.add('selected');
    card.setAttribute('aria-checked', 'true');

    localStorage.setItem('ubparkir_nav_app', appName);

    if (navSavedStatus) {
      navSavedStatus.style.transition = 'opacity 0.15s ease';
      navSavedStatus.style.opacity = '0.3';
      setTimeout(() => {
        navSavedStatus.style.opacity = '1';
      }, 200);
    }
  }

  navCards.forEach((card) => {
    card.addEventListener('click', () => selectNavCard(card));
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        selectNavCard(card);
      }
    });
  });
});
