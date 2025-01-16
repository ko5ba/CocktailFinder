<script setup>
defineProps({
  id: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div class="root">
    <RouterLink :to="`/cocktails/${id}`">
      <div class="w-[120px] h-[120px] bg-no-repeat bg-center bg-cover mx-auto"
        :style="`background-image: url(${imageUrl})`">
      </div>
      <div class="w-[100%] whitespace-nowrap overflow-hidden text-ellipsis pt-4 tracking-widest">{{ title }}</div>
    </RouterLink>
  </div>
</template>

<style scoped>
.root {
  width: calc((100% - 76px)/3);
  margin-right: 38px;
  margin-bottom: 20px;
}

.root:nth-child(3n + 3) {
  padding-right: 0;
}
</style>>