import { Request, Response } from "express";
import httpStatus from "http-status";

const getAllRecipesHandler = async (req: Request, res: Response) => {
  res.status(httpStatus.OK).json({ok: "ok"});
};

const getRecipeHandler = async (req: Request, res: Response) => {
  res.status(httpStatus.OK).json({ok: "ok"});
};

const createRecipeHandler = async (req: Request, res: Response) => {
  res.status(httpStatus.OK).json({ok: "ok"});
};

const updateRecipeHandler = async (req: Request, res: Response) => {
  res.status(httpStatus.OK).json({ok: "ok"});
};

const deleteRecipeHandler = async (req: Request, res: Response) => {
  res.status(httpStatus.OK).json({ok: "ok"});
};

export const getAllRecipes = getAllRecipesHandler;
export const getRecipe = getRecipeHandler;
export const createRecipe = createRecipeHandler;
export const updateRecipe = updateRecipeHandler;
export const deleteRecipe = deleteRecipeHandler;
