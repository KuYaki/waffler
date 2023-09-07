class API extends String {}

class APIRoute {

    static SOURCE_SEARCH:API = '/source/search'
    static SOURCE_SCORE:API  = '/source/score'
    static SOURCE_INFO:API   = '/source/info'

    static LOGIN:API        = '/user/auth'
    static REGISTRATION:API = '/user/register'
    static LOGOUT:API       = '/logout'

    static USER_INFO:API = '/user/info'
    static USER_SAVE:API = '/user/save'
}

export default APIRoute