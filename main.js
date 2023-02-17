let lat // latitude - szerokość
let long // longitude - długość
const apiKey = '1e8fe554757daace091d70a8daae5a7f' // klucz API z OpenWeather

const startApp = () => {
	// prośba o wykrycie lokalizacji
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(position => {
			lat = position.coords.latitude
			long = position.coords.longitude

			console.log(`lat: ${lat}, long: ${long}`)

			getWeatherData()
		})
	}
}

const getWeatherData = () => {
	let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=${apiKey}`
	console.log(url)

	fetch(url)
		.then(response => response.json())
		.then(data => {
			console.log(data)
			updateWeatherData(data)
		})
}

updateWeatherData = data => {
	// pobranie spanów, w których będziemy wyświetlać dane
	const temp = document.querySelector('#temp')
	const humidity = document.querySelector('#humidity')
	const pressure = document.querySelector('#pressure')
	const cloudsPerc = document.querySelector('#cloudsPerc')
	const windSpeed = document.querySelector('#windSpeed')
	const sunRise = document.querySelector('#sunRise')
	const sunSet = document.querySelector('#sunSet')
	const weatherImg = document.querySelector('#currentWeatherImg')
	const locationLink = document.querySelector('#locationLink')
	const lastUpdateInfo = document.querySelector('.last-update-info')

	// przypisanie wcześniej pobranym spanom danych z serwera
	temp.innerHTML = Math.round(data.main.temp) + '°C'
	humidity.innerHTML = data.main.humidity + '%'
	pressure.innerHTML = data.main.pressure + 'hPa'
	cloudsPerc.innerHTML = data.clouds.all + '%'
	windSpeed.innerHTML = Math.round(data.wind.speed) + 'km/h'

	// konwersja z czasu uniksowego
	sunRise.innerHTML =
		new Date(data.sys.sunrise * 1000).getHours() + ':' + new Date(data.sys.sunrise * 1000).getMinutes()
	sunSet.innerHTML = new Date(data.sys.sunset * 1000).getHours() + ':' + new Date(data.sys.sunset * 1000).getMinutes()

	// zaimportowanie obrazka
	let imgUrl = `http://openweathermap.org/img/wn/10d@2x.png`
	weatherImg.setAttribute('src', imgUrl)

	locationLink.innerHTML = data.name
	locationLink.href = `https://openstreetmap.org/#map=12/${lat}/${long}`

	lastUpdateInfo.innerHTML = new Date(data.dt * 1000)
}
