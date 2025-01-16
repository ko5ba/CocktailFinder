import { createRouter, createWebHistory } from "vue-router";
import Home from "@/pages/Home.vue";
import Cocktail from "@/pages/Cocktail.vue";
import CocktailRandom from "@/pages/CocktailRandom.vue";
import { ROUTES_PATH } from "@/constants";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: ROUTES_PATH.HOME,
      name: ROUTES_PATH.HOME,
      component: Home,
    },
    {
      path: ROUTES_PATH.COCKTAIL,
      name: ROUTES_PATH.COCKTAIL,
      component: Cocktail,
    },
    {
      path: ROUTES_PATH.RANDOM,
      name: ROUTES_PATH.RANDOM,
      component: CocktailRandom,
    },
  ],
});

export default router;
