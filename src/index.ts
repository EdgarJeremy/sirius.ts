/** import modules */
import express from "express";
import dotenv from 'dotenv';

import ModelFactoryInterface from "./models/typings/ModelFactoryInterface";
import createModels from "./models";
import createRoutes from "./routes";
import tokenMiddleware from "./middlewares/pipes/token";

/** import .env file configuration */
dotenv.config();

/** app variables */
const app: express.Application = express();
const models: ModelFactoryInterface = createModels();
const routes: express.Router[] = createRoutes(app, models);

/** middlewares */
app.use(tokenMiddleware(models)); // token auth

/** sync models & start server */
models.sequelize.sync({
    force: process.env.DB_FORCE_RENEW ? true : false
}).then((): void => {
    app.listen(process.env.PORT || 1234, (): void => {
        console.log('App running');
    });
});