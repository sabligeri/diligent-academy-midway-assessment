import { AppError } from "./app.error";
import { Recipe, RecipeType } from "./recipe";
import { Store } from "./stores/store.type";

export async function list(store: Store<RecipeType[]>, args: string[]) {

  if(args.length !== 0){
    throw new AppError("The list command should not have an argument(s).")
  }

  const recipe = new Recipe(store);

  const recipes = await recipe.readAll();

  const formatted = recipes
    .map((recipe) => `- [${recipe.id}] ${recipe.name}`)
    .join('\n');

  console.log('Your recipes:');
  console.log(formatted);
}

export async function details(store: Store<RecipeType[]>, args: string[]) {

  if(args.length !== 1) {
    throw new AppError("The argument of the details command should be a single number! e.g.: 12, 3, 1, 123");
  }
  
  const id = parseInt(args[0])

  if(isNaN(id)) {
    throw new AppError("The id should be a numeric value, a single number. e.g.: 12, 3, 1, 123");
  }

  const recipe = new Recipe(store);
  const recipes = await recipe.readAll();
  const foundRecipe = recipes.find(recipe => recipe.id === id);

  if (!foundRecipe) {
    throw new AppError(`The recipe with the ID ${id} is not found.`);
  }

  console.log(`Here is the recepie with the ID: ${foundRecipe.id}: ${foundRecipe.name} - ${foundRecipe.id}`);
}