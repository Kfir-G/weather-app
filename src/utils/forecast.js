const request = require('request')

const tokenWeather = '8c45aa2e9031483595f80310210808'

// https://api.weatherapi.com/v1/current.json?key=8c45aa2e9031483595f80310210808&q=48.8567,2.3508
const forecast = (lat, lon, callback) => {
    const url =  'https://api.weatherapi.com/v1/current.json' 
    + '?key=' + tokenWeather 
    + '&q=' + lat + ',' + lon

    request({url,json : true}, (error,{body}) => {
        if(error){ // low level
            callback('Unable connect to weather service!',undefined)
        }else if(body.error){//error respone level
            callback('Unable to find location!', undefined)
        }else{
            callback(undefined,
                'It is currently ' + 
                body.current.temp_c + ' degress out and ' + 
                body.current.condition.text 
            )
        }
    })
}

module.exports = forecast