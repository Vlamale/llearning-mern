import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { MAIN_ROUTE } from '../../clientRoutes'
import { UserActions } from '../../redux/userReducer/userActions'
import '../../styles/authPage.scss'

const LoginForm: React.FC = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()
    const history = useHistory()

    async function loginHandler(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        try {
            await dispatch(UserActions.login(email, password))
        } catch (err: any) {
            dispatch(UserActions.setLoading(false))
            console.log(err.response?.data?.message)
            return alert(err.response?.data?.message)
        }
        history.push(MAIN_ROUTE)
    }

    return (
        <form className="login-form" onSubmit={loginHandler}>
            <h2 className="login-form__title">Вход:</h2>
            <label className="login-form__label" htmlFor="email">Email:</label>
            <input
                className="login-form__input"
                id="email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
            />
            <label className="login-form__label" htmlFor="password">Пароль:</label>
            <input
                className="login-form__input"
                id="password"
                type="password"
                placeholder="Пароль"
                value={password}
                onChange={e => setPassword(e.target.value)}
            />
            <button className="login-form__button">Войти</button>
            <span className="login-form__span">Нет аккаунта? <Link to="/registration" className="login-form__link">Зарегистрируйся!</Link></span>
        </form>
    )
}

export default LoginForm