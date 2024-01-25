<template>
  <button
    class="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium border text-white border-white  hover:bg-white hover:text-gray-900 h-9 rounded-md px-3"
    @click="follow(user.userId)"
    v-if="!user.followed"
    >
    Follow
  </button>
  <button
            class="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium border text-gray-900 border-white bg-white hover:bg-red-600 hover:text-white h-9 rounded-md px-3"
            v-else
            @mouseover="user.hover = true"
            @mouseleave="user.hover = false"
            @click="unfollow(user.userId)"
          >
            {{ user.hover ? "Unfollow" : "Following" }}
          </button>
</template>
<script>
import dataService from '@/services/dataService';
import { useAuthStore } from '@/stores/authStore';

export default {
    props: {
        profile: {
            type: Object,
            required: true,
        }
    },
    data() {
        return {
            user: {},
        }
    },
    mounted() {
        this.user = {
            ...this.profile,
            followed: false,
            hover: false,
        } 
    },
    methods: {
        follow(followingId) {
            const followerId = useAuthStore().user.userId;
            const data = {
                followerId,
                followingId,
            }
            dataService.follow(data).then(() => {
                this.user.followed = true;
            })
        },
        unfollow(followingId) {
            const followerId = useAuthStore().user.userId;
            const data = {
                followerId,
                followingId,
            }
            
            dataService.unfollow(data).then(() => {
                this.user.followed = false;
            })
        }
    }
}
</script>