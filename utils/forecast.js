const request = require('request');
const forecast = (city,callback)=>{
const url = `http://api.weatherstack.com/current?access_key=ca50c5ce00ebdf0c4aae064b79170fc3&query=${city}` 

request({ 
    url,
    json: true
},(error,{body})=>{
if(error){
    callback('error cannot connect',null)
} else if(error) {
callback("cant find location",null);
} else{
callback(null,`In ${body.location.name} It is currently ${body.current.temperature} degress. there is a ${body.current.precip * 10}% chance of rain`)
}})
}

module.exports = forecast