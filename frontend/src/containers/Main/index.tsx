import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MainView } from 'components';
import { RootState, AppDispatch, AppActionType, AppActions } from '../../redux/store';

export const MainContainer = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { recipes, recipe, totalCount } = useSelector((state: RootState) => state.recipe);

  const handleGetRecipes = useCallback((data: AppActionType.Recipe.GetRecipesRequestAction) => {
    dispatch(AppActions.recipe.getRecipesRequest(data));
  }, [dispatch]);

  const handleGetCertainRecipe = useCallback((data: AppActionType.Recipe.GetCertainRecipeRequestAction) => {
    dispatch(AppActions.recipe.getCertainRecipeRequest(data));
  }, [dispatch]);

  const handleCreateRecipe = useCallback((data: AppActionType.Recipe.CreateRecipeRequestAction) => {
    dispatch(AppActions.recipe.createRecipeRequest(data));
  }, [dispatch]);

  const handleUpdateRecipe = useCallback((data: AppActionType.Recipe.UpdateRecipeRequestAction) => {
    dispatch(AppActions.recipe.updateRecipeRequest(data));
  }, [dispatch]);

  const handleDeleteRecipe = useCallback((data: AppActionType.Recipe.DeleteRecipeRequestAction) => {
    dispatch(AppActions.recipe.deleteRecipeRequest(data));
  }, [dispatch]);

  useEffect(() => {
    handleGetRecipes({});
  }, [])

  return <MainView
    recipes={recipes}
    recipe={recipe}
    totalCount={totalCount}
    createRecipe={handleCreateRecipe}
    updateRecipe={handleUpdateRecipe}
    getRecipes={handleGetRecipes}
    getCertainRecipe={handleGetCertainRecipe}
    deleteRecipe={handleDeleteRecipe}
  />
}