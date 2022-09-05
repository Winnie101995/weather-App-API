// get the longitiute and latitiude
// get geo geo location 
window.addEventListener('load', () => {
    let lon;
    let lat;
    const temperatureDescription = document.querySelector('.temperature-description');
    const temperatureDegree = document.querySelector('.temperature-degree');
    const locationTimezone = document.querySelector('.location-timezone')
    const weatherIcon = document.querySelector('.weather-icon');
    const temperatureSection = document.querySelector('.degree-section');
    const temperatureSpan = document.querySelector('.degree-section span');
    const loader = document.querySelector('.loader');
     const main = document.querySelector('.main')

function init() {
    setTimeout(() => {
        loader.style.opacity = 0;
        loader.style.display = 'none';
        
        main.style.display = 'block';
        setTimeout(() => main.style.opacity = 1, 50);
    }, 5000);
    
}

init()   
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            console.log(position);
            lon = position.coords.longitude;
            lat = position.coords.latitude;

            console.log(lon)
            console.log(lat)
        
            const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=ec4a9e0988863b82cb4e4f3b0317635b`;
            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                    const { temp} = data.main;
                    const weatherInfo = data.weather[0].description;
                    const locationName = data.name;
                    const { icon } = data.weather[0]
                    console.log({icon})
                    // const weatherIcons = data.weather[0].icon;
                    // console.log(weatherInfo);
                    // console.log({ temp });
                    // console.log(locationName)
                    // console.log(weatherIcon);
                    //set DOM Element from API
                    temperatureDegree.textContent = temp;
                    temperatureDescription.textContent = weatherInfo;
                    locationTimezone.textContent = locationName;
                    //formulae for celcius 
                    let celsuis = Math.floor((temp - 32) * (5 / 9));
                        // Math.round((temp - 32) * (5 / 9) * 10) / 10;
                    // console.log(celsuis)
                    weatherIcon.innerHTML = `<img src="icons/${icon}.png"></img>`

                   //change temperature  to celcuis /farenhiet 
                    temperatureSection.addEventListener('click', () => {
                        if (temperatureSpan.textContent === "F") {
                            temperatureSpan.textContent = "C";
                            temperatureDegree.textContent = celsuis;
                        } else {
                            temperatureSpan.textContent = "F";
                            temperatureDegree.textContent = temp;
                       }
                    });

                });
        });
    } else {
        h1.textContent = "Hey this is not because of geolocation reasons"
    }
    
    });
   