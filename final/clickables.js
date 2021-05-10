/* clickables.js */
// Clicking on clickable images
$("body").on("click", ".clickable", function() {
  var modal = $("#modal");
  var modalImg = $("#modal-img");
  var modalCap = $("#modal-cap");
  modal.css("animation-name", "opacity-fade-in");
  modal.css("display", "block");
  modalImg.attr("src", $(this).parent().find("img").attr("src"));
  modalImg.css("animation-name", "zoom-in");
  modalCap.html($(this).parent().find("figcaption").html());
  modalCap.css("animation-name", "zoom-in");
});
// Clicking on profiles in the Characters page
$("body").on("click", ".char", function() {
  var modal = $("#modal-char");
  var img = $("#modal-char-img");
  var name = $("#modal-char-name");
  var quote = $("#modal-char-quote");
  var profile = $("#modal-char-profile");
  var main = $("#modal-char-main");
  let request = new XMLHttpRequest();
  let href = "characters/"+$(this).attr("id")+".htm";
  let data = "";
  request.open('GET', href);
  request.send();
  request.onload = function() {
    error = false;
    data = request.responseText;
  }
  request.onloadend = function() {
    if(request.status === 404) {
      error = true;
    }
    if (error) {
      data = '<span class="char-return">&larr;</span><article><section><h1>404 Error</h1><div class="seg"><div class="text"><h2>Page not found.</h2></div></div></section></article>';
    }
    modal.html("" + data);
    modal.css("animation-name", "opacity-fade-in");
    modal.css("display", "block");
  }
});
// Clicking on gallery images
$("body").on("click", ".gallery-img", function() {
  var modal = $("#modal");
  var modalImg = $("#modal-img");
  var modalCap = $("#modal-cap");
  modal.css("animation-name", "opacity-fade-in");
  modal.css("display", "block");
  modalImg.attr("src", $(this).css("background-image").replace(/^url\(['"](.+)['"]\)/, '$1'));
  modalImg.css("animation-name", "zoom-in");
  modalCap.html($(this).attr("alt"));
  modalCap.css("animation-name", "zoom-in");
});
// Clicking on the return arrow
$("body").on("click", ".return", function() {
  var modal = $("#modal");
  modal.css("animation-name", "opacity-fade-out");
  $("#modal-img").css("animation-name", "zoom-out");
  $("#modal-cap").css("animation-name", "zoom-out");
  modal.one("animationend", function() {
    modal.css("display", "none");
  });
});
// Clicking on the character profile return arrow
$("body").on("click", ".char-return", function() {
  var modalChar = $("#modal-char");
  modalChar.css("animation-name", "opacity-fade-out");
  modalChar.one("animationend", function() {
    modalChar.css("display", "none");
  });
});
