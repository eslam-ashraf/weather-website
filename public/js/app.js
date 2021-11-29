console.log('this means that js file added successfully!!')

const weatherForm = document.querySelector('form');
const search = document.querySelector('input')

const weatherLocation = document.getElementById('weatherLocation')
const weatherForecast = document.getElementById('weatherForecast')

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    
    weatherForecast.textContent = "Loading..."
    weatherLocation.textContent = ""
    const location = search.value
    // fetch data from weather page
    fetch('http://localhost:3000/weather?address='+location).then((response) =>{
        response.json().then((data) =>{
            if(data.error){
                weatherForecast.innerText = data.error
            }else{

                weatherForecast.innerText = data.location
                weatherLocation.innerText = data.forecast
            }
        })

    })

})