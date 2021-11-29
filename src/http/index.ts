import axios from 'axios'
import UserApi from './UserApi'


const $authHost = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3000/api',
    withCredentials: true
})

const $host = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3000/api',
    withCredentials: true
})

$authHost.interceptors.request.use((config) => {
    if (config.headers) {
        config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    }
    return config
})

$authHost.interceptors.response.use(config => {
    return config
}, async (err) => {
    if (err.response.status === 401 && err.config && !err.config._isRetry) {
        err.config._isRetry = true
        try {
            const { data } = await UserApi.checkAuth()
            localStorage.setItem('token', data.accessToken)
            return $authHost.request(err.config)
        } catch (err) {
            console.log('Не авторизован!')
        }
    }
    throw err
})

export {
    $authHost,
    $host
}