import express from 'express';
import bcrypt from 'bcrypt';
import printer from 'node-thermal-printer';
import ModelFactoryInterface from '../models/typings/ModelFactoryInterface';
import { Routes } from './typings/RouteInterface';
import a from '../middlewares/wrapper/a';
import { OkResponse } from './typings/BodyBuilderInterface';
import { UserInstance } from '../models/User';
import NotFoundError from '../classes/NotFoundError';
import { createUser, editUser } from './users.validation';

const usersRoute: Routes = (app: express.Application, models: ModelFactoryInterface): express.Router => {
    const router: express.Router = express.Router();

    router.get('/', a(async (req: express.Request, res: express.Response): Promise<void> => {
        const data: { count: number; rows: UserInstance[] } = await models.User.findAndCountAll();
        const body: OkResponse = { data };

        printer.init({ type: 'epson', interface: '/dev/ttys005' });
        
        printer.isPrinterConnected((b: boolean) => {
            console.log(b);
        });

        res.json(body);
    }));

    router.get('/:id', a(async (req: express.Request, res: express.Response): Promise<void> => {
        const { id }: { id: number } = req.params;
        const user: UserInstance | null = await models.User.findOne({ where: { id } });
        if (!user) throw new NotFoundError('User tidak ditemukan');
        const body: OkResponse = { data: user };

        res.json(body);
    }));

    router.post('/', createUser, a(async (req: express.Request, res: express.Response): Promise<void> => {
        const { name, username, password }: { name: string; username: string; password: string; } = req.body;
        const user: UserInstance = await models.User.create({ name, username, password: bcrypt.hashSync(password, 10) });
        const body: OkResponse = { data: user };

        res.json(body);
    }));

    router.put('/:id', editUser, a(async (req: express.Request, res: express.Response): Promise<void> => {
        const { id }: { id: number } = req.params;
        const { name, username, password }: { name: string; username: string; password: string; } = req.body;
        const user: UserInstance | null = await models.User.findOne({ where: { id } });
        if (!user) throw new NotFoundError('User tidak ditemukan');
        await user.update({ name, username, password: bcrypt.hashSync(password, 10) });
        const body: OkResponse = { data: user };

        res.json(body);
    }));

    router.delete('/:id', a(async (req: express.Request, res: express.Response): Promise<void> => {
        const { id }: { id: number } = req.params;
        const user: UserInstance | null = await models.User.findOne({ where: { id } });
        if (!user) throw new NotFoundError('User tidak ditemukan');
        await user.destroy();
        const body: OkResponse = { data: user };

        res.json(body);
    }));

    return router;
}

export default usersRoute;