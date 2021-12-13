import React, { useContext, useState } from 'react'
import { ICardData } from '../../types/userTypes'
import noPhoto from '../../images/no-photo.png'
import CardContext from '../../context/CardContext'
import threeDots from '../../images/three-dots.png'
import UserApi from '../../http/UserApi'
import { useDispatch } from 'react-redux'
import { UserActions } from '../../redux/userReducer/userActions'

interface ICardProps {
    card: ICardData
}

const Card: React.FC<ICardProps> = ({ card: { picture, translation, word, _id } }) => {
    const [paramDropDownStatus, setParamDropDownStatus] = useState(false)
    const { displayMode, setCards } = useContext(CardContext)
    const dispatch = useDispatch()
    const showWordHandler = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>, mode: string) => {
        if (displayMode === mode) {
            (e.target as HTMLSpanElement).classList.toggle('section-page__hide-span')
        }
    }

    const deleteCard = async () => {
        dispatch(UserActions.setLoading(true))
        const { data } = await UserApi.deleteCard(_id)
        setCards(data)
        dispatch(UserActions.setLoading(false))
    }

    const copyCard = () => {
        navigator.clipboard.writeText(`${word.replaceAll("<[^>]*>", "")} - ${translation.replaceAll("<[^>]*>", "")}`)
        setParamDropDownStatus(false)
    }

    return (
        <section className="section-page__card">
            <div className="section-page__word section-page__word-term">
                <span
                    className={`section-page__word-span ${displayMode === 'term' ? 'section-page__hide-span' : undefined}`}
                    style={{ cursor: displayMode === 'term' ? 'pointer' : undefined }}
                    onClick={(e) => showWordHandler(e, 'term')}
                    dangerouslySetInnerHTML={{ __html: word }}
                ></span>
                <span className="section-page__word_term-span unselectable">термин</span>
            </div>
            <div className="section-page__word">
                <span
                    className={`section-page__word-span ${displayMode === 'translation' ? 'section-page__hide-span' : undefined}`}
                    style={{ cursor: displayMode === 'translation' ? 'pointer' : undefined }}
                    onClick={(e) => showWordHandler(e, 'translation')}
                    dangerouslySetInnerHTML={{ __html: translation }}
                ></span>
                <span className="section-page__word_translate-span unselectable">перевод</span>
            </div>
            <img className="section-page__img" src={picture ? picture : noPhoto} alt="card-img" />
            <img
                onClick={() => setParamDropDownStatus(prev => !prev)}
                className="section-page__three-dots"
                src={threeDots}
                alt="delete"
                title="Удалить карточку"
            />
            <ul className="section-page__options-list" style={{ "display": paramDropDownStatus ? "block" : "none" }}>
                <li
                    onClick={() => copyCard()}
                    className="section-page__options-param"
                >Копировать карточку
                </li>
                <li
                    onClick={() => deleteCard()}
                    className="section-page__options-param"
                >Удалить
                </li>
            </ul>
        </section>
    )
}
export default Card