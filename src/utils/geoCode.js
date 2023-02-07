const request = require('request')


//geo coding services
// const geoCodingURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1Ijoic2h5YW1hcGJveCIsImEiOiJjbGRrNXF0amUwM2FuNDBvM21sNXkweHN1In0.MisUXUiTsAnSH-AXP3goRw&limit=1'

// request({url: geoCodingURL}, (error,response) => {
//     try{
//         if(error){
//             console.log("Unable to conncet to geocoding service, check your internet connection")

//         }
//         else{
//             const data = JSON.parse(response.body)
//             if(data.message){ 
//                 console.log(data.message)
//             }
//             else{
//                 const latitude = data.features[0].center[0] 
//                 const longitude = data.features[0].center[1] 
//                 console.log("latitude: "+ latitude + " longitude: "+ longitude)
//             }
//         }

//     }
//     catch(error){
//         console.log("something went wrong")
//     }
// })

const geoCode = (address, callBack) => {
    
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1Ijoic2h5YW1hcGJveCIsImEiOiJjbGRrNXF0amUwM2FuNDBvM21sNXkweHN1In0.MisUXUiTsAnSH-AXP3goRw&limit=1'
    request({url, json: true}, (error,{body}) => { 
        try{
            if(error){
                callBack("Unable to conncet to geocoding service, check your internet connection",undefined) 
            }
            else{
                const data = body
                if(data.message){ 
                    //console.log(data.message)
                    callBack(data.message,undefined)
                }
                else{
                    callBack(undefined,{
                        latitude : data.features[0].center[1],
                        longitude : data.features[0].center[0],
                        location : data.features[0].place_name
                    })
                    // const latitude = data.features[0].center[0] 
                    // const longitude = data.features[0].center[1] 
                    // console.log("latitude: "+ latitude + " longitude: "+ longitude)
                }
            }
    
        }
        catch(e){
            callBack("Something went wrong. Please provide a valid address",undefined)
        }
    })

}

//const geocodeURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiYW5kcmV3bWVhZDEiLCJhIjoiY2pvOG8ybW90MDFhazNxcnJ4OTYydzJlOSJ9.njY7HvaalLEVhEOIghPTlw&limit=1'

module.exports = geoCode