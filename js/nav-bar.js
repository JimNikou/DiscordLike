const toggleBtn = document.querySelector('#toggle-btn');
const sidebar = document.querySelector('#sidebar');

toggleBtn.addEventListener('click', () => {
  sidebar.classList.toggle('active');
});

function menuBtnFunction(menuBtn) {
  menuBtn.classList.toggle("active");
  sidebar.classList.toggle("active");
}






// // play function
// function playPause() {

//   if (!isPlaying) {
//     audio.play();
//     isPlaying = true;
//     playBtn.innerHTML = '<i class="fa fa-pause"></i>';
//   } else {
//     audio.pause();
//     isPlaying = false;
//     playBtn.innerHTML = '<i class="fa fa-play"></i>';
//   }
// }

// // pause function
// function pauseSong() {
//   // pause audio
//   audio.pause();
//   isPlaying = false;
//   playBtn.innerHTML = '<i class="fa fa-play"></i>';
// }

// // stop function
// function stopSong() {
//   // stop audio and set time to 0
//   audio.pause();
//   audio.currentTime = 0;
//   isPlaying = false;
//   playBtn.innerHTML = '<i class="fa fa-play"></i>';
// }

// // mute function
// function muteSong() {

//   // toggle mute on/off
//   audio.muted = !audio.muted;
//   muteBtn.innerHTML = audio.muted ? '<i class="fa fa-volume-mute"></i>' : '<i class="fa fa-volume-up"></i>';
// }

// // update time function
// function updateTime() {
//   // update current time and progress bar
//   const currentTime = audio.currentTime;
//   const duration = audio.duration;
//   updateProgress()
//   // update progress bar
//   //progress.value = (currentTime / duration) * 100;

//   // format time
//   const currentMinutes = Math.floor(currentTime / 60);
//   const currentSeconds = Math.floor(currentTime % 60);
//   const durationMinutes = Math.floor(duration / 60);
//   const durationSeconds = Math.floor(duration % 60);

//   // display current time
//   const currentTimeFormatted = `${currentMinutes}:${currentSeconds < 10 ? '0' + currentSeconds : currentSeconds}`;

//   // display duration
//   const durationFormatted = `${durationMinutes}:${durationSeconds < 10 ? '0' + durationSeconds : durationSeconds}`;

//   // update time display
//   const timeDisplay = document.getElementById('time-display');
//   timeDisplay.innerHTML = `${currentTimeFormatted} / ${durationFormatted}`;
// }

// function updateProgress() {

//   const percent = (audio.currentTime / audio.duration) * 100;
//   progress.style.width = percent + '%';
// }

// function setProgress(e) {
//   const width = progressBar.clientWidth;
//   const clickX = e.offsetX;
//   const duration = audio.duration;
//   audio.currentTime = (clickX / width) * duration;
// }

// // add event listeners
// playBtn.addEventListener('click', () => {
//   isPlaying ? pauseSong() : playSong(songTitle.innerText, audio.src);
// });

// stopBtn.addEventListener('click', stopSong);

// muteBtn.addEventListener('click', muteSong);

// //audio.addEventListener('timeupdate', updateTime);
// //audio.ontimeupdate = function() {updateTime()};


// playSong('Song Title', 'one.mp3');