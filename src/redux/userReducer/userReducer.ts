import { IUserState } from '../types'
import { IActions, UserActionsTypes } from './userActionsTypes'

const initialState: IUserState = {
    nickName: '',
    email: '',
    role: '',
    _id: '',
    isActivated: false,
    isAuth: false,
    loading: false
}

const userReducer = (state = initialState, action: IActions): IUserState => {
    switch (action.type) {
        case UserActionsTypes.SET_USER_DATA:
            return { ...state, ...action.payload, isAuth: true }
        case UserActionsTypes.SET_LOADING:
            return {...state, loading: action.payload}
        case UserActionsTypes.LOGOUT_AND_REMOVE_USER_DATA:
            return {...state, ...initialState}
        default:
            return { ...state }
    }
}

export default userReducer