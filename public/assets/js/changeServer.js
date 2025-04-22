       function setServer(server) {
            // Simpan pilihan server di localStorage
            localStorage.setItem('selectedServer', server);

            // Ganti status server
            document.getElementById('server-status').innerText = `Server yang sedang digunakan: ${server === 'server1' ? 'Server 1' : 'Server 2'}`;

            // Mengambil tombol
            const server1Button = document.getElementById('server1');
            const server2Button = document.getElementById('server2');

            // Reset warna kedua tombol
            server1Button.classList.remove('btn-danger');
            server1Button.classList.add('btn-info', 'btn-sm');  // Tombol Server 1 kembali ke warna awal

            server2Button.classList.remove('btn-danger');
            server2Button.classList.add('btn-info', 'btn-sm');  // Tombol Server 2 kembali ke warna awal

            // Menentukan warna berdasarkan pilihan server
            if (server === 'server1') {
                server1Button.classList.add('btn-danger');  // Server 1 aktif, beri warna merah
            } else if (server === 'server2') {
                server2Button.classList.add('btn-danger');  // Server 2 aktif, beri warna merah
            }

            // Hapus script yang lama
            const scriptElement = document.getElementById('dynamic-script');
            if (scriptElement) {
                scriptElement.remove();
            }

            // Tambahkan script baru sesuai server yang dipilih
            let newScript = document.createElement('script');
            newScript.id = 'dynamic-script';
            if (server === 'server1') {
                newScript.src = 'assets/js/free/scriptfreev1.js'; // Skrip untuk Server 1
            } else if (server === 'server2') {
                newScript.src = 'assets/js/serverdua/scriptserverduamemberv2.js'; // Skrip untuk Server 2
            }
            newScript.defer = true;

            // Menyisipkan script baru ke dalam halaman
            document.body.appendChild(newScript);

            // Jika memilih server 2, lakukan refresh halaman setelah pemilihan server
            if (server === 'server2') {
                window.location.reload(); // Segarkan halaman setelah pemilihan Server 2
            }
        }

        // Fungsi untuk memuat server yang terakhir dipilih saat halaman dimuat
        window.onload = function() {
            // Ambil server yang dipilih dari localStorage
            const selectedServer = localStorage.getItem('selectedServer');

            // Jika ada pilihan server yang tersimpan, set server tersebut
            if (selectedServer) {
                setServer(selectedServer);
            } else {
                // Jika tidak ada pilihan server yang tersimpan, pilih default (Server 1)
                setServer('server1');
            }
        }