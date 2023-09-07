import AuthenticationService from '@/service/Authentication'
import { RequestStatus } from "@/api/http/status"

import { defineStore } from 'pinia'
import { Authentication, Credentials } from '@/model/Authentication'
import { AxiosError } from 'axios'

import type { IResponse } from "@/api/service/interface";

export const AuthenticationStore = ( requestStatus: RequestStatus ) =>{

    return defineStore("AuthenticationStore", {


        state:() => {
            return {
                authentication: new Authentication()
            }
        },

        actions: {
            async singIn( credentials:Credentials ){
                requestStatus.resetStatusError()

                await AuthenticationService.login( credentials )
                    .then(( response: IResponse< Authentication > ) =>{
                        this.authentication.singIn( credentials.username, response.data )

                        console.log("AuthenticationStore:singIn", response)
                    }).catch(( e: AxiosError ) => {

                        if (e.response === undefined) {
                            requestStatus.setNetworkError();
                        } else {
                            requestStatus.setErrorStatus(e.response !.status);
                        }
                        console.log("AuthenticationStore:singIn", e);
                    })
            },

            async singOut () {
                await AuthenticationService.logout()
                    .then(() => {
                        this.authentication.signOut()
                    })
                    .catch((e:Error)=>{
                        console.error("Authentication:singOut", e);
                    })
            }

        }
    })()

}