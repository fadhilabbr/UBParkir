document.addEventListener('DOMContentLoaded', () => {
  const VEHICLE_STORAGE_KEY = 'ubparkir_vehicle';
  const btnTypeMotor = document.getElementById('btnTypeMotor');
  const btnTypeMobil = document.getElementById('btnTypeMobil');
  const inputJenisKendaraan = document.getElementById('inputJenisKendaraan');
  const inputNomorPlat = document.getElementById('inputNomorPlat');
  const inputMerekModel = document.getElementById('inputMerekModel');
  const inputWarnaKendaraan = document.getElementById('inputWarnaKendaraan');
  const inputCiriKendaraan = document.getElementById('inputCiriKendaraan');
  const formKendaraan = document.getElementById('formKendaraan');
  const saveSuccessAlert = document.getElementById('saveSuccessAlert');
  const btnSaveVehicle = document.getElementById('btnSaveVehicle');

  function setVehicleType(jenis) {
    if (!btnTypeMotor || !btnTypeMobil || !inputJenisKendaraan) return;
    const isMobil = jenis === 'Mobil';
    btnTypeMobil.classList.toggle('active', isMobil);
    btnTypeMotor.classList.toggle('active', !isMobil);
    inputJenisKendaraan.value = isMobil ? 'Mobil' : 'Motor';
    if (inputNomorPlat) inputNomorPlat.placeholder = isMobil ? 'Contoh: N 1234 ABC' : 'Contoh: N 1234 AB';
    if (inputMerekModel) inputMerekModel.placeholder = isMobil ? 'Contoh: Toyota Yaris' : 'Contoh: Honda Beat';
  }

  if (btnTypeMotor && btnTypeMobil) {
    btnTypeMotor.addEventListener('click', () => setVehicleType('Motor'));
    btnTypeMobil.addEventListener('click', () => setVehicleType('Mobil'));
  }

  try {
    const rawVehicle = localStorage.getItem(VEHICLE_STORAGE_KEY);
    if (rawVehicle) {
      const saved = JSON.parse(rawVehicle);
      if (saved && typeof saved === 'object') {
        if (saved.jenis) setVehicleType(saved.jenis);
        if (inputNomorPlat && saved.plat) inputNomorPlat.value = saved.plat;
        if (inputMerekModel && saved.model) inputMerekModel.value = saved.model;
        if (inputWarnaKendaraan && saved.warna) inputWarnaKendaraan.value = saved.warna;
        if (inputCiriKendaraan && saved.ciri) inputCiriKendaraan.value = saved.ciri;
      }
    }
  } catch (e) {}

  if (formKendaraan) {
    formKendaraan.addEventListener('submit', (e) => {
      e.preventDefault();
      const jenis = inputJenisKendaraan ? inputJenisKendaraan.value : 'Motor';
      const plat = inputNomorPlat ? inputNomorPlat.value.trim().toUpperCase() : '';
      const model = inputMerekModel ? inputMerekModel.value.trim() : '';
      const warna = inputWarnaKendaraan ? inputWarnaKendaraan.value.trim() : '';
      const ciri = inputCiriKendaraan ? inputCiriKendaraan.value.trim() : '';

      localStorage.setItem(VEHICLE_STORAGE_KEY, JSON.stringify({ jenis, plat, model, warna, ciri }));

      if (btnSaveVehicle) {
        const origText = btnSaveVehicle.innerHTML;
        btnSaveVehicle.disabled = true;
        btnSaveVehicle.innerHTML = `
          <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
          <span>Menyimpan...</span>
        `;

        setTimeout(() => {
          btnSaveVehicle.disabled = false;
          btnSaveVehicle.innerHTML = origText;

          if (saveSuccessAlert) {
            saveSuccessAlert.textContent = `Data ${jenis} ${plat} (${model}) berhasil disimpan ke profil Anda.`;
            saveSuccessAlert.classList.remove('d-none');
          }

          setTimeout(() => {
            window.location.href = 'profil.html';
          }, 900);
        }, 500);
      }
    });
  }
});
