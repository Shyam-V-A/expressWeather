const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geoCode = require('./utils/geoCode')
const weather = require('./utils/weather')

//console.log(path.join(__dirname,'../public'))

const app = express()

//define path for express config
const publicDirectory = path.join(__dirname,'../public')
const pathView = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',pathView)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectory))


//using hbs views handlebars
app.get('',(req,res) => {
    res.render('index',{
        title: "Weather-app",
        name: "Shyam"
    })
})

app.get('/about',(req,res) => {
    res.render('about',{
        title: "About",
        name: "Shyam"
    })
})

app.get('/help',(req,res) => {
    res.render('help',{
        title: 'Help',
        message: "you can get help here",
        name: 'Shyam'
    })
})
//route
// app.get('',(req,res) => {
//     res.send("<h1>hello express!</h1>")

// })

// app.get('/help',(req,res) => {
//     res.send('help page!')
// })

// app.get('/about',(req,res) => {
//     res.send([{
//         name: 'Shyam',
//         work: 'AppZoy'
//     },
//     {
//         name: 'Shivam',
//         work: 'Swaim'
//     }])
// })

// app.get('/weather',(req,res) => {
//     res.send(['<h1>welcome to weather service</h1>',[
//         {
//             location: 'Bengaluru',
//             temp: 28
//         }
//     ]])
// })

app.get('/weather',(req,res) => {
    if(!req.query.address){
        return res.send({
            error: "you must provide an address"
        })
    }

    // res.send(['<h1>welcome to weather service</h1>',
    //     [
    //         {
    //             location: req.query.address,
    //             temp: 28
    //         }
    //     ]
    // ])

    geoCode(req.query.address, (error, {latitude,longitude,location} = {})=> {

        if(error){
            return res.send({ error})
        }
        else{
            
            //console.log('data : ',data.location)
            //console.log('data : ',location)

            //weather(data.longitude,data.latitude,(error,data) => {
            weather(latitude,longitude,(error,forecast) => {

                if(error){
                    return res.send({
                        error,
                        location
                    })
                }
                else{
                    return res.send({
                        forecast,
                        address: req.query.address,
                        location,
                        latitude,
                        longitude
                    })
                }
            })
            
        }
    })

})

app.get('/products',(req,res) => {
    if(!req.query.search){
        return res.send({
            error: "you must provide a search term"
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})


app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Shyam',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Shyam',
        errorMessage: 'Page not found.'
    })
})


app.listen(3000, () => {
    console.log("server is up on port 3000")
})

// app.com
// app.com/help
// app.com/about


// console.log(__dirname)
// console.log(__filename)

