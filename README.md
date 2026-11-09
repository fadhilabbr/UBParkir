# UBParkir - Sistem Pemantauan Slot Parkir Universitas Brawijaya

Proyek website antarmuka pengguna (Frontend) untuk memantau ketersediaan slot parkir di area kampus Universitas Brawijaya. Dibuat khusus sesuai aturan tugas kuliah menggunakan teknologi web standar murni: **HTML5, CSS3, JavaScript (ES6), dan Bootstrap 5**.

---

## 🔑 Kredensial Akun Demo (Untuk Pengujian & Dosen)
Untuk mencoba alur login SSO hingga masuk ke dashboard:
- **NIM / Akun SSO**: `rifqi@student.ub.ac.id` *(atau `215150201111001`)*
- **Kata Sandi**: `brawijaya123`
- *Tips Praktis:* Pada halaman login [index.html](file:///d:/projects_vsssl/UBParkir/index.html), sudah ada tombol **"Gunakan Akun Ini"** / **"Isi Otomatis"** untuk langsung autofill dan masuk ke dashboard.

---

## 📁 Struktur File Modular
CSS telah dipisah per halaman agar ringan, modular, dan mudah dipahami:
```text
UBParkir/
├── index.html          # Halaman 1: Login SSO & Landing Page
├── dashboard.html      # Halaman 2: Dashboard Ringkasan Pengguna
├── area-parkir.html    # Halaman 3: Daftar Semua Area Parkir UB & Filter Fakultas
├── detail-parkir.html  # Halaman 4: Detail Slot Parkir FILKOM & Denah Visual
├── alternatif.html     # Halaman 5: Rekomendasi Area Parkir Alternatif Terdekat
├── prediksi.html       # Halaman 6: Analisis Prediksi Traffic & Jam Sibuk Parkir
├── laporan.html        # Halaman 7: Pusat Laporan & Pengaduan Kendala Parkir
├── profil.html         # Halaman 8: Profil Mahasiswa & Pengaturan Akun
├── data-kendaraan.html # Halaman 9: Formulir Informasi Data Kendaraan Mahasiswa
├── pengaturan-dashboard.html # Halaman 10: Pengaturan Pemilihan Area Parkir Dashboard
├── opsi-navigasi.html  # Halaman 11: Pengaturan Aplikasi Peta & Rute Navigasi
├── css/
│   ├── login.css       # CSS khusus halaman login
│   ├── dashboard.css   # CSS khusus halaman dashboard
│   ├── area.css        # CSS khusus halaman area parkir
│   ├── detail.css      # CSS khusus halaman detail area
│   ├── alternatif.css  # CSS khusus halaman alternatif parkir
│   ├── prediksi.css    # CSS khusus halaman prediksi traffic
│   ├── laporan.css     # CSS khusus halaman laporan kejadian
│   ├── profil.css      # CSS khusus halaman profil mahasiswa
│   ├── kendaraan.css   # CSS khusus halaman formulir data kendaraan
│   ├── pengaturan-dashboard.css # CSS khusus halaman pengaturan area dashboard
│   └── opsi-navigasi.css # CSS khusus halaman pengaturan opsi navigasi
├── js/
│   └── script.js       # Logika JavaScript untuk autentikasi, filter, chart, & interaktivitas
└── README.md           # Dokumentasi proyek
```

---

## 🚀 Fitur Halaman & Komponen

### 1. Halaman Login / Landing (`index.html`)
- Desain split-screen presisi (Deep Navy `#0F2A4A` & Soft Slate `#F3F5F8`).
- Ilustrasi matriks parkir 3 baris × 4 kolom (slot terisi, slot kuning aktif `P`, dan slot kosong *dashed border* interaktif).
- Modal autentikasi Single Sign-On (SSO) Universitas Brawijaya dengan verifikasi JavaScript dan transisi langsung ke dashboard.

### 2. Halaman Dashboard (`dashboard.html`)
- **Sidebar Navigasi**: Logo ParkirUB, menu *Dashboard (Active)*, *Area Parkir*, *Prediksi*, *Laporan*, *Profil*, dan tombol *Keluar*.
- **Header Personal**: Ucapan salam *"Selamat pagi, Rifqi"*, deskripsi status, serta kartu avatar pengguna *"Rifqi Fadhil Abrar"* dengan dropdown profil.
- **Section Area Pilihanmu**: 3 kartu favorit (FILKOM, FT, FEB) dengan status badge dan progress bar.
- **Prediksi Jam Padat · FILKOM**: Grafik batang murni CSS (*pure CSS bar chart*) interaktif (jam 06 - 15).
- **Menu Cepat**: Tombol aksi langsung terhubung ke halaman *Area Parkir*, *Alternatif Parkir*, dan *Laporan*.

### 3. Halaman Area Parkir UB (`area-parkir.html`)
- **Sidebar Terhubung**: Navigasi sinkron dengan status aktif pada menu *Area Parkir*.
- **Bar Filter Interaktif**: Tombol icon filter dan pill kategori: **Semua**, **Lega**, **Hampir penuh**, dan **Penuh**.
- **5 Kartu Area Parkir Fakultas**: FILKOM, FT, FEB, FIA, Fakultas Pertanian.

### 4. Halaman Detail Parkir FILKOM (`detail-parkir.html`)
- **Hero Dark Card**: Status 12 dari 150 slot tersedia, progress bar 92%, badge *Hampir penuh*, dan status update sensor.
- **Breakdown Kendaraan**: Sub-kartu Motor (9/120) & Mobil (3/30).
- **Denah Area Visual**: Skematik jalur masuk (garis putus-putus) dengan posisi slot kosong berwarna hijau.
- **Tombol Aksi**: Tombol *Buka Lokasi* (Google Maps) dan *Lihat Alternatif* (`alternatif.html`).

### 5. Halaman Alternatif Parkir (`alternatif.html`)
- **Warning Banner**: Peringatan *"Parkir FILKOM hampir penuh. Sisa 12 slot dari 150."*
- **3 Kartu Rekomendasi Terdekat**: Parkir FT (64 slot - 300m), Parkir FIA (38 slot - 550m), Parkir FIB (21 slot - 700m).
- **Aplikasi Rute & Navigasi**: Pilihan aplikasi Google Maps, Waze, atau Apple Maps.

### 6. Halaman Prediksi Traffic Parkiran (`prediksi.html`)
- **Selector Filter**: Pilihan area fakultas (*FILKOM*, *Fakultas Teknik*, *FEB*) dan rentang waktu (*06–08*, *08–10*, *10–12*, *12–14*, *14–16*).
- **Status Ringkasan (Dark Navy)**: Prediksi persentase keterisian saat puncak (cth: `95%`), badge status (*Penuh* / *Lega*), serta tautan ke alternatif parkir.
- **Grafik Batang Keterisian per Jam (10 Jam)**: Bar 06 s.d. 15 dengan nilai persentase di atas batang. Batang pada rentang waktu terpilih otomatis tersorot warna merah (*highlight*).

### 7. Halaman Laporan & Pengaduan (`laporan.html`)
- **Tab Segmented Control**: Beralih dinamis antara tab *Laporan Kejadian* dan *Feedback*.
- **Tampilan Feedback (Sesuai Desain)**:
  - *Star Rating Interaktif*: 5 bintang penilaian (1 s.d. 5) dengan label keterangan dinamis (*Sangat Kurang* s.d. *Sangat Baik*, default 4 bintang *Baik*).
  - *Pilihan Topik*: Pill kategori (*Akurasi data*, *Tampilan aplikasi*, *Usul fitur*, *Lainnya*).
  - *Saran atau Komentar*: Form input textarea masukan pengguna.
  - *Panduan/Tujuan (Dark Navy Card)*: Penjelasan "Masukanmu dipakai untuk".

### 8. Halaman Profil Mahasiswa (`profil.html`)
- **Kartu Identitas Pengguna (Dark Navy Card)**:
  - Avatar inisial bulat warna kuning `RF`
  - Nama Mahasiswa: **Rifqi Fadhil Abrar**
  - NIM: `255150200111015`
  - Status: `Mahasiswa aktif · Universitas Brawijaya`
  - Tombol Logout: Tombol elegan bergaris merah dengan dialog konfirmasi keluar dari akun SSO.
- **Kartu Menu Pengaturan (White Card)**:
  - **Data Kendaraan**: Akses ke data nomor plat dan ciri kendaraan terdaftar (navigasi langsung ke `data-kendaraan.html`).
  - **Pengaturan Dashboard**: Pilihan interaktif maksimal 3 area parkir favorit untuk ditampilkan pada kartu ringkasan dashboard.
  - **Opsi Navigasi**: Pengaturan aplikasi peta bawaan (Google Maps, Waze, atau Apple Maps).

### 9. Halaman Data Kendaraan (`data-kendaraan.html`)
- **Navigasi Kembali**: Tautan `< Profil` di bagian atas.
- **Formulir Kendaraan (White Card)**:
  - *Jenis kendaraan*: Tombol segmented *Motor* (default aktif) dan *Mobil*.
  - *Nomor plat*: Input teks berhuruf kapital (placeholder: `Contoh: N 1234 AB`).
  - *Merek dan model*: Input teks (placeholder: `Contoh: Honda Beat`).
  - *Warna*: Input teks lebar setengah (placeholder: `Contoh: Hitam`).
  - *Ciri-ciri lain*: Input textarea (placeholder: `Contoh: stiker UB di spakbor, helm biru di spion`).
  - *Tombol Aksi*: Tombol biru *Simpan* (dengan animasi spinner dan redirect otomatis ke profil) serta tombol *Batal*.
- **Kartu Panduan (Dark Navy Card)**: Penjelasan *"Kenapa perlu diisi?"* (tujuan identifikasi petugas dan privasi).

### 10. Halaman Pengaturan Dashboard (`pengaturan-dashboard.html`)
- **Navigasi Kembali**: Tautan `< Profil` di bagian atas.
- **Header Status**: Indikator penghitung `X dari 3 dipilih` dan status `✓ Tersimpan otomatis`.
- **Pilihan 6 Area Parkir (2 Kolom Grid)**:
  - *Parkir FILKOM* (150 slot)
  - *Parkir Fakultas Teknik* (200 slot)
  - *Parkir FEB* (120 slot)
  - *Parkir FIA* (90 slot)
  - *Parkir Fakultas Pertanian* (110 slot)
  - *Parkir FIB* (80 slot)
  - Desain interaktif: Saat dipilih, kartu berubah dengan bingkai biru `#1E5BD8` dan checkbox kotak tercentang.
  - Batas Maksimal 3: Menampilkan banner peringatan *"Batas 3 area tercapai. Lepas salah satu untuk memilih area lain."* jika kuota 3 area sudah penuh.
- **Kartu Preview (Dark Navy Card)**:
  - Judul: **Tampil di Dashboard**
  - Daftar area terpilih dengan *bullet point* warna kuning aksen.
  - Tautan cepat **Lihat Dashboard** menuju `dashboard.html`.

### 11. Halaman Opsi Navigasi (`opsi-navigasi.html`)
- **Navigasi Kembali**: Tautan `< Profil` di bagian atas.
- **Header**: Judul **Opsi Navigasi** dan subjudul penjelasan.
- **Kartu Aplikasi Navigasi**:
  - *Google Maps* (Bawaan, lalu lintas langsung) - Default terpilih dengan bingkai biru dan radio checked.
  - *Waze* (Rute menghindari macet).
  - *Apple Maps* (Untuk perangkat Apple).
- **Indikator**: Status `✓ Pilihan tersimpan otomatis` yang tersinkronisasi dengan preferensi profil pengguna.

---

## 💻 Cara Menjalankan
1. Buka file `index.html` langsung di browser (Google Chrome, Microsoft Edge, Mozilla Firefox, dll).
2. Klik tombol **"Gunakan Akun Ini"** atau tombol **"Masuk dengan SSO UB"**.
3. Sistem akan memverifikasi akun demo dan otomatis mengarahkan ke `dashboard.html`.
4. Jelajahi semua fitur melalui menu sidebar navigasi yang saling terhubung!
