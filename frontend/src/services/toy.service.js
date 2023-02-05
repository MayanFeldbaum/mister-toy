import { httpService } from './http.service'
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
// import { userService } from './user.service.js'

const STORAGE_KEY = 'toyDB'

// _createToys()

export const toyService = {
    query,
    getById,
    save,
    remove,
    getEmptyToy,
    getDefaultFilter,
    getDefaultSort
}

function query(filterBy, sortBy) {
    return httpService.get('toy', { params: { filterBy,sortBy} })
}

function getById(toyId) {
    return httpService.get(`toy/${toyId}`)
}

function remove(toyId) {
    // return Promise.reject('Not now!')
    return httpService.delete(`toy/${toyId}`)
}

function save(toy) {
    if (toy._id) {
        return httpService.put(`toy/${toy._id}`, toy)
    } else {
        return httpService.post('toy', toy)
    }
}

function getEmptyToy(name = '', price = 0, labels = ["art"], createdAt = Date.now(), inStock = true,img="default") {
    return { name, price, labels, createdAt, inStock,img }
}

function getDefaultFilter(name = '', price = '', inStock = '') {
    return { name, price, inStock }
}

function getDefaultSort() {
    return {
        by: 'name',
        asc: true
    }
}
