export interface IStatusResponse{
    status: number;
    statusText: string;
}

export interface IResponse<T> extends IStatusResponse {
    data: T;
}