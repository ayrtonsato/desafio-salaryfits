import { Weather } from '../entities/weather';
import { WeatherFromDbRepository } from '../repositories/weather-from-db-repository';

export interface GetWeatherLocal {
    fetchById(id: string): Promise<Weather>;
}

export class GetWeatherFromDb implements GetWeatherLocal {
    constructor(
        private readonly weatherRepository: WeatherFromDbRepository
    ) { }
    async fetchById(id: string): Promise<Weather> {
        const weather = await this.weatherRepository.fetchById(id);
        return weather;
    }

}
