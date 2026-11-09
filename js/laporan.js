/**
 * UBParkir - Laporan & Feedback Page Script (laporan.js)
 * Segmented tabs, category selection, photo picker, 5-star rating, and submission
 */

document.addEventListener('DOMContentLoaded', () => {
  // Segmented Tabs: Laporan Kejadian & Feedback
  const tabLaporanKejadian = document.getElementById('tabLaporanKejadian');
  const tabFeedback = document.getElementById('tabFeedback');
  const viewLaporanKejadian = document.getElementById('viewLaporanKejadian');
  const viewFeedback = document.getElementById('viewFeedback');

  if (tabLaporanKejadian && tabFeedback && viewLaporanKejadian && viewFeedback) {
    tabLaporanKejadian.addEventListener('click', () => {
      tabLaporanKejadian.classList.add('active');
      tabFeedback.classList.remove('active');
      viewLaporanKejadian.classList.remove('d-none');
      viewFeedback.classList.add('d-none');
    });

    tabFeedback.addEventListener('click', () => {
      tabFeedback.classList.add('active');
      tabLaporanKejadian.classList.remove('active');
      viewFeedback.classList.remove('d-none');
      viewLaporanKejadian.classList.add('d-none');
    });
  }

  // Incident category pills selection
  const incidentPills = document.querySelectorAll('.incident-pill');
  let selectedIncident = 'Parkir liar';

  if (incidentPills.length > 0) {
    incidentPills.forEach((pill) => {
      pill.addEventListener('click', () => {
        incidentPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        selectedIncident = pill.getAttribute('data-category') || 'Parkir liar';
      });
    });
  }

  // Upload photo button & input
  const btnUploadFoto = document.getElementById('btnUploadFoto');
  const fileFotoLapor = document.getElementById('fileFotoLapor');
  const labelFotoText = document.getElementById('labelFotoText');

  if (btnUploadFoto && fileFotoLapor) {
    btnUploadFoto.addEventListener('click', () => {
      fileFotoLapor.click();
    });

    fileFotoLapor.addEventListener('change', () => {
      if (fileFotoLapor.files && fileFotoLapor.files[0] && labelFotoText) {
        labelFotoText.textContent = fileFotoLapor.files[0].name;
        btnUploadFoto.style.borderColor = '#1E5BD8';
        btnUploadFoto.style.color = '#1E5BD8';
      }
    });
  }

  // Form submit laporan kejadian
  const formLaporanKejadian = document.getElementById('formLaporanKejadian');
  const laporSuccessAlert = document.getElementById('laporSuccessAlert');

  if (formLaporanKejadian) {
    formLaporanKejadian.addEventListener('submit', (e) => {
      e.preventDefault();

      const lokasi = document.getElementById('inputLokasiParkir').value.trim();
      const btnSubmit = document.getElementById('btnSubmitReport');
      const origText = btnSubmit.innerHTML;

      btnSubmit.disabled = true;
      btnSubmit.innerHTML = `
        <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
        <span>Mengirim ke Petugas...</span>
      `;

      setTimeout(() => {
        btnSubmit.disabled = false;
        btnSubmit.innerHTML = origText;

        if (laporSuccessAlert) {
          laporSuccessAlert.textContent = `Laporan ${selectedIncident} di ${lokasi} berhasil dikirim ke pos pengamanan UB! ID Tiket: #UBP-${Math.floor(1000 + Math.random() * 9000)}.`;
          laporSuccessAlert.classList.remove('d-none');
        }

        formLaporanKejadian.reset();
        if (labelFotoText) {
          labelFotoText.textContent = 'Tambah foto (opsional)';
        }
        if (btnUploadFoto) {
          btnUploadFoto.style.borderColor = '';
          btnUploadFoto.style.color = '';
        }
      }, 700);
    });
  }

  // Feedback Star Rating & Topics
  const starBtns = document.querySelectorAll('.star-btn');
  const ratingTextLabel = document.getElementById('ratingTextLabel');
  const ratingTexts = {
    1: 'Sangat Kurang',
    2: 'Kurang',
    3: 'Cukup',
    4: 'Baik',
    5: 'Sangat Baik'
  };
  let currentRating = 4;

  if (starBtns.length > 0) {
    starBtns.forEach((star) => {
      star.addEventListener('click', () => {
        const starNum = parseInt(star.getAttribute('data-star'));
        currentRating = starNum;

        starBtns.forEach((s) => {
          const sNum = parseInt(s.getAttribute('data-star'));
          if (sNum <= starNum) {
            s.classList.add('filled');
            s.classList.remove('empty');
          } else {
            s.classList.add('empty');
            s.classList.remove('filled');
          }
        });

        if (ratingTextLabel && ratingTexts[starNum]) {
          ratingTextLabel.textContent = ratingTexts[starNum];
        }
      });
    });
  }

  // Topic pills selection
  const topicPills = document.querySelectorAll('.topic-pill');
  let selectedTopic = 'Akurasi data';
  if (topicPills.length > 0) {
    topicPills.forEach((pill) => {
      pill.addEventListener('click', () => {
        topicPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        selectedTopic = pill.getAttribute('data-topic') || 'Akurasi data';
      });
    });
  }

  // Feedback form submit
  const formFeedback = document.getElementById('formFeedback');
  const feedbackSuccessAlert = document.getElementById('feedbackSuccessAlert');
  if (formFeedback) {
    formFeedback.addEventListener('submit', (e) => {
      e.preventDefault();
      const btnSubmit = document.getElementById('btnSubmitFeedback');
      const origText = btnSubmit.innerHTML;

      btnSubmit.disabled = true;
      btnSubmit.innerHTML = `
        <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
        <span>Mengirim Feedback...</span>
      `;

      setTimeout(() => {
        btnSubmit.disabled = false;
        btnSubmit.innerHTML = origText;

        if (feedbackSuccessAlert) {
          feedbackSuccessAlert.textContent = `Terima kasih! Feedback Anda untuk topik "${selectedTopic}" dengan rating "${ratingTexts[currentRating] || 'Baik'}" berhasil dikirim.`;
          feedbackSuccessAlert.classList.remove('d-none');
        }
        formFeedback.reset();
      }, 600);
    });
  }
});

