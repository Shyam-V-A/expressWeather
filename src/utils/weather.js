const request = require('request')

const url = 'http://api.weatherapi.com/v1/current.json?key=cfd65f3a32bd4fd59a1103103233101&q='

// request({ url: url}, (error, response) => {
//     try {
//         if(error){
//             console.log("Unable to conncet to weather service, check your internet connection")
//         }
//         // else 
    
//         // }
//         else{
//             const data = JSON.parse(response.body)
//             if(data.error){
//                 console.log(data.error.code +"   "+  data.error.message)
//             }else{
//             console.log("it is currently " +  data.current.temp_c + " degree centigrade, but it feels like " + data.current.feelslike_c + " degree centigrade")
//             //console.log(data)
//             }
//         }
//     }catch (error) {
//         console.log("something went wrong")
//     }
    
//     ///console.log(response)
// })

const weather = (latitude,longitude, callBack) => {
    const url = 'http://api.weatherapi.com/v1/current.json?key=cfd65f3a32bd4fd59a1103103233101&q='+encodeURIComponent(latitude)+','+encodeURIComponent(longitude)
    //request({ url: url, json:true}, (error, response) => {
    request({ url, json:true}, (error, {body}) => {

        try {
            if(error){
                callBack("Unable to conncet to weather service, check your internet connection",undefined)
            }
            else{
                //const data = response.body
                const data = body

                if(data.error){
                    callBack(data.error.code +"   "+  data.error.message,undefined)
                }else{
                    callBack(undefined,"it is currently " +  data.current.temp_c + " degree centigrade, but it feels like " + data.current.feelslike_c + " degree centigrade")
                //console.log(data)
                }
            }
        }
        catch (error) {
            callBack("something went wrong",undefined)
        } 
        ///console.log(response)
    })
}

module.exports = weather