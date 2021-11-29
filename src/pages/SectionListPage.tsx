import React from 'react'
import ProfileLink from '../components/ProfileLink'
import SectionList from '../components/SectionList'
import '../styles/sectionListPage.scss'

const SectionListPage: React.FC = () => {

    return (
    <div className="page-wrapper">
        <main className="content-place section-list">
            <h2 className="section-list__title">Ваши разделы:</h2>
            <SectionList />
            <ProfileLink />
        </main>
    </div>
    )
}

export default SectionListPage