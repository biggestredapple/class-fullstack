import {
  createRecipe,
  deleteRecipe,
  getAllRecipes,
  getRecipe,
  updateRecipe,
} from "controllers";
import express from "express";

import { IdValidationSchema, recipeCreateValidationSchema, recipeUpdateValidationSchema, validate } from "validation";

export const recipeRouter = express.Router();

recipeRouter.get("/", getAllRecipes);
recipeRouter.get("/:id", validate(IdValidationSchema), getRecipe);
recipeRouter.post("/", validate(recipeCreateValidationSchema), createRecipe);
recipeRouter.put("/:id", validate(IdValidationSchema), validate(recipeUpdateValidationSchema),  updateRecipe);
recipeRouter.delete("/:id", validate(IdValidationSchema), deleteRecipe);