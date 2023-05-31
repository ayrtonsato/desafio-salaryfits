import { Forecast } from '../../entities/forecast';
import { WeatherFromDbRepository } from '../../repositories/weather-from-db-repository';

export interface SaveForecast {
    saveForecast(forecast: Forecast): Promise<Forecast>;
}

export class SaveForecastIntoDatabase implements SaveForecast {
    constructor(
        private readonly weatherDbRepository: WeatherFromDbRepository
    ) { }
    saveForecast(forecast: Forecast): Promise<Forecast> {
        return this.weatherDbRepository.saveForecast(forecast);
    }

}
