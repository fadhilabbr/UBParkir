/**
 * UBParkir - Login Page Script (login.js)
 * SSO Authentication Simulation & Landing Graphic Interactivity
 */

document.addEventListener('DOMContentLoaded', () => {
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
});

