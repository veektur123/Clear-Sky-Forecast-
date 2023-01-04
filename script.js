const Apikey = "8fee0ba025c40be55108dfce2bc435df"
const searchInput = document.getElementById("search-input")
const searchButton = document.getElementById("search-button")

searchButton.addEventListener("click", (e)=>{
    e.preventDefault()
    const city = searchInput.value 
    console.log(city)
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${Apikey}`
    fetch(url).then((response)=>{
        return response.json()
    }).then((data)=>{
        console.log(data)
        const {lon,lat} = data.coord
        const fiveDayUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${Apikey}`
        return fetch(fiveDayUrl)
    }).then((response)=> {
        return response.json()
        
    }).then((data)=>{
        console.log(data)
    })

    
})
