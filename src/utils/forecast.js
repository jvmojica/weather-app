const request = require('request');

const forecast = (lat, long, cb) => {
  const url = `http://api.weatherstack.com/current?access_key=567bf709a9e1096db9f66f6c467803dc&query=${lat},${long}`;

  request({url, json: true}, (error, {body}) => {
    if (error) {
      cb('Unable to connect to weather service!');
    } else if (body.error) {
      cb('Unable to find location');
    } else {
      const {weather_descriptions, temperature, feelslike} = body.current;
      const result = `${weather_descriptions[0]}. It is currently ${temperature} degrees out. It feels like ${feelslike} degrees out.`;
      
      cb(undefined, result);
    }
  })
}

module.exports = forecast;