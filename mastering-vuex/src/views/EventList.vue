<template>
  <div>
    <h1>Events for {{ user.user.name }}</h1>
    <EventCard v-for="event in event.events" :key="event.id" :event="event" />
    <router-link
      :to="{ name: 'event-list', query: { page: page - 1 } }"
      rel="prev"
      v-show="page != 1"
      >Previous page
    </router-link>
    <router-link
      :to="{ name: 'event-list', query: { page: page + 1 } }"
      rel="next"
      v-show="page != last_page"
      >Next page
    </router-link>
  </div>
</template>

<script>
import EventCard from '../components/EventCard.vue'
import { mapState } from 'vuex'

export default {
  components: {
    EventCard,
  },
  created() {
    this.$store.dispatch('event/fetchEvents', {
      perPage: 2,
      page: this.page,
    })
  },
  computed: {
    page() {
      return parseInt(this.$route.query.page) || 1
    },
    last_page() {
      return Math.ceil(this.event.totalEvents / 2)
    },
    ...mapState(['event', 'user']),
  },
}
</script>

<style></style>
