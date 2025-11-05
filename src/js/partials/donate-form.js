if ($('.donate').length !== 0) {
  // period donate
  const payWarn = $('.pay-period-warn')[0],
    emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
    validFilds = {
      pay_amount: false,
      email: false,
      card_num: false,
      card_date: false,
      card_cvc: false
    };
  let payAmount = 0;
    
  function isAllValidFilds() {
    return Object.keys(validFilds).filter(function (k) { return !validFilds[k] }).length
  }

  function typePeriod(e) {
    if (e === true) {
      $('.type-period').each(function () { this.removeAttribute('hidden') })
      if ($('[type="radio"][name="sum"]:not(#pay_enother):checked').length === 0) {
        $('[for="pay_1"]').trigger('click')
      }
    }
    if (e === false) {
      $('.type-period').each(function () { this.setAttribute('hidden', '') })
        $('[for="pay_enother"]').trigger('click')
    }
  }
  typePeriod($('#pay_monthly')[0].checked)
  $('#pay_monthly')[0].checked
    ? payWarn.removeAttribute('hidden')
    : payWarn.setAttribute('hidden', '');
  
  $('#pay_monthly, #pay_once').on('change', function () {
    $('#pay_monthly')[0].checked ? payWarn.removeAttribute('hidden') : payWarn.setAttribute('hidden', '');
    typePeriod($('#pay_monthly')[0].checked)
  })
  // pay curency
  function typeCurency(abbr, symb) {
    $('.type-curency').each(function () {
      this.innerText = abbr
    })
    $('.input-curency')[0].innerText = symb
  }
  $('[name=currency]').on('change', function () {
    currencyChange(this.id)
  })
  function currencyChange(id) {
    switch (id) {
      case 'pay_usd':
        typeCurency('USD', '$')
        break;
      case 'pay_eur':
        typeCurency('EUR', '€')
        break;
      case 'pay_uah':
        typeCurency('грн', '₴')
        break;
    }
  }
  
  function donSubmDisEnab(e) {
    e
      ? $('#donate_submit')[0].removeAttribute("disabled")
      : $('#donate_submit')[0].setAttribute("disabled","");
  }

  // pay 100 / 200... input
  $('[type="radio"][name="sum"]:not(#pay_enother)').on('change', function () {
    payAmount = this.value
  })
  // pay enother input
  $('#pay_enother').on('change', function () {
    payAmount = $('#payEnother')[0].value
  })
  $('#payEnother').on('input', function () {
    // only numbers
    let thisValue = this.value.replace(/[^0-9]/g, '');
    thisValue = thisValue.startsWith('0') ? thisValue.slice(1) : thisValue;
    this.value = thisValue;
    payAmount = thisValue;
    // validation
    payEnotherValid.call(this)
  })
  function payEnotherValid(){
    if ($('#pay_enother')[0].checked) {
      if ($(this).val() == '') {
        $(this).addClass('error');
        validFilds.pay_amount = false;
        $('#formCard')[0].hidden = true;
        $('#donate_submit')[0].removeAttribute("disabled");
      } else {
        $(this).removeClass('error')
        validFilds.pay_amount = true;
        if(validFilds.email === false) $('#formCard')[0].hidden = true;
      }
    } else {
      validFilds.pay_amount = true
    }
  }

  function emailValid() {

    if ($(this).val() == '') {
      $(this).addClass('error')
      $('#' + this.id + ' ~ .error-mess')[0].textContent = 'Вкажіть email'
      validFilds.email = false
    }else if (!$(this).val().includes('@')) {
      $(this).addClass('error')
      $('#' + this.id + ' ~ .error-mess')[0].textContent = 'Пропущено "@"'
      validFilds.email = false
    }else if (/[а-яА-ЯЪъЫыЭэЁё]/i.test($(this).val())) {
      $(this).addClass('error')
      $('#' + this.id + ' ~ .error-mess')[0].textContent = 'Не можна писати кирилицею'
      validFilds.email = false
    }else if ($(this).val().length > 320) {
      $(this).addClass('error')
      $('#' + this.id + ' ~ .error-mess')[0].textContent = 'Не можна бiльше 320 символiв'
      validFilds.email = false
    }else if (!emailReg.test($(this).val())) {
      $(this).addClass('error')
      $('#' + this.id + ' ~ .error-mess')[0].textContent = 'Перевірте E-mail'
      validFilds.email = false
    } else {
      $(this).removeClass('error')
      validFilds.email = true
    }

    // if (!emailReg.test($(this).val()) || $(this).val() == '') {
    //   $(this).addClass('error')
    //   validFilds.email = false
    // } else {
    //   $(this).removeClass('error')
    //   validFilds.email = true
    // }
  }
  // email
  $('#email').on('focus', function () {

    $(this).on('input', function () { 
      if (!emailReg.test($(this).val()) || $(this).val() == '') {
        validFilds.email = false
        $('#formCard')[0].hidden = true;
        $('#donate_submit')[0].removeAttribute("disabled")
      } else {
        validFilds.email = true
        if (validFilds.pay_amount === false) $('#formCard')[0].hidden = true;
      }
    })
  })

  // card_num
  $('#card_num').on('focus', function () {
    // Input Phone Only Numbers + Formatting
    $(this).on('input', function () {
      let cardCode = this.value.replace(/[^0-9\d]/g, '').substring(0, 16);
      cardCode = cardCode != '' ? cardCode.match(/.{1,4}/g).join(' ') : '';
      this.value = cardCode;

      if ($(this).val() == '' || $(this).val().length !== 19) {
        validFilds.card_num = false
      } else {
        validFilds.card_num = true
      }
      isAllValidFilds() === 0 ? donSubmDisEnab(1) : donSubmDisEnab(0);
    })
    // valid
    $(this).on('blur', function () {
      if ($(this).val() == '' || $(this).val().length !== 19) {
        $(this).addClass('error')
        validFilds.card_num = false
      } else {
        $(this).removeClass('error')
        validFilds.card_num = true
      }
    })
  })
  // Formatting card_date
  function formatCardDate(e) {
    var code = e.keyCode;
    var allowedKeys = [8];
    if (allowedKeys.indexOf(code) !== -1) { return; }

    e.target.value = e.target.value.replace(
      /^([1-9]\/|[2-9])$/g, '0$1/' // 3 > 03/
    ).replace(
      /^(0[1-9]|1[0-2])$/g, '$1/' // 11 > 11/
    ).replace(
      /^([0-1])([3-9])$/g, '0$1/$2' // 13 > 01/3
    ).replace(
      /^(0?[1-9]|1[0-2])([0-9]{2})$/g, '$1/$2' // 141 > 01/41
    ).replace(
      /^([0]+)\/|[0]+$/g, '0' // 0/ > 0 and 00 > 0
    ).replace(
      /[^\d\/]|^[\/]*$/g, '' // To allow only digits and `/`
    ).replace(
      /\/\//g, '/' // Prevent entering more than 1 `/`
    );
    // this.value = e.target.value;
  }
  // card_date
  $('#card_date').on('focus', function () {
    // Input Phone Only Numbers + Formatting
    $(this).on('keyup', function(e){
      // Formatting date
      formatCardDate(e)
    })
    $(this).on('keydown', function(e){
      // Formatting date
      formatCardDate(e)
    })
    
    $(this).on('input', function (e) {
      let cardDate = this.value.replace(/[^0-9]/g, '')//.substring(0, 4);
      cardDate = cardDate != '' ? cardDate.match(/.{1,2}/g).join('/') : '';
      this.value = cardDate;

      if ($(this).val() == '' || $(this).val().length !== 5) {
        validFilds.card_date = false
      } else {
        validFilds.card_date = true
      }
      isAllValidFilds() === 0 ? donSubmDisEnab(1) : donSubmDisEnab(0);
    })
    // valid
    $(this).on('blur', function () {
      if ($(this).val() == '' || $(this).val().length !== 5) {
        $(this).addClass('error')
        validFilds.card_date = false
      } else {
        $(this).removeClass('error')
        validFilds.card_date = true
      }
    })
  })
  // card_cvc
  $('#card_cvc').on('focus', function () {
    // Input Phone Only Numbers
    $(this).on('input', function () {
      this.value = this.value.replace(/[^0-9]/g, '');

      if ($(this).val() == '' || $(this).val().length !== 3) {
        validFilds.card_cvc = false
      } else {
        validFilds.card_cvc = true
      }
      isAllValidFilds() === 0 ? donSubmDisEnab(1) : donSubmDisEnab(0);
    })
    $(this).on('blur', function () {
      if ($(this).val() == '' || $(this).val().length !== 3) {
        $(this).addClass('error')
        validFilds.card_cvc = false
      } else {
        $(this).removeClass('error')
        validFilds.card_cvc = true
      }
    })
  })

  // SUBMIT
  $('#donateForm').on('submit', function(e){
    e.preventDefault();
    const thisForm = this;
    
    $(this).find('input').not('[type=submit]').each(function () {

      let inputId = $(this).attr('id')

      // pay amount sum ( enother / proposed )
      if (inputId === 'payEnother') {
        payEnotherValid.call(this)
      }
      // email
      if (inputId === 'email') {
        emailValid.call(this)
      }
    })

    // show formCard
    if (validFilds.pay_amount === true && validFilds.email === true){
      $('#formCard')[0].hidden = false;
      isAllValidFilds() === 0 ? donSubmDisEnab(1) : donSubmDisEnab(0);
    }
    
    // if all filds valid !
    if (isAllValidFilds() === 0) {
      
      // let dataForm = $('#donateForm').serialize()
      let dataForm = $(this).serializeArray()
      
      $.ajax({
        url: "/",
        type: "POST",
        data: dataForm,
        success: function (data) {
          
          if (!$('.load-block .pay-success')[0].hidden) { $('.load-block .pay-success')[0].hidden = true }
          $('.load-block')[0].hidden = false
          $('.load-block .pay-in-process')[0].hidden = false
          $('#you_paid_amount')[0].innerText = payAmount
          $('.success-type-curency')[0].innerText = $('.type-curency')[0].textContent

          donSubmDisEnab(0)
          setTimeout(function() {
            $('.load-block .pay-in-process')[0].hidden = true
            $('.load-block .pay-success')[0].hidden = false
            thisForm.reset()
            currencyChange($('[name=currency]:checked')[0].id)
          }, 3000);
        },
        error: function (error) {
          // code
        }
      });
    }
  })
}