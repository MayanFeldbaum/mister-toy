const dbService = require('../../services/db.service')
// const logger = require('../../services/logger.service')
// const utilService = require('../../services/util.service')
const ObjectId = require('mongodb').ObjectId

async function query(filterBy = { name: '', price: 0}) {
    filterBy.price = +filterBy.price
    if (!filterBy.price) filterBy.price = Infinity
    try {
        const criteria = {
            name: { $regex: filterBy.name, $options: 'i' },
            price: { $lte: +filterBy.price }
        }
        const collection = await dbService.getCollection('toy')
        var toys = await collection.find(criteria).toArray()
        return toys
    } catch (err) {
        // logger.error('cannot find cars', err)
        throw err
    }
}

async function getById(toyId) {
    try {
        const collection = await dbService.getCollection('toy')
        const toy = collection.findOne({ _id: ObjectId(toyId) })
        return toy
    } catch (err) {
        // logger.error(`while finding car ${toyId}`, err)
        throw err
    }
}


async function remove(toyId) {
    try {
        const collection = await dbService.getCollection('toy')
        await collection.deleteOne({ _id: ObjectId(toyId) })
        return toyId
    } catch (err) {
        // logger.error(`cannot remove toy ${toyId}`, err)
        throw err
    }
}

async function add(toy) {
    try {
        const collection = await dbService.getCollection('toy')
        await collection.insertOne(toy)
        return toy
    } catch (err) {
        // logger.error('cannot insert toy', err)
        throw err
    }
}

async function update(toy) {
    try {
        const toyToSave = {
            name: toy.name,
            price: toy.price
        }
        const collection = await dbService.getCollection('toy')
        await collection.updateOne({ _id: ObjectId(toy._id) }, { $set: toyToSave })
        return toy
    } catch (err) {
        // logger.error(`cannot update toy ${toyId}`, err)
        throw err
    }
}

module.exports = {
    query,
    getById,
    remove,
    add,
    update,
}