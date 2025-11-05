$('#forgot_password_form').on('submit', function (e) {
  e.preventDefault()
  const adminEmail = admin_data.email;
  let inputId;

  $(this).find('input').not('[type=submit]').each(function () {

    inputId = $(this).attr('id')

    let emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;

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
      }else if($(this).val() !== adminEmail) {
        $(this).addClass('error')
        $('#' + inputId + ' ~ .error-mess')[0].textContent = 'Перевірте E-mail'
      }else {
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
  if ($('#forgot_password_form .error').length) { return false; }
  
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
        $('#forgot_password_form').slideUp()
      }, 1000);

      setTimeout(() => {
        $('.forgot-password-message').slideDown()
      }, 1000);

    },
    error: function (error) {
      // code
    }
  });

})