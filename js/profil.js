document.addEventListener('DOMContentLoaded', () => {
  const btnProfileLogout = document.getElementById('btnProfileLogout');
  const sidebarLogoutLink = document.getElementById('sidebarLogoutLink');
  const btnConfirmLogout = document.getElementById('btnConfirmLogout');
  const modalLogoutConfirmEl = document.getElementById('modalLogoutConfirm');

  if (btnProfileLogout && modalLogoutConfirmEl && typeof bootstrap !== 'undefined') {
    btnProfileLogout.addEventListener('click', () => {
      const modal = bootstrap.Modal.getOrCreateInstance(modalLogoutConfirmEl);
      modal.show();
    });
  }

  if (sidebarLogoutLink && modalLogoutConfirmEl && typeof bootstrap !== 'undefined') {
    sidebarLogoutLink.addEventListener('click', (e) => {
      e.preventDefault();
      const modal = bootstrap.Modal.getOrCreateInstance(modalLogoutConfirmEl);
      modal.show();
    });
  }

  if (btnConfirmLogout) {
    btnConfirmLogout.addEventListener('click', (e) => {
      e.preventDefault();
      if (window.UBParkirAuth && typeof window.UBParkirAuth.logout === 'function') {
        window.UBParkirAuth.logout();
      } else {
        sessionStorage.removeItem('ubparkir_role');
        sessionStorage.removeItem('ubparkir_logged_in');
        sessionStorage.removeItem('ubparkir_user');
        window.location.href = 'index.html';
      }
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

  const labelVehicleSummary = document.getElementById('labelVehicleSummary');
  if (labelVehicleSummary) {
    try {
      const rawVehicle = localStorage.getItem('ubparkir_vehicle');
      if (rawVehicle) {
        const vehicle = JSON.parse(rawVehicle);
        if (vehicle && vehicle.plat && vehicle.model) {
          labelVehicleSummary.textContent = `${vehicle.jenis || 'Kendaraan'} · ${vehicle.plat} (${vehicle.model})`;
        }
      }
    } catch (e) {}
  }
});
