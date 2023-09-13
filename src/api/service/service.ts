import http from "@/api/http/http"

import type { API, IResponse } from "@/api/service/interface";
import type { JSONObject }     from "@/global/types";

class Service<T> {
    get(api: API, config?: any ): Promise<IResponse<T>> {
        return http.request().get(api as string, config);
    }

    post(api: API, data?: JSONObject, config?: any): Promise<T> {
      return http.request().post(api as string, data, config);
    }
}

export default Service