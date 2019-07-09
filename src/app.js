const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')


const app = express()
const port = process.env.PORT || 3000
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

const publicDirectory = ((path.join(__dirname, '../public')))

app.use(express.static(publicDirectory))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'Pedro'

    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Pedro'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You have to provide an address'
        })
    } else {
        geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
            if (error) {
                return res.send({
                    error
                })
            }
            forecast(latitude, longitude, (error, forecastData) => {
                if (error) {
                    return res.send({
                        error
                    })
                }
                res.send({
                    location,
                    forecast: forecastData.summary,
                    temperature: forecastData.temperature,
                    windSpeed: forecastData.windSpeed
                })
            })
        })
    }
})
app.get('/help', (req, res) => {
    res.render('help', {
        message: 'Contact pedro@gmail.com',
        title: 'Help',
        name: 'Pedro'
    })
})

app.get('/prodcuts', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search'
        })
    }

    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('error', {
        title: 'Help page error',
        name: 'Pedro',
        errorMessage: 'Help page not found'
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        title: '404',
        name: 'Pedro',
        errorMessage: '404. Not found'
        
    })
})

app.listen(port)