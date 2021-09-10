const request = require('request');

const geocode = (address, cb) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiamVla3ltb2ppY2EiLCJhIjoiY2tzY3gyZHd4MGwzajJ2bzJ3M2QzeWhwcCJ9.OVeHWIVuniddPvRaqYQF6g&limit=1`

  request({url, json: true}, (error, {body}) => {
    if (error) {
      cb('Unable to connect location service')
    } else if (body.features.length === 0) {
      cb('Unable to find your location! Try another search.'); 
    } else {
      const {center, place_name} = body.features[0];
  
      cb(undefined, {
        latitude: center[1], 
        longitude: center[0], 
        location: place_name
      })
    }
  })
}

module.exports = geocode;