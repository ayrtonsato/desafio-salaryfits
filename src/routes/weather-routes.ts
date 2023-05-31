import { Router, Request, Response } from 'express';
import { makeGetWeatherFromRemoteControllerFactory } from '../controllers/factories/get-weather-from-remote-factory';
import prismaClient from '../prisma-client';
import { ControllerBaseError } from '../controllers/errors/controller-base-error';
import { makeGetWeatherFromDbController } from '../controllers/factories/get-weather-from-db-controller';

const weatherRouter = Router();

weatherRouter.post('/', async (req: Request, res: Response) => {
    try {
        const controller = makeGetWeatherFromRemoteControllerFactory(prismaClient);
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

weatherRouter.get('/:id', async (req: Request, res: Response) => {
    try {
        const controller = makeGetWeatherFromDbController(prismaClient);
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

export default weatherRouter;
