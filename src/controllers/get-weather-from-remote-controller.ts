import { GetCoordinates } from '../usecases/get-coordinates';
import { GetWeather } from '../usecases/get-weather';
import { SaveWeather } from '../usecases/save-weather';
import { Weather } from '../entities/weather';
import { InternalServerError } from './errors/internal-server-error';
import { ApiKeyError } from '../datasources/errors/api-key-error';
import { AuthenticationError } from './errors/authentication-error';
import { NotFoundError as ControllerNotFoundError } from './errors/not-found-error';
import { NotFoundError } from '../datasources/errors/not-found';

interface RequestDataDTO {
    city: string;
    state: string;
    country: string;
}

export class GetWeatherFromRemoteController {
    constructor(
        private readonly getCoordinates: GetCoordinates,
        private readonly getWeather: GetWeather,
        private readonly saveWeather: SaveWeather,
    ) { }

    async getDataAndStore(body: RequestDataDTO): Promise<Weather> {
        const { city, state, country } = body;
        try {
            const coordinates = await this.getCoordinates.fetch(city, state, country);
            const weather = await this.getWeather.fetchWeatherFromAPI(coordinates);
            const savedWeather = await this.saveWeather.save(weather, coordinates.id!);
            return savedWeather;
        } catch (err) {
            if (err instanceof ApiKeyError) {
                throw new AuthenticationError();
            }
            if (err instanceof NotFoundError) {
                throw new ControllerNotFoundError();
            }
            throw new InternalServerError();
        }
    }
}
