/* ********************
  User Cabinet Menu 
******************** */
const user_cabinet_menu = $('#user_cabinet_menu')

$('.btn-back-to-menu').on('click', function (e) {
  e.preventDefault()
  user_cabinet_menu.addClass('active')
  document.body.classList.add('user-cabinet-menu-scroll-lock')
})

user_cabinet_menu.find('.active, [data-user-cabinet-menu-close]').on('click', function(e){
  e.preventDefault()
  user_cabinet_menu.removeClass('active')
  document.body.classList.remove('user-cabinet-menu-scroll-lock')
})

$('#delete_accout').on('click',function(){
  $('#delAccModal').modal('show')
})

$('.user-cabinet-content .card-header').on('click', function () {
  setTimeout(() => {
    $('html, body').animate({ scrollTop: $(this).offset().top - $('#header').outerHeight() - 20 }, 300)
  }, 500);
})

// birthday
document.getElementById('birth_day')?.addEventListener('change', ({ target }) => {
	const deathDayInput = document.getElementById('death_day')
	if(deathDayInput) deathDayInput.min = target.value
})

// countries + cities lists
let currentCityRequest = null;

function loadCountries() {
    return fetch('/static/json/countries/countries.json')
        .then(res => res.json());
}

function loadCities(iso2) {
    if (currentCityRequest) {
        currentCityRequest.abort();
    }
    
    currentCityRequest = new AbortController();
    
    return fetch(`/static/json/cities/${iso2}.json`, { 
        signal: currentCityRequest.signal 
    })
        .then(res => res.json())
        .finally(() => {
            currentCityRequest = null;
        });
}

function updateCitySelects(cities) {
    document.querySelectorAll('[data-cities]').forEach(select => {
        const defaultOption = select.querySelector('option[value=""][disabled]');
        select.innerHTML = '';
        if (defaultOption) {
            select.appendChild(defaultOption);
        }
        cities.forEach(city => {
            const option = document.createElement('option');
            option.value = city;
            option.textContent = city;
            select.appendChild(option);
        });
    });
}

function createCountriesLists() {
    const selects = document.querySelectorAll('[data-countries]');
    if (!selects.length) return;
    
    loadCountries().then(countries => {
        selects.forEach(select => {
            countries.forEach(country => {
                const option = document.createElement('option');
                option.value = country.iso2;
                option.textContent = country.name;
                select.appendChild(option);
            });
            
            select.addEventListener('change', () => {
                if (!select.value) return;
                
                loadCities(select.value)
                    .then(cities => updateCitySelects(cities))
                    .catch(err => {
                        if (err.name !== 'AbortError') {
                            console.error('Ошибка загрузки городов:', err);
                        }
                    });
            });
        });
    });
}

createCountriesLists();