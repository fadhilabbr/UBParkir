let currentSelectedSlot = null;

window.bukaDetailArea = function (nama, total, sisa, status) {
  const modalEl = document.getElementById('modalDetailSlot');
  if (!modalEl || typeof bootstrap === 'undefined') return;

  const isGuest = window.UBParkirAuth ? window.UBParkirAuth.isGuest() : false;
  const modalTitle = document.getElementById('modalDetailTitle');
  const modalSubtitle = document.getElementById('modalDetailSubtitle');
  const slotGrid = document.getElementById('denahSlotGrid');
  const bookingAlert = document.getElementById('bookingAlert');
  const btnKonfirmasi = document.getElementById('btnKonfirmasiSlot');

  if (modalTitle) modalTitle.textContent = nama;
  if (modalSubtitle) {
    const statusText = status === 'penuh' ? 'Penuh' : status === 'warning' ? 'Hampir Penuh' : 'Lega';
    modalSubtitle.textContent = `Total Kapasitas: ${total} | Tersisa: ${sisa} slot (${statusText})`;
  }

  if (bookingAlert) {
    if (isGuest) {
      bookingAlert.className = 'alert alert-info mt-3 mb-0 py-2 px-3 small text-center';
      bookingAlert.textContent = 'Mode Tamu hanya dapat memantau ketersediaan slot. Masuk dengan SSO UB untuk memesan slot sementara.';
      bookingAlert.classList.remove('d-none');
    } else {
      bookingAlert.classList.add('d-none');
    }
  }

  if (btnKonfirmasi) {
    btnKonfirmasi.className = 'btn btn-primary btn-sm rounded-3 px-3';
    if (isGuest) {
      btnKonfirmasi.disabled = false;
      btnKonfirmasi.textContent = 'Masuk SSO untuk Pesan Slot';
    } else {
      btnKonfirmasi.disabled = true;
      btnKonfirmasi.textContent = 'Pesan Slot Parkir Sementara';
    }
  }

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
      slotDiv.className = `denah-slot ${isAvailable ? 'available' : 'occupied'}${isGuest ? ' guest-readonly' : ''}`;
      slotDiv.innerHTML = `<span>${slotCode}</span>`;
      slotDiv.title = isAvailable
        ? (isGuest ? `Slot ${slotCode} (Tersedia · Mode Lihat Saja)` : `Slot ${slotCode} (Tersedia)`)
        : `Slot ${slotCode} (Terisi)`;

      if (isAvailable) {
        slotDiv.setAttribute('tabindex', '0');
        slotDiv.setAttribute('role', 'button');
        slotDiv.setAttribute('aria-label', `Slot ${slotCode} tersedia`);

        const handleSlotSelect = () => {
          if (isGuest) {
            if (bookingAlert) {
              bookingAlert.className = 'alert alert-info mt-3 mb-0 py-2 px-3 small text-center';
              bookingAlert.textContent = `Slot ${slotCode} tersedia, namun Mode Tamu bersifat lihat saja (read-only). Masuk dengan SSO UB untuk memesan slot.`;
              bookingAlert.classList.remove('d-none');
            }
            if (typeof window.showToast === 'function') {
              window.showToast('Mode Tamu bersifat lihat saja. Masuk dengan SSO UB untuk memesan slot parkir.', 'info', { title: 'Mode Tamu' });
            }
            return;
          }

          document.querySelectorAll('.denah-slot').forEach(s => s.classList.remove('selected'));
          slotDiv.classList.add('selected');
          currentSelectedSlot = slotCode;
          if (btnKonfirmasi) btnKonfirmasi.disabled = false;

          if (bookingAlert) {
            bookingAlert.className = 'alert alert-warning mt-3 mb-0 py-2 px-3 small text-center';
            bookingAlert.textContent = `Anda memilih Slot ${slotCode} di ${nama}. Klik "Pesan Slot Parkir Sementara" untuk mengonfirmasi.`;
            bookingAlert.classList.remove('d-none');
          }
        };

        slotDiv.addEventListener('click', handleSlotSelect);
        slotDiv.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleSlotSelect();
          }
        });
      }

      slotGrid.appendChild(slotDiv);
    }
  }

  const modal = bootstrap.Modal.getOrCreateInstance(modalEl);
  modal.show();

  if (btnKonfirmasi) {
    if (isGuest) {
      btnKonfirmasi.onclick = () => {
        window.location.href = 'index.html?feature=Pesan%20Slot%20Parkir';
      };
    } else {
      btnKonfirmasi.onclick = () => {
        if (!currentSelectedSlot) return;
        btnKonfirmasi.disabled = true;
        if (bookingAlert) {
          bookingAlert.className = 'alert alert-success mt-3 mb-0 py-2 px-3 small text-center';
          bookingAlert.textContent = `Slot ${currentSelectedSlot} di ${nama} berhasil dipesan sementara untuk 15 menit ke depan.`;
        }
      };
    }
  }
};

document.addEventListener('DOMContentLoaded', () => {
  const filterPills = document.querySelectorAll('.filter-pill');
  const areaCardCols = document.querySelectorAll('.area-card-col');
  const areaCountLabel = document.getElementById('areaCountLabel');
  const areaCardsContainer = document.getElementById('areaCardsContainer');

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

  if (areaCardsContainer) {
    areaCardsContainer.addEventListener('click', (e) => {
      const actionBtn = e.target.closest('[data-action]');
      if (!actionBtn) return;

      const action = actionBtn.getAttribute('data-action');
      const areaName = actionBtn.getAttribute('data-area') || '';

      if (action === 'detail') {
        const total = parseInt(actionBtn.getAttribute('data-total') || '100', 10);
        const sisa = parseInt(actionBtn.getAttribute('data-sisa') || '0', 10);
        const status = actionBtn.getAttribute('data-status') || 'lega';
        window.bukaDetailArea(areaName, total, sisa, status);
      } else if (action === 'alternatif' && typeof window.bukaAlternatif === 'function') {
        window.bukaAlternatif(areaName);
      }
    });
  }
});
