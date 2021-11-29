import { IApiUserData } from "../../types/userTypes";

export enum UserActionsTypes {
    AUTH_STATUS = 'AUTH_STATUS',
    SET_USER_DATA = 'SET_USER_DATA',
    SET_LOADING = 'SET_LOADING',
    LOGOUT_AND_REMOVE_USER_DATA = 'LOGOUT_AND_REMOVE_USER_DATA'
}

export interface ISetAuthResponseData {
    type: UserActionsTypes.SET_USER_DATA,
    payload: IApiUserData
}

export interface ISetLoading {
    type: UserActionsTypes.SET_LOADING,
    payload: boolean
}

export interface ILogoutAndRemoveUserData {
    type: UserActionsTypes.LOGOUT_AND_REMOVE_USER_DATA
}

export type IActions = ISetAuthResponseData | ISetLoading | ILogoutAndRemoveUserData