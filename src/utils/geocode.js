const request=require('request')
// //Geocoding(gives the logitude and latitude for a place)
// //address->lat/long(backend)->temp
// const geocodeURL='https://api.mapbox.com/geocoding/v5/mapbox.places/philadelphia.json?access_token=pk.eyJ1Ijoia3J5cHRvbjIxIiwiYSI6ImNranFzZW5wdDFreWQyemxldm9odm1mOG8ifQ.2nolg7cioKJZdmw76bXL1w&limit=1'
// request({url:geocodeURL,json:true},(error,response)=>{
//     if(error){

//         console.log('unable to connect !')

//     }else if (response.body.features.length===0){

//         console.log('Enter a valid location !')

//     }
//     else{
//     const latitude=response.body.features[0].center[1]
//     const longitude=response.body.features[0].center[0]
//     console.log(latitude,longitude)
//     }
// })
const geocode = (address,callback)=>{

    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address) +'.json?access_token=pk.eyJ1Ijoia3J5cHRvbjIxIiwiYSI6ImNranFzZW5wdDFreWQyemxldm9odm1mOG8ifQ.2nolg7cioKJZdmw76bXL1w&limit=1'
    request({url:url,json:true},(error,{body})=>{

        if(error){
            callback('Unable to connect to location services!',undefined)
        }else if(body.features.length===0){
                callback('unable to find location .',undefined)
        }else{
            callback(undefined,{
                
                longitude:body.features[0].center[0],
                latitude:body.features[0].center[1],
                location:body.features[0].place_name

            })
        }

    })
}
module.exports=geocode