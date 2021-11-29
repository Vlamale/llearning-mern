interface IBoldBtnHandler {
    text: string
    setText: React.Dispatch<React.SetStateAction<string>>
    inputRef: React.RefObject<HTMLDivElement>
    setRequestBoldSubject: React.Dispatch<React.SetStateAction<string>>
    flag: boolean
    isBolded: boolean
    setIsBolded: React.Dispatch<React.SetStateAction<boolean>>
}

export const boldBtnHandler = (
    {
        text,
        setText,
        inputRef,
        setRequestBoldSubject,
        flag,
        isBolded,
        setIsBolded
    }: IBoldBtnHandler) => {

    let html = text
    if (!isBolded) {
        const start = window.getSelection()?.anchorOffset || 0
        const end = window.getSelection()?.focusOffset || 0

        if (start < end) {
            !flag && setRequestBoldSubject(text.slice(start, end))
            html = html.slice(0, start) + '<b>' + html.slice(start, end) + '</b>' + html.slice(end)
        } else if (end < start) {
            !flag && setRequestBoldSubject(text.slice(end, start))
            html = html.slice(0, end) + '<b>' + html.slice(end, start) + '</b>' + html.slice(start)
        } else {
            !flag && setRequestBoldSubject(text)

            html = `<b>${html}</b>`
        }
        (inputRef.current as HTMLDivElement).innerHTML = html
        
        setText(html)
        setIsBolded(true)
    } else {
        const textWithoutTags = html.replaceAll(/(<([^>]+)>)/ig, "");
        (inputRef.current as HTMLDivElement).innerHTML = textWithoutTags
        setRequestBoldSubject('')
        setText(textWithoutTags)
        setIsBolded(false)
    }
}