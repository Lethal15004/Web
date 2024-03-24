//Khai bao hằng số
const log=console.log;
const logt=console.table;
const tm=``


//Get data
let buttonSearch=document.querySelector(".card .search button")
let imgWeather=document.querySelector(".weather-icon")
let weatherDiv=document.querySelector('.weather')
let errorMessage=document.querySelector('.error')
buttonSearch.addEventListener('click',getDataSearch)
weatherDiv.classList.add('none')

function getDataSearch(){
    let searchText=document.querySelector(".card .search input[name='search']").value;
    getDataWeather(searchText,renderWeather)
}

function renderWeather(data){
    document.querySelector('.temp').innerText=Math.round(data.main.temp) + '°C';
    document.querySelector('.city').innerText=data.name;
    document.querySelector('.humidity').innerText=data.main.humidity + '%';
    document.querySelector('.wind').innerText=data.wind.speed +' km/h';
    switch(data.weather[0].main){
        case 'Rain':
            imgWeather.src='/Build_Weather/images/rain.png'
            break;
        case 'Snow':
            imgWeather.src='/Build_Weather/images/snow.png'
            break;
        case 'Clear':
            imgWeather.src='/Build_Weather/images/clear.png'
            break;
        case 'Clouds':
            imgWeather.src='/Build_Weather/images/clouds.png'
            break;
        case 'Drizzle':
            imgWeather.src='/Build_Weather/images/drizzle.png'
            break;
        case 'Mist':
            imgWeather.src='/Build_Weather/images/mist.png'
            break;
    }
}
function errorData(message){
    errorMessage.innerText=message;
}
function getDataWeather(cityName,callback){
    let weatherAPI=`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=ceafcfd71211d329b09801626f680d00&units=metric&lang=vi`
    fetch(weatherAPI)
        .then(function(response){
            if(response.status === 404){
                weatherDiv.classList.add('none');
                errorMessage.classList.remove('none');
                errorData('Không tìm thấy tên thành phố')
            }
            else{
                errorMessage.classList.add('none');
                weatherDiv.classList.remove('none');
                return response.json()  
            }
        })
        .then(callback)
        .catch(function(err){
            log(err)
        })
}



