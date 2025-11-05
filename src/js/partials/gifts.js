// Go to the Gift button
$('.btn-goto-add-gift').on('click', function () {
  $('html, body').animate({ scrollTop: $('.memorial-sidebar .btn-add-gift').offset().top - $('#header').outerHeight() - 150 }, 500);
})

// calculation of gifts, imitation of adding a new gift
let giftsCounter = 0;
function giftsCount() {
  giftsCounter++;
  $('#gifts-count')[0].dataset.giftsCount = giftsCounter
}

function newImg(src) {
  let giftImg = new Image
  giftImg.src = src
  return giftImg
}
$('#giftsModal .gift-img').on('click', function () {
  let giftWrap = document.createElement('div'),
    thisSrc = $(this).children('img')[0].src
  // delete the third last gift to start a new gift
  if ($('.memorial-sidebar .gift-no').length === 0 & $('.memorial-sidebar .gift-img').length === 3) {
    $('.memorial-sidebar .gift-img')[2].remove()
  }
  giftWrap.classList.add('gift-img')
  giftWrap.append(newImg(thisSrc))

  // add img gift to sidebar
  $('.memorial-sidebar .gifts-wrap').prepend(giftWrap)
  // add img gift to header memorial img
  $('.memorial-header .gift-wrap').html(newImg(thisSrc))

  // replace the gray icon with a gift
  if ($('.memorial-sidebar .gift-no').length) {
    $('.memorial-sidebar .gift-no')[0].remove()
  }
  
  // modal hide
  $('#giftsModal').modal('hide')

  // appdate count on sidebar
  giftsCount()

})
