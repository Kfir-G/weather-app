const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express() //strat express

//Define path for Express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname, '../tamplates/views')
const partialsPath = path.join(__dirname, '../tamplates/partials')

//Setup handlers engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

//index page:
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App', 
        name:'Kfir'
    })
})

app.get('/weather', (req,res) => {
    if(! req.query.address){
        return res.send({
            error:'You must provide an address'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location}) => {
        if(error){
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData ) => {
            if(error){
                res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

//About Me Page
app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About Me',
        name:'Kfir'
    })
})

app.get('/help', (req,res) => {
    res.render('404', {
        titie:'404',
        name:'Kfir',
        errorMessage: 'Help article NOT Found'
    })
})

app.get('/help/*' ,(req, res) => {
    res.send('help not found')
})

app.get('*' ,(req, res) => {
    res.render('404', {
        title:'404',
        name:'Kfir',
        errorMessage:'Page NOT Found'
    })
})

//Listner
app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})