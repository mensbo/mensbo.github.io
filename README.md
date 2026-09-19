# Menas — Scientific Computing Portfolio

Website portofolio statis untuk membagikan proyek komputasi sains, simulasi numerik, dan tutorial physical understanding.

## Menjalankan lokal

Buka `index.html` langsung di browser, atau gunakan static server sederhana:

```bash
python -m http.server 8000
```

## Publikasi ke GitHub Pages

1. Push seluruh isi folder ini ke repository GitHub.
2. Buka **Settings → Pages**.
3. Pada **Build and deployment**, pilih **Deploy from a branch**.
4. Pilih branch utama dan folder `/ (root)`, lalu klik **Save**.

Ganti tautan GitHub, LinkedIn, email, serta URL proyek pada `index.html` dengan akun dan karya milikmu.

## Menambah project atau tutorial lewat Markdown

1. Buat file `.md` baru di `content/projects/` atau `content/tutorials/`.
2. Gunakan front matter di bagian paling atas:

```md
---
slug: nama-singkat
title: Judul tulisan
year: 2025
category: Simulation
summary: Ringkasan singkat untuk kartu daftar.
visual: visual-echo
---
```

3. Tulis isi Markdown di bawah tanda `---`.
4. Tambahkan nama file tersebut ke `content/content-index.json`, pada array `projects` atau `tutorials`.
5. Push ke GitHub. Website akan membaca file Markdown itu secara otomatis.

Template siap pakai tersedia di `content/projects/_project-template.md` dan `content/tutorials/_tutorial-template.md`. Jangan masukkan file template ke manifest.

Untuk tutorial, gunakan `duration` sebagai pengganti `year` dan `summary`:

```md
---
slug: tutorial-baru
title: Judul tutorial
category: Numerical methods
duration: 10 min read
---
```

Website perlu dijalankan melalui static server saat dites lokal karena browser tidak mengizinkan `fetch()` membaca file Markdown dari `file://`.
