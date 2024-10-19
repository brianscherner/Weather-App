import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

// write logic to abbreviate weekdays to 3 letters (Fri, Sat, Sun, etc)
// can abbreviate days, but the calendar dates are getting cut off
// need to abbreviate days while preserving calendar date
function ThreeDayForeCast(props) {
  const { weatherApiObject, onChanging3DayDateFormats, onChangingFirstDayToSayToday, onSelectingForecastDay, selectedForecastDay} = props;
  const [threeDayForecast, setNew3DayForecast] = useState([]);

  useEffect(() => {
    const threeDayForecastWithNewDates = onChanging3DayDateFormats(weatherApiObject.forecast.forecastday);
    // setNew3DayForecast(threeDayForecastWithNewDates);
    console.log("3 day forecast : ", threeDayForecastWithNewDates);

    const abbreviatedForecastWeekdays = abbreviateDaysOfWeek(threeDayForecastWithNewDates);
    // setNew3DayForecast(abbreviatedForecastWeekdays);
    console.log("Abbrev weekdays: ", abbreviatedForecastWeekdays);

    const moddedFirstDayOfForecast = onChangingFirstDayToSayToday(abbreviatedForecastWeekdays);
    const final3DayForecast = [moddedFirstDayOfForecast, ...threeDayForecastWithNewDates.slice(1)];
    setNew3DayForecast(final3DayForecast);

  }, [weatherApiObject]);

  const abbreviateDaysOfWeek = (threeDayForecast) => {
    return threeDayForecast.map(index => {
      return {
        ...index,
        date: index.date.substring(0, 3)
      };
    });
  };

  return (
    <React.Fragment>
      <div className="forecast-for-each-day">
        <React.Fragment>
          {threeDayForecast.map((forecast, index) =>
            <div key={index} onClick={() => onSelectingForecastDay(index)}>
              <div className={`day ${selectedForecastDay === index ? 'selected' : ''}`}>
                {/* find different way to mark it besides a check mark */}
                <h5>{selectedForecastDay === index && '\u25CF'} {forecast.date}</h5>
                <img className="three-day-forecast-icon" src={forecast.day.condition.icon} alt="An icon showing the general forecast for the day."/>
                <h5>{forecast.day.maxtemp_f}{'\u00b0'}/{forecast.day.mintemp_f}{'\u00b0'}</h5>
              </div>
            </div>
          )}
        </React.Fragment>
      </div>
    </React.Fragment>
  )
}

ThreeDayForeCast.propTypes = {
  weatherApiObject: PropTypes.object,
  onChanging3DayDateFormats: PropTypes.func,
  onChangingFirstDayToSayToday: PropTypes.func,
  onSelectingForecastDay: PropTypes.func,
  selectedForecastDay: PropTypes.number
}

export default ThreeDayForeCast;