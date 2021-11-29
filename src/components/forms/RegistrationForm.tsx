import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import { MAIN_ROUTE } from '../../clientRoutes'
import { UserActions } from '../../redux/userReducer/userActions'
import '../../styles/authPage.scss'

const RegistrationForm: React.FC = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const dispatch = useDispatch()
    const history = useHistory()

    async function registrationHandler(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        try {
            await dispatch(UserActions.registration({ email, password, nickName: name }))
        } catch (err: any) {
            dispatch(UserActions.setLoading(false))
            console.log(err.response?.data?.message)
            return alert(err.response?.data?.message)
        }
        history.push(MAIN_ROUTE)
    }

    return (
        <form className="login-form" onSubmit={registrationHandler}>
            <h2 className="login-form__title">Регистрация</h2>
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
            <label className="login-form__label" htmlFor="nick-name">Имя:</label>
            <input
                className="login-form__input"
                id="nick-name"
                placeholder="Имя"
                value={name}
                onChange={e => setName(e.target.value)}
            />
            <button className="login-form__button" type="submit">Зарегистрироваться</button>
            <span className="login-form__span">Есть аккаунт? <Link to="/login" className="login-form__link">Войди!</Link></span>
        </form>
    )
}

export default RegistrationForm