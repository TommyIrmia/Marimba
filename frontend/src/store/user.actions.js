import { userService } from '../services/user.service'

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
            // showErrorMsg('Can not log in!')
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
            // showSuccessMsg('Signed up successfully!')
            return user
        } catch (err) {
            console.log('Can not signup!', err)
            // showErrorMsg('Can not sign up!')
        }
    }
}

export function onLogout() {
    return async (dispatch) => {
        try {
            await userService.logout()
            dispatch({
                type: 'SET_USER',
                user: null
            })
            console.log('logged out!')
            // showSuccessMsg('logged out!')
        } catch (err) {
            console.log('Could not logout', err)
            // showErrorMsg('Could not logout')
        }
    }
}

export function getCurrentUser() {
    return async (dispatch) => {
        try {
            const user = await userService.getLoggedinUser()
            console.log('current user : ', user)
            dispatch({
                type: 'SET_USER',
                user
            })
        } catch (err) {
            console.log('No user found', err)
            // showErrorMsg('No user found')
        }
    }
}