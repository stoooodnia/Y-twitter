<template>
  <div class="min-h-screen max-w-screen flex bg-black justify-center">
    <!-- <div class="flex flex-col w-80"></div> -->
    <NavBarView v-if="display" class="w-1/3"/>
    <RouterView />
    <RightBarView v-if="display"/>
  </div>
</template>

<script>
import NavBarView from '@/views/NavBarView.vue';
import RightBarView from '@/views/RightBarView.vue';
export default {
  components: {
    NavBarView,
    RightBarView,
  },
  data() {
    return {
      display: true,
    }
  },
  watch: {
        $route: {
            handler: "show",
            immediate: true,
        }
    },
    methods: {
      show() {
        this.display = this.$route.name !== "login" && this.$route.name !== "register" && this.$route.name !== "home";
      }
    },
}
</script>
