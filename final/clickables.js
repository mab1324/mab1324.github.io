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
$("body").on("click", ".char", function() {
  var modal = $("#modal-char");
  modal.css("animation-name", "opacity-fade-in");
  modal.css("display", "block");
});
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
$("body").on("click", ".return", function() {
  var modal = $("#modal");
  var modalChar = $("#modal-char");
  modal.css("animation-name", "opacity-fade-out");
  modalChar.css("animation-name", "opacity-fade-out");
  $("#modal-img").css("animation-name", "zoom-out");
  $("#modal-cap").css("animation-name", "zoom-out");
  modal.one("animationend", function() {
    modal.css("display", "none");
  });
  modalChar.one("animationend", function() {
    modalChar.css("display", "none");
  });
});
