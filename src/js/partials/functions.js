// functions
function scrollToEl(e) {
  $('html, body').animate({
    scrollTop: e.offset().top - $('#header').outerHeight() - 150
  }, 500);
}