import { Weather } from '../entities/weather';
import { WeatherFromDbRepository } from '../repositories/weather-from-db-repository';
import { SaveWeather } from './save-weather';

export class SaveWeatherToDb implements SaveWeather {
    constructor(
        private readonly weatherRepository: WeatherFromDbRepository
    ) { }

    async save(weather: Weather, coordinatesId: number): Promise<Weather> {
        const weatherResult = await this.weatherRepository.saveWeather(weather, coordinatesId);
        return weatherResult;
    }

}
