const request = require('request');
const geocode = (address, callback) => {
    const encodedAddress = encodeURIComponent(address);
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedAddress}.json?access_token=pk.eyJ1IjoiYXNoaWtoYWl6dSIsImEiOiJjanptd3c2b2ExN2JvM21wbXQweWc4bnRuIn0.af_cVi0P_IHeB5FFza2MVQ&limit=1`;
    request({ url, json: true}, (error, {body})=>{
        if(error){
            callback('Unable to connect to location services!', undefined);
        }else if(body.features.length === 0){
            callback('Unable to find location. Try agin with different search term', undefined);
        }else{
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode;