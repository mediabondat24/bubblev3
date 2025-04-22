let imageArray = [
    "/images/slidekana.gif", 
    "/images/slidekiri.gif"
]; // Array gambar yang tersedia

// Menyimpan elemen gambar yang akan ditampilkan
let imageContainer = document.getElementById("imageContainer");

// Fungsi untuk membuat elemen gambar dan menambahkannya ke container
function createImageElement() {
    let imageElement = document.createElement("img");
    imageElement.id = "imageDisplay";
    imageElement.style.position = "absolute";
    imageElement.style.width = "100%";
    imageElement.style.height = "100%";
    imageElement.style.objectFit = "cover";

    imageContainer.appendChild(imageElement); // Menambahkan gambar ke dalam container
    return imageElement;
}

// Membuat elemen gambar pertama kali
let currentImageElement = createImageElement(); // Menyimpan elemen gambar yang sedang ditampilkan

// Fungsi untuk mengganti gambar dan memberikan animasi slide dari kanan atau kiri
function loadImageAndSlide(direction) {
    // Pilih gambar secara acak dari array
    let randomIndex = Math.floor(Math.random() * imageArray.length);
    currentImageElement.src = imageArray[randomIndex];
    
    // Tentukan animasi berdasarkan arah
    let animationName = (direction === 'right') ? 'slideInRight' : 'slideInLeft';
    
    // Hapus animasi sebelumnya
    currentImageElement.style.animation = 'none';
    
    // Force reflow untuk memulai ulang animasi
    void currentImageElement.offsetWidth;
    
    // Tambahkan animasi baru (Slide-in)
    currentImageElement.style.animation = `${animationName} 1s ease-out forwards`; // Animasi slide-in selama 1 detik

    // Setelah 1 detik, mulai animasi untuk menghilang (fade out)
    setTimeout(() => {
        currentImageElement.style.animation = `fadeOut 1s forwards`;  // Animasi fade-out dimulai setelah 1 detik
    }, 1000); // 1000ms = 1 detik
}

// Fungsi untuk memanggil gambar yang masuk dari kanan
function slideFromRight() {
    loadImageAndSlide('right');
}

// Fungsi untuk memanggil gambar yang masuk dari kiri
function slideFromLeft() {
    loadImageAndSlide('left');
}

// Fungsi yang memanggil gambar dan memberikan efek slide berdasarkan arah
function slideImage(direction) {
    loadImageAndSlide(direction); // Panggil loadImageAndSlide dengan arah yang diinginkan
}

// Fungsi untuk memulai animasi (play)
function playImage() {
    if (!currentImageElement.src) {
        slideImage('right');  // Jika belum ada gambar, muat dan tampilkan gambar
    } else {
        // Jika gambar sudah ada, lanjutkan animasi (tanpa mengubah gambar)
        currentImageElement.style.animation = 'none'; // Reset animasi
        void currentImageElement.offsetWidth; // Force reflow
        currentImageElement.style.animation = 'slideInRight 1s ease-out forwards'; // Mulai animasi slide-in selama 1 detik
        setTimeout(() => {
            currentImageElement.style.animation = 'fadeOut 1s forwards';  // Mulai fade-out setelah 1 detik
        }, 1000);  // Tunda selama 1 detik sebelum menghilang
    }
}

// Fungsi untuk menghentikan animasi (stop)
function stopImage() {
    currentImageElement.style.animation = 'none';  // Hentikan animasi
    currentImageElement.style.transform = 'translateX(0)';  // Kembalikan posisi gambar ke tengah
    currentImageElement.style.opacity = 1; // Pastikan gambar tetap terlihat
}
