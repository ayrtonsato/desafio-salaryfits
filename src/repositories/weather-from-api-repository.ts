import { Weather } from '../entities/weather';

export interface WeatherFromApiRepository {
    fetchWeatherNow(lat: number, lon: number): Promise<Weather>;
    fetchForecast(lat: number, lon: number, id: number): Promise<Weather[]>;
}
