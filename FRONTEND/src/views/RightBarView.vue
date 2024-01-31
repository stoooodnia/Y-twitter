<template>
    <div class="sticky top-0 h-screen flex flex-col items-center">
        <SearchBar/>
    </div>

</template>

<script>
import SearchBar from '@/components/SearchBar.vue';
export default {
    components: {
        SearchBar,
    },
    mathods: {
      showNavbar() {
        return this.$route.name !== "login" && this.$route.name !== "register" && this.$route.name !== "home";
      }
    },
}
</script>
