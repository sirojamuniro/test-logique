# Test Logique

[![Node.js version](https://img.shields.io/badge/node-20+-blue.svg)](https://nodejs.org/)
[![npm version](https://img.shields.io/npm/v/test-logique)](https://www.npmjs.com/package/test-logique)
[![Docker Pulls](https://img.shields.io/docker/pulls/your_dockerhub_user/your_image_name.svg)](https://hub.docker.com/r/your_dockerhub_user/your_image_name) "create clean code for express js and typescript" (Deskripsi dari package.json)

## Teknologi yang Digunakan

* Node.js & npm / Yarn
* Express.js
* TypeScript
* TypeORM (dengan PostgreSQL)
* Docker & Docker Compose
* Jest & Supertest (untuk Testing)
* SWC (Speedy Web Compiler)
* TypeBox (untuk Validasi Schema)
* dotenv

## Prasyarat

Sebelum menjalankan proyek ini, pastikan Anda telah menginstal:

* [Node.js](https://nodejs.org/) (Versi 20 atau lebih baru disarankan)
* [npm](https://www.npmjs.com/) atau [Yarn](https://yarnpkg.com/)
* [Docker](https://www.docker.com/)
* [Docker Compose](https://docs.docker.com/compose/) (Biasanya sudah termasuk dalam instalasi Docker Desktop)
* Sebuah instance PostgreSQL (untuk Cara 2, jika tidak menggunakan Docker Compose DB)

## Memulai

Ada dua cara utama untuk menjalankan aplikasi ini: menggunakan Docker Compose (direkomendasikan untuk kesederhanaan setup DB) atau secara lokal menggunakan npm/yarn.

### **Cara 1: Menggunakan Docker Compose (Direkomendasikan)**

Metode ini akan menjalankan aplikasi Node.js Anda dan database PostgreSQL dalam container Docker, mengisolasi lingkungan dan mempermudah manajemen dependensi eksternal seperti database.

1.  **Pastikan Docker Berjalan:** Jalankan aplikasi Docker Desktop (atau daemon Docker di Linux/Server Anda).
2.  **Siapkan File Variabel Lingkungan:**
    * Buat file bernama `.env` di direktori akar proyek Anda (sejajar dengan `docker-compose.yml`). File ini digunakan oleh Docker Compose untuk substitusi variabel (`${...}`).
    * Pastikan file `.env` ini berisi variabel-variabel dasar yang dibutuhkan untuk substitusi (terutama kredensial DB):

        ```env
        # .env (di akar proyek)
        # Variabel untuk substitusi di docker-compose.yml
        DB_NAME=logique_production # Ganti sesuai keinginan Anda
        DB_USER=logique_prod_user # Ganti sesuai keinginan Anda
        DB_PASSWORD=password_prod_kuat # Ganti dengan password yang kuat
        ```
    * Pastikan file `.env.production` juga ada di direktori akar proyek Anda. File ini berisi variabel lingkungan lengkap yang akan dimuat ke dalam container saat runtime. Pastikan isinya mencakup detail koneksi DB yang sama dengan `.env` untuk konsistensi, ditambah variabel lain yang dibutuhkan aplikasi (misal `NODE_ENV=production`, `DB_HOST=db`, `DB_PORT=5432`, `DB_LOG=false`, `DB_SYNC=false`, `DB_POOL_SIZE=10`).
3.  **Bangun Image dan Jalankan Container:** Buka terminal di direktori akar proyek Anda (di mana `docker-compose.yml` berada) dan jalankan perintah berikut:
    ```bash
    docker-compose up --build -d
    ```
    * `up`: Memulai service yang didefinisikan dalam `docker-compose.yml`.
    * `--build`: Membangun image Docker untuk aplikasi (berdasarkan `Dockerfile`) jika belum ada atau kode sumber berubah.
    * `-d`: Menjalankan container di background (detached mode).
4.  **Verifikasi Container Berjalan:** Anda bisa memeriksa status container dengan:
    ```bash
    docker-compose ps
    ```
    Anda juga bisa melihat log untuk memastikan tidak ada error saat startup:
    ```bash
    docker-compose logs app
    docker-compose logs db
    ```
5.  **Akses Aplikasi:** Setelah container `app` berjalan sehat, aplikasi Anda seharusnya bisa diakses di:
    ```
    http://localhost:3000
    ```
    (Sesuaikan port 3000 jika Anda mengubah mapping di `docker-compose.yml`).
6.  **Menghentikan Aplikasi:** Untuk menghentikan container, jalankan di direktori akar proyek:
    ```bash
    docker-compose down
    ```
    Untuk menghentikan dan menghapus volume data database (menghilangkan data DB), gunakan:
    ```bash
    docker-compose down --volumes
    ```

### **Cara 2: Menggunakan npm Secara Lokal**

Metode ini menjalankan aplikasi langsung di lingkungan Node.js di komputer host Anda. Anda perlu memastikan Node.js/npm terinstal dan memiliki instance database PostgreSQL yang berjalan dan dapat diakses.

1.  **Instal Dependensi:** Buka terminal di direktori akar proyek Anda dan jalankan:
    ```bash
    npm install
    # atau
    # yarn install
    ```
2.  **Siapkan File Variabel Lingkungan:**
    * Pastikan file `.env.development` ada di direktori akar proyek Anda. File ini berisi konfigurasi untuk lingkungan pengembangan lokal.
    * Salin file `.env.development` menjadi file `.env` di direktori akar proyek. Library `dotenv` yang digunakan aplikasi akan membaca file `.env` ini secara default.
    ```bash
    cp .env.development .env
    ```
    * Edit file `.env` yang baru dibuat dan sesuaikan detail koneksi database (`DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASSWORD`) agar sesuai dengan instance PostgreSQL lokal yang Anda jalankan atau DB yang bisa diakses. Pastikan `DB_LOG` dan `DB_SYNC` diatur sesuai kebutuhan (misal, `DB_SYNC=true` untuk development awal, tapi hati-hati!).
3.  **Jalankan Migrasi TypeORM (Jika Diperlukan):** Jika Anda menggunakan migrasi TypeORM, jalankan migrasi untuk membuat skema database sesuai entitas Anda (terutama jika `DB_SYNC=false` atau Anda baru pertama kali setup DB).
    ```bash
    npm run typeorm migration:run -- -d ./dist/src/config/data-source.js # Sesuaikan path data-source jika berbeda setelah build
    # atau gunakan ts-node jika menjalankan dari src:
    # npm run typeorm migration:run -- -d ./src/config/data-source.ts
    ```
    (Perintah `typeorm` mungkin perlu penyesuaian path `data-source` tergantung setup `ts-node` atau hasil build).
4.  **Bangun Aplikasi:** Kompilasi kode TypeScript ke JavaScript:
    ```bash
    npm run build
    # atau
    # yarn run build
    ```
    Ini akan menghasilkan file JavaScript di direktori `dist`.
5.  **Jalankan Aplikasi:** Jalankan aplikasi dari file yang sudah dikompilasi:
    ```bash
    npm start
    # atau
    # yarn start
    ```
    Aplikasi akan dijalankan menggunakan Node.js dari direktori `dist`.
6.  **Jalankan dalam Mode Pengembangan (dengan Hot-reloading):** Jika Anda ingin menjalankan aplikasi dengan hot-reloading saat ada perubahan kode, gunakan script `dev`:
    ```bash
    npm run dev
    # atau
    # yarn run dev
    ```
    Mode ini menggunakan `ts-node-dev` dan membaca file `.ts` langsung dari `src`. Pastikan `.env` Anda dikonfigurasi untuk DB yang bisa diakses dari host.
7.  **Akses Aplikasi:** Setelah aplikasi berjalan, akses di browser atau tool API client:
    ```
    http://localhost:3000
    ```
    (Sesuaikan port jika aplikasi Anda dikonfigurasi untuk port lain di `.env`).

## Konfigurasi

Aplikasi menggunakan variabel lingkungan untuk konfigurasi. Library `dotenv` digunakan untuk memuat variabel dari file `.env` di direktori akar proyek secara otomatis saat aplikasi dijalankan (kecuali di-override oleh variabel environment sistem atau Docker Compose).

* `.env`: File default yang dibaca oleh `dotenv`. Gunakan untuk konfigurasi lokal atau variabel yang dibaca oleh Docker Compose.
* `.env.production`: Digunakan di lingkungan produksi (misal, dimuat ke container Docker via `env_file`).
* `.env.development`: (Opsional) Bisa digunakan sebagai template untuk setup pengembangan lokal.

Pastikan file `.env` yang sesuai tersedia di lingkungan tempat aplikasi dijalankan (di root proyek untuk lokal, dimuat ke container untuk Docker).

## Menjalankan Test

Untuk menjalankan test menggunakan Jest:

* Jalankan semua test satu kali:
    ```bash
    npm test
    # atau
    # yarn test
    ```
* Jalankan test dalam mode watch (rerun saat file berubah):
    ```bash
    npm run test:watch
    # atau
    # yarn run test:watch
    ```
* Jalankan test dan hasilkan laporan code coverage:
    ```bash
    npm run test:cov
    # atau
    # yarn run test:cov
    ```

Pastikan file `jest.config.js`, `tsconfig.json`, dan file setup test (`test/jest.setup.ts`) dikonfigurasi dengan benar agar test berjalan di lingkungan TypeScript dengan mock yang tepat.

## Proses Build

Aplikasi ini menggunakan SWC untuk kompilasi. Script build didefinisikan di `package.json`:

```bash
npm run build
# atau
# yarn run build


## Uji API dengan Postman

Anda dapat menguji endpoint API yang disediakan menggunakan aplikasi Postman. Kami menyediakan Postman collection yang berisi contoh request untuk beberapa endpoint.

1.  **Download Postman:** Jika Anda belum memiliki Postman, unduh dan instal dari [situs resmi Postman](https://www.postman.com/downloads/).
2.  **Unduh Collection:** Pastikan Anda memiliki file `LOGIQUE.postman_collection.json` dari repositori proyek ini.
3.  **Impor Collection:** Buka Postman, klik tombol `Import`, lalu pilih file `LOGIQUE.postman_collection.json` yang sudah Anda unduh.
4.  **Atur Base URL:**
    * Endpoint dalam collection ini menggunakan variabel lingkungan untuk Base URL (misal, `{{baseUrl}}/api/v1/books`).
    * Buat sebuah Environment baru di Postman (klik ikon roda gigi di kanan atas -> `Add`). Beri nama Environment (misal, "Logique Local").
    * Tambahkan sebuah variabel bernama `baseUrl`. Atur `Initial Value` dan `Current Value` ke URL di mana aplikasi Anda berjalan:
        * Jika menggunakan **Docker Compose** atau menjalankan **lokal di port 3000**: `http://localhost:3000`
        * Sesuaikan jika aplikasi berjalan di host/port lain.
    * Pilih Environment yang baru Anda buat dari dropdown di kanan atas Postman.
5.  **Jelajahi dan Jalankan Request:** Buka collection "Test Logique" yang sudah diimpor. Anda akan melihat folder dan request di dalamnya.
    * Pilih request (misal, `GET List Books`).
    * Lihat tab `Params`, `Headers`, `Body`, dan `Tests` untuk memahami detail request dan bagaimana respons diuji.
    * Klik tombol `Send` untuk menjalankan request.
    * Periksa `Status` code dan body di panel respons di bagian bawah.
6.  **Jalankan Test Otomatis (Collection Runner):** Beberapa request mungkin memiliki test yang ditulis di tab `Tests`. Anda bisa menjalankan seluruh collection atau folder tertentu secara otomatis menggunakan Collection Runner (klik tiga titik pada collection/folder -> `Run collection`). Ini akan menjalankan semua request secara berurutan dan menampilkan hasil test.

Pastikan aplikasi backend Anda berjalan (menggunakan Cara 1 atau Cara 2) sebelum menguji API dengan Postman.
