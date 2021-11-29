import React, { useState } from 'react'
import bold from '../../../images/bold.png'
import { boldBtnHandler } from '../../../utils/handlers'

interface ILeftBoldBtn {
    text: string
    setText: React.Dispatch<React.SetStateAction<string>>
    setRequestBoldSubject: React.Dispatch<React.SetStateAction<string>>
    leftInputRef: React.RefObject<HTMLDivElement>
}

const LeftBoldBtn: React.FC<ILeftBoldBtn> = (
    {
        text,
        setText,
        setRequestBoldSubject,
        leftInputRef
    }) => {

    const [isBolded, setIsBolded] = useState(false)

    return (
        <img
            className="section-page__bold-img section-page__left-bold-img"
            onClick={() => boldBtnHandler({
                text,
                setText,
                inputRef: leftInputRef,
                setRequestBoldSubject,
                flag: false,
                isBolded,
                setIsBolded
            })}
            src={bold}
            alt="bold"
        />
    )
}
export default LeftBoldBtn