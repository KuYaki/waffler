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

export type TOrderKey = "name_up"| "name_down" | "source_up" | "source_down" | "waffler_up" | "waffler_down" | "raсizm_up" | "racizm_down"
export type TScoreOrderKey = "score_up" | "score_down" | "record_text_up" | "record_text_down"

export class Source {
    id            : number     = NaN
    name          : string     = ''
    source_type   : SourceType = 0
    source_url    : string     = ""
    waffler_score : number     = 1
    racizm_score  : number     = 0
}

export class Records {
    record_text:string = ''
    score      :number = NaN
    timestamp  :string = ''
}

export class Parser {
    type  = 'GPT'
    token = ''
}


class MainPageData implements IModelData {
    query       : string       = ''
    limit       : number       = 15
    cursor      : number       = 0
    order       : TOrderKey    = 'waffler_down'
    source_type : SourceType[] = [0,1]
    score_type  : ScoreType[]  = [0]

    sources:Array< Source > = []

    parse_url         : string     = ''
    parser            : any        = new Parser()
    parse_score_type  : ScoreType  = 0
    parse_source_type : SourceType = 0
    parse_client_id   : string     = "2"


    score_source_id  : number    = 0
    score_score_type : ScoreType = 0
    score_cursor     : number    = 0
    score_limit      : number    = 10
    score_order      : string    = "score_down"

    records:Array< Records > = []


}

export class MainPage extends Model {
    data : MainPageData = new MainPageData()
    state: DataState    = DataState.OK

    getPostRequestData( api: API): JSONObject {
        switch(api){
            case APIRoute.SOURCE_SEARCH: return {
                query      : this.data.query,
                limit      : this.data.limit,
                cursor     : this.data.cursor,
                order      : this.data.order,
                source_type: this.data.source_type,
                score_type : this.data.score_type
            }

            case APIRoute.SOURCE_PARSE: return {
                source_url: this.data.parse_url,
                score_type: this.data.parse_score_type,
                client_id : this.data.parse_client_id,
                parser    : this.data.parser
            }

            case APIRoute.SOURCE_SCORE: return {
                source_id : this.data.score_source_id,
                score_type: this.data.score_score_type,
                limit     : this.data.score_limit,
                order     : this.data.score_order,
                cursor    : this.data.score_cursor
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
                break;

            case APIRoute.SOURCE_SCORE:
                this.data.score_cursor = data.cursor
                this.data.records      = data.records
                break;
        }
    }

    setScoreParams(){
        if ( this.data.score_type.length > 0 ) this.data.score_score_type = this.data.score_type[0]
    }

    setParseParams( isRouteFormMain:boolean ){
        if ( this.isURL(this.data.query) ) this.data.parse_url = this.data.query
        else this.data.parse_url = ''

        if ( this.data.source_type.length > 0 ) this.data.parse_source_type = this.data.source_type[0]

        if ( this.data.score_type.length > 0 && isRouteFormMain ) this.data.parse_score_type = this.data.score_type[0]
        else this.data.parse_score_type = this.data.score_score_type

    }

    isURL(str:string) {
        const pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|'+ // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
        '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
        return pattern.test(str);
    }

}

