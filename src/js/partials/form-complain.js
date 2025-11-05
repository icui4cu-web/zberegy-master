$('#complain_form').on('submit', function (e){
  e.preventDefault()
  $('#sucsesModalLabel').text('Дякуємо, Ваше повідомлення надіслано')
  setTimeout(function(){
    $('#complainModal').modal('hide')
    $('#sucsesModal').modal('show')
    setTimeout(function(){
      $('#sucsesModal').modal('hide')
    }, 5000);
  }, 1000);
})