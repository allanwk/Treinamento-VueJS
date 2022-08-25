<template>
  <div>
    <h1>Oops!</h1>
    <h3>Looks like you are having some network issues</h3>
    <router-link :to="{ name: 'event-list' }">Back to events list</router-link>
  </div>
</template>
