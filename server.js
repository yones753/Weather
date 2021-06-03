const path = require('path')
const express = require('express')
const mongoose = require('mongoose')
const api = require('./server/routes/cityAPI')
const app = express()
const port = 3005
// const request = require('request')

mongoose.connect("mongodb://localhost/weather",{ useNewUrlParser: true })

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(express.static(path.join(__dirname, 'dist')))
app.use(express.static(path.join(__dirname, 'node_modules')))
app.use('/', api)



const cityApi = 'https://api.openweathermap.org/data/2.5/weather'
const key = '5f2ef77ab2ebe928102ffe423e8c062b'
let city = 'new york'





// request(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`, function (error, response, body) {
//     let myCity = JSON.parse(body)
// })

/*=====================================================
Start the server:
=======================================================*/

app.listen(port, function() {
    console.log(`Server up and running on port ${port}`)
})
