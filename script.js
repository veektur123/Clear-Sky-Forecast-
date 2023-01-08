const Apikey = "8fee0ba025c40be55108dfce2bc435df"
const searchInput = document.getElementById("search-input")
const searchButton = document.getElementById("search-button")
const fiveDayCards = document.getElementsByClassName("card")

searchButton.addEventListener("click", (e)=>{
    e.preventDefault()
    const city = searchInput.value 
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${Apikey}&units=imperial`
    fetch(url).then((response)=>{
        return response.json()
    }).then((data)=>{
        const {lon,lat} = data.coord
        const fiveDayUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${Apikey}&units=imperial`
        const currentForecast = document.getElementById("todays-weather")
        const tempSlot = currentForecast.children[2]
        tempSlot.textContent= `Temp: ${data.main.temp}\u00B0F`
        const windSlot = currentForecast.children[3]
        windSlot.textContent= `Wind: ${data.wind.speed} MPH`
        const humidSlot = currentForecast.children[4]
        humidSlot.textContent= `Humidity: ${data.main.humidity} %`
        const cityDateSlot = currentForecast.children[0]
        const todayIsoString = new Date().toISOString()
        parseAndPopulateDate(todayIsoString, cityDateSlot, 'T', data.name)
        const imageSlot = currentForecast.children[1]
        imageSlot.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
        localStorage.setItem(data.name, data.name)
        console.log(data)
        return fetch(fiveDayUrl)
    }).then((response)=> {
        return response.json()
        
    }).then((data)=>{
        let j = 3; 
        for (let i = 0; i < 5; i++) {
            const weatherForDay = data.list[j];
            const cardForDay = fiveDayCards[i]
            
            j+= 8
            console.log(weatherForDay)
            const tempSlot = cardForDay.children[0].children[2]
            tempSlot.textContent= `Temp: ${weatherForDay.main.temp}\u00B0F`
            const windSlot = cardForDay.children[0].children[3]
            windSlot.textContent= `Wind: ${weatherForDay.wind.speed} MPH`
            const humidSlot = cardForDay.children[0].children[4]
            humidSlot.textContent= `Humidity: ${weatherForDay.main.humidity} %`
            const imageSlot = cardForDay.children[0].children[1]
            imageSlot.src = `https://openweathermap.org/img/wn/${weatherForDay.weather[0].icon}@2x.png`
            const [date] = weatherForDay.dt_txt.split(' ')
            const [year, month, day] = date.split('-')
            const dateSlot = cardForDay.children[0].children[0]
            dateSlot.textContent= `${month}/${day}/${year}`
            parseAndPopulateDate(weatherForDay.dt_txt, dateSlot, ' ')
        }
    })

    
})


const parseAndPopulateDate = (dateTimeString, elementToPopulate, splitCriteria, city) => {
    const [date] = dateTimeString.split(splitCriteria)
    const [year, month, day] = date.split('-')
    let cityString = ''
    if(city){
        cityString = city + " "
    }
    elementToPopulate.textContent= cityString + `${month}/${day}/${year}`
}
