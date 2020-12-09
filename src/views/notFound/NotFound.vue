<template>
    <div>
        <h1 style="text-align:centre">404</h1>
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
    },
    created() {
        console.log("hey there")
    }
}
</script>
<style scoped>
    img {
        width: 100%;
        height: 100%;
    }
</style>