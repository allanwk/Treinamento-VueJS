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
import store from '@/store/index'

function getPageEvents(routeTo, next) {
  const currentPage = parseInt(routeTo.query.page) || 1
  store
    .dispatch('event/fetchEvents', {
      page: currentPage,
    })
    .then(() => {
      routeTo.params.page = currentPage
      next()
    })
}

export default {
  props: {
    page: {
      type: Number,
      required: true,
    },
  },
  components: {
    EventCard,
  },
  beforeRouteEnter(routeTo, routeFrom, next) {
    getPageEvents(routeTo, next)
  },
  beforeRouteUpdate(routeTo, routeFrom, next) {
    getPageEvents(routeTo, next)
  },
  created() {
    this.$store.dispatch('event/fetchEvents', {
      perPage: 2,
      page: this.page,
    })
  },
  computed: {
    last_page() {
      return Math.ceil(this.event.totalEvents / 2)
    },
    ...mapState(['event', 'user']),
  },
}
</script>

<style></style>
