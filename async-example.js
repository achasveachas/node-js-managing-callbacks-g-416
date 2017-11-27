const prompt  = require('prompt');
const request = require('request');
const async   = require('async');

const WEATHER_API_URL = 'http://api.openweathermap.org/data/2.5/weather?q='
const WEATHER_API_KEY = '88bfde3533d98e8a300a138ef668cda2';

async.waterfall([
    (callback) => {
      prompt.get({
          name: 'city',
          description: "Enter your city to fetch the current weather"
      }, (err, results) => {
          if(err) return callback(err)
          callback(null, results.city)
      })
    },
    (city, callback) => {
        const url = WEATHER_API_URL + city + '&APPID=' + WEATHER_API_KEY +  '&units=imperial';
        request(url, (err, resp, body) => {
            if(err) return callback(err)
            callback(null, city, body)
        })
    }
], (err, city, weather) => {
    console.log(`the weather in ${city} \n ${weather}`);    
})
