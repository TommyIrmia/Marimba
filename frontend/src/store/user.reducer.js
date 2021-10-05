
const initialState = {
    msg: null
    // msg: {type: 'error', txt: 'Oops.. Something went wrong, please try again!'}
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