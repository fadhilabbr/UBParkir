document.addEventListener('DOMContentLoaded', () => {
  const choiceBtns = document.querySelectorAll('.filter-choice-btn');
  let selectedArea = 'FILKOM';
  let selectedTime = '08-10';

  if (choiceBtns.length === 0) return;

  const summaryLabel = document.getElementById('prediksiSummaryLabel');
  const badgeStatus = document.getElementById('prediksiBadgeStatus');
  const bigVal = document.getElementById('prediksiBigVal');
  const descText = document.getElementById('prediksiDescText');
  const allPrediksiBars = document.querySelectorAll('.prediksi-bar');

  choiceBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const type = btn.getAttribute('data-type');
      const val = btn.getAttribute('data-value');

      document.querySelectorAll(`.filter-choice-btn[data-type="${type}"]`).forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      if (type === 'area') {
        selectedArea = val;
      } else if (type === 'time') {
        selectedTime = val;
      }

      updatePrediksiView(selectedArea, selectedTime);
    });
  });

  function updatePrediksiView(area, time) {
    allPrediksiBars.forEach(b => b.classList.remove('highlight'));

    const summary = window.UBParkirData
      ? window.UBParkirData.getPredictionSummary(area, time)
      : null;

    if (!summary) return;

    Object.entries(summary.hourly).forEach(([hour, pct]) => {
      const bar = document.getElementById(`bar-${hour}`);
      if (!bar) return;

      bar.style.height = `${pct}%`;
      bar.setAttribute('title', `${hour}:00 - ${pct}% Terisi`);

      const col = bar.closest('.prediksi-col');
      const valLabel = col ? col.querySelector('.prediksi-val-label') : null;
      if (valLabel) {
        valLabel.textContent = `${pct}%`;
      }
    });

    summary.hours.forEach((hour) => {
      const b = document.getElementById(`bar-${hour}`);
      if (b) b.classList.add('highlight');
    });

    if (summaryLabel) summaryLabel.textContent = `Prediksi ${time.replace('-', '–')} · ${area}`;
    if (bigVal) bigVal.textContent = `${summary.peak}%`;
    if (descText) descText.textContent = summary.desc;
    if (badgeStatus) {
      badgeStatus.textContent = summary.status;
      badgeStatus.className = `status-badge ${summary.badgeClass}`;
    }
  }

  updatePrediksiView(selectedArea, selectedTime);
});
