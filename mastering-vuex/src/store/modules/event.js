import EventService from '@/services/EventService'

export const namespaced = true

export const state = {
  events: [],
  totalEvents: 0,
  event: {},
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
  fetchEvents({ commit, dispatch }, { perPage, page }) {
    EventService.getEvents(perPage, page)
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
  fetchEvent({ commit, dispatch, getters }, eventID) {
    var event = getters.getEventById(eventID)

    if (event) {
      commit('SET_EVENT', event)
    } else {
      EventService.getEvent(eventID)
        .then((response) => {
          commit('SET_EVENT', response.data)
        })
        .catch((error) => {
          const notification = {
            type: 'error',
            message: 'There was a problem fetching the event: ' + error.message,
          }
          dispatch('notification/add', notification, { root: true })
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
