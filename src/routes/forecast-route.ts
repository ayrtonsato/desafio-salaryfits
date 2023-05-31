import { Request, Response, Router } from 'express';
import { ControllerBaseError } from '../controllers/errors/controller-base-error';
import { makeGetForecastFromDbController } from '../controllers/factories/get-forecast-from-db-factory';
import { makeGetForecastFromRemoteController } from '../controllers/factories/get-forecast-from-remote-factory';
import prismaClient from '../prisma-client';

const forecastRouter = Router();

forecastRouter.post('/', async (req: Request, res: Response) => {
    try {
        const controller = makeGetForecastFromRemoteController(prismaClient);
        const result = await controller.getDataAndStore(req.body);
        return res.status(201).json(result);
    } catch (err) {
        if (err instanceof ControllerBaseError) {
            if (err.errorIsPublic) {
                return res.status(err.statusCode).json({ message: err.message });
            }
            return res.status(err.statusCode);
        }
        return res.status(500);
    }
});

forecastRouter.get('/:id', async (req: Request, res: Response) => {
    try {
        const controller = makeGetForecastFromDbController(prismaClient);
        const result = await controller.fetchById({ id: req.params.id });
        return res.status(200).json(result);
    } catch (err) {
        if (err instanceof ControllerBaseError) {
            if (err.errorIsPublic) {
                return res.status(err.statusCode).json({ message: err.message });
            }
            return res.status(err.statusCode);
        }
        return res.status(500);
    }
});

export default forecastRouter;
