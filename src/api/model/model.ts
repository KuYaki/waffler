import { IModel, IModelData, DataState } from "@/api/model/interface";
import { API } from "../service/interface";
import { JSONObject } from "@/global/types";

export class Model implements IModel{
    data : IModelData = NaN;
    state: DataState  = DataState.OK

    setGetRequestData(_api: API, data: IModelData) {

        type RequestKey = keyof typeof data;

        try {
            for (const key in data) {
                if (this.data[key as RequestKey] === undefined) {
                    throw `Model property ['${key}'] is not defined`
                }
            }
        } catch (e) {
            console.error("Model:init", e, data);
        }

        Object.assign(this.data, data);
        console.log( "Model:init", this);
    }

    getPostRequestData?(_api: API): JSONObject{
        return {};
    }
}
