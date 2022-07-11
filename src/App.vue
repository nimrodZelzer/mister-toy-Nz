<template>
  <h1>hello im mister toy</h1>
  <router-view />
</template>

<script>
export default {
  data() {
    return {};
  },
  created() {   this.$store.dispatch({ type: 'loadToys' })},
  methods: {},
  computed: {},
  unmounted() { },
};


</script>