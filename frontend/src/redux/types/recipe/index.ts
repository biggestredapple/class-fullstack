import { IAction, IPagination } from "../action";
import { Recipe } from "models";

// Create Recipe Request
export type CreateRecipeRequestAction = IAction & {
  recipe: Recipe;
};
export type CreateRecipeSuccessAction = {
  recipe: Recipe;
};

// Get Recipes Request
export type GetRecipesRequestAction = IAction & IPagination & {
  filterOption?: string;
  searchOption?: string;
};
export type GetRecipesSuccessAction = {
  totalCount: number;
  recipes: Recipe[];
};

// Get Certain Recipe Request
export type GetCertainRecipeRequestAction = IAction & {
  recipeId: string;
};
export type GetCertainReceipSuccessAction = {
  recipe: Recipe;
};

// Update Recipe Request
export type UpdateRecipeRequestAction = IAction & {
  recipeId: string,
  recipe: Recipe
};
export type UpdateRecipeSuccessAction = {
  recipe: Recipe;
};

// Delete Recipe Request
export type DeleteRecipeRequestAction = IAction & {
  recipeId: string;
};
export type DeleteRecipeSuccessAction = {
  recipes: Recipe[];
};