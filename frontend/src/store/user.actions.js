import { userService } from '../services/user.service'
import defaultUser from "../assets/imgs/defaultuser.jpg";
import { stationService } from './../services/station.service';

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

export function onLogin(credentials) {
    return async (dispatch) => {
        try {
            const user = await userService.login(credentials)
            console.log('Logged in user', user)
            dispatch({
                type: 'SET_USER',
                user
            })
            return user
        } catch (err) {
            return null
        }
    }
}

export function onSignup(credentials) {
    return async (dispatch) => {
        try {
            const user = await userService.signup(credentials)
            console.log('Signed up user', user)
            dispatch({
                type: 'SET_USER',
                user
            })
            return user
        } catch (err) {
            return null
        }
    }
}

export function onLogout() {
    return async (dispatch) => {
        try {
            await userService.logout()
            dispatch({
                type: 'SET_USER',
                user: { fullname: "Guest", imgUrl: defaultUser }
            })
            console.log('logged out!')
        } catch (err) {
            throw err
        }
    }
}

export function onLikeTrack(track, user) {
    return async (dispatch) => {
        try {
            const updatedUser = await stationService.addTrackToLiked(track, user)
            dispatch({
                type: 'SET_USER',
                user: updatedUser
            })
        } catch (err) {
            throw err
        }
    }
}

export function onUnlikeTrack(trackId, user) {
    return async (dispatch) => {
        try {
            console.log('from unlike');
            const updatedUser = await stationService.removeTrackFromLiked(trackId, user)
            console.log('updated user from unlike', updatedUser);
            dispatch({
                type: 'SET_USER',
                user: updatedUser
            })
        } catch (err) {
            throw err
        }
    }
}