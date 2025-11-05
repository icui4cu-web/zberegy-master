if (document.location.href.indexOf('#post-gallery') >= 1) {
  $('.fancybox__button--close').trigger('click')
}
// gallery tab-2...
Fancybox.bind('[data-fancybox="post-gallery_1"], [data-fancybox="post-gallery_2"]', {
  // click: false,
  // dragToClose: false,
  // infinite: false,
  Image: {
    zoom: true,
    // fit: 'cover',
    // click: false,
    // wheel: 'slide',
  },
  Thumbs: {
    autoStart: false,
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

})
