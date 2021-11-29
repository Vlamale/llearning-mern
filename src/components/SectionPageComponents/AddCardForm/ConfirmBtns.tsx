import React from 'react'


interface IConfirmBtns {
    setAddCardStatus: React.Dispatch<React.SetStateAction<boolean>>
}

const ConfirmBtns: React.FC<IConfirmBtns> = ({setAddCardStatus}) => {

    return (
        <div className="section-page__confirm-buttons">
            <button
                className="section-page__confirm-adding-btn section-page__add-btn"
                type="submit"
            >Добавить
            </button>
            <button
                className="section-page__cancel-adding-btn section-page__add-btn"
                onClick={() => setAddCardStatus(false)}
            >Отмена
            </button>
        </div>
    )
}

export default ConfirmBtns