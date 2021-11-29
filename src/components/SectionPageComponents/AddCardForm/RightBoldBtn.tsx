import React, { useState } from 'react'
import bold from '../../../images/bold.png'
import { boldBtnHandler } from '../../../utils/handlers'

interface IRightBoldBtn {
    translation: string
    setTranslation: React.Dispatch<React.SetStateAction<string>>
    setRequestBoldSubject: React.Dispatch<React.SetStateAction<string>>
    rightInputRef: React.RefObject<HTMLDivElement>
}

const RightBoldBtn: React.FC<IRightBoldBtn> = (
    {
        translation,
        setTranslation,
        rightInputRef,
        setRequestBoldSubject
    }) => {

    const [isBolded, setIsBolded] = useState(false)

    return (
        <img
            className="section-page__bold-img section-page__right-bold-img"
            onClick={() => boldBtnHandler({
                text: translation,
                setText: setTranslation,
                inputRef: rightInputRef,
                setRequestBoldSubject,
                flag: true,
                isBolded,
                setIsBolded
            })}
            src={bold}
            alt="bold"
        />
    )
}
export default RightBoldBtn