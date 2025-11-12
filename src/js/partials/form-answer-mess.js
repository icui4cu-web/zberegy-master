$('.btn-answer-mess').on('click', function () {
  if (!$(this).hasClass('answer')) {
    $('#sendMessageModal_2').modal('show')
    sendMessageForm_2.call(this)
  }
})
let tbnAnswer = '' ;
let curMess = '';

function sendMessageForm_2() {
  tbnAnswer = this;
  curMess = $(tbnAnswer.dataset.messBlock)[0];
  console.log(curMess);
}

$('#send_message_form_2').on('submit', function (e) {
  e.preventDefault();

  let text = this.message_text;
  let btn = $(this).find('[type="submit"]'); //del

  if (text.value === '') {
    text.classList.add('error')
    btn.css('margin-top', '10px') //del
  }

  if ($(this).find('.error').length) { return false; }

  btn.css('pointer-events', 'none')

  $('#sucsesModalLabel').text('Відповідь відправлено')
  setTimeout(function () {

    $('#sendMessageModal_2').modal('hide')

    curMess.insertAdjacentHTML('afterend', `
      <div class="message-block">
        <div class="message-header">
          <div class="img-wrap">
            <img class="avatar" width="40" height="40" src="static/img/memorials/no-photo.jpg" alt="" loading="lazy" decoding="async">
          </div>
          <div class="name h6">Ваша відповідь</div>
        </div>
        <div class="message-body">
          <div class="message-text">
            <p>${text.value}</p>
          </div>
        </div>
        <div class="date-time">дд.мм.рррр 12:00</div>
      </div>
    `);

    text.value = '';

    $('#sucsesModal').modal('show')
    tbnAnswer.dataset.title = 'Ви відповіли'
    tbnAnswer.classList.add('answer')

    setTimeout(function () {
      $('#sucsesModal').modal('hide')
      btn.css('pointer-events', 'auto')
    }, 3000);
  }, 1000);
})