import { Coordinates } from '../entities/coordinates';
import { Weather } from '../entities/weather';
import { WeatherFromApiRepository } from '../repositories/weather-from-api-repository';
import { GetWeather } from './get-weather';

export class GetWeatherFromRemote implements GetWeather {
    constructor(
        private readonly weatherRepository: WeatherFromApiRepository
    ) { }

    async fetchWeatherFromAPI(coordinates: Coordinates): Promise<Weather> {
        const weather = await this.weatherRepository.fetchWeatherNow(coordinates.lat, coordinates.lon);
        return weather;
    }

}
