const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector('#one')

weatherForm.addEventListener('submit',(e)=> {
    e.preventDefault();
    const location = search.value
message1.textContent = 'loading'

fetch(`http://api.weatherstack.com/current?access_key=ca50c5ce00ebdf0c4aae064b79170fc3&query=${location}`).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            let dataError = data.error
            message1.textContent= JSON.stringify(dataError.info)
        } else {
            let location = data.location.name
            let weather = data.current
            message1.textContent= `The temperature in ${location} is ${JSON.stringify(weather.temperature)} degrees Celsius!`
           
        }
    })
})
  
})