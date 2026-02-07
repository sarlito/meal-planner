"use client";

import React, { useState } from "react";
import type { Meal } from "@/types/meal";
import { MealList } from "./MealList";
import { MealFormSheet } from "./MealFormSheet";

export interface MealsSectionProps {
  meals: Meal[];
  onUpsertMeal: (meal: Meal) => void;
  onDeleteMeal: (mealId: string) => void;
}

export function MealsSection({ meals, onUpsertMeal, onDeleteMeal }: MealsSectionProps) {
  const [sheetOpen, setSheetOpen] = useState(false);
  const [editingMeal, setEditingMeal] = useState<Meal | null>(null);

  const handleAdd = () => {
    setEditingMeal(null);
    setSheetOpen(true);
  };

  const handleEdit = (meal: Meal) => {
    setEditingMeal(meal);
    setSheetOpen(true);
  };

  const handleSave = (meal: Meal) => {
    onUpsertMeal(meal);
  };

  return (
    <section className="space-y-4 pb-16">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Meals</h2>
        <button
          type="button"
          onClick={handleAdd}
          className="rounded-full bg-foreground text-background text-xs font-medium px-3 py-1.5"
        >
          + Add meal
        </button>
      </div>
      <p className="text-xs text-foreground/70">
        Save meals you cook often so you can quickly plan your week and build a
        grocery list.
      </p>

      <MealList meals={meals} onEdit={handleEdit} onDelete={onDeleteMeal} />

      <MealFormSheet
        open={sheetOpen}
        initialMeal={editingMeal}
        onClose={() => setSheetOpen(false)}
        onSave={handleSave}
      />
    </section>
  );
}

