

export function setBgcAndName(bgc, stationName) {
    return async (dispatch) => {
        try {
            console.log('set bgc color and name to', bgc, stationName)
            dispatch({
                type: 'SET_BGC',
                bgc
            })
            dispatch({
                type: 'SET_NAME',
                stationName
            })
        } catch (err) {
            console.log('Can not load stations', err)
        }
    }
}