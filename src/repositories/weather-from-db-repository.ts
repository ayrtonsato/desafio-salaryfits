import { Forecast } from '../entities/forecast';
import { Weather } from '../entities/weather';

export interface WeatherFromDbRepository {
    fetchForecastById(id: string): Promise<Forecast>;
    saveWeather(weather: Weather, coordinatesId: number): Promise<Weather>;
    fetchById(id: string): Promise<Weather>;
    saveForecast(forecast: Forecast): Promise<Forecast>;
}
