 let rocketsInAirCount = 0;
   var colors = ['red', 'green', 'blue', 'yellow', 'orange', 'purple', 'cyan', 'magenta','orange','#2F4F4F','#1E90FF','#CD5C5C','#20B2AA','#C71585','#DDA0DD','#9ACD32']; 
    
    var settings = {
    firework_maxFireworks: 10,
    firework_soundVolume: 35, // Set default volume to 30%
    firework_showUsername: true,
};
        
        // Menambahkan slider untuk mengatur volume suara roket
const volumeSlider = document.getElementById('volumeSlider');
const volumeValue = document.getElementById('volumeValue');

// Set the initial volume display and value to 30%
volumeValue.textContent = volumeSlider.value;

// Mengatur volume berdasarkan nilai slider
volumeSlider.addEventListener('input', function () {
    volumeValue.textContent = volumeSlider.value;
    settings.firework_soundVolume = parseInt(volumeSlider.value);
});
     
        function onGift(username, profilePictureUrl, giftImageUrl, overrideEnableAudio,coint) {
     
            if (rocketsInAirCount > 10) return;
            if (settings.firework_maxFireworks && rocketsInAirCount >= settings.firework_maxFireworks) return;

            const preLoadImage1 = document.createElement('img');
            preLoadImage1.src = profilePictureUrl;
            preLoadImage1.style.zIndex = coint+5;
                     var randomColor = colors[Math.floor(Math.random() * colors.length)]; 
        preLoadImage1.style.border = '1px solid ' + randomColor;
        
            
            document.getElementById('imagePreload').appendChild(preLoadImage1);

            const preLoadImage2 = document.createElement('img');
            preLoadImage2.src = giftImageUrl;
            preLoadImage2.style.zIndex = coint+5;
              var randomColor = colors[Math.floor(Math.random() * colors.length)]; 
              
            preLoadImage2.style.border = '1px solid ' + randomColor;
        
            document.getElementById('imagePreload').appendChild(preLoadImage2);

            // Create the rocket element
            const rocket = document.createElement('div');
            rocket.className = 'rocket';
            rocket.style.backgroundImage = `url(${profilePictureUrl})`;
            rocket.style.zIndex = coint+5;

            // Append the rocket to the body
            const randomOffset = (Math.random() * 40 - 20) + 'vmin';
            rocket.style.setProperty('--rocket-offset', randomOffset);

            document.body.appendChild(rocket);

            const verticalOffset = Math.floor(Math.random() * (75 - 60 + 1) + 60);
            rocket.style.setProperty('--rocket-offset-bottom', (verticalOffset - 2) + "vh");

            // random between 2 and 3 seconds
            rocket.style.setProperty('--rocket-launch-duration', (Math.random() * 1 + 2) + 's');

            

            const audioRocketStart = new Audio(`https://tikfinity.zerody.one/widget/sounds/firework/rocket_start/${Math.floor(Math.random() * (10 - 1 + 1) + 1)}.mp3`);
            audioRocketStart.volume = ((settings.firework_soundVolume || 80) / 100) * 1;

            // const audioRocketBoom = new Audio(`https://tikfinity.zerody.one/widget/sounds/firework/rocket_boom/${Math.floor(Math.random() * (8 - 1 + 1) + 1)}.mp3`);
            const audioRocketBoom = new Audio(`https://play.livetok.online/assets/dar.mp3`);
            audioRocketBoom.volume = settings.firework_soundVolume/100;// (settings.firework_soundVolume || 80) / 100;

            // Play rocket launch sound
            if (overrideEnableAudio) {
                setTimeout(() => {
                    audioRocketStart.play();
                }, 300);
            }

            rocketsInAirCount += 1;

            // Trigger the explosion when the rocket reaches the top
            rocket.addEventListener('animationend', (e) => {
                if (e.animationName === 'rocketLaunch') {
                    rocket.style.animation = 'rocketExplode 0.2s ease-out forwards';
                }

                if (e.animationName === 'rocketExplode') {
                    rocket.style.animation = 'rocketHide 1s ease-out forwards';

                    // Create multiple explosion elements (three rings)
                    // First ring (only profile pictures)
                    for (let i = 0; i < (30); i++) {
                          var randomColor = colors[Math.floor(Math.random() * colors.length)]; 
                        const explosion = document.createElement('div');
                        explosion.className = 'explosion';
                        explosion.style.borderRadius = '50%';
                        explosion.style.backgroundImage = `url(${profilePictureUrl})`;
                        explosion.style.setProperty('--x', Math.cos((i / 10) * 2 * Math.PI));
                        explosion.style.setProperty('--y', Math.sin((i / 10) * 2 * Math.PI));
                        explosion.style.transform = `translate(calc(var(--x) * ${20 + i * 5}vmin), calc(var(--y) * ${20 + i * 5}vmin))`;
                        explosion.style.left = `calc(50% + ${randomOffset} - 4vmin)`;
                        explosion.style.bottom = verticalOffset + 'vh';
                        explosion.style.zIndex = coint+5;
                         
                       //  explosion.style.border = '1px solid ' + randomColor;
                          
                        document.body.appendChild(explosion);

                        // Remove explosion after animation ends
                        explosion.addEventListener('animationend', () => {
                            document.body.removeChild(explosion);
                        });
                    }

                    // username color
                    let possibleColors = ['#ffcc00', '#ff9d00', '#ff4d00', '#88ff00', '#00ccff', '#ff00b3'];

                    // Show username
                    const textLabel = document.createElement('div');

                    if (settings.firework_showUsername !== false) {
                        textLabel.style.setProperty('--username-rotate', Math.floor(Math.random() * 20 - 10) + 'deg');
                        textLabel.innerText = username;
                        
                        textLabel.style.position = 'absolute';
                        textLabel.style.left = `calc(50% + ${randomOffset} - 4vmin)`;
                        textLabel.style.bottom = verticalOffset + 'vh';
                        textLabel.style.color = possibleColors[Math.floor(Math.random() * possibleColors.length)];
                        textLabel.style.zIndex = coint+5;
                            textLabel.style.width = "40px" ;
                            textLabel.style.height = "40px" ;
                            
                        
                            textLabel.style.position = 'absolute';
                            textLabel.style.left = `calc(50% + ${randomOffset} - 4vmin)`;
                            textLabel.style.bottom = verticalOffset + 'vh';
                            textLabel.style.color = possibleColors[Math.floor(Math.random() * possibleColors.length)];
                            





                    }

                    if (username.length > 30) textLabel.style['font-size'] = '3vmin';
                    else if (username.length > 15) textLabel.style['font-size'] = '5vmin';
                    else if (username.length > 12) textLabel.style['font-size'] = '7vmin';
                    else if (username.length > 8) textLabel.style['font-size'] = '9vmin';
                    else if (username.length > 5) textLabel.style['font-size'] = '13vmin';
                    else if (username.length > 3) textLabel.style['font-size'] = '15vmin';
                    else textLabel.style['font-size'] = '18vmin';

                    textLabel.classList.add('username');

                    document.body.appendChild(textLabel);


setTimeout(() => {
           for (let i = 0; i < (30); i++) {
               var randomColor = colors[Math.floor(Math.random() * colors.length)]; 
                        const explosion = document.createElement('div');
                        explosion.className = 'explosion';
                        explosion.style.borderRadius = '50%';
                        explosion.style.backgroundImage = `url(${profilePictureUrl})`;
                           
                        //  explosion.style.border = '1px solid ' + randomColor;
                        explosion.style.setProperty('--x', Math.cos((i / 10) * 2 * Math.PI));
                        explosion.style.setProperty('--y', Math.sin((i / 10) * 2 * Math.PI));
                        explosion.style.transform = `translate(calc(var(--x) * ${20 + i * 5}vmin), calc(var(--y) * ${20 + i * 5}vmin))`;
                        explosion.style.left = `calc(50% + ${randomOffset} - 4vmin)`;
                        explosion.style.bottom = verticalOffset + 'vh';
                        explosion.style.zIndex = coint+5;
                         explosion.style.width = '20px' ;
                            explosion.style.height = '20px' ;
                        
                        document.body.appendChild(explosion);

                        // Remove explosion after animation ends
                        explosion.addEventListener('animationend', () => {
                            document.body.removeChild(explosion);
                        });
                    }
    }, 400);
    
    
setTimeout(() => {
    for (let i = 0; i < (30); i++) {
        var randomColor = colors[Math.floor(Math.random() * colors.length)];
        const explosion = document.createElement('div');
        explosion.className = 'explosion';
        explosion.style.borderRadius = '50%';
        explosion.style.backgroundImage = `url(${profilePictureUrl})`;
        
        // Menambahkan border warna-warni ke setiap explosion kecuali gambar gift
        if (profilePictureUrl !== giftImageUrl) {
            explosion.style.border = '3px solid ' + randomColor;
        }
        
        explosion.style.setProperty('--x', Math.cos((i / 10) * 2 * Math.PI));
        explosion.style.setProperty('--y', Math.sin((i / 10) * 2 * Math.PI));
        explosion.style.transform = `translate(calc(var(--x) * ${20 + i * 5}vmin), calc(var(--y) * ${20 + i * 5}vmin))`;
        explosion.style.left = `calc(50% + ${randomOffset} - 4vmin)`;
        explosion.style.bottom = verticalOffset + 'vh';
        explosion.style.zIndex = coint + 5;
        explosion.style.width = '30px';
        explosion.style.height = '30px';
        
        document.body.appendChild(explosion);

        // Remove explosion after animation ends
        explosion.addEventListener('animationend', () => {
            document.body.removeChild(explosion);
        });
    }
}, 600);

setTimeout(() => {
    for (let i = 0; i < (30); i++) {
        var randomColor = colors[Math.floor(Math.random() * colors.length)];
        const explosion = document.createElement('div');
        explosion.className = 'explosion';
        explosion.style.borderRadius = '50%';
        explosion.style.backgroundImage = `url(${giftImageUrl})`;
        
        // Gambar gift tidak memiliki border warna-warni
        explosion.style.setProperty('--x', Math.cos((i / 10) * 2 * Math.PI));
        explosion.style.setProperty('--y', Math.sin((i / 10) * 2 * Math.PI));
        explosion.style.transform = `translate(calc(var(--x) * ${20 + i * 5}vmin), calc(var(--y) * ${20 + i * 5}vmin))`;
        explosion.style.left = `calc(50% + ${randomOffset} - 4vmin)`;
        explosion.style.bottom = verticalOffset + 'vh';
        explosion.style.zIndex = coint + 5;
        explosion.style.width = '30px';
        explosion.style.height = '30px';
        
        document.body.appendChild(explosion);

        // Remove explosion after animation ends
        explosion.addEventListener('animationend', () => {
            document.body.removeChild(explosion);
        });
    }
}, 900);




            
setTimeout(() => {
           for (let i = 0; i < (30); i++) {
               var randomColor = colors[Math.floor(Math.random() * colors.length)]; 
                        const explosion = document.createElement('div');
                        explosion.className = 'explosion';
                        explosion.style.borderRadius = '50%';
                        explosion.style.backgroundImage = `url(${profilePictureUrl})`;
                           
                        explosion.style.border = '1px solid ' + randomColor;
                        explosion.style.setProperty('--x', Math.cos((i / 10) * 2 * Math.PI));
                        explosion.style.setProperty('--y', Math.sin((i / 10) * 2 * Math.PI));
                        explosion.style.transform = `translate(calc(var(--x) * ${20 + i * 5}vmin), calc(var(--y) * ${20 + i * 5}vmin))`;
                        explosion.style.left = `calc(50% + ${randomOffset} - 4vmin)`;
                        explosion.style.bottom = verticalOffset + 'vh';
                        explosion.style.zIndex = coint+5;
                         explosion.style.width = '40px' ;
                            explosion.style.height = '40px' ;
                        
                        document.body.appendChild(explosion);

                        // Remove explosion after animation ends
                        explosion.addEventListener('animationend', () => {
                            document.body.removeChild(explosion);
                        });
                    }
    }, 1100);
      
                  

                    setTimeout(() => {
                        document.body.removeChild(rocket);
                        document.body.removeChild(textLabel);
                        preLoadImage1.remove();
                        preLoadImage2.remove();
                    }, 8000);

                    setTimeout(() => {
                        rocketsInAirCount += -1;
                        console.log("rockets in air count", rocketsInAirCount);
                    }, 2000);

                    if (overrideEnableAudio) {
                        setTimeout(() => {
                            audioRocketBoom.play();
                        }, 200);
                    }
                }
            });
        }

  

         
        // let previewIndex = 0;
        // let previewEnabled = true;

