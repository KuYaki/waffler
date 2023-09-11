import axios from 'axios';
import type { AxiosInstance } from 'axios'

import { authentication }   from "@/helper/UseAuthenStore"


export enum AUTHENTICATION {
    NOT_REQUARED,
    REQUARED
}

export class http {
    apiClient:AxiosInstance

    constructor( ) {
        this.apiClient = axios.create({baseURL: 'https://testserver.waffler.app'});
    }

    request( isAuthentication:AUTHENTICATION = AUTHENTICATION.REQUARED ):AxiosInstance{
        this.setHeader(isAuthentication)

        return this.apiClient
    }

    private setHeader( isAuthentication:AUTHENTICATION ){
        this.apiClient.defaults.headers.common['Content-Type'] = 'application/json';

        if( isAuthentication == AUTHENTICATION.REQUARED ) {
            this.apiClient.defaults.headers.common['acces_token'] = `${authentication().access_token}`
        }
    }
}

export default new http()

