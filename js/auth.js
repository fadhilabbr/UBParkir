(function () {
  const ROLE_KEY = 'ubparkir_role';
  const LOGGED_IN_KEY = 'ubparkir_logged_in';
  const USER_KEY = 'ubparkir_user';
  const DEFAULT_SSO_USER = 'Rifqi Fadhil Abrar';

  const RESTRICTED_NAV_MAP = {
    'prediksi.html': 'Prediksi Traffic Parkiran',
    'laporan.html': 'Laporan & Feedback',
    'profil.html': 'Profil Mahasiswa'
  };

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function ensureGuestLoginModal() {
    let modalEl = document.getElementById('modalGuestLoginPrompt');
    if (modalEl) return modalEl;

    modalEl = document.createElement('div');
    modalEl.className = 'modal fade';
    modalEl.id = 'modalGuestLoginPrompt';
    modalEl.tabIndex = -1;
    modalEl.setAttribute('aria-labelledby', 'guestLoginModalTitle');
    modalEl.setAttribute('aria-hidden', 'true');

    modalEl.innerHTML = `
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content ub-modal-card">
          <div class="modal-header border-0 pb-0 pt-4 px-4">
            <div class="d-flex align-items-center gap-2">
              <span class="ub-modal-icon-lock">
                <i class="bi bi-lock-fill fs-5" aria-hidden="true"></i>
              </span>
              <div>
                <div class="meta-kicker">Mode Tamu · Akses terbatas</div>
                <h5 class="modal-title section-title mb-0" id="guestLoginModalTitle">Login SSO UB Diperlukan</h5>
              </div>
            </div>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Tutup"></button>
          </div>
          <div class="modal-body px-4 pt-3 pb-2">
            <p class="page-subtitle mb-0">
              Fitur <strong class="text-dark" id="guestModalFeatureName">Fitur ini</strong> hanya tersedia untuk pengguna yang masuk dengan akun <strong>SSO Universitas Brawijaya</strong>.
            </p>
          </div>
          <div class="modal-footer border-0 px-4 pb-4 pt-3 d-flex gap-2 flex-nowrap">
            <button type="button" class="btn btn-light rounded-3 px-3 py-2 fw-semibold text-secondary flex-fill" data-bs-dismiss="modal">Tetap sebagai Tamu</button>
            <a href="index.html?feature=Fitur%20ini" id="guestModalLoginBtn" class="btn btn-primary rounded-3 px-3 py-2 fw-semibold flex-fill text-center">Masuk dengan SSO UB</a>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(modalEl);
    return modalEl;
  }

  window.UBParkirAuth = {
    getRole() {
      const role = sessionStorage.getItem(ROLE_KEY);
      const loggedIn = sessionStorage.getItem(LOGGED_IN_KEY);
      if (role === 'sso' || (loggedIn === 'true' && role !== 'guest')) {
        return 'sso';
      }
      return 'guest';
    },

    isGuest() {
      return this.getRole() === 'guest';
    },

    isLoggedIn() {
      return this.getRole() === 'sso';
    },

    enterAsGuest() {
      sessionStorage.setItem(ROLE_KEY, 'guest');
      sessionStorage.removeItem(LOGGED_IN_KEY);
      sessionStorage.removeItem(USER_KEY);
    },

    loginSSO(displayName = DEFAULT_SSO_USER) {
      const name = (typeof displayName === 'string' && displayName.trim()) ? displayName.trim() : DEFAULT_SSO_USER;
      sessionStorage.setItem(ROLE_KEY, 'sso');
      sessionStorage.setItem(LOGGED_IN_KEY, 'true');
      sessionStorage.setItem(USER_KEY, name);
    },

    logout() {
      sessionStorage.removeItem(ROLE_KEY);
      sessionStorage.removeItem(LOGGED_IN_KEY);
      sessionStorage.removeItem(USER_KEY);
      window.location.href = 'index.html';
    },

    openGuestLoginModal(featureName) {
      const safeFeature = (typeof featureName === 'string' && featureName.trim()) ? featureName.trim() : 'Fitur ini';
      const loginUrl = 'index.html?feature=' + encodeURIComponent(safeFeature);

      if (typeof bootstrap === 'undefined' || !bootstrap.Modal || !document.body) {
        window.location.href = loginUrl;
        return;
      }

      const modalEl = ensureGuestLoginModal();
      const featureLabelEl = modalEl.querySelector('#guestModalFeatureName');
      const loginBtnEl = modalEl.querySelector('#guestModalLoginBtn');

      if (featureLabelEl) {
        featureLabelEl.textContent = safeFeature;
      }
      if (loginBtnEl) {
        loginBtnEl.href = loginUrl;
      }

      const modal = bootstrap.Modal.getOrCreateInstance(modalEl);
      modal.show();
    }
  };

  function applyGuestSidebar() {
    const sidebar = document.getElementById('dashSidebar');
    if (!sidebar) return;

    if (!sidebar.querySelector('.sidebar-guest-badge')) {
      const brandLink = sidebar.querySelector('a[href="dashboard.html"]');
      const badge = document.createElement('div');
      badge.className = 'sidebar-guest-badge';
      badge.innerHTML = '<i class="bi bi-person-badge" aria-hidden="true"></i><span>Mode Tamu</span>';
      if (brandLink && brandLink.parentNode === sidebar) {
        brandLink.insertAdjacentElement('afterend', badge);
      } else {
        sidebar.prepend(badge);
      }
    }

    const navLinks = sidebar.querySelectorAll('nav a');
    navLinks.forEach((link) => {
      const href = (link.getAttribute('href') || '').trim();
      const featureName = RESTRICTED_NAV_MAP[href];
      if (!featureName) return;

      link.classList.add('sidebar-nav-locked');
      link.setAttribute('aria-disabled', 'true');
      if (!link.querySelector('.bi-lock-fill')) {
        const lockIcon = document.createElement('i');
        lockIcon.className = 'bi bi-lock-fill ms-auto small opacity-75';
        lockIcon.setAttribute('aria-hidden', 'true');
        link.appendChild(lockIcon);
      }

      if (!link.dataset.guestNavBound) {
        link.dataset.guestNavBound = 'true';
        link.addEventListener('click', (e) => {
          e.preventDefault();
          window.UBParkirAuth.openGuestLoginModal(featureName);
        });
      }
    });

    const footerLink = document.getElementById('sidebarLogoutLink') ||
      sidebar.querySelector(':scope > div:last-child a[href="index.html"]') ||
      sidebar.querySelector('a[href="index.html"]');

    if (footerLink) {
      footerLink.classList.remove('sidebar-nav-link', 'text-danger');
      footerLink.classList.add('sidebar-login-cta');
      footerLink.setAttribute('href', 'index.html');
      footerLink.innerHTML = '<i class="bi bi-box-arrow-in-right fs-5" aria-hidden="true"></i><span>Masuk SSO UB</span>';

      if (!footerLink.dataset.guestCtaBound) {
        footerLink.dataset.guestCtaBound = 'true';
        footerLink.addEventListener('click', (e) => {
          e.stopImmediatePropagation();
        }, true);
      }
    }
  }

  function decorateLockedTriggers() {
    const lockedEls = document.querySelectorAll('[data-sso-only="true"]');
    lockedEls.forEach((el) => {
      el.classList.add('guest-sso-locked-item');
      if (el.querySelector('.guest-lock-icon, .bi-lock-fill')) return;

      const lockIcon = document.createElement('i');
      lockIcon.className = 'bi bi-lock-fill guest-lock-icon';
      lockIcon.setAttribute('aria-hidden', 'true');

      if (el.classList.contains('quick-menu-btn')) {
        const chevron = el.querySelector('.bi-chevron-right');
        if (chevron) {
          el.insertBefore(lockIcon, chevron);
          return;
        }
      }

      el.appendChild(lockIcon);
    });
  }

  function applyRestrictedPageGate() {
    if (!document.body || document.body.dataset.requiresSso !== 'true') return;

    const mainEl = document.querySelector('main.dash-content');
    if (!mainEl) return;

    const featureName = (document.body.dataset.featureName || '').trim() || 'Halaman ini';
    const loginHref = 'index.html?feature=' + encodeURIComponent(featureName);
    const safeFeatureHtml = escapeHtml(featureName);

    mainEl.innerHTML = `
      <div class="d-flex align-items-center gap-3 mb-4 d-lg-none">
        <button type="button" class="ub-mobile-menu-btn" id="btnToggleSidebar" aria-label="Buka Menu" aria-expanded="false">
          <i class="bi bi-list fs-5" aria-hidden="true"></i>
        </button>
        <span class="section-title">ParkirUB · Mode Tamu</span>
      </div>

      <section class="guest-gate-card ub-card" aria-labelledby="guestGateHeading">
        <div class="d-flex align-items-start justify-content-between gap-3 mb-3">
          <div>
            <div class="meta-kicker mb-1">Mode Tamu · Akses terbatas</div>
            <h1 id="guestGateHeading" class="page-title mb-0">
              ${safeFeatureHtml} memerlukan akun SSO UB
            </h1>
          </div>
          <div class="guest-gate-icon">
            <i class="bi bi-lock-fill" aria-hidden="true"></i>
          </div>
        </div>

        <p class="page-subtitle mb-0">
          Mode Tamu hanya mencakup pemantauan slot dan area parkir alternatif. Masuk dengan akun <strong>SSO Universitas Brawijaya</strong> untuk membuka layanan penuh.
        </p>

        <div class="guest-gate-grid">
          <div class="guest-gate-item">
            <i class="bi bi-bar-chart-line text-primary mt-1 flex-shrink-0" aria-hidden="true"></i>
            <span><strong>Prediksi Traffic</strong> jam padat per fakultas.</span>
          </div>
          <div class="guest-gate-item">
            <i class="bi bi-flag text-primary mt-1 flex-shrink-0" aria-hidden="true"></i>
            <span><strong>Laporan &amp; Feedback</strong> langsung ke pengelola.</span>
          </div>
          <div class="guest-gate-item">
            <i class="bi bi-person text-primary mt-1 flex-shrink-0" aria-hidden="true"></i>
            <span><strong>Profil &amp; Kendaraan</strong> terverifikasi E-Tag.</span>
          </div>
          <div class="guest-gate-item">
            <i class="bi bi-p-square text-primary mt-1 flex-shrink-0" aria-hidden="true"></i>
            <span><strong>Pesan Slot Sementara</strong> di denah area parkir.</span>
          </div>
        </div>

        <div class="d-flex flex-wrap align-items-center gap-3">
          <a href="${escapeHtml(loginHref)}" class="btn btn-primary rounded-3 px-4 py-2 fw-semibold">
            <i class="bi bi-box-arrow-in-right me-2" aria-hidden="true"></i>Masuk dengan SSO UB
          </a>
          <a href="area-parkir.html" class="ub-link-accent">
            Kembali ke Area Parkir
          </a>
        </div>
      </section>
    `;

    if (window.UBParkirUI && typeof window.UBParkirUI.bindSidebarToggle === 'function') {
      window.UBParkirUI.bindSidebarToggle();
    }
  }

  function bindSsoLogoutHandlers() {
    const logoutLinks = document.querySelectorAll(
      '.dash-sidebar a[href="index.html"], .dropdown-menu a[href="index.html"], #modalLogoutConfirm a[href="index.html"]'
    );
    logoutLinks.forEach((link) => {
      if (link.dataset.ssoLogoutBound) return;
      link.dataset.ssoLogoutBound = 'true';
      link.addEventListener('click', (e) => {
        e.preventDefault();
        window.UBParkirAuth.logout();
      });
    });
  }

  document.addEventListener('click', (e) => {
    if (!window.UBParkirAuth || !window.UBParkirAuth.isGuest()) return;
    const lockedEl = e.target && e.target.closest ? e.target.closest('[data-sso-only="true"]') : null;
    if (!lockedEl) return;

    e.preventDefault();
    e.stopImmediatePropagation();
    window.UBParkirAuth.openGuestLoginModal(lockedEl.dataset.featureName || 'Fitur ini');
  }, true);

  document.addEventListener('DOMContentLoaded', () => {
    if (window.UBParkirAuth.isGuest()) {
      applyGuestSidebar();
      decorateLockedTriggers();
      applyRestrictedPageGate();
    } else {
      bindSsoLogoutHandlers();
    }
  });
})();
