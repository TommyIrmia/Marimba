import { userService } from '../services/user.service.js'

const initialState = {
    msg: null,
    user: userService.getLoggedinUser()
}

export function userReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_MSG':
            return { ...state, msg: action.msg }
        case 'SET_USER':
            return { ...state, user: action.user }
        default:
            return { ...state }
    }
}

