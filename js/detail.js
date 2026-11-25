document.addEventListener('DOMContentLoaded', () => {
  const sensorLiveTime = document.getElementById('sensorLiveTime');
  function updateSensorClock() {
    if (!sensorLiveTime) return;
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    sensorLiveTime.textContent = `${hours}.${minutes} WIB`;
  }
  updateSensorClock();
  setInterval(updateSensorClock, 30000);

  const emptyBays = document.querySelectorAll('.parking-bay.bay-empty');
  emptyBays.forEach((bay, index) => {
    bay.setAttribute('tabindex', '0');
    bay.setAttribute('role', 'button');
    bay.setAttribute('aria-label', `Slot kosong ke-${index + 1} di Parkir FILKOM`);

    const notifyBay = () => {
      if (typeof window.showToast === 'function') {
        window.showToast(`Slot kosong ke-${index + 1} di Parkir FILKOM siap digunakan.`, 'info', { title: 'Informasi Slot' });
      }
    };

    bay.addEventListener('click', notifyBay);
    bay.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        notifyBay();
      }
    });
  });

  const btnBukaLokasi = document.getElementById('btnBukaLokasi');
  if (btnBukaLokasi) {
    btnBukaLokasi.addEventListener('click', () => {
      if (typeof window.bukaRute === 'function') {
        window.bukaRute('Parkir FILKOM');
      }
    });
  }
});
