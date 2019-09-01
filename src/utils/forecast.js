const request = require('request');

const forecast = (cordinates, callback) => {
    const url = `https://api.darksky.net/forecast/ee5eaff67db4f211b91052890668b011/${cordinates.latitude},${cordinates.longitude}?units=si`;
    request({url, json: true}, (error, response)=>{
        if(error){
            console.log('Unable to connect to weather service!');
        } else if(response.body.error){
            console.log('Unable to find location');
        }else{
            const current = response.body.currently;
            const daily = response.body.daily.data;
            //console.log(`${daily[0].summary} It is currently ${current.temperature} degrees out. There is a ${current.precipProbability}% chance of rain`);
            callback(undefined, {
                summary: daily[0].summary,
                temperature: current.temperature,
                precipProbability: current.precipProbability,
            })
        }
    })
}

module.exports = forecast;