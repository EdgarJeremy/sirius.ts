// Parts
export interface CollectionBody {
    rows: any[];
    count: number;
}
export interface ErrorItem {
    field: string;
    value: string;
    message: string;
}

// Full Body
export interface OkResponse {
    status: boolean;
    body: CollectionBody | any;
}
export interface ErrorResponse {
    errors: any[] | any;
}
