/**
 * UBParkir - Pengaturan Dashboard Page Script (pengaturan-dashboard.js)
 * 6 Selectable area cards with max 3 constraint, preview list sync, and autosave badge
 */

document.addEventListener('DOMContentLoaded', () => {
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
});

