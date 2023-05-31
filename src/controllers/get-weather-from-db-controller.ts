import { NotFoundError } from '../datasources/errors/not-found';
import { Weather } from '../entities/weather';
import { GetWeatherLocal } from '../usecases/get-weather-from-db';
import { InternalServerError } from './errors/internal-server-error';
import { NotFoundError as ControllerNotFoundError } from './errors/not-found-error';

interface RequestDataDTO {
    id: string;
}

export class GetWeatherFromDbController {
    constructor(
        private readonly getWeather: GetWeatherLocal,
    ) { }

    async fetchById(body: RequestDataDTO): Promise<Weather> {
        try {
            const weather = await this.getWeather.fetchById(body.id);
            return weather;
        } catch (err) {
            if (err instanceof NotFoundError) {
                throw new ControllerNotFoundError();
            }
            throw new InternalServerError();
        }
    }
}
