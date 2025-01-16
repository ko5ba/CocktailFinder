<script setup>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue';
// Import Swiper styles
import 'swiper/css';
import { useRouter } from 'vue-router';
import AppLayout from '@/components/AppLayout.vue';
import { COCKTAIL_RANDOM_URL, INGREDIENT_SMALL_IMAGE_URL } from '@/constants';
import { computed, ref } from 'vue';
import axios from 'axios';

const router = useRouter();
const infoCocktail = ref(null);
const error = ref(null);

const ingredients = computed(() => {
  const ingredientsList = [];

  for (let i = 1; i <= 15; i++) {
    const ingredientName = infoCocktail.value[`strIngredient${i}`];
    if (!ingredientName) break;

    const ingredientMeasure = infoCocktail.value[`strMeasure${i}`] || '';

    ingredientsList.push({
      name: ingredientName,
      measure: ingredientMeasure
    });
  }

  return ingredientsList;
});

function goBack() {
  router.go(-1);
}

async function getInfoCocktail() {
  try {
    const { data } = await axios.get(COCKTAIL_RANDOM_URL);
    if (data.drinks && data.drinks.length > 0) {
      infoCocktail.value = data.drinks[0];
    } else {
      throw new Error('No cocktail data found');
    }
  } catch (err) {
    console.error('Error fetching cocktail data:', err);
    error.value = err;
  }
}

getInfoCocktail();
</script>

<template>
  <div v-if="infoCocktail">
    <AppLayout :imgUrl="infoCocktail.strDrinkThumb" :goBack="goBack">
      <div class="wrapper">
        <div class="info">
          <div class="title">{{ infoCocktail.strDrink }}</div>
          <div class="line"></div>
          <div class="mt-12 mb-12 px-0 py-0">
            <swiper class="w-[586px]" :slides-per-view="3" :space-between="50">
              <swiper-slide v-for="(ingredient, key) in ingredients" :key="key">
                <img :src="`${INGREDIENT_SMALL_IMAGE_URL}${ingredient.name}-Small.png`" alt="Photo ingredient">
                <div class="pt-5">
                  {{ ingredient.name }}
                </div>
              </swiper-slide>
            </swiper>
          </div>
          <div class="instructions">
            {{ infoCocktail.strInstructions }}
          </div>
        </div>
      </div>
    </AppLayout>
  </div>
</template>