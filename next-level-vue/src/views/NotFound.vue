<template>
  <div>
    <h1>Oops!</h1>
    <h3>The {{ resource }} you requested does not exist</h3>
    <router-link :to="{ name: 'event-list' }">Back to events list</router-link>
  </div>
</template>

<script>
export default {
  props: {
    resource: {
      type: String,
      required: true,
    },
  },
}
</script>
