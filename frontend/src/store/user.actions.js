

let timeoutId;

export const onSetMsg = (type, txt) => {
    return dispatch => {
        const msg = { type, txt }
        dispatch({ type: 'SET_MSG', msg })
        if (timeoutId) clearTimeout(timeoutId)
        timeoutId = setTimeout(() => {
            dispatch({ type: 'SET_MSG', msg: null })
        }, 2500)
    }
}