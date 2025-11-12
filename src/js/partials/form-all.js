// pass show/hide function
$('.pass-show').on('click', function () {
  let thisInput = $(this)[0].parentNode.querySelector('input'),
    thisSlashEye = $(this).find('.eye-slash')[0]

	thisInput.type = thisInput.type === 'password' ? 'text' : 'password'
	thisSlashEye.classList.toggle('d-none', thisInput.type !== 'password')
})

// LOGOUT
$('#btn_logout').on('click', function (e) {
  e.preventDefault();
  location.href = 'login.html';
  localStorage.login = false;
})
// IF LOGIN
if (localStorage.login === 'true') {
  $('#page').addClass('IS_LOG_IN')
  $('a').each(function () {
    if (this.href.includes('login.html') && !$(this).hasClass('btn-user-login'))
    // this.href = 'user-cabinet-data.html';
      this.href = 'user-cabinet-management.html';
  })
}


// input file
function fileImgLoad(input, viewImg, callFunc) {
  let memorialImgPath = '';
  if (input[0] !== undefined) {

    input[0].addEventListener('change', function () {

      if (this.files && this.files[0]) {
        // maxW & imgFormats (src/js/partials/global-var.js)
        let thisFiles_0 = this.files[0]
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
          input.val("");
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
            input.val("");
          }else if(thisImgW > maxW || thisImgH > maxH){
            $('#infoModal').modal('show')
            $('#infoModal .modal-title')[0].innerHTML = 'Надто велике зображення <br> ('+thisImgW +'px x '+thisImgH+'px)'
            $('#infoModal .modal-body')[0].innerHTML = 'Mаксимальний розмiр ('+maxW +'px x '+maxH+'px)'
            validImg = false;
            input.val("");
          }else if(thisFiles_Sz > max_mb){
            $('#infoModal').modal('show')
            $('#infoModal .modal-title')[0].innerHTML = 'Надто велике зображення - '+thisFiles_Sz+'мб'
            $('#infoModal .modal-body')[0].innerHTML = 'Mаксимальний розмiр - <b>'+max_mb+'мб</b>'
            validImg = false;
            input.val("");
          }else if(!imgFormats.includes(fl_format)){
            $('#infoModal').modal('show')
            $('#infoModal .modal-title')[0].innerHTML = '.'+fl_format+' - неприпустимий формат файлу'
            $('#infoModal .modal-body')[0].innerHTML = 'Формат має бути - '+imgFormats.join(', ')
            validImg = false;
            input.val("");
          }else{
            validImg = true;
          }
    
          if(validImg){
            readerImg.onload = function (e) {
              memorialImgPath = e.target.result;
              viewImg[0].src = memorialImgPath
              // activate the save button
              if (callFunc) { callFunc()}
            }
            readerImg.readAsDataURL(thisFiles_0);
          }
        }
        img.src = urlImg.createObjectURL(this.files[0]);

        // readerImg.onload = function (e) {
        //   memorialImgPath = e.target.result;
        //   viewImg[0].src = memorialImgPath
        // }
        // readerImg.readAsDataURL(this.files[0]);
        
        // activate the save button
        // if (callFunc) { callFunc()}
      }
    })
  }
}

// all input autocomplete off
$('input:not([type="checkbox"], [type="radio"], [type="submit"])').each(function () { this.setAttribute('autocomplete', 'off') })

// textarea letter counter
function textareaLetterCounter() {
  $('textarea[maxlength]').each(function () {
    if ($(this).next('.textarea-maxlength').length) {
      $(this).next('.textarea-maxlength').text($(this).val().length + '/' + $(this)[0].getAttribute('maxlength'))
    }
  })
  $('textarea[maxlength]').on('input', function(){
    $(this).next('.textarea-maxlength').text($(this).val().length + '/' + $(this)[0].getAttribute('maxlength'))
    // scrol to bottom (need!)
    $(this).scrollTop($(this)[0].scrollHeight);
  })
}
textareaLetterCounter()

// removeClass error if focus
$('textarea, input').on('focus', function(){
  $(this).removeClass('error')
})

// pass icon or curency icon...
function centeredIconForInput() {
  setTimeout(function () {
    $('.icon-for-input').each(function () {
      $(this).css('top', $(this).next()[0].offsetHeight / 2)
    })
  }, 100);
}
// centeredIconForInput()

$('.auto-h').on('keyup', function () {
  // auto height
  this.style.height = "1px";
  this.style.height = this.scrollHeight + "px"
});