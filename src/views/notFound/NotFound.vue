<template>
    <div>
        <img :src="notFound">
    </div>
</template>
<script>
export default {
    name: "notFound",
    props: {
        notFound: {
            type: String,
            default: "/img/404.jpeg"
        }
    }
}
</script>
<style scoped>
    img {
        width: 100%;
        height: 100%;
    }
</style>