import Service from "@/api/service/service";

import { defineStore }   from "pinia";
import { AxiosError }    from "axios";
import { RequestStatus } from "@/api/http/status";
import { Model }         from "@/api/model/model";
import { DataState }     from "@/api/model/interface";


import type { IResponse, API } from "@/api/service/interface";

export const Store =<T extends Model>  ( storeID:API, requestStatus:RequestStatus, newModel:()=> T ) => {

    return defineStore( storeID as string, {

        state: () => {
            return { model : newModel() }
        },

        actions: {

            async get( api:API ){

                this.model.state = DataState.LOADING

                await this.service().get(api)
                    .then((response:IResponse< typeof this.model.data >) =>{
                        console.log("Store:update", response.data, response.status)

                        requestStatus.setErrorStatus( response.status )

                        this.model.data = response.data
                        this.model.state = DataState.OK

                    })
                    .catch((e:AxiosError) => {
                        this.model.state = DataState.ERROR

                        this.setResponseStatus(e)

                    })
            },

            async post( api:API ){
                if (!this.model.getPostRequestData) {
                    console.error( "Store:save", "requestData is null");
                    return;
                }

                const requestData = this.model.getPostRequestData(api)

                this.model.state = DataState.LOADING

                await this.service().post(api, requestData)
                    .then((response:IResponse< typeof this.model.data >) =>{
                        requestStatus.setErrorStatus( response.status )

                        if (this.model.setPostResponseData) {
                            this.model.setPostResponseData(api, response.data);
                        }

                        this.model.state = DataState.OK

                        console.log("Store:save", requestData);

                    })
                    .catch((e:AxiosError) => {
                        this.model.state = DataState.ERROR

                        this.setResponseStatus(e)

                    })
            },

            service(): Service<T> {
                return new Service<T>();
            },

            setResponseStatus(e : AxiosError) {
                if (e.response === undefined) {
                    requestStatus.setNetworkError();
                } else {
                    requestStatus.setErrorStatus(e.response !.status);
                }

                console.log( "Store:setResponseStatus", e);
            }
        }


    } )()
}