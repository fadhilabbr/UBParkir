/**
 * UBParkir - Detail Parkir Page Script (detail.js)
 * Parkir FILKOM detail view & schematic interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  // Clickable interactive schematic slot highlights
  const emptySlots = document.querySelectorAll('.slot-empty');
  emptySlots.forEach((slot, index) => {
    slot.addEventListener('click', () => {
      alert(`Informasi Slot:\nSlot kosong ke-${index + 1} di Parkir FILKOM siap digunakan.`);
    });
  });
});

