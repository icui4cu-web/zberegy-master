// function mySlickInit(){
  $('.steps-wrap').slick({
    dots: true,
    infinite: false,
    arrows: false,
    slidesToShow: 4,
    appendDots: '.steps-wrap',
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  });
// }
// if(window.innerWidth <= 992){
// }
// $(window).on('resize', function (){
//   mySlickInit()
// //   // $('.steps-wrap').slick({unslick})
// // }
// }) 
// // can be deleted: $(window).on...
// //   
// //   if(window.innerWidth < 992){
// //     mySlickInit()
// //   }