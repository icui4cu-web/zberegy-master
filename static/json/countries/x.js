const fs = require('fs');

// Читаем файлы
const countriesWithCities = JSON.parse(fs.readFileSync('countries+cities.json', 'utf8'));
const countriesData = JSON.parse(fs.readFileSync('countries.json', 'utf8'));

// Создаем Map для быстрого поиска iso2 по имени страны
const countryMap = new Map(
    countriesData.map(c => [c.name, c.iso2])
);

// Массив стран с iso2
const countries = countriesWithCities
    .map(country => ({
        name: country.name,
        iso2: countryMap.get(country.name)
    }))
    .filter(c => c.iso2); // убираем страны без iso2

// Сохраняем файл со странами
fs.writeFileSync('countries_output.json', JSON.stringify(countries, null, 2));

// Создаем файлы с городами для каждой страны
countriesWithCities.forEach(country => {
    const iso2 = countryMap.get(country.name);
    if (iso2) {
        fs.writeFileSync(`${iso2}.json`, JSON.stringify(country.cities, null, 2));
    }
});

console.log('Готово!');