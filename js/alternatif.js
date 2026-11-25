document.addEventListener('DOMContentLoaded', () => {
  const isGuest = window.UBParkirAuth ? window.UBParkirAuth.isGuest() : false;
  const activeNavAppLabel = document.getElementById('activeNavAppLabel');
  const savedApp = isGuest ? 'Google Maps' : (localStorage.getItem('ubparkir_nav_app') || 'Google Maps');

  if (activeNavAppLabel) {
    activeNavAppLabel.textContent = savedApp;
  }

  document.querySelectorAll('[data-rute-area]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const area = btn.getAttribute('data-rute-area');
      if (area && typeof window.bukaRute === 'function') {
        window.bukaRute(area);
      }
    });
  });

  const btnUbahNavigasi = document.getElementById('btnUbahNavigasi');
  const modalAplikasiNavEl = document.getElementById('modalAplikasiNav');
  const btnSimpanNavModal = document.getElementById('btnSimpanNavModal');

  if (btnUbahNavigasi && modalAplikasiNavEl && typeof bootstrap !== 'undefined') {
    const modalAplikasiNav = bootstrap.Modal.getOrCreateInstance(modalAplikasiNavEl);
    btnUbahNavigasi.addEventListener('click', () => {
      if (window.UBParkirAuth && window.UBParkirAuth.isGuest()) {
        window.UBParkirAuth.openGuestLoginModal('Opsi Navigasi');
        return;
      }

      const currentApp = localStorage.getItem('ubparkir_nav_app') || 'Google Maps';
      const matchingRadio = modalAplikasiNavEl.querySelector(`input[name="navApp"][value="${currentApp}"]`);
      if (matchingRadio) matchingRadio.checked = true;

      modalAplikasiNav.show();
    });

    if (btnSimpanNavModal) {
      btnSimpanNavModal.addEventListener('click', () => {
        const selectedRadio = modalAplikasiNavEl.querySelector('input[name="navApp"]:checked');
        const nextApp = selectedRadio ? selectedRadio.value : 'Google Maps';
        localStorage.setItem('ubparkir_nav_app', nextApp);
        if (activeNavAppLabel) activeNavAppLabel.textContent = nextApp;
        modalAplikasiNav.hide();

        if (typeof window.showToast === 'function') {
          window.showToast(`Aplikasi rute default diubah ke ${nextApp}.`, 'success', { title: 'Preferensi Disimpan' });
        }
      });
    }
  }
});
