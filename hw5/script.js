/* script.js */
let vw, vh;

const body = document.querySelector("body");
const gen = document.getElementById('generated');
const text = document.querySelector("h1");
const img = document.createElement("img");
vw = document.body.clientWidth;
vh = document.body.clientHeight;

body.addEventListener('click', generate);
gen.appendChild(img);

window.onload = generate; //Generate picture & text immediately after page loads
window.onresize = resize; //To resize text when window is resized

/* Sets img src to a random picture from an API because I didn't want
   to make a library; the reason for the randomness is because requesting
   a picture of the same size as before returns the same picture */
function generate() {
  let iw = vw+irandom(-50,50);
  let ih = vh+irandom(-50,50);
  //Using a random picture API because I didn't want to make a library
  img.src = "https://picsum.photos/"+iw+"/"+ih+"?grayscale";
  request();
  console.log("Generated with w: "+iw+" and h: "+ih);
}

function resize() {
  vw = document.body.clientWidth;
  vh = document.body.clientHeight;
  console.log("Window resized");
  resizeText();
}

/* Sends a GET request to a random word API (used for the same reason as above)
   Response data is parsed and applied to text */
function request() {
  var rq = new XMLHttpRequest();
  let num = 1 //Math.floor(vh/10);
  rq.open("GET", "https://random-word-api.herokuapp.com/word?number="+num+"&swear=1", true);
  rq.onload = function() {
    text.textContent = "";
    var words = JSON.parse(this.response);
    words.forEach((word) => { text.textContent = text.textContent + " " + word });
    resizeText();
    console.log("Generated words: "+words);
  }
  rq.send();
}

/* A recursive function that shrinks the text until the div width is less
   than the viewport width - 50 */
function resizeText() {
  var fs = 21;
  resizing();
  function resizing() {
    fs--;
    gen.style.fontSize = fs + "vh";
  	if (gen.offsetWidth >= vw - 50) {
      resizing();
    }
  }
}

//Random integer function
function irandom(min, max) {
  return Math.floor(Math.random()*(max-min))+min;
}
