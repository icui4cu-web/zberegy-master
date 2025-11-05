$('#search_btn').on('click', function () {
	searchInput()
})

function searchInput() {
	if ($('.search-input')[0].value != '') {
		location.href = 'search-results.html'
		localStorage.search_query = $('.search-input')[0].value
	} else {
		location.href = 'search-no-results.html'
		localStorage.search_query = ''
	}
}

if (localStorage.search_query !== '' && $('.search-results').length !== 0) {
	$('#search_input')[0].value = localStorage.search_query
	$('#search_query')[0].textContent = '"'+localStorage.search_query+'"'
}

// (lg,md,sm) search (show/hide)
$('.btn-search-toggler').on('click', function () {
  $('.search-wrap')[0].classList.toggle('active')
})

$('.search-input').on('input focus', function(){
	$(this).val() !== ''
		? $('.btn-search-reset').removeClass('hide') &&
		// if user press Enter
		$(this).on('keypress',function (e) {
			if (e.key === 'Enter') {
				e.preventDefault();
				searchInput()
			}
		})
	: $('.btn-search-reset').addClass('hide');
	
})
$('.btn-search-reset').on('click', function () {
	$('.search-input').val('')
	$(this).addClass('hide')
})
