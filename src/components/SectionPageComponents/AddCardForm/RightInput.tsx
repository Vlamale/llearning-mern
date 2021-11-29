import React from "react"

interface IRightInput {
    rightInputRef: React.RefObject<HTMLDivElement>
    setTranslation: React.Dispatch<React.SetStateAction<string>>
}

const RightInput: React.FC<IRightInput> = ({ rightInputRef, setTranslation }) => {
    return (
        <div className="section-page__add-input" contentEditable="true"
            ref={rightInputRef}
            onSelect={e => {
                setTranslation((e.target as HTMLDivElement).innerHTML)
            }}
        ></div>
    )
}

export default RightInput