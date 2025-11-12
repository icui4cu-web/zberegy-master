$('.steps').slick({
	dots: true,
	infinite: false,
	arrows: false,
	slidesToShow: 4,
	appendDots: '.steps',
	responsive: [
		{
			breakpoint: 992,
			settings: {
				slidesToShow: 2
			}
		},
		{
			breakpoint: 768,
			settings: {
				slidesToShow: 1
			}
		}
	]
});