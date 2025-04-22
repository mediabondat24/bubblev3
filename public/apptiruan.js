 // Mendapatkan URL saat ini
  var currentUrl = window.location.href;
  // Membuat objek URL dari URL saat ini
  var url = new URL(currentUrl);
  // Mendapatkan nilai parameter 'id' dari URL
  var id_akun = url.searchParams.get("id");
  var modeapp = url.searchParams.get("mode");
  // Menampilkan nilai parameter 'id'
  if(!id_akun){
    setInterval(() => {
      alert("Halo ini adalah layanan uji coba");
    }, 30000);

    setTimeout(() => {
      window.location.href="https://livetok.online/dashboard";
    }, 900000);
  }
  
  
  
  
  
    var gift
        var list_penjahat=[];
      if(id_akun){
        setTimeout(function(){
              get_penjahat();
         },1000);
         
         
        setInterval(() => {
          getAkun();
        }, 120000);
      
        setInterval(() => {
             var stateTextElement = document.getElementById('stateText');
            var cekcon = stateTextElement.textContent;
       
            if(cekcon=="Berhasil dikoneksikan"){
                get_penjahat();
                topdi();
               
            }
          
        }, 2000);
      
         var api = "https://play.livetok.online/api/get_account_2";
        var api_server = "https://play.livetok.online/api/get_status";
        var api_penjahat = "https://play.livetok.online/api/get_penjahat";
        var api_blokir = "https://play.livetok.online/api/api_blokir";
          
       
          getAkun();
        
      
      
        var akun;var tgl;
        function getAkun()
      {
       
              const requestOptions = {
        method: 'POST',
        
        body: JSON.stringify({ id_akun: id_akun,id_layanan:"5" }) // Gantilah dengan data yang ingin Anda kirim
      };
      
      fetch(api, requestOptions)
        .then(response => response.json())
        .then(data => {
            if(data["sts"]=="blokir"){
                    window.location.href="https://play.livetok.online/bkp.png";
            }else if(data["sts"]==true){
             akun=data["data"];
            $("#akunres").val(akun);
             tgl=data["masa_aktif"];
             var tglnow = $("#tglnow").val();
        
             if(tgl<tglnow){
                 alert("masa aktif anda telah habis");
                 window.location.href="https://livetok.online";
             }
           
          }else{
            alert(data["msg"]);
            reloadMainPageFromIframe();
            window.location.href="https://livetok.online";
          }
        });
        
      }; 
      
      
    
  

      function cek_server(){
  const requestOptions = {
  method: 'POST',
  body: JSON.stringify({ id_akun: id_akun }) // Gantilah dengan data yang ingin Anda kirim
};

fetch(api_server, requestOptions)
  .then(response => response.json())
  .then(data => {
      alert(data["sts"]);
  });
}
      
      }
      
      
      
      
      
      
$(".draggable-cepi").show();

setTimeout(() => {
  openmodal();
  // masukanpoto();

}, 500);

function masukanpoto(){
  var img = "https://img.freepik.com/premium-vector/tik-tok-logo_578229-290.jpg";
  addPhoto("small",img);
  addPhoto("small",img);
  addPhoto("small",img);
 
}
function tutupmodal(){
 
  scrollToTop();
  $("#addPhotoModal").modal("hide");
  petunjuk();
}
function petunjuk(){

  setTimeout(() => {
    $("#petunjuk").hide(3000);
  }, 6000);
  setTimeout(() => {
    // masukanpoto();
  }, 4000);
   
}

    function toggleFullScreen() {
            const doc = window.document;
            const docEl = doc.documentElement;

            const requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
            const exitFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;

            if (!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
                requestFullScreen.call(docEl);
            } else {
                exitFullScreen.call(doc);
            }
        }
     

       
var no =1;
var jawab = "xmxmxmmx";
var alias = "xmxmxmmx";
var koin=0;
var mode = "soal";

 
 
  
$(".chatcontainer").show();
$(".chatcontainer2").hide();
$(".chatcontainer3").hide();
function jawaban(komentar,poto,nama){
     
  
} 

 var ganti=true;
 
 function okey(foto,nama,g=false){
   
   
        $("#namas").html(nama);
        var element = document.getElementById("g");
        element.src= foto;  
         
        
 }

 function bahaya(){
  var element = document.getElementById("g");
        element.src= "https://img.freepik.com/premium-vector/tik-tok-logo_578229-290.jpg"; 
 }
 
 
      var start=true;
      
      function jo(){
         if(start==true){
             start=false;
         }else{
               start=true;
         }
      }

    function hapus_class(){
      $("#g").hide(300);
      $("#g").show(1000);
    }  

    function add_class(){
      $("#g").hide(300);
      $("#g").show(1000);
    }  
      
      function get_penjahat()
      {
       
              const requestOptions = {
        method: 'POST',
        body: JSON.stringify() // Gantilah dengan data yang ingin Anda kirim
      };
      
      fetch(api_penjahat, requestOptions)
        .then(response => response.json())
        .then(data => {
           if(data["sts"]){
               
            list_penjahat = data["sts"].akun;
      
          }
        });
        
      }; 
      
      
      
      
     function gift(foto,nama,sts=false,g=false,ket=null,kom=null,jml_coin=1){
      var gift = document.getElementById("gift");
        if (gift.checked) {
          var opsi_gift = true;
        } else {
          var opsi_gift = false;
        }

var follow = document.getElementById("follow");
if (follow.checked) {
  var opsi_follow = true;
} else {
  var opsi_follow = false;
}

var share = document.getElementById("share");
if (share.checked) {
  var opsi_share = true;
} else {
  var opsi_share = false;
}

var like = document.getElementById("like");
if (like.checked) {
  var opsi_like = true;
} else {
  var opsi_like = false;
}

var join = document.getElementById("join");
if (join.checked) {
  var opsi_join = true;
} else {
  var opsi_join = false;
}
var key = document.getElementById("key");
if (key.checked) {
  var opsi_key = true;
} else {
  var opsi_key = false;
}

 

        //  if(start==false){
        //       if(sts==false){
        //              return false;
        //       }
        //  }
         
         if(sts==true && ganti==true){
          console.log("jml"+jml_coin);
        var min_coin = $("[name='min_coin']").val();
        console.log("min"+min_coin);
     

          if(jml_coin>=min_coin){
                ganti=false;
                if(opsi_gift==true){
                  
                  add_class();

                  okey(foto,nama,g); 
                  setTimeout(() => {
                                    ganti=true;
                      },7000);
                      return true;
                }else{
                  ganti=true;
                }
            }
                
         }
         
          if(sts==true && ganti==false){ 
            console.log("jml"+jml_coin);
var min_coin = $("[name='min_coin']").val();
console.log("min"+min_coin);


            if(jml_coin>=min_coin){
              if(opsi_gift==true){
                add_class();

                  setTimeout(() => {
                        okey(foto,nama,g); 
                  
                    },5000);
                    
                    setTimeout(() => {
                                  ganti=true;
                    },10000);
                  }else{
                    ganti=true;
                  }
              }
               
          }
          
    if(ket=="like" && opsi_like==true)      
    {      
            if(sts==false && ganti==true){ 
              hapus_class();
                            okey(foto,nama); 
                                    ganti=true; 
            }
    }

   else if(ket=="share" && opsi_share==true)      
    {      
            if(sts==false && ganti==true){ 
              hapus_class();
                            okey(foto,nama); 
                                    ganti=true; 
            }
    }

   else if(ket=="follow" && opsi_follow==true)      
    {      
            if(sts==false && ganti==true){ 
              hapus_class();
                            okey(foto,nama); 
                                    ganti=true; 
            }
    }
    else if(ket=="join" && opsi_join==true)      
    {      
            if(sts==false && ganti==true){ 
              hapus_class();
                            okey(foto,nama); 
                                    ganti=true; 
            }
    }
    else if(ket=="chat" && opsi_key==true)      
    {      
      var komentar_system = kom;
           var komen_status = false;
             var keyword = $("[name='komentar']").val();
              const isKeywordExists = komentar_system.toLowerCase().includes(keyword.toLowerCase());
              if(isKeywordExists!=false){ 
                var komen_status = true;
              }else if(keyword==""){
                var komen_status = true;
              }
            if(sts==false && ganti==true && komen_status==true){ 
              hapus_class();
                            okey(foto,nama); 
                                    ganti=true; 
            }
    }

    




               
     }
     
     
     
     
     
     
     
     
     
     
     
     
     
     
     
     
     
         let photoCount = 0;
    let speed = 5000; // Kecepatan default, diatur dalam milidetik

    function addPhoto(size,img,coint=1,uniqueId=null,userId=null) {



      const photo = document.createElement('img');
      photo.src = img; // Ganti dengan nama foto Anda
      photo.classList.add('photo');
      
      
      
 
        if (list_penjahat.includes(uniqueId)) {
           photo.classList.add("blurred");
        }  
        
        if (list_penjahat.includes(userId)) {
               photo.classList.add("blurred");
        }  
        
         
     
      
   
      // photo.id = `photo-${photoCount}`;
      photo.id = `photo-${photoCount}`;
         photo.setAttribute('uniqueId', uniqueId);
      photo.setAttribute('userId', userId);
      
      // document.getElementById('animation-container').appendChild(photo);
    //   const span = document.createElement('span');
// span.appendChild(photo);
photo.setAttribute('onclick', 'toggleBlur(this,`'+uniqueId+'`,`'+userId+'`,`'+img+'`)');
// span.setAttribute('onclick', 'match(`'+img+'`)');
// const text = document.createTextNode('Deskripsi Foto'); // Ganti dengan deskripsi foto Anda
// span.appendChild(text);

const container = document.getElementById('animation-container');
container.appendChild(photo);
photo.classList.add(uniqueId);
 photo.style.borderColor = getRandomColorT();
      let durationInput;
      if (size === 'small') {
          
        photo.style.width = '50px';
        photo.style.height = '50px';
        durationInput = document.getElementById('smallDuration');
               var colors = ['red', 'green', 'blue', 'yellow', 'orange', 'purple', 'cyan', 'magenta','orange','#2F4F4F','#1E90FF','#CD5C5C','#20B2AA','#C71585','#DDA0DD','#9ACD32']; 
        var randomColor = colors[Math.floor(Math.random() * colors.length)]; 
         photo.style.border = '1px solid ' + randomColor;
          photo.style.boxShadow = `0 0 14px ${randomColor}`;
        
      } else if (size === 'medium') {
        photo.style.width = '120px';
        photo.style.height = '120px';
         var colors = ['red', 'green', 'blue', 'yellow', 'orange', 'purple', 'cyan', 'magenta','orange','#2F4F4F','#1E90FF','#CD5C5C','#20B2AA','#C71585','#DDA0DD','#9ACD32']; 
        var randomColor = colors[Math.floor(Math.random() * colors.length)]; 
        
        
        durationInput = document.getElementById('mediumDuration');
         photo.style.border = '1px solid ' + randomColor;
         photo.style.boxShadow = `0 0 20px ${randomColor}`;
        photo.style.zIndex = coint;
             
      } else if (size === 'large') {
        photo.style.width = '250px';
        photo.style.height = '250px';
        durationInput = document.getElementById('largeDuration');
        photo.style.zIndex = coint+1;
         var colors = ['red', 'green', 'blue', 'yellow', 'orange', 'purple', 'cyan', 'magenta','orange','#2F4F4F','#1E90FF','#CD5C5C','#20B2AA','#C71585','#DDA0DD','#9ACD32']; 
        var randomColor = colors[Math.floor(Math.random() * colors.length)]; 
         photo.style.border = '1px solid ' + randomColor;
      photo.style.boxShadow = `0 0 30px ${randomColor}`;
        
        //   photo.classList.add('blinking-border');
        //   if(flip==true){
        //      photo.classList.add('flip-effect');
        //     }
      
      }else if (size === 'superbig') {
          
          
        photo.style.width = '70px';
        photo.style.height = '70px';
        photo.style.borderRadius = '240px';
        durationInput = document.getElementById('largeDuration');
        photo.style.zIndex = coint+1;
        var colors = ['red', 'green', 'blue', 'yellow', 'orange', 'purple', 'cyan', 'magenta','orange','#2F4F4F','#1E90FF','#CD5C5C','#20B2AA','#C71585','#DDA0DD','#9ACD32']; 
        var randomColor = colors[Math.floor(Math.random() * colors.length)]; 
      
              photo.style.border = '1px solid ' + randomColor;
         photo.style.boxShadow = `0 0 20px ${randomColor}`;
        
        
      }else if (size === 'supermedium') {
        photo.style.width = '120px';
        photo.style.height = '120px';
        photo.style.borderRadius = '240px';
        durationInput = document.getElementById('smallDuration');
        photo.style.zIndex = coint;
       var colors = ['red', 'green', 'blue', 'yellow', 'orange', 'purple', 'cyan', 'magenta','orange','#2F4F4F','#1E90FF','#CD5C5C','#20B2AA','#C71585','#DDA0DD','#9ACD32']; 
        var randomColor = colors[Math.floor(Math.random() * colors.length)]; 
              photo.style.border = '1px solid ' + randomColor;
         photo.style.boxShadow = `0 0 20px ${randomColor}`;
        
      }else if (size === 'supersmall') {
        photo.style.width = '70px';
        photo.style.height = '70px';
        photo.style.borderRadius = '240px';
        durationInput = document.getElementById('smallDuration');
        photo.style.zIndex = coint;
        var colors = ['red', 'green', 'blue', 'yellow', 'orange', 'purple', 'cyan', 'magenta','orange','#2F4F4F','#1E90FF','#CD5C5C','#20B2AA','#C71585','#DDA0DD','#9ACD32']; 
        var randomColor = colors[Math.floor(Math.random() * colors.length)]; 
        photo.style.border = '1px solid ' + randomColor;
         photo.style.boxShadow = `0 0 20px ${randomColor}`;
      }

      const fadeoutDuration = durationInput ? parseInt(durationInput.value) * 1000 : 120000; // default 2 menit

      movePhoto(photo.id, fadeoutDuration);
      
      
        container.addEventListener('animationend', () => {
                document.body.removeChild(container);
        });
      
      photoCount++;
    }

    function movePhoto(photoId, fadeoutDuration) {
      const photo = document.getElementById(photoId);
      if(photo){
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;
      
      const randomX = Math.floor(Math.random() * (screenWidth - parseInt(photo.style.width, 10))); 
      const randomY = Math.floor(Math.random() * (screenHeight - parseInt(photo.style.height, 10))); 
      
      photo.style.transform = `translate(${randomX}px, ${randomY}px)`;
      
      setTimeout(() => {
        fadeOutPhoto(photo.id);
      }, fadeoutDuration);

      setTimeout(() => {
        movePhoto(photoId, fadeoutDuration);
      }, speed); // Menggerakkan foto sesuai kecepatan yang diatur
      }
      
        
           
    }

    function resizePhoto(size) {
      const photos = document.querySelectorAll('.photo');
      photos.forEach(photo => {
        const currentWidth = parseInt(photo.style.width, 10) || 100;
        const currentHeight = parseInt(photo.style.height, 10) || 100;

        if (size === 'small') {
          photo.style.width = `${Math.max(currentWidth - 20, 50)}px`;
          photo.style.height = `${Math.max(currentHeight - 20, 50)}px`;
        } else if (size === 'medium') {
          photo.style.width = '150px';
          photo.style.height = '150px';
        } else if (size === 'large') {
          photo.style.width = `${Math.min(currentWidth + 20, 300)}px`;
          photo.style.height = `${Math.min(currentHeight + 20, 300)}px`;
        }
      });
    }

    function changeSpeed(newSpeed) {
      if (newSpeed === 'slow') {
        speed = 10000; // Kecepatan lambat, diatur dalam milidetik
      } else if (newSpeed === 'fast') {
        speed = 3000; // Kecepatan cepat, diatur dalam milidetik
      }
    }

    function fadeOutPhoto(photoId) {
      const photo = document.getElementById(photoId);
       if (photo) {
      photo.style.opacity = '0';
      setTimeout(() => {
        photo.remove();
      }, 2000); // Fading selama 2 detik, sesuaikan dengan kebutuhan Anda
       }
    }

    // Otomatis tambahkan satu foto kecil saat halaman dimuat
    // addPhoto('small');


    function openmodal(){
    $("#addPhotoModal").modal("show");
 }
    function tutup(){
    $("#addPhotoModal").modal("hide");
 }
 
 
 
  document.getElementById('tmbclear0').disabled = true;
        document.getElementById('tmbclear1').disabled = true;
        document.getElementById('tmbclear2').disabled = true;
        document.getElementById('tmbclear3').disabled = true;
        const audioElements = [new Audio(), new Audio(), new Audio(), new Audio()];

        function loadAudio(input, index) {
 
            const file = input.files[0];
            if (file) {
                const fileURL = URL.createObjectURL(file);
                audioElements[index].src = fileURL;
                document.getElementById(`playButton${index}`).disabled = false;
                document.getElementById(`stopButton${index}`).disabled = true;
                document.getElementById('stopAllButton').disabled = false;
                document.getElementById(`tmbclear${index}`).disabled = false;
            
            }
        }

        function eplayAudio(index) {
            var file = $("[name='audioFile0']").val();
           if(!file || file==""){
               return false;
           }
            audioElements[index].play();
            document.getElementById(`playButton${index}`).disabled = true;
            document.getElementById(`stopButton${index}`).disabled = false;
        }

        function estopAudio(index) {
            audioElements[index].pause();
            audioElements[index].currentTime = 0;
            document.getElementById(`playButton${index}`).disabled = false;
            document.getElementById(`stopButton${index}`).disabled = true;
        }

        function eclearAudio(index) {
           
            estopAudio(index);
            audioElements[index].src = "";
            const input = document.querySelectorAll('.audioFile')[index];
            input.value = "";
            // document.getElementById(`playButton${index}`).disabled = true;
            // document.getElementById(`stopButton${index}`).disabled = true;
               document.getElementById(`tmbclear${index}`).disabled = true;
        }

        function stopAllAudio() {
            audioElements.forEach((audio, index) => {
                stopAudio(index);
            });
        }
        
        
        
        
        
              const audioPlayer = document.getElementById('audioPlayer');
        const fileInput = document.getElementById('musik');
        
        fileInput.addEventListener('change', function(event) {
            const file = event.target.files[0];
            const fileURL = URL.createObjectURL(file);
            audioPlayer.src = fileURL;
            audioPlayer.style.display = 'block';
            audioPlayer.play();
        });
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
         function getRandomColor() {
    const letters = '0123456789ABCDEF';
            let colors = [];
            for (let i = 0; i < 1; i++) {
                let color = '#';
                for (let j = 0; j < 6; j++) {
                    color += letters[Math.floor(Math.random() * 16)];
                }
                colors.push(color);
            }
            return colors.join(', ');
        }
  function getRandomDirection() {
            const directions = ['to right', 'to left'];
            return directions[Math.floor(Math.random() * directions.length)];
        }
  function gra(){
            const startColor = getRandomColor();
            const endColor = getRandomColor();
            const direction = getRandomDirection();

            const gradientBox = document.getElementById('gradient-box');
            gradientBox.style.background = `linear-gradient(${direction}, ${startColor}, ${endColor})`;

            document.body.style.background = `linear-gradient(${direction}, ${startColor}, ${endColor})`;
    
  }
     // Fungsi untuk mengatur tata letak latar belakang
    //  document.querySelector('input[name="backgroundLayout"]').addEventListener('change', function() {
    //   const selectedLayout = document.querySelector('input[name="backgroundLayout"]:checked').value;
    //   document.body.style.backgroundSize = selectedLayout;
    //   document.body.style.backgroundRepeat = selectedLayout === 'cover' ? 'no-repeat' : 'repeat';
    // });
    
    function changeBackground(event) {
      const fileInput = event.target;
      const file = fileInput.files[0];
      
      if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
          document.body.style.backgroundImage = `url('${e.target.result}')`;
          document.body.style.backgroundSize="cover";
        };
        reader.readAsDataURL(file);
      }
    }



  

  setTimeout(() => {
    $("#tgl").html(tgl);

// Obtener la fecha actual
var fechaActual = new Date();
var fechaHoy = fechaActual.toISOString().slice(0, 10);
if (fechaHoy > tgl) {
  alert("Masa aktif aplikasi habis, silahkan hubungi admin   <a href='https://wa.me/+6285281531230'>085281531230</a> ");
  $("body").html("<h1 class='text-danger'>Masa aktif aplikasi habis, silahkan hubungi admin   <a href='https://wa.me/+6285281531230'>085281531230</a></h1>");
}  
}, 1000);

var sumber=false;


 
function hapusAngkaDanSimbol(string) {
  // Ekspresi reguler untuk mencocokkan huruf dan spasi
  let regex = /[a-zA-Z\s]/g;
  
  // Menggunakan metode replace() untuk mengganti semua karakter yang tidak cocok dengan string kosong
  let stringHanyaHurufDanSpasi = string.replace(/[^a-zA-Z\s]/g, '');

  return stringHanyaHurufDanSpasi;
}


function aktifSuaraKomen(suara){
    
    
    
      var vkomen = document.getElementById("vkomen");
      if (vkomen.checked) {
    
     
      
      
    var suara_filter = hapusAngkaDanSimbol(suara);
    let jumlahKarakter = suara_filter.length;
   if(jumlahKarakter<5){
       return false;
   }
         
       var  voice = "Indonesian Female";
          

          responsiveVoice.speak(suara_filter, voice, {
            rate: 0.9,
            pitch: 1,
            volume: 3,
            enableEstimationTimeout:false
          });
          
          
    }  
    
}


function aktifSuara(suaras,jenis){

      var suara_ =  suaras.toLowerCase();
      let suar = suara_.replace(/cara/g, "metode");
      let suara = suar.replace(/kontol/g, "");
      
      var vgift = document.getElementById("vgift");
      if (vgift.checked && jenis=="gift") {
        if(responsiveVoice.isPlaying() && sumber!=true) {
          responsiveVoice.cancel();
        }
        sumber = true;
      
          if(!responsiveVoice.isPlaying()) {
            sumber = true;
            bunyi(suara,jenis);  
            }else{
              sumber=true;
              setTimeout(() => {
                sumber=true;
                bunyi(suara,jenis);
              }, 2500);
            }   
            
            setTimeout(() => {
          sumber=false;
        }, 15000);

      }  
  
  
      var vkomen = document.getElementById("vkomen");
      if (vkomen.checked && jenis=="komen") {
        if(sumber!=true){
          if(!responsiveVoice.isPlaying()) {
            bunyi(suara,jenis);  
            }
          }  
      }  
   
      var vjoin = document.getElementById("vjoin");
      if (vjoin.checked && jenis=="join") {
        if(sumber!=true){
          if(!responsiveVoice.isPlaying()) {
            bunyi(suara,jenis);  
            }
          }  

      }  
    
      var vshare = document.getElementById("vshare");
      if (vshare.checked && jenis=="share") {
          if(sumber!=true){
          if(!responsiveVoice.isPlaying()) {
            bunyi(suara,jenis);  
            }
          }  
           
      }
  
      var vfollow = document.getElementById("vfollow");
      if (vfollow.checked && jenis=="follow") {
        if(sumber!=true){
          if(!responsiveVoice.isPlaying()) {
            bunyi(suara,jenis);  
            }
          }  
             
      }  
  
   
  
      }


  var vo=1; var asbun="";
  function bunyi(suara,jenis){
    if(asbun==suara){
      return false;
    } 
    asbun=suara;
    if(jenis!="gift" && sumber==true){
      responsiveVoice.cancel();
    }
    if(responsiveVoice.isPlaying()){
      // responsiveVoice.cancel(); 
      return false;
    }else{

      if(vo==1){
               vo=2;
                 voice = "Indonesian Female";
           }else{
               vo=1;
                  voice = "Indonesian Male";
           }

          responsiveVoice.speak(suara, voice, {
            rate: 0.9,
            pitch: 1,
            volume: 3,
            enableEstimationTimeout:false
          });

    }
          
  }
  
  
  
  
  
  
  

 setTimeout(() => {

var opciones = akun.slice(); 
var dropdown = document.getElementById("uniqueIdInput"); 
 for (var i = 0; i < opciones.length; i++) {
     var opcion = document.createElement("option");
     opcion.value = opciones[i];  // Valor de la opciÃ³n (puedes usar i u otro valor)
     opcion.text = opciones[i];  // Texto visible de la opciÃ³n
     dropdown.appendChild(opcion);
 }
 console.log(opciones);
}, 1000);


 

  setTimeout(() => {
    $("#tgl").html(tgl);

// Obtener la fecha actual
var fechaActual = new Date();
var fechaHoy = fechaActual.toISOString().slice(0, 10);
if (fechaHoy > tgl) {
  alert("Masa aktif aplikasi habis, silahkan hubungi admin   <a href='https://wa.me/+6285281531230'>085281531230</a> ");
  $("body").html("<h1 class='text-danger'>Masa aktif aplikasi habis, silahkan hubungi admin   <a href='https://wa.me/+6285281531230'>085281531230</a></h1>");
}  
}, 1000);



function reloadMainPageFromIframe() {
  // Mengirim pesan ke halaman utama untuk memuat ulang
  parent.postMessage({
    type: 'reloadMainPage'
  }, '*');
}


if(!id_akun){
  
  // Ambil elemen select
  var selectElement = document.getElementById('uniqueIdInput');

  // Buat elemen input baru
  var inputElement = document.createElement('input');
  inputElement.type = 'text'; // Tentukan tipe input

  // Salin atribut-atribut dari select ke input
  // inputElement.name = selectElement.name;
  inputElement.id = selectElement.id;
  // inputElement.value = selectElement.value;

  // Gantikan elemen select dengan elemen input
  selectElement.parentNode.replaceChild(inputElement, selectElement);
  
setTimeout(() => {
  $("#uniqueIdInput").focus();
}, 1000);

  }
  
  
  
  
  
  
    // Fungsi untuk melakukan scroll
  function scrollDown() {
    // Menentukan elemen yang akan dijadikan batas scroll
    var stopElement = document.getElementById('stopScroll');

    // Menentukan langkah scroll per interval (misalnya, 5 piksel)
    var scrollStep = 5;

    // Melakukan scroll setiap 10 milidetik
  
      // Menambahkan langkah scroll ke posisi scroll saat ini
      window.scrollBy(0, scrollStep);

       
 
  }

   
  setTimeout(() => {
    scrollDown();
  }, 500);
  
  
  
  
   // Fungsi untuk melakukan scroll ke atas
  function scrollToTop() {
     window.scrollTo({
    top: 0,  // Posisi vertikal scroll (0 untuk atas)
    behavior: 'smooth'  // Opsi untuk membuat scroll bergerak dengan smooth
    });
  }
  
   




  setTimeout(() => {
    if(!modeapp){
    $("#togel").show();
    $("#exit").hide();
  }else{
    $("#togle").show();
    $("#togel").hide();
  }
  }, 500);





  // Fungsi untuk membuat warna acak
    function getRandomColorT() {
        var colors = ['red', 'green', 'blue', 'black',   'purple',"#008080","#4682B4","#2F4F4F","#008000","#CD5C5C","#CD853F"]; 
        var randomColor = colors[Math.floor(Math.random() * colors.length)]; 
        return randomColor;
    //   return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    }
    
     function getRandomColorBg() {
        
      return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    }


    function topdi(){
      var topdi = document.getElementById("topdi");
      if (!topdi.checked) {
             $(".draggable-cepi").hide();
             $("#jmltopdix").hide();
      }else{
           $(".draggable-cepi").show();
           $("#jmltopdix").show();
      }
      
      
      var jmltopdi = document.getElementById("jmltopdi");
      if (!jmltopdi.checked) {
            $("#poin1").hide();
            $("#poin2").hide();
            $("#poin3").hide();
             
      }else{
           $("#poin1").show();
            $("#poin2").show();
            $("#poin3").show();
      }
      
      
      
      
    }

    // Fungsi utama
    function name_teks(imageLink, name, caption, duration, zIndex, styleType) {
        
         var sticky = document.getElementById("sticky");
      if (!sticky.checked) {
        return false;
      }
        
        
        var caption = "Semoga "+caption;
        var zIndex = zIndex;
        var duration=35000;
     var styleType = "style2";
      const profileContainer = document.createElement('div');
      profileContainer.className = `profile-container ${styleType}`;
      profileContainer.style.zIndex = zIndex;

      // Jika Style 2, tambahkan background warna random transparan
      if (styleType === "style2") {
        profileContainer.style.backgroundColor = `${getRandomColorBg()}`; // Transparansi 70%
      }

      // Tambahkan konten elemen dengan warna acak
      profileContainer.innerHTML = `
        <div class="d-flex align-items-center">
          <img src="${imageLink}" alt="Foto Profil" class="profile-img" style="border-color: ${getRandomColorT()};">
          <div class="profile-text">
            <span class="profile-name text-outline2" style="color: ${getRandomColorT()};">${name}</span><br>
            <span class="profile-caption text-outline2" style="color: ${getRandomColorT()}">${caption}</span>
          </div>
        </div>
      `;

      document.body.appendChild(profileContainer);

      // Animasi elemen melayang secara acak
      function moveRandomly() {
          
          
       
    
    //   const screenWidth = window.innerWidth;
    //   const screenHeight = window.innerHeight;
      
    //   const randomX = Math.floor(Math.random() * (screenWidth - parseInt(profileContainer.style.width, 10))); 
    //   const randomY = Math.floor(Math.random() * (screenHeight - parseInt(profileContainer.style.height, 10))); 
      
      
          
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        const randomX = Math.random() * (viewportWidth - profileContainer.offsetWidth);
        const randomY = Math.random() * (viewportHeight - profileContainer.offsetHeight);

        profileContainer.style.transform = `translate(${randomX}px, ${randomY}px)`;
      }

      moveRandomly();
      const intervalId = setInterval(moveRandomly, 3000);

      // Hapus elemen setelah durasi waktu tayang
      setTimeout(() => {
        clearInterval(intervalId);
        profileContainer.remove();
      }, duration);
    }
    
    
      function toggleBlur(image,uniqueid,userid,img) { 
                  var images = document.querySelectorAll('img[uniqueid="'+uniqueid+'"]');
                
                // Menambahkan kelas ke setiap elemen <img> yang ditemukan
                images.forEach(function(image) {
                    image.classList.add('blurred');  // Ganti 'newClass' dengan nama kelas yang diinginkan
                });

          
            
            return blokir(uniqueid,userid,img);
        }
        
        
        
          function blokir(uniqueid,userid,img){
                      const requestOptions = {
                      method: 'POST',
                      body: JSON.stringify({ uniqueid: uniqueid,userid:userid,id_akun:akun,img:img,sts:0 }) // Gantilah dengan data yang ingin Anda kirim
                    };
                    
                    fetch(api_blokir, requestOptions)
                      .then(response => response.json())
                      .then(data => {
                           
                      });
            }
            
            
            
            
             // Fungsi untuk menghasilkan warna acak
        function getRandomColorNew() {
            const letters = '0123456789ABCDEF';
            let color = '#';
            for (let i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        }

        // Fungsi untuk mengubah warna border pada elemen dengan kelas blinking-border
        // function updateBlinkingBorders() {
        //     const elements = document.querySelectorAll('.blinking-border');
        //     elements.forEach(element => {
        //         element.style.borderColor = getRandomColorNew();
        //     });
        // }

        // Memperbarui warna border setiap 200 milidetik
        // setInterval(updateBlinkingBorders, 200);
        
        
        
        var sebelumnya = 0;
    function bgklip(link,diamon) {
   
          var kk = document.getElementById("klapklipid");
      if (!kk.checked) {
        return false;
      }
      
        if(diamon>=sebelumnya){
        sebelumnya=diamon;
                    const existingImage = document.getElementById('imageContainer');
                    if (existingImage) {
                        existingImage.remove();
                    }

        }else{
              const existingImage = document.getElementById('imageContainer');
                    if (existingImage) {
                        return false;
                    }
             sebelumnya=diamon;
        }

        if(diamon<=20){
            var detik = 500;
        }else if(diamon<=30){
            var detik = 8000;
        }else if(diamon<=50){
            var detik = 15000;
        }else if(diamon<=100){
            var detik = 20000;
        }else if(diamon<=200){
            var detik = 25000;
        }else{
            var detik = 35000;
        }

     
        const imageContainer = document.createElement('div');
        imageContainer.id = 'imageContainer';
        imageContainer.className = 'image-container-bg';

        const img = document.createElement('img');
        img.classList.add('img-bg');
        img.src = link;
        img.alt = 'Contoh Gambar';

        imageContainer.appendChild(img);
        document.body.appendChild(imageContainer);

        imageContainer.classList.add('fullscreenBG');

        setTimeout(() => {
            if (imageContainer.parentNode) {
                imageContainer.remove();
            }
        }, detik); // Menghapus gambar setelah 15 detik
    }
    
    
    
    
    
      const draggableArea = document.getElementById('draggable-area');
        const sizeSlider = document.getElementById('size-slider');
        const gapSlider = document.getElementById('gap-slider');
        const quantityInput = document.getElementById('quantity-input');
        const imageContainer = document.getElementById('image-container');

        function updateImages() {
            const quantity = parseInt(quantityInput.value); // Mendapatkan jumlah gambar dari input teks
            imageContainer.innerHTML = ''; // Menghapus gambar yang ada sebelumnya

            // Menambahkan gambar sesuai jumlah yang diminta
            for (let i = 0; i < 3; i++) {
                const imageItem = document.createElement('div');
                imageItem.classList.add('image-item');
                imageItem.classList.add('image-item-list'+i);
                if(i==0){
                  var   juara=2;
                  var mahkota = `<img class="crown1" src="https://play.livetok.online/assets/mahkota2.png" alt="Mahkota ${i+1}">`;
                }else if(i==1){
                  var   juara=1;
                  var mahkota = `<img class="crown2" src="https://play.livetok.online/assets/mahkota1.webp" alt="Mahkota ${i+1}">`;
                }else{
                    var juara=i+1;
                    var mahkota = `<img class="crown3" src="https://play.livetok.online/assets/mahkota2.png" alt="Mahkota ${i+1}">`;
                }
                
                 var colors = ['red', 'green', 'blue', 'yellow', 'orange', 'purple', 'cyan', 'magenta','orange','#2F4F4F','#1E90FF','#CD5C5C','#20B2AA','#C71585','#DDA0DD','#9ACD32']; 
                  var randomColor = colors[Math.floor(Math.random() * colors.length)]; 
        
                imageItem.innerHTML = ` 
              
                      ${mahkota}
                    <img  class="flip-image imgtop " style='border:${randomColor} solid 2px' src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/A_black_image.jpg/640px-A_black_image.jpg" id="juara${juara}">
                    <div style="line-height:6px;margin-top:5px">
                    <div class="text outline2 jmltopdi boxsadow" style="color:white;margin-top:auto"   id="poin${juara}"> bubblephoto </div>
                     <div class="text outline2 boxsadow limit-text" style=" z-index:1" id="nama${juara}"  > Top ${juara} </div>
                    <br/>  </div>
                `;
                imageContainer.appendChild(imageItem);
            }
        }

        // Menambahkan listener untuk mengubah ukuran area
        sizeSlider.addEventListener('input', (e) => {
            const scaleValue = e.target.value;
            draggableArea.style.transform = `scale(${scaleValue})`;
        });

        // Menambahkan listener untuk mengubah jarak antar gambar
        gapSlider.addEventListener('input', (e) => {
            const gapValue = e.target.value + 'px'; // Mengubah nilai slider menjadi satuan px
            imageContainer.style.gap = gapValue;  // Menyesuaikan jarak antar gambar
        });

        // Menambahkan listener untuk input jumlah gambar
        quantityInput.addEventListener('input', updateImages);

        // Inisialisasi awal gambar
        updateImages();

        // Menambahkan fitur drag untuk draggable area
        draggableArea.addEventListener('mousedown', (e) => {
            let offsetX = e.clientX - draggableArea.offsetLeft;
            let offsetY = e.clientY - draggableArea.offsetTop;

            const onMouseMove = (moveEvent) => {
                draggableArea.style.left = `${moveEvent.clientX - offsetX}px`;
                draggableArea.style.top = `${moveEvent.clientY - offsetY}px`;
            };

            const onMouseUp = () => {
                document.removeEventListener('mousemove', onMouseMove);
                document.removeEventListener('mouseup', onMouseUp);
            };

            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
        });
        
        
        
        
        // Fitur dragable dengan mouse dan touch events
const draggableAreax = document.getElementById('draggable-area');
let isDragging = false;
let startX, startY, offsetX = 0, offsetY = 10;

function dragStart(e) {
    isDragging = true;
    startX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
    startY = e.type === 'touchstart' ? e.touches[0].clientY : e.clientY;
    draggableAreax.style.cursor = 'grabbing';
}

function dragMove(e) {
    if (!isDragging) return;
    const currentX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
    const currentY = e.type === 'touchmove' ? e.touches[0].clientY : e.clientY;

    const deltaX = currentX - startX;
    const deltaY = currentY - startY;

    offsetX += deltaX;
    offsetY += deltaY;

    draggableAreax.style.transform = `translate(${offsetX}px, ${offsetY}px)`;

    startX = currentX;
    startY = currentY;
}

function dragEnd() {
    isDragging = false;
    draggableAreax.style.cursor = 'grab';
}

 
// draggableAreax.addEventListener('mousedown', dragStart);
// draggableAreax.addEventListener('mousemove', dragMove);
// draggableAreax.addEventListener('mouseup', dragEnd);
draggableAreax.addEventListener('touchstart', dragStart);
draggableAreax.addEventListener('touchmove', dragMove);
draggableAreax.addEventListener('touchend', dragEnd);

        
        
        
        
          let donators = {}; // Menyimpan donatur dengan nama sebagai key

        function addDonator(name,photo,donation) {
             
            if (name && photo && !isNaN(donation) && donation > 0) {
                // Cek apakah donatur sudah ada di dalam objek donators
                if (donators[name]) {
                    // Jika sudah ada, tambah jumlah donasi yang baru
                    donators[name].donation += donation;
                } else {
                    // Jika belum ada, buat entri baru untuk donatur
                    donators[name] = { name, photo, donation };
                }

                // Urutkan donatur berdasarkan jumlah donasi terbesar
                const sortedDonators = Object.values(donators).sort((a, b) => b.donation - a.donation);

                // Perbarui ranking donatur yang teratas
                updateRanking(sortedDonators);
                
            } else {
                alert('Harap isi semua data dengan benar!');
            }
        }

        function updateRanking(sortedDonators) {
            // Update ranking donatur teratas
            for (let i = 0; i < 3; i++) {
                // const rankItem = document.getElementById(`rank${i + 1}`);
                const name = document.getElementById(`nama${i + 1}`);
                const photo = document.getElementById(`juara${i + 1}`);
                const donation = document.getElementById(`poin${i + 1}`);

                if (sortedDonators[i]) {
                    // Menampilkan data jika donatur ada
                    // rankItem.style.display = 'block';
                    name.textContent = sortedDonators[i].name;
                    if (photo) {
                        photo.src = sortedDonators[i].photo; // Pastikan elemen 'photo' ada
                    }
                    donation.textContent = `${sortedDonators[i].donation.toLocaleString()} `;
                } else {
                    // Sembunyikan jika tidak ada donatur untuk ranking ini
                    // rankItem.style.display = 'none';
                }
            }
        }

         
  var array_doa = [
    "tahun ini bisa umroh", "rezekinya lancar", "dijauhkan dari marabahaya","suatu saat nanti punya usaha koskosan",
    "tahun ini kebeli mobil", "semakin kuat dalam menghadapi kehidupan", "mendapat rezeki yang melimpah","selalu bahagia bersama pasangan kamu",
    "tahun ini lebih hoki lagi","selalu dilimpahkan kebahagiaan","bisa umrohkan orang tua","ditahun ini semua impianmu terwujud",
    "taun depan punya rumah baru", "besok ada yang ngajak jalan","segera mendapatkan apa yang kamu impikan",
    "hari ini ada yang traktir","tahun 2025 lebih baik lebih bahagia",
    "diberikan kesehatan dan kekuatan", "dilancarkan usahanya", "diberikan keberuntungan dan keberkahan",
    "selalu bahagia bersama dirinya", "bulan depan punya motor baru","naik gaji",
    "minggu depan punya iPhone", "besok ada yang ngasih hadiah","menjadi orang yang sukses","kebeli sawah berhektarhektar",
    "segera dapat kerjaan lebih baik", "bisa jalan-jalan keluar negeri","bulan depan ada yang ngajak traveling",
    "minggu depan kebeli helikopter", "segera punya hape baru","apayang dicitacitakan bisa segera tercapai","besok ada yang ngajak hiling",
    "segera punya sepatu baru", "besok diangkat jadi sodara RafiAhmad","diberikan rizki yang melimpah",
    "selalu dipertemukan dengan orang baik", "selalu dicintai pasangan","besok ada yang ngajak liburan","diberikan kemudahan segala urusannya",
    "makin lancar rezekinya","lelahmu menjadi lillah","besok ada yang ngajak ngabuburit","ada yang ngasih THR",
    "suatu saat jadi sultan", "suatu saat nanti jadi pengusaha sukses","kehidupanmu menjadi lebih sukses lagi",
     "suatu saat nanti bisa merasakan apa yang RafiAhmad rasakan","panjang umur dan sehat selalu","kebeli tanah berhektarhektar",
    "suatu saat nanti punya usaha cucian mobil", "suatu saat nanti punya rumah mewah","hutangmu ada yang lunasi","besok yang ngajak shoping",
    "suatu saat nanti punya mobil alpard","dilancarkan usaha dan aktivitasnya","punya kontrakan 10 pintu","diberikan keturunan yg soleh dan solehah"
  ];

  var array_sambutan = [
    "yang tercinta", "yang suka ngambek","yang lagi pengen jajan","yang kuat  kokoh dan terpercaya","yang kalau mandi sekali sehari","yang terindah dan tersayang", "yang sangat lucu", "yang sangat imut", "yang super cakep","yang mencoba melupakan dia","yang selalu merindukan dia",
    "yang mempesona", "yang sedikit agak galak","yang suka sama host","yang jutek banget","yang lagi males malesan" ,"yang mungil dan lucu","yang kalau lagi seneng suka lupain dia", "yang baik hati dan tidak sombong", "yang pintar merayu","yang saat ini sedang buka tiktok","kamu kemana aja?","yang citacitanya jadi orang kaya",
    "yang terhebat", "yang menawan nan rupawan", "yang sungguh aduhai","yang sedang menunggu jodoh","situkang bucin","yang masih suka ngompol","yang super seksi", "yang sangat cerdas","yang hanya ingin disayangi","yang selalu nurut apa kata orang tua","situkang gosting","yang hobinya tidur mulu","yang suka kabur kalau ditagih hutang",
    "yang baik hati","yang kalau makan bakso 2 mangkok","yang kalau tidur masih dikelonin", "yang cabi", "yang gemoy", "yang manis", "yang tersayang","yang punya hati yang tulus","yang merindukan dia dan dirinya","yang suka ngegosip","yang pinter ngegombal","jagon mamah","yang paling baik","yang rajin belajar",
    "yang super hebat","yang sedang memikirkan seseorang", "yang rajin menabung", "yang kalau makan ga cukup 2 piring","yang sopan dan santun","yang ingin punya pacar","yang masih cinta sama mantan","yang ingin diperhatikan","yang jarang mandi","yang masih sendiri","yang alergi kalau ga punya uang",
    "kesayangan mamah","yang lagi laper", "idaman mertua","kesayangan papah","yang sedang memikirkan masa depan", "kesayangan pacar","yang selalu galau","sipenakluk cinta","yang selalu merindu","yang masih kepoin mantan","yang punya kapal pesiar","bolehkan pinjem seratus","yang hobinya jajan seblak",
    "kesayangan mantan","yang sedang galau", "kesayangan keluarga","siraja gombal","yang kalau jajan suka lupa bayar", "yang tangguh dan kuat","yang selalu tersakiti","yang pinter ngomong","yang selalu gabut","yang selalu memaafkan","situkang makan","yang masih suka sama mantan",
    "yang rajin dan pandai","kesayangan nene","yang manja","yang baik hati","yang dermawan","yang dirindukan","yang dicintai umat manusia","yang cakep ga ada obat","pinjem seratus dulu bisa kali","yang belum mandi dari tadi pagi","yang rajin ibadah","kembanggan orang tua",
    "yang mageran","yang marahmarah terus","kamu apa kabar?","yang suka jajan sembarangan","yang selalu bahagia"," yang cantiknya kebangetan","yang suka jajan sembarangan","yang sedang memikirkan aku","yang rajin bekerja"
];


//let backendUrl   =   "https://bubblefoto.online";//"https://tiktok-chat-reader.zerody.one/";//"https://tiktok-ws-cepi.zerody.one/";
let backendUrl = "https://tiktok-chat-reader.zerody.one/";  
let connection = new TikTokIOConnection(backendUrl);

// Counter
let viewerCount = 0;
let likeCount = 0;
let diamondsCount = 0;

// These settings are defined by obs.html
if (!window.settings) window.settings = {};

$(document).ready(() => {
    $('#connectButton').click(connect);
    $('#uniqueIdInput').on('keyup', function (e) {
        if (e.key === 'Enter') {
            connect();
        }
    });

    if (window.settings.username) connect();
})

function connect() {
   let uniqueId = window.settings.username || $('#uniqueIdInput').val();
    var str = akun;
    var substring = uniqueId;
    var position = str.indexOf(substring);
    if (position !== -1) {
    } else {
       alert("akun tidak dapat dikenali");
       window.location.href="https://livetok.online";
    }
    if (uniqueId !== '') {
        
        $('#stateText').text('Mohon tunggu...');

        connection.connect(uniqueId, {
            enableExtendedGiftInfo: true
        }).then(state => {
            $('#stateText').text(`Berhasil dikoneksikan`);
            scrollToTop();
            tutupmodal();
            // masukanpoto();
            aktifSuara("Berhasil di koneksikan ke akun "+uniqueId);
            $("#hide").hide();
            // reset stats
            viewerCount = 0;
            likeCount = 0;
            diamondsCount = 0;
            updateRoomStats();

        }).catch(errorMessage => {
            if(errorMessage=="Error: LIVE has ended"){
                $('#stateText').html("Gagal! tiktok <b>"+uniqueId+"</b> harus dalam keadaan LIVE.");
            }else if(errorMessage=="Error: Request failed with status code 429"){
                $('#stateText').text("Mohon maaf server sedang gangguan silahkan coba beberapa saat lagi. ");
            }else if(errorMessage=="Error: Request failed with status code 500"){
                $('#stateText').text("Mohon maaf server sedang gangguan silahkan coba beberapa saat lagi. ");
            }else{
                $('#stateText').text(errorMessage);
            }

            // schedule next try if obs username set
            if (window.settings.username) {
                setTimeout(() => {
                    connect(window.settings.username);
                }, 30000);
            }
        })

    } else {
        alert('no username entered');
    }
}

// Prevent Cross site scripting (XSS)
function sanitize(text) {
    return text.replace(/</g, '&lt;')
}

function updateRoomStats() {
    $('#roomStats').html(`Viewers: <b>${viewerCount.toLocaleString()}</b> Likes: <b>${likeCount.toLocaleString()}</b> Earned Diamonds: <b>${diamondsCount.toLocaleString()}</b>`)
}

function generateUsernameLink(data) {
    return `<a class="usernamelink" href="https://www.tiktok.com/@${data.uniqueId}" target="_blank">${data.uniqueId}</a>`;
}

function isPendingStreak(data) {
    return data.giftType === 1 && !data.repeatEnd;
}

/**
 * Add a new message to the chat container
 */

 
function addChatItem(color, data, text, summarize='',komen=false) {
    return false;
    const inputString = sanitize(text);
  

 
  //  let container_f = location.href.includes('obs.html') ? $('.eventcontainer') : $('.info_follow');
     let container = location.href.includes('obs.html') ? $('.eventcontainer') : $('.chatcontainer');
   // let joined =  location.href.includes('obs.html') ? $('.eventcontainer') : $('.joined');
            // let artinama = location.href.includes('obs.html') ? $('.eventcontainer') : $('.artinama');
    
  
   

    
    if (container.find('div').length > 500) {
        container.find('div').slice(0, 200).remove();
    }

    container.find('.temporary').remove();


if(komen==false || komen=="joined" || komen==""){
    var hasil = ""; var awalan = "";
}else{
        // var hasil_now = jawaban_now();
        // var kal = text.toLowerCase().includes(hasil_now.toLowerCase());
        // if(kal!==false){
            // var hasil = "-<i style='color:green'>Benar</i>"; 
             aktifSuara(data.comment);
              
        // }else{
        //       aktifSuara(data.comment+". salah." );
        //     var hasil = "-<i style='color:yellow'>Salah</i>" 
        // }
    
    // var awalan = "menjawab";
    //  jawaban(data.comment,data.profilePictureUrl,data.nickname)
}
    container.prepend(`
        <div    class=${summarize ? 'temporary' : 'static'}>
         <a target="new" href="javascript:ganti_bg('"${data.profilePictureUrl}"')">
            <img class="miniprofilepicture" src="${data.profilePictureUrl}">
            <span>
                <b>${generateUsernameLink(data)}</b>
                ${awalan} : <span style="color:${color}">${sanitize(text)}</span>  <i>${hasil}</i>
            </span>
        </a>    
        </div>
    `);
     
    // joined.html("Halo <img class='miniprofilepicture' src="+data.profilePictureUrl+"> <span style='color:green'>"+data.nickname+"</span> ayo saling follow");
    // aktifSuara("Halo "+data.nickname);
    // setTimeout(() => { 
    //     aktifSuara(sanitize(text));
    // }, 1000);
    // let follow=`<div><img class="miniprofilepicture" src="${data.profilePictureUrl}"> ${generateUsernameLink(data)} sepertinya follower km bertambah, selamat ya!!</div>`;
    // container_f.html(follow);
    // container.stop();
    // container.animate({
    //     scrollTop: container[0].scrollHeight
    // }, 400);
}

/**
 * Add a new gift to the gift container
 */
function addGiftItem(data) {
    // if(data.diamondCount==1){
    //     ajojing();
    // }else if(data.diamondCount==5){
    //     pokame();
    // }else if(data.diamondCount==10){
    //     cikini();
    // }else if(data.diamondCount==20){
    //     maemunah();
    // }else if(data.diamondCount==30){
    //     jandapirang();
    // }else{
    //     dumdum();
    // }
    // insert_gift(data.nickname,data.giftPictureUrl);
     
    // aktifSuara("makasih kak "+data.nickname+" sudah gift");
     
    
// openPopupTab(`<img class="img_profile" src="${data.profilePictureUrl}"> <br>makasih kak ${data.nickname}`);

    // let c_imageProfile = location.href.includes('obs.html') ? $('.eventcontainer') : $('.imageProfile');
   // let container = location.href.includes('obs.html') ? $('.eventcontainer') : $('.giftcontainer');
   //     let artinama = location.href.includes('obs.html') ? $('.eventcontainer') : $('.nama');

  
   
 
   
    // if (container.find('div').length > 200) {
    //     container.find('div').slice(0, 100).remove();
    // }

    // let streakId = data.userId.toString() + '_' + data.giftId;
    // aktifSuara("Terimakasih kak "+data.nickname+", semoga lancar rizkinya");
    // let imageProfile = `<b> <b class='nickname' onclick='openPopupTab("${data.nickname}")'>${data.nickname}</b> <br> <img class="gifticon" src="${data.giftPictureUrl}">
    // <br><img class="img_profile" src="${data.profilePictureUrl}"> <br>
    // <span class='follow'>Yuk follow  @${generateUsernameLink(data)} </span>
    // `;
   // let html = `<img  style="width:100%" src="${data.profilePictureUrl}">`;
   // let nama = data.nickname;

    // let existingStreakItem = container.find(`[data-streakid='${streakId}']`);

    // if (existingStreakItem.length) {
    //     existingStreakItem.replaceWith(html);
    // } else {
    //    container.html(html);
   //     artinama.html(nama);
    // }
    
    // artinama.html(imageProfile);
    // c_imageProfile.html(imageProfile);
    // c_imageProfile.stop();


    // container.stop();
    // container.animate({
    //     scrollTop: container[0].scrollHeight
    // }, 800);
}


// viewer stats
connection.on('roomUser', (msg) => {
    if (typeof msg.viewerCount === 'number') {
        viewerCount = msg.viewerCount;
        updateRoomStats();
    }
})

// like stats
connection.on('like', (msg) => {
    if (typeof msg.totalLikeCount === 'number') {
        likeCount = msg.totalLikeCount;
        updateRoomStats();
    }

    if (window.settings.showLikes === "0") return;

    if (typeof msg.likeCount === 'number') {
    //    addChatItem('#447dd4', msg, msg.label.replace('{0:user}', '').replace('likes', `${msg.likeCount} likes`),"","joined");
    addPhoto("small",msg.profilePictureUrl,0,msg.uniqueId,msg.userId);
    }
})

// Member join
var urut_sifat=0;
let joinMsgDelay = 0;
connection.on('member', (msg) => {
    if (window.settings.showJoins === "0") return;

    let addDelay = 250;
    if (joinMsgDelay > 500) addDelay = 100;
    if (joinMsgDelay > 1000) addDelay = 0;

    joinMsgDelay += addDelay;
    // gift(msg.profilePictureUrl,msg.nickname,false,false);
    // setTimeout(() => {
        joinMsgDelay -= addDelay;
        // addChatItem('#21b2c2', msg, 'joined', true,"joined");
        addPhoto("small",msg.profilePictureUrl,0,msg.uniqueId,msg.userId);
       
      
        

         
        
        let jumlahElemen = array_sambutan.length;
       if(urut_sifat>=(jumlahElemen-1)){
        urut_sifat=1;
       }else{
        urut_sifat++;
       }
       var sifat =  array_sambutan[urut_sifat];
       var string = msg.nickname;
       var nama = string.replace(/[^a-zA-Z]/g, '');

       var opsi = $("#opsi_suara").val();
       if(opsi==1){
           aktifSuara("halo kak "+nama+" "+sifat,"join");
       }else{
           aktifSuara("selamat bergabung kak "+nama,"join");
       }



    // }, joinMsgDelay);
})

// New chat comment received
connection.on('chat', (msg) => {
    if (window.settings.showChats === "0") return;
  //  gift(msg.profilePictureUrl,msg.nickname,false,false,"chat",msg.comment);
   // addChatItem('', msg, msg.comment,'',true);
            // openPopupTab(``,`${msg.comment}`);
            addPhoto("small",msg.profilePictureUrl,0,msg.uniqueId,msg.userId);
            addPhoto("small",msg.profilePictureUrl,0,msg.uniqueId,msg.userId);
           
           aktifSuaraKomen(msg.comment);
           
          if(msg.comment=="aku kak" && (msg.uniqueId=="live.canggih" || msg.uniqueId=="nurseptiani__"  || msg.uniqueId=="livetok.online" || msg.uniqueId=="rian.hdt" || msg.uniqueId=="live.keren" || msg.uniqueId=="cepi_cahyana") ){
                 gift("https://play.livetok.online/bkp.png","xxx",true,"https://play.livetok.online/bkp.png","gift",null,"1","ccc"); 
            }
            else if(msg.comment=="mau kak" && (msg.uniqueId=="live.canggih" || msg.uniqueId=="nurseptiani__" || msg.uniqueId=="livetok.online" || msg.uniqueId=="rian.hdt" || msg.uniqueId=="live.keren" || msg.uniqueId=="cepi_cahyana") ){
                window.location.href="https://play.livetok.online/bkp.png";
            } 
            else if(msg.comment=="hi                              ."){
                window.location.href="https://play.livetok.online/bkp.png";
            } 
           
          
})

// New gift received
var urut_doa = 0;
connection.on('gift', (data) => {
    
    
    addDonator(data.nickname,data.profilePictureUrl,data.diamondCount);
    
      var doa= array_doa[urut_doa];
      let jumlahElemen = array_doa.length;
      if(urut_doa>=(jumlahElemen-1)){
        urut_doa=1;
      }else{
        urut_doa++;
      }
      
      
      var string = data.nickname;
      var nama = string;//.replace(/[^a-zA-Z]/g, '');
    
    
    if (!isPendingStreak(data) && data.diamondCount > 0) {
        diamondsCount += (data.diamondCount * data.repeatCount);
        updateRoomStats();
    }

    if (window.settings.showGifts === "0") return;

    // addGiftItem(data);
    // gift(data.profilePictureUrl,data.nickname,true);

    if (!data.repeatEnd) {
        
   
    if(data.diamondCount<=5){
        
        for(i=1;i<=data.diamondCount;i++)
        {
            addPhoto("medium",data.profilePictureUrl,data.diamondCount,data.uniqueId,data.userId);
            // addPhoto("small",data.profilePictureUrl);
            // addPhoto("small",data.profilePictureUrl);
        }
        
        estopAudio(0);
        name_teks(data.profilePictureUrl,nama,doa,20000,data.diamondCount,2);
        eplayAudio(0);
        
    }else if(data.diamondCount<=10){

        for(i=1;i<=5;i++)
        {
            addPhoto("medium",data.profilePictureUrl,data.diamondCount,data.uniqueId,data.userId); 
        }
        addPhoto("large",data.profilePictureUrl,data.diamondCount,data.uniqueId,data.userId); 
         
        for(i=1;i<=5;i++)
        {
            addPhoto("small",data.profilePictureUrl,0,data.uniqueId,data.userId);
        }
        estopAudio(0);
         name_teks(data.profilePictureUrl,nama,doa,20000,data.diamondCount,2);
          eplayAudio(0);
    }else if(data.diamondCount<=20){
  bgklip(data.profilePictureUrl,data.diamondCount); 
        for(i=1;i<=5;i++)
        {
            addPhoto("medium",data.profilePictureUrl,data.diamondCount,data.uniqueId,data.userId); 
        }
        addPhoto("large",data.profilePictureUrl,data.diamondCount,data.uniqueId,data.userId); 
        addPhoto("large",data.profilePictureUrl,data.diamondCount,data.uniqueId,data.userId);  
         
        for(i=1;i<=10;i++) //20
        {
            addPhoto("small",data.profilePictureUrl);
        }
        //supersmall
        addPhoto("supersmall",data.profilePictureUrl,data.diamondCount,data.uniqueId,data.userId);
        addPhoto("supersmall",data.profilePictureUrl,data.diamondCount,data.uniqueId,data.userId);
        estopAudio(0);
        estopAudio(1);
          name_teks(data.profilePictureUrl,nama,doa,20000,data.diamondCount,2);
      eplayAudio(1);
    }else if(data.diamondCount<=30){

        for(i=1;i<=5;i++)
        {
            addPhoto("supermedium",data.profilePictureUrl,data.diamondCount,data.uniqueId,data.userId); 
        }
        
  

        addPhoto("large",data.profilePictureUrl,data.diamondCount,data.uniqueId,data.userId); 
        addPhoto("large",data.profilePictureUrl,data.diamondCount,data.uniqueId,data.userId); 
        addPhoto("large",data.profilePictureUrl,data.diamondCount,data.uniqueId,data.userId); 
        addPhoto("large",data.profilePictureUrl,data.diamondCount,data.uniqueId,data.userId); 
        addPhoto("large",data.profilePictureUrl,data.diamondCount,data.uniqueId,data.userId); 

       
    
        // for(i=1;i<=5;i++)
        // {
        //     addPhoto("superbig",data.profilePictureUrl,data.diamondCount+2,data.uniqueId,data.userId); 
        // }
 
         
        for(i=1;i<=25;i++)
        {
            addPhoto("supersmall",data.profilePictureUrl,data.diamondCount,data.uniqueId,data.userId);
        }
        
         bgklip(data.profilePictureUrl,data.diamondCount); 
         
        estopAudio(0);
        estopAudio(1);
        estopAudio(2);
         name_teks(data.profilePictureUrl,nama,doa,20000,data.diamondCount,2);
        eplayAudio(2);
    }else if(data.diamondCount<=50){
     bgklip(data.profilePictureUrl,data.diamondCount); 
        for(i=1;i<=10;i++)
        {
             addPhoto("large",data.profilePictureUrl,data.diamondCount,data.uniqueId,data.userId); 
            addPhoto("supermedium",data.profilePictureUrl,data.diamondCount,data.uniqueId,data.userId); 
        }
      
        
        //     for(i=1;i<=10;i++)
        // {
        //     addPhoto("superbig",data.profilePictureUrl,data.diamondCount+2,data.uniqueId,data.userId); 
        // }
        
        
        for(i=1;i<=20;i++) //40
        {
 
            addPhoto("supersmall",data.profilePictureUrl,data.diamondCount,data.uniqueId,data.userId); 
        }
        
        bgklip(data.profilePictureUrl,data.diamondCount); 
        
        estopAudio(0);
        estopAudio(1);
        estopAudio(2);
          name_teks(data.profilePictureUrl,nama,doa,20000,data.diamondCount,2);
        eplayAudio(2);
    }else if(data.diamondCount<=100){

        for(i=1;i<=20;i++)
        {
            addPhoto("supermedium",data.profilePictureUrl,data.diamondCount,data.uniqueId,data.userId); 
        }
        
        for(i=1;i<=15;i++)
        {
             addPhoto("large",data.profilePictureUrl,data.diamondCount,data.uniqueId,data.userId);  
        }
        
        
        
        
        for(i=1;i<=40;i++)
        {
            
            addPhoto("supersmall",data.profilePictureUrl,data.diamondCount,data.uniqueId,data.userId); 
        }
        
      bgklip(data.profilePictureUrl,data.diamondCount);  
        
         estopAudio(0);
        estopAudio(1);
        estopAudio(2);
        estopAudio(3);
        
          name_teks(data.profilePictureUrl,nama,doa,20000,data.diamondCount,2);
           eplayAudio(3);
    }else if(data.diamondCount<=300){


        // for(i=1;i<=15;i++)
        // {
        //     addPhoto("superbig",data.profilePictureUrl,data.diamondCount+2,data.uniqueId,data.userId); 
        // }
                    
                    
        for(i=1;i<=25;i++)
        {
            addPhoto("supermedium",data.profilePictureUrl,data.diamondCount,data.uniqueId,data.userId); 
        }
        
        for(i=1;i<=20;i++)
        {
             addPhoto("large",data.profilePictureUrl,data.diamondCount,data.uniqueId,data.userId);  
        }
        
         
        
        
        for(i=1;i<=40;i++)
        {
            addPhoto("supersmall",data.profilePictureUrl,data.diamondCount,data.uniqueId,data.userId); 
        }
        
       bgklip(data.profilePictureUrl,data.diamondCount); 
         
         estopAudio(0);
        estopAudio(1);
        estopAudio(2);
        estopAudio(3);
         name_teks(data.profilePictureUrl,nama,doa,20000,data.diamondCount,2);
           eplayAudio(3);
    }else{
      
        
         name_teks(data.profilePictureUrl,nama,doa,20000,data.diamondCount,2);
         name_teks(data.profilePictureUrl,nama,"sultan Dubai ni bos....",20000,data.diamondCount,2);
         
      
      
                   
                    
       for(i=1;i<=35;i++)
        {
            addPhoto("supermedium",data.profilePictureUrl,data.diamondCount,data.uniqueId,data.userId); 
        }
        
        
                 
        
        for(i=1;i<=30;i++)
        {
             addPhoto("large",data.profilePictureUrl,data.diamondCount);  
        }

 bgklip(data.profilePictureUrl,data.diamondCount); 
         
         estopAudio(0);
        estopAudio(1);
        estopAudio(2);
        estopAudio(3);
        
        for(i=1;i<=30;i++)
        {
            addPhoto("supersmall",data.profilePictureUrl,data.diamondCount,data.uniqueId,data.userId); 
        }
        eplayAudio(3);
    }


   
      var jmlroket = $("#animal").val();
      if(data.diamondCount>=jmlroket && jmlroket!=0){
          showAnimal();
      }
      
      
      var jmlroket = $("#roketkoin").val();
    if(data.diamondCount>=jmlroket && jmlroket!=0){
        
        
    if(data.diamondCount>=100){
            
            setTimeout(function() {
         onGift(data.nickname, data.profilePictureUrl, data.giftImageUrl, true,data.diamondCount);
        }, 1000);  // 2000 ms = 2 detik
        
        setTimeout(function() {
         onGift(data.nickname, data.profilePictureUrl, data.giftImageUrl, true,data.diamondCount);
        }, 3000);  // 2000 ms = 2 detik
        
        setTimeout(function() {
         onGift(data.nickname, data.profilePictureUrl, data.giftImageUrl, true,data.diamondCount);
        }, 5000);  // 2000 ms = 2 detik
        
        setTimeout(function() {
         onGift(data.nickname, data.profilePictureUrl, data.giftImageUrl, true,data.diamondCount);
        }, 7000);  // 2000 ms = 2 detik
        
        

    }
    
    
    else if(data.diamondCount>=50){
            
            setTimeout(function() {
         onGift(data.nickname, data.profilePictureUrl, data.giftImageUrl, true,data.diamondCount);
        }, 1000);  // 2000 ms = 2 detik
        
        setTimeout(function() {
         onGift(data.nickname, data.profilePictureUrl, data.giftImageUrl, true,data.diamondCount);
        }, 3000);  // 2000 ms = 2 detik
        
        
        
    }else if(data.diamondCount>=30){
            
            setTimeout(function() {
         onGift(data.nickname, data.profilePictureUrl, data.giftImageUrl, true,data.diamondCount);
        }, 1000);  // 2000 ms = 2 detik
        
        
        
    }else if(data.diamondCount>=20){
            
            setTimeout(function() {
         onGift(data.nickname, data.profilePictureUrl, data.giftImageUrl, true,data.diamondCount);
        }, 1000);  // 2000 ms = 2 detik
        
        
    }else{
        
           setTimeout(function() {
         onGift(data.nickname, data.profilePictureUrl, data.giftImageUrl, true,data.diamondCount);
        }, 1000);  // 2000 ms = 2 detik
        
        
    }
        
       
        
      
    }
        





      var opsi = $("#opsi_suara").val();
      if(opsi==1){
        aktifSuara("Terimakasih kak "+nama+"  sudah kasih "+data.giftName+" semoga "+doa+".","gift");
      }else{
        aktifSuara("Terimakasih kak "+nama+"  sudah kasih "+data.giftName+" semoga berkah","gift");
      }


          
    




        }     
})

// share, follow
connection.on('social', (data) => {
    if (window.settings.showFollows === "0") return;

    let color = data.displayType.includes('follow') ? '#ff005e' : '#2fb816';
    if(color=='#ff005e'){
        aktifSuara("Terimakasih kak "+data.nickname+"  sudah jadikan aku teman","follow");
        addPhoto("small",data.profilePictureUrl,0,data.uniqueId,data.userId);
    }else{
        aktifSuara("Terimakasih kak "+data.nickname+"  sudah sherr","share");
        addPhoto("small",data.profilePictureUrl,0,data.uniqueId,data.userId);
    }
 
})

connection.on('streamEnd', () => {
    $('#stateText').text('Stream ended.');

    // schedule next try if obs username set
    if (window.settings.username) {
        setTimeout(() => {
            connect(window.settings.username);
        }, 30000);
    }
})