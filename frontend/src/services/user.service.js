import { httpService } from './http.service.js'
import { stationService } from './station.service.js';
import { asyncStorageService } from './async-storage.service.js';

const STORAGE_KEY = 'loggedinUser'

export const userService = {
    login,
    logout,
    signup,
    getLoggedinUser,
    updateUser
}

async function login(credentials) {
    try {
        const user = await httpService.post('auth/login', credentials)
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(user))
        asyncStorageService.resetStorage('newStation')
        stationService.getTemplateStation('newStation', 'new')
        return user
    } catch (err) {
        throw err
    }
}
async function logout() {
    try {
        await httpService.post('auth/logout')
        sessionStorage.removeItem(STORAGE_KEY)
        asyncStorageService.resetStorage('newStation')
        stationService.getTemplateStation('newStation', 'new')
    } catch (err) {
        throw err
    }
}

async function signup(credentials) {
    try {
        if (!credentials.imgUrl) credentials.imgUrl = 'https://pbs.twimg.com/profile_images/746460305396371456/4QYRblQD.jpg'
        const user = await httpService.post('auth/signup', credentials);
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(user))
        asyncStorageService.resetStorage('newStation')
        stationService.getTemplateStation('newStation', 'new')
        return user
    } catch (err) {
        throw err
    }
}

async function updateUser(user) {
    try {
        const updatedUser = await httpService.put(`user`, user)
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(updatedUser))
        return updatedUser
    } catch (err) {
        throw err
    }
}

function getLoggedinUser() {
    const user = JSON.parse(sessionStorage.getItem(STORAGE_KEY));
    if (user) return user
    else return { fullname: "Guest", imgUrl: 'https://pbs.twimg.com/profile_images/746460305396371456/4QYRblQD.jpg' }
}