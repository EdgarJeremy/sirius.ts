import express from 'express';
import ModelFactoryInterface from '../models/typings/ModelFactoryInterface';
import { Routes } from './typings/RouteInterface';
import usersRoutes from "./users";

export interface RouteList {
    (app: express.Application, models: ModelFactoryInterface): express.Router[];
}

const createRoutes: RouteList = (app: express.Application, models: ModelFactoryInterface): express.Router[] => {
    const users: express.Router = usersRoutes(app, models);

    app.use('/users', users);

    return [
        users,
    ]
}

export default createRoutes;