import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useTypedSelector } from '../hooks/useTypedSelector'
import UserApi from '../http/UserApi'
import { UserActions } from '../redux/userReducer/userActions'
import '../styles/sectionListPage.scss'
import { ISectionData } from '../types/userTypes'
import AddSectionForm from './forms/AddSectionForm'
import Section from './Section'

const SectionList: React.FC = () => {
    const [sections, setSections] = useState<ISectionData[]>([])
    const [modalStatus, setModalStatus] = useState(false)
    const { _id } = useTypedSelector(state => state.user)
    const dispatch = useDispatch()

    useEffect(() => {
        let cleanUpFunction = false
        if (!cleanUpFunction) {
            (async function () {
                try {
                    dispatch(UserActions.setLoading(true))
                    const { data } = await UserApi.getSections(_id)
                    setSections(data)
                    dispatch(UserActions.setLoading(false))
                } catch (err: any) {
                    dispatch(UserActions.setLoading(false))
                    console.log(err.response?.data?.message)
                    return alert(err.response?.data?.message)
                }
            }())
        }
        return () => { cleanUpFunction = true }
    }, [])

    return (
        <article className="section-list__sections-block">
            <button
                className="section-list__section section-list__section-add"
                onClick={() => setModalStatus(true)}
                title="Добавить раздел">
            </button>
            {sections.length > 0 && sections.map(section => (
                <Section key={section._id} section={section} setSections={setSections} />
            ))}
            {modalStatus && <div
                className="modal-wrapper"
                onClick={e => {
                    if ((e.target as HTMLDivElement).classList.contains('modal-wrapper')) {
                        setModalStatus(false)
                    }
                }}>
                <AddSectionForm setSections={setSections} setModalStatus={setModalStatus} />
            </div>}
        </article>

    )
}

export default SectionList