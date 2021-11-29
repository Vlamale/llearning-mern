import React from 'react'
import LoginForm from '../components/forms/LoginForm'
import '../styles/authPage.scss'

const LoginPage: React.FC = () => {
    return (
    <main className="auth-page">
        <LoginForm />
    </main>
    )
}

export default LoginPage