import { Coordinates } from '../../entities/coordinates';
import { Forecast } from '../../entities/forecast';
import { WeatherFromApiRepository } from '../../repositories/weather-from-api-repository';

export interface GetForecastFromRemoteAPI {
    fetchForecast(coordinates: Required<Coordinates>): Promise<Forecast>;
}

export class GetForecastFromOpenWeather implements GetForecastFromRemoteAPI {
    constructor(
        private readonly weatherApiRepository: WeatherFromApiRepository
    ) { }

    async fetchForecast(coordinates: Required<Coordinates>): Promise<Forecast> {
        const weathers = await this.weatherApiRepository.fetchForecast(
            coordinates.lat,
            coordinates.lon,
            coordinates.id,
        );
        return new Forecast({
            coordinates: coordinates,
            weathersForecast: weathers,
        });
    }

}
