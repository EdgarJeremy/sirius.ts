import express from "express";
import dotenv from 'dotenv';

import ModelFactoryInterface from "./models/typings/ModelFactoryInterface";
import createModels from "./models";
import createRoutes from "./routes";

dotenv.config();

const app: express.Application = express();
const models: ModelFactoryInterface = createModels();

const routes: express.Router[] = createRoutes(app, models);


models.sequelize.sync().then((): void => {
    app.listen(1234, (): void => {
        console.log('App running');
    });
});