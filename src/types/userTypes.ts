export interface IHttpRegistrationProps {
    email: string
    password: string
    nickName: string
}

export interface IApiUserData {
    nickName: string
    email: string
    role: string
    _id: string
    isActivated: boolean
}

export interface IHttpAuthResponse {
    accessToken: string
    refreshToken: string
    user: IApiUserData
}

export interface ISectionData {
    _id: string,
    sectionName: string,
    userId: string,
    createdAt: string
}

export interface ISectionCreateData {
    userId: string
    sectionName: string
}

export interface ICardData {
    _id: string,
    word: string,
    translation: string,
    sectionId: string,
    picture: string
}

export interface ICreateCardData {
    word: string,
    translation: string,
    sectionId: string,
    picture: string
}