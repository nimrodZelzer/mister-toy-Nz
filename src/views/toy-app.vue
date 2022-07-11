
<template>
    <h2>this is the toy store</h2>
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
       return this.toys
    //   const regex = new RegExp(this.filterBy.vendor, 'i')
    //   return this.cars.filter((car) => regex.test(car.vendor))
    },
  },
  created() {},
  methods: {
    loadToys() {
      toyService.query().then((toys) => (this.toys = toys))
    },
    setFilter(filterBy) {
      this.filterBy = filterBy
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