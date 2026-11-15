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

  const emptySlots = document.querySelectorAll('.slot-empty');
  emptySlots.forEach((slot, index) => {
    slot.addEventListener('click', () => {
      alert(`Informasi Slot:\nSlot kosong ke-${index + 1} di Parkir FILKOM siap digunakan.`);
    });
  });
});
