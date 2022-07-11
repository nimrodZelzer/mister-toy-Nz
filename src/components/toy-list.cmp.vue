<template >
    <h2> list of toys</h2>
    <ul>
        <toy-preview @removeToy="removeToy" v-for="toy in toys" :toy="toy" :key="toy"></toy-preview>
    </ul>
</template>
<script>
import toyPreview from './toy-preview.cmp.vue';
export default {
    props: {
        toys: {
            type: Array,
            required: true,
        },
    },
    components: {
        toyPreview,
    },
    data() {
        return {};
    },
    created() {
    },
    methods: {
        removeToy(toyId) {
            this.$emit('removeToy', toyId)
        }
    },
    computed: {},
    unmounted() { },

};    
</script>
<style lang="">
    
</style>