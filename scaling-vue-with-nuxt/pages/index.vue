<template>
  <div>
    <h1>Events</h1>
    <EventCard
      v-for="(event, index) in events"
      :key="index"
      :event="event"
      :data-index="index"
    />
  </div>
</template>

<script>
import EventCard from '~/components/EventCard.vue'
import { mapState } from 'vuex'

export default {
  components: {
    EventCard,
  },
  async fetch({ store, error }) {
    try {
      await store.dispatch('events/fetchEvents')
    } catch (err) {
      error({
        statusCode: 503,
        message: 'Unable to fetch events.',
      })
    }
  },
  head() {
    return {
      title: 'Event Listing',
    }
  },
  computed: mapState({
    events: (state) => state.events.events,
  }),
}
</script>
