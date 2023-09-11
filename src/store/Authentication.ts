import AuthenticationService from '@/service/Authentication'
import { RequestStatus } from "@/api/http/status"

import { defineStore } from 'pinia'
import { Authentication, Credentials, RegisterData } from '@/model/Authentication'
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
            async signIn( credentials:Credentials ){
                requestStatus.resetStatusError()

                await AuthenticationService.login( credentials )
                    .then(( response: IResponse< Authentication > ) =>{
                        this.authentication.signIn( credentials.username, response.data )

                        console.log("AuthenticationStore:signIn", response)
                    }).catch(( e: AxiosError ) => {

                        if (e.response === undefined) {
                            requestStatus.setNetworkError();
                        } else {
                            requestStatus.setErrorStatus(e.response !.status);
                        }
                        console.log("AuthenticationStore:signIn", e);
                    })
            },

            async register ( regData:RegisterData ){
                requestStatus.resetStatusError()

                await AuthenticationService.register(regData)
                    .then(( response: IResponse< Authentication > ) =>{
                        this.authentication.signIn( regData.username, response.data )

                        console.log("AuthenticationStore:register", response)
                    }).catch(( e: AxiosError ) => {

                        if (e.response === undefined) {
                            requestStatus.setNetworkError();
                        } else {
                            requestStatus.setErrorStatus(e.response !.status);
                        }
                        console.log("AuthenticationStore:register", e);
                    })
            },

            async signOut () {
                await AuthenticationService.logout()
                    .then(() => {
                        this.authentication.signOut()
                    })
                    .catch((e:Error)=>{
                        console.error("Authentication:signOut", e);
                    })
            }

        }
    })()

}