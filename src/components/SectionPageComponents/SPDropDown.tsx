import React from 'react'
import { languagesData } from '../../const/languagesData'

interface ISPDropDown {
    setLanguage: React.Dispatch<React.SetStateAction<string>>
}

const SPDropDown: React.FC<ISPDropDown> = ({setLanguage}) => {
    return (
        <select
            className="section-page__drop-down"
            name="cars"
            id="cars"
            onChange={e => setLanguage(e.target.value)}
        >
            {languagesData.map(({ code, language }) => (
                <option
                    key={code}
                    className="section-page__drop-down_select"
                    value={code}
                >{language}
                </option>
            ))}
        </select>
    )
}

export default SPDropDown