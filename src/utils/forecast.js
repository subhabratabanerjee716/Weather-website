const request=require('request')
const forecast =(latitude,longitude,callback)=>{

    const url ='http://api.weatherstack.com/current?access_key=6798b302b673e24a40637da51fa2cde9&query='+latitude+','+longitude+'&units=f' 
//url:url

    request({url,json:true},(error,{body})=>{

        if(error){
            callback('Unable to connect',undefined)
        }else if(body.error){
            callback('unable to find location',undefined)
        }else{
                callback(undefined,body.current.weather_descriptions + ',the temperature feels like '+ body.current.feelslike+' F out.')
        }

    })

}
module.exports=forecast