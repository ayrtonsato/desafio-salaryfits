import { OpenWeatherDataSource } from '../../datasources/remote-api/openweather-datasource';
import { GetWeatherFromRemote } from '../get-weather-from-remote';

export const makeGetWeather = () => {
    const openWeather = new OpenWeatherDataSource();
    return new GetWeatherFromRemote(openWeather);
};
