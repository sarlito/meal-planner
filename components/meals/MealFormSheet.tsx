"use client";

import React, { useState, useEffect } from "react";
import type { Meal, Ingredient } from "@/types/meal";
import { createId } from "@/lib/id";

export interface MealFormSheetProps {
  open: boolean;
  initialMeal: Meal | null;
  onClose: () => void;
  onSave: (meal: Meal) => void;
}

type DraftIngredient = Omit<Ingredient, "id"> & { id?: string };

export function MealFormSheet({ open, initialMeal, onClose, onSave }: MealFormSheetProps) {
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState<DraftIngredient[]>([]);

  // Reset form when opened / initialMeal changes
  useEffect(() => {
    if (!open) return;
    if (initialMeal) {
      setTitle(initialMeal.title);
      setIngredients(
        initialMeal.ingredients.map((ing) => ({
          id: ing.id,
          name: ing.name,
          quantity: ing.quantity
        }))
      );
    } else {
      setTitle("");
      setIngredients([{ name: "", quantity: "", id: createId("ing") }]);
    }
  }, [open, initialMeal]);

  if (!open) return null;

  const handleAddIngredient = () => {
    setIngredients((prev) => [...prev, { id: createId("ing"), name: "", quantity: "" }]);
  };

  const handleRemoveIngredient = (id?: string) => {
    setIngredients((prev) => prev.filter((ing) => ing.id !== id));
  };

  const handleChangeIngredient = (id: string | undefined, field: "name" | "quantity", value: string) => {
    setIngredients((prev) =>
      prev.map((ing) => (ing.id === id ? { ...ing, [field]: value } : ing))
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedTitle = title.trim();
    if (!trimmedTitle) {
      // Lightweight validation: require a title.
      return;
    }

    const cleanedIngredients: Ingredient[] = ingredients
      .map((ing) => ({
        id: ing.id ?? createId("ing"),
        name: ing.name.trim(),
        quantity: ing.quantity.trim()
      }))
      .filter((ing) => ing.name.length > 0);

    const now = new Date().toISOString();

    const meal: Meal =
      initialMeal != null
        ? {
            ...initialMeal,
            title: trimmedTitle,
            ingredients: cleanedIngredients,
            updatedAt: now
          }
        : {
            id: createId("meal"),
            title: trimmedTitle,
            ingredients: cleanedIngredients,
            createdAt: now,
            updatedAt: now
          };

    onSave(meal);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-20 bg-black/60 flex items-end sm:items-center justify-center">
      <div className="w-full max-w-md bg-background rounded-t-2xl sm:rounded-2xl p-4 pb-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-base font-semibold">
            {initialMeal ? "Edit meal" : "New meal"}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="text-sm text-foreground/70 px-2 py-1 rounded-lg hover:bg-white/10"
          >
            Close
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium mb-1">Meal title</label>
            <input
              type="text"
              className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-foreground/60"
              placeholder="e.g. Grilled chicken salad"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-medium">Ingredients</label>
              <button
                type="button"
                onClick={handleAddIngredient}
                className="text-xs text-foreground px-2 py-1 rounded-full bg-white/10"
              >
                + Add ingredient
              </button>
            </div>

            <div className="space-y-2">
              {ingredients.map((ing) => (
                <div
                  key={ing.id}
                  className="flex items-start gap-2 bg-white/5 rounded-lg px-2 py-2"
                >
                  <div className="flex-1 space-y-1">
                    <input
                      type="text"
                      className="w-full rounded-md bg-transparent border border-white/10 px-2 py-1 text-xs outline-none focus:ring-1 focus:ring-foreground/60"
                      placeholder="Ingredient name"
                      value={ing.name}
                      onChange={(e) =>
                        handleChangeIngredient(ing.id, "name", e.target.value)
                      }
                    />
                    <input
                      type="text"
                      className="w-full rounded-md bg-transparent border border-white/10 px-2 py-1 text-xs outline-none focus:ring-1 focus:ring-foreground/60"
                      placeholder="Quantity (optional)"
                      value={ing.quantity}
                      onChange={(e) =>
                        handleChangeIngredient(ing.id, "quantity", e.target.value)
                      }
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveIngredient(ing.id)}
                    className="mt-1 text-xs text-foreground/60 px-1.5 py-1 rounded-full hover:bg-white/10"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-2 rounded-full bg-foreground text-background text-sm font-medium py-2.5"
          >
            {initialMeal ? "Save changes" : "Save meal"}
          </button>
        </form>
      </div>
    </div>
  );
}

