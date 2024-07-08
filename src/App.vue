<template>
  <div id="app">
    <RecibosList />
  </div>
</template>

<script>
import RecibosList from './components/recibo/RecibosList.vue';

export default {
  name: 'App',
  components: {
    RecibosList
  }
};
</script>

<style>
#app {
  font-family: Arial, sans-serif;
  text-align: center;
  padding: 20px;
}
</style>
