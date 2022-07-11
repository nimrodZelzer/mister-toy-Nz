<template >
    `<article className="toy-preview" v-if="toy">
        <p>Toy name: {{ toy.name }}</p>
        <div>Price: {{ toy.price }}</div>
        <div>InStock: {{ toy.inStock }}</div>
        <button @click="onRemove(toy._id)">Remove</button>
        <button>Edit</button>
    </article>`,
</template>
<script>

export default {
    props: {
        toy: Object,
    },
    methods: {
        onRemove() {
            this.$emit('removeToy', this.toy._id)
        },
    },
    computed: {
    },
}
</script>
<style >
button {
    background-color: aqua;
    cursor: pointer;
}
</style>