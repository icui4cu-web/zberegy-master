let admin_data

// backend simulation with jason ( get email and password )
function getFile(fileName) {
	let request = new XMLHttpRequest()
			request.open('GET', fileName)
			request.onloadend = function () {
				if (request.readyState === 4 && request.status === 200) {
					admin_data = JSON.parse(request.responseText)
				}
			}
	request.send()
}
getFile('./admin-data.json')


$('#login_form').on('submit', function (e) {
	e.preventDefault()
	const adminEmail = admin_data.email,
				adminPass = admin_data.pass;

	let inputId;
	
	$(this).find('input').not('[type=submit]').each(function () {

		inputId = $(this).attr('id')

			// Password
			if (inputId === 'pass') { 
				if ($(this).val() !== '' && $(this).val() === adminPass) {
					$(this).removeClass('error')
				} else {
					$(this).addClass('error')
				}
		}
			// Email
			if (inputId === 'email') {
				if ($(this).val() == '') {
					$(this).addClass('error')
					$('#' + inputId + ' ~ .error-mess')[0].textContent = 'Вкажіть email'
				}else if (!$(this).val().includes('@')) {
					$(this).addClass('error')
					$('#' + inputId + ' ~ .error-mess')[0].textContent = 'Пропущено "@"'
				}else if (/[а-яА-ЯЪъЫыЭэЁё]/i.test($(this).val())) {
					$(this).addClass('error')
					$('#' + inputId + ' ~ .error-mess')[0].textContent = 'Не можна писати кирилицею'
				}else if ($(this).val().length > 320) {
					$(this).addClass('error')
					$('#' + inputId + ' ~ .error-mess')[0].textContent = 'Не можна бiльше 320 символiв'
				}else if (!emailReg.test($(this).val()) || $(this).val() == '') {
					$(this).addClass('error')
					$('#' + inputId + ' ~ .error-mess')[0].textContent = 'Перевірте E-mail'
				}else if($(this).val() !== adminEmail) {
					$(this).addClass('error')
					$('#' + inputId + ' ~ .error-mess')[0].textContent = 'Перевірте E-mail'
				}else {
					$(this).removeClass('error')
				}

				// if ($(this).val() !== '' && $(this).val() === adminEmail) {
				// 	$(this).removeClass('error')
				// } else {
				// 	$(this).addClass('error')
				// }
			}
		})

	
	// check error
  if ($('#login_form .error').length) {
    return false; 
  }

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
			setTimeout(() => {
				location.href = 'user-cabinet-data.html'
				localStorage.login = true
			}, 1000);
		},
		error: function (error) {
			// code
		}
	});
	
})
