import React, { useState } from 'react'
import threeDots from '../images/three-dots.png'
import { Link } from 'react-router-dom'
import { ISectionData } from '../types/userTypes'
import UserApi from '../http/UserApi'
import { useDispatch } from 'react-redux'
import { UserActions } from '../redux/userReducer/userActions'

interface ISectionProps {
    section: ISectionData
    setSections: React.Dispatch<React.SetStateAction<ISectionData[]>>
}

const Section: React.FC<ISectionProps> = ({section: {_id, createdAt, sectionName}, setSections}) => {
    const [paramDropDownStatus, setParamDropDownStatus] = useState(false)
    const dispatch = useDispatch()

    const deleteSection = async (_id: string) => {
        dispatch(UserActions.setLoading(true))
        const { data } = await UserApi.deleteSection(_id)
        setSections(data)
        dispatch(UserActions.setLoading(false))
    }

    return (
        <Link
            to={`/section/${_id}`}
            className="section-list__section"
            onClick={(e) => {
                if ((e.target as HTMLDivElement).classList.contains('section-list__three-dots')) {
                    e.preventDefault()
                }
            }}
            title={sectionName}
        >{sectionName.length > 30 ? `${sectionName.slice(0,30)}...` : sectionName}
            <time
                className="section-list__section_time"
                dateTime={createdAt.split('T')[0].split('-').reverse().join('.')}
            >{createdAt.split('T')[0].split('-').reverse().join('.')}
            </time>
            <img
                onClick={() => setParamDropDownStatus(prev => !prev)}
                className="section-list__three-dots"
                src={threeDots}
                alt="delete"
                title="Удалить карточку"
            />
            <ul className="section-list__options-list" style={{ "display": paramDropDownStatus ? "block" : "none" }}>
                <li
                    onClick={e => {
                        e.preventDefault()
                        deleteSection(_id)
                    }}
                    className="section-list__options-param"
                >Удалить</li>
            </ul>
        </Link>
    )
}

export default Section