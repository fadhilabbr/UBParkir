document.addEventListener('DOMContentLoaded', () => {
  const isGuest = window.UBParkirAuth
    ? window.UBParkirAuth.isGuest()
    : (sessionStorage.getItem('ubparkir_role') !== 'sso' && sessionStorage.getItem('ubparkir_logged_in') !== 'true');

  if (isGuest) {
    const dashGreeting = document.getElementById('dashGreeting');
    const dashSubtitle = document.getElementById('dashSubtitle');
    const userProfileDropdown = document.getElementById('userProfileDropdown');
    const guestHeaderActions = document.getElementById('guestHeaderActions');
    const areaSectionTitle = document.getElementById('areaSectionTitle');
    const prediksiLockedOverlay = document.getElementById('prediksiLockedOverlay');
    const chartContainer = document.querySelector('#prediksiCardWrapper .chart-container') || document.querySelector('.chart-container');

    if (dashGreeting) dashGreeting.textContent = 'Selamat datang, Tamu';
    if (dashSubtitle) dashSubtitle.textContent = 'Pantau ketersediaan slot · Masuk SSO untuk prediksi, laporan & pengaturan';
    if (userProfileDropdown) userProfileDropdown.classList.add('d-none');
    if (guestHeaderActions) guestHeaderActions.classList.remove('d-none');
    if (areaSectionTitle) areaSectionTitle.textContent = 'Area parkir populer';
    if (prediksiLockedOverlay) prediksiLockedOverlay.classList.remove('d-none');
    if (chartContainer) chartContainer.classList.add('guest-chart-blurred');
    return;
  }

  const areaCatalog = window.UBParkirData ? window.UBParkirData.AREAS : {};
  const favoriteCardsContainer = document.getElementById('favoriteCardsContainer');

  if (favoriteCardsContainer && Object.keys(areaCatalog).length > 0) {
    try {
      const rawFavs = localStorage.getItem('ubparkir_fav_areas');
      if (rawFavs) {
        const favAreas = JSON.parse(rawFavs);
        if (Array.isArray(favAreas) && favAreas.length > 0) {
          favoriteCardsContainer.innerHTML = '';
          const colClass = favAreas.length === 1 ? 'col-12' : favAreas.length === 2 ? 'col-12 col-md-6' : 'col-12 col-md-4';

          favAreas.forEach((areaName) => {
            const data = areaCatalog[areaName];
            if (!data) return;

            const cardCol = document.createElement('div');
            cardCol.className = colClass;
            cardCol.innerHTML = `
              <div class="ub-card ub-card--padded h-100">
                <div class="d-flex align-items-center justify-content-between mb-2">
                  <h3 class="section-title">${data.name}</h3>
                  <span class="status-badge ${data.badgeClass}">${data.statusBadge}</span>
                </div>
                <div class="d-flex align-items-baseline gap-2 mb-3">
                  <span class="kpi-value">${data.sisa}</span>
                  <span class="meta-caption">slot tersisa dari <span class="font-mono-data">${data.kapasitas}</span></span>
                </div>
                <div class="ub-progress">
                  <div class="ub-progress-bar ub-progress-bar--${data.status}" style="width: ${data.progressWidth};"></div>
                </div>
              </div>
            `;
            favoriteCardsContainer.appendChild(cardCol);
          });
        }
      }
    } catch (e) {
      console.warn('Gagal memuat area favorit dari localStorage:', e);
    }
  }

  const chartBars = document.querySelectorAll('.chart-bar');
  chartBars.forEach((bar) => {
    const time = bar.getAttribute('data-time') || 'Waktu';
    const val = bar.getAttribute('data-val') || 'Keterisian';
    bar.setAttribute('title', `${time} : ${val}`);
    bar.addEventListener('click', () => {
      if (typeof window.showToast === 'function') {
        window.showToast(`Jam ${time} WIB: ${val}`, 'info', { title: 'Kepadatan Parkir FILKOM' });
      }
    });
  });
});
