import { userService } from '../services/user.service'
import { stationService } from './../services/station.service';
import { activityService } from './../services/activity-log.service';

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
                user: { fullname: "Guest", imgUrl: 'https://pbs.twimg.com/profile_images/746460305396371456/4QYRblQD.jpg' }
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
            const activityToAdd = await activityService.addActivity('like track', {}, track.title)
            dispatch({
                type: 'ADD_ACTIVITY',
                activity: activityToAdd
            })

            // dispatch({
            //     type: 'ADD_UNREAD',
            //     diff: 1
            // })

        } catch (err) {
            throw err
        }
    }
}

export function onUnlikeTrack(trackId, user) {
    return async (dispatch) => {
        try {
            const updatedUser = await stationService.removeTrackFromLiked(trackId, user)
            dispatch({
                type: 'SET_USER',
                user: updatedUser
            })

        } catch (err) {
            throw err
        }
    }
}

export function onLikeStation(station, user) {
    return async (dispatch) => {
        try {
            console.log('from actions', station, user);
            const updatedUser = await stationService.addLikeTtoStation(station, user)
            dispatch({
                type: 'SET_USER',
                user: updatedUser
            })
            dispatch({
                type: 'UPDATE_LIKES_COUNT',
                diff: 1
            })
        } catch (err) {
            throw err
        }
    }
}

export function onUnlikeStation(station, user) {
    return async (dispatch) => {
        try {
            const updatedUser = await stationService.removeLikeFromStation(station, user)
            dispatch({
                type: 'SET_USER',
                user: updatedUser
            })
            dispatch({
                type: 'UPDATE_LIKES_COUNT',
                diff: -1
            })
        } catch (err) {
            throw err
        }
    }
}