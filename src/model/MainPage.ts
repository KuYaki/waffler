import APIRoute from "@/global/api";

import { Model } from "@/api/model/model";

import { DataState, type IModelData } from "@/api/model/interface";
import type { API }        from "@/api/service/interface";
import type { JSONObject } from "@/global/types";

enum SourceType {
    Telegram,
    YouTube
}

enum ScoreType {
    Waffler,
    Racizm
}

type TOrderKey = "name_up" | "name_down" | "source_up" | "source_down" | "waffler_up" | "waffler_down" | "raсizm_up" | "racizm_down"

export class Source {
    id            : number     = NaN
    name          : string     = ''
    source_type   : SourceType = 0
    source_url    : string     = ""
    waffler_score : number     = 1
    racizm_score  : number     = 0
}


class MainPageData implements IModelData {
    query       : string       = ''
    limit       : number       = 15
    cursor      : number       = 0
    order       : TOrderKey    = 'waffler_down'
    source_type : SourceType[] = [0,1]
    score_type  : ScoreType[]  = [0]

    sources:Array< Source > = []
}

export class MainPage extends Model {
    data : MainPageData = new MainPageData()
    state: DataState    = DataState.OK

    getPostRequestData( api: API): JSONObject {
        switch(api){
            case APIRoute.SOURCE_SEARCH: return {
                query       : this.data.query,
                limit       : this.data.limit,
                cursor      : this.data.cursor,
                order       : this.data.order,
                source_type: this.data.source_type,
                score_type  : this.data.score_type
            }
        }

        console.error( "getPostRequestData", api);
        return {};
    }

    setPostResponseData(api: API, data: MainPageData):void {
        switch(api) {
            case APIRoute.SOURCE_SEARCH:
                this.data.sources = data.sources
                this.data.cursor  = data.cursor
        }
    }
}

