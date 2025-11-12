/**
 * Копирует текст в буфер обмена
 * @param {string} text - Текст для копирования
 * @returns {Promise<boolean>}
 */
async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
	alert('Помилка копіювання');
    console.error(err);
    return false;
  }
}

/**
 * Инициализация кнопок копирования
 */
function initCopyButtons() {
  const updateTitle = (element, message, duration = 3000) => {
    const original = element.dataset.title || '';
    element.dataset.title = message;
    setTimeout(() => element.dataset.title = original, duration);
  };

  document.querySelectorAll('[data-copy-target]').forEach(btn => {
    btn.addEventListener('click', async function() {
      const target = document.getElementById(this.dataset.copyTarget);
      if (!target) {
        console.error(`Елемент з ID "${this.dataset.copyTarget}" не знайдено`);
        return;
      }
      
      const success = await copyToClipboard(target.innerText);
      if (success) {
        const message = this.dataset.copySuccess || 'Скопійовано: ' + target.innerText;
        updateTitle(this, message);
      }
    });
  });

  document.querySelectorAll('[data-location-copy]').forEach(btn => {
    btn.addEventListener('click', async function() {
      const success = await copyToClipboard(location.href);
      if (success) {
        updateTitle(this, 'Скопійовано посилання на цю сторінку');
      }
    });
  });
}

// glogal call for all collapse elem. "close" (document mouseup)
$(document).on('mouseup',function(e){
  let elsNav = $('.navbar-toggler, .header-nav'),
      elsSearch = $('.btn-search-toggler, .search-wrap'),
    elsSearchSortDrop = $('.site-dropdown, [data-dropdown-for]')
  if (!elsNav.is(e.target) && elsNav.has(e.target).length === 0){
    $('.navbar-collapse').collapse('hide')
  }
  if (!elsSearch.is(e.target) && elsSearch.has(e.target).length === 0){
    $('.search-wrap').removeClass('active')
  }
  if (!elsSearchSortDrop.is(e.target) && elsSearchSortDrop.has(e.target).length === 0){
    $('.site-dropdown').removeClass('active')
  }
})

// home page play-video
$('.play-video').on('click', function(e) {
	const component = this.closest('.video-wrap')
	const iframe = component.querySelector('iframe')

	if(!iframe) return

    iframe.src = iframe.dataset.videoSrc + '?controls=1&autoplay=1';
	iframe.classList.remove('invisible')
    this.classList.add("play");
});

// cut text...
// $('.excerpt-text').each(function () {
$('.about-memorial').each(function () {
  // About Memorial ( cut text... )
  if ($(this).outerHeight() > 130) {
    $(this)[0].classList.add('excerpt-text', 'close')
      let btnExcerpt = document.createElement('button')
      btnExcerpt.classList.add('btn-excerpt')
      btnExcerpt.innerHTML +=
        '<span>Читати повністю</span><svg class="icon-brecket ico" width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 1.2403L8.77007 0L5 3.55414L1.22993 0L0 1.2403L5 6L10 1.2403Z" fill="currentColor"></path></svg>'

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

initCopyButtons()