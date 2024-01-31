<template>
    <div class="sticky top-0 h-screen flex flex-col items-center">
        <SearchBar/>
        <NotificationBubble class=""/>
    </div>

</template>

<script>
import SearchBar from '@/components/SearchBar.vue';
import NotificationBubble from '@/components/NotificationBubble.vue';
export default {
    components: {
        SearchBar,
        NotificationBubble
    },
    mathods: {
      showNavbar() {
        return this.$route.name !== "login" && this.$route.name !== "register" && this.$route.name !== "home";
      }
    },
}
</script>
