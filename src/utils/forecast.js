const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/5ba9a7d6c2db10f00295a63fb71bf672/'+ encodeURIComponent(latitude)+','+encodeURIComponent(longitude)+'?units=si&lang=pt'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to server', undefined)
        } else if (body.error) {
            callback('Poorly formatted request. Try again', undefined)
        } else {
            callback(undefined, {
                summary: body.currently.summary,
                temperature: body.currently.temperature,
                precipProbability: body.currently.precipProbability
            })
        }
    })
}

module.exports = forecast