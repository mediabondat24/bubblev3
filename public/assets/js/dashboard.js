// Fungs i untuk memeriksa autentikasi dan mendapatkan data pengguna
// Fungsi untuk mengambil profil pengguna dari server
async function fetchUserProfile() {
    try {
        const response = await fetch('/user/profile');

        // Cek apakah pengguna sudah login
        if (response.status === 401) {
            alert("Anda harus login untuk mengakses halaman ini.");
            window.location.href = '/page-login.html';
            return;
        }

        // Parse data dari response
        const data = await response.json();
        if (!data || !data.user) {
            throw new Error("Data pengguna tidak ditemukan.");
        }

        const user = data.user;

        // Perbarui informasi pengguna di halaman
        document.getElementById('user-name').innerText = `Nama: ${user.nama || 'Tidak ada nama'}`;
        document.getElementById('user-type').innerText = `Jenis Anggota: ${user.jenis_anggota || 'Tidak diketahui'}`;

        // Tampilkan informasi masa aktif keanggotaan
        const expiredElement = document.getElementById('user-expired');
        if (user.jenis_anggota === 'Member') {
            expiredElement.innerText = `Masa Aktif: ${user.expired_at || 'Tidak diketahui'}`;
            expiredElement.style.display = 'block';
            checkMembershipExpiration(user.expired_at);  // Cek apakah keanggotaan sudah expired
        } else {
            expiredElement.style.display = 'none';
        }

        // Fungsi tambahan untuk username TikTok dan tombol play
        displayTiktokUsernames(user);
        setupPlayButtons(user);

    } catch (error) {
        console.error("Error fetching user profile:", error);
        alert('Terjadi kesalahan saat mengambil data profil.');
    }
}

// Fungsi untuk memeriksa apakah keanggotaan sudah expired
function checkMembershipExpiration(expiredAtRaw) {
    if (!expiredAtRaw) return;

    // Parse tanggal kedaluwarsa dan tanggal sekarang
    const expiredAt = new Date(expiredAtRaw);
    const today = new Date();

    // Reset jam untuk perbandingan yang lebih akurat
    today.setHours(0, 0, 0, 0);
    expiredAt.setHours(0, 0, 0, 0);

    // Ambil elemen-elemen modal
    const expiredMessageElement = document.getElementById('expiredMessage');
    const remainingTimeElement = document.getElementById('remainingTime');
    const expiredModalElement = document.getElementById('expiredModal');
    const closeButton = expiredModalElement.querySelector('.btn-close');

    // Log untuk debugging
    console.log("Expired At:", expiredAt);
    console.log("Today:", today);

    // Jika keanggotaan sudah expired
  if (expiredAt < today) {
    console.warn("Membership expired! Displaying modal...");
    expiredMessageElement.innerText = "Keanggotaan Anda telah habis!";

    // Tampilkan modal dan pastikan modal tidak bisa ditutup
    const modal = new bootstrap.Modal(expiredModalElement, {
        backdrop: "static",  // Tidak bisa ditutup dengan klik di luar modal
        keyboard: false,      // Tidak bisa ditutup dengan tombol Escape
    });
    modal.show();
}
 else {
        // Jika keanggotaan masih aktif, hitung sisa waktu
        const remainingTime = Math.floor((expiredAt - today) / (1000 * 60 * 60 * 24));

        console.log("Remaining Time (days):", remainingTime);

        // Jika keanggotaan akan habis dalam 7 hari atau kurang, tampilkan modal peringatan
        if (remainingTime <= 7) {
            expiredMessageElement.innerText = `Keanggotaan Anda akan berakhir dalam ${remainingTime} hari!`;
            remainingTimeElement.innerText = "Segera perbarui keanggotaan Anda.";

            const modal = new bootstrap.Modal(expiredModalElement, {
                backdrop: "static",  // Tidak bisa ditutup dengan klik di luar modal
                keyboard: false,      // Tidak bisa ditutup dengan tombol Escape
            });
            modal.show();

            // Disable tombol close agar tidak bisa ditutup
            closeButton.disabled = true;
        } else {
            // Sembunyikan modal jika keanggotaan masih berlaku
            const modal = new bootstrap.Modal(expiredModalElement);
            modal.hide();
        }
    }
}

// Fungsi untuk menampilkan username TikTok pengguna
function displayTiktokUsernames(user) {
    document.getElementById('user-tiktok1').innerText = `Tiktok1: ${user.username_tiktok1 || 'Tidak ada username TikTok1'}`;

    if (user.jenis_anggota === 'VIP') {
        document.getElementById('user-tiktok2').innerText = `Tiktok2: ${user.username_tiktok2 || 'Tidak ada username TikTok2'}`;
        document.getElementById('user-tiktok3').innerText = `Tiktok3: ${user.username_tiktok3 || 'Tidak ada username TikTok3'}`;
    } else {
        document.getElementById('user-tiktok2').style.display = 'none';
        document.getElementById('user-tiktok3').style.display = 'none';
    }
}

// Fungsi untuk mengatur tombol play berdasarkan jenis anggota
function setupPlayButtons(user) {
    const membershipType = user.jenis_anggota;
    const userId = user.id;

    const buttonMappings = [
        { id: 'play-buttonv1', paths: { 'Free': 'bubble-free-v1', 'VIP': 'bubble-vip-v1', 'RK Agency': 'bubble-rk-agency-v1', 'Member': 'bubble-member-v1' } },
        { id: 'play-buttonv2', paths: { 'Free': 'bubble-free-v2', 'VIP': 'bubble-vip-v2', 'RK Agency': 'bubble-rk-agency-v2', 'Member': 'bubble-member-v2' } },
        { id: 'play-buttonv3', paths: { 'Free': 'bubble-free-v3', 'VIP': 'bubble-vip-v3', 'RK Agency': 'bubble-rk-agency-v3', 'Member': 'bubble-member-v3' } }
    ];

    buttonMappings.forEach(({ id, paths }) => {
        const button = document.getElementById(id);
        if (button && paths[membershipType]) {
            button.addEventListener('click', () => {
                window.location.href = `/${paths[membershipType]}?id=${userId}`;
            });
        }
    });
}

// Fungsi logout
const logout = async () => {
    try {
        const response = await fetch('/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            window.location.href = '/page-login.html';  // Arahkan ke halaman login setelah logout berhasil
        } else {
            console.error('Error logging out');
        }
    } catch (error) {
        console.error('Error logging out:', error);
    }
};

// Event listener untuk tombol logout
document.getElementById('logout-button').addEventListener('click', logout);

// Fungsi untuk menutup modal secara manual (tapi hanya bisa digunakan untuk modal lainnya)
function closeModal() {
    const editModal = new bootstrap.Modal(document.getElementById('editModal'));
    editModal.hide(); // Menutup modal
}

fetchUserProfile();


function openEditModal() {
    const editModalElement = document.getElementById('editModal');
    if (!editModalElement) {
        console.error('Modal edit tidak ditemukan!');
        return;
    }

    const editModal = new bootstrap.Modal(editModalElement);
    editModal.show();

    // Ambil data pengguna dari server
    fetch('/user-data')
        .then(response => {
            if (!response.ok) throw new Error('Gagal mengambil data pengguna');
            return response.json();
        })
        .then(data => {
            if (!data.user) {
                alert('Data pengguna tidak ditemukan!');
                return;
            }

            const user = data.user;

            // Ambil elemen input
            const editNama = document.getElementById('edit-name');
            const editWhatsapp = document.getElementById('edit-whatsapp');
            const editUsernameTikTok1 = document.getElementById('edit-username-tiktok1');
            const editUsernameTikTok2 = document.getElementById('edit-username-tiktok2');
            const editUsernameTikTok3 = document.getElementById('edit-username-tiktok3');
            
            const tiktokFields = document.getElementById('tiktok-fields'); // Wrapper untuk TikTok 2 & 3

            if (!editNama || !editWhatsapp || !editUsernameTikTok1 || !tiktokFields) {
                console.error('Elemen input tidak ditemukan!');
                return;
            }

            // Isi data form
            editNama.value = user.nama || '';
            editWhatsapp.value = user.whatsapp || '';
            editUsernameTikTok1.value = user.username_tiktok1 || '';

           

            // Logika jenis anggota
            switch (user.jenis_anggota) {
                case 'VIP':
                    tiktokFields.style.display = 'block';
                    editUsernameTikTok2.value = user.username_tiktok2 !== 'null' ? user.username_tiktok2 : '';
                    editUsernameTikTok3.value = user.username_tiktok3 !== 'null' ? user.username_tiktok3 : '';
                    editUsernameTikTok1.disabled = false;
                    editUsernameTikTok2.disabled = false;
                    editUsernameTikTok3.disabled = false;
                    break;

                case 'Member':
                case 'Free':
                    tiktokFields.style.display = 'none';
                    editUsernameTikTok2.value = '';
                    editUsernameTikTok3.value = '';
                    editUsernameTikTok1.disabled = false;
                    break;

                case 'RK Agency':
                    tiktokFields.style.display = 'none';
                    editUsernameTikTok1.disabled = true;
                    editUsernameTikTok2.disabled = true;
                    editUsernameTikTok3.disabled = true;
                    editUsernameTikTok1.value = user.username_tiktok1 || '';
                    editUsernameTikTok2.value = '';
                    editUsernameTikTok3.value = '';
                    break;
            }

            // Cek expired_at dan tampilkan modal jika sudah lewat
            if (user.expired_at) {
                const now = new Date();
                const expiredDate = new Date(user.expired_at);
                document.getElementById('user-expired').innerText = `Expired At: ${expiredDate.toLocaleDateString('id-ID')}`;

                if (expiredDate < now) {
                    const expiredModalElement = document.getElementById('expiredModal');
                    if (expiredModalElement) {
                        const expiredModal = new bootstrap.Modal(expiredModalElement);
                        expiredModal.show();
                    }
                }
            }
        })
        .catch(err => {
            console.error('Error fetching user data:', err);
            alert('Terjadi kesalahan saat mengambil data pengguna.');
        });
}



function submitEditForm() {
    // Ambil elemen input
    const editNama = document.getElementById('edit-name')?.value.trim();
    const editWhatsapp = document.getElementById('edit-whatsapp')?.value.trim();
    const editUsernameTikTok1 = document.getElementById('edit-username-tiktok1')?.value.trim();
    const editUsernameTikTok2 = document.getElementById('edit-username-tiktok2')?.value.trim() || '';
    const editUsernameTikTok3 = document.getElementById('edit-username-tiktok3')?.value.trim() || '';

    // Validasi
    if (!editNama || !editWhatsapp) {
        alert('Nama dan WhatsApp harus diisi!');
        return;
    }
    if (!/^\d+$/.test(editWhatsapp)) {
        alert('Nomor WhatsApp tidak valid!');
        return;
    }

    // Tentukan jenis anggota
    let jenisAnggota = 'Member';
    if (editUsernameTikTok2 || editUsernameTikTok3) jenisAnggota = 'VIP';
    else if (editUsernameTikTok1) jenisAnggota = 'Free';

    // Kirim data ke server
    const formData = {
        nama: editNama,
        whatsapp: editWhatsapp,
        jenis_anggota: jenisAnggota,
        username_tiktok1: editUsernameTikTok1,
        username_tiktok2: editUsernameTikTok2,
        username_tiktok3: editUsernameTikTok3
    };

    fetch('/update-user-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Data pengguna berhasil diperbarui!');
            new bootstrap.Modal(document.getElementById('editModal')).hide();
        } else {
            alert('Gagal memperbarui data: ' + data.message);
        }
    })
    .catch(err => {
        console.error('Error submitting data:', err);
        alert('Terjadi kesalahan saat memperbarui data pengguna.');
    });
}




// Fungsi untuk menutup modal secara manual
function closeModal() {
    const editModal = new bootstrap.Modal(document.getElementById('editModal'));
    editModal.hide(); // Menutup modal
}


document.getElementById('paymentProofForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Mencegah form dikirim secara default

    const formData = new FormData(this);

    fetch('/update-payment-proof', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Bukti bayar berhasil diperbarui!');

            // Langsung arahkan pengguna ke WhatsApp setelah upload berhasil
            const whatsappURL = "https://wa.me/6282334810232?text=Hai%20Admin%2C%20saya%20sudah%20memperpanjang%20masa%20aktif%2C%20tolong%20segera%20di%20proses";
            window.location.href = whatsappURL; // Mengarahkan ke WhatsApp
        } else {
            alert('Gagal memperbarui bukti bayar. Coba lagi!');
        }
    })
    .catch(error => {
        console.error('Terjadi kesalahan:', error);
        alert('Terjadi kesalahan. Coba lagi!');
    });
});
