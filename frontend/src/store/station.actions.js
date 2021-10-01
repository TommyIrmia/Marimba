import { stationService } from "../services/station.service.js"


export function setBgc(bgc) {
    return async (dispatch) => {
        try {
            console.log('set bgc color to', bgc)
            dispatch({
                type: 'SET_BGC',
                bgc
            })
        } catch (err) {
            console.log('Can not load stations', err)
        }
    }
}