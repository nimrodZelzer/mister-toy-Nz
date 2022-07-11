import { toyService } from "../../js/services/toy-service.js"


export default {
    state() {
        return {
            toys: [],
            lastRemovedToy: null,
        }
    },
    getters: {
        toys({ toys }) {
            return toys
        },
    },
    mutations: {
        setToys(state, { toys }) {
            state.toys = toys
        },
        removeToy(state, { toyId }) {
            const idx = state.toys.findIndex(t => t._id === toyId)
            state.lastRemovedToy = state.toys[idx]
            console.log("here")
            state.toys.splice(idx, 1)
        },
        addToy(state, { toy }) {
            state.toys.push(toy)
        },
        updateToy(state, { toy }) {
            const idx = state.toys.findIndex(t => t._id === toy._id)
            state.toys.splice(idx, 1, toy)
        },
        clearRemoveToy(state) {
            state.lastRemovedToy = null
        },
        undoRemoveToy(state) {
            state.toys.unshift(state.lastRemovedToy)
            state.lastRemovedToy = null
        },
    },
    actions: {
        loadToys({ commit }) {
            toyService.query()
                .then((toys) => {
                    commit({ type: 'setToys', toys })
                })
        },
        removeToy({ commit }, payload) {
            return toyService.remove(payload.toyId)
                .then(() => {
                    commit({ type: 'removeToy' })
                })
                .catch((err) => {
                    commit({ type: 'undoRemoveToy' })
                    throw err
                })
        },
        saveToy({ commit }, { toy }) {
            const actionType = (toy._id) ? 'updateToy' : 'addToy'
            return toyService.save(toy)
                .then((savedToy) => {
                    commit({ type: actionType, toy: savedToy })
                    return savedToy
                })
        },
    },
}