import { Coordinates } from '../entities/coordinates';
import { Weather } from '../entities/weather';

export interface GetWeather {
    fetchWeatherFromAPI(coordinates: Coordinates): Promise<Weather>;
}
