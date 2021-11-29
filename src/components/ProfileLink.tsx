import React from 'react'
import { Link } from 'react-router-dom'
import { USER_PAGE } from '../const/routes'
import { useTypedSelector } from '../hooks/useTypedSelector'

const ProfileLink = () => {
    const { nickName } = useTypedSelector(state => state.user)

    return (
        <Link to={USER_PAGE} className="profile-img" title="Ваш профиль">{nickName[0]}</Link>
    )
}

export default ProfileLink