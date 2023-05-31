/*Calling all needed sections on HTML*/
const cssRoot = document.querySelector(':root');
const mainInfoSection = document.querySelector('.main-info');
const errorInfoSection = document.querySelector('.error-info');
const extraInfoSection = document.querySelector('.extra-info');

/*Calling all needed elements*/
const searchBar = document.querySelector('.search-input');
const searchButton = document.querySelector('.search-btn');
const cityName = document.querySelector('.city');
const tempC = document.querySelector('.temp-c');
const tempF = document.querySelector('.temp-f');
const weatherCondition = document.querySelector('.condition');
const windInfo = document.querySelector('.wind-info');
const humidityInfo = document.querySelector('.humidity-percent');
const weatherImg = document.querySelector('.temp-box img');

searchButton.addEventListener('click', async () => {

    let city = searchBar.value;

    if (city === '') {
        mainInfoSection.classList.add('hidden');
        errorInfoSection.classList.add('hidden');
        extraInfoSection.classList.add('hidden');

        cssRoot.style.setProperty('--color-one', '#526172');
        cssRoot.style.setProperty('--color-one-dark', '#2C3E50');
        cssRoot.style.setProperty(' --color-two', '#f5f5f5');
        return;
    }
    else {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '***',
            'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
        }
    };
    
    fetch(`https://weatherapi-com.p.rapidapi.com/current.json?q=${city}`, options)
    .then(response => response.json()).then(json => {
        try {
            mainInfoSection.classList.remove('hidden');
            errorInfoSection.classList.add('hidden');
            extraInfoSection.classList.remove('hidden');

            cityName.textContent = json.location.name + ", " + json.location.country;
            tempC.textContent = Math.round(json.current.temp_c);
            tempF.textContent = Math.round(json.current.temp_f);
            weatherCondition.textContent = json.current.condition.text;
            windInfo.textContent = json.current.wind_kph + "Km/h";
            humidityInfo.textContent = json.current.humidity + "%";
            weatherImg.src = json.current.condition.icon;

            console.log(json);
            if (json.current.is_day == '1') {
                if (json.current.condition.text == 'Moderate or heavy rain with thunder' || 
                    json.current.condition.text == 'Light Rain') {
                    cssRoot.style.setProperty('--color-one', '#81AFCE');
                    cssRoot.style.setProperty('--color-one-dark', '#2E86C1');
                }
                else if (json.current.condition.text
                    == 'Sunny') {
                    cssRoot.style.setProperty('--color-one', '#7CC2F1');
                    cssRoot.style.setProperty('--color-one-dark', '#2E86C1');
                }
                else if (json.current.condition.text
                    == 'Partly cloudy') {
                    cssRoot.style.setProperty('--color-one', '#7ABBE6');
                    cssRoot.style.setProperty('--color-one-dark', '#2E86C1');
                }
                else {
                    cssRoot.style.setProperty('--color-one', '#5499C7');
                    cssRoot.style.setProperty('--color-one-dark', '#2E86C1');
                }
            }
            else if (json.current.is_day == '0'){
                cssRoot.style.setProperty('--color-one', '#1F618D');
                cssRoot.style.setProperty('--color-one-dark', '#154360');
            }

        } catch (error) {
            console.log("Response status : " + json.error.code);
            mainInfoSection.classList.add('hidden');
            errorInfoSection.classList.remove('hidden');
            extraInfoSection.classList.add('hidden');

            cssRoot.style.setProperty('--color-one', '#526172');
            cssRoot.style.setProperty('--color-one-dark', '#2C3E50');
            cssRoot.style.setProperty(' --color-two', '#f5f5f5');

        }

        });
    }
});