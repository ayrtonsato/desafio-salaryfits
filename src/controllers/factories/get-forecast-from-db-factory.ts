import { PrismaClient } from '@prisma/client';
import { makeGetForecastFromDb } from '../../usecases/factories';
import { GetForecastFromDbController } from '../get-forecast-from-db-controller';

export const makeGetForecastFromDbController = (prisma: PrismaClient) => {
    const remoteRepository = makeGetForecastFromDb(prisma);
    return new GetForecastFromDbController(remoteRepository);
};
