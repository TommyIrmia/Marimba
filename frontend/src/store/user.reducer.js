
const initialState = {
    msg: ''
}

export function userReducer(state = initialState, action) {

    switch (action.type) {
        case  'SET_MSG': {
            
            return { ...state, msg: action.msg }
        }
        default:
    }

    return state;

}