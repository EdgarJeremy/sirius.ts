import express from 'express';
import fs from 'fs';

import ModelFactoryInterface from '../models/typings/ModelFactoryInterface';

export interface RouteList {
    (app: express.Application, models: ModelFactoryInterface): express.Router[];
}

const createRoutes: RouteList = (app: express.Application, models: ModelFactoryInterface): express.Router[] => {

    const routes: string[] = fs.readdirSync(__dirname).filter((fileName: string) => fileName !== 'typings' && fileName !== 'index.ts');
    const routeList: express.Router[] = [];

    routes.forEach((route: string) => {
        route = route.replace('.ts', '');
        const routerHandler: express.Router = require(`./${route}`).default(app, models);
        app.use(`/${route}`, routerHandler);
        routeList.push(routerHandler);
    });

    return routeList;
}

export default createRoutes;