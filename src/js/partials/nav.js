// // Sticky Header
// $(window).scroll(function () {
//   stickyHeader(15)
// })

// $('.navbar-toggler').on('click', function () {
//   setTimeout(function() {
//     if($('.navbar-toggler').attr('aria-expanded') === 'true'){
//       $('.header').addClass('bg')
//       $('.header').addClass('lg-full-menu')
//     }else{
//       $('.header').removeClass('lg-full-menu')
//       if($(window).scrollTop() == 0){
//         $('.header').removeClass('bg')
//       }
//     }
//   }, 100);

// })

// header nav
function navScrollLock(isActive) {
	document.body.classList.toggle('nav-scroll-lock', isActive)
}

$('#headerMenu').on('show.bs.collapse', () => {
	const header = document.getElementById('header')

	header.style.setProperty('--header-height', `${header.offsetHeight}px`)
	navScrollLock(true)
});
$('#headerMenu').on('hide.bs.collapse', () => navScrollLock(false));

// footer nav
window.addEventListener("resize", function(){
  windowResz()
})

function windowResz(){
  if (window.innerWidth <= 1199){
    footerNavCollapse(true)
  }else{
    footerNavCollapse(false)
  }
}
windowResz()

function footerNavCollapse(e) {
  if(e === true){
    $('#footer .btn-drop').each(function(){
      $(this).removeClass('disabled').addClass('collapsed')
    })
    $('#footer .collapse').each(function(){
      $(this).removeClass('show')
    })
  }else{
    $('#footer .btn-drop').each(function(){
      $(this).addClass('disabled').removeClass('collapsed')
    })
    $('#footer .collapse').each(function(){
      $(this).addClass('show')
    })
  }
}

// function stickyHeader(toggleTop) {
//   const top = $(window).scrollTop()
//   if (top >= toggleTop) {
//     $('.header').addClass('bg')
//   } else {
//     $('.header').removeClass('bg')
//   }
// }
// stickyHeader(15)


// Smooth anchor scrolling
// let headerH = $('.header').height()
// $(document).on('click', 'a[href^="#"]', function (event) {
//   event.preventDefault();
//   $('html, body').animate({
//     scrollTop: $($.attr(this, 'href')).offset().top - headerH
//   }, 500);
// });


// Current Menu Item
// function currentMenuItem(){
$('a').each(function(){
  if (   this.href === window.location.href
      )
    this.classList.add('active')
})
// }
// currentMenuItem()