// Event listener untuk perubahan pada pilihan jenis anggota
document.getElementById('jenis_anggota').addEventListener('change', function() {
    const paketOptions = document.getElementById('paketOptions');

    // Jika memilih 'Member', tampilkan paket pembayaran
    if (this.value === 'Member') {
        paketOptions.style.display = 'block'; // Menampilkan paket pilihan
    } else {
        paketOptions.style.display = 'none'; // Menyembunyikan paket pilihan
    }
});




// Function untuk memeriksa apakah nama dan WhatsApp sudah terdaftar di database
async function checkIfExists() {
    const nama = document.getElementById('nama').value;
    const whatsapp = document.getElementById('whatsapp').value;

    // Kirim request ke server untuk mengecek data pengguna
    const response = await fetch('/check-user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nama, whatsapp })
    });

    // Parse response JSON
    const result = await response.json();

    // Menampilkan alert jika data sudah terdaftar
    const alertMessage = document.getElementById('alertMessage');
    if (result.exists) {
        alertMessage.classList.remove('d-none');
        alertMessage.classList.add('alert-danger');
        alertMessage.textContent = 'Nama atau WhatsApp sudah terdaftar. Silakan pilih nomor WhatsApp lain.';
        return false;  // Jika terdaftar, cegah pengiriman form
    } else if (result.inactive) {
        // Menampilkan alert jika akun belum aktif
        alertMessage.classList.remove('d-none');
        alertMessage.classList.add('alert-warning');
        alertMessage.textContent = 'Akun Anda belum aktif. Silakan hubungi admin.';
        return false;  // Cegah pengiriman form
    }

    // Jika semuanya valid, lanjutkan pengiriman form
    return true;
}

// Menangkap event submit form untuk memeriksa sebelum mengirim
document.getElementById('registerForm').addEventListener('submit', async function(e) {
    e.preventDefault();  // Mencegah pengiriman form langsung

    // Periksa apakah data valid (cek jika data pengguna sudah terdaftar, misalnya)
    const isValid = await checkIfExists();
    if (isValid) {
        const formData = new FormData(this);
        const response = await fetch('/register', {
            method: 'POST',
            body: formData,
        });

        const result = await response.json();

        if (result.success) {
            // Menampilkan notifikasi sukses
            const alertMessage = document.getElementById('alertMessage');
            alertMessage.classList.remove('d-none');
            alertMessage.classList.add('alert-success');
            alertMessage.textContent = result.message;

            // Membuka URL pembayaran Tripay dalam pop-up
            const paymentWindow = window.open(result.paymentUrl, '_blank', 'width=600,height=800');

            // Opsional: Menunggu pembayaran selesai, kemudian menutup pop-up
            paymentWindow.addEventListener('unload', function() {
                // Bisa diisi dengan logika untuk memeriksa status pembayaran jika diperlukan
                alert('Terima kasih telah melakukan pembayaran!');
            });
        } else {
            const alertMessage = document.getElementById('alertMessage');
            alertMessage.classList.remove('d-none');
            alertMessage.classList.add('alert-danger');
            alertMessage.textContent = 'Pendaftaran gagal: ' + result.message;
        }
    }
});
