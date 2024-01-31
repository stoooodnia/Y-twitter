<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="mb-4 grid grid-cols-[50px_1fr] items-start pb-4 last:mb-0 last:pb-0">
        <span class="relative flex shrink-0 overflow-hidden rounded-full h-8 w-8">
            <span
            class="relative flex shrink-0 overflow-hidden rounded-full w-14 h-14 border-2 border-white"
          >
          <img :src="notification.user.profilePicture" alt="Profile Picture" >
    
          </span>
        </span>
        <div class="grid gap-1">
            <p class="text-sm font-medium">{{ notification.user.username }} followed you</p>
            <p class="text-sm text-gray-500 dark:text-gray-400">{{ time }} ago</p>
        </div>
    </div>
</template>

<script>

export default {
    props: {
        notification: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            time: this.calculateTime(),
        };
    },
    methods: {
        calculateTime(){
            const date = new Date(this.notification.createdAt);
            const now = new Date();
            const diff = now - date;
            const seconds = Math.floor(diff / 1000);
            const minutes = Math.floor(seconds / 60);
            const hours = Math.floor(minutes / 60);
            const days = Math.floor(hours / 24);
            const months = Math.floor(days / 30);
            const years = Math.floor(months / 12);
            if (years > 0) {
                this.time = `${years}y`;
            } else if (months > 0) {
                this.time = `${months}m`;
            } else if (days > 0) {
                this.time = `${days}d`;
            } else if (hours > 0) {
                this.time = `${hours}h`;
            } else if (minutes > 0) {
                this.time = `${minutes}m`;
            } else {
                this.time = `${seconds}s`;
            }
        },
    },
}
</script>