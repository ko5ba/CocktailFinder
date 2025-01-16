<script setup>
import {
  Back
} from '@element-plus/icons-vue'
import { useRoute, useRouter } from 'vue-router';
import { computed } from 'vue';
import { ROUTES_PATH } from '@/constants';

defineProps({
  imgUrl: {
    type: String,
    required: true
  },
  goBack: {
    type: Function,
    required: true
  },
  isBackButtonVisible: {
    type: Boolean,
    default: true
  }
})

const route = useRoute()
const router = useRouter()

const routeName = computed(() => route.name)

function goForRandomCocktail() {
  router.push(ROUTES_PATH.RANDOM)

  if (routeName === ROUTES_PATH.RANDOM) {
    router.go()
  }
}
</script>

<template>
  <div class="bg-background flex min-h-screen">
    <div :style="`background-image: url(${imgUrl})`" class="w-6/12 bg-no-repeat bg-center bg-cover"></div>
    <div class="w-6/12 relative p-8">
      <div class="flex justify-between items-center">
        <el-button v-if="isBackButtonVisible" @click="goBack" :icon="Back" type="danger" circle />
        <el-button @click="goForRandomCocktail"
          class="absolute top-8 right-10 bg-accent text-[1rem] border-accent text-white hover:bg-emerald-950"
          type="danger">Get random
          cocktail</el-button>
      </div>
      <slot></slot>
    </div>
  </div>
</template>