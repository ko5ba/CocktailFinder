<script setup>
import AppLayout from '@/components/AppLayout.vue'
import CocktailThumb from '@/components/CocktailThumb.vue';
import { useRootStore } from '@/stores/root'
import { storeToRefs } from 'pinia';

const rootStore = useRootStore()

rootStore.getIngregients()

const { ingredients, cocktails, ingredient } = storeToRefs(rootStore)

function getCocktails() {
  rootStore.getCocktails(rootStore.ingredient)
}

function removeIngredient() {
  rootStore.setIngredient(null)
}
</script>

<template>
  <AppLayout :goBack="removeIngredient" imgUrl=" /src/assets/img/bg.jpg"
    :isBackButtonVisible="!ingredient || !cocktails ? false : true">
    <div class="wrapper"> <!-- wrapper -->
      <div v-if="!ingredient || !cocktails" class="info"> <!-- info -->
        <div class="title">Chouse your drink</div> <!-- tile -->
        <div class="line"></div> <!-- line -->
        <div class="pt-12">
          <el-select filterable allow-create @change="getCocktails" v-model="rootStore.ingredient"
            placeholder="Choose main ingredient" size="large" style="width: 240px">
            <el-option v-for="item in ingredients" :key="item.strIngredient1" :label="item.strIngredient1"
              :value="item.strIngredient1" />
          </el-select>
        </div>
        <div class="pt-[50px] leading-9 tracking-widest text-textMuted max-w-[516px] mx-auto">
          Try our delicious cocktail recipes for every occasion. Find delicious cocktail recipes by ingredient through
          our cocktail generator.
        </div>
        <img class="mt-[60px]" src="/src/assets/img/bg-cocktails.png" alt="Cocktails">
      </div>
      <div v-else class="info">
        <div class="title">COCKTAILS WITH {{ ingredient }}</div>
        <div class="line"></div>
        <div class="flex flex-wrap max-h-[400px] overflow-y-auto items-center mt-14" v-for=" cocktail in cocktails"
          :key="cocktail.idDrink">
          <CocktailThumb :id="cocktail.idDrink" :title="cocktail.strDrink" :imageUrl="cocktail.strDrinkThumb" />
        </div> <!-- Cocktails -->
      </div>
    </div>
  </AppLayout>
</template>