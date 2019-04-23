import express from 'express';

/** result interface */
export interface ParsedQuery {
	attributes: string[];
	limit: number;
	offset: number;
	order: string[] | string[][];
}

/**
 * Query Parser
 */
export default function parser(): express.Handler {
	/** return express.Handler function */
	return (req: express.Request, res: express.Response, next: express.NextFunction): void => {
		/** prepare result shape */
		let result: ParsedQuery = {
			attributes: ['id'],
			limit: 30,
			offset: 0,
			order: ['created_at', 'desc'],
		};
		/** get raw query parameters */
		const {
			attributes = 'id',
			limit = 30,
			offset = 0,
			order = 'created_at',
		}: {
			attributes: string;
			limit: number;
			offset: number;
			order: string;
		} = req.query;

		/** set raw data to result */
		result.attributes = attributes.split(',');
		result.limit = limit;
		result.offset = offset;

		/** get order type: / = asc, \ = desc */
		const orderType: string = order[0];
		/** set order */
		result.order = [order.replace(orderType, ''), orderType === '/' ? 'asc' : 'desc'];

		/** attach to req object */
		req.parsed = result;

		next();
	};
}
