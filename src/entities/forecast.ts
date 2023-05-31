import { Coordinates } from './coordinates';
import { Weather } from './weather';

type ForecastDTO = {
    id?: string;
    coordinates: Required<Coordinates>;
    weathersForecast: Weather[];
};

export class Forecast {
    public id?: string;
    public coordinates: Required<Coordinates>;
    public weathersForecast: Weather[];

    constructor(
        forecastDTO: ForecastDTO
    ) {
        this.id = forecastDTO.id;
        this.coordinates = forecastDTO.coordinates;
        this.weathersForecast = forecastDTO.weathersForecast;
    }
}
