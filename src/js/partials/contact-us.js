$('#contact_us_form').on('submit', function (e) {
  e.preventDefault()

  let valid, inputId

  $(this).find('input, option, textarea').not('[type=submit]').each(function () {

    inputId = $(this).attr('id')

    let emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;

    // Name
    if (inputId === 'name') {
      if ($(this).val() !== '') {
        $(this).removeClass('error')
      } else {
        $(this).addClass('error')
      }
    }

    // Email
    if (inputId === 'email') {

      if ($(this).val() == '') {
        $(this).addClass('error')
        $('#' + inputId + ' ~ .error-mess')[0].textContent = 'Вкажіть email'
      }else if (!$(this).val().includes('@')) {
        $(this).addClass('error')
        $('#' + inputId + ' ~ .error-mess')[0].textContent = 'Пропущено "@"'
      }else if (/[а-яА-ЯЪъЫыЭэЁё]/i.test($(this).val())) {
        $(this).addClass('error')
        $('#' + inputId + ' ~ .error-mess')[0].textContent = 'Не можна писати кирилицею'
      }else if ($(this).val().length > 320) {
        $(this).addClass('error')
        $('#' + inputId + ' ~ .error-mess')[0].textContent = 'Не можна бiльше 320 символiв'
      }else if (!emailReg.test($(this).val()) || $(this).val() == '') {
        $(this).addClass('error')
        $('#' + inputId + ' ~ .error-mess')[0].textContent = 'Перевірте E-mail'
      } else {
        $(this).removeClass('error')
      }

    }

    // // Message subject
    if (inputId === 'message_subject') {
      if ($(this).val() === 'none' || $(this).val() === '') {
        // this.parentElement.classList.add('error')
        let defaultMessage_subject = $('#contact_us_form .site-dropdown-select li')[0].textContent;
        $('#contact_us_form .select-sort')[0].textContent = defaultMessage_subject;
        $(this).val(defaultMessage_subject);
      } else {
        // this.parentElement.classList.remove('error')
      }
    }

    // Text
    if (inputId === 'text') {
      if ($(this).val() == '') {
        $(this).addClass('error')
      } else {
        $(this).removeClass('error')
      }
    }

  })

  // check error
  if ($('#contact_us_form .error').length) {
    $('html, body').animate({ scrollTop: $('#contact_us_form .error').offset().top - $('#header').outerHeight() - 20 }, 300)
     return false; 
  }

  let formData = new FormData(e.target);
  let jsonData = {};
  
  formData.forEach(function (value, key) { jsonData[key] = value; });
  jsonData = JSON.stringify(jsonData);

  $.ajax({
    url: "/",
    type: "POST",
    data: jsonData,
    success: function (jsonData) {
      // code
      $('#sucsesModalLabel').text("Ваше повідомлення успішно надіслано. Ми спробуємо зв'язатися з Вами якнайшвидше!")
      setTimeout(function () {
        $('#contact_us_form').find('input, option, textarea').not('[type=submit]').each(function () {
          $(this).val('').text('')
        })
        $('[data-dropdown-id="message_subject"]').removeClass('in-active')
        $('[data-dropdown-id="message_subject"] .select-sort').text('Оберіть певну тему')
  
        $('#sendMessageModal').modal('hide')
        $('#sucsesModal').modal('show')
        setTimeout(function () {
          $('#sucsesModal').modal('hide')
        }, 5000);
      }, 1000);
      
    },
    error: function (error) {
      // code
    }
  });
})