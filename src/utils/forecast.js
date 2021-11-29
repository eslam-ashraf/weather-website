const request = require('request');



// const url ='http://api.weatherstack.com/current?access_key=43bbaf8b0263501073866c9b3b37fa01&query=37.8267,-122.4233&units=f';

// request({ url:url , json: true} ,(error ,response) =>{

//     if(error){
//         console.log('you have an error at connection so please make sure!!')
//     }else{
//         console.log(chalk.yellow.inverse(response.body.current.weather_descriptions[0]) + '. the tempreture is ' + chalk.green.inverse(response.body.current.temperature) + ' degrees out .it feels like ' + chalk.red.inverse(response.body.current.feelslike) + ' degrees out.')
//     }
// })

const forecast = (latitude,longitude,callback) =>{
    const url = 'http://api.weatherstack.com/current?access_key=43bbaf8b0263501073866c9b3b37fa01&query='+latitude+','+longitude+'&units=f';

    request({url,json:true},(error,{body}={})=>{
        if(error){
            callback('you have an error at connection so please make sure!!',undefined);
        }else if (body.error){
            callback('Unable to find location. try another search. ', undefined)
        }else{
            callback( undefined,body.current.weather_descriptions[0] + '. the tempreture is ' +  body.current.temperature + ' degrees out .it feels like ' + body.current.feelslike + ' degrees out. '+ 
                      'and the pressure is ' + body.current.pressure + '. moreover the wind degree is : '+ body.current.wind_degree + 'ْ')
        }
    })
}  

module.exports = forecast;