let locationName;
let todayDate;
let todayCondition;
let todayTempF;
let todayTempC;
let todayPrecip;
let todayHumidity;
let todayWindMPH;
let todayWindKPH;
let todayHighf;
let todayHighc;
let todayLowf;
let todayLowc;
let code;
let time;
let error = '';

let getData = function () {
  async function forecast(location = 'evansville') {
    try {
      let response = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=a1701304d4394a63b55164513240101&q=${location}&days=7`,
        { mode: 'cors' }
      );
      data = await response.json();

      locationName = data.location.name;
      todayDate = data.forecast.forecastday[0].date;
      todayCondition = data.current.condition.text;
      todayTempF = data.current.temp_f;
      todayTempC = data.current.temp_c;
      todayPrecip = data.forecast.forecastday[0].day.daily_chance_of_rain;
      todayHumidity = data.current.humidity;
      todayWindMPH = data.current.wind_mph;
      todayWindKPH = data.current.wind_kph;
      todayHighf = data.forecast.forecastday[0].day.maxtemp_f;
      todayHighc = data.forecast.forecastday[0].day.maxtemp_c;
      todayLowf = data.forecast.forecastday[0].day.mintemp_f;
      todayLowc = data.forecast.forecastday[0].day.mintemp_c;

      let icon = data.current.condition.icon;
      let tempIconArray = icon.split('/');
      code = tempIconArray[6];
      time = tempIconArray[5];
      error = '';
      return {
        data,
        todayDate,
        todayCondition,
        todayTempF,
        todayTempC,
        todayPrecip,
        todayHumidity,
        todayWindMPH,
        todayWindKPH,
        todayHighf,
        todayHighc,
        todayLowf,
        todayLowc,
        time,
        code,
        error,
      };
    } catch (value) {
      error = data.error.message;
      console.log(error);
      return error;
    }
  }

  return {
    forecast,
  };
};
getData().forecast('evansville');
function dateFormat(string) {
  let tempArray = string.split('-');
  return (dateString = `${tempArray[1]}/${tempArray[2]}`);
}

let data;
let mainHeader = document.querySelector('.mainLocation');
let currentDate = document.querySelector('.currentDate');
let currentCondition = document.querySelector('.currentCondition');
let currentTemp = document.querySelector('.temp');
let currentPrecip = document.querySelector('.currentPrecip');
let currentHumidity = document.querySelector('.currentHumidity');
let currentWind = document.querySelector('.currentWind');
let currentHighLow = document.querySelector('.highLow');
let search = document.querySelector('.search');
let toggle = document.querySelector('.toggle');
let icon = document.querySelector('.weatherIcon');

async function toggleTemp(value) {
  if (value === 'f' || value === 'F') {
    currentTemp.textContent = `${Math.round(todayTempF)}F`;
    currentHighLow.textContent = `${Math.round(todayHighf)} / ${Math.round(
      todayLowf
    )}`;
    currentWind.textContent = `${todayWindMPH}MPH`;
    for (let i = 1; i < 7; i++) {
      let dayDate = document.querySelector(`.dayDate${i}`);
      let dayHigh = document.querySelector(`.dayHigh${i}`);
      let dayLow = document.querySelector(`.dayLow${i}`);
      let dayPrecip = document.querySelector(`.dayPrecip${i}`);
      let weatherIcon = document.querySelector(`.dayIcon${i}`);
      let tempIcon = data.forecast.forecastday[i].day.condition.icon;
      let tempIconArray = tempIcon.split('/');
      dayDate.textContent = dateFormat(data.forecast.forecastday[i].date);
      dayHigh.textContent = Math.round(
        data.forecast.forecastday[i].day.maxtemp_f
      );
      dayLow.textContent = Math.round(
        data.forecast.forecastday[i].day.mintemp_f
      );
      weatherIcon.src = `./icons/${tempIconArray[5]}/${tempIconArray[6]}`;
      dayPrecip.textContent = `${data.forecast.forecastday[i].day.daily_chance_of_rain}%`;
      console.log(dayDate, dayHigh, dayLow, dayPrecip);
    }
  } else if (value === 'c' || value === 'C') {
    currentTemp.textContent = `${Math.round(todayTempC)}C`;
    currentHighLow.textContent = `${Math.round(todayHighc)} / ${Math.round(
      todayLowc
    )}`;
    currentWind.textContent = `${todayWindKPH}KPH`;
    for (let i = 1; i < 7; i++) {
      let dayDate = document.querySelector(`.dayDate${i}`);
      let dayHigh = document.querySelector(`.dayHigh${i}`);
      let dayLow = document.querySelector(`.dayLow${i}`);
      let dayPrecip = document.querySelector(`.dayPrecip${i}`);
      let weatherIcon = document.querySelector(`.dayIcon${i}`);
      let tempIcon = data.forecast.forecastday[i].day.condition.icon;
      let tempIconArray = tempIcon.split('/');
      dayDate.textContent = dateFormat(data.forecast.forecastday[i].date);
      dayHigh.textContent = Math.round(
        data.forecast.forecastday[i].day.maxtemp_c
      );
      dayLow.textContent = Math.round(
        data.forecast.forecastday[i].day.mintemp_c
      );
      weatherIcon.src = `./icons/${tempIconArray[5]}/${tempIconArray[6]}`;
      dayPrecip.textContent = `${data.forecast.forecastday[i].day.daily_chance_of_rain}%`;
      console.log(dayDate, dayHigh, dayLow, dayPrecip);
    }
  }
}
toggle.addEventListener('click', () => {
  if (toggle.checked === false) {
    toggleTemp('f');
  } else {
    toggleTemp('c');
  }
});
async function appendDom(location) {
  if (search.value != '') {
    location = search.value;
  } else {
    location = 'evansville';
  }
  await getData().forecast(location);
  if (error != '') {
    alert(error);
    console.log('poop');
    return;
  } else {
    mainHeader.textContent = locationName;
    currentDate.textContent = dateFormat(todayDate);
    currentCondition.textContent = todayCondition;
    currentPrecip.textContent = todayPrecip;
    currentHumidity.textContent = todayHumidity;
    icon.src = `./icons/${time}/${code}`;
    if (toggle.checked === false) {
      toggleTemp('f');
    } else {
      toggleTemp('c');
    }
  }
}
search.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    appendDom();
  }
});
appendDom();
