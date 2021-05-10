/* script.js */
let error = false, firstPage = true, fading = true;

$("#nav-main").on("click", function() { setPage("main"); });
$("#nav-story").on("click", function() { setPage("story"); });
$("#nav-game").on("click", function() { setPage("game"); });
$("#nav-chars").on("click", function() { setPage("chars"); });
$("#nav-gallery").on("click", function() { setPage("gallery"); });
$("#nav-contact").on("click", function() { setPage("contact"); });
getPage();

function setPage(page) {
  if (!fading) {
    switch(page) {
      case ("main"):    { document.location.hash = "main"; break; }
      case ("story"):   { document.location.hash = "story"; break; }
      case ("game"):    { document.location.hash = "gameplay"; break; }
      case ("chars"):   { document.location.hash = "characters"; break; }
      case ("gallery"): { document.location.hash = "gallery"; break; }
      case ("contact"): { document.location.hash = "contact"; break; }
      default: { document.location.hash = ""; }
    }
    getPage();
  }
}

function getPage() {
  switch(document.location.hash) {
    case ("#main"):        { href = "./pages/main.htm"; setTitle("Main | Infinite Alice"); break; }
    case ("#story"):       { href = "./pages/story.htm"; setTitle("Story | Infinite Alice"); break; }
    case ("#gameplay"):    { href = "./pages/gameplay.htm"; setTitle("Gameplay | Infinite Alice"); break; }
    case ("#characters"):  { href = "./pages/characters.htm"; setTitle("Characters | Infinite Alice"); break; }
    case ("#gallery"):     { href = "./pages/gallery.htm"; setTitle("Gallery | Infinite Alice"); break; }
    case ("#contact"):     { href = "./pages/contact.htm"; setTitle("Contact | Infinite Alice"); break; }
    default: { href = "./pages/main.htm"; setTitle("Main | Infinite Alice"); }
  }
  let request = new XMLHttpRequest();
  request.open('GET', href);
  request.send();
  request.onload = function() {
    error = false;
    let data = request.responseText;
    let div = $("#main-body");
    if (firstPage) {
      div.html("" + data);
      div.addClass("fadein");
      div.one("animationend", function() { $("#main-body").removeClass("fadein"); fading = false; });
    }
    else {
      div.addClass("fadeout");
      fading = true;
      div.one("animationend", function() { newPage(data); });
    }
  }
  request.onloadend = function() {
    if(request.status === 404) {
      error = true;
      setTitle("404 | Infinite Alice");
      if (firstPage) {
        let div = $("#main-body");
        let content = '<header><h1>404 Error</h1></header><main><article><section><div class="seg"><div class="text"><h2>Page not found.</h2></div></div></section></article></main>';
        div.html("" + content);
      }
    }
    if (firstPage) { firstPage = false; }
  }
}

function newPage(data) {
  let div = $("#main-body");
  if (error) {
    data = '<header><h1>404 Error</h1></header><main><article><section><div class="seg"><div class="text"><h2>Page not found.</h2></div></div></section></article></main>';
  }
  div.html("" + data);
  div.removeClass("fadeout");
  div.addClass("fadein");
  div.one("animationend", function() { $("#main-body").removeClass("fadein"); fading = false; });
}

function setTitle(title) {
  document.title = title;
}
