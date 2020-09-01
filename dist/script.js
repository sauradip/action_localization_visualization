//this is key press value not click
const leftKeySkip = -10;  //10s
const rightKeySkip = 20;  //20s
const volumeUp = 0.05;
const volumeDown = -0.05;

const video = document.querySelector(".video");
const current = document.querySelector(".current");
const duration = document.querySelector(".duration");
const progressRng = document.querySelector(".progressRng");
const ctrlArea = document.querySelector(".ctrlArea");
const playBtn = document.querySelector(".playBtn");
const volumeRng = document.querySelector(".volume");
const speedRng = document.querySelector(".speed");
const fullScreenBtn = document.querySelector(".fullScreen");
const skipButtons = document.querySelectorAll("[data-skip]");


//video paly/pause func
function togglePlay() {
  const status = video.paused ? "play" : "pause";
  video[status]();
};

//update btn icon func
function updateBtn() {
  const icon = this.paused ? "▶" : "❚❚";
  playBtn.innerHTML = icon;
}

//skip func
function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

//update current time and duration
function updateTime() {
  var cMin = Math.floor(video.currentTime / 60);
  var cSec = Math.floor(video.currentTime - cMin * 60);
  var dMin = Math.floor(video.duration / 60);
  var dSec = Math.floor(video.duration - dMin * 60);
  
  current.innerHTML = ("0" + cMin).slice(-2) + ":" + ("0" + cSec).slice(-2);
  duration.innerHTML = ("0" + dMin).slice(-2) + ":" + ("0" + dSec).slice(-2);
}

//update Progressbar
function updateProgress() {
  var percent = (video.currentTime / video.duration) * 100;
  progressRng.value = percent;
}

//change video progress time
function changeProgress() {
  var progressTime = (this.value / 100) * video.duration;
  video.currentTime = progressTime;
}

//update volume
function changeVolume() {
  video.volume = this.value;
}

//update palyback speed
function changeSpeed() {
  video.playbackRate = this.value;
}

//fullscreen func
function openFullscreen() {
  if (video.requestFullscreen) {
    video.requestFullscreen();
  } else if (video.mozRequestFullScreen) {     video.mozRequestFullScreen();
  } else if (video.webkitRequestFullscreen) {
    video.webkitRequestFullscreen();
  } else if (video.msRequestFullscreen) {     video.msRequestFullscreen();
  }
}

// Detect press and action
function detectKeypress(e) {
	if(e.keyCode == 32) { //space
	  togglePlay();
	}
  else if(e.keyCode == 37) {  //left
    video.currentTime += parseFloat(leftKeySkip);
  }
  else if(e.keyCode == 38) {  //up
    var vol = video.volume + volumeUp;
    if(vol > 1) 
      vol = 1;
    video.volume = vol;
    volumeRng.value = video.volume;
  }
  else if(e.keyCode == 39) {  //right
    video.currentTime += parseFloat(rightKeySkip);
  }
  else if(e.keyCode == 40) {  //down
    var vol = video.volume + volumeDown;
    if(vol < 0) 
      vol = 0;
    video.volume = vol;
    volumeRng.value = video.volume;
  }
  else {
    return;
  }
}

//handler


//play/pause video
playBtn.addEventListener("click", togglePlay);
video.addEventListener("click", togglePlay);

//update btn on play/pause
video.addEventListener("play", updateBtn);
video.addEventListener("pause", updateBtn);

//updateTime and progress in every second
video.addEventListener("timeupdate", updateTime);
video.addEventListener("timeupdate", updateProgress);

//change volume on changing range
progressRng.addEventListener("change", changeProgress);

//change volume on changing range
volumeRng.addEventListener("change", changeVolume);

//change speed on changing range
speedRng.addEventListener("change", changeSpeed);

//skip video on click in any skip btn
skipButtons.forEach(btn => btn.addEventListener("click", skip));

//fullscreen video on click
fullScreenBtn.addEventListener("click", openFullscreen);

//Keypress happend
window.addEventListener("keydown", detectKeypress);