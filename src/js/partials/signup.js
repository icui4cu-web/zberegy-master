$('#signup_form').on('submit', function (e) {
  e.preventDefault()

  let inputId;

  $(this).find('input').not('[type=submit]').each(function () {

    inputId = $(this).attr('id')

    let emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;

    // Name
    if (inputId === 'name') {
      if ($(this).val() !== '' && $(this).val().length > 1) {
        $(this).removeClass('error')
      } else {
        $(this).addClass('error')
      }
    }

    // Surname
    if (inputId === 'surname') {
      if ($(this).val() !== '' && $(this).val().length > 1) {
        $(this).removeClass('error')
      } else {
        $(this).addClass('error')
      }
    }
    
    // Password
    if (inputId === 'pass') {
      if ($(this).val() === '') {
        $(this).addClass('error')
        $('#' + inputId + ' ~ .error-mess')[0].textContent = 'Перевірте пароль'
      } else if ($(this).val().length <= 3) {
        $(this).addClass('error')
        $('#' + inputId + ' ~ .error-mess')[0].textContent = 'Вкажіть бiльше 3 символiв'
      } else {
        $(this).removeClass('error')
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
      
      // if (!emailReg.test($(this).val()) || $(this).val() == '') {
      //   $(this).addClass('error')
      // } else {
      //   $(this).removeClass('error')
      // }

    }
  })

  // check error
  if ($('#signup_form .error').length) {
    $('html, body').animate({ scrollTop: $('#signup_form .error').offset().top - $('#header').outerHeight() - 20 }, 300)
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
      localStorage.login = true
      setTimeout(() => {
        location.href = 'mail_confirmation.html'
      }, 1000);
    },
    error: function (error) {
      // code
    }
  });
  

})