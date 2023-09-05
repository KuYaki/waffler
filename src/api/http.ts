import axios from 'axios';

import type { AxiosInstance } from 'axios'

export class http {
    apiClient:AxiosInstance

    constructor( ) {
        this.apiClient = axios.create({baseURL: 'https://nic-corp.store'});
    }

    request():AxiosInstance{
        this.setHeader()

        return this.apiClient
    }

    private setHeader(){
        this.apiClient.defaults.headers.common['Content-Type'] = 'application/json';
    }
}

export default new http()

