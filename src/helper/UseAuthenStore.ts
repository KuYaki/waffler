import { AuthenticationStore }         from "@/store/Authentication"
import { RequestStatusStore }          from "@/store/RequestStatus"
import { RequestStatus }               from "@/api/http/status";
import { Authentication, Credentials } from "@/model/Authentication";

export const singIn = (credentials: Credentials) => {
    return store().singIn(credentials);
}

export const singOut = () => {
    return store().singOut();
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