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

  const labelNavApp = document.getElementById('labelNavApp');
  if (labelNavApp) {
    const savedApp = localStorage.getItem('ubparkir_nav_app');
    if (savedApp) {
      labelNavApp.textContent = savedApp;
    }
  }

  const labelAreaCount = document.getElementById('labelAreaCount');
  if (labelAreaCount) {
    try {
      const saved = JSON.parse(localStorage.getItem('ubparkir_fav_areas') || '[]');
      if (Array.isArray(saved) && saved.length > 0) {
        labelAreaCount.textContent = `${saved.length} area ditampilkan`;
      }
    } catch (e) {}
  }

  const areaCheckboxes = document.querySelectorAll('#dashboardAreaCheckboxes .area-checkbox');
  areaCheckboxes.forEach((cb) => {
    cb.addEventListener('change', () => {
      const checkedBoxes = document.querySelectorAll('#dashboardAreaCheckboxes .area-checkbox:checked');
      if (checkedBoxes.length > 3) {
        cb.checked = false;
        if (typeof window.showToast === 'function') {
          window.showToast('Maksimal 3 area parkir telah dipilih. Lepas salah satu area terlebih dahulu.', 'warning');
        }
      }
    });
  });
});
