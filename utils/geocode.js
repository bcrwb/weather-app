const request = require('request');
const geocode = (address,callback) =>{
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiYmNyd2IiLCJhIjoiY2s4bHlmZ21iMDk5MDNnbjFmdm1ydGNmbiJ9.qK-X4K0lm6DSnarvc6pR0w`
   
    request({url,json:true},(error,{body})=>{
        if(error){
            callback('Cannot connect',null)
        } else if (body.features.length===0){
            callback('bad request',null)
        } else {
            callback(null,{
                latitude:body.features[0].center[0],
                longitude:body.features[0].center[1],
                location:body.features[0].place_name
            })
        }
    })
    
    }

    module.exports = geocode