/**
 * UBParkir - Area Parkir Page Script (area.js)
 * Real-time filter pills for parking areas
 */

document.addEventListener('DOMContentLoaded', () => {
  const filterPills = document.querySelectorAll('.filter-pill');
  const areaCardCols = document.querySelectorAll('.area-card-col');
  const areaCountLabel = document.getElementById('areaCountLabel');

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
});

