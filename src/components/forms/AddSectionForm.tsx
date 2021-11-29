import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import UserApi from '../../http/UserApi'
import { UserActions } from '../../redux/userReducer/userActions'
import { ISectionData } from '../../types/userTypes'

interface IAddSectionForm {
    setSections: React.Dispatch<React.SetStateAction<ISectionData[]>>
    setModalStatus: React.Dispatch<React.SetStateAction<boolean>>
}

const AddSectionForm: React.FC<IAddSectionForm> = ({setSections, setModalStatus}) => {
    const [sectionName, setSectionName] = useState('')
    const { _id } = useTypedSelector(state => state.user)
    const dispatch = useDispatch()

    const addSection = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            dispatch(UserActions.setLoading(true))
            await UserApi.createSection({ userId: _id, sectionName })
            const { data } = await UserApi.getSections(_id)
            setSectionName('')
            setSections(data)
            dispatch(UserActions.setLoading(false))
            setModalStatus(false)
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <form className="add-section-form" onSubmit={addSection}>
            <h3 className="add-section-form__title">Введите название раздела</h3>
            <label className="add-section-form__label" htmlFor="section-name">Название раздела</label>
            <input
                className="add-section-form__input"
                id="section-name"
                value={sectionName}
                onChange={e => setSectionName(e.target.value)}
            />
            <button className="add-section-form__button" type="submit">Создать</button>
        </form>
    )
}

export default AddSectionForm