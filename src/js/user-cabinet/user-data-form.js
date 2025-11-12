let old_user_data_filds = '', new_user_data_filds, userImgPath = $('#user_data_form .select-img img').length ? $('#user_data_form .select-img img')[0].src : '';
let emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
const
  userDataForm = $('#user_data_form'),
  userLastName = $('#user_last_name'),
  dataUserName = $('#user_name'),
  dataUserSurname = $('#user_surname'),
  dataUserEmail = $('#user_email');

function oldUserDataFilds() {
  old_user_data_filds = '';
  $('#user_data_form input').each(function () {
    // if (this.type !== 'file') {
      old_user_data_filds += this.value
    // }
  })
}
oldUserDataFilds()

function isChangeForm(){
  new_user_data_filds = ''
  $('#user_data_form input').each(function () {
    new_user_data_filds += this.value
  })
  // setTimeout(function () {
    if (old_user_data_filds !== new_user_data_filds || old_user_data_filds.length !== new_user_data_filds.length) {
      userDataForm[0].dataset.change = true
    } else {
      userDataForm[0].dataset.change = false
    }
  // }, 300);
}

/* for a beautiful display of emale in the cabinet */
function thisValInp() {
  if (this.id === 'user_email') {this.nextElementSibling.textContent = this.value}
}
thisValInp.call(dataUserEmail[0])

// input file
$('#load_user_img').on('change', function () {
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
          userImgPath = e.target.result;
          $('#user_data_form .select-img img')[0].src = userImgPath
        }
        readerImg.readAsDataURL(thisFiles_0);
        // activate the save button
        isChangeForm()
      }
    }
    img.src = urlImg.createObjectURL(this.files[0]);
  }
})

// reset the image
$('#del_user_img').on('click', function (e) {
  // assign the default image
  $('#user_data_form .select-img img')[0].src = this.dataset.resetImg;
  // variable for recording the old value
  userImgPath = this.dataset.resetImg;
  // reset the input
  $('#load_user_img')[0].value =''
  $('#load_user_img')[0].setAttribute('value', '')
  // activate the save button
  isChangeForm()
})

// all inputs
$('#user_data_form input').on('keyup', function (e) {
  e.preventDefault();
  if (this.id === 'user_email') {
    // this.value = this.value.replace(/[а-яА-Я]/g,'');
    thisValInp.call(dataUserEmail[0])
  }
  // activate the save button
  isChangeForm()
})

// submit - save / edit
$('#btn_edit_user_data').on('click', function (e) {
	const thisEvent = e;
	const formInputs = $('#user_data_form input:not([type="file"])');
  
  if (e.target.form.getAttribute('disabled') === 'true') {
    e.target.form.setAttribute('disabled', 'false')
	e.target.textContent = "Зберегти"
	formInputs.prop('disabled', false);
  } else {

    // validation inputs
    if (userLastName[0].value == '') {
      userLastName.addClass('error')
      $('#' + userLastName[0].id + ' ~ .error-mess')[0].textContent = "Додайте інформацію"
    }
    if (userLastName[0].value.length === 1) {
      userLastName.addClass('error')
      $('#' + userLastName[0].id+' ~ .error-mess')[0].textContent = 'Не меньше двох символiв'
    }

    if (dataUserName[0].value == '') {
      dataUserName.addClass('error')
      $('#' + dataUserName[0].id + ' ~ .error-mess')[0].textContent = "Додайте інформацію"
    }
    if (dataUserName[0].value.length === 1) {
      dataUserName.addClass('error')
      $('#' + dataUserName[0].id+' ~ .error-mess')[0].textContent = 'Не меньше двох символiв'
    }

    if (dataUserSurname[0].value.length === 1) {
      dataUserSurname.addClass('error')
      $('#' + dataUserSurname[0].id+' ~ .error-mess')[0].textContent = 'Не меньше двох символiв'
    }

    if (dataUserEmail[0].value == '') {
      dataUserEmail.addClass('error')
      $('#'+dataUserEmail[0].id+' ~ .error-mess')[0].textContent = 'Вкажiть ваш Email'
    }
    
    if (!emailReg.test(dataUserEmail[0].value)) {
      let clarificationText = dataUserEmail[0].value.includes(' ') ? ' (видаліть пробіли)' : '';
      dataUserEmail.addClass('error')
      $('#' + dataUserEmail[0].id + ' ~ .error-mess')[0].textContent = 'Перевірте E-mail' + clarificationText
    }

    if ($('#user_data_form .error').length){ return false; }

    setTimeout(() => {
      // remember the old image value
      $('#load_user_img')[0].dataset.oldValue = userImgPath;
      userDataForm[0].setAttribute('disabled', 'true');
      userDataForm[0].dataset.change = false;
      thisEvent.target.textContent = "Редагувати";
	  formInputs.prop('disabled', true);
      oldUserDataFilds();
      // old values for fields
      $('#user_data_form input').each(function () {
      // if (this.type !== 'file') {
        this.setAttribute('value', this.value)
        // }
      })
    }, 10);
    
  }

})

// Btn Form.Reset
$('#btn_reset_user_data_form').on('click', function (e) {
  e.target.form.reset()
  $('#user_data_form .select-img img')[0].src = $('#load_user_img')[0].dataset.oldValue
  thisValInp.call(dataUserEmail[0])
  e.target.form.dataset.change = false
  e.target.form.setAttribute('disabled', 'true')
  $('#btn_edit_user_data')[0].textContent = "Редагувати"
  $('#user_data_form input:not([type="file"])').prop('disabled', true);
})

userDataForm.on('submit', function (e) {
  e.preventDefault()
})