// slider accordion + images
$('.accordion-images-wrap').each(function () {
  let thisParent = $(this),
      type = thisParent.hasClass('revers-type') ? 'right': 'left';

  thisParent.find('[data-target^="#"]').on('click', function () {
    let thisDataset = this.dataset.target;
    
    thisParent.find('.accordion-img').each(function () {
      if (thisDataset === $(this)[0].dataset.img && !$(this)[0].classList.contains('active')) {
        thisParent.find('.accordion-img.active')[0].classList.remove('active')
        $(this)[0].classList.add('active')
      }
      accordionImg(type, thisParent, 0, 0);
    })
    // Smooth anchor scrolling
    if (window.innerWidth < 992) {
      // close accordion in second container
      $('.btn-accordion').not(this).each(function () {
        if (this.tagName === 'BUTTON') this.classList.add('collapsed');
      })
      $('.site-accordion .collapse').each(function () {
        if ('#' + this.id !== thisDataset) this.classList.remove('show');
      })
      // align active accordion to screen
      setTimeout(function () {
        let thisOffsetTop = $('button[data-target="' + this.dataset.target + '"]').offset().top - $('#header').outerHeight() - 20 
        thisParent.find('.collapse.show').length === 0
          ? $('html, body').animate({ scrollTop: $('.accordion-images-wrap').offset().top - $('#header').outerHeight() - 20 }, 300)
          : $('html, body').animate({ scrollTop: thisOffsetTop }, 300);
      }.bind(this), 500);
    }
  })
  accordionImg(type, thisParent, 0, 0);
});

function accordionImg(pos, thisParent, i, zi) {
  // pos = type left / rigpt img position
  thisParent.find('.accordion-img').each(function () {
    if ($(this)[0].classList.contains('active')) {
      $(this).css({ 'top': '0', [pos]: '0', 'z-index': '0' })
    } else {
      i += 2; zi++;
      $(this).css({ 'top': i + '0px', [pos]: i + '0px', 'z-index': '-' + zi })
    }
  })

  if (window.innerWidth < 992) {
    thisParent.find('.accordion-img').each(function () {
      let thisDataset = $(this)[0].dataset.img
      $(this).appendTo($(thisDataset + ' .card-body'))
    })
  }
  if (window.innerWidth > 992 && $('.card-body .accordion-img').length != 0) {
    thisParent.find('.accordion-img').each(function () {
      $(this).appendTo(thisParent.find('.images-wrap'))
    })
  }
}

/* show / hide #accordion 2 first elem */
if (window.innerWidth > 992 && $('#accordionCapabilities_2').length !== 0) {
  $('#accordionCapabilities_2 .btn-accordion')[0].classList.remove('collapsed');
  $('#accordionCapabilities_2 .btn-accordion')[0].setAttribute('aria-expanded', 'true');
  $('#accordionCapabilities_2 .collapse')[0].classList.add('show');
}

// update accordion
$(window).on('resize', function () {
  if ($('.accordion-images-wrap').length !== 0) {
    $('.accordion-images-wrap').each(function () {
      let thisParent = $(this),
        type = thisParent.hasClass('revers-type') ? 'right' : 'left';
      accordionImg(type, thisParent, 0, 0);
    });
  }
})