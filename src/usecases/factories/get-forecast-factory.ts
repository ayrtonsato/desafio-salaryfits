import { OpenWeatherDataSource } from '../../datasources/remote-api/openweather-datasource';
import { GetForecastFromOpenWeather } from '../forecast/get-forecast';

export const makeGetForecastFromOpenWeather = () => {
    const openWeather = new OpenWeatherDataSource();
    return new GetForecastFromOpenWeather(openWeather);
};
