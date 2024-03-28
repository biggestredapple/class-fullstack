import createRecipe from './createRecipe.saga';
import deleteRecipe from './deleteRecipe.saga';
import updateRecipe from './updateRecipe.saga';
import getRecipes from './getRecipes.saga';
import getCertainRecipe from './getCertainRecipe.saga';

export default [
  createRecipe,
  deleteRecipe,
  updateRecipe,
  getRecipes,
  getCertainRecipe
];