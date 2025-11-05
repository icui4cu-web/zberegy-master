/* ******************************************
  3 - User Cabinet Management Create Events
******************************************* */

if ($('#memorable_events_form').length) {

  const memorableEventsForm = $('#memorable_events_form'),
        memorableEventName = memorableEventsForm[0].memorable_event_name,
        memorableEventDecr = memorableEventsForm[0].memorable_event_decr,
        memorableEventDateDay = memorableEventsForm[0].memorable_event_date_day,
        memorableCrreateEventImgPreview = memorableEventsForm[0].memorable_crreate_event_img_preview,
        btnDelMemorableCrreateEventImgPreview = memorableEventsForm[0].btn_del_memorable_crreate_event_img_preview;
  
  memorableEventsForm.on('submit', function (e) {
    e.preventDefault();
  
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
        $('#donateModal').modal('show')
        setTimeout(() => {
          $('#donateModal').modal('hide')
        }, 5000);
      },
      error: function (error) {
        // code
      }
    });
    
  });
  
  
  fileImgLoad($('#memorable_crreate_event_img'), $('#memorable_crreate_event_img_preview'), eventImgPreview)
  // delete image
  $('#btn_del_memorable_crreate_event_img_preview').on('click', function () {
    $('#memorable_crreate_event_img_preview')[0].setAttribute('src', 'static/img/fake-img.png')
    $('[for=memorable_crreate_event_img] span')[0].textContent = 'Завантажити фото'
    this.hidden = true
  })
  // 
  function eventImgPreview() {
    $('[for=memorable_crreate_event_img] span')[0].textContent = 'Завантажити iнше фото';
    $('#btn_del_memorable_crreate_event_img_preview')[0].hidden = false;
  }
  
  $('#btn_memorable_events').on('click', function () {
  
    let el = $('#event_template')[0].cloneNode(true),
      
      attrs = ['id', 'hidden'],
      eventId = 'event_' + Date.now();
    // remove attr
    attrs.forEach(attr => el.removeAttribute(attr))
    
    el.id = eventId;

    for (let i = 0; i < el.querySelectorAll('[data-event-block]').length; i++) {
      el.querySelectorAll('[data-event-block]')[i].dataset.eventBlock = eventId
    }

    function elControlsListener(e, ev, func) {
      el.querySelector(e).addEventListener([ev], function () { func(this.dataset.eventBlock) });
    }
    elControlsListener('.btn-edit-event', 'click', editEvent)
    elControlsListener('.btn-save-edits', 'click', saveEdit)
    elControlsListener('.btn-remove-event', 'click', removeEvent)
    elControlsListener('.btn-remove-event-img', 'click', removeEventImg)
    
  function qEl(e, m, l) {
    el.querySelector(e)[m] = l;
  }
    
  qEl('img', 'src', memorableCrreateEventImgPreview.src)
  
  
  // VALIDATION INPUTS
  // $(memorialLastlName).addClass('error')
  if (memorableEventName.value === '') {
    memorableEventName.classList.add('error')
  }
  // if (memorableEventDecr.value === '') {
  //   memorableEventDecr.classList.add('error')
  // }
  if (memorableEventDateDay.value === '') {
    memorableEventDateDay.classList.add('error')
  }
    
  // stop code if error
  if ($('#memorable_events_form .error').length) { return false; }
  
  qEl('.event-title', 'value',  memorableEventName.value)
  qEl('.event-descr', 'value', memorableEventDecr.value)
  qEl('.event-date', 'value', memorableEventDateDay.value)
    
  memorableEventName.value = '';
  // $(memorableEventName).next('.textarea-maxlength').text('0' + '/' + $(memorableEventName)[0].getAttribute('maxlength'))
  memorableEventDecr.value = '';
  // $(memorableEventDecr).next('.textarea-maxlength').text('0' + '/' + $(memorableEventDecr)[0].getAttribute('maxlength'))
  setTimeout(() => { textareaLetterCounter() }, 100);
  memorableEventDateDay.value = '';
  memorableCrreateEventImgPreview.src = 'static/img/fake-img.png'
  btnDelMemorableCrreateEventImgPreview.hidden = true;
  $('[for=memorable_crreate_event_img] span')[0].textContent = 'Завантажити фото';
  
    $('#events_wrap').append(el)

    function changeImg(inp, img, btnDel, btnNewImgLabel) {
      inp.addEventListener('change', function () {
        if (this.files && this.files[0]) {

          // maxW & imgFormats (src/js/partials/global-var.js)
          let thisFiles_0 = this.files[0];
          let thisFiles_Sz = (this.files[0].size / (1024*1024)).toFixed(2);
          let fl_format = this.files[0].name.split('.').pop();
          let validImg = false;
          let urlImg = window.URL || window.webkitURL;
          let img_ = new Image();
          let readerImg = new FileReader();

          if(!imgFormats.includes(fl_format)){
            $('#infoModal').modal('show')
            $('#infoModal .modal-title')[0].innerHTML = '.'+fl_format+' - неприпустимий формат файлу'
            $('#infoModal .modal-body')[0].innerHTML = 'Формат має бути - '+imgFormats.join(', ')
            validImg = false;
            inp.value = '';
            return false;
          }

          img_.onload = function () {
            thisImgW = this.width;
            thisImgH = this.height;

            if(thisImgW < minW || thisImgH < minH){
              $('#infoModal').modal('show')
              $('#infoModal .modal-title')[0].innerHTML = 'Занадто маленьке зображення <br> ('+thisImgW +'px x '+thisImgH+'px)'
              $('#infoModal .modal-body')[0].innerHTML = 'Miнiмальний розмiр ('+minW +'px x '+minH+'px)'
              validImg = false;
              inp.value = '';
            }else if(thisImgW > maxW || thisImgH > maxH){
              $('#infoModal').modal('show')
              $('#infoModal .modal-title')[0].innerHTML = 'Надто велике зображення <br> ('+thisImgW +'px x '+thisImgH+'px)'
              $('#infoModal .modal-body')[0].innerHTML = 'Mаксимальний розмiр ('+maxW +'px x '+maxH+'px)'
              validImg = false;
              inp.value = '';
            }else if(thisFiles_Sz > max_mb){
              $('#infoModal').modal('show')
              $('#infoModal .modal-title')[0].innerHTML = 'Надто велике зображення - '+thisFiles_Sz+'мб'
              $('#infoModal .modal-body')[0].innerHTML = 'Mаксимальний розмiр - <b>'+max_mb+'мб</b>'
              validImg = false;
              inp.value = '';
            }else if(!imgFormats.includes(fl_format)){
              $('#infoModal').modal('show')
              $('#infoModal .modal-title')[0].innerHTML = '.'+fl_format+' - неприпустимий формат файлу'
              $('#infoModal .modal-body')[0].innerHTML = 'Формат має бути - '+imgFormats.join(', ')
              validImg = false;
              inp.value = '';
            }else{
              validImg = true;
            }
            
            if(validImg){
              readerImg.onload = function (e) {
                memorialImgPath = e.target.result;
                img.src = memorialImgPath
                btnDel.hidden = false;
                btnNewImgLabel.textContent = 'Змiнити фото'
              }
              readerImg.readAsDataURL(thisFiles_0);
            }
          }
          img_.src = urlImg.createObjectURL(this.files[0]);
        }
      })
    }

    changeImg(
      el.querySelector('[type=file]'),
      el.querySelector('img.memorable-event-img'),
      el.querySelector('.btn-remove-event-img'),
      el.querySelector('.select-new-img span'),
    );

    // for change date
    setTimeout(() => { pmuInit(el.querySelector('.event-date')) }, 100);

    // eliminate manual input date
    el.querySelector('.event-date').onfocus = function () {
      this.blur()
    }
    // Delete Eror Class for Focus
    el.querySelector('input').onfocus = function () {
      this.classList.remove('error')
    }
    el.querySelector('textarea').onfocus = function () {
      this.classList.remove('error')
    }
  
    });

  // del
  // $('.btn-edit-event').on('click', function () {
  //   editEvent(this.dataset.eventBlock)
  // });
  
  function editEvent(e) {

    let eventBlock = $('#'+e)
    let inputsReadonly = eventBlock[0].querySelectorAll('[data-readonly]')
    let selectNewImg = eventBlock[0].querySelector('.select-new-img')
    let saveEditBtn = eventBlock[0].querySelector('.btn-save-edits')
    let img = eventBlock[0].querySelector('img.memorable-event-img')
    let btnNewImgLabel = eventBlock[0].querySelector('.select-new-img span')
    let btnDelImg = eventBlock[0].querySelector('.btn-delete')
    let labels = eventBlock[0].querySelectorAll('label[data-lab-hide]')

    for (let i = 0; i < labels.length; i++) {
      labels[i].hidden = false;
    }
    for (let i = 0; i < inputsReadonly.length; i++) {
      inputsReadonly[i].removeAttribute('readonly')
    }
    selectNewImg.hidden = false;
    if (!img.src.includes('fake-img')) {
      btnDelImg.hidden = false;
      btnNewImgLabel.textContent = 'Змiнити фото'
    } else {
      btnNewImgLabel.textContent = 'Додати фото'
    }
    saveEditBtn.hidden = false;
  }

  // del
  // $('.btn-save-edits').on('click', function () {
  //   saveEdit(this.dataset.eventBlock)
  // })

  function saveEdit(e) {
    let eventBlock = $('#'+e)
    let saveEditBtn = eventBlock[0].querySelector('.btn-save-edits')
    let inputsReadonly = eventBlock[0].querySelectorAll('[data-readonly]')
    let memorableEventNameIn = eventBlock[0].querySelector('.event-title')
    let memorableEventDecrIn = eventBlock[0].querySelector('.event-descr')
    let selectNewImg = eventBlock[0].querySelector('.select-new-img')
    let btnDelImg = eventBlock[0].querySelector('.btn-delete')
    let labels = eventBlock[0].querySelectorAll('label[data-lab-hide]')
    // let eventTitle = eventBlock[0].querySelector('.event-title')
    // eventTitle.style.height = eventTitle.scrollHeight + "px"

    for (let i = 0; i < labels.length; i++) {
      labels[i].hidden = true;
    }

    // VALIDATION INPUTS (inside the event of the event)
    if (memorableEventNameIn.value === '') {
      memorableEventNameIn.classList.add('error')
    }
    // if (memorableEventDecrIn.value === '') {
    //   memorableEventDecrIn.classList.add('error')
    // }
    
    // stop code if error
    console.log(eventBlock[0].querySelector('.error') !== null);
    if (eventBlock[0].querySelector('.error') !== null) { return false; }
    
    for (let i = 0; i < inputsReadonly.length; i++) {
      inputsReadonly[i].setAttribute('readonly','')
    }
  
    selectNewImg.hidden = true;
    btnDelImg.hidden = true;
    saveEditBtn.hidden = true;
  }
  
  // del
  // $('.btn-remove-event').on('click', function () {
  //   removeEvent(this.dataset.eventBlock)
  // })

  function removeEventImg(e) {
    // let btnNewImgLabel = eventBlock[0].querySelector('.select-new-img span')
    // btnNewImgLabel.textContent = 'Змiнити фото'
    $('.select-new-img[data-event-block=' + e + '] span')[0].textContent = 'Додати фото'
    $('.btn-remove-event-img[data-event-block=' + e + ']')[0].hidden = true;
    $('img[data-event-block=' + e + ']')[0].setAttribute('src', 'static/img/fake-img.png')
  }

  function removeEvent(e) {
    $('#'+e)[0].remove()
  }
  
}