const path = require('path')
const express = require('express');
const hbs = require('hbs')
const geocode = require('../utils/geocode')
const forecast = require('../utils/forecast')

const app = express();
const port = process.env.PORT || 3000
//Define paths for express config
const publicPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')
//Setup handlebars engine and views location
app.set('view engine','hbs');
app.set('views',viewsPath);
hbs.registerPartials(partialsPath)

// Setup static directory
app.use(express.static(publicPath))

app.get('/',(req,res)=>{
    res.render('index',{
        title:'weather',
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:"help",
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:"about"
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'bad boy'
        })
    }

    geocode(req.query.address,(error,{location}={})=>{
        if(error){
            res.send({error})
        }
    forecast(location,(error,forecastData)=>{
            if(error){
                return res.send(error)
            }

            res.send({
                location,
                address:req.query.address,
                forecast:forecastData
            })
        })
    })
})
app.get('/help/*',(req,res)=>{
    res.render('four_0_four',{
        message:'article not found'
    })
})

app.get('*',(req,res)=>{
    res.render('four_0_four',{
        message:'page not found'
    })
})

app.listen(port,()=>{
    console.log(`Listening on port ${port}`)
})