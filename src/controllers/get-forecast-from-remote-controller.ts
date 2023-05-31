import { ApiKeyError } from '../datasources/errors/api-key-error';
import { NotFoundError } from '../datasources/errors/not-found';
import { Coordinates } from '../entities/coordinates';
import { Forecast } from '../entities/forecast';
import { GetForecastFromRemoteAPI } from '../usecases/forecast/get-forecast';
import { SaveForecast } from '../usecases/forecast/save-forecast';
import { GetCoordinates } from '../usecases/get-coordinates';
import { AuthenticationError } from './errors/authentication-error';
import { InternalServerError } from './errors/internal-server-error';
import { NotFoundError as ControllerNotFoundError } from './errors/not-found-error';

interface RequestDataDTO {
    city: string;
    state: string;
    country: string;
}

export class GetForecastFromRemoteController {
    constructor(
        private readonly getCoordinates: GetCoordinates,
        private readonly getForecast: GetForecastFromRemoteAPI,
        private readonly saveForecast: SaveForecast,
    ) { }

    async getDataAndStore(body: RequestDataDTO): Promise<Forecast> {
        const { city, state, country } = body;
        try {
            const coordinates = await this.getCoordinates.fetch(city, state, country);
            const forecast = await this.getForecast.fetchForecast(coordinates as Required<Coordinates>);
            const savedForecast = await this.saveForecast.saveForecast(forecast);
            return savedForecast;
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
