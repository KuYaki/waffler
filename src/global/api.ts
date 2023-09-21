import { API } from "@/api/service/interface"

class APIRoute {

    static SOURCE_SEARCH:API = '/source/search'
    static SOURCE_PARSE:API  = '/source/parse'
    static SOURCE_SCORE:API  = '/source/score'
    static SOURCE_INFO:API   = '/source/info'

    static LOGIN:API        = '/auth/login'
    static REGISTRATION:API = '/auth/register'
    static LOGOUT:API       = '/logout'

    // static USER_INFO:API = '/user/info'
    // static USER_SAVE:API = '/user/save'
}

export default APIRoute