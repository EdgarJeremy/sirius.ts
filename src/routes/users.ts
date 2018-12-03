import express from 'express';
import ModelFactoryInterface from '../models/typings/ModelFactoryInterface';
import { Routes } from './typings/RouteInterface';
import a from '../middlewares/wrapper/a';
import { OkResponse } from './typings/BodyBuilderInterface';
import { UserInstance } from '../models/User';

const usersRoute: Routes = (app: express.Application, models: ModelFactoryInterface): express.Router => {
    const router: express.Router = express.Router();

    router.get('/', a(async (req: express.Request, res: express.Response): Promise<void> => {
        const data: UserInstance[] = await models.User.findAll();
        const body: OkResponse = { status: true, data };

        res.json(body);
    }));

    return router;
}

export default usersRoute;