import { AuthenticationStore }         from "@/store/Authentication"
import { RequestStatusStore }          from "@/store/RequestStatus"
import { RequestStatus }               from "@/api/http/status";
import { Authentication, Credentials, RegisterData } from "@/model/Authentication";

export const signIn = (credentials: Credentials) => {
    return store().signIn(credentials);
}

export const register = ( regData:RegisterData ) => {
    return store().register(regData)
}

export const signOut = () => {
    return store().signOut();
}

export const authentication = () : Authentication => {
    return store().authentication;
}

export const disabled = (): boolean => {
    return false || status().isNetworkError();
}

export const status = (): RequestStatus => {
    const requestStatusStore = RequestStatusStore();

    return requestStatusStore.status;
}

const store = () => {
    return AuthenticationStore(status());
}