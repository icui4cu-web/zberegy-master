//  Comment Body  ( cut text... + img )
const commBodMaxH = window.innerWidth > 768 ? 160 : 150 ;
function commentParent(){
let commentBodyArr = {}
for (let i = 0; i < $('.comments-user-wrap .comment-body').length; i++) {

	commentBodyArr[i] = $('.comments-user-wrap .comment-wrap')[i].clientHeight;

  function commBody() {
    if (commentBodyArr[i] > commBodMaxH) {
      $(this)[0].classList.add('excerpt-text', 'close')
      $(this).find('.comment-wrap').css('max-height', commBodMaxH)

      const overlay = document.createElement('div')
      overlay.classList.add('overlay')
      const btnExcerpt = document.createElement('button')
      btnExcerpt.classList.add('btn-excerpt')
      btnExcerpt.innerHTML +=
        '<svg class="icon-doble-brecket ico" width="15" height="20" viewBox="0 0 15 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15 9.44134L13.9051 8.46143L7.5 14.2429L1.09489 8.46143L0 9.44134L7.5 16.1537L15 9.44134Z" fill="#323232" fill-opacity="0.8"/><path d="M15 4.8261L13.9051 3.84619L7.5 9.62768L1.09489 3.84619L0 4.8261L7.5 11.5385L15 4.8261Z" fill="#323232" fill-opacity="0.8"/></svg>'

      $(this)[0].querySelector('.comment-wrap').appendChild(overlay)
      $(this)[0]
        .querySelector('.comment-wrap')
        .insertAdjacentElement('afterend', btnExcerpt)
    }

    if ($(this).find('.btn-excerpt')[0] != undefined) {
        $(this).find('.btn-excerpt')[0].addEventListener('click', function () {
          if ($(this).parent()[0].classList.contains('close')) {
            $(this).parent().find('.comment-wrap').css('max-height', commentBodyArr[i])
          } else {
            $(this).parent().find('.comment-wrap').css('max-height', commBodMaxH)
          }
          $(this).parent()[0].classList.toggle('close')
          $(this)[0].classList.toggle('active')
        })
      }
    }
  commBody.call($('.comments-user-wrap .comment-body')[i])

	}
	
}

let commentChildBodyArr = {},
		childCommentsArr = $('.comments-user-wrap .child-comments-block').length;

// this function will be called either at the end of the loop for child comments or at this point if no child comments were found
if (childCommentsArr === 0) { commentParent()}

for (let i = 0; i < childCommentsArr; i++) {
	commentChildBodyArr[i] = $('.comments-user-wrap .child-comments-block')[i].clientHeight

		function commChildBody() {
		if (commentChildBodyArr[i] > commBodMaxH) {
			$(this)[0].classList.add('excerpt-text', 'close')
			$(this).find('.comment-text').css('max-height', commBodMaxH)

			const overlay = document.createElement('div')
			overlay.classList.add('overlay')
			const btnExcerpt = document.createElement('button')
			btnExcerpt.classList.add('btn-excerpt')
			btnExcerpt.innerHTML +=
				'<svg class="icon-doble-brecket ico" width="15" height="20" viewBox="0 0 15 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15 9.44134L13.9051 8.46143L7.5 14.2429L1.09489 8.46143L0 9.44134L7.5 16.1537L15 9.44134Z" fill="#323232" fill-opacity="0.8"/><path d="M15 4.8261L13.9051 3.84619L7.5 9.62768L1.09489 3.84619L0 4.8261L7.5 11.5385L15 4.8261Z" fill="#323232" fill-opacity="0.8"/></svg>'

			$(this)[0].querySelector('.comment-text').appendChild(overlay)
			$(this)[0]
				.querySelector('.comment-text')
				.insertAdjacentElement('afterend', btnExcerpt)
		}

		if ($(this).find('.btn-excerpt')[0] != undefined) {
			$(this)
				.find('.btn-excerpt')[0]
				.addEventListener('click', function () {
					if ($(this).parent()[0].classList.contains('close')) {
						$(this)
							.parent()
							.find('.comment-text')
							.css('max-height', commentChildBodyArr[i])
					} else {
						$(this)
							.parent()
							.find('.comment-text')
							.css('max-height', commBodMaxH)
					}
					$(this).parent()[0].classList.toggle('close')
					$(this)[0].classList.toggle('active')
				})
		}
	}
	commChildBody.call($('.comments-user-wrap .child-comments-block')[i])

	if (i == $('.comments-user-wrap .child-comments-block').length - 1) {
		commentParent()
	}
}