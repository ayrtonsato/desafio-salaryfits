import { Weather } from '../entities/weather';

export interface WeatherFromDbRepository {
    saveWeather(weather: Weather, coordinatesId: number): Promise<Weather>;
    fetchById(id: string): Promise<Weather>;
}
