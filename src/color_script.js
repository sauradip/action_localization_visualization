const progressRng = document.querySelector(".progressRng");
const video = document.querySelector(".video");

//update Progressbar
function updateProgress() {
    var percent = (video.currentTime / video.duration) * 100;
    progressRng.value = percent;
    if (percent > 50) {
        progressRng.style.backgroundColor = #fff ;
    }
  }
  
//change video progress time
function changeProgress() {
    var progressTime = (this.value / 100) * video.duration;
    video.currentTime = progressTime;
}


//updateTime and progress in every second
video.addEventListener("timeupdate", updateTime);
video.addEventListener("timeupdate", updateProgress);