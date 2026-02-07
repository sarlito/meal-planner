"use client";

import React, { useState } from "react";
import type { Meal } from "@/types/meal";
import type { WeeklyPlan } from "@/types/plan";
import { generateGroceryList } from "@/lib/grocery";

export interface GrocerySectionProps {
  meals: Meal[];
  plan: WeeklyPlan;
}

export function GrocerySection({ meals, plan }: GrocerySectionProps) {
  const items = generateGroceryList(meals, plan);
  const [checkedIds, setCheckedIds] = useState<Set<string>>(new Set());

  const toggleChecked = (id: string) => {
    setCheckedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <section className="space-y-4 pb-16">
      <h2 className="text-lg font-semibold">Grocery list</h2>
      <p className="text-xs text-foreground/70">
        This list is generated from your weekly plan. Check things off as you
        shop.
      </p>

      {items.length === 0 ? (
        <p className="text-sm text-foreground/70">
          No items yet. Assign meals to days in the Plan tab first.
        </p>
      ) : (
        <ul className="space-y-2">
          {items.map((item) => {
            const checked = checkedIds.has(item.id);
            return (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => toggleChecked(item.id)}
                  className={
                    "w-full flex items-center justify-between px-3 py-2 rounded-xl border text-sm " +
                    (checked
                      ? "bg-foreground text-background border-foreground"
                      : "bg-white/5 border-white/10")
                  }
                >
                  <div className="flex flex-col text-left">
                    <span className={checked ? "line-through" : ""}>{item.name}</span>
                    {item.quantity && (
                      <span
                        className={
                          "text-[11px] " +
                          (checked ? "text-background/80" : "text-foreground/70")
                        }
                      >
                        {item.quantity}
                      </span>
                    )}
                  </div>
                  <span className="text-xs opacity-70">
                    {checked ? "✓" : item.occurrences > 1 ? `x${item.occurrences}` : ""}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}

