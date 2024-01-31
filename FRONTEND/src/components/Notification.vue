<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="mb-4 grid grid-cols-[50px_1fr] items-start pb-4 ">

        <span class="relative flex shrink-0 overflow-hidden rounded-full w-14 h-14 border-2 border-white">
          <img :src="notification.user.profilePicture" alt="Profile Picture" >
        </span>
        <div class="grid gap-1">
            <div class="flex justify-between">
                <p class="text-sm font-medium">{{ notification.user.username }} followed you</p>
                <button @click="markAsRead" class="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium border text-white border-white  hover:bg-white hover:text-gray-900 h-9 rounded-md px-3">
                mark as read
                </button>
            </div>
            <p class="text-sm text-gray-500 dark:text-gray-400">{{ time }}</p>
        </div>

    </div>
</template>

<script>
import { useNotificationStore } from "@/stores/notificationStore";
export default {
    props: {
        notification: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            time: "",
        };
    },
    watch: {
        "time":{
            handler: "calculateTime",
            immediate: true,
        },
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
            if (years == 1) {
                this.time = `${years} year`;
            } else if (years > 1) {
                this.time = `${years} years`;
            } else if (months == 1) {
                this.time = `${months} month`;
            } else if (months > 1) {
                this.time = `${months} months`;
            } else if (days == 1) {
                this.time = `${days} day`;
            } else if (days > 1) {
                this.time = `${days} days`;
            }
            else if (hours == 1) {
                this.time = `${hours} hour`;
            } else if (hours > 1) {
                this.time = `${hours} hours`;
            } else if (minutes == 1) {
                this.time = `${minutes} minute`;
            } else if (minutes > 1) {
                this.time = `${minutes} minutes`;
            } else {
                this.time = `${seconds}s`;
            }
            this.time += " ago";
        },
        markAsRead(){
            console.log(this.notification.index)
            useNotificationStore().clearNotificationByIndex(this.notification.index)
        }
    },
}
</script>