$('#comments_form').on('submit', function (e){
  e.preventDefault()
})

$('#comment_add_foto').on('change', function(e){
  if (this.files && this.files[0]) {
    // maxW & imgFormats (src/js/partials/global-var.js)
    let thisFiles_0 = this.files[0];
    let thisFiles_Sz = (this.files[0].size / (1024*1024)).toFixed(2);
    let fl_format = this.files[0].name.split('.').pop();
    let validImg = false;
    let urlImg = window.URL || window.webkitURL;
    let img = new Image();
    let readerImg = new FileReader();

    if(!imgFormats.includes(fl_format)){
      $('#infoModal').modal('show')
      $('#infoModal .modal-title')[0].innerHTML = '.'+fl_format+' - неприпустимий формат файлу'
      $('#infoModal .modal-body')[0].innerHTML = 'Формат має бути - '+imgFormats.join(', ')
      validImg = false;
      $('#comment_add_foto').val("");
      return false;
    }

    img.onload = function () {
      thisImgW = this.width;
      thisImgH = this.height;

      if(thisImgW < minW || thisImgH < minH){
        $('#infoModal').modal('show')
        $('#infoModal .modal-title')[0].innerHTML = 'Занадто маленьке зображення <br> ('+thisImgW +'px x '+thisImgH+'px)'
        $('#infoModal .modal-body')[0].innerHTML = 'Miнiмальний розмiр ('+minW +'px x '+minH+'px)'
        validImg = false;
        $('#comment_add_foto').val("");
      }else if(thisImgW > maxW || thisImgH > maxH){
        $('#infoModal').modal('show')
        $('#infoModal .modal-title')[0].innerHTML = 'Надто велике зображення <br> ('+thisImgW +'px x '+thisImgH+'px)'
        $('#infoModal .modal-body')[0].innerHTML = 'Mаксимальний розмiр ('+maxW +'px x '+maxH+'px)'
        validImg = false;
        $('#comment_add_foto').val("");
      }else if(thisFiles_Sz > max_mb){
        $('#infoModal').modal('show')
        $('#infoModal .modal-title')[0].innerHTML = 'Надто велике зображення - '+thisFiles_Sz+'мб'
        $('#infoModal .modal-body')[0].innerHTML = 'Mаксимальний розмiр - <b>'+max_mb+'мб</b>'
        validImg = false;
        $('#comment_add_foto').val("");
      }else if(!imgFormats.includes(fl_format)){
        $('#infoModal').modal('show')
        $('#infoModal .modal-title')[0].innerHTML = '.'+fl_format+' - неприпустимий формат файлу'
        $('#infoModal .modal-body')[0].innerHTML = 'Формат має бути - '+imgFormats.join(', ')
        validImg = false;
        $('#comment_add_foto').val("");
      }else{
        validImg = true;
      }
      
      if(validImg){
        readerImg.onload = function (e) {
          $('#comments_form .label-add-foto')[0].classList.add('active')
          $('#comments_form .label-add-foto')[0].style.backgroundImage = 'url('+e.target.result+')';
        }
        readerImg.readAsDataURL(thisFiles_0);
      }
    }
    img.src = urlImg.createObjectURL(this.files[0]);
    
  }
})
$('.label-add-foto.active').on('click', function(e){e.preventDefault()})

$('.btn-remove-img').on('click', function(e){
  e.preventDefault()
  const thisParent = $(this)[0].parentElement.parentElement,
  thisParentFor = thisParent.getAttribute('for')
  
  $('#'+thisParentFor).val('')
  thisParent.classList.remove('active')
  $('.label-add-foto')[0].style.backgroundImage = 'none';
});
