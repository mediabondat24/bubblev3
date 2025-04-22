// Fungsi untuk mengambil data Top Givers
async function fetchTop1() {
  try {
    
    const container = document.getElementById('animation-container');
   


    // Ambil data Top 1-3 dari `topGivers` (logika lokal)
    const top1 = Object.values(topGivers)
      .sort((a, b) => b.total_diamonds - a.total_diamonds)
      .slice(0, 3);

    // Render tampilan Top Givers
    renderTopGivers(top1);
  } catch (error) {
    console.error('Error fetching top givers:', error);
  }
}

// Fungsi untuk merender Top Givers ke dalam DOM
function renderTop1(top1) {
  const container = document.getElementById('animation-container');
  container.innerHTML = ''; // Bersihkan konten sebelumnya

  // Container untuk Top 1
  const top1Container = document.createElement('div');
  topContainer.className = 'giver-item top-giver-1';

  // Tampilkan data default untuk TOP 1
  topContainer.innerHTML = `
    <img src="/images/maskot.gif" class="crown" alt="Crown"> <!-- Maskot tetap muncul pertama kali -->
    <img src="/images/bubble1.gif" class="profile" alt="Profile Picture">
  `;
  container.appendChild(topContainer);
  setRandomBorder(topContainer.querySelector('.profile-img'));


  updateTop(top1);
}

// Fungsi untuk memperbarui data Top Givers setelah berhasil di-fetch
function updateTop(top1) {
  const container = document.getElementById('animation-container');
  
  // Update data TOP 1
  const top1 = container.querySelector('.top-giver-1');
  if (top1[0]) {
    top1.innerHTML = `
      <img src="/images/maskot.gif" class="crown" alt="Crown">
      <img src="${top1[0].profilePictureUrl}" class="profile" alt="Profile Picture" onerror="this.src='/images/bubble1.gif';">

   
    `;
    setRandomBorder(top1.querySelector('.profile-img'));
  }


// Fetch data setiap 10 detik
fetchTop1();
setInterval(fetchTop1, 2000);

// Tambahkan animasi setiap 6 detik
addFlipAnimation();
setInterval(addFlipAnimation, 6000);


