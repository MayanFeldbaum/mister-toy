import axios from 'axios'
import { storageService } from './async-storage.service.js'
import { httpService } from './http.service.js'

const STORAGE_KEY = 'userDB'
const STORAGE_KEY_LOGGEDIN = 'loggedinUser'
const BASE_URL = 'auth/'

export const userService = {
    login,
    logout,
    signup,
    getById,
    getLoggedinUser,
    getUsers,
    remove,
    update
    

    // updateScore
}

window.us = userService

function getUsers() {
    // return storageService.query('user')
    return httpService.get(`user`)
}

async function getById(userId) {
    // const user = await storageService.get('user', userId)
    const user = await httpService.get(`user/${userId}`)

    // socketService.emit(SOCKET_EMIT_USER_WATCH, userId)
    // socketService.off(SOCKET_EVENT_USER_UPDATED, onUserUpdate)
    // socketService.on(SOCKET_EVENT_USER_UPDATED, onUserUpdate)

    return user
}

function remove(userId) {
    // return storageService.remove('user', userId)
    return httpService.delete(`user/${userId}`)
}

async function update({_id, score}) {
    // const user = await storageService.get('user', _id)
    // user.score = score
    // await storageService.put('user', user)

    const user = await httpService.put(`user/${_id}`, {_id, score})
    // Handle case in which admin updates other user's details
    if (getLoggedinUser()._id === user._id)  _setLoggedinUser(user)
    return user
}


function login(credentials) {
    return httpService.post('auth/' + 'login', credentials)
        .then(_setLoggedinUser)
        .catch(err => {
            console.log('err:', err)
            throw new Error('Invalid login')
        })
}


function signup({ username, password, fullname }) {
    const user = { username, password, fullname}
    return httpService.post('auth/' + 'signup', user)
        .then(_setLoggedinUser)
}

function logout() {
    return httpService.post('auth/' + 'logout')
        .then(()=>{
            sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN)
        })
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN))
}

function _setLoggedinUser(user) {
    const userToSave = { _id: user._id, fullname: user.fullname, score: user.score }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(userToSave))
    return userToSave
}

// Test Data
// userService.signup({username: 'muki', password: 'muki1', fullname: 'Muki Ja'})
// userService.login({username: 'muki', password: 'muki1'})



