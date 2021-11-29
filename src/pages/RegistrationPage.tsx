import React from 'react'
import RegistrationForm from '../components/forms/RegistrationForm'
import '../styles/authPage.scss'

const RegistrationPage: React.FC = () => {
    return (
    <main className="auth-page">
        <RegistrationForm />
    </main>
    )
}

export default RegistrationPage