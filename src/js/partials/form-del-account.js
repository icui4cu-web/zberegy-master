$('#del_account_form').on('submit', function (e) {
  e.preventDefault()

  if (this.message_text.value === '') {
    this.message_text.classList.add('error')
  } else {
    this.message_text.classList.remove('error')
  }
  // check error
  setTimeout(function(){
    if ($(this).find('.error').length === 0) {
      $('#delAccModal').modal('hide')
      $('#delAccAlert').modal('show')
    }
  }.bind(this), 100);

})

$('#confirm_remove').on('change', function (e) {
  this.checked
    ? this.form.setAttribute('disabled', false)
    : this.form.setAttribute('disabled', true);
})
$('#del_account_form [type="reset"]').on('click',function(){
  this.form.setAttribute('disabled', true);
  this.form.reset()
})

