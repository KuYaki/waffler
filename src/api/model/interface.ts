import type { JSONObject } from "@/global/types";
import type { API } from "@/api/service/interface";

export enum DataState {
    OK,
    LOADING,
    CHANGED,
    ERROR
}

export interface IModelData{};

export interface IModel{
    data:IModelData

    state:DataState

    setGetRequestData(api:API, data:IModelData):void;
    getPostRequestData?(api: API): JSONObject;
    setPostResponseData?(api: API, data: IModelData): void;
}