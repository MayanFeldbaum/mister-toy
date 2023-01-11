// import { httpService } from './http.service'
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
// import { userService } from './user.service.js'

const STORAGE_KEY = 'toyDB'

_createToys()

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
    // return axios.get(BASE_URL).then(res => res.data)
    return storageService.query(STORAGE_KEY)
        .then(toys => {
            if (filterBy.name) {
                const regex = new RegExp(filterBy.name, 'i')
                toys = toys.filter(toy => regex.test(toy.name))
            }
            if (filterBy.price) {
                toys = toys.filter(toy => toy.price <= filterBy.price)
            }
            if (filterBy.inStock !== undefined) {
                if (filterBy.inStock) toys = toys.filter(toy => toy.inStock)
            }
            if (sortBy.createdAt !== null) {
                toys.sort((t1, t2) => (t1.createdAt - t2.createdAt) * (-1))
            }
            if (sortBy.name !== null) {
                toys.sort((t1, t2) => t1.name.localeCompare(t2.name) * (-1))
            }
            if (sortBy.price !== null) {
                toys.sort((t1, t2) => (t1.price - t2.price) * (-1))
            }

            return toys
        })
}

function getById(toyId) {
    return storageService.get(STORAGE_KEY, toyId)
}

function remove(toyId) {
    // return Promise.reject('Not now!')
    return storageService.remove(STORAGE_KEY, toyId)
}

function save(toy) {
    if (toy._id) {
        return storageService.put(STORAGE_KEY, toy)
    } else {
        // when switching to backend - remove the next line
        // toy.owner = userService.getLoggedinUser()
        return storageService.post(STORAGE_KEY, toy)
    }
}

function getEmptyToy(name = '', price = '', labels = [], createdAt = Date.now(), inStock = true) {
    return { name, price, labels, createdAt, inStock }
}

function getDefaultFilter(name = '', price = '', inStock = '') {
    return { name, price, inStock }
}

function getDefaultSort() {
    return { price: null, name: null, createdAt: null }
}

function _createToys() {
    let toys = storageService.loadFromStorage(STORAGE_KEY)
    if (!toys || !toys.length) {
        toys = []
        toys.unshift(_createToy('Teddy', 30, ["Art", "Box game", "On wheels"], Date.now(), true))
        toys.unshift(_createToy('lego', 40, ["Art", "Box game", "On wheels"], Date.now(), true))
        toys.unshift(_createToy('doll', 50, ["Art", "Box game", "Baby"], Date.now(), false))
        storageService.saveToStorage(STORAGE_KEY, toys)
    }
}

function _createToy(name, price, labels, createdAt, inStock) {
    const toy = getEmptyToy(name, price, labels, createdAt, inStock)
    toy._id = utilService.makeId()
    return toy
}


// TEST DATA
// storageService.post(STORAGE_KEY, {vendor: 'Subali Rahok 6', price: 980}).then(x => console.log(x))


