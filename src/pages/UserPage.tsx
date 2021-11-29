import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { LOGIN_PAGE, SECTION_LIST_PAGE } from '../const/routes'
import { useTypedSelector } from '../hooks/useTypedSelector'
import UserApi from '../http/UserApi'
import { UserActions } from '../redux/userReducer/userActions'
import '../styles/userPage.scss'

const UserPage: React.FC = () => {
    const history = useHistory()
    const [numberOfSections, setNumberOfSections] = useState('')
    const { nickName, role, email, isActivated, _id } = useTypedSelector(state => state.user)
    const dispatch = useDispatch()

    const sendMail = async () => {
        await UserApi.sendActivationMail(_id)
    }

    useEffect(() => {
        let cleanUpFunction = false
        if (!cleanUpFunction) {
            (async function () {
                const { data } = await UserApi.getNumberOfSections(_id)
                
                setNumberOfSections(data)
            })()
        }
        return () => { cleanUpFunction = true }
    }, [])

    return (
        <div className="page-wrapper user-page">
            <main className="content-place">
                <h1 className="user-page__title">Профиль:</h1>
                <article className="user-page__data">
                    <section className="user-page__profile-img" title="Ваш профиль">{nickName[0]}</section>
                    <section className="user-page__info">
                        <h3 className="user-page__info_title">{nickName}</h3>
                        <ul className="user-page__info_data-list">
                            <li className="user-page__info_data"><strong>роль:</strong> {role}</li>
                            <li className="user-page__info_data"><strong>Email:</strong> {email}</li>
                            <li className="user-page__info_data"><strong>Созданных разделов:</strong> {numberOfSections}</li>
                        </ul>
                        {isActivated === false &&
                            <>
                                <p className="user-page__activate">
                                    Для подтверждения аккаунта перейдите по ссылке в сообщении,
                                    отправленном на ваш почтовый ящик после регистрации.<br />
                                </p>
                                <p
                                    className="user-page__activate-link"
                                    onClick={sendMail}
                                >Отправить еще раз.
                                </p>
                            </>}
                    </section>
                </article>
                <button onClick={() => history.push(SECTION_LIST_PAGE)} className="user-page__back-btn">разделы</button>
                <button onClick={async () => {
                    dispatch(UserActions.logout())
                    history.push(LOGIN_PAGE)
                }} className="user-page__logout-btn">выйти</button>
            </main>
        </div>
    )
}

export default UserPage