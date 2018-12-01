import express from 'express';
import ModelFactoryInterface from '../../models/typings/ModelFactoryInterface';

export interface Routes {
    (app: express.Application, models: ModelFactoryInterface): express.Router;
}

export interface A {
    (handler: express.Handler): express.Handler;
}