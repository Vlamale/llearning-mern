import React from "react"

interface ILeftInput {
    leftInputRef: React.RefObject<HTMLDivElement>
    setText: React.Dispatch<React.SetStateAction<string>>
}

const LeftInput: React.FC<ILeftInput> = ({leftInputRef, setText}) => {
    
    return (
        <div className="section-page__add-input" contentEditable="true"
            ref={leftInputRef}
            onSelect={e => {
                setText((e.target as HTMLDivElement).innerHTML)
            }}
        ></div>
    )
}

export default LeftInput