import React, { createRef, useContext, useState } from 'react'
import SearchPhotoModal from './SearchPhotoModal'
import LeftInput from './LeftInput'
import RightInput from './RightInput'
import LeftBoldBtn from './LeftBoldBtn'
import RightBoldBtn from './RightBoldBtn'
import ConfirmBtns from './ConfirmBtns'
import UserApi from '../../../http/UserApi'
import CardContext from '../../../context/CardContext'
import selectImage from '../../../images/select-image.png'
import { useDispatch } from 'react-redux'
import { UserActions } from '../../../redux/userReducer/userActions'

interface IAddCardForm {
    setAddCardStatus: React.Dispatch<React.SetStateAction<boolean>>
}

const AddCardForm: React.FC<IAddCardForm> = ({ setAddCardStatus }) => {
    const [picturesModalStatus, setPicturesModalStatus] = useState(false)
    const [picture, setPicture] = useState('')
    const [text, setText] = useState('')
    const [translation, setTranslation] = useState('')
    const [requestBoldSubject, setRequestBoldSubject] = useState('')
    const leftInputRef = createRef<HTMLDivElement>()
    const rightInputRef = createRef<HTMLDivElement>()
    const { setCards, sectionId } = useContext(CardContext)
    const dispatch = useDispatch()

    async function createCard(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        dispatch(UserActions.setLoading(true))
        const { data } = await UserApi.createCard({
            word: text,
            translation,
            sectionId,
            picture
        })
        setCards(data)
        dispatch(UserActions.setLoading(false))
        setText('')
        setTranslation('')
        setPicture('')
        setAddCardStatus(false)
    }

    return (
        <>
            <form className="section-page__card section-page__add-card-form" onSubmit={createCard}>
                <div className="section-page__word section-page__word-term">
                    <LeftInput leftInputRef={leftInputRef} setText={setText} />
                    <LeftBoldBtn
                        text={text}
                        setText={setText}
                        setRequestBoldSubject={setRequestBoldSubject}
                        leftInputRef={leftInputRef}
                    />
                    <span className="section-page__word_term-span"
                    >термин
                    </span>
                </div>
                <div className="section-page__word">
                    <RightInput rightInputRef={rightInputRef} setTranslation={setTranslation} />
                    <RightBoldBtn
                        translation={translation}
                        setTranslation={setTranslation}
                        setRequestBoldSubject={setRequestBoldSubject}
                        rightInputRef={rightInputRef}
                    />
                    <span className="section-page__word_translate-span"
                    >перевод
                    </span>
                </div>

                <img
                    src={picture || selectImage}
                    className="section-page__img section-page__add-photo"
                    onClick={() => setPicturesModalStatus(true)}
                    alt="select" 
                    title="Выбрать фото"
                    />

                {picturesModalStatus &&
                    <SearchPhotoModal
                        requestBoldSubject={requestBoldSubject}
                        requestSubject={text}
                        setPicturesModalStatus={setPicturesModalStatus}
                        setPicture={setPicture}
                    />
                }
                <ConfirmBtns
                    setAddCardStatus={setAddCardStatus}
                />
            </form>
        </>
    )
}
export default AddCardForm