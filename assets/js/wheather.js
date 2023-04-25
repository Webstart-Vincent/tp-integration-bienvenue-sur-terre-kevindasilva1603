const allCity = document.querySelectorAll('.city')
const rustine = document.querySelector('.rustine')
const weather = document.querySelector('.weather')
const temperature = document.querySelector('.temperature')
const weatherIcon = document.querySelector('.weather-icon')

const getWheather = async (lat, lon, lang, units, apiKey) => {
    return await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=${lang}&units=${units}&appid=${apiKey}`
    ).then((response) => response.json())
}

const attendsUnPeu = (callback) => {
    weather.innerHTML = 'Chargement...'
    temperature.innerHTML = ''
    weatherIcon.src = './assets/icons/loader.svg'
    setTimeout(callback, 1000)
}

const setWeather = (city, index) => {
    if (!city.classList.contains('active')) {
        city.classList.add('active')
        rustine.style.transform = `translate(5px, ${48 * index}px)`
        attendsUnPeu(() => {
            getWheather(
                city.getAttribute('data-lat'),
                city.getAttribute('data-long'),
                'fr',
                'metric',
                '2804f73cc847e3e5ebcc8bb43dd209eb'
            ).then((data) => {
                let temperatureText = '' + data.main.temp
                weather.innerHTML = data.weather[0].description
                temperature.innerHTML = temperatureText.replace('.', ',')
                weatherIcon.src =
                    './assets/icons/' + data.weather[0].icon + '.svg'
            })
        })
    }
}

allCity.forEach((city, index) => {
    city.addEventListener('click', function clickWeather() {
        allCity.forEach((c) => {
            c.classList.remove('active')
        })
        setWeather(city, index)
    })
})
