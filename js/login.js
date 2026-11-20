document.addEventListener('DOMContentLoaded', () => {
  const ssoForm = document.getElementById('ssoLoginForm');
  const loginAlert = document.getElementById('loginAlert');
  const usernameInput = document.getElementById('ssoUsername');
  const passwordInput = document.getElementById('ssoPassword');
  const btnTogglePassword = document.getElementById('btnTogglePassword');
  const eyeIcon = document.getElementById('eyeIcon');
  const submitBtn = document.getElementById('btnSubmitLogin');

  if (btnTogglePassword && passwordInput && eyeIcon) {
    btnTogglePassword.addEventListener('click', () => {
      const isPassword = passwordInput.getAttribute('type') === 'password';
      passwordInput.setAttribute('type', isPassword ? 'text' : 'password');
      eyeIcon.className = isPassword ? 'bi bi-eye-slash' : 'bi bi-eye';
    });
  }

  if (ssoForm) {
    ssoForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const userVal = usernameInput ? usernameInput.value.trim() : '';
      const passVal = passwordInput ? passwordInput.value.trim() : '';

      if (!userVal || !passVal) {
        showLoginAlert('Mohon masukkan NIM / Email Mahasiswa dan kata sandi Anda.', 'danger');
        return;
      }

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
          <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
          <span>Memverifikasi SSO UB...</span>
        `;
      }

      setTimeout(() => {
        if (submitBtn) {
          submitBtn.innerHTML = `
            <i class="bi bi-check-lg me-2"></i>
            <span>Berhasil! Membuka Dashboard...</span>
          `;
        }
        showLoginAlert('Autentikasi SSO Brawijaya berhasil! Mengalihkan ke dashboard...', 'success');

        sessionStorage.setItem('ubparkir_logged_in', 'true');
        sessionStorage.setItem('ubparkir_user', 'Rifqi Fadhil Abrar');

        setTimeout(() => {
          window.location.href = 'dashboard.html';
        }, 750);
      }, 650);
    });
  }

  function showLoginAlert(message, type) {
    if (!loginAlert) return;
    loginAlert.className = `alert alert-${type} mt-3 mb-0 py-2 px-3 small text-center`;
    loginAlert.textContent = message;
    loginAlert.classList.remove('d-none');
  }

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
