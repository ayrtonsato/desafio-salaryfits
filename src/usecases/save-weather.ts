import { Weather } from '../entities/weather';

export interface SaveWeather {
    save(weather: Weather, coordinatesId: number): Promise<Weather>;
}
