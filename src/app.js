const express = require('express')
const hbs = require('hbs')
const path = require('path')
const request = require('request')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


// console.log(__dirname)
// console.log(__filename)

// console.log(path.join(__dirname, '../public'))

const app = express()

//Defining path for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup HandleBars and Views Engine
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))


app.get('', (req, res)=>{
    res.render('index', {
        title: 'Weather',
        name: 'Anup Dhakal'
    })
})

// app.get('', (req, res)=>{
//     res.send({
//         name: 'Andrew',
//         age: 27
//     })
// })

app.get('/help', (req, res)=>{
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Anup Dhakal'
    })
})

app.get('/about', (req, res)=>{
    res.render('about', {
        title: 'Weather App',
        name: 'Anup Dhakal'
    })
})

app.get('/weather', (req, res)=>{
    // console.log(req.query.address)
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address!'
        })
    }
    const address_value = req.query.address
    geocode(address_value, (error, {latitude, longitude, location} = {})=>{
        // console.log('Error', error)
        // console.log('Data', data)
        if (error){
            return res.send({ error: 'No address'})
        }
        forecast(longitude, latitude, (error, forecastData) => {
            if(error){
                return res.send({error: 'Error'})
            }
            // console.log('Error', error)
            // console.log('Data', data)
            // console.log(location)
            // console.log(forecastData)
            res.send({
                location: location,
                forecast: forecastData,
                address: req.query.address
            })
          })
    })    


    // console.log(req.query.address)
    // res.send({
    //     forecast: 'It is raining',
    //     location: 'Kathmandu, Nepal',
    //     address: req.query.address
    // })
})

app.get('/products', (req, res)=>{
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term.'
        })
    }
    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Anup Dhakal',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Anup Dhakal',
        errorMessage: 'Page not found.'
    })
})





app.listen(3000, () =>{
    console.log("App is running at port 3000")
})