import express from 'express';
import ModelFactoryInterface from '../models/typings/ModelFactoryInterface';
import { Routes } from './typings/RouteInterface';
import a from '../middlewares/wrapper/a';
import { OkResponse } from './typings/BodyBuilderInterface';
import { TokenInstance } from '../models/Token';

const usersRoute: Routes = (app: express.Application, models: ModelFactoryInterface): express.Router => {
    const router: express.Router = express.Router();

    router.get('/', a(async (req: express.Request, res: express.Response) => {
        const body: OkResponse = {
            status: true,
            body: {}
        };
        res.json(body);
    }));

    return router;
}

export default usersRoute;