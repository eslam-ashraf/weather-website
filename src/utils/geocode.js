const request = require('request')

const geoCode = (address ,callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiZXNsYW1hc2hyYWYiLCJhIjoiY2t2dGRzMWNnMnZzejJ4b3U2Z2c2a3k5YiJ9.PmXukEhSQxqrt1_ODJBF-A'

    request({url , json:true},(error ,{body}={})=>{
       if(error){
       callback ('unable to connect to locations services!!',undefined)
       }else if (body.features.length === 0){
         callback('Unable to find location. try another search. ', undefined)
       }else{
          callback(undefined,{
             latitude:body.features[0].center[1],
             longitude:body.features[0].center[0],
             location:body.features[0].place_name
          })
       }
    })
 }
 module.exports = geoCode;