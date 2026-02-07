"use client";

import React from "react";
import type { Meal } from "@/types/meal";

export interface MealPickerModalProps {
  open: boolean;
  meals: Meal[];
  onSelect: (mealId: string) => void;
  onClose: () => void;
}

export function MealPickerModal({ open, meals, onSelect, onClose }: MealPickerModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-20 bg-black/60 flex items-end sm:items-center justify-center">
      <div className="w-full max-w-md bg-background rounded-t-2xl sm:rounded-2xl p-4 pb-6 max-h-[80vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-base font-semibold">Add meal</h3>
          <button
            type="button"
            onClick={onClose}
            className="text-sm text-foreground/70 px-2 py-1 rounded-lg hover:bg-white/10"
          >
            Close
          </button>
        </div>
        {meals.length === 0 ? (
          <p className="text-sm text-foreground/70">
            No meals yet. Create a meal in the Meals tab first.
          </p>
        ) : (
          <ul className="space-y-2">
            {meals.map((meal) => (
              <li key={meal.id}>
                <button
                  type="button"
                  onClick={() => onSelect(meal.id)}
                  className="w-full text-left px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-sm"
                >
                  {meal.title}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

