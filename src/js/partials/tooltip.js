$('[data-title]').each(function () {
	$(this).tooltip({
		title: $(this).data('title')
	});
});