class ManagementCity {

    constructor() {
        this.cityData = []
    }


    async getDataFromDB() {
        const cities = await $.get(`/cities`)
        this.cityData = cities
    }
    async getCityData(cityName) {
        let myCity = await $.get(`/city/${cityName}`) 
        let city = {
            _id: myCity._id,
            name: myCity.name,
            temp: myCity.temp,
            condition: myCity.condition,
            conditionPic: myCity.conditionPic,
            isAdded: myCity.isAdded
        }
        
        let isExist = !this.cityData.find(o => o.name == firstLetterToUpperCase(cityName))
        console.log("isExist: ", isExist);
        if(myCity !== "404" && isExist){
            this.cityData.unshift(city)
            console.log("succes- ")
        } else{
            console.log("error- ")
        }
        
    }

    saveCity = function (nameCity) {
        let data = this.cityData.filter(city => city.name === nameCity)
        console.log("data[0]",data);
       
        data[0].isAdded = true

            $.post('/city',data[0], function (res) {
                console.log("res = ",res);
             })
        
    }
    deleteCityFromArr =  function(nameCity){
         let data = this.cityData.filter(city => city.name !== nameCity) 
        this.cityData = data
    }
    
     deleteCityFromDB = function (name) {
        return $.ajax({
            url:`city/${name}`,
            type: 'DELETE',
            success: function(nameCity) {
                alert(`Delete ${nameCity}`)
                return nameCity
            }
        }); 
        //console.log("bb",city);
        //this.deleteCityFromArr(city)
    }

   
} 

const  firstLetterToUpperCase = (name) => {
    let strArray = name.split(" ")
    let cityName
    let str 
    let charToUpperCase
    let charLowerCase 
    for (const indx in strArray) {
        str = strArray[indx]
        charToUpperCase = str.charAt(0).toUpperCase()
        charLowerCase = str.toLowerCase().slice(1)
        if (indx == 0) {
            cityName = charToUpperCase + charLowerCase
        } else {
            cityName = `${cityName} ${charToUpperCase}${charLowerCase}`
        }
    }
    return cityName
}