import EventService from '@/services/EventService'

export const namespaced = true

export const state = {
  events: [],
  totalEvents: 0,
  event: {},
  perPage: 2,
}

export const mutations = {
  ADD_EVENT(state, event) {
    state.events.push(event)
  },
  SET_EVENTS(state, { events, totalEvents }) {
    state.events = events
    state.totalEvents = parseInt(totalEvents)
  },
  SET_EVENT(state, event) {
    state.event = event
  },
}

export const actions = {
  createEvent({ commit, dispatch }, event) {
    return EventService.postEvent(event)
      .then(() => {
        commit('ADD_EVENT', event)
        const notification = {
          type: 'success',
          message: 'Your event has been created!',
        }
        dispatch('notification/add', notification, { root: true })
      })
      .catch((error) => {
        const notification = {
          type: 'error',
          message: 'There was a problem creating the event: ' + error.message,
        }
        dispatch('notification/add', notification, { root: true })
        throw error
      })
  },
  fetchEvents({ commit, dispatch, state }, { page }) {
    return EventService.getEvents(state.perPage, page)
      .then((response) =>
        commit('SET_EVENTS', {
          events: response.data,
          totalEvents: response.headers['x-total-count'],
        })
      )
      .catch((error) => {
        const notification = {
          type: 'error',
          message: 'There was a problem fetching events: ' + error.message,
        }
        dispatch('notification/add', notification, { root: true })
      })
  },
  fetchEvent({ commit, getters, state }, id) {
    if (id == state.event.id) {
      return state.event
    }

    var event = getters.getEventById(id)

    if (event) {
      commit('SET_EVENT', event)
      return event
    } else {
      return EventService.getEvent(id).then((response) => {
        commit('SET_EVENT', response.data)
        return response.data
      })
    }
  },
}
export const getters = {
  categoriesLength(state) {
    return state.categories.length
  },
  getEventById: (state) => (id) => {
    return state.events.find((event) => event.id === id)
  },
}
