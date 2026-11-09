/**
 * UBParkir - Dashboard Page Script (dashboard.js)
 * Chart tooltips and quick navigation
 */

document.addEventListener('DOMContentLoaded', () => {
  // Interactive Bar Chart Click / Tooltips on Dashboard
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

