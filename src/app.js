const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geoCode = require('./utils/geocode');
const forecast = require('./utils/forecast');

console.log(__dirname);
console.log(__filename);

console.log(path.join(__dirname, '../public'));

const app = express();

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Ashik Shrestha'
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Ashik Shrestha'
    });
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Me',
        name: 'Ashik Shrestha'
    })
})

// app.get('', (req, res) => {
//     res.send('<h1>Hello express</h1>');
// })

// app.get('/help', (req, res) => {
//     res.send({ name : 'Ashik', age : 27 });
// })

// app.get('/about', (req, res) => {
//     res.send('<h1>About Page</h1>');
// })

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return  res.send({error: "You must enter the address"});
    }
    const location = req.query.address;
    geoCode(location, (error, data={}) => {
        if(error){
            return res.send({error: "You must enter correct address"});
        }
        forecast(data, (error, forecastData) => {
            if(error){
                return res.send({ error })
            }
            res.send({
                forecast: forecastData,
                location: data.location,
                address: req.query.address
            })
        })
    })
    //res.send({forecast: 'It is gloomy.', location: 'Bangalore', address: req.query.address});
   
})

app.get('/products', (req, res) => {
    console.log(req.query)
    if(!req.query.search){
       return res.send({error: "You must provide a search term"})
    }
    res.send({
        products: []
    })
})

//app.com
//app.com/help

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Ashik Shrestha',
        errorMessage: 'Help Article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Ashik Shrestha',
        errorMessage: 'Page Not Found'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000!');
})