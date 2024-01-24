<template>
  <aside
    class="flex flex-col gap-4 py-4 border-l border-gray-700 px-4 sticky top-0 h-screen"
  >
    <input
      class="flex h-10 w-full border border-input text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border-none rounded-full bg-gray-800 text-white px-4 py-2"
      placeholder="Search &#120144;"
      type="search"
    />
    <div class="rounded-lg bg-gray-800 p-4">
      <h3 class="font-semibold mb-2">Trending</h3>
      <ul class="space-y-2">
        <li>
          <a class="font-medium" href="#">#LoremIpsum</a>
          <p class="text-xs text-gray-400">120K Tweets</p>
        </li>
        <li>
          <a class="font-medium" href="#">#DolorSitAmet</a>
          <p class="text-xs text-gray-400">75K Tweets</p>
        </li>
        <li>
          <a class="font-medium" href="#">#ConsecteturAdipiscing</a>
          <p class="text-xs text-gray-400">50K Tweets</p>
        </li>
      </ul>
    </div>
    <div class="rounded-lg bg-gray-800 p-4 w-64">
      <h3 class="font-semibold mb-2">Who to follow</h3>
      <ul class="space-y-2" v-if="userStore.user">
        <li class="flex items-center gap-4" v-for="user in unfollowedUsers">
          <span
            class="relative flex shrink-0 overflow-hidden rounded-full w-8 h-8"
            ><img
              class="aspect-square h-full w-full"
              alt="User avatar"
              :src="user.imageUrl"
          /></span>
          <div class="flex-1">
            <button
              class="font-medium hover:underline"
              href="#"
              type="button"
              data-popover-target="user.handle"
              data-popover-placement="bottom"
            >
              {{ user.username }}
            </button>
            <p class="text-xs text-gray-400">@{{ user.handle }}</p>
          </div>
          <button
            class="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium border text-white border-white bg-transparent hover:bg-white hover:text-gray-900 h-9 rounded-md px-3"
            @click="follow(user.handle)"
            v-if="!user.followed"
          >
            Follow
          </button>
          <button
            class="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium border text-gray-900 border-white bg-white hover:bg-red-600 hover:text-white h-9 rounded-md px-3"
            v-else
            @mouseover="user.hover = true"
            @mouseleave="user.hover = false"
            @click="unfollow(user.handle)"
          >
            {{ user.hover ? "Unfollow" : "Following" }}
          </button>
          <div
            data-popover
            id="user.handle"
            role="tooltip"
            class="absolute z-10 invisible inline-block w-64 text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 dark:text-gray-400 dark:bg-gray-800 dark:border-gray-600"
          >
            <div class="p-3">
              <div class="flex items-center justify-between mb-2">
                <a href="#">
                  <img
                    class="w-10 h-10 rounded-full"
                    :src="user.imageUrl"
                    alt="User avatar"
                  />
                </a>
                <div>
                  <button
                    type="button"
                    class="text-white bg-gray-900 hover:bg-white hover:text-gray-900 font-medium rounded-lg text-xs px-3 py-1.5"
                  >
                    Follow
                  </button>
                </div>
              </div>
              <p
                class="text-base font-semibold leading-none text-gray-900 dark:text-white"
              >
                <a href="#">{{ user.username }}</a>
              </p>
              <p class="mb-3 text-sm font-normal">
                <a href="#" class="hover:underline">@{{ user.handle }}</a>
              </p>
            </div>
            <div data-popper-arrow></div>
          </div>
        </li>
      </ul>
      <p v-else class="break-words text-sm text-gray-400 font-semibold">
        Log in to see recommendations
      </p>
    </div>
  </aside>
  <!-- Modal -->
  <div
    id="follow-error-modal"
    tabindex="-1"
    class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
  >
    <div class="relative p-4 w-full max-w-md max-h-full">
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <button
          type="button"
          class="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
          @click="modal.hide()"
        >
          <svg
            class="w-3 h-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
          <span class="sr-only">Close modal</span>
        </button>
        <div class="p-4 md:p-5 text-center">
          <svg
            class="mx-auto mb-4 text-red-600 w-12 h-12"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
          <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
            {{ modalText }}
          </h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useUserStore } from "../stores/UserStore";
import { initPopovers } from "flowbite";
import { Modal } from "flowbite";
import { axiosMod as axios } from "../utils/rest";
export default {
  name: "SidebarRight",
  setup() {
    const userStore = useUserStore();
    return { userStore };
  },
  mounted() {
    axios
      .get("/api/unfollowed")
      .then((response) => {
        this.unfollowedUsers = response.data.map((user) => {
          return {
            ...user,
            followed: false,
            hover: false,
          };
        });
      })
      .catch((error) => {
        console.log(error);
      });
    initPopovers();
    const target = document.getElementById("follow-error-modal");
    const options = {
      placement: "center-center",
      backdrop: "dynamic",
      closable: true,
    };
    this.modal = new Modal(target, options);
  },
  data() {
    return {
      unfollowedUsers: [],
      modal: null,
      modalText: "",
    };
  },
  methods: {
    follow(handle) {
      axios
        .get("/api/follow/" + handle)
        .then(() => {
          this.unfollowedUsers = this.unfollowedUsers.map((user) => {
            if (user.handle === handle) {
              return {
                ...user,
                followed: true,
              };
            }
            return user;
          });
        })
        .catch((error) => {
          console.log(error);
          this.modalText = "Failed to follow user.";
          this.modal.show();
        });
    },
    unfollow(handle) {
      axios
        .get("/api/unfollow/" + handle)
        .then(() => {
          this.unfollowedUsers = this.unfollowedUsers.map((user) => {
            if (user.handle === handle) {
              return {
                ...user,
                followed: false,
              };
            }
            return user;
          });
        })
        .catch((error) => {
          console.log(error);
          this.modalText = "Failed to unfollow user.";
          this.modal.show();
        });
    },
  },
};
</script>
