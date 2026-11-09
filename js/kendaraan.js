/**
 * UBParkir - Data Kendaraan Page Script (kendaraan.js)
 * Vehicle type segmented switch (Motor/Mobil), form validation, and save simulation
 */

document.addEventListener('DOMContentLoaded', () => {
  const btnTypeMotor = document.getElementById('btnTypeMotor');
  const btnTypeMobil = document.getElementById('btnTypeMobil');
  const inputJenisKendaraan = document.getElementById('inputJenisKendaraan');
  const inputNomorPlat = document.getElementById('inputNomorPlat');
  const inputMerekModel = document.getElementById('inputMerekModel');
  const formKendaraan = document.getElementById('formKendaraan');
  const saveSuccessAlert = document.getElementById('saveSuccessAlert');
  const btnSaveVehicle = document.getElementById('btnSaveVehicle');

  if (btnTypeMotor && btnTypeMobil && inputJenisKendaraan) {
    btnTypeMotor.addEventListener('click', () => {
      btnTypeMotor.classList.add('active');
      btnTypeMobil.classList.remove('active');
      inputJenisKendaraan.value = 'Motor';
      if (inputNomorPlat) inputNomorPlat.placeholder = 'Contoh: N 1234 AB';
      if (inputMerekModel) inputMerekModel.placeholder = 'Contoh: Honda Beat';
    });

    btnTypeMobil.addEventListener('click', () => {
      btnTypeMobil.classList.add('active');
      btnTypeMotor.classList.remove('active');
      inputJenisKendaraan.value = 'Mobil';
      if (inputNomorPlat) inputNomorPlat.placeholder = 'Contoh: N 1234 ABC';
      if (inputMerekModel) inputMerekModel.placeholder = 'Contoh: Toyota Yaris';
    });
  }

  if (formKendaraan) {
    formKendaraan.addEventListener('submit', (e) => {
      e.preventDefault();
      const jenis = inputJenisKendaraan ? inputJenisKendaraan.value : 'Kendaraan';
      const plat = inputNomorPlat ? inputNomorPlat.value.trim().toUpperCase() : '';
      const model = inputMerekModel ? inputMerekModel.value.trim() : '';

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
            saveSuccessAlert.textContent = `Berhasil! Data ${jenis} ${plat} (${model}) telah disimpan ke profil Anda.`;
            saveSuccessAlert.classList.remove('d-none');
          }

          setTimeout(() => {
            window.location.href = 'profil.html';
          }, 1200);
        }, 600);
      }
    });
  }
});

