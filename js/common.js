/**
 * UBParkir - Common JavaScript (common.js)
 * Shared utilities for mobile navigation drawer and global helpers
 */

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Sidebar Drawer Navigation
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

// =========================================================================
// GLOBAL HELPER FUNCTIONS
// =========================================================================

// Navigasi Rute Cepat
window.bukaRute = function(area) {
  const savedApp = localStorage.getItem('ubparkir_nav_app') || 'Google Maps';
  alert(`Navigasi Aktif:\nMembuka rute tercepat menuju ${area} menggunakan ${savedApp}.\nEstimasi waktu tiba: 2-3 menit.`);
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

