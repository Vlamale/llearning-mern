import React, {  useState } from 'react'
import { ICardData } from '../../types/userTypes'
import Card from './Card'
import AddCardForm from './AddCardForm/AddCardForm'

interface ISectionListProps {
    cards: ICardData[]
}

const CardList: React.FC<ISectionListProps> = ({ cards }) => {

    const [addCardStatus, setAddCardStatus] = useState(false)

    return (
        <article className="section-page__cards-list">
            {cards.map(card => (
                <Card key={card._id}  card={card}/>
            ))}
            {addCardStatus &&
                <AddCardForm setAddCardStatus={setAddCardStatus}/>
            }
            {!addCardStatus &&
                <button
                    className="section-page__add-btn"
                    onClick={() => setAddCardStatus(true)}
                >Добавить карточку
                </button>
            }
        </article>
    )
}

export default CardList