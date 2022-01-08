
const request = require('request')

const forecast = (longitude, latitude, callback) =>{
    const url = 'http://api.weatherstack.com/current?access_key=8cde092c112c2a81306a55877a445817&query=' + latitude + ',' +  longitude + '&units=f'
    // const url = 'http://api.weatherstack.com/current?access_key=8cde092c112c2a81306a55877a445817&query=New%20York&units=f'

    
    request({ url: url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0] + ". It is currently " + body.current.temperature + " degress out.")
        }
    })
}

module.exports = forecast



// const url = 'http://api.weatherstack.com/current?access_key=8cde092c112c2a81306a55877a445817&query=New%20York&units=f'
// request({url: url, json: true},(error, response)=>{
//     // const data = JSON.parse(response.body)
//     // console.log(response.body.current)
//     if(error){
//         console.log('Unable to connect to weather service!')
//     }else if (response.body.error){
//         console.log('Unable to find location!')
//     }
//     else{
//         console.log( response.body.current.weather_descriptions[0] + '. Its currently ' + response.body.current.temperature+ ' degree. It feels like '+ response.body.current.feelslike +  ' degree out.' )
//     }

// })