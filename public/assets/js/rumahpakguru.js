
function editUser(id, nama, whatsapp, username_tiktok1, username_tiktok2, username_tiktok3, jenis_anggota, expired_at) {
    // Mengisi form edit dengan data pengguna
    document.getElementById('editNama').value = nama;
    document.getElementById('editWhatsapp').value = whatsapp;
    document.getElementById('editUsernameTikTok1').value = username_tiktok1;
    document.getElementById('editUsernameTikTok2').value = username_tiktok2 || ''; // Menyediakan nilai default jika null
    document.getElementById('editUsernameTikTok3').value = username_tiktok3 || ''; // Menyediakan nilai default jika null

    // Menampilkan / Menyembunyikan input berdasarkan jenis anggota
    if (jenis_anggota === 'VIP') {
        // Menampilkan semua form username TikTok jika jenis anggota VIP
        document.getElementById('editUsernameTikTok2Div').style.display = 'block';
        document.getElementById('editUsernameTikTok3Div').style.display = 'block';
    } else {
        // Menyembunyikan form username TikTok 2 dan 3 jika bukan VIP
        document.getElementById('editUsernameTikTok2Div').style.display = 'none';
        document.getElementById('editUsernameTikTok3Div').style.display = 'none';
    }

    // Menampilkan input expired_at hanya untuk 'Member'
    const expiredAtInput = document.getElementById('editExpiredAt');
    if (jenis_anggota === 'Member') {
        // Menampilkan input expired_at jika jenis anggota Member
        document.getElementById('editExpiredAtDiv').style.display = 'block';
        expiredAtInput.value = expired_at || ''; // Menampilkan expired_at jika Member, jika tidak ada set default kosong
    } else {
        // Menyembunyikan input expired_at jika bukan Member
        document.getElementById('editExpiredAtDiv').style.display = 'none';
    }

    // Mengisi dropdown untuk jenis anggota
    const jenisAnggotaDropdown = document.getElementById('editJenisAnggota');
    const jenisAnggotaOptions = ['VIP', 'Member', 'Free', 'RK Agency']; // Daftar jenis anggota dari database atau server
    jenisAnggotaDropdown.innerHTML = ''; // Kosongkan dropdown sebelumnya

    // Menambahkan opsi ke dalam dropdown
    jenisAnggotaOptions.forEach(option => {
        const optionElement = document.createElement('option');
        optionElement.value = option;
        optionElement.textContent = option;
        jenisAnggotaDropdown.appendChild(optionElement);
    });

    // Setel nilai yang sudah ada sesuai dengan jenis anggota pengguna yang sedang diedit
    jenisAnggotaDropdown.value = jenis_anggota; // Memilih nilai jenis_anggota yang ada di database

    // Menangani pengiriman form
    const form = document.getElementById('editUserForm');
    form.onsubmit = function(event) {
        event.preventDefault();

        const updatedData = {
            nama: document.getElementById('editNama').value,
            whatsapp: document.getElementById('editWhatsapp').value,
            username_tiktok1: document.getElementById('editUsernameTikTok1').value,
            username_tiktok2: document.getElementById('editUsernameTikTok2').value || null, // Hanya kirim jika ada
            username_tiktok3: document.getElementById('editUsernameTikTok3').value || null, // Hanya kirim jika ada
            expired_at: document.getElementById('editExpiredAt').value || null, // Kirim jika ada, jika tidak kirim null
            jenis_anggota: document.getElementById('editJenisAnggota').value // Kirim jenis anggota yang dipilih
        };

        // Kirim data yang diperbarui ke server
        fetch(`/update-user/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedData)
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            location.reload(); // Refresh halaman setelah update
        })
        .catch(error => {
            console.error('Error updating user:', error);
        });

        // Menutup modal setelah form disubmit
        const modal = bootstrap.Modal.getInstance(document.getElementById('editUserModal'));
        modal.hide();
    };

    // Menampilkan modal
    const modal = new bootstrap.Modal(document.getElementById('editUserModal'));
    modal.show();
}

// Fungsi untuk fetch dan menampilkan data pengguna yang sudah difilter
async function fetchUsers() {
    try {
        const response = await fetch('/api/users', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();

        if (response.ok) {
            // Filter data berdasarkan jenis_anggota dan status
            displayUsersInTable(data.users, 'RK Agency', 'Aktif', 'rk-agencyTableBody');
            displayUsersInTable(data.users, 'VIP', 'Aktif', 'vipTableBody');
            displayUsersInTable(data.users, 'Free', 'Aktif', 'memberTableBody');
            displayUsersInTable(data.users, 'Member', 'Aktif', 'memberTableBody');
            displayExpiredUsers(data.users, 'expiredTableBody');
            displayNonActiveUsers(data.users, 'nonaktifTableBody');
        } else {
            document.getElementById('errorMessage').innerText = data.message;
            document.getElementById('errorMessage').style.display = 'block';
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('errorMessage').innerText = 'Something went wrong. Please try again.';
        document.getElementById('errorMessage').style.display = 'block';
    }
}

// Fungsi untuk menampilkan data pengguna yang sudah difilter
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: '2-digit' };
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', options); // Format Indonesia
}

function displayUsersInTable(users, jenisAnggota, status, tableBodyId) {
    const tableBody = document.getElementById(tableBodyId);
    if (tableBody) {
        let noUrut = 1;
        const filteredUsers = users.filter(user => 
            user.jenis_anggota === jenisAnggota && user.status === status
        );

        filteredUsers.forEach(user => {
            const tiktokString = [user.username_tiktok1, user.username_tiktok2, user.username_tiktok3].filter(account => account).join(', ');

            const row = tableBody.insertRow();
            row.insertCell(0).textContent = noUrut++; // Nomor urut
            row.insertCell(1).textContent = user.nama; // Nama
            row.insertCell(2).textContent = user.whatsapp; // Whatsapp
            row.insertCell(3).textContent = tiktokString; // Akun TikTok
            row.insertCell(4).textContent = user.jenis_anggota; // Jenis Anggota

            // Memformat tanggal expired_at jika ada
            const expiredAt = user.expired_at ? formatDate(user.expired_at) : null;
            const expiredCell = row.insertCell(5);
            expiredCell.textContent = expiredAt ? expiredAt : ''; // Jangan tampilkan '-' jika expired_at kosong
            
            // Cek apakah expired_at kosong, jika ya sembunyikan kolom
            if (!expiredAt) {
                expiredCell.style.display = 'none'; // Sembunyikan kolom expired_at jika kosong
            }

            // Tombol Edit dan Off untuk status
            const editButton = `
                <button class="btn btn-primary" onclick="editUser(${user.id}, '${encodeURIComponent(user.nama)}', '${encodeURIComponent(user.whatsapp)}', '${encodeURIComponent(user.username_tiktok1)}', '${encodeURIComponent(user.username_tiktok2)}', '${encodeURIComponent(user.username_tiktok3)}', '${encodeURIComponent(user.jenis_anggota)}', '${encodeURIComponent(user.expired_at)}')">Edit</button>
            `;
            const offButton = `
                <button class="btn btn-warning" onclick="toggleStatus(${user.id})">Off</button>
            `;
            const actionCell = row.insertCell(6);
            actionCell.innerHTML = editButton + offButton;

            // Anda juga bisa menyembunyikan tombol 'Off' jika kondisi tertentu
            if (user.status === 'inactive') {
                actionCell.style.display = 'none'; // Sembunyikan tombol jika status inactive
            }
        });
    }
}



// Fungsi untuk menampilkan data yang expired
function displayExpiredUsers(users, tableBodyId) {
    const tableBody = document.getElementById(tableBodyId);
    if (tableBody) {
        let noUrut = 1;
        const expiredUsers = users.filter(user => 
            user.jenis_anggota === 'Member' && new Date(user.expired_at) < new Date()
        );

        expiredUsers.forEach(user => {
            const row = tableBody.insertRow();
            row.insertCell(0).textContent = noUrut++; // Nomor urut
            row.insertCell(1).textContent = user.nama; // Nama
            row.insertCell(2).textContent = user.whatsapp; // Whatsapp
            row.insertCell(3).textContent = user.username_tiktok1 || user.username_tiktok2 || user.username_tiktok3; // TikTok Username
            row.insertCell(4).textContent = user.expired_at; // Expired At

            if (user.jenis_anggota === 'Member') {
                row.insertCell(5).innerHTML = `<button class="btn btn-info" onclick="showBukti('${user.bukti_bayar}')">Lihat Bukti</button>`;
            } else {
                row.insertCell(5).textContent = '-'; // Tidak ada bukti untuk selain Member
            }

            row.insertCell(6).innerHTML = `<button class="btn btn-success" onclick="extendExpiration(${user.id})">Perpanjang</button>`;
        });
    }
}




// Fungsi untuk memperpanjang masa aktif pengguna
function extendExpiration(userId) {
    if (confirm('Apakah Anda yakin ingin memperpanjang masa aktif pengguna ini?')) {
        const now = new Date();
        const extendedExpiration = new Date(now.setMonth(now.getMonth() + 1)).toISOString(); // Menambahkan 1 bulan ke expired_at

        fetch(`/extend-expiration/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ expired_at: extendedExpiration })
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            location.reload(); // Refresh halaman setelah tanggal expired diperpanjang
        })
        .catch(error => {
            console.error('Error extending expiration:', error);
        });
    }
}



// Fungsi untuk menampilkan pengguna yang tidak aktif
function displayNonActiveUsers(users, tableBodyId) {
    const tableBody = document.getElementById(tableBodyId);
    if (tableBody) {
        let noUrut = 1;
        const nonActiveUsers = users.filter(user => 
            user.status === 'Tidak Aktif'
        );

        nonActiveUsers.forEach(user => {
            const row = tableBody.insertRow();
            row.insertCell(0).textContent = noUrut++; // Nomor urut
            row.insertCell(1).textContent = user.nama; // Nama
            row.insertCell(2).textContent = user.whatsapp; // Whatsapp
            row.insertCell(3).textContent = user.username_tiktok1 || user.username_tiktok2 || user.username_tiktok3; // TikTok Username
            row.insertCell(4).textContent = user.jenis_anggota; // Jenis Anggota

            if (user.jenis_anggota === 'Member') {
                row.insertCell(5).innerHTML = `<button class="btn btn-info" onclick="showBukti('${user.bukti_bayar}')">Lihat Bukti</button>`;
            } else {
                row.insertCell(5).textContent = '-'; // Tidak ada bukti untuk selain Member
            }

            // Tombol Aktifkan
            row.insertCell(6).innerHTML = `
                <button class="btn btn-success" onclick="activateUser(${user.id}, '${user.jenis_anggota}')">Aktifkan</button>
                <button class="btn btn-danger" onclick="deleteUser(${user.id})">Delete</button>
            `;
        });
    }
}





// Fungsi untuk merubah status pengguna menjadi 'Tidak Aktif'
// Fungsi untuk merubah status pengguna menjadi 'Tidak Aktif' di tabel selain Tidak Aktif
function toggleStatus(userId) {
    if (confirm('Apakah Anda yakin ingin menonaktifkan pengguna ini?')) {
        fetch(`/toggle-status/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ status: 'Tidak Aktif' })
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message); // Menampilkan pesan sukses
            location.reload(); // Refresh halaman setelah status diubah
        })
        .catch(error => {
            console.error('Error updating status:', error);
        });
    }
}


// Fungsi untuk mengaktifkan pengguna
function activateUser(userId, jenisAnggota) {
    if (confirm('Apakah Anda yakin ingin mengaktifkan pengguna ini?')) {
        const now = new Date();
        let activatedAt;
        let expiredAt;

        // Hanya jika jenis anggota "Member", kita atur activated_at dan expired_at
        if (jenisAnggota === 'Member') {
            activatedAt = now.toISOString().slice(0, 19).replace('T', ' ');  // Menghapus milidetik dan 'T'
            expiredAt = new Date(now.setMonth(now.getMonth() + 1)).toISOString().slice(0, 19).replace('T', ' '); // Menambahkan 1 bulan ke expired_at dan mengubah formatnya
        }

        // Mengirim request PUT untuk mengubah status pengguna
        fetch(`/activate-user/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                activated_at: activatedAt || undefined, // Jika bukan Member, activated_at tidak dikirim
                expired_at: expiredAt || undefined // Jika bukan Member, expired_at tidak dikirim
            })
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            location.reload(); // Refresh halaman setelah status diubah
        })
        .catch(error => {
            console.error('Error activating user:', error);
        });
    }
}




// Fungsi untuk menghasilkan warna acak
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Fungsi untuk menampilkan angka dengan warna acak
function displayRandomNumberAndColor(id, number) {
    const randomColor = getRandomColor();
    const numberElement = document.getElementById(id);
    numberElement.style.color = randomColor;
    numberElement.textContent = number;  // Tampilkan angka yang diterima dari API, bukan angka acak
}

// Update data dashboard
async function fetchDashboardData() {
    try {
        const response = await fetch('/api/dashboard-data', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();

        if (response.ok) {
            // Menampilkan data di dashboard (nilai yang benar dari API)
            document.getElementById('rkAgencyCount').textContent = data.rkAgencyCount;
            document.getElementById('vipCount').textContent = data.vipCount;
            document.getElementById('freeMemberCount').textContent = data.freeMemberCount;
            document.getElementById('expiredCount').textContent = data.expiredCount;
            document.getElementById('nonActiveCount').textContent = data.nonActiveCount;
            document.getElementById('totalUsersCount').textContent = data.totalUsersCount;

            // Menampilkan angka dengan warna acak
            displayRandomNumberAndColor('rkAgencyCount', data.rkAgencyCount);
            displayRandomNumberAndColor('vipCount', data.vipCount);
            displayRandomNumberAndColor('freeMemberCount', data.freeMemberCount);
            displayRandomNumberAndColor('expiredCount', data.expiredCount);
            displayRandomNumberAndColor('nonActiveCount', data.nonActiveCount);
            displayRandomNumberAndColor('totalUsersCount', data.totalUsersCount);
        } else {
            console.error('Error fetching dashboard data:', data.message);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}



function showBukti(buktiFileName) {
    const modal = new bootstrap.Modal(document.getElementById('buktiModal'));
    const imageElement = document.getElementById('buktiImage');
    
    // Tentukan path gambar (misalnya file gambar disimpan di public/uploads/images/)
    imageElement.src = `/uploads/images/${buktiFileName}`;

    // Menampilkan modal
    modal.show();
}




// Fungsi untuk logout
function logout() {
    fetch('/keluar-pak', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => {
        window.location.href = '/masuk-pak'; // Redirect ke halaman login setelah logout
    }).catch(error => {
        console.error('Logout error:', error);
    });
}

function loadSection(sectionId) {
    // Sembunyikan semua section
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.style.display = 'none';
    });

    // Tampilkan section yang dipilih
    const sectionToShow = document.getElementById(sectionId);
    if (sectionToShow) {
        sectionToShow.style.display = 'block';
    }
}

// Memanggil fungsi loadSection saat halaman dimuat untuk menampilkan Dashboard sebagai default
window.onload = function() {
    loadSection('dashboard');
    fetchUsers(); // Memanggil fetchUsers untuk mengisi data
    fetchDashboardData();
};


// Route untuk menghapus pengguna (hanya superadmin yang bisa melakukannya)
function deleteUser(userId) {
    if (confirm('Apakah Anda yakin ingin menghapus pengguna ini secara permanen?')) {
        fetch(`/delete-user/${userId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message); // Menampilkan pesan sukses
            location.reload(); // Refresh halaman setelah pengguna dihapus
        })
        .catch(error => {
            console.error('Error deleting user:', error);
        });
    }
}


fetch('/api/blurred-users-full')
    .then(res => res.json())
    .then(data => {
      if (!data.success) return;

      const tbody = document.querySelector('#blurredTable tbody');
      data.users.forEach((user, index) => {
        const row = document.createElement('tr');

        row.innerHTML = `
          <td>${index + 1}</td>
          <td>${user.tiktok_unique_id}</td>
          <td><img src="${user.profile_picture_url}" width="60" height="60" style="border-radius: 50%;"/></td>
          <td>${new Date(user.created_at).toLocaleString()}</td>
          <td>
            <button class="btn btn-success" onclick="unblurUser('${user.tiktok_unique_id}', this)">Unblur</button>
          </td>
        `;

        tbody.appendChild(row);
      });
    });

  function unblurUser(uniqueId, button) {
    if (!confirm(`Yakin ingin unblur user ${uniqueId}?`)) return;

    fetch('/api/unblur-user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ uniqueId })
    })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        // Hapus baris tabel dari DOM
        const row = button.closest('tr');
        row.remove();
      } else {
        alert('Gagal menghapus user.');
      }
    });
  }