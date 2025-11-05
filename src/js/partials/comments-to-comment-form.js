$('.form-to-comments').on('submit', function (e) {
	e.preventDefault()
})

$('label[for]').on('click', function () {
	const forElem = $('[data-input-id="' + this.getAttribute('for') + '"]')
	if (forElem.length != 0) forElem.focus()
})