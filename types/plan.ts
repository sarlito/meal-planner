export type DayId =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";

export type MealSlot = "breakfast" | "lunch" | "dinner";

export type DayMeals = {
  breakfast: string | null;
  lunch: string | null;
  dinner: string | null;
};

export type WeeklyPlan = {
  id: string;
  weekStartISO: string | null;
  // Each day has up to one meal per slot.
  days: Record<DayId, DayMeals>;
};

export const DAY_ORDER: DayId[] = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday"
];

