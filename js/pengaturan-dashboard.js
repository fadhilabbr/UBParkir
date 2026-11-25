document.addEventListener('DOMContentLoaded', () => {
  const areaSelectCards = document.querySelectorAll('.area-select-card');
  const counterDipilihText = document.getElementById('counterDipilihText');
  const previewDashList = document.getElementById('previewDashList');
  const badgeSavedStatus = document.getElementById('badgeSavedStatus');

  const STORAGE_KEY = 'ubparkir_fav_areas';
  const DEFAULT_AREAS = ['Parkir FILKOM', 'Parkir Fakultas Teknik', 'Parkir FEB'];

  let savedAreas = DEFAULT_AREAS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        savedAreas = parsed;
      }
    }
  } catch (err) {
    savedAreas = DEFAULT_AREAS;
  }

  if (areaSelectCards.length === 0) return;

  areaSelectCards.forEach((card) => {
    const areaName = card.getAttribute('data-area');
    const isSelected = savedAreas.includes(areaName);
    card.classList.toggle('selected', isSelected);
    card.setAttribute('aria-pressed', String(isSelected));
  });

  updateDashboardSettingsView(false);

  function toggleCardSelection(card) {
    const isSelected = card.classList.contains('selected');
    const selectedCards = document.querySelectorAll('.area-select-card.selected');

    if (isSelected) {
      card.classList.remove('selected');
      card.setAttribute('aria-pressed', 'false');
      updateDashboardSettingsView(true);
    } else if (selectedCards.length >= 3) {
      if (typeof window.showToast === 'function') {
        window.showToast('Batas 3 area tercapai. Lepas salah satu area terlebih dahulu.', 'warning');
      }
    } else {
      card.classList.add('selected');
      card.setAttribute('aria-pressed', 'true');
      updateDashboardSettingsView(true);
    }
  }

  areaSelectCards.forEach((card) => {
    card.addEventListener('click', () => toggleCardSelection(card));
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleCardSelection(card);
      }
    });
  });

  function updateDashboardSettingsView(isUserAction = true) {
    const selected = document.querySelectorAll('.area-select-card.selected');
    const count = selected.length;
    const currentSelectedNames = [];

    selected.forEach((sc) => {
      const areaName = sc.getAttribute('data-area');
      if (areaName) currentSelectedNames.push(areaName);
    });

    if (isUserAction) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(currentSelectedNames));
    }

    if (counterDipilihText) {
      counterDipilihText.textContent = `${count} dari 3 dipilih`;
    }

    if (previewDashList) {
      previewDashList.innerHTML = '';
      currentSelectedNames.forEach((areaName) => {
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

    if (badgeSavedStatus && isUserAction) {
      badgeSavedStatus.style.transition = 'opacity 0.15s ease';
      badgeSavedStatus.style.opacity = '0.4';
      setTimeout(() => {
        badgeSavedStatus.style.opacity = '1';
      }, 200);
    }
  }
});
