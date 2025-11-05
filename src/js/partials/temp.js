// // when there is no photo put the first letters
// function getFirstLetters(str) {
//   var firstLetters = str
//       .split(' ')
//       .map(function (word) {
//         return word[0];
//       })
//       .join('')
//       .substring(0, 2);
//   return firstLetters;
// }
// // Dropdown Header
// for (let i  = 0; i < $('.dropdown').length; i++) {
//   const dropImg = $('.dropdown')[i];
//   if($(dropImg).find('.img-wrap > img').length === 0){
//     $(dropImg).find('.img-wrap').html(getFirstLetters($(dropImg).find('.name').text()))
//   }
// }
// // Review Card
// for (let i  = 0; i < $('.review-card').length; i++) {
//   const dropImg = $('.review-card')[i];
//   if($(dropImg).find('.select-img > img').length === 0){
//     $(dropImg).find('.select-img').html(getFirstLetters($(dropImg).find('.user-name').text()))
//   }
// }

// // dropdown (all)
// $('.dropdown .dropdown-toggle').on('click', function () {
//   let thisDrop = "'."+$(this).parent('.dropdown').attr('class').split(' ').join('.')+"'"
//   $('.dropdown').not(thisDrop).removeClass('show')
//   $(this).parent('.dropdown').toggleClass('show')
// })
// // dropdown removeClass show if...
// $(document).on('mouseup',function (e) {
//   let elsDrop = $('.dropdown')
//   if (!elsDrop.is(e.target) && elsDrop.has(e.target).length === 0) {
//     $('.dropdown').removeClass('show')
//   }
// })

// // cusrom input type number (+)
// $('.quantity-up').on('click', function() {
//   var input = $(this).siblings('input[type="number"]'),
//   btnUp = $(this),
//   oldValue = parseFloat(input.val()),
//   max = input.attr('max');
//   if (oldValue >= max) {
//     var newVal = oldValue
//   } else {
//     var newVal = oldValue + 1
//   }
//   input.val(newVal)
//   input.trigger("change")
//   if($(this).hasClass('quantity-button-star')){
//     btnUp.siblings('.quantity-number').html(input.val())
//   }else{
//     btnUp.siblings('.quantity-number').html(input.val() + '<small class="month">'+ input.data('month-lang') +'</small>')
//   }
// });
// // cusrom input type number (-)
// $('.quantity-down').on('click', function() {
//   var input = $(this).siblings('input[type="number"]'),
//       btnDown = $(this),
//       oldValue = parseFloat(input.val()),
//       min = input.attr('min');
//   if (oldValue <= min) {
//     var newVal = oldValue
//   } else {
//     var newVal = oldValue - 1
//   }
//   input.val(newVal)
//   input.trigger("change")
//   if($(this).hasClass('quantity-button-star')){
//     btnDown.siblings('.quantity-number').html(input.val())
//   }else{
//     btnDown.siblings('.quantity-number').html(input.val() + '<small class="month">'+ input.data('month-lang') +'</small>')
//   }
// });

// // review menu
// $('.review-header .menu-toggle').on('click', function(){
//   $('.menu-review').not($(this).next('.menu-review')).addClass('hide')
//   $(this).next('.menu-review').toggleClass('hide')
//   $('.menu-toggle').not($(this)).removeClass('close')
//   $(this).toggleClass('close')
// })

// // filter review btn-s
// $('.filter-label').on('click', function(e){
//   e.preventDefault()
//   if($(this).prev('input').prop('checked') === false){
//     $(this).prev('input').prop('checked', true)
//   }else{
//     $(this).prev('input').prop('checked', false)
//   }
// })
