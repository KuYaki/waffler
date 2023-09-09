import APIRoute                 from '@/api/api'

import http, { AUTHENTICATION } from '@/api/http/http'

import { Credentials }           from '@/model/Authentication'


class AuthService {
    login( user:Credentials ): Promise<any> {

        return http.request( AUTHENTICATION.NOT_REQUARED ).post( APIRoute.LOGIN as string, user )
    }

    register ( user:Credentials ):Promise<any> {

        return http.request( AUTHENTICATION.NOT_REQUARED ).post( APIRoute.REGISTRATION as string, user )
    }

    logout(): Promise<any> {
        return http.request().post( APIRoute.LOGOUT as string )
    }
}

export default new AuthService()