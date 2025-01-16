import { defineStore } from "pinia";
import axios from "axios";
import { INGREDIENTS_URL, COCKTAILS_BY_INGREDIENT_URL } from "@/constants";

export const useRootStore = defineStore("counter", {
  state: () => ({
    ingredients: [],
    cocktails: [],
    ingredient: null,
  }),
  actions: {
    async getIngregients() {
      const { data } = await axios.get(INGREDIENTS_URL);
      this.ingredients = data.drinks;
    },
    async getCocktails(ingredient) {
      const { data } = await axios.get(
        `${COCKTAILS_BY_INGREDIENT_URL}${ingredient}`
      );
      this.cocktails = data.drinks;
    },
    setIngredient(value) {
      this.ingredient = value;
    },
  },
});
