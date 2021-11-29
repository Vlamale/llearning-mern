import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import CardContext from '../../../context/CardContext'

interface ISearchPhotoModalProps {
    setPicturesModalStatus: React.Dispatch<React.SetStateAction<boolean>>
    requestSubject: string
    requestBoldSubject: string
    setPicture: React.Dispatch<React.SetStateAction<string>>
}

interface IPicturesResponse {
    id: string
    previewURL: string
}

const SearchPhotoModal: React.FC<ISearchPhotoModalProps> = (
    {
        setPicturesModalStatus,
        requestSubject,
        requestBoldSubject,
        setPicture
    }) => {

    const [pictures, setPictures] = useState([])
    const [picturesApiPage, setPicturesApiPage] = useState(1)
    const {language} = useContext(CardContext)

    useEffect(() => {
        let cleanUpFunction = false
        if (!cleanUpFunction) {
            (async function () {
                try {
                    const transformedReqSub = requestSubject.split(' ').join('+')
                    const { data } = await axios
                        .get(`https://pixabay.com/api/?key=24030971-1ba7abac410acf2a6222a37f3&lang=${language}&q=${requestBoldSubject !== '' ? requestBoldSubject : transformedReqSub}&page=${picturesApiPage}`)

                    const filteredPictures = data.hits
                        .map(({ id, previewURL }: IPicturesResponse) => ({ id, previewURL }))
                    setPictures(filteredPictures)
                } catch (err) {
                    console.log(err)
                }
            }())
        }
        return () => { cleanUpFunction = true }
    }, [picturesApiPage])

    return (
        <div
            className="modal-wrapper"
            onClick={e => {
                if ((e.target as HTMLDivElement).classList.contains('modal-wrapper')) {
                    setPicturesModalStatus(false)
                }
            }}
        >
            <article className="search-photo">
                <div className="search-photo__images">
                    {pictures.length > 1 && pictures.map(({ id, previewURL }) => (
                        <img
                            key={id}
                            className="search-photo__image"
                            src={previewURL}
                            alt="term-pict"
                            onClick={() => {
                                setPicture(previewURL)
                                setPicturesModalStatus(false)
                            }}
                        />
                    ))}
                    {pictures.length > 1 && (
                        <button
                            type="button"
                            onClick={() => setPicturesApiPage(prev => prev + 1)}
                            className="search-photo__load-more-button"
                        >Загрузить ещё...
                        </button>
                    )}
                    {pictures.length === 0 && (
                        <div>Не нашлось подходящего изображения? Попробуйте выделить ключевое слово.</div>
                    )
                    }
                </div>
            </article>
        </div>
    )
}

export default SearchPhotoModal