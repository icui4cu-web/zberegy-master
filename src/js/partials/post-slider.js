$('.post-slider').slick({
  dots: false,
  infinite: false,
  arrows: true,
  slidesToShow: 3,
  prevArrow: '<div class="post-slider-prev"><svg class="ico" width="30" height="12" viewBox="0 0 30 12" fill="none" xmlns="http://www.w3.org/2000/svg" ><path d="M5.48611 11.4038C5.6438 11.4038 5.8015 11.3442 5.92073 11.2231C6.16111 10.9827 6.16111 10.5923 5.92073 10.3519L1.12843 5.55962C0.888049 5.31924 0.497668 5.31924 0.257284 5.55962C0.0169001 5.80001 0.0169001 6.19039 0.257284 6.43077L5.04957 11.2231C5.17073 11.3442 5.32842 11.4038 5.48611 11.4038Z" fill="#323232"/><path d="M0.693782 6.61154H29.3092C29.6496 6.61154 29.9246 6.33654 29.9246 5.99615C29.9246 5.65577 29.6496 5.38077 29.3092 5.38077H2.18032L5.91494 1.64615C6.15532 1.40577 6.15532 1.01538 5.91494 0.775C5.67455 0.534615 5.28417 0.534615 5.04378 0.775L0.257244 5.56154C0.0803209 5.73846 0.0283974 6.00192 0.124551 6.23269C0.220705 6.46154 0.445705 6.61154 0.693782 6.61154V6.61154Z" fill="#323232"/></svg></div >',
  nextArrow: '<div class="post-slider-next"><svg class="ico" width="30" height="12" viewBox="0 0 30 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M24.5154 11.4038C24.3577 11.4038 24.2 11.3442 24.0807 11.2231C23.8404 10.9827 23.8404 10.5923 24.0807 10.3519L28.873 5.55962C29.1134 5.31924 29.5038 5.31924 29.7442 5.55962C29.9846 5.80001 29.9846 6.19039 29.7442 6.43077L24.9519 11.2231C24.8307 11.3442 24.673 11.4038 24.5154 11.4038Z" fill="#323232"/><path d="M29.3077 6.61154H0.692289C0.351904 6.61154 0.0769043 6.33654 0.0769043 5.99615C0.0769043 5.65577 0.351904 5.38077 0.692289 5.38077H27.8211L24.0865 1.64615C23.8461 1.40577 23.8461 1.01538 24.0865 0.775C24.3269 0.534615 24.7173 0.534615 24.9577 0.775L29.7442 5.56154C29.9211 5.73846 29.9731 6.00192 29.8769 6.23269C29.7808 6.46154 29.5558 6.61154 29.3077 6.61154V6.61154Z" fill="#323232"/></svg></div>',
  appendArrows: '.post-slider-wrap',
  responsive: [
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 2,
        arrows: false,
        dots: true,
        appendDots: '.post-slider-dots',
      }
    },
    {
      breakpoint: 768,
      settings: {
        arrows: false,
        dots: true,
        slidesToShow: 1,
        appendDots: '.post-slider-dots',
      }
    }
  ]
});
// setTimeout(() => {
$('.post-slider-dots .slick-dots').slick({
  dots: false,
  infinite: false,
  arrows: false,
  slidesToShow: 4,
  slidesToScroll: 1,
  asNavFor: '.post-slider',
  centerMode: true,
});
// }, 3000);