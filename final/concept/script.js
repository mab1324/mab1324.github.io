const slideMin = 0;
const slideMax = 1;
let slide = 0;

$("#prev").on("click", prevSlide);
$("#next").on("click", nextSlide);
getSlide();

function prevSlide() {
  if (slide > slideMin) { slide--; }
  getSlide();
}

function nextSlide() {
  if (slide < slideMax) { slide++; }
  getSlide();
}

function getSlide() {
  let request = new XMLHttpRequest();
  request.open('GET', 'https://./slides.json');
  request.responseType = 'json';
  request.send();
  request.onload = function() {
    let slideData = request.response;
    let data = slideData[slide];
    let div = $("#slides");
    div.html("");
    if (data.hasOwnProperty("title")) {
      div.append("<h1>"+data.title+"</h1>");
    }
    if (data.hasOwnProperty("subtitle")) {
      div.append("<h2>"+data.subtitle+"</h2>");
    }
    if (data.hasOwnProperty("header1")) {
      div.append("<h3>"+data.header1+"</h3>");
    }
    if (data.hasOwnProperty("items")) {
      let items = data.items;
      div.append("<ul>");
      for (i = 0; i < items.length; i++) {
        div.append("<li>"+items[0]+"</li>");
      }
      div.append("</ul>");
    }
  }
}
