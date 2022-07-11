import { toyService } from "./services/toy-service.js"


export const store = new Vuex.Store({
    strict: true,
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
        removeToys({ commit }, payload) {
            return toyService.remove(payload.toyId)
                .then(() => {
                    commit({ type: 'clearRemoveToy' })
                })
                .catch((err) => {
                    commit({ type: 'undoRemoveToy' })
                    throw err
                })
        },
        saveProduct({ commit }, { toy }) {
            const actionType = (toy._id) ? 'updateToy' : 'addToy'
            return toyService.save(toy)
                .then((savedToy) => {
                    commit({ type: actionType, toy: savedToy })
                    return savedToy
                })
        },
    },
})