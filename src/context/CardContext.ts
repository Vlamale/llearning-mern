import React, { createContext } from "react";
import { ICardData } from "../types/userTypes";

interface ICardContextData {
    setCards: React.Dispatch<React.SetStateAction<ICardData[]>>
    sectionId: string
    setDisplayMode: React.Dispatch<React.SetStateAction<string>>
    displayMode: string
    language: string
}

const CardContext = createContext<ICardContextData>({
    sectionId: '',
    setCards: () => {},
    setDisplayMode: () => {},
    displayMode: 'normal',
    language: ''
})

export default CardContext