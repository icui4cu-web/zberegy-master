// Dropdown Menu Bottom Form

$('[data-dropdown-for]').on('click', function () {
  $('[data-dropdown-id="' + this.dataset.dropdownFor + '"]').toggleClass('active').addClass('in-active')
})

$('.site-dropdown').on('click',function (e) {
  
  $('.site-dropdown.active').not($(this)).removeClass('active in-active')
  $(this).toggleClass('active').addClass('in-active')
  
  let selectSort = $(this).find('.select-sort'),
    selectSortOptoon = $(this).find('.site-dropdown-options:not(.dis)'),
    hideSelectOption = $(this).find('input.select-dropdown').length !== 0 ? $(this).find('.select-dropdown') : $(this).find('.select-dropdown option');
  
  if(selectSortOptoon.is(e.target)){
    let selectVal = e.target.dataset.val || $(e.target).text(),
        selectText = $(e.target).text();
    selectSort.text(selectText)
    hideSelectOption.val(selectVal).trigger('change')
    
    // curent item (.active)
    selectSortOptoon.each(function () { $(this).removeClass('curent') })
    $(this).find('.error').removeClass('error')
    $(e.target).addClass('curent')
  }
})