import { Request, Response } from "express";
import httpStatus from "http-status";
import { recipeService } from "services";
import { errorHandlerWrapper } from "utils";

const getAllRecipesHandler = async (req: Request, res: Response) => {
  const { pageNum, perPage, searchOption, filterOption } = req.query;
  const pageNumber = pageNum ? Number(pageNum) : 0;
  const itemsPerPage = perPage ? Number(perPage) : 10;
  const recipes = await recipeService.getAllRecipes(
    pageNumber,
    itemsPerPage,
    (searchOption as string | undefined) || "",
    (filterOption as string[] | undefined) || []
  );
  const totalCount = await recipeService.getRecipeCount();
  res.status(httpStatus.OK).json({ totalCount, recipes });
};

const getRecipeHandler = async (req: Request, res: Response) => {
  const recipeUuid = req.params.id;
  const recipe = await recipeService.getRecipe(recipeUuid);
  res.status(httpStatus.OK).json({ recipe });
};

const createRecipeHandler = async (req: Request, res: Response) => {
  const { title, instruction, ingredients } = req.body;
  const recipe = await recipeService.createRecipe({
    title,
    instruction,
    ingredients,
  });
  res.status(httpStatus.CREATED).json({ recipe });
};

const updateRecipeHandler = async (req: Request, res: Response) => {
  const recipe = await recipeService.updateRecipe(req.params.id, req.body);
  res.status(httpStatus.OK).json({ recipe });
};

const deleteRecipeHandler = async (req: Request, res: Response) => {
  await recipeService.deleteRecipe(req.params.id);
  res.status(httpStatus.OK).json({});
};

export const getAllRecipes = errorHandlerWrapper(getAllRecipesHandler);
export const getRecipe = errorHandlerWrapper(getRecipeHandler);
export const createRecipe = errorHandlerWrapper(createRecipeHandler);
export const updateRecipe = errorHandlerWrapper(updateRecipeHandler);
export const deleteRecipe = errorHandlerWrapper(deleteRecipeHandler);
