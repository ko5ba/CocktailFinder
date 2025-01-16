<script setup>
import { useRoute, useRouter } from 'vue-router';
import AppLayout from '@/components/AppLayout.vue';
import { INFO_COCKTAIL_BY_ID_URL } from '@/constants';
import { computed, ref, onMounted } from 'vue';
import axios from 'axios';

const route = useRoute();
const router = useRouter()
const cocktailId = route.params.id;
const infoCocktail = ref(null);
const error = ref(null);

const ingredients = computed(() => {
  const ingredientsList = []

  for (let i = 1; i <= 15; i++) {
    if (!infoCocktail.value[`strIngredient${i}`]) {
      break
    }

    const ingredient = {}
    ingredient.name = infoCocktail.value[`strIngredient${i}`]
    ingredient.measure = infoCocktail.value[`strMeasure${i}`]

    ingredientsList.push(ingredient)
  }

  return ingredientsList
});

function goBack() {
  router.go(-1)
}

async function getInfoCocktail() {
  try {
    const { data } = await axios.get(`${INFO_COCKTAIL_BY_ID_URL}${cocktailId}`);
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

onMounted(() => getInfoCocktail());
</script>

<template>
  <div v-if="infoCocktail">
    <AppLayout :imgUrl="infoCocktail.strDrinkThumb" :goBack="goBack">
      <div class="wrapper"> <!-- wrapper -->
        <div class="info"> <!-- info -->
          <div class="title">{{ infoCocktail.strDrink }}</div> <!-- tile -->
          <div class="line"></div> <!-- line -->
          <div class="list">
            <div class="list-item" v-for="(item, key) in ingredients" :key="key">
              {{ item.name }}
              <template v-if="item.measure">
                | {{ item.measure }}
              </template>
            </div>
          </div>
          <div class="instructions">
            {{ infoCocktail.strInstructions }}
          </div>
        </div>
      </div>
    </AppLayout>
  </div>
</template>