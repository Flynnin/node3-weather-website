const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=43536da2015902a401ba532dad5c83b4&query=${latitude},${longitude}&units=f`;

  request({ url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback("Unable to connect to weather service!", undefined);
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
      console.log(body);
      callback(undefined, {
        forecast: body.current.weather_descriptions[0],
        temperature: body.current.temperature,
        localTime: body.location.localtime,
        humidity: body.current.humidity,
        windSpeed: body.current.wind_speed,
      });
    }
  });
};

module.exports = forecast;
