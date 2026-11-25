(function () {
  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function bindSidebarToggle() {
    const btnToggleSidebar = document.getElementById('btnToggleSidebar');
    const dashSidebar = document.getElementById('dashSidebar');
    const sidebarBackdrop = document.getElementById('sidebarBackdrop');

    if (!dashSidebar || !sidebarBackdrop) return;

    if (btnToggleSidebar && !btnToggleSidebar.dataset.sidebarBound) {
      btnToggleSidebar.dataset.sidebarBound = 'true';
      btnToggleSidebar.addEventListener('click', () => {
        const isOpen = dashSidebar.classList.toggle('show');
        sidebarBackdrop.classList.toggle('show', isOpen);
        btnToggleSidebar.setAttribute('aria-expanded', String(isOpen));
      });
    }

    if (!sidebarBackdrop.dataset.sidebarBound) {
      sidebarBackdrop.dataset.sidebarBound = 'true';
      sidebarBackdrop.addEventListener('click', () => {
        dashSidebar.classList.remove('show');
        sidebarBackdrop.classList.remove('show');
        if (btnToggleSidebar) btnToggleSidebar.setAttribute('aria-expanded', 'false');
      });
    }

    if (!document.body.dataset.sidebarEscBound) {
      document.body.dataset.sidebarEscBound = 'true';
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && dashSidebar.classList.contains('show')) {
          dashSidebar.classList.remove('show');
          sidebarBackdrop.classList.remove('show');
          if (btnToggleSidebar) {
            btnToggleSidebar.setAttribute('aria-expanded', 'false');
            btnToggleSidebar.focus();
          }
        }
      });
    }
  }

  window.UBParkirUI = {
    bindSidebarToggle,
    escapeHtml
  };

  document.addEventListener('DOMContentLoaded', bindSidebarToggle);

  window.showToast = function (message, type = 'warning', options = {}) {
    let container = document.getElementById('ubToastContainer');
    if (!container) {
      container = document.createElement('div');
      container.id = 'ubToastContainer';
      container.className = 'toast-container ub-toast-container';
      document.body.appendChild(container);
    }

    let variant = 'warning';
    let iconClass = 'bi-exclamation-triangle-fill';
    let defaultTitle = 'Peringatan';

    if (type === 'danger' || type === 'error') {
      variant = 'danger';
      iconClass = 'bi-x-circle-fill';
      defaultTitle = 'Peringatan';
    } else if (type === 'success') {
      variant = 'success';
      iconClass = 'bi-check-circle-fill';
      defaultTitle = 'Berhasil';
    } else if (type === 'info') {
      variant = 'info';
      iconClass = 'bi-info-circle-fill';
      defaultTitle = 'Informasi';
    }

    const title = escapeHtml(options.title || defaultTitle);
    const safeMsg = escapeHtml(message);
    const delay = options.delay || 3500;

    const toastEl = document.createElement('div');
    toastEl.className = `toast ub-toast ub-toast--${variant} align-items-center`;
    toastEl.setAttribute('role', 'alert');
    toastEl.setAttribute('aria-live', 'polite');
    toastEl.setAttribute('aria-atomic', 'true');

    toastEl.innerHTML = `
      <div class="d-flex p-3 align-items-center">
        <div class="ub-toast-icon me-3">
          <i class="bi ${iconClass} fs-5" aria-hidden="true"></i>
        </div>
        <div class="toast-body p-0 me-auto">
          <div class="ub-toast-title">${title}</div>
          <div class="ub-toast-message">${safeMsg}</div>
        </div>
        <button type="button" class="btn-close ms-2 align-self-start" data-bs-dismiss="toast" aria-label="Tutup"></button>
      </div>
    `;

    container.appendChild(toastEl);

    if (typeof bootstrap !== 'undefined' && bootstrap.Toast) {
      const bsToast = new bootstrap.Toast(toastEl, { delay });
      toastEl.addEventListener('hidden.bs.toast', () => {
        toastEl.remove();
      });
      bsToast.show();
    } else {
      toastEl.classList.add('show');
      setTimeout(() => {
        toastEl.classList.remove('show');
        setTimeout(() => toastEl.remove(), 200);
      }, delay);
    }
  };

  window.bukaRute = function (area) {
    const isGuest = window.UBParkirAuth ? window.UBParkirAuth.isGuest() : false;
    const savedApp = isGuest ? 'Google Maps' : (localStorage.getItem('ubparkir_nav_app') || 'Google Maps');
    window.showToast(
      `Membuka rute menuju ${area} lewat ${savedApp} (estimasi tiba 2–3 menit).`,
      'info',
      { title: 'Navigasi Rute', delay: 4000 }
    );
  };

  function ensureAlternatifModal() {
    let modalEl = document.getElementById('modalAlternatifQuick');
    if (modalEl) return modalEl;

    modalEl = document.createElement('div');
    modalEl.className = 'modal fade';
    modalEl.id = 'modalAlternatifQuick';
    modalEl.tabIndex = -1;
    modalEl.setAttribute('aria-labelledby', 'modalAlternatifTitle');
    modalEl.setAttribute('aria-hidden', 'true');

    modalEl.innerHTML = `
      <div class="modal-dialog modal-dialog-centered" style="max-width: 480px;">
        <div class="modal-content ub-modal-card">
          <div class="modal-header border-0 pb-0 pt-4 px-4">
            <div>
              <div class="text-uppercase fw-bold text-primary" style="font-size: 0.7rem; letter-spacing: 0.05em;">Rekomendasi Terdekat</div>
              <h5 class="modal-title fw-bold text-dark fs-6 mb-0" id="modalAlternatifTitle">Alternatif Parkir</h5>
            </div>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Tutup"></button>
          </div>
          <div class="modal-body px-4 py-3" id="modalAlternatifBody"></div>
          <div class="modal-footer border-0 px-4 pb-4 pt-1 d-flex justify-content-between">
            <a href="alternatif.html" class="fw-semibold text-decoration-none small text-primary">Lihat halaman alternatif</a>
            <button type="button" class="btn btn-light rounded-3 px-3 py-2 fw-semibold text-secondary" data-bs-dismiss="modal">Tutup</button>
          </div>
        </div>
      </div>
    `;

    modalEl.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-quick-rute]');
      if (!btn) return;
      const areaName = btn.getAttribute('data-quick-rute');
      if (areaName) window.bukaRute(areaName);
    });

    document.body.appendChild(modalEl);
    return modalEl;
  }

  window.bukaAlternatif = function (nama) {
    const areaData = window.UBParkirData && window.UBParkirData.AREAS
      ? window.UBParkirData.AREAS[nama]
      : null;

    const alternatives = areaData && Array.isArray(areaData.alternatives) ? areaData.alternatives : [];

    if (typeof bootstrap === 'undefined' || !bootstrap.Modal) {
      if (alternatives.length > 0) {
        window.showToast(`Alternatif terdekat untuk ${nama}: ${alternatives[0].name} (${alternatives[0].sisa} slot).`, 'info', { title: 'Area Alternatif' });
      } else {
        window.showToast(`${nama} masih memiliki banyak slot kosong.`, 'success', { title: 'Area Tersedia' });
      }
      return;
    }

    const modalEl = ensureAlternatifModal();
    const titleEl = modalEl.querySelector('#modalAlternatifTitle');
    const bodyEl = modalEl.querySelector('#modalAlternatifBody');

    if (titleEl) {
      titleEl.textContent = `Alternatif untuk ${nama}`;
    }

    if (bodyEl) {
      if (alternatives.length === 0) {
        bodyEl.innerHTML = `
          <div class="p-3 rounded-3 bg-light border small text-secondary" style="line-height: 1.55;">
            <strong class="text-dark d-block mb-1">${escapeHtml(nama)} masih lega</strong>
            Saat ini masih tersedia banyak slot kosong. Anda bisa langsung menuju lokasi atau membuka rute.
          </div>
        `;
      } else {
        bodyEl.innerHTML = alternatives.map((alt) => `
          <div class="d-flex align-items-center justify-content-between gap-3 p-3 rounded-3 border bg-light mb-2">
            <div>
              <div class="fw-bold text-dark small">${escapeHtml(alt.name)}</div>
              <div class="text-muted" style="font-size: 0.78rem;">${escapeHtml(alt.jarak)} · <span class="fw-semibold text-success">${alt.sisa} slot (${escapeHtml(alt.status)})</span></div>
            </div>
            <button type="button" class="btn btn-primary btn-sm rounded-3 px-3 fw-semibold flex-shrink-0" data-quick-rute="${escapeHtml(alt.name)}">
              Rute
            </button>
          </div>
        `).join('');
      }
    }

    const modal = bootstrap.Modal.getOrCreateInstance(modalEl);
    modal.show();
  };
})();
