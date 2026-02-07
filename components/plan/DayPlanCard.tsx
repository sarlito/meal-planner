"use client";

import React from "react";
import type { DayId, DayMeals, MealSlot } from "@/types/plan";
import type { Meal } from "@/types/meal";

export interface DayPlanCardProps {
  dayId: DayId;
  label: string;
  mealsBySlot: DayMeals;
  meals: Meal[];
  onAddMeal: (day: DayId, slot: MealSlot) => void;
  onClearSlot: (day: DayId, slot: MealSlot) => void;
}

export function DayPlanCard({
  dayId,
  label,
  mealsBySlot,
  meals,
  onAddMeal,
  onClearSlot
}: DayPlanCardProps) {
  const mealById = new Map(meals.map((m) => [m.id, m]));

  const slots: { id: MealSlot; label: string }[] = [
    { id: "breakfast", label: "Breakfast" },
    { id: "lunch", label: "Lunch" },
    { id: "dinner", label: "Dinner" }
  ];

  return (
    <div className="rounded-xl bg-white/5 border border-white/10 px-3 py-3 space-y-2">
      <h3 className="text-sm font-semibold capitalize">{label}</h3>
      <div className="space-y-1.5">
        {slots.map((slot) => {
          const mealId = mealsBySlot[slot.id];
          const meal = mealId ? (mealById.get(mealId) as Meal | undefined) : undefined;
          return (
            <div key={slot.id} className="flex items-center justify-between text-xs">
              <span className="text-foreground/80">{slot.label}</span>
              {meal ? (
                <button
                  type="button"
                  onClick={() => onClearSlot(dayId, slot.id)}
                  className="px-2 py-1 rounded-full bg-foreground text-background flex items-center gap-1"
                >
                  <span>{meal.title}</span>
                  <span className="text-background/70 text-[10px]">✕</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => onAddMeal(dayId, slot.id)}
                  className="px-2 py-1 rounded-full bg-white/10 text-foreground/80"
                >
                  + Add
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

