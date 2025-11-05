// Remove Memorial
$('#btnConfirmDelMemorial').on('click', function () {
  $('#delMemorialModal').modal('hide')
  $('#infoModal').modal('show')
  $('#infoModal .modal-title')[0].innerText = this.dataset.confirmText
  $('#' + this.dataset.whichDelMemorial).remove()
})
$('[data-parent-id-memorial]').on('click', function () {
  $('#delMemorialModal').modal('show')
  $('#btnConfirmDelMemorial')[0].setAttribute('data-which-del-memorial', this.dataset.parentIdMemorial)
})
