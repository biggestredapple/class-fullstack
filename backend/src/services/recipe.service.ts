import { ERROR } from "consts/messages";
import { RecipeEntity } from "entities/recipe.entity";
import { NotFoundError } from "errors";
import { AppDataSource } from "setup/database.setup";
import { CreateRecipeRequestType, UpdateRecipeRequestType } from "types";

export const getAllRecipes = async (
  pageNum: number,
  perPage: number,
  searchOption: string | undefined,
  filterOption: string[]
): Promise<RecipeEntity[]> => {
  const recipeRepository = AppDataSource.getRepository(RecipeEntity);
  return await recipeRepository.query(`
    SELECT * FROM recipe
    WHERE deleted_at IS NULL AND title LIKE '%${searchOption}%' ${
    filterOption.length ? `AND ingredients @> ARRAY${filterOption}` : "\n"
  }
    OFFSET ${pageNum * perPage}
    LIMIT ${perPage}
  `);
};

export const getRecipeCount = async (): Promise<number> => {
  const recipeRepository = AppDataSource.getRepository(RecipeEntity);
  return await recipeRepository.count();
};

export const getRecipe = async (uuid: string): Promise<RecipeEntity | null> => {
  const recipeRepository = AppDataSource.getRepository(RecipeEntity);
  const result = await recipeRepository.findOneBy({
    uuid,
  });
  if (!result) throw new NotFoundError(ERROR.NOT_FOUND_MESSAGE);
  return result;
};

export const createRecipe = async ({
  title,
  instruction,
  ingredients,
}: CreateRecipeRequestType): Promise<RecipeEntity> => {
  const recipeRepository = AppDataSource.getRepository(RecipeEntity);
  const newRecipe = new RecipeEntity();
  Object.assign(newRecipe, { title, instruction, ingredients });
  return await recipeRepository.save(newRecipe);
};

export const updateRecipe = async (
  uuid: string,
  recipe: UpdateRecipeRequestType
): Promise<RecipeEntity | null> => {
  const recipeRepository = AppDataSource.getRepository(RecipeEntity);
  const oldRecipe: RecipeEntity | null = await recipeRepository.findOneBy({
    uuid,
  });
  if (!oldRecipe) throw new NotFoundError(ERROR.NOT_FOUND_MESSAGE);
  return await recipeRepository.save({ ...oldRecipe, ...recipe });
};

export const deleteRecipe = async (uuid: string): Promise<boolean | null> => {
  const recipeRepository = AppDataSource.getRepository(RecipeEntity);
  const oldRecipe: RecipeEntity | null = await recipeRepository.findOne({
    where: { uuid },
  });
  if (!oldRecipe) throw new NotFoundError(ERROR.NOT_FOUND_MESSAGE);
  await recipeRepository.softRemove(oldRecipe);
  return true;
};
