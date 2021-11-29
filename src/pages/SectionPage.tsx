import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import CardList from '../components/SectionPageComponents/CardsList';
import UserApi from '../http/UserApi';
import '../styles/sectionPage.scss'
import { ICardData, ISectionData } from '../types/userTypes';
import CardContext from '../context/CardContext'
import CardFilter from '../components/SectionPageComponents/CardFilter';
import { SECTION_LIST_PAGE } from '../const/routes';
import { UserActions } from '../redux/userReducer/userActions';
import { useDispatch } from 'react-redux';
import ProfileLink from '../components/ProfileLink';
import SPDropDown from '../components/SectionPageComponents/SPDropDown';

const SectionPage: React.FC = () => {
    const [currentSection, setCurrentSection] = useState(({} as ISectionData))
    const [cards, setCards] = useState(([] as ICardData[]))
    const [language, setLanguage] = useState('en')
    const [displayMode, setDisplayMode] = useState('normal')
    const history = useHistory()
    const sectionId = window.location.pathname.split('/')[2]
    const dispatch = useDispatch()

    useEffect(() => {
        let cleanUpFunction = false
        if (!cleanUpFunction) {
            (async function () {
                try {
                    dispatch(UserActions.setLoading(true))
                    const sectionResponse = await UserApi.getSectionById(sectionId)
                    const { data } = await UserApi.getCards(sectionId)
                    setCurrentSection(sectionResponse.data)
                    setCards(data)
                    dispatch(UserActions.setLoading(false))
                } catch (err) {
                    console.log(err)
                }
            }())
        }
        return () => { cleanUpFunction = true }
    }, [])
    return (
        <CardContext.Provider
            value={{
                setCards: setCards,
                sectionId,
                setDisplayMode: setDisplayMode,
                displayMode,
                language
            }}>
            <div className="page-wrapper">
                <main className="content-place section-page">
                    <h1 className="section-page__title">{currentSection.sectionName}</h1>
                    <SPDropDown setLanguage={setLanguage}/>
                    <CardFilter />
                    <CardList cards={cards} />
                    <button onClick={() => history.push(SECTION_LIST_PAGE)} className="section-page__back-btn"><div className="triangle-left"></div>разделы</button>
                    <ProfileLink />
                </main>
            </div>
        </CardContext.Provider >
    );
}

export default SectionPage;