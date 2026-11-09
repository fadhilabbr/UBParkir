/**
 * UBParkir - Alternatif Parkir Page Script (alternatif.js)
 * Alternative parking recommendations & navigation app picker modal
 */

document.addEventListener('DOMContentLoaded', () => {
  const btnUbahNavigasi = document.getElementById('btnUbahNavigasi');
  const modalAplikasiNavEl = document.getElementById('modalAplikasiNav');
  
  if (btnUbahNavigasi && modalAplikasiNavEl && typeof bootstrap !== 'undefined') {
    const modalAplikasiNav = new bootstrap.Modal(modalAplikasiNavEl);
    btnUbahNavigasi.addEventListener('click', () => {
      modalAplikasiNav.show();
    });
  }
});

