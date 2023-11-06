import APIRoute from "@/global/api";

import { isURL } from "@/helper/CheckUrl";

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

export enum TokenType {
    ChatGPT,
    YakiModel
}

export type TOrderKey = "name"| "name_desc" | "source" | "source_desc" | "waffler" | "waffler_desc" | "racism" | "racism_desc"
export type TScoreOrderKey = "score" | "score_desc" | "time" | "time_desc"

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
    type  = TokenType.ChatGPT
    token = ''
}

export class Cursor {
    offset   :number = 0
    partition:number = 0
}

class MainPageData implements IModelData {
    query       : string       = ''
    limit       : number       = 15
    cursor      : any          = new Cursor()
    order       : TOrderKey[]  = ['waffler']
    source_type : SourceType[] = [0,1]
    score_type  : ScoreType[]  = [0]

    sources:Array< Source > = []

    parse_url         : string     = ''
    parser            : any        = new Parser()
    parse_score_type  : ScoreType  = ScoreType.Waffler
    parse_source_type : SourceType = SourceType.Telegram
    parse_client_id   : string     = "2"
    parse_limit       : number     = 0
    currency          : string     = 'USDT'
    price             : number     = 0


    score_source_id  : number           = 0
    score_score_type : ScoreType        = ScoreType.Waffler
    score_cursor     : any              = new Cursor()
    score_limit      : number           = 10
    score_order      : TScoreOrderKey[] = ["score"]

    records:Array< Records > = []

    name: string = ''
    type: SourceType = SourceType.Telegram


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

            case APIRoute.SOURCE_INFO: return {
                source_url : this.data.parse_url
            }

            case APIRoute.SOURCE_PRICE : return {
                source_url: this.data.parse_url,
                score_type: this.data.parse_score_type,
                parser    : this.data.parser,
                limit     : this.data.parse_limit,
                currency  : this.data.currency
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

            case APIRoute.SOURCE_INFO:
                this.data.name = data.name
                this.data.type = data.type
                break

            case APIRoute.SOURCE_PRICE:
                this.data.price    = data.price
                this.data.currency = data.currency
                break
        }
    }

    setScoreParams(){
        if ( this.data.score_type.length > 0 ) this.data.score_score_type = this.data.score_type[0]
    }

    setParseParams( isRouteFormMain:boolean ){
        if ( isURL(this.data.query) ) this.data.parse_url = this.data.query
        else this.data.parse_url = ''

        if ( this.data.source_type.length > 0 ) this.data.parse_source_type = this.data.source_type[0]

        if ( this.data.score_type.length > 0 && isRouteFormMain ) this.data.parse_score_type = this.data.score_type[0]
        else this.data.parse_score_type = this.data.score_score_type

    }


}

