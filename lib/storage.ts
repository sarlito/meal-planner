import type { Meal } from "@/types/meal";
import type { WeeklyPlan, DayMeals } from "@/types/plan";
import { DAY_ORDER } from "@/types/plan";
import { createId } from "@/lib/id";

const MEALS_KEY = "meal-planner:meals";
const PLAN_KEY = "meal-planner:weekly-plan";

// Suggested starter meals used only when there is no data in localStorage yet.
// These are deliberately simple and can be edited/removed by the user.
const DEFAULT_MEALS: Omit<Meal, "id" | "createdAt" | "updatedAt">[] = [
  {
    title: "Oatmeal with Berries",
    ingredients: [
      { id: createId("ing"), name: "Rolled oats", quantity: "1 cup" },
      { id: createId("ing"), name: "Milk or water", quantity: "1.5 cups" },
      { id: createId("ing"), name: "Mixed berries", quantity: "1/2 cup" },
      { id: createId("ing"), name: "Honey", quantity: "1 tbsp" }
    ]
  },
  {
    title: "Greek Yogurt Parfait",
    ingredients: [
      { id: createId("ing"), name: "Greek yogurt", quantity: "1 cup" },
      { id: createId("ing"), name: "Granola", quantity: "1/3 cup" },
      { id: createId("ing"), name: "Fresh fruit", quantity: "1/2 cup" },
      { id: createId("ing"), name: "Chia seeds", quantity: "1 tbsp" }
    ]
  },
  {
    title: "Avocado Toast",
    ingredients: [
      { id: createId("ing"), name: "Whole grain bread", quantity: "2 slices" },
      { id: createId("ing"), name: "Avocado", quantity: "1/2" },
      { id: createId("ing"), name: "Lemon juice", quantity: "1 tsp" },
      { id: createId("ing"), name: "Salt & pepper", quantity: "to taste" }
    ]
  },
  {
    title: "Veggie Omelette",
    ingredients: [
      { id: createId("ing"), name: "Eggs", quantity: "2" },
      { id: createId("ing"), name: "Bell pepper", quantity: "1/4, diced" },
      { id: createId("ing"), name: "Onion", quantity: "1/4, diced" },
      { id: createId("ing"), name: "Spinach", quantity: "1 handful" },
      { id: createId("ing"), name: "Cheese", quantity: "2 tbsp, shredded" }
    ]
  },
  {
    title: "Chicken Salad Wrap",
    ingredients: [
      { id: createId("ing"), name: "Whole wheat tortilla", quantity: "1" },
      { id: createId("ing"), name: "Cooked chicken", quantity: "1/2 cup, shredded" },
      { id: createId("ing"), name: "Lettuce", quantity: "1 handful" },
      { id: createId("ing"), name: "Tomato", quantity: "2 slices" },
      { id: createId("ing"), name: "Mayonnaise or yogurt", quantity: "1 tbsp" }
    ]
  },
  {
    title: "Turkey Sandwich",
    ingredients: [
      { id: createId("ing"), name: "Whole grain bread", quantity: "2 slices" },
      { id: createId("ing"), name: "Turkey slices", quantity: "3–4" },
      { id: createId("ing"), name: "Cheese slice", quantity: "1" },
      { id: createId("ing"), name: "Lettuce", quantity: "2 leaves" },
      { id: createId("ing"), name: "Mustard or mayo", quantity: "1 tbsp" }
    ]
  },
  {
    title: "Quinoa Veggie Bowl",
    ingredients: [
      { id: createId("ing"), name: "Cooked quinoa", quantity: "1 cup" },
      { id: createId("ing"), name: "Cherry tomatoes", quantity: "1/2 cup" },
      { id: createId("ing"), name: "Cucumber", quantity: "1/2, diced" },
      { id: createId("ing"), name: "Feta cheese", quantity: "2 tbsp" },
      { id: createId("ing"), name: "Olive oil", quantity: "1 tbsp" }
    ]
  },
  {
    title: "Grilled Chicken Salad",
    ingredients: [
      { id: createId("ing"), name: "Mixed greens", quantity: "2 cups" },
      { id: createId("ing"), name: "Grilled chicken", quantity: "1/2 cup, sliced" },
      { id: createId("ing"), name: "Cherry tomatoes", quantity: "1/2 cup" },
      { id: createId("ing"), name: "Cucumber", quantity: "1/4, sliced" },
      { id: createId("ing"), name: "Salad dressing", quantity: "2 tbsp" }
    ]
  },
  {
    title: "Pasta with Marinara",
    ingredients: [
      { id: createId("ing"), name: "Pasta", quantity: "2 oz (dry)" },
      { id: createId("ing"), name: "Marinara sauce", quantity: "1/2 cup" },
      { id: createId("ing"), name: "Parmesan cheese", quantity: "1 tbsp" },
      { id: createId("ing"), name: "Olive oil", quantity: "1 tsp" }
    ]
  },
  {
    title: "Stir-Fry Chicken & Veggies",
    ingredients: [
      { id: createId("ing"), name: "Chicken breast", quantity: "1/2 lb" },
      { id: createId("ing"), name: "Mixed vegetables", quantity: "2 cups" },
      { id: createId("ing"), name: "Soy sauce", quantity: "2 tbsp" },
      { id: createId("ing"), name: "Garlic", quantity: "2 cloves" },
      { id: createId("ing"), name: "Rice", quantity: "1 cup cooked" }
    ]
  },
  {
    title: "Baked Salmon with Veggies",
    ingredients: [
      { id: createId("ing"), name: "Salmon fillet", quantity: "1 portion" },
      { id: createId("ing"), name: "Broccoli florets", quantity: "1 cup" },
      { id: createId("ing"), name: "Olive oil", quantity: "1 tbsp" },
      { id: createId("ing"), name: "Lemon", quantity: "2 slices" },
      { id: createId("ing"), name: "Salt & pepper", quantity: "to taste" }
    ]
  },
  {
    title: "Taco Night",
    ingredients: [
      { id: createId("ing"), name: "Taco shells", quantity: "3" },
      { id: createId("ing"), name: "Ground beef or turkey", quantity: "1/3 lb" },
      { id: createId("ing"), name: "Taco seasoning", quantity: "1 tbsp" },
      { id: createId("ing"), name: "Lettuce", quantity: "shredded, 1/2 cup" },
      { id: createId("ing"), name: "Cheddar cheese", quantity: "1/4 cup, shredded" }
    ]
  },
  {
    title: "Veggie Curry with Rice",
    ingredients: [
      { id: createId("ing"), name: "Mixed vegetables", quantity: "2 cups" },
      { id: createId("ing"), name: "Coconut milk", quantity: "1 cup" },
      { id: createId("ing"), name: "Curry paste or powder", quantity: "1–2 tbsp" },
      { id: createId("ing"), name: "Rice", quantity: "1 cup cooked" }
    ]
  },
  {
    title: "Sheet Pan Sausage & Veggies",
    ingredients: [
      { id: createId("ing"), name: "Sausages", quantity: "2" },
      { id: createId("ing"), name: "Potatoes", quantity: "2, diced" },
      { id: createId("ing"), name: "Bell peppers", quantity: "1, sliced" },
      { id: createId("ing"), name: "Olive oil", quantity: "2 tbsp" },
      { id: createId("ing"), name: "Seasoning mix", quantity: "1 tbsp" }
    ]
  },
  {
    title: "Overnight Oats",
    ingredients: [
      { id: createId("ing"), name: "Rolled oats", quantity: "1/2 cup" },
      { id: createId("ing"), name: "Milk", quantity: "1/2 cup" },
      { id: createId("ing"), name: "Yogurt", quantity: "1/4 cup" },
      { id: createId("ing"), name: "Chia seeds", quantity: "1 tbsp" },
      { id: createId("ing"), name: "Fruit", quantity: "1/4 cup" }
    ]
  },
  {
    title: "Smoothie Bowl",
    ingredients: [
      { id: createId("ing"), name: "Frozen fruit", quantity: "1 cup" },
      { id: createId("ing"), name: "Milk or juice", quantity: "1/2 cup" },
      { id: createId("ing"), name: "Granola", quantity: "1/4 cup" },
      { id: createId("ing"), name: "Banana", quantity: "1/2, sliced" }
    ]
  },
  {
    title: "Grilled Cheese & Tomato Soup",
    ingredients: [
      { id: createId("ing"), name: "Bread slices", quantity: "2" },
      { id: createId("ing"), name: "Cheese slices", quantity: "2" },
      { id: createId("ing"), name: "Butter", quantity: "1 tbsp" },
      { id: createId("ing"), name: "Tomato soup", quantity: "1 cup" }
    ]
  },
  {
    title: "Buddha Bowl",
    ingredients: [
      { id: createId("ing"), name: "Cooked brown rice", quantity: "1 cup" },
      { id: createId("ing"), name: "Roasted chickpeas", quantity: "1/2 cup" },
      { id: createId("ing"), name: "Roasted vegetables", quantity: "1 cup" },
      { id: createId("ing"), name: "Tahini sauce", quantity: "2 tbsp" }
    ]
  },
  {
    title: "Shrimp Stir-Fry",
    ingredients: [
      { id: createId("ing"), name: "Shrimp", quantity: "1/2 lb" },
      { id: createId("ing"), name: "Stir-fry vegetables", quantity: "2 cups" },
      { id: createId("ing"), name: "Soy sauce", quantity: "2 tbsp" },
      { id: createId("ing"), name: "Garlic", quantity: "2 cloves" },
      { id: createId("ing"), name: "Rice or noodles", quantity: "1 cup cooked" }
    ]
  },
  {
    title: "Homemade Pizza",
    ingredients: [
      { id: createId("ing"), name: "Pizza base", quantity: "1 small" },
      { id: createId("ing"), name: "Tomato sauce", quantity: "1/4 cup" },
      { id: createId("ing"), name: "Mozzarella cheese", quantity: "1/2 cup, shredded" },
      { id: createId("ing"), name: "Toppings of choice", quantity: "1/2 cup" }
    ]
  }
];

function safeParse<T>(raw: string | null): T | null {
  if (!raw) return null;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

export function loadMeals(): Meal[] {
  if (typeof window === "undefined") return [];
  const parsed = safeParse<Meal[]>(window.localStorage.getItem(MEALS_KEY));

  // If user has no saved meals yet, seed with suggested defaults.
  if (!parsed || parsed.length === 0) {
    const now = new Date().toISOString();
    return DEFAULT_MEALS.map((base) => ({
      ...base,
      id: createId("meal"),
      createdAt: now,
      updatedAt: now
    }));
  }

  return parsed;
}

export function saveMeals(meals: Meal[]): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(MEALS_KEY, JSON.stringify(meals));
}

function createEmptyDayMeals(): DayMeals {
  return {
    breakfast: null,
    lunch: null,
    dinner: null
  };
}

function createEmptyPlan(): WeeklyPlan {
  return {
    id: "current",
    weekStartISO: null,
    days: DAY_ORDER.reduce(
      (acc, day) => {
        acc[day] = createEmptyDayMeals();
        return acc;
      },
      {} as WeeklyPlan["days"]
    )
  };
}

export function loadWeeklyPlan(): WeeklyPlan {
  if (typeof window === "undefined") return createEmptyPlan();
  const parsed = safeParse<WeeklyPlan>(window.localStorage.getItem(PLAN_KEY));
  return parsed ?? createEmptyPlan();
}

export function saveWeeklyPlan(plan: WeeklyPlan): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(PLAN_KEY, JSON.stringify(plan));
}

