import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Recipe } from "models";
import { AppActionType } from "redux/store";

type RecipeState = {
  recipes: Recipe[];
  recipe: Recipe;
  totalCount: number;
};

const initialState: RecipeState = {
  recipes: [],
  recipe: {} as Recipe,
  totalCount: 0
};

const recipeSlice = createSlice({
  name: "recipe",
  initialState: initialState,
  reducers: {
    // Create Recipe
    createRecipeRequest(
      _state: RecipeState,
      _action: PayloadAction<AppActionType.Recipe.CreateRecipeRequestAction>
    ) { },
    createRecipeSuccess(
      state: RecipeState,
      action: PayloadAction<AppActionType.Recipe.CreateRecipeSuccessAction>
    ) {
      // state.recipes = [...state.recipes, action.payload.recipe];
    },
    createRecipeFailure(_state: RecipeState) { },

    // Get Recipes
    getRecipesRequest(
      _state: RecipeState,
      _action: PayloadAction<AppActionType.Recipe.GetRecipesRequestAction>
    ) { },
    getRecipeSuccess(
      state: RecipeState,
      action: PayloadAction<AppActionType.Recipe.GetRecipesSuccessAction>
    ) {
      state.recipes = [...action.payload.recipes];
      state.totalCount = action.payload.totalCount;
    },
    getRecipeFailure(_state: RecipeState) { },

    // Get Certain Recipe
    getCertainRecipeRequest(
      _state: RecipeState,
      _action: PayloadAction<AppActionType.Recipe.GetCertainRecipeRequestAction>
    ) { },
    getCertainRecipeSuccess(
      state: RecipeState,
      action: PayloadAction<AppActionType.Recipe.GetCertainReceipSuccessAction>
    ) {
      state.recipe = action.payload.recipe;
    },
    getCertainRecipeFailure(_state: RecipeState) { },

    // Update Recipe
    updateRecipeRequest(
      _state: RecipeState,
      _action: PayloadAction<AppActionType.Recipe.UpdateRecipeRequestAction>
    ) { },
    updateRecipeSuccess(
      state: RecipeState,
      action: PayloadAction<AppActionType.Recipe.UpdateRecipeSuccessAction>
    ) {
      // state.recipes = [...action.payload.recipes];
    },
    updateRecipeFailure(_state: RecipeState) { },

    // Delete Recipe
    deleteRecipeRequest(
      _state: RecipeState,
      _action: PayloadAction<AppActionType.Recipe.DeleteRecipeRequestAction>
    ) { },
    deleteRecipeSuccess(
      state: RecipeState,
      action: PayloadAction<AppActionType.Recipe.DeleteRecipeSuccessAction>
    ) {
      state.recipes = [...action.payload.recipes];
    },
    deleteRecipeFailure(_state: RecipeState) { }
  }
});

export const actions = recipeSlice.actions;
export const reducer = recipeSlice.reducer;