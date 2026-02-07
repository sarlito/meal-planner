import type { Meal, Ingredient } from "@/types/meal";
import type { WeeklyPlan } from "@/types/plan";
import { createId } from "./id";

export type GroceryItem = {
  id: string;
  name: string;
  quantity: string;
  occurrences: number;
};

function normalizeName(name: string): string {
  return name.trim().toLowerCase();
}

export function generateGroceryList(meals: Meal[], plan: WeeklyPlan): GroceryItem[] {
  const mealById = new Map<string, Meal>();
  for (const meal of meals) {
    mealById.set(meal.id, meal);
  }

  const aggregated = new Map<string, { name: string; quantities: string[]; occurrences: number }>();

  // Collect all meal IDs from each day's breakfast, lunch, and dinner.
  const allMealIds: string[] = [];
  for (const day of Object.values(plan.days)) {
    if (day.breakfast) allMealIds.push(day.breakfast);
    if (day.lunch) allMealIds.push(day.lunch);
    if (day.dinner) allMealIds.push(day.dinner);
  }

  for (const mealId of allMealIds) {
    const meal = mealById.get(mealId);
    if (!meal) continue;

    for (const ing of meal.ingredients) {
      const key = normalizeName(ing.name);
      const existing = aggregated.get(key);
      if (existing) {
        if (ing.quantity && !existing.quantities.includes(ing.quantity)) {
          existing.quantities.push(ing.quantity);
        }
        existing.occurrences += 1;
      } else {
        aggregated.set(key, {
          name: ing.name.trim(),
          quantities: ing.quantity ? [ing.quantity] : [],
          occurrences: 1
        });
      }
    }
  }

  const result: GroceryItem[] = [];

  for (const { name, quantities, occurrences } of aggregated.values()) {
    let quantityLabel = "";
    if (quantities.length === 1) {
      quantityLabel = quantities[0];
    } else if (quantities.length > 1) {
      quantityLabel = quantities.join(" + ");
    }

    if (occurrences > 1 && quantityLabel) {
      quantityLabel = `${quantityLabel} (x${occurrences})`;
    } else if (occurrences > 1) {
      quantityLabel = `x${occurrences}`;
    }

    result.push({
      id: createId("grocery"),
      name,
      quantity: quantityLabel,
      occurrences
    });
  }

  // Sort alphabetically for a more scannable list
  result.sort((a, b) => a.name.localeCompare(b.name));

  return result;
}

