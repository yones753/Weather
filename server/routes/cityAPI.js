const express = require('express')
const router = express.Router()
const City = require("../models/City")
const request = require('request')
const apiIcon = "http://openweathermap.org/img/w/"


router.get('/city/:city', function (req, res) {
    let { city } = req.params
    let nameCity = city.charAt(0).toUpperCase() + city.slice(1)
    const cityP = City.find({name : nameCity})
    cityP.then(function(res){
        // if(res.lenght > 0){

        // }
    })
    
    request(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=5f2ef77ab2ebe928102ffe423e8c062b`, function (error, response, body) {
        let myCity = JSON.parse(body)
        if(myCity.cod === 200){
            let theCity = new City({
                name: myCity.name,
                temp: myCity.main.temp,
                condition: myCity.weather[0]["description"],
                conditionPic: `${apiIcon}${myCity.weather[0].icon}.png`,
                isAdded: false
            })
            res.send(theCity)
        }else{
            res.send(myCity.cod)
        }
        
    })
})



router.get('/cities', function (req, res) {
    City.find({})
        .sort({_id: -1})
        .exec((err, cities) => res.send(cities))
})


router.post('/city', function (req, res) {
    let myCity = req.body
    let theCity = new City({
        name: myCity.name,
        temp: myCity.temp, 
        condition: myCity.condition,
        conditionPic: myCity.conditionPic,
        isAdded : myCity.isAdded
    })
    const cityP = City.find({name : myCity.name})

    cityP.then(function(res){
        console.log(res)
    })
    
    const cityPromise = theCity.save()
    cityPromise.then(function (city) {
        res.send(`add ${city.name} in database`)
    })
})

router.delete('/city/:cityName', function (req, res) {
    let { cityName } = req.params
    console.log(cityName);
    const cityPromise = City.find({ name: cityName }, { _id: 1 })
    cityPromise.then(function (cityId) {
        City.remove({ _id: cityId[0]._id })
            .exec(function (err, result) {
                res.send(`${cityName}`)
            })
    })
})

module.exports = router