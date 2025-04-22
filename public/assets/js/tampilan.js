
 window.addEventListener('DOMContentLoaded', (event) => {
      // Menunggu halaman dimuat, lalu tampilkan modal
      var myModal = new bootstrap.Modal(document.getElementById('basicModal'));
      myModal.show();  // Tampilkan modal secara otomatis
    });


 // Function to toggle fullscreen mode
  function toggleFullScreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();  // Request fullscreen
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();  // Exit fullscreen
      }
    }
  }

  // Initialize fullscreen button
  $('#fullscreenButton').click(function() {
    toggleFullScreen();
  });

  // Modal close function
  $('#closeModalButton').click(function() {
    $('#basicModal').modal('hide');  // Hide modal on close
  });
