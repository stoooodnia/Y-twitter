<template>
    <div class="sticky top-0 h-screen">
        <SearchBar/>
    </div>

</template>

<script>
import SearchBar from '@/components/SearchBar.vue';
import { useNotificationStore } from '@/stores/notificationStore';
export default {
    components: {
        SearchBar,
    },
    computed: {
      newPostsAvailable() {
        return useNotificationStore().newPostsAvailable;
      }
    }
}
</script>
