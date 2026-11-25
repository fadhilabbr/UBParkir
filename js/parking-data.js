(function () {
  const AREAS = {
    'Parkir FILKOM': {
      name: 'Parkir FILKOM',
      kapasitas: 150,
      sisa: 12,
      status: 'warning',
      statusBadge: 'Hampir penuh',
      badgeClass: 'status-badge--warning',
      progressWidth: '92%',
      progressColor: '#F59E0B',
      alternatives: [
        { name: 'Parkir Fakultas Teknik', sisa: 64, status: 'Lega', jarak: '± 300 m (2 menit)' },
        { name: 'Parkir FIA', sisa: 38, status: 'Lega', jarak: '± 550 m (3 menit)' }
      ]
    },
    'Parkir Fakultas Teknik': {
      name: 'Parkir Fakultas Teknik',
      kapasitas: 200,
      sisa: 64,
      status: 'lega',
      statusBadge: 'Lega',
      badgeClass: 'status-badge--lega',
      progressWidth: '68%',
      progressColor: '#10B981',
      alternatives: []
    },
    'Parkir FEB': {
      name: 'Parkir FEB',
      kapasitas: 120,
      sisa: 0,
      status: 'penuh',
      statusBadge: 'Penuh',
      badgeClass: 'status-badge--penuh',
      progressWidth: '100%',
      progressColor: '#EF4444',
      alternatives: [
        { name: 'Parkir FIA', sisa: 38, status: 'Lega', jarak: '± 120 m (1 menit)' },
        { name: 'Parkir Fakultas Teknik', sisa: 64, status: 'Lega', jarak: '± 250 m (2 menit)' }
      ]
    },
    'Parkir FIA': {
      name: 'Parkir FIA',
      kapasitas: 90,
      sisa: 38,
      status: 'lega',
      statusBadge: 'Lega',
      badgeClass: 'status-badge--lega',
      progressWidth: '58%',
      progressColor: '#10B981',
      alternatives: []
    },
    'Parkir Fakultas Pertanian': {
      name: 'Parkir Fakultas Pertanian',
      kapasitas: 110,
      sisa: 5,
      status: 'warning',
      statusBadge: 'Hampir penuh',
      badgeClass: 'status-badge--warning',
      progressWidth: '95%',
      progressColor: '#F59E0B',
      alternatives: [
        { name: 'Parkir Fakultas Teknik', sisa: 64, status: 'Lega', jarak: '± 350 m (3 menit)' },
        { name: 'Parkir FIA', sisa: 38, status: 'Lega', jarak: '± 450 m (4 menit)' }
      ]
    },
    'Parkir FIB': {
      name: 'Parkir FIB',
      kapasitas: 80,
      sisa: 21,
      status: 'warning',
      statusBadge: 'Hampir penuh',
      badgeClass: 'status-badge--warning',
      progressWidth: '74%',
      progressColor: '#F59E0B',
      alternatives: [
        { name: 'Parkir FIA', sisa: 38, status: 'Lega', jarak: '± 250 m (2 menit)' },
        { name: 'Parkir Fakultas Teknik', sisa: 64, status: 'Lega', jarak: '± 400 m (3 menit)' }
      ]
    }
  };

  const DEFAULT_FAVORITES = [
    'Parkir FILKOM',
    'Parkir Fakultas Teknik',
    'Parkir FEB'
  ];

  const PREDICTION_DATA = {
    'FILKOM': {
      hourly: { '06': 20, '07': 45, '08': 78, '09': 95, '10': 97, '11': 90, '12': 85, '13': 80, '14': 70, '15': 55 }
    },
    'Fakultas Teknik': {
      hourly: { '06': 16, '07': 34, '08': 58, '09': 68, '10': 74, '11': 71, '12': 62, '13': 64, '14': 54, '15': 40 }
    },
    'FEB': {
      hourly: { '06': 24, '07': 52, '08': 88, '09': 98, '10': 100, '11': 96, '12': 89, '13': 84, '14': 76, '15': 61 }
    }
  };

  function getPredictionSummary(area, timeRange) {
    const areaEntry = PREDICTION_DATA[area] || PREDICTION_DATA['FILKOM'];
    const parts = String(timeRange || '08-10').split('-');
    const h1 = parts[0] || '08';
    const h2 = String(parseInt(h1, 10) + 1).padStart(2, '0');
    const v1 = areaEntry.hourly[h1] ?? 50;
    const v2 = areaEntry.hourly[h2] ?? v1;
    const peak = Math.max(v1, v2);

    let status = 'Lega';
    let badgeClass = 'status-badge--lega';
    let desc = 'Kondisi parkir masih longgar. Waktu yang baik untuk parkir.';

    if (peak >= 90) {
      status = 'Penuh';
      badgeClass = 'status-badge--penuh';
      desc = 'Kemungkinan besar penuh. Pertimbangkan area alternatif terdekat.';
    } else if (peak >= 75) {
      status = 'Hampir penuh';
      badgeClass = 'status-badge--warning';
      desc = 'Kepadatan tinggi pada jam ini. Siapkan area cadangan.';
    }

    return {
      hours: [h1, h2],
      peak,
      status,
      badgeClass,
      desc,
      hourly: areaEntry.hourly
    };
  }

  window.UBParkirData = {
    AREAS,
    DEFAULT_FAVORITES,
    PREDICTION_DATA,
    getPredictionSummary
  };
})();
