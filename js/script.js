/**
 * UBParkir - Core JavaScript
 * Handles SSO Login Simulation, Dashboard Interactions, and Mobile Navigation
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

  // Initialize Modal
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

  // Quick 1-click Demo button on card
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

      // Validasi kredensial (Demo)
      const submitBtn = document.getElementById('btnSubmitLogin');
      const originalHtml = submitBtn.innerHTML;

      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
        <span>Memverifikasi SSO UB...</span>
      `;

      setTimeout(() => {
        // Cek kecocokan (atau izinkan login jika form diisi)
        submitBtn.innerHTML = `
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="me-2">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          <span>Berhasil! Membuka Dashboard...</span>
        `;
        showLoginAlert('Autentikasi SSO Brawijaya berhasil! Mengalihkan ke dashboard...', 'success');

        // Simpan sesi login
        sessionStorage.setItem('ubparkir_logged_in', 'true');
        sessionStorage.setItem('ubparkir_user', 'Rifqi Fadhil Abrar');

        // Redirect ke dashboard.html
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
  dashedSlots.forEach((slot, idx) => {
    slot.addEventListener('click', () => {
      slot.style.borderColor = '#F2B601';
      setTimeout(() => {
        slot.style.borderColor = '';
      }, 600);
    });
  });

  // =========================================================================
  // 2. DASHBOARD INTERACTIONS (dashboard.html)
  // =========================================================================
  
  // Mobile Sidebar Toggle
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

  // Modal "Atur area (maks 3)"
  const linkAturArea = document.getElementById('linkAturArea');
  const modalAturAreaEl = document.getElementById('modalAturArea');
  if (linkAturArea && modalAturAreaEl && typeof bootstrap !== 'undefined') {
    const modalAturArea = new bootstrap.Modal(modalAturAreaEl);
    linkAturArea.addEventListener('click', (e) => {
      e.preventDefault();
      modalAturArea.show();
    });
  }

  // Link "Prediksi lengkap"
  const linkPrediksiLengkap = document.getElementById('linkPrediksiLengkap');
  if (linkPrediksiLengkap) {
    linkPrediksiLengkap.addEventListener('click', (e) => {
      e.preventDefault();
      alert('Fitur Prediksi Lengkap:\nMenampilkan analisis tren kepadatan parkir berbasis AI untuk 7 hari ke depan.');
    });
  }

  // Interactive Bar Chart Click / Hover Tooltips
  const chartBars = document.querySelectorAll('.chart-bar');
  chartBars.forEach((bar) => {
    const time = bar.getAttribute('data-time') || 'Waktu';
    const val = bar.getAttribute('data-val') || 'Keterisian';

    bar.setAttribute('title', `${time} : ${val}`);
    
    bar.addEventListener('click', () => {
      alert(`Informasi Kepadatan:\nJam: ${time} WIB\nStatus: ${val}`);
    });
  });

  // Sidebar navigation feedback
  const navAreaParkir = document.getElementById('navAreaParkir');
  const navPrediksi = document.getElementById('navPrediksi');
  const navLaporan = document.getElementById('navLaporan');
  const navProfil = document.getElementById('navProfil');

  if (navAreaParkir) {
    navAreaParkir.addEventListener('click', (e) => {
      e.preventDefault();
      alert('Navigasi: Anda sedang di halaman Area Parkir (Fitur interaktif tugas kuliah).');
    });
  }
  if (navPrediksi) {
    navPrediksi.addEventListener('click', (e) => {
      e.preventDefault();
      alert('Navigasi: Anda sedang di halaman Prediksi Jam Sibuk.');
    });
  }
  if (navLaporan) {
    navLaporan.addEventListener('click', (e) => {
      e.preventDefault();
      alert('Navigasi: Menampilkan formulir pelaporan fasilitas parkir.');
    });
  }
  if (navProfil) {
    navProfil.addEventListener('click', (e) => {
      e.preventDefault();
      alert('Profil Mahasiswa:\nNama: Rifqi Fadhil Abrar\nFakultas: Ilmu Komputer\nUniversitas Brawijaya');
    });
  }
});
