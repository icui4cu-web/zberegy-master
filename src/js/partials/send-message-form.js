$('#send_message_form').on('submit', function (e){
  e.preventDefault()
  $('#sucsesModalLabel').text('Повідомлення відправлено')
  setTimeout(function(){
    $('#sendMessageModal').modal('hide')
    $('#sucsesModal').modal('show')
    setTimeout(function(){
      $('#sucsesModal').modal('hide')
    }, 5000);
  }, 1000);
})