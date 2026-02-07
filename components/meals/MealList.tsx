"use client";

import React from "react";
import type { Meal } from "@/types/meal";

export interface MealListProps {
  meals: Meal[];
  onEdit: (meal: Meal) => void;
  onDelete: (mealId: string) => void;
}

export function MealList({ meals, onEdit, onDelete }: MealListProps) {
  if (meals.length === 0) {
    return (
      <p className="text-sm text-foreground/70">
        No meals yet. Tap “Add meal” to create your first one.
      </p>
    );
  }

  return (
    <ul className="space-y-3">
      {meals.map((meal) => (
        <li
          key={meal.id}
          className="rounded-xl bg-white/5 border border-white/10 px-3 py-3 flex items-start justify-between gap-3"
        >
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-sm font-semibold">{meal.title}</h3>
              <span className="text-[10px] text-foreground/60">
                {meal.ingredients.length} ingredient
                {meal.ingredients.length === 1 ? "" : "s"}
              </span>
            </div>
            {meal.ingredients.length > 0 && (
              <p className="text-xs text-foreground/70 line-clamp-2">
                {meal.ingredients
                  .slice(0, 3)
                  .map((ing) => ing.name)
                  .join(", ")}
                {meal.ingredients.length > 3 ? "…" : ""}
              </p>
            )}
          </div>
          <div className="flex flex-col items-end gap-1">
            <button
              type="button"
              onClick={() => onEdit(meal)}
              className="text-xs px-2 py-1 rounded-full bg-white/10 text-foreground"
            >
              Edit
            </button>
            <button
              type="button"
              onClick={() => onDelete(meal.id)}
              className="text-[11px] text-red-300 px-1.5 py-0.5 rounded-full hover:bg-red-500/10"
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

