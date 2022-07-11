
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

const KEY = 'toysDB';


export const toyService = {
    query,
    getById,
    remove,
    save,
    getEmptyToy
}

_createToys()

// TODO: support paging and filtering and sorting
function query() {
    return storageService.query(KEY)
}

function getById(id) {
    return storageService.get(KEY, id)
}

function remove(id) {
    return storageService.remove(KEY, id)
}

function save(toy) {
    const savedToy = (toy._id) ? storageService.put(KEY, toy) : storageService.post(KEY, toy)
    return savedToy
}

function getEmptyToy(name = '', price = 100, labels = ['doll', 'Battery', 'cool']) {
    return {
        _id: '',
        name,
        price,
        labels,
        createdAt: Date.now(),
        inStock: true
    }
}

// Create Test Data:
function _createToys() {
    var toys = JSON.parse(localStorage.getItem(KEY))
    if (!toys || !toys.length) {
        toys = [
            _createToy('woody', 10),
            _createToy('buzzz', 40),
            _createToy('puki', 100, ['not real']),
        ]
        localStorage.setItem(KEY, JSON.stringify(toys))
    }
    return toys;
}

function _createToy(name, price, labels) {
    const toy = getEmptyToy(name, price, labels)
    toy._id = utilService.makeId()
    return toy
}

