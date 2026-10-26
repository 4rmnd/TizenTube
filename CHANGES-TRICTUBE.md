# Catatan Perubahan Tric Tube (Fork TizenTube)

Sesuai ketentuan lisensi GNU General Public License v3.0 (GPL-3.0), dokumen ini mencatat seluruh modifikasi yang dilakukan pada fork ini:

- **2026-10-26**:
  - Fork resmi dibuat dari [reisxd/TizenTube](https://github.com/reisxd/TizenTube).
  - Dipangkas (*trimmed*) murni ke modul pemblokir iklan YouTube TV (`adPlacements`, `playerAds`, `adSlots`, dan pembersihan rak beranda) berdasarkan logika `mods/features/adblock.js`.
  - Membuang modul UI berat, SponsorBlock, DeArrow, pengaturan custom, dan background service untuk menjaga beban seringan mungkin di STB Android TV.
  - Ditranspilasi dan dipastikan kompatibel penuh dengan Chrome 70 / WebView 70.
  - Dipin ke rilis upstream `v1.15.2`.
