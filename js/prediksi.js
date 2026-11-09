/**
 * UBParkir - Prediksi Page Script (prediksi.js)
 * Interactive traffic prediction selector & dynamic hourly bar highlights
 */

document.addEventListener('DOMContentLoaded', () => {
  const choiceBtns = document.querySelectorAll('.filter-choice-btn');
  let selectedArea = 'FILKOM';
  let selectedTime = '08-10';

  if (choiceBtns.length > 0) {
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

      let peakVal = '95%';
      let status = 'Penuh';
      let statusBg = '#FEE2E2';
      let statusColor = '#B91C1C';
      let desc = 'Kemungkinan besar penuh. Pertimbangkan area alternatif.';

      if (time === '06-08') {
        highlightBar('06');
        highlightBar('07');
        peakVal = '45%';
        status = 'Lega';
        statusBg = '#DCFCE7';
        statusColor = '#15803D';
        desc = 'Kondisi parkir masih sangat longgar. Waktu yang baik untuk parkir.';
      } else if (time === '08-10') {
        highlightBar('08');
        highlightBar('09');
        peakVal = '95%';
        status = 'Penuh';
        statusBg = '#FEE2E2';
        statusColor = '#B91C1C';
        desc = 'Kemungkinan besar penuh. Pertimbangkan area alternatif.';
      } else if (time === '10-12') {
        highlightBar('10');
        highlightBar('11');
        peakVal = '97%';
        status = 'Penuh';
        statusBg = '#FEE2E2';
        statusColor = '#B91C1C';
        desc = 'Puncak perkuliahan siang. Slot parkir sangat terbatas.';
      } else if (time === '12-14') {
        highlightBar('12');
        highlightBar('13');
        peakVal = '85%';
        status = 'Hampir penuh';
        statusBg = '#FEF3C7';
        statusColor = '#B45309';
        desc = 'Kepadatan mulai sedikit menurun pasca jam istirahat siang.';
      } else if (time === '14-16') {
        highlightBar('14');
        highlightBar('15');
        peakVal = '70%';
        status = 'Lega';
        statusBg = '#DCFCE7';
        statusColor = '#15803D';
        desc = 'Kondisi parkir berangsur lengang menjelang jam pulang sore.';
      }

      if (summaryLabel) summaryLabel.textContent = `Prediksi ${time.replace('-', '–')} · ${area}`;
      if (bigVal) bigVal.textContent = peakVal;
      if (descText) descText.textContent = desc;
      if (badgeStatus) {
        badgeStatus.textContent = status;
        badgeStatus.style.backgroundColor = statusBg;
        badgeStatus.style.color = statusColor;
      }
    }

    function highlightBar(hour) {
      const b = document.getElementById(`bar-${hour}`);
      if (b) b.classList.add('highlight');
    }
  }
});

