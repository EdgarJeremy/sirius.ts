import sequelize from 'sequelize';
import express from 'express';
import ModelFactoryInterface from '../models/typings/ModelFactoryInterface';
import wrapValidation from '../middlewares/validation/request';
import { checkSchema } from 'express-validator/check';

export interface ICollectionOptions {
	limit?: number;
	offset?: number;
	attributes?: string[];
	include?: ICollectionIncludeOptions[];
	order?: string[] | string[][];
}

interface ICollectionIncludeOptions extends ICollectionOptions {
	model: string;
}

export class Parser {
	public static parseQuery<T>(q: string, models: ModelFactoryInterface): sequelize.FindOptions<T> {
		const raw: ICollectionOptions = JSON.parse(new Buffer(q, 'base64').toString());
		const parsed: sequelize.FindOptions<T> = {
			attributes: raw.attributes,
			include: raw.include
				? raw.include.map((m: ICollectionIncludeOptions) => ({
						model: models[m.model],
						attributes: m.attributes ? m.attributes : ['id'],
				  }))
				: [],
			limit: raw.limit,
			offset: raw.offset,
		};

		return parsed;
	}

	public static validateQ(): express.Handler[] {
		return wrapValidation(
			checkSchema({
				q: {
					in: 'query',
					custom: {
						options: (value: string): boolean => {
							try {
								const raw: any = JSON.parse(new Buffer(value, 'base64').toString());
								return true;
							} catch (e) {
								return false;
							}
						},
						errorMessage: 'Query tidak valid',
					},
				},
			}),
		);
	}
}
