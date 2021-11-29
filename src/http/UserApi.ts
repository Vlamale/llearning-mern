import {
    CREATE_CARD_ROUTE,
    CREATE_SECTION_ROUTE,
    LOGIN_ROUTE,
    LOGOUT_ROUTE,
    REFRESH_ROUTE,
    REGISTRATION_ROUTE
} from './apiRoutes'
import { $authHost, $host } from './index'
import {
    IHttpRegistrationProps,
    IHttpAuthResponse,
    ISectionData,
    ISectionCreateData,
    ICardData,
    ICreateCardData
} from '../types/userTypes'
import { AxiosResponse } from 'axios'


export default class UserApi {
    static async login(email: string, password: string): Promise<AxiosResponse<IHttpAuthResponse>> {
        return await $host.post<IHttpAuthResponse>(LOGIN_ROUTE, { email, password })
    }


    static async logout() {
        return await $authHost.get(LOGOUT_ROUTE)
    }

    static async registration(userData: IHttpRegistrationProps): Promise<AxiosResponse<IHttpAuthResponse>> {
        return await $host.post<IHttpAuthResponse>(REGISTRATION_ROUTE, userData)
    }

    static async checkAuth() {
        return await $host.get<IHttpAuthResponse>(REFRESH_ROUTE, {withCredentials: true})
    }

    static async getSections(userId: string): Promise<AxiosResponse<ISectionData[]>> {
        return await $authHost.get<ISectionData[]>(`/section/${userId}`)
    }

    static async createSection(sectionData: ISectionCreateData): Promise<AxiosResponse<ISectionData[]>> {
        return await $authHost.post<ISectionData[]>(CREATE_SECTION_ROUTE, sectionData)
    }

    static async deleteSection(sectionId: string): Promise<AxiosResponse<ISectionData[]>> {
        return await $authHost.get<ISectionData[]>(`/section/delete/${sectionId}`)
    }

    static async getSectionById(sectionId: string): Promise<AxiosResponse<ISectionData>> {
        return await $authHost.get<ISectionData>(`/section/get-section/${sectionId}`)
    }

    static async getCards(sectionId: string): Promise<AxiosResponse<ICardData[]>> {
        return await $authHost.get<ICardData[]>(`/card/${sectionId}`)
    }

    static async createCard(cardData: ICreateCardData): Promise<AxiosResponse<ICardData[]>> {
        return await $authHost.post<ICardData[]>(CREATE_CARD_ROUTE, cardData)
    }

    static async deleteCard(cardId: string): Promise<AxiosResponse<ICardData[]>> {
        return await $authHost.get<ICardData[]>(`/card/delete/${cardId}`)
    }

    static async sendActivationMail(id: string): Promise<AxiosResponse> {
        return await $authHost.get(`/user/send-mail/${id}`)
    }

    static async getNumberOfSections(userId: string): Promise<AxiosResponse<string>>  {
        return await $authHost.get(`/section/number-of-sections/${userId}`)
    }
}
