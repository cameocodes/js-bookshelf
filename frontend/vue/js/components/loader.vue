
<template>
    <div v-if="books.length > 0">
        <slot></slot>
    </div>
    <div v-else="books.length < 0">
        <h4>Loading...</h4>
    </div>
</template>

<script>
module.exports={
    name: 'loader',
    props: ['books']
}
</script>