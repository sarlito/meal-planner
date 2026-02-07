export type Ingredient = {
  id: string;
  name: string;
  quantity: string;
};

export type Meal = {
  id: string;
  title: string;
  ingredients: Ingredient[];
  createdAt: string; // ISO string
  updatedAt: string; // ISO string
};

