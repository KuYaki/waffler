import { AuthenticationStore }         from "@/store/Authentication"
import { RequestStatusStore }          from "@/store/RequestStatus"
import { RequestStatus }               from "@/api/http/status";
import { Authentication, Credentials } from "@/model/Authentication";

export const signIn = (credentials: Credentials) => {
    return store().signIn(credentials);
}

export const register = ( credentials:Credentials ) => {
    return store().register(credentials)
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