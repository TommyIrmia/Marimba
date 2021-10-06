import { httpService } from './http.service.js'
import defaultUser from "../assets/imgs/defaultuser.jpg";

const STORAGE_KEY = 'loggedinUser'

export const userService = {
    login,
    logout,
    signup,
    getLoggedinUser,
}

async function login(credentials) {
    try {
        const user = await httpService.post('auth/login', credentials)
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(user))
        return user
    } catch (err) {
        throw err
    }
}
async function logout() {
    try {
        await httpService.post('auth/logout')
        sessionStorage.removeItem(STORAGE_KEY)
    } catch (err) {
        throw err
    }
}

async function signup(credentials) {
    try {
        const user = await httpService.post('auth/signup', credentials);
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(user))
        return user
    } catch (err) {
        throw err
    }
}

function getLoggedinUser() {
    const user = JSON.parse(sessionStorage.getItem(STORAGE_KEY));
    if (user) return user
    else return { _id: 'guest', fullname: "Guest", imgUrl: defaultUser }

}