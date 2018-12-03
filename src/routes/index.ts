import express from 'express';
import fs from 'fs';

import ModelFactoryInterface from '../models/typings/ModelFactoryInterface';

export interface RouteList {
    (app: express.Application, models: ModelFactoryInterface): express.Router[];
}

const createRoutes: RouteList = (app: express.Application, models: ModelFactoryInterface): express.Router[] => {

    const routes: string[] = fs.readdirSync(__dirname).filter((fileName: string) => fileName !== 'typings' && fileName !== 'index.ts');
    const routeList: express.Router[] = [];
    const apiURL: string = process.env.API_URL ? process.env.API_URL : '/api';

    routes.forEach((route: string) => {
        route = route.replace('.ts', '');
        const router: any = require(`./${route}`).default;
        if(typeof router === 'function') {
            const routerHandler: express.Router = router(app, models);
            app.use(`${apiURL}/${route}`, routerHandler);
            routeList.push(routerHandler);
        }
    });

    return routeList;
}

export default createRoutes;