import request from "supertest";
import bodyParser from "body-parser";
import express from "express";
import {
  createRecipe,
  deleteRecipe,
  getAllRecipes,
  getRecipe,
  updateRecipe,
} from "../../src/controllers/recipe.controller";
import { recipeService } from "../../src/services";
import {
  IdValidationSchema,
  recipeCreateValidationSchema,
  recipeUpdateValidationSchema,
  validate,
} from "../../src/validation";
import { NotFoundError } from "../../src/errors";
import { ERROR } from "../../src/consts/messages";
import { errorHandlerMiddleware } from "../../src/middlewares/errorHandler.middleware";

const mockRecipes = [
  {
    createdAt: new Date("2024-03-28T15:01:02.491Z"),
    updatedAt: new Date("2024-03-28T15:01:02.491Z"),
    deletedAt: null,
    uuid: "817324c7-d351-4531-ab88-22dd287f1fe2",
    title: "title1",
    instruction: "instruction1",
    ingredients: ["aaa", "bbb", "ccc"],
  },
  {
    createdAt: new Date("2024-03-29T15:01:02.491Z"),
    updatedAt: new Date("2024-03-29T15:01:02.491Z"),
    deletedAt: null,
    uuid: "37c81247-35d1-4315-a8b8-287e22df2d1f",
    title: "title2",
    instruction: "instruction2",
    ingredients: ["aaa", "ddd"],
  },
  {
    createdAt: new Date("2024-03-30T15:01:02.491Z"),
    updatedAt: new Date("2024-03-30T15:01:02.491Z"),
    deletedAt: null,
    uuid: "278417c3-531d-1543-8b8a-7f28f2de212d",
    title: "title3",
    instruction: "instruction3",
    ingredients: ["ccc", "eee"],
  },
  {
    createdAt: new Date("2024-03-31T15:01:02.491Z"),
    updatedAt: new Date("2024-03-31T15:01:02.491Z"),
    deletedAt: null,
    uuid: "78c73214-15d3-3451-8ab8-e2f27d2df182",
    title: "title4",
    instruction: "instruction4",
    ingredients: ["ddd", "eee", "fff"],
  },
];

const recipes = [
  {
    createdAt: "2024-03-28T15:01:02.491Z",
    updatedAt: "2024-03-28T15:01:02.491Z",
    deletedAt: null,
    uuid: "817324c7-d351-4531-ab88-22dd287f1fe2",
    title: "title1",
    instruction: "instruction1",
    ingredients: ["aaa", "bbb", "ccc"],
  },
  {
    createdAt: "2024-03-29T15:01:02.491Z",
    updatedAt: "2024-03-29T15:01:02.491Z",
    deletedAt: null,
    uuid: "37c81247-35d1-4315-a8b8-287e22df2d1f",
    title: "title2",
    instruction: "instruction2",
    ingredients: ["aaa", "ddd"],
  },
  {
    createdAt: "2024-03-30T15:01:02.491Z",
    updatedAt: "2024-03-30T15:01:02.491Z",
    deletedAt: null,
    uuid: "278417c3-531d-1543-8b8a-7f28f2de212d",
    title: "title3",
    instruction: "instruction3",
    ingredients: ["ccc", "eee"],
  },
  {
    createdAt: "2024-03-31T15:01:02.491Z",
    updatedAt: "2024-03-31T15:01:02.491Z",
    deletedAt: null,
    uuid: "78c73214-15d3-3451-8ab8-e2f27d2df182",
    title: "title4",
    instruction: "instruction4",
    ingredients: ["ddd", "eee", "fff"],
  },
];

const app = express();

app.use(bodyParser.json());

app.get("/", getAllRecipes);
app.get("/:id", validate(IdValidationSchema), getRecipe);
app.post("/", validate(recipeCreateValidationSchema), createRecipe);
app.put(
  "/:id",
  validate(IdValidationSchema),
  validate(recipeUpdateValidationSchema),
  updateRecipe
);
app.delete("/:id", validate(IdValidationSchema), deleteRecipe);

app.use(errorHandlerMiddleware);

describe("getAllRecipeHandler", () => {
  const totalCount = 4;
  it("return all recipes", async () => {
    jest.spyOn(recipeService, "getAllRecipes").mockResolvedValue(mockRecipes);
    jest.spyOn(recipeService, "getRecipeCount").mockResolvedValue(totalCount);

    const res = await request(app).get("/");

    expect(recipeService.getAllRecipes).toHaveBeenCalledWith(0, 10, "", []);
    expect(recipeService.getRecipeCount).toHaveBeenCalled();
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ totalCount, recipes });
  });

  it("return recipes that are paginated", async () => {
    jest
      .spyOn(recipeService, "getAllRecipes")
      .mockResolvedValue([mockRecipes[0], mockRecipes[1]]);
    jest.spyOn(recipeService, "getRecipeCount").mockResolvedValue(2);

    const res = await request(app).get("/?pageNum=0&perPage=2");

    expect(recipeService.getAllRecipes).toHaveBeenCalledWith(0, 2, "", []);
    expect(recipeService.getRecipeCount).toHaveBeenCalled();
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      totalCount: 2,
      recipes: [recipes[0], recipes[1]],
    });
  });

  it("return recipes that are filtered", async () => {
    jest
      .spyOn(recipeService, "getAllRecipes")
      .mockResolvedValue([mockRecipes[0]]);
    jest.spyOn(recipeService, "getRecipeCount").mockResolvedValue(1);
    const res = await request(app).get("/?searchOption=title1");
    expect(recipeService.getAllRecipes).toHaveBeenCalledWith(
      0,
      10,
      "title1",
      []
    );
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      totalCount: 1,
      recipes: [recipes[0]],
    });
  });
});

describe("createNewRecipeHandler", () => {
  it("create new recipe successfully", async () => {
    jest.spyOn(recipeService, "createRecipe").mockResolvedValue(mockRecipes[0]);
    const res = await request(app)
      .post("/")
      .send({
        title: "title1",
        instruction: "instruction1",
        ingredients: ["aaa", "bbb", "ccc"],
      });
    expect(recipeService.createRecipe).toHaveBeenCalledWith({
      title: "title1",
      instruction: "instruction1",
      ingredients: ["aaa", "bbb", "ccc"],
    });
    expect(res.status).toBe(201);
    expect(res.body).toEqual({
      recipe: recipes[0],
    });
  });

  it("failed creating new recipe due to empty value", async () => {
    const res = await request(app)
      .post("/")
      .send({
        title: "",
        instruction: "instruction1",
        ingredients: ["aaa", "bbb", "ccc"],
      });
    expect(res.status).toBe(400);
    expect(res.body).toEqual({ message: ERROR.TITLE_NON_EMPTY });
  });

  it("failed creating new recipe due to not provided", async () => {
    const res = await request(app)
      .post("/")
      .send({
        instruction: "instruction1",
        ingredients: ["aaa", "bbb", "ccc"],
      });
    expect(res.status).toBe(400);
    expect(res.body).toEqual({ message: ERROR.TITLE_REQUIRED });
  });
});

describe("get recipe by id", () => {
  it("Get recipe by id successfully", async () => {
    jest.spyOn(recipeService, "getRecipe").mockResolvedValue(mockRecipes[1]);
    const res = await request(app).get("/37c81247-35d1-4315-a8b8-287e22df2d1f");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ recipe: recipes[1] });
  });

  it("Failed get recipe by id due to invalid id format", async () => {
    const res = await request(app).get("/37c81247");
    expect(res.status).toBe(400);
    expect(res.body).toEqual({
      message: ERROR.UUID_TYPE,
    });
  });

  it("Failed get recipe by id due to invalid id value", async () => {
    jest.spyOn(recipeService, "getRecipe").mockImplementation((id: string) => {
      throw new NotFoundError(ERROR.NOT_FOUND_MESSAGE);
    });
    const res = await request(app).get("/81237c47-35d1-4315-a8b8-222df87e2d1f");
    expect(res.status).toBe(404);
    expect(res.body).toEqual({ message: ERROR.NOT_FOUND_MESSAGE });
  });
});

describe("Update recipe by id", () => {
  it("Updated recipe successfully", async () => {
    jest.spyOn(recipeService, "updateRecipe").mockResolvedValue({
      ...mockRecipes[0],
      title: "update title",
      updatedAt: new Date("2024-03-31T16:01:51.978Z"),
    });
    const res = await request(app)
      .put("/817324c7-d351-4531-ab88-22dd287f1fe2")
      .send({ title: "update title" });
    expect(recipeService.updateRecipe).toHaveBeenCalledWith(
      "817324c7-d351-4531-ab88-22dd287f1fe2",
      { title: "update title" }
    );
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      recipe: {
        ...recipes[0],
        title: "update title",
        updatedAt: "2024-03-31T16:01:51.978Z",
      },
    });
  });
  it("Failed update recipe due to invalid id format", async () => {
    const res = await request(app)
      .put("/37c81247")
      .send({ title: "update title" });
    expect(res.status).toBe(400);
    expect(res.body).toEqual({
      message: ERROR.UUID_TYPE,
    });
  });
  it("Failed update recipe because does not exist", async () => {
    jest.spyOn(recipeService, "updateRecipe").mockImplementation(() => {
      throw new NotFoundError(ERROR.NOT_FOUND_MESSAGE);
    });
    const res = await request(app)
      .put("/81237c47-35d1-4315-a8b8-222df87e2d1f")
      .send({ title: "update title" });
    expect(recipeService.updateRecipe).toHaveBeenCalledWith(
      "817324c7-d351-4531-ab88-22dd287f1fe2",
      { title: "update title" }
    );
    expect(res.status).toBe(404);
    expect(res.body).toEqual({ message: ERROR.NOT_FOUND_MESSAGE });
  });
  it("Failed update recipe because invalid update value", async () => {
    const res = await request(app)
      .put("/81237c47-35d1-4315-a8b8-222df87e2d1f")
      .send({ title: "" });
    expect(res.status).toBe(400);
    expect(res.body).toEqual({
      message: ERROR.TITLE_NON_EMPTY,
    });
  });
});

describe("Delete recipe by id", () => {
  it("Deleted recipe successfully", async () => {
    jest.spyOn(recipeService, "deleteRecipe").mockResolvedValue(true);
    const res = await request(app).delete(
      "/817324c7-d351-4531-ab88-22dd287f1fe2"
    );
    expect(res.status).toBe(200);
  });
  it("Failed delete recipe due to invalid uuid format", async () => {
    const res = await request(app).delete("/37c81247");
    expect(res.status).toBe(400);
    expect(res.body).toEqual({
      message: ERROR.UUID_TYPE,
    });
  });
  it("Failed delete recipe because the recipe does not exist", async () => {
    jest.spyOn(recipeService, "deleteRecipe").mockImplementation(() => {
      throw new NotFoundError(ERROR.NOT_FOUND_MESSAGE);
    });
    const res = await request(app).delete(
      "/81237c47-35d1-4315-a8b8-222df87e2d1f"
    );
    expect(res.status).toBe(404);
    expect(res.body).toEqual({ message: ERROR.NOT_FOUND_MESSAGE });
  });
});