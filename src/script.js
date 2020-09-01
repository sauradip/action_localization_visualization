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

const gt = document.querySelector(".gt-bar");
const pred = document.querySelector(".pred-bar");

const input_gt = document.getElementById('myInput')
const input_pred = document.getElementById('myPred')
const input_vid = document.getElementById('myVideo')
const input = document.querySelector('input')
const textarea = document.querySelector('textarea') 
// var txt = document.getElementById("myPred").files[0];

const tag_1 = document.querySelector('.chip--primary');
const tag_2 = document.querySelector('.chip--alert');
const tag_3 = document.querySelector('.chip--alternative');
const option_val = document.getElementById("cars");
const link_vid = document.getElementById("vid_link");
// 

var mapping ={
  "Ambiguous" : 0,
 "BaseballPitch" : 1,
 "BasketballDunk" : 2,
"Billiards":3,
"CleanAndJerk" : 4 ,
"CliffDiving" : 5,
"CricketBowling" : 6,
"CricketShot" : 7,
"Diving" : 8,
"FrisbeeCatch" : 9,
"GolfSwing" : 10,
"HammerThrow" : 11,
"HighJump" : 12,
"JavelinThrow" : 13,
"LongJump" : 14,
"PoleVault" : 15,
"Shotput" : 16,
"SoccerPenalty" : 17,
"TennisSwing" : 18,
"ThrowDiscus" : 19,
"VolleyballSpiking" : 20
}

var coloring = {
  "0": '#8f1e4f',
  "1" : '#976d75',
  "2" : '#326ff7',
  "3" : '#a66306',
  "4" : '#b2e94c',
  "5" : '#ac22ff',
  "6" : '#c9e830',
  "7" : '#cacac0',
  "8" : '#bdbee4',
  "9" : '#361dca',
  "10" : '#222846',
  "11" : '#ac0bc2',
  "12" : '#e856ed',
  "13" : '#92e14f',
  "14" : '#7bca96',
  "15" : '#d82f40',
  "16" : '#fedd78',
  "17" : '#9f270f',
  "18" : '#168a23',
  "19" : '#bf3113',
  "20" : '#1c16c6'
}

function getKeyByValue(object, value) {
  return Object.keys(object).find(key => object[key] === value);
}


var dur = video.duration;
var start_time =[];
var end_time =[];
var label = [];
var gt_seg = [];
var color_list="linear-gradient(90deg";
var color_list_pred = "linear-gradient(90deg";

input_vid.addEventListener('change',() => {
  let files = input_vid.files; 
  const file = files[0]; 
  video.pause();
  video.setAttribute('src', "../video/"+file.name);
  video.load();
  //videocontainer.setAttribute('poster', newposter); //Changes video poster image
  video.play();
  // console.log("Video Input")
  // console.log()
  // link_vid.src = 
  // console.log(file.name)
})


// read text file
input_gt.addEventListener('change', () => { 
  let files = input_gt.files; 
  const file = files[0]; 
  let reader = new FileReader(); 
  var start_prcnt = [];
  var end_prcnt = [];
  // console.log(file)

  reader.onload = (e) => { 
      
      
      const file = e.target.result; 
      
      // This is a regular expression to identify carriage  
      // Returns and line breaks 
      const lines = file.split(/\r\n|\n/); 
      start_time =[];
      end_time =[];
      label = [];
      gt_seg = [];
      pred_seg = []
      // var seg_time = 0;
      // ************** Use this to parse the segments ****************
      // lines = list of all the lines in .txt
      for (i = 0; i < lines.length; i++) {
        splitted = lines[i].split(" ")
        start_time.push(splitted[0])
        end_time.push(splitted[1])
        // if (splitted[2] == 'HighJump') 
        //   id = 1;
        // else 
        //   id = 0;
        var id = mapping[splitted[2]] 
        label.push(id)
        // console.log(start_time)
        // console.log(end_time)
        // seg_time = (parseFloat(splitted[1]) - parseFloat(splitted[0]))/152
      }
      var lab_no = label.filter(function(itm, i, label) {
        return i == label.indexOf(itm);
      });
      // console.log(coloring[lab_no[]])
      var tmp = '';
      for (j=0;j<label.length;j++){
        var strt = (start_time[j] / video.duration) * 100;
        if (j < label.length - 1){
          var nxt_strt = (start_time[j+1] / video.duration) * 100;
        }
        else {
          var nxt_strt = 100;
        }

        var end = (end_time[j] / video.duration) * 100;
        // if (lab_no.length == 2) {
        //   if (label[j]==0){
        //     var clr = 'yellow'
        //   }
        //   else {
        //     var clr = 'orange'
        //   }
        // } else {
        //   var clr= 'blue'
        // }


        // generate tag names
        
        var clr = coloring[label[j]];
        
        
        if (Math.floor(strt) > 0) {
          var str_filler = ', white 0% '+ Math.floor(strt) + '%';
          var str_lst = ', '+clr + ' ' + Math.floor(strt) + '%' + ' ' + Math.floor(end) + '%';
        // fill_lst : for marking in between segments 
          var fill_lst = ', '+'white' +' ' + Math.floor(end) + '%' + ' ' + Math.floor(nxt_strt) + '%';
        } else {
          var str_filler = "";
          var str_lst = ', '+clr + ' ' + Math.floor(strt) + '%' + ' ' + Math.floor(end) + '%';
        // fill_lst : for marking in between segments 
          var fill_lst = ', '+'white' +' ' + Math.floor(end) + '%' + ' ' + Math.floor(nxt_strt) + '%';
        }
        //  str_lst : for marking the segments 
        var str_lst = ', '+clr + ' ' + Math.floor(strt) + '%' + ' ' + Math.floor(end) + '%';
        // fill_lst : for marking in between segments 
        var fill_lst = ', '+'white' +' ' + Math.floor(end) + '%' + ' ' + Math.floor(nxt_strt) + '%';
        tmp+=str_filler+str_lst+fill_lst;
        // console.log(tmp);

      } 
      color_list=color_list+tmp+')';

      // ##### generating class tags ######

      var count=0;
      for(x=0;x<lab_no.length;x++){
        count+=1
      }
      // console.log(coloring(lab_no[0]));
      if (count==1){
      tag_1.innerHTML = getKeyByValue(mapping,parseInt(lab_no[0]));
      tag_1.style.backgroundColor = coloring[lab_no[0]];
      tag_1.style.color = 'white';
      // console.log(coloring(lab_no[0]))
      tag_2.innerHTML = "";
      tag_2.remove()
      tag_3.innerHTML = "";
      tag_3.remove()
      } else if (count==2) {
        tag_1.innerHTML = getKeyByValue(mapping,parseInt(lab_no[0]));
        tag_1.style.backgroundColor = coloring[lab_no[0]];
        tag_1.style.color = 'white';
        tag_2.innerHTML = getKeyByValue(mapping,parseInt(lab_no[1]));
        tag_2.style.backgroundColor = coloring[lab_no[1]];
        tag_2.style.color = 'white';
        // console.log(coloring(lab_no[0]))
        tag_3.innerHTML = "";
        tag_3.remove()
      } else {
        tag_1.innerHTML = getKeyByValue(mapping,parseInt(lab_no[0]));
        tag_1.style.backgroundColor = coloring[lab_no[0]];
        tag_1.style.color = 'white';
        tag_2.innerHTML = getKeyByValue(mapping,parseInt(lab_no[1]));
        tag_2.style.backgroundColor = coloring[lab_no[1]];
        tag_2.style.color = 'white';
        tag_3.innerHTML = getKeyByValue(mapping,parseInt(lab_no[2]));  
        tag_3.style.backgroundColor = coloring[lab_no[2]];
        tag_3.style.color = 'white';
        // console.log(coloring(lab_no[0]))
      }
      // const fs = require('fs') 
  
      // // Reading data in utf-8 format 
      // // which is a type of character set. 
      // // Instead of 'utf-8' it can be  
      // // other character set also like 'ascii' 
      // fs.readFile('Input.txt', 'utf-8', (err, data) => { 
      //     if (err) throw err; 
        
      //     // Converting Raw Buffer to text 
      //     // data using tostring function. 
      //     console.log(data); 
      // }) 

      // var pred_line = txt; 
      // console.log(" ------- "+txt);

  }; 

  


  reader.onerror = (e) => alert(e.target.error.name); 

  reader.readAsText(file);

});

function create_tags(tag_id, mapping , label_no){
  tags = tag_+str(tag_id);
  tags.innerHTML = getKeyByValue(mapping,label_no);
  tags.style.backgroundColor = coloring[label_no];
  tags.style.color="white";
}

input_pred.addEventListener('change', () => { 
  let files1 = input_pred.files; 
  const file = files1[0]; 

  let reader = new FileReader(); 
  var start_prcnt = [];
  var end_prcnt = [];
  // console.log(file)

  reader.onload = (e) => { 
      
      
      const file = e.target.result; 
      
      // This is a regular expression to identify carriage  
      // Returns and line breaks 
      const lines = file.split(/\r\n|\n/); 
      start_time =[];
      end_time =[];
      label = [];
      gt_seg = [];
      pred_seg = []
      // var seg_time = 0;
      // ************** Use this to parse the segments ****************
      // lines = list of all the lines in .txt
      for (i = 0; i < lines.length; i++) {
        splitted = lines[i].split(" ")
        start_time.push(splitted[0])
        end_time.push(splitted[1])
        // if (splitted[2] == 'HighJump') 
        //   id = 1;
        // else 
        //   id = 0;
        var id = mapping[splitted[2]] 
        label.push(id)
        // console.log(start_time)
        // console.log(end_time)
        // seg_time = (parseFloat(splitted[1]) - parseFloat(splitted[0]))/152
      }
      var lab_no = label.filter(function(itm, i, label) {
        return i == label.indexOf(itm);
      });
      // console.log(coloring[lab_no[]])
      var tmp = '';
      for (j=0;j<label.length;j++){
        var strt = (start_time[j] / video.duration) * 100;
        if (j < label.length - 1){
          var nxt_strt = (start_time[j+1] / video.duration) * 100;
        }
        else {
          var nxt_strt = 100;
        }

        var end = (end_time[j] / video.duration) * 100;
        // if (lab_no.length == 2) {
        //   if (label[j]==0){
        //     var clr = 'yellow'
        //   }
        //   else {
        //     var clr = 'orange'
        //   }
        // } else {
        //   var clr= 'blue'
        // }


        // generate tag names
        
        var clr = coloring[label[j]];
        
        
        if (Math.floor(strt) > 0) {
          var str_filler = ', white 0% '+ strt + '%';
          var str_lst = ', '+clr + ' ' + strt + '%' + ' ' + end + '%';
        // fill_lst : for marking in between segments 
          var fill_lst = ', '+'white' +' ' + end + '%' + ' ' + nxt_strt + '%';
        } else {
          var str_filler = "";
          var str_lst = ', '+clr + ' ' + strt + '%' + ' ' + end + '%';
        // fill_lst : for marking in between segments 
          var fill_lst = ', '+'white' +' ' + end + '%' + ' ' + nxt_strt + '%';
        }
        //  str_lst : for marking the segments 
        var str_lst = ', '+clr + ' ' + strt + '%' + ' ' + end + '%';
        // fill_lst : for marking in between segments 
        var fill_lst = ', '+'white' +' ' + end + '%' + ' ' + nxt_strt + '%';
        tmp+=str_filler+str_lst+fill_lst;
        // console.log(tmp);

      } 
      color_list_pred=color_list_pred+tmp+')';
      console.log(color_list_pred)

      // ##### generating class tags ######

      var count=0;
      for(x=0;x<lab_no.length;x++){
        count+=1
      }
      // console.log(coloring(lab_no[0]));
      // innerHTML = the class , backgroundColor = color of the tag based on the class , color = font color of tag
      if (count==1){
      tag_1.innerHTML = getKeyByValue(mapping,parseInt(lab_no[0]));
      tag_1.style.backgroundColor = coloring[lab_no[0]];
      tag_1.style.color = 'white';
      // console.log(coloring(lab_no[0]))
      tag_2.innerHTML = "";
      tag_2.remove()
      tag_3.innerHTML = "";
      tag_3.remove()
      } else if (count==2) {
        tag_1.innerHTML = getKeyByValue(mapping,parseInt(lab_no[0]));
        tag_1.style.backgroundColor = coloring[lab_no[0]];
        tag_1.style.color = 'white';
        tag_2.innerHTML = getKeyByValue(mapping,parseInt(lab_no[1]));
        tag_2.style.backgroundColor = coloring[lab_no[1]];
        tag_2.style.color = 'white';
        // console.log(coloring(lab_no[0]))
        tag_3.innerHTML = "";
        tag_3.remove()
      } else {
        tag_1.innerHTML = getKeyByValue(mapping,parseInt(lab_no[0]));
        tag_1.style.backgroundColor = coloring[lab_no[0]];
        tag_1.style.color = 'white';
        tag_2.innerHTML = getKeyByValue(mapping,parseInt(lab_no[1]));
        tag_2.style.backgroundColor = coloring[lab_no[1]];
        tag_2.style.color = 'white';
        tag_3.innerHTML = getKeyByValue(mapping,parseInt(lab_no[2]));  
        tag_3.style.backgroundColor = coloring[lab_no[2]];
        tag_3.style.color = 'white';
        // console.log(coloring(lab_no[0]))
      }
      // const fs = require('fs') 
  
      // // Reading data in utf-8 format 
      // // which is a type of character set. 
      // // Instead of 'utf-8' it can be  
      // // other character set also like 'ascii' 
      // fs.readFile('Input.txt', 'utf-8', (err, data) => { 
      //     if (err) throw err; 
        
      //     // Converting Raw Buffer to text 
      //     // data using tostring function. 
      //     console.log(data); 
      // }) 

      // var pred_line = txt; 
      // console.log(" ------- "+txt);
      // console.log(color_list_pred)

  }; 

  


  reader.onerror = (e) => alert(e.target.error.name); 

  reader.readAsText(file);

});

// input.addEventListener('change', () => { 
//   let files = input.files; 

//   if (files.length == 0) return; 

//   /* If any further modifications have to be made on the 
//      Extracted text. The text can be accessed using the  
//      file variable. But since this is const, it is a read  
//      only variable, hence immutable. To make any changes,  
//      changing const to var, here and In the reader.onload  
//      function would be advisible */
//   const file = files[0]; 

//   let reader = new FileReader(); 
//   var start_prcnt = [];
//   var end_prcnt = [];
//   // console.log(file)

//   reader.onload = (e) => { 
      
      
//       const file = e.target.result; 
      
//       // This is a regular expression to identify carriage  
//       // Returns and line breaks 
//       const lines = file.split(/\r\n|\n/); 
//       start_time =[];
//       end_time =[];
//       label = [];
//       gt_seg = [];
//       pred_seg = []
//       // var seg_time = 0;
//       // ************** Use this to parse the segments ****************
//       // lines = list of all the lines in .txt
//       for (i = 0; i < lines.length; i++) {
//         splitted = lines[i].split(" ")
//         start_time.push(splitted[0])
//         end_time.push(splitted[1])
//         // if (splitted[2] == 'HighJump') 
//         //   id = 1;
//         // else 
//         //   id = 0;
//         var id = mapping[splitted[2]] 
//         label.push(id)
//         // console.log(start_time)
//         // console.log(end_time)
//         // seg_time = (parseFloat(splitted[1]) - parseFloat(splitted[0]))/152
//       }
//       var lab_no = label.filter(function(itm, i, label) {
//         return i == label.indexOf(itm);
//       });
//       // console.log(coloring[lab_no[]])
//       var tmp = '';
//       for (j=0;j<label.length;j++){
//         var strt = (start_time[j] / video.duration) * 100;
//         if (j < label.length - 1){
//           var nxt_strt = (start_time[j+1] / video.duration) * 100;
//         }
//         else {
//           var nxt_strt = 100;
//         }

//         var end = (end_time[j] / video.duration) * 100;
//         // if (lab_no.length == 2) {
//         //   if (label[j]==0){
//         //     var clr = 'yellow'
//         //   }
//         //   else {
//         //     var clr = 'orange'
//         //   }
//         // } else {
//         //   var clr= 'blue'
//         // }


//         // generate tag names
        
//         var clr = coloring[label[j]];
        
        
//         if (Math.floor(strt) > 0) {
//           var str_filler = ', white 0% '+ Math.floor(strt) + '%';
//           var str_lst = ', '+clr + ' ' + Math.floor(strt) + '%' + ' ' + Math.floor(end) + '%';
//         // fill_lst : for marking in between segments 
//           var fill_lst = ', '+'white' +' ' + Math.floor(end) + '%' + ' ' + Math.floor(nxt_strt) + '%';
//         } else {
//           var str_filler = "";
//           var str_lst = ', '+clr + ' ' + Math.floor(strt) + '%' + ' ' + Math.floor(end) + '%';
//         // fill_lst : for marking in between segments 
//           var fill_lst = ', '+'white' +' ' + Math.floor(end) + '%' + ' ' + Math.floor(nxt_strt) + '%';
//         }
//         //  str_lst : for marking the segments 
//         var str_lst = ', '+clr + ' ' + Math.floor(strt) + '%' + ' ' + Math.floor(end) + '%';
//         // fill_lst : for marking in between segments 
//         var fill_lst = ', '+'white' +' ' + Math.floor(end) + '%' + ' ' + Math.floor(nxt_strt) + '%';
//         tmp+=str_filler+str_lst+fill_lst;
//         // console.log(tmp);

//       } 
//       color_list=color_list+tmp+')';

//       // ##### generating class tags ######

//       var count=0;
//       for(x=0;x<lab_no.length;x++){
//         count+=1
//       }
//       // console.log(coloring(lab_no[0]));
//       if (count==1){
//       tag_1.innerHTML = getKeyByValue(mapping,parseInt(lab_no[0]));
//       tag_1.style.backgroundColor = coloring[lab_no[0]];
//       tag_1.style.color = 'white';
//       // console.log(coloring(lab_no[0]))
//       tag_2.innerHTML = "";
//       tag_3.innerHTML = "";
//       } else if (count==2) {
//         tag_1.innerHTML = getKeyByValue(mapping,parseInt(lab_no[0]));
//         tag_1.style.backgroundColor = coloring[lab_no[0]];
//         tag_1.style.color = 'white';
//         tag_2.innerHTML = getKeyByValue(mapping,parseInt(lab_no[1]));
//         tag_2.style.backgroundColor = coloring[lab_no[1]];
//         tag_2.style.color = 'white';
//         // console.log(coloring(lab_no[0]))
//         tag_3.innerHTML = "";
//       } else {
//         tag_1.innerHTML = getKeyByValue(mapping,parseInt(lab_no[0]));
//         tag_1.style.backgroundColor = coloring[lab_no[0]];
//         tag_1.style.color = 'white';
//         tag_2.innerHTML = getKeyByValue(mapping,parseInt(lab_no[1]));
//         tag_2.style.backgroundColor = coloring[lab_no[1]];
//         tag_2.style.color = 'white';
//         tag_3.innerHTML = getKeyByValue(mapping,parseInt(lab_no[2]));  
//         tag_3.style.backgroundColor = coloring[lab_no[2]];
//         tag_3.style.color = 'white';
//         // console.log(coloring(lab_no[0]))
//       }
//       // const fs = require('fs') 
  
//       // // Reading data in utf-8 format 
//       // // which is a type of character set. 
//       // // Instead of 'utf-8' it can be  
//       // // other character set also like 'ascii' 
//       // fs.readFile('Input.txt', 'utf-8', (err, data) => { 
//       //     if (err) throw err; 
        
//       //     // Converting Raw Buffer to text 
//       //     // data using tostring function. 
//       //     console.log(data); 
//       // }) 

//       // var pred_line = txt; 
//       // console.log(" ------- "+txt);

//   }; 

  


//   reader.onerror = (e) => alert(e.target.error.name); 

//   reader.readAsText(file); 
// }); 





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

// TO DO : Make the percentage tab dynamic 
// get the number of classes from txt file








//update Progressbar
function updateProgress() {

  var percent = (video.currentTime / video.duration) * 100;
  progressRng.value = percent;
  // console.log(label)
  // console.log(color_list)
  gt.style.backgroundImage = color_list;
  gt.style.border = "thin dotted red"
  pred.style.backgroundImage = color_list_pred;
  pred.style.border = "thin dotted black"
  // progressRng.style.backgroundImage = 'linear-gradient(90deg, yellow)';
//   if (percent <= 50 && percent > 0) {
//     // window.alert("Reached 50")
//     // progressRng.style.backgroundColor = 'linear-gradient(90deg, yellow 50%, red 50%)';
//     // progressRng.style.backgroundImage = 'linear-gradient(90deg, yellow 50%)';
//     pred.style.backgroundImage = 'linear-gradient(90deg, blue 50%)';
//     gt.style.backgroundImage = 'linear-gradient(90deg, blue 25%)';
//     // progressRng.style.backgroundImage = 'linear-gradient(90deg, yellow 0% 50%, red 50% 75%, pink 75% 100%)';
// } else if (percent <= 75 && percent > 50) {
// // progressRng.textContent = progressRng.style.backgroundColor + ";";
// // progressRng.style.backgroundColor = 'yellow';
//   // progressRng.style.backgroundImage = 'linear-gradient(90deg, yellow 0% 50%, red 50% 75%)';
//   pred.style.backgroundImage = 'linear-gradient(90deg, blue 0% '+ Math.floor(percent)+'% , red 50% 75%)';
//   gt.style.backgroundImage = 'linear-gradient(90deg, blue 0% 25%, red 25% 80%)';
// } else {
//   // progressRng.style.backgroundImage = 'linear-gradient(90deg, yellow 0% 50%, red 50% 75%, pink 75% 100%)';
//   pred.style.backgroundImage = 'linear-gradient(90deg, blue 0% 50%, red 50% 75%, blue 75% 100%)';
//   gt.style.backgroundImage = 'linear-gradient(90deg, blue 0% 25%, red 25% 80%, blue 80% 100%)';
// }

  // progressRng.style.backgroundImage = 'linear-gradient(90deg, yellow)';
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
