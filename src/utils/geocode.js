const request = require('request')
const geocode = (address, callback) =>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) +  '.json?limit=2&access_token=pk.eyJ1IjoiYW51cDgxIiwiYSI6ImNrZXBxOHl2YTA0a3YyenFzYWtpNDBudXgifQ.85OC3VXCrfpeNjnx_saTcw&limit=1'

    request({url: url, json: true}, (error, {body})=>{
        if(error){
            callback('Unable to connect to weather service!', undefined)
        }else if(body.features.length === 0){
            callback('Unable to find location!', undefined)
        }else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })

}

module.exports = geocode



// const geocodeURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/los%20Angeles.json?limit=2&access_token=pk.eyJ1IjoiYW51cDgxIiwiYSI6ImNrZXBxOHl2YTA0a3YyenFzYWtpNDBudXgifQ.85OC3VXCrfpeNjnx_saTcw&limit=1'

// request({url: geocodeURL, json: true}, (error, response)=>{

//     if(error){
//         console.log('Unable to connect to weather service!')
//     }else if(response.body.features.length === 0){
//         console.log('Unable to find location!')
//     }else{
//         const latitude = response.body.features[0].center[1]
//         const longitude = response.body.features[0].center[0]
//         console.log(latitude, longitude)
//     }
    
    
// })
