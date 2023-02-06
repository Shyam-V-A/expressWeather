const express = require('express')
const path = require('path')

console.log(path.join(__dirname,'../public'))

const app = express()


//define path for express config
const publicDirectory = path.join(__dirname,'../public')
const pathView = path.join(__dirname,'../templates')


app.set('view engine','hbs')
app.set('views',pathView)
app.use(express.static(publicDirectory))


//using hbs views handlebars
app.get('',(req,res) => {
    res.render('index',{
        title: "weather app",
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

app.get('/weather',(req,res) => {
    res.send(['<h1>welcome to weather service</h1>',[
        {
            location: 'Bengaluru',
            temp: 28
        }
    ]])
})

app.listen(3000, () => {
    console.log("server is up on port 3000")
})

// app.com
// app.com/help
// app.com/about


// console.log(__dirname)
// console.log(__filename)

