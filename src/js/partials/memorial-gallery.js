// avoid page reload errors
if (document.location.href.indexOf('#gallery') >= 1) {
  $('.fancybox__button--close').trigger('click')
}

// gallery tab-2...
Fancybox.bind('[data-fancybox="gallery"]', {
  click: false,
  dragToClose: false,
  // infinite: false,
  Image: {
    zoom: true,
    fit: 'cover',
    click: false,
    wheel: 'slide',
  },

  Toolbar: {
    display: [
      {
        id: 'counter',
        // position: "center",
      },
      // "zoom",
      // "slideshow",
      // "fullscreen",
      // "thumbs",
      'close',
    ],
  },

  on: {
    initLayout: function (fancybox) {
      // Create left column
      const $leftCol = document.createElement('div')
      $leftCol.classList.add('fancybox__leftCol')

      while (fancybox.$container.firstChild) {
        $leftCol.appendChild(fancybox.$container.firstChild)
      }
      // Create right column
      const $rightCol = document.createElement('div')
      $rightCol.classList.add('fancybox__rightCol')
      // Create comments-box
      const $comments = document.createElement('div')
      $rightCol.appendChild($comments)
      fancybox.$comments = $comments

      // Add elements to DOM
      fancybox.$container.appendChild(fancybox.$backdrop)

      fancybox.$container.appendChild($leftCol)
      fancybox.$container.appendChild($rightCol)

      fancybox.$leftCol = $leftCol
      fancybox.$rightCol = $rightCol
    },
    'Carousel.ready Carousel.change': function (
      fancybox,
      carousel,
      slideIndex
    ) {
      // Update comments-box
      // Get index of the current gallery item
      slideIndex =
        slideIndex === undefined ? carousel.options.initialPage : slideIndex
      // Get link related to current item
      const $trigger = fancybox.items[slideIndex].$trigger
      // Get data from `data-comments` attribute
      // const data = $trigger.dataset.comments || ''
      const data = $trigger.querySelector('.sidebar-img-comments').innerHTML || ''
      // Update comments
      fancybox.$comments.innerHTML = data
      $('.fancybox__container').addClass('active memorial-gallery')

      // SUBMIT 
      $('.form-comments-to-foto').each(function(){
        $(this).on('submit', function (e) {
          e.preventDefault();
          
        })
      })
      
    },
  },
})