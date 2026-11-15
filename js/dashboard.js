document.addEventListener('DOMContentLoaded', () => {
  const AREA_CATALOG = {
    'Parkir FILKOM': {
      name: 'Parkir FILKOM',
      kapasitas: 150,
      sisa: 12,
      statusBadge: 'Hampir penuh',
      badgeBg: '#FEF3C7',
      badgeColor: '#B45309',
      progressWidth: '92%',
      progressColor: '#F59E0B'
    },
    'Parkir Fakultas Teknik': {
      name: 'Parkir Fakultas Teknik',
      kapasitas: 200,
      sisa: 64,
      statusBadge: 'Lega',
      badgeBg: '#DCFCE7',
      badgeColor: '#15803D',
      progressWidth: '68%',
      progressColor: '#10B981'
    },
    'Parkir FEB': {
      name: 'Parkir FEB',
      kapasitas: 120,
      sisa: 0,
      statusBadge: 'Penuh',
      badgeBg: '#FEE2E2',
      badgeColor: '#B91C1C',
      progressWidth: '100%',
      progressColor: '#EF4444'
    },
    'Parkir FIA': {
      name: 'Parkir FIA',
      kapasitas: 90,
      sisa: 38,
      statusBadge: 'Lega',
      badgeBg: '#DCFCE7',
      badgeColor: '#15803D',
      progressWidth: '58%',
      progressColor: '#10B981'
    },
    'Parkir Fakultas Pertanian': {
      name: 'Parkir Fakultas Pertanian',
      kapasitas: 110,
      sisa: 5,
      statusBadge: 'Hampir penuh',
      badgeBg: '#FEF3C7',
      badgeColor: '#B45309',
      progressWidth: '95%',
      progressColor: '#F59E0B'
    },
    'Parkir FIB': {
      name: 'Parkir FIB',
      kapasitas: 80,
      sisa: 21,
      statusBadge: 'Hampir penuh',
      badgeBg: '#FEF3C7',
      badgeColor: '#B45309',
      progressWidth: '74%',
      progressColor: '#F59E0B'
    }
  };

  const favoriteCardsContainer = document.getElementById('favoriteCardsContainer');
  if (favoriteCardsContainer) {
    try {
      const rawFavs = localStorage.getItem('ubparkir_fav_areas');
      if (rawFavs) {
        const favAreas = JSON.parse(rawFavs);
        if (Array.isArray(favAreas) && favAreas.length > 0) {
          favoriteCardsContainer.innerHTML = '';
          const colClass = favAreas.length === 1 ? 'col-12' : favAreas.length === 2 ? 'col-12 col-md-6' : 'col-12 col-md-4';

          favAreas.forEach((areaName) => {
            const data = AREA_CATALOG[areaName];
            if (!data) return;

            const cardCol = document.createElement('div');
            cardCol.className = colClass;
            cardCol.innerHTML = `
              <div class="card border-0 shadow-sm p-3 h-100" style="border-radius: 16px;">
                <div class="d-flex align-items-center justify-content-between mb-2">
                  <h3 class="fw-bold text-dark fs-6 mb-0">${data.name}</h3>
                  <span class="badge rounded-pill fw-bold" style="background-color: ${data.badgeBg}; color: ${data.badgeColor}; font-size: 0.72rem;">${data.statusBadge}</span>
                </div>
                <div class="d-flex align-items-baseline gap-2 mb-3">
                  <span class="fw-bold text-dark" style="font-size: 2.25rem; line-height: 1;">${data.sisa}</span>
                  <span class="text-muted small">slot tersisa dari ${data.kapasitas}</span>
                </div>
                <div class="progress" style="height: 6px; background-color: #E5E7EB; border-radius: 10px;">
                  <div class="progress-bar rounded-pill" style="width: ${data.progressWidth}; background-color: ${data.progressColor};"></div>
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
      alert(`Informasi Kepadatan Parkir:\nJam: ${time} WIB\nStatus: ${val}`);
    });
  });
});
