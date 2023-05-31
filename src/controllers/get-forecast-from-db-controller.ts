import { NotFoundError } from '../datasources/errors/not-found';
import { Forecast } from '../entities/forecast';
import { GetForecastFromDatabase } from '../usecases/forecast/get-forecast';
import { InternalServerError } from './errors/internal-server-error';
import { NotFoundError as ControllerNotFoundError } from './errors/not-found-error';

interface RequestDataDTO {
    id: string;
}

export class GetForecastFromDbController {
    constructor(
        private readonly getForecast: GetForecastFromDatabase,
    ) { }

    async fetchById(body: RequestDataDTO): Promise<Forecast> {
        try {
            const forecast = await this.getForecast.fetchForecastById(body.id);
            return forecast;
        } catch (err) {
            if (err instanceof NotFoundError) {
                throw new ControllerNotFoundError();
            }
            throw new InternalServerError();
        }
    }
}
