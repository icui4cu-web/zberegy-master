$('#change_pass').on('click', function(e){
  $('.pass-recovery')[0].hidden = false
  this.form.hidden = true
  scrollToEl($('.pass-recovery'))

  centeredIconForInput()
})
$('#btn_back_to_us_data').on('click', function(){
  $('.pass-recovery')[0].hidden = true
  $('#user_data_form')[0].hidden = false
  scrollToEl($('#user_data_form'))
})

$('#pass_recovery').on('submit', function (e) {
  e.preventDefault()

  if($('#current_pas').val() !== admin_data.pass ||  $('#current_pas').val() === ''){
    $('#current_pas').addClass('error')
  } else {
    $('#current_pas').removeClass('error')
  }

  if($('#new_pas').val() === ''){
    $('#new_pas').addClass('error')
    $('#new_pas ~ .error-mess')[0].textContent = 'Вкажіть пароль'
  }else if($('#current_pas').val() === $('#new_pas').val()){
    $('#new_pas').addClass('error')
    $('#new_pas ~ .error-mess')[0].textContent = 'Вказано поточний пароль'
  } else {
    $('#new_pas').removeClass('error')
  }


  // check error
  if ($('#pass_recovery .error').length) {
    return false; 
  }

  $('#sucsesModalLabel').text('Пароль змінено')
  setTimeout(function () {
    $('#complainModal').modal('hide')
    $('#sucsesModal').modal('show')
    $('.pass-recovery')[0].hidden = true
    $('#user_data_form')[0].hidden = false
    setTimeout(function () {
      $('#sucsesModal').modal('hide')
    }, 5000);
  }, 1000);
})
