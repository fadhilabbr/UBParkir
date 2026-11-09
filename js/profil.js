/**
 * UBParkir - Profil Page Script (profil.js)
 * User logout modal and settings label sync
 */

document.addEventListener('DOMContentLoaded', () => {
  const btnProfileLogout = document.getElementById('btnProfileLogout');
  const sidebarLogoutLink = document.getElementById('sidebarLogoutLink');
  const modalLogoutConfirmEl = document.getElementById('modalLogoutConfirm');

  if (btnProfileLogout && modalLogoutConfirmEl && typeof bootstrap !== 'undefined') {
    btnProfileLogout.addEventListener('click', () => {
      const modal = new bootstrap.Modal(modalLogoutConfirmEl);
      modal.show();
    });
  }

  if (sidebarLogoutLink && modalLogoutConfirmEl && typeof bootstrap !== 'undefined') {
    sidebarLogoutLink.addEventListener('click', (e) => {
      e.preventDefault();
      const modal = new bootstrap.Modal(modalLogoutConfirmEl);
      modal.show();
    });
  }

  // Sync navigation preference label from localStorage
  const labelNavApp = document.getElementById('labelNavApp');
  if (labelNavApp) {
    const savedApp = localStorage.getItem('ubparkir_nav_app');
    if (savedApp) {
      labelNavApp.textContent = savedApp;
    }
  }
});

