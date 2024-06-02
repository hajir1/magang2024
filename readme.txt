jika dokumentasi disini kurang jelas silahkan kunjungi https://github.com/hajir1/magang2024
# Apikasi Website Monitor Kendaraan
aplikasi ini dibuat untuk memonitor kendaraan PT Timah Indonesia yang dapat dimonitor di telegram


## Tools / Framework pembuatan Aplikasi


# BackEnd
- NodeJs sebagai Bahasa Pemograman Utama
- Express sebagai library Routing Popupler di NodeJs
- Prisma sebagai ORM
- Joi sebagai Validation
- Mysql sebagai Database Management

# FrontEnd
- Javascript sebagai Bahasa Pemograma Utama
- ReactJs sebagai Framework Utama FrontEnd
- TailwindCss untuk styling
- Axios dan Formik untuk Fetch API
- zustand sebagai State management

# Panduan Dalam Menjalankan Aplikasi
- Masuk terminal git dan masukkan perintah terminal git clone https://github.com/hajir1/magang2024.git
- masuk folder backEnd dan masukkan perintah terminal npm i
- jalankan perintah terminal npm run dev (disarankan tidak di ubah sedikitpun dari kode)


## Panduan Menggunakan Website
- Silahkan login tersedia 2 users 
- user 1

```json
{
    "username" :"admin",
    "password" :"admin"
} 
```
- user 2

```json
{
    "username" :"penerima",
    "password" :"penerima"
} 
```
jika kedua user salah / gagal masuk dalam website silahkan send API ke 
- POST http://localhost:3000/register dengan format json , bisa menggunakan postman atau cari file .http di folder backend 

Content-Type: application/json
```json
{
    "username":"admin",
    "password":"admin",
    "role":"admin"
}

```
# penting
- sangat disarankan untuk membuat user dengan username pertama (admin) dan user kedua dengan username (penerima)
    karena saat pengujian aplikasi selalu menggunakan user tersebut
- username admin digunakan untuk CRUD sekuruh data kecuali penerimaan data pemesanan
- username penerima digunakan untuk menerima seluruh data pesanan tanpa akses CRUD data

# bug tak teratasi
- saat menambahkan pesanan kendaraan , driver dengan data pertama tidak bisa untuk menjadi pemesanan kendaraan
- semua log riwayat ekspedisi tidak ditmpilkan karena kesalahan algoritma dalam pembuatan table,
    jadi sebagai alternatif lain , saya menamplikan riwayat ekspedisi berdasarkan kendaraan , bisa di cek di detail kendaraan
- session menggunakan Jwt sehingga data di simpan di localStorage bukan Database seperti session
- saya memlih fullstack dengan MERN STACK karena pengetahuan saya tentang PHP tak cukup sampai untuk membuat Website se kompleks ini


# terima kasih , selamat menjalankan aplikasi