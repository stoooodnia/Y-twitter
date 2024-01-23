<template>
  <div class="group flex flex-col gap-4 py-2 border border-gray-800 rounded-lg">
    <div class="flex flex-1 flex-col">
      <div class="flex items-start p-4">
        <div class="flex items-start gap-4 text-sm">
          <span
            class="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full"
          >
            <span
              class="flex h-full w-full items-center justify-center rounded-full bg-muted"
            >Y</span
            >
          </span>
          <div class="grid gap-1">
            <div class="font-semibold">{{ post.authorName }}</div>
            <div class="line-clamp-1 text-xs">@{{ post.authorHandle }}</div>
          </div>
        </div>
        <div class="ml-auto text-xs text-gray-500">{{ post.timestamp }}</div>
      </div>
      <div
        class="flex-1 whitespace-pre-wrap p-4 text-sm prose prose-sm prose-p:leading-normal"
      >
        <p>{{ post.content }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
};
</script>