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
├── index.html          # Halaman Login SSO & Landing
├── dashboard.html      # Halaman Dashboard Utama Pengguna
├── css/
│   ├── login.css       # CSS khusus halaman login (ringan & terfokus)
│   └── dashboard.css   # CSS khusus halaman dashboard (sidebar & chart)
├── js/
│   └── script.js       # Logika JavaScript untuk autentikasi, modal, & grafik
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
- **Section Area Pilihanmu**:
  - **Parkir FILKOM**: 12 slot tersisa (Badge *Hampir penuh*, progress bar kuning 92%).
  - **Parkir Fakultas Teknik**: 64 slot tersisa (Badge *Lega*, progress bar hijau 68%).
  - **Parkir FEB**: 0 slot tersisa (Badge *Penuh*, progress bar merah 100%).
  - Link modal interaktif *"Atur area (maks 3)"*.
- **Prediksi Jam Padat · FILKOM**:
  - Grafik batang murni CSS (*pure CSS bar chart*) interaktif dari jam 06.00 hingga 15.00 WIB.
  - Bar jam 08 berwarna kuning (*mulai padat*) dan jam 09 berwarna merah (*puncak terpadat*).
  - Hover tooltip & efek klik informatif pada tiap batang grafik.
- **Menu Cepat**:
  - Tombol aksi *"Semua area parkir UB"*, *"Cari area alternatif"*, dan *"Laporkan kejadian"*.

---

## 💻 Cara Menjalankan
1. Buka file `index.html` langsung di browser (Google Chrome, Microsoft Edge, Mozilla Firefox, dll).
2. Klik tombol **"Gunakan Akun Ini"** atau tombol **"Masuk dengan SSO UB"**.
3. Sistem akan memverifikasi akun demo dan otomatis mengarahkan ke `dashboard.html`.
