// glogal call for all collapse elem. "close" (document mouseup)
$(document).on('mouseup',function(e){
  let elsNav = $('.navbar-toggler, .header-nav'),
      elsSearch = $('.btn-search-toggler, .search-wrap'),
    elsSearchSortDrop = $('.site-dropdown, [data-dropdown-for]'),
      elsPromoVideo = $('.video-wrap, .play-video')
  if (!elsNav.is(e.target) && elsNav.has(e.target).length === 0){
    $('.navbar-collapse').collapse('hide')
  }
  if (!elsSearch.is(e.target) && elsSearch.has(e.target).length === 0){
    $('.search-wrap').removeClass('active')
  }
  if (!elsSearchSortDrop.is(e.target) && elsSearchSortDrop.has(e.target).length === 0){
    $('.site-dropdown').removeClass('active')
  }
  if (!elsPromoVideo.is(e.target) && elsPromoVideo.has(e.target).length === 0 && $('#video').length != 0) {
    $('.play-video').removeClass('play')
    $("#video").get(0).contentWindow.postMessage('{"event":"command","func":"' + 'pauseVideo' + '","args":""}', '*');
  }
})

// home page play-video
$('.play-video').on('click',function(e){
  // '?enablejsapi=1&version=3&playerapiid=ytplayer'
  let srcVid = $("#video").get(0).dataset.videoSrc + '?enablejsapi=1&controls=1'
  if(!$("#video").get(0).src.includes('&autoplay=1')){
    $("#video").get(0).src = srcVid + '&autoplay=1&start=0'
    this.classList.add("play")
  }else{
    // srcVid = srcVid.replace('&autoplay=1', '') // $("#video").get(0).src = srcVid
    if(!this.classList.contains('play')){
      this.classList.add("play")
      $("#video").get(0).contentWindow.postMessage('{"event":"command","func":"' + 'playVideo' + '","args":""}', '*');
    }else{
      this.classList.remove("play")
      $("#video").get(0).contentWindow.postMessage('{"event":"command","func":"' + 'pauseVideo' + '","args":""}', '*');
    }
  }
});


// lazy load 
var scrollTop = $(window).scrollTop() +  $(window).height()
$('[data-src]').each(function (){
  if(scrollTop >= $(this).offset().top){
    this.src = this.dataset.src
    this.removeAttribute('data-src')
  }
})
$(window).on('scroll', function(){
  var scrollTop = $(this).scrollTop() +  $(this).height()
  $('[data-src]').each(function (){
    if(scrollTop >= $(this).offset().top){
      this.src = this.dataset.src
      this.removeAttribute('data-src')
    }
  })
})

// cut text...
// $('.excerpt-text').each(function () {
$('.about-memorial').each(function () {
  // About Memorial ( cut text... )
  if ($(this).outerHeight() > 130) {
    $(this)[0].classList.add('excerpt-text', 'close')
      let btnExcerpt = document.createElement('button')
      btnExcerpt.classList.add('btn-excerpt')
      btnExcerpt.innerHTML +=
        '<span>Читати повністю</span><svg class="icon-brecket" width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 1.2403L8.77007 0L5 3.55414L1.22993 0L0 1.2403L5 6L10 1.2403Z" fill="currentColor"></path></svg>'

      $(this)[0].appendChild(btnExcerpt)
    }
})

// About-Memorial show excerpt text ( cut text... )
$('.about-memorial .btn-excerpt').on('click', function (e) {
  let excerptText = $(this)[0].parentNode
  if (excerptText.classList.contains('close')) {
    $(this).children('span').text('Згорнути текст')
  } else {
    $(this).children('span').text('Читати повністю')
  }
  $(this)[0].classList.toggle('open')
  $(this)[0].parentNode.classList.toggle('close')
})

// btn-copy pay data
$('.btn-copy').on('click', function () {
  const thisCopyText = this.parentNode.querySelector('.copy-data').innerText;
  // copy
  navigator.clipboard.writeText(thisCopyText);
  // tooltipe info
  this.dataset.title = 'Скопійовано: ' + thisCopyText
  setTimeout(function(){
    this.dataset.title = 'Копіювати'
  }.bind(this), 3000);
})
// btn-copy share link post
if ($('[data-news-copy]')[0]){ $('[data-news-copy]')[0].dataset.newsCopy = window.location.href}
if ($('.share-links-modal .more-item')){
  $('.share-links-modal .more-item').on('click', function(){
    this.classList.toggle('more-item')
  })
}

$('[data-news-copy]').on('click', function () {
  // copy
  navigator.clipboard.writeText(this.dataset.newsCopy);
  this.dataset.title = 'Скопійовано посилання на цю сторінку'
  setTimeout(function(){
    this.dataset.title = 'Копіювати'
  }.bind(this), 3000);
})

$('.btn-copy').on('click', function () {
  const thisCopyText = this.parentNode.querySelector('.copy-data').innerText;
  // copy
  navigator.clipboard.writeText(thisCopyText);
  // tooltipe info
  this.dataset.title = 'Скопійовано: ' + thisCopyText
  setTimeout(function(){
    this.dataset.title = 'Копіювати'
  }.bind(this), 3000);
})

// Protection Against Double Acting Tabs Memorial
$('[href^=#pills]').on('click', function () {
  $('[href^=#pills]').each(function () {
    this.style.pointerEvents = 'none'
  })
  setTimeout(() => {
    $('[href^=#pills]').each(function () {
      this.style.pointerEvents = 'auto'
    })
  }, 500);
})