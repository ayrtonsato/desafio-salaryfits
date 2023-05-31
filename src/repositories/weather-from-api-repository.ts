import { Weather } from '../entities/weather';

export interface WeatherFromApiRepository {
    fetchWeatherNow(lat: number, lon: number): Promise<Weather>;
}
