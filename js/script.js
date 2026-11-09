/**
 * UBParkir - Core JavaScript
 * Handles SSO Login Simulation, Dashboard Interactions, Filters, Reports, and Real-time Predictions
 */

document.addEventListener('DOMContentLoaded', () => {
  // =========================================================================
  // 1. LOGIN & SSO AUTHENTICATION (index.html)
  // =========================================================================
  const ssoBtn = document.getElementById('btnSsoLogin');
  const ssoModalEl = document.getElementById('ssoModal');
  const ssoForm = document.getElementById('ssoLoginForm');
  const loginAlert = document.getElementById('loginAlert');
  const btnQuickDemo = document.getElementById('btnQuickDemo');
  const btnAutoFillModal = document.getElementById('btnAutoFillModal');
  const usernameInput = document.getElementById('ssoUsername');
  const passwordInput = document.getElementById('ssoPassword');

  // Credentials Demo
  const DEMO_USER = 'rifqi@student.ub.ac.id';
  const DEMO_PASS = 'brawijaya123';

  // Initialize Bootstrap Modal for SSO
  let ssoModal;
  if (ssoModalEl && typeof bootstrap !== 'undefined') {
    ssoModal = new bootstrap.Modal(ssoModalEl);
  }

  // Open modal on click "Masuk dengan SSO UB"
  if (ssoBtn && ssoModal) {
    ssoBtn.addEventListener('click', (e) => {
      e.preventDefault();
      ssoModal.show();
    });
  }

  // Auto-fill button inside modal
  if (btnAutoFillModal && usernameInput && passwordInput) {
    btnAutoFillModal.addEventListener('click', () => {
      usernameInput.value = DEMO_USER;
      passwordInput.value = DEMO_PASS;
      usernameInput.focus();
    });
  }

  // Quick 1-click Demo button on landing card
  if (btnQuickDemo) {
    btnQuickDemo.addEventListener('click', () => {
      if (ssoModal) {
        ssoModal.show();
      }
      setTimeout(() => {
        if (usernameInput && passwordInput) {
          usernameInput.value = DEMO_USER;
          passwordInput.value = DEMO_PASS;
        }
      }, 300);
    });
  }

  // Handle SSO Form Submission & Redirect to Dashboard
  if (ssoForm) {
    ssoForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const userVal = usernameInput.value.trim();
      const passVal = passwordInput.value.trim();

      if (!userVal || !passVal) {
        showLoginAlert('Mohon masukkan akun SSO dan kata sandi Anda.', 'danger');
        return;
      }

      const submitBtn = document.getElementById('btnSubmitLogin');
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
        <span>Memverifikasi SSO UB...</span>
      `;

      setTimeout(() => {
        submitBtn.innerHTML = `
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="me-2">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          <span>Berhasil! Membuka Dashboard...</span>
        `;
        showLoginAlert('Autentikasi SSO Brawijaya berhasil! Mengalihkan ke dashboard...', 'success');

        sessionStorage.setItem('ubparkir_logged_in', 'true');
        sessionStorage.setItem('ubparkir_user', 'Rifqi Fadhil Abrar');

        setTimeout(() => {
          window.location.href = 'dashboard.html';
        }, 800);
      }, 700);
    });
  }

  function showLoginAlert(message, type) {
    if (!loginAlert) return;
    loginAlert.className = `alert alert-${type} mt-3 mb-0 py-2 px-3 small text-center`;
    loginAlert.textContent = message;
    loginAlert.classList.remove('d-none');
  }

  // Parking slots click effect on landing page
  const dashedSlots = document.querySelectorAll('.parking-box.dashed');
  dashedSlots.forEach((slot) => {
    slot.addEventListener('click', () => {
      slot.style.borderColor = '#F2B601';
      setTimeout(() => {
        slot.style.borderColor = '';
      }, 600);
    });
  });

  // =========================================================================
  // 2. MOBILE SIDEBAR DRAWER NAVIGATION
  // =========================================================================
  const btnToggleSidebar = document.getElementById('btnToggleSidebar');
  const dashSidebar = document.getElementById('dashSidebar');
  const sidebarBackdrop = document.getElementById('sidebarBackdrop');

  if (btnToggleSidebar && dashSidebar && sidebarBackdrop) {
    btnToggleSidebar.addEventListener('click', () => {
      dashSidebar.classList.toggle('show');
      sidebarBackdrop.classList.toggle('show');
    });

    sidebarBackdrop.addEventListener('click', () => {
      dashSidebar.classList.remove('show');
      sidebarBackdrop.classList.remove('show');
    });
  }

  // =========================================================================
  // 3. DASHBOARD INTERACTIONS (dashboard.html)
  // =========================================================================
  const linkAturArea = document.getElementById('linkAturArea');
  const modalAturAreaEl = document.getElementById('modalAturArea');
  if (linkAturArea && modalAturAreaEl && typeof bootstrap !== 'undefined') {
    const modalAturArea = new bootstrap.Modal(modalAturAreaEl);
    linkAturArea.addEventListener('click', (e) => {
      e.preventDefault();
      modalAturArea.show();
    });
  }

  // Interactive Bar Chart Click / Tooltips on Dashboard
  const chartBars = document.querySelectorAll('.chart-bar');
  chartBars.forEach((bar) => {
    const time = bar.getAttribute('data-time') || 'Waktu';
    const val = bar.getAttribute('data-val') || 'Keterisian';
    bar.setAttribute('title', `${time} : ${val}`);
    bar.addEventListener('click', () => {
      alert(`Informasi Kepadatan:\nJam: ${time} WIB\nStatus: ${val}`);
    });
  });

  // =========================================================================
  // 4. AREA PARKIR UB: FILTER PILLS (area-parkir.html)
  // =========================================================================
  const filterPills = document.querySelectorAll('.filter-pill');
  const areaCardCols = document.querySelectorAll('.area-card-col');
  const areaCountLabel = document.getElementById('areaCountLabel');

  if (filterPills.length > 0 && areaCardCols.length > 0) {
    filterPills.forEach((pill) => {
      pill.addEventListener('click', () => {
        filterPills.forEach((p) => p.classList.remove('active'));
        pill.classList.add('active');

        const filterValue = pill.getAttribute('data-filter');
        let visibleCount = 0;

        areaCardCols.forEach((cardCol) => {
          const cardStatus = cardCol.getAttribute('data-status');
          if (filterValue === 'all' || cardStatus === filterValue) {
            cardCol.style.display = 'block';
            visibleCount++;
          } else {
            cardCol.style.display = 'none';
          }
        });

        if (areaCountLabel) {
          areaCountLabel.textContent = `${visibleCount} area ditampilkan`;
        }
      });
    });
  }

  // =========================================================================
  // 5. FORM LAPORAN KEJADIAN & FEEDBACK (laporan.html)
  // =========================================================================
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
      const deskripsi = document.getElementById('inputDeskripsiLapor').value.trim();

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

  // =========================================================================
  // 5b. FEEDBACK STAR RATING & TOPICS (laporan.html)
  // =========================================================================
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

  // =========================================================================
  // 6. ALTERNATIF PARKIR (alternatif.html)
  // =========================================================================
  const btnUbahNavigasi = document.getElementById('btnUbahNavigasi');
  const modalAplikasiNavEl = document.getElementById('modalAplikasiNav');
  if (btnUbahNavigasi && modalAplikasiNavEl && typeof bootstrap !== 'undefined') {
    const modalAplikasiNav = new bootstrap.Modal(modalAplikasiNavEl);
    btnUbahNavigasi.addEventListener('click', () => {
      modalAplikasiNav.show();
    });
  }

  // =========================================================================
  // 7. PREDIKSI TRAFFIC INTERAKTIF (prediksi.html)
  // =========================================================================
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

  // =========================================================================
  // 6. PROFIL PAGE INTERACTION (profil.html)
  // =========================================================================
  const btnProfileLogout = document.getElementById('btnProfileLogout');
  const sidebarLogoutLink = document.getElementById('sidebarLogoutLink');
  const modalLogoutConfirmEl = document.getElementById('modalLogoutConfirm');

  if (btnProfileLogout && modalLogoutConfirmEl && typeof bootstrap !== 'undefined') {
    btnProfileLogout.addEventListener('click', () => {
      const modal = new bootstrap.Modal(modalLogoutConfirmEl);
      modal.show();
    });
  }

  if (sidebarLogoutLink && modalLogoutConfirmEl && typeof bootstrap !== 'undefined') {
    sidebarLogoutLink.addEventListener('click', (e) => {
      e.preventDefault();
      const modal = new bootstrap.Modal(modalLogoutConfirmEl);
      modal.show();
    });
  }

  // Dashboard Area Checkboxes max 3 constraint
  const areaCheckboxes = document.querySelectorAll('.area-checkbox');
  const alertAreaLimit = document.getElementById('alertAreaLimit');
  const btnSaveDashboardAreas = document.getElementById('btnSaveDashboardAreas');
  const labelAreaCount = document.getElementById('labelAreaCount');
  const modalPengaturanDashboardEl = document.getElementById('modalPengaturanDashboard');

  if (areaCheckboxes.length > 0) {
    areaCheckboxes.forEach((cb) => {
      cb.addEventListener('change', () => {
        const checkedCount = document.querySelectorAll('.area-checkbox:checked').length;
        if (checkedCount > 3) {
          cb.checked = false;
          if (alertAreaLimit) alertAreaLimit.classList.remove('d-none');
        } else {
          if (alertAreaLimit) alertAreaLimit.classList.add('d-none');
        }
      });
    });

    if (btnSaveDashboardAreas && modalPengaturanDashboardEl && typeof bootstrap !== 'undefined') {
      btnSaveDashboardAreas.addEventListener('click', () => {
        const checkedCount = document.querySelectorAll('.area-checkbox:checked').length;
        if (labelAreaCount) {
          labelAreaCount.textContent = `${checkedCount} area ditampilkan`;
        }
        const modalInstance = bootstrap.Modal.getInstance(modalPengaturanDashboardEl);
        if (modalInstance) modalInstance.hide();
      });
    }
  }

  // Navigation App selection
  const btnSaveNavApp = document.getElementById('btnSaveNavApp');
  const labelNavApp = document.getElementById('labelNavApp');
  const modalOpsiNavigasiEl = document.getElementById('modalOpsiNavigasi');

  if (btnSaveNavApp && modalOpsiNavigasiEl && typeof bootstrap !== 'undefined') {
    btnSaveNavApp.addEventListener('click', () => {
      const selectedRadio = document.querySelector('input[name="navAppRadio"]:checked');
      if (selectedRadio && labelNavApp) {
        labelNavApp.textContent = selectedRadio.value;
      }
      const modalInstance = bootstrap.Modal.getInstance(modalOpsiNavigasiEl);
      if (modalInstance) modalInstance.hide();
    });
  }

  // =========================================================================
  // 7. DATA KENDARAAN INTERACTION (data-kendaraan.html)
  // =========================================================================
  const btnTypeMotor = document.getElementById('btnTypeMotor');
  const btnTypeMobil = document.getElementById('btnTypeMobil');
  const inputJenisKendaraan = document.getElementById('inputJenisKendaraan');
  const inputNomorPlat = document.getElementById('inputNomorPlat');
  const inputMerekModel = document.getElementById('inputMerekModel');
  const formKendaraan = document.getElementById('formKendaraan');
  const saveSuccessAlert = document.getElementById('saveSuccessAlert');
  const btnSaveVehicle = document.getElementById('btnSaveVehicle');

  if (btnTypeMotor && btnTypeMobil && inputJenisKendaraan) {
    btnTypeMotor.addEventListener('click', () => {
      btnTypeMotor.classList.add('active');
      btnTypeMobil.classList.remove('active');
      inputJenisKendaraan.value = 'Motor';
      if (inputNomorPlat) inputNomorPlat.placeholder = 'Contoh: N 1234 AB';
      if (inputMerekModel) inputMerekModel.placeholder = 'Contoh: Honda Beat';
    });

    btnTypeMobil.addEventListener('click', () => {
      btnTypeMobil.classList.add('active');
      btnTypeMotor.classList.remove('active');
      inputJenisKendaraan.value = 'Mobil';
      if (inputNomorPlat) inputNomorPlat.placeholder = 'Contoh: N 1234 ABC';
      if (inputMerekModel) inputMerekModel.placeholder = 'Contoh: Toyota Yaris';
    });
  }

  if (formKendaraan) {
    formKendaraan.addEventListener('submit', (e) => {
      e.preventDefault();
      const jenis = inputJenisKendaraan ? inputJenisKendaraan.value : 'Kendaraan';
      const plat = inputNomorPlat ? inputNomorPlat.value.trim().toUpperCase() : '';
      const model = inputMerekModel ? inputMerekModel.value.trim() : '';

      if (btnSaveVehicle) {
        const origText = btnSaveVehicle.innerHTML;
        btnSaveVehicle.disabled = true;
        btnSaveVehicle.innerHTML = `
          <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
          <span>Menyimpan...</span>
        `;

        setTimeout(() => {
          btnSaveVehicle.disabled = false;
          btnSaveVehicle.innerHTML = origText;

          if (saveSuccessAlert) {
            saveSuccessAlert.textContent = `Berhasil! Data ${jenis} ${plat} (${model}) telah disimpan ke profil Anda.`;
            saveSuccessAlert.classList.remove('d-none');
          }

          setTimeout(() => {
            window.location.href = 'profil.html';
          }, 1200);
        }, 600);
      }
    });
  }

  // =========================================================================
  // 8. PENGATURAN DASHBOARD INTERACTION (pengaturan-dashboard.html)
  // =========================================================================
  const areaSelectCards = document.querySelectorAll('.area-select-card');
  const counterDipilihText = document.getElementById('counterDipilihText');
  const limitWarningBanner = document.getElementById('limitWarningBanner');
  const previewDashList = document.getElementById('previewDashList');
  const badgeSavedStatus = document.getElementById('badgeSavedStatus');

  if (areaSelectCards.length > 0) {
    areaSelectCards.forEach((card) => {
      card.addEventListener('click', () => {
        const isSelected = card.classList.contains('selected');
        const selectedCards = document.querySelectorAll('.area-select-card.selected');
        const currentCount = selectedCards.length;

        if (isSelected) {
          // Deselect
          card.classList.remove('selected');
          updateDashboardSettingsView();
        } else {
          // Select
          if (currentCount >= 3) {
            // Already 3, show warning
            if (limitWarningBanner) {
              limitWarningBanner.classList.remove('d-none');
              limitWarningBanner.style.animation = 'none';
              void limitWarningBanner.offsetWidth; // trigger reflow
              limitWarningBanner.style.animation = 'pulse 0.4s ease';
            }
          } else {
            card.classList.add('selected');
            updateDashboardSettingsView();
          }
        }
      });
    });

    function updateDashboardSettingsView() {
      const selected = document.querySelectorAll('.area-select-card.selected');
      const count = selected.length;

      // Update counter text
      if (counterDipilihText) {
        counterDipilihText.textContent = `${count} dari 3 dipilih`;
      }

      // Show/hide warning banner
      if (limitWarningBanner) {
        if (count >= 3) {
          limitWarningBanner.classList.remove('d-none');
        } else {
          limitWarningBanner.classList.add('d-none');
        }
      }

      // Update right side preview list
      if (previewDashList) {
        previewDashList.innerHTML = '';
        selected.forEach((sc) => {
          const areaName = sc.getAttribute('data-area');
          const itemDiv = document.createElement('div');
          itemDiv.className = 'preview-dash-item';
          itemDiv.setAttribute('data-area', areaName);
          itemDiv.innerHTML = `
            <span class="preview-dash-dot"></span>
            <span>${areaName}</span>
          `;
          previewDashList.appendChild(itemDiv);
        });

        if (count === 0) {
          previewDashList.innerHTML = `
            <div class="text-white-50 small p-2 text-center">Belum ada area yang dipilih.</div>
          `;
        }
      }

      // Flash "Tersimpan otomatis"
      if (badgeSavedStatus) {
        badgeSavedStatus.style.transition = 'opacity 0.15s ease';
        badgeSavedStatus.style.opacity = '0.4';
        setTimeout(() => {
          badgeSavedStatus.style.opacity = '1';
        }, 200);
      }
    }
  }

  // =========================================================================
  // 9. OPSI NAVIGASI INTERACTION (opsi-navigasi.html)
  // =========================================================================
  const navCards = document.querySelectorAll('.nav-card');
  const navSavedStatus = document.getElementById('navSavedStatus');

  if (navCards.length > 0) {
    // Restore saved choice if any
    const savedApp = localStorage.getItem('ubparkir_nav_app') || 'Google Maps';
    navCards.forEach((c) => {
      const appName = c.getAttribute('data-app');
      if (appName === savedApp) {
        c.classList.add('selected');
      } else {
        c.classList.remove('selected');
      }
    });

    navCards.forEach((card) => {
      card.addEventListener('click', () => {
        const appName = card.getAttribute('data-app');
        navCards.forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');

        localStorage.setItem('ubparkir_nav_app', appName);

        if (navSavedStatus) {
          navSavedStatus.style.transition = 'opacity 0.15s ease';
          navSavedStatus.style.opacity = '0.3';
          setTimeout(() => {
            navSavedStatus.style.opacity = '1';
          }, 200);
        }
      });
    });
  }

  // Sync label in profil.html if present
  if (labelNavApp) {
    const savedApp = localStorage.getItem('ubparkir_nav_app');
    if (savedApp) {
      labelNavApp.textContent = savedApp;
    }
  }
});

// =========================================================================
// GLOBAL HELPER FUNCTIONS
// =========================================================================

// Fungsi Navigasi Rute
window.bukaRute = function(area) {
  alert(`Navigasi Aktif:\nMembuka rute tercepat menuju ${area} di Google Maps.\nEstimasi waktu tiba: 2-3 menit.`);
};

// Modal Denah Visual Interaktif
let currentSelectedSlot = null;

window.bukaDetailArea = function(nama, total, sisa, status) {
  const modalEl = document.getElementById('modalDetailSlot');
  if (!modalEl || typeof bootstrap === 'undefined') return;

  const modalTitle = document.getElementById('modalDetailTitle');
  const modalSubtitle = document.getElementById('modalDetailSubtitle');
  const slotGrid = document.getElementById('denahSlotGrid');
  const bookingAlert = document.getElementById('bookingAlert');
  const btnKonfirmasi = document.getElementById('btnKonfirmasiSlot');

  if (modalTitle) modalTitle.textContent = nama;
  if (modalSubtitle) modalSubtitle.textContent = `Total Kapasitas: ${total} | Tersisa: ${sisa} slot (${status === 'penuh' ? 'Penuh' : status === 'warning' ? 'Hampir Penuh' : 'Lega'})`;
  if (bookingAlert) bookingAlert.classList.add('d-none');
  if (btnKonfirmasi) btnKonfirmasi.disabled = true;

  // Render 18 Visual Slots (A1 - C6)
  if (slotGrid) {
    slotGrid.innerHTML = '';
    currentSelectedSlot = null;
    const totalSlots = 18;
    const availableCount = Math.min(Math.round((sisa / total) * totalSlots), totalSlots);

    for (let i = 1; i <= totalSlots; i++) {
      const rowLetter = i <= 6 ? 'A' : i <= 12 ? 'B' : 'C';
      const colNum = ((i - 1) % 6) + 1;
      const slotCode = `${rowLetter}${colNum}`;
      const isAvailable = (i <= availableCount) && sisa > 0;

      const slotDiv = document.createElement('div');
      slotDiv.className = `denah-slot ${isAvailable ? 'available' : 'occupied'}`;
      slotDiv.innerHTML = `<span>${slotCode}</span>`;
      slotDiv.title = isAvailable ? `Slot ${slotCode} (Tersedia)` : `Slot ${slotCode} (Terisi)`;

      if (isAvailable) {
        slotDiv.addEventListener('click', () => {
          document.querySelectorAll('.denah-slot').forEach(s => s.classList.remove('selected'));
          slotDiv.classList.add('selected');
          currentSelectedSlot = slotCode;
          if (btnKonfirmasi) btnKonfirmasi.disabled = false;

          if (bookingAlert) {
            bookingAlert.className = 'alert alert-warning mt-3 mb-0 py-2 px-3 small text-center';
            bookingAlert.textContent = `Anda memilih Slot ${slotCode} di ${nama}. Klik "Pesan Slot Parkir Sementara" untuk mengonfirmasi.`;
            bookingAlert.classList.remove('d-none');
          }
        });
      }

      slotGrid.appendChild(slotDiv);
    }
  }

  const modal = new bootstrap.Modal(modalEl);
  modal.show();

  if (btnKonfirmasi) {
    btnKonfirmasi.onclick = () => {
      if (!currentSelectedSlot) return;
      btnKonfirmasi.disabled = true;
      if (bookingAlert) {
        bookingAlert.className = 'alert alert-success mt-3 mb-0 py-2 px-3 small text-center';
        bookingAlert.textContent = `Berhasil! Slot ${currentSelectedSlot} di ${nama} telah dipesan sementara untuk 15 menit ke depan.`;
      }
    };
  }
};

window.bukaAlternatif = function(nama) {
  let saran = '';
  if (nama === 'Parkir FEB') {
    saran = 'Rekomendasi alternatif terdekat untuk Parkir FEB:\n1. Parkir FIA (Tersedia 38 slot, jarak 120m)\n2. Parkir Fakultas Teknik (Tersedia 64 slot, jarak 250m)';
  } else if (nama === 'Parkir FILKOM' || nama === 'Parkir Fakultas Pertanian') {
    saran = `Rekomendasi alternatif untuk ${nama}:\n1. Parkir Fakultas Teknik (Tersedia 64 slot - Status Lega)\n2. Parkir FIA (Tersedia 38 slot)\nJarak tempuh hanya sekitar 2-3 menit berjalan kaki.`;
  } else {
    saran = `Informasi:\n${nama} saat ini masih memiliki banyak slot kosong (Status: Lega). Anda dapat langsung menuju lokasi!`;
  }
  alert(saran);
};
