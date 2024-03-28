import { RecipeEntity } from "../entities/recipe.entity";
import { AppDataSource } from "../setup/database.setup";

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