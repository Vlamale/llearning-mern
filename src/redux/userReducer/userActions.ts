import UserApi from '../../http/UserApi'
import { ISetAuthResponseData, UserActionsTypes } from './userActionsTypes'
import { IApiUserData, IHttpRegistrationProps } from '../../types/userTypes'
import { Dispatch } from 'redux'

export class UserActions {

    static login(email: string, password: string) {
        return async (dispatch: Dispatch) => {
            dispatch(this.setLoading(true))
            const { data } = await UserApi.login(email, password)
            localStorage.setItem('token', data.accessToken)
            dispatch(this.SetAuthResponseData(data.user))
            dispatch(this.setLoading(false))
        }
    }

    static logout() {
        return async (dispatch: Dispatch) => {
            try {
                dispatch(this.setLoading(true))
                await UserApi.logout()
                localStorage.removeItem('token')
                dispatch(this.logoutAndRemoveUserData())
            } catch (err: any) {
                dispatch(this.setLoading(false))
                console.log(err.response?.data?.message)
                return alert(err.response?.data?.message)
            }
        }
    }

    static registration(userData: IHttpRegistrationProps) {
        return async (dispatch: Dispatch) => {
            dispatch(this.setLoading(true))
            const { data } = await UserApi.registration(userData)
            localStorage.setItem('token', data.accessToken)
            dispatch(this.SetAuthResponseData(data.user))
            dispatch(this.setLoading(false))
        }
    }

    static logoutAndRemoveUserData() {
        return {
            type: UserActionsTypes.LOGOUT_AND_REMOVE_USER_DATA
        }
    }

    static checkAuth() {
        return async (dispatch: Dispatch) => {
            try {
                dispatch(this.setLoading(true))
                const { data } = await UserApi.checkAuth()
                localStorage.setItem('token', data.accessToken)
                dispatch(this.SetAuthResponseData(data.user))
                dispatch(this.setLoading(false))
            } catch (err: any) {
                dispatch(this.setLoading(false))
                console.log(err.response?.data?.message)
                alert(err.response?.data?.message)
                localStorage.removeItem('token')
                dispatch(this.logoutAndRemoveUserData())
            }
        }
    }

    static SetAuthResponseData(userData: IApiUserData): ISetAuthResponseData {
        return {
            type: UserActionsTypes.SET_USER_DATA,
            payload: userData
        }
    }

    static setLoading(status: boolean) {
        return {
            type: UserActionsTypes.SET_LOADING,
            payload: status
        }
    }
}