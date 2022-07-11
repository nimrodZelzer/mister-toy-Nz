
<template>
  <h2>this is the toy store</h2>
  <button @click="goToEdit">Add a new Toy</button>
  <toy-filter @setFilter="setFilter" />
  <toy-list @removeToy="removeToy" v-if="toys" :toys="toysToShow" />

</template>

<script>
import { toyService } from '../js/services/toy-service.js'
import toyFilter from '../components/toy-filter.cmp.vue'
import toyList from '../components/toy-list.cmp.vue'
export default {
  name: 'toy-app',
  data() {
    return {
      filterBy: null,
    }
  },
  computed: {
    toys() {
      return this.$store.getters.toys
    },
    toysToShow() {
       if (!this.filterBy) return this.toys
      const regex = new RegExp(this.filterBy.name, 'i')
      return this.toys.filter((toy) => regex.test(toy.name))
    },
  },
  created() { },
  methods: {
    loadToys() {
      toyService.query().then((toys) => (this.toys = toys))
    },
    setFilter(filterBy) {
      this.filterBy = filterBy
    },
    goToEdit() {
      this.$router.push(`/toy/edit`)
    },
    removeToy(toyId) {
      this.$store.dispatch({ type: 'removeToy', toyId })
    },
  },
  components: {
    toyList,
    toyFilter,
  },
}
</script>