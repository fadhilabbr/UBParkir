/**
 * UBParkir - Opsi Navigasi Page Script (opsi-navigasi.js)
 * Navigation app selection, localStorage persistence, and autosave feedback
 */

document.addEventListener('DOMContentLoaded', () => {
  const navCards = document.querySelectorAll('.nav-card');
  const navSavedStatus = document.getElementById('navSavedStatus');

  if (navCards.length > 0) {
    // Restore saved choice if any
    const savedApp = localStorage.getItem('ubparkir_nav_app') || 'Google Maps';
    navCards.forEach((c) => {
      const appName = c.getAttribute('data-app');
      if (appName === savedApp) {
        c.classList.add('selected');
      } else {
        c.classList.remove('selected');
      }
    });

    navCards.forEach((card) => {
      card.addEventListener('click', () => {
        const appName = card.getAttribute('data-app');
        navCards.forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');

        localStorage.setItem('ubparkir_nav_app', appName);

        if (navSavedStatus) {
          navSavedStatus.style.transition = 'opacity 0.15s ease';
          navSavedStatus.style.opacity = '0.3';
          setTimeout(() => {
            navSavedStatus.style.opacity = '1';
          }, 200);
        }
      });
    });
  }
});

