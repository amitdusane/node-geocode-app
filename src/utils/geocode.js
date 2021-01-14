const request = require('postman-request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYW1pdGR1c2FuZSIsImEiOiJja2kwNG5meWowaDRpMnpxazV3d3ZtazNhIn0.Nc-GkjLanWbLnugRirEWig';
    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Something went wrong', undefined);
        } else {
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longiture: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode