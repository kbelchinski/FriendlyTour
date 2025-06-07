fetch(
  'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Sapareva%20banya?unitGroup=metric&key=VEVMFRJLCPR2M3UKC8E992QV4&contentType=json',
)
  .then((response) => response.json())
  .then((data) => {
    const { currentConditions } = data;

    const weatherElement = document.getElementById('weather');
    weatherElement.innerHTML = `${currentConditions.temp}<sup>°C</sup>`;
  });
