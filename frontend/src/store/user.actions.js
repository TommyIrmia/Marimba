import { userService } from '../services/user.service'
import defaultUser from "../assets/imgs/defaultuser.jpg";
import { stationService } from './../services/station.service';

let timeoutId;

export const onSetMsg = (type, txt) => {
    return dispatch => {
        const msg = { type, txt }
        console.log('msg', msg);
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
                user: { _id: 'guest', fullname: "Guest", imgUrl: defaultUser }
            })
            console.log('logged out!')
        } catch (err) {
            throw err
        }
    }
}

export function onUpdateUser(track,user) {
    return async (dispatch) => {
        try {
            await stationService.addTrackToLiked(track, user)
            // const user = await userService.getLoggedinUser()
            // console.log('current user : ', user)
            dispatch({
                type: 'SET_USER',
                user
            })
        } catch (err) {
            throw err
        }
    }
}