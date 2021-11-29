import React, { useContext } from 'react'
import CardContext from '../../context/CardContext'

const CardFilter: React.FC = () => {
    const { setDisplayMode, displayMode, setCards } = useContext(CardContext)

    const filterHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, mode: string) => {
        (e.target as HTMLButtonElement).classList.add('active')
        setDisplayMode(mode)
    }

    const mixHandler = () => {
        setCards((prev) => {
            for (let i = prev.length - 1; i > 0; i--) {
                let j = Math.floor(Math.random() * (i + 1));
                [prev[i], prev[j]] = [prev[j], prev[i]];
            }
            return [...prev]
        })
    }

    return (
        <section className="section-page__filter">
            <button
                className={`section-page__filter-btn ${displayMode === 'normal' && 'active'}`}
                onClick={(e) => {
                    filterHandler(e, 'normal')
                }}
            >обычный
            </button>
            <button
                className={`section-page__filter-btn ${displayMode === 'term' && 'active'} `}
                onClick={(e) => {
                    filterHandler(e, 'term')
                }}
            >скрыть терм.
            </button>
            <button
                className={`section-page__filter-btn ${displayMode === 'translation' && 'active'}`}
                onClick={(e) => {
                    filterHandler(e, 'translation')
                }}
            >скрыть пер.
            </button>
            <button
                className={`section-page__filter-btn ${displayMode === 'translation' && 'active'}`}
                onClick={() => {
                    mixHandler()
                }}
            >перемешать слова.
            </button>
        </section>
    )
}

export default CardFilter