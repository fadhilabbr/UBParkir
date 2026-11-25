document.addEventListener('DOMContentLoaded', () => {
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
});

window.bukaRute = function(area) {
  const savedApp = localStorage.getItem('ubparkir_nav_app') || 'Google Maps';
  alert(`Navigasi Aktif:\nMembuka rute tercepat menuju ${area} menggunakan ${savedApp}.\nEstimasi waktu tiba: 2-3 menit.`);
};

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

window.showToast = function(message, type = 'warning', options = {}) {
  let container = document.getElementById('ubToastContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'ubToastContainer';
    container.className = 'toast-container position-fixed top-0 end-0 p-3';
    container.style.zIndex = '9999';
    container.style.maxWidth = '100vw';
    document.body.appendChild(container);
  }

  let iconClass = 'bi-exclamation-triangle-fill';
  let iconBg = '#FEF3C7';
  let iconColor = '#D97706';
  let accentBorder = '#F2B601';
  let defaultTitle = 'Peringatan';

  if (type === 'danger' || type === 'error') {
    iconClass = 'bi-x-circle-fill';
    iconBg = '#FEE2E2';
    iconColor = '#DC2626';
    accentBorder = '#DC2626';
    defaultTitle = 'Peringatan';
  } else if (type === 'success') {
    iconClass = 'bi-check-circle-fill';
    iconBg = '#DCFCE7';
    iconColor = '#16A34A';
    accentBorder = '#16A34A';
    defaultTitle = 'Berhasil';
  } else if (type === 'info') {
    iconClass = 'bi-info-circle-fill';
    iconBg = '#E0F2FE';
    iconColor = '#0284C7';
    accentBorder = '#1E5BD8';
    defaultTitle = 'Informasi';
  }

  const title = options.title || defaultTitle;
  const delay = options.delay || 3500;

  const toastEl = document.createElement('div');
  toastEl.className = 'toast align-items-center border-0 shadow-lg';
  toastEl.setAttribute('role', 'alert');
  toastEl.setAttribute('aria-live', 'assertive');
  toastEl.setAttribute('aria-atomic', 'true');
  toastEl.style.borderRadius = '14px';
  toastEl.style.background = '#ffffff';
  toastEl.style.borderLeft = `5px solid ${accentBorder}`;
  toastEl.style.boxShadow = '0 10px 25px rgba(15, 42, 74, 0.12)';
  toastEl.style.marginBottom = '0.75rem';
  toastEl.style.maxWidth = '380px';
  toastEl.style.width = '100%';

  toastEl.innerHTML = `
    <div class="d-flex p-3 align-items-center">
      <div class="toast-icon me-3 flex-shrink-0 d-flex align-items-center justify-content-center" style="width: 38px; height: 38px; border-radius: 10px; background-color: ${iconBg}; color: ${iconColor};">
        <i class="bi ${iconClass} fs-5"></i>
      </div>
      <div class="toast-body p-0 me-auto">
        <div class="fw-bold text-dark" style="font-size: 0.9rem; line-height: 1.2;">${title}</div>
        <div class="text-secondary small mt-1" style="font-size: 0.82rem; line-height: 1.35;">${message}</div>
      </div>
      <button type="button" class="btn-close ms-2 align-self-start" data-bs-dismiss="toast" aria-label="Tutup" style="font-size: 0.75rem;"></button>
    </div>
  `;

  container.appendChild(toastEl);

  if (typeof bootstrap !== 'undefined' && bootstrap.Toast) {
    const bsToast = new bootstrap.Toast(toastEl, { delay: delay });
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

