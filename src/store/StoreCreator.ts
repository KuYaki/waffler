import APIRoute from '@/global/api'

import { RequestStatusStore } from '@/store/RequestStatus'
import { Store }              from '@/api/store/store'
import { MainPage }           from '@/model/MainPage'

import type { API } from '@/api/service/interface'

class StoreCreator {
    public create(api:API) {
        const requestStatusStore = RequestStatusStore()

        switch (api){
            case APIRoute.SOURCE_SEARCH:
                return Store(api, requestStatusStore.status, ()=> new MainPage());

            default:
                console.error("StoreCreator:create", api);
        }

        return null

    }
}

export default new StoreCreator()