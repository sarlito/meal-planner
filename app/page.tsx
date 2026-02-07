"use client";

import React, { useEffect, useState } from "react";
import { MobileShell } from "@/components/layout/MobileShell";
import type { Meal } from "@/types/meal";
import type { WeeklyPlan, DayMeals, MealSlot } from "@/types/plan";
import { loadMeals, loadWeeklyPlan, saveMeals, saveWeeklyPlan } from "@/lib/storage";
import { MealsSection } from "@/components/meals/MealsSection";
import { PlanSection } from "@/components/plan/PlanSection";
import { GrocerySection } from "@/components/grocery/GrocerySection";
import { GymGuideSection } from "@/components/gym/GymGuideSection";

type TabId = "meals" | "plan" | "grocery";
type Mode = "none" | "meal" | "gym";

export default function HomePage() {
  const [mode, setMode] = useState<Mode>("none");
  const [activeTab, setActiveTab] = useState<TabId>("meals");
  const [meals, setMeals] = useState<Meal[]>([]);
  const [plan, setPlan] = useState<WeeklyPlan | null>(null);

  // Load from localStorage on first client render.
  useEffect(() => {
    setMeals(loadMeals());
    setPlan(loadWeeklyPlan());
  }, []);

  // Persist when meals / plan change.
  useEffect(() => {
    if (meals) {
      saveMeals(meals);
    }
  }, [meals]);

  useEffect(() => {
    if (plan) {
      saveWeeklyPlan(plan);
    }
  }, [plan]);

  const handleUpsertMeal = (meal: Meal) => {
    setMeals((prev) => {
      const existingIndex = prev.findIndex((m) => m.id === meal.id);
      if (existingIndex === -1) {
        return [...prev, meal];
      }
      const next = [...prev];
      next[existingIndex] = meal;
      return next;
    });
  };

  const handleDeleteMeal = (mealId: string) => {
    setMeals((prev) => prev.filter((m) => m.id !== mealId));
    // Also clean up from plan
    setPlan((prev) => {
      if (!prev) return prev;
      const newDays: WeeklyPlan["days"] = { ...prev.days };
      (Object.keys(newDays) as (keyof WeeklyPlan["days"])[]).forEach((dayKey) => {
        const day = newDays[dayKey];
        const slots: MealSlot[] = ["breakfast", "lunch", "dinner"];
        const updated: DayMeals = { ...day };
        slots.forEach((slot) => {
          if (updated[slot] === mealId) {
            updated[slot] = null;
          }
        });
        newDays[dayKey] = updated;
      });
      return { ...prev, days: newDays };
    });
  };

  const handleUpdatePlan = (nextPlan: WeeklyPlan) => {
    setPlan(nextPlan);
  };

  // Avoid rendering plan/grocery until initial load to keep logic simple.
  const resolvedPlan: WeeklyPlan | null = plan;

  if (mode === "none") {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col">
        <header className="px-4 pt-4 pb-3 border-b border-white/10">
          <h1 className="text-xl font-semibold tracking-tight">Your Weekly Dashboard</h1>
          <p className="text-xs text-foreground/70 mt-1">
            Choose whether you want to plan your meals or follow a gym guide.
          </p>
        </header>
        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-md px-4 py-6 space-y-4">
            <button
              type="button"
              onClick={() => setMode("meal")}
              className="w-full rounded-2xl bg-white/5 border border-white/10 px-4 py-4 text-left"
            >
              <h2 className="text-base font-semibold">Meal Planner</h2>
              <p className="text-xs text-foreground/70 mt-1">
                Plan breakfast, lunch, and dinner for the week and auto-generate a grocery list.
              </p>
            </button>

            <button
              type="button"
              onClick={() => setMode("gym")}
              className="w-full rounded-2xl bg-white/5 border border-white/10 px-4 py-4 text-left"
            >
              <h2 className="text-base font-semibold">Gym Guide</h2>
              <p className="text-xs text-foreground/70 mt-1">
                Follow a simple push / pull / legs routine from Monday to Saturday with picture
                guides.
              </p>
            </button>
          </div>
        </main>
      </div>
    );
  }

  if (mode === "gym") {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col">
        <header className="px-4 pt-4 pb-3 border-b border-white/10 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold tracking-tight">Gym Guide</h1>
            <p className="text-xs text-foreground/70 mt-1">
              Push / pull / legs routine with photos for each exercise.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setMode("none")}
            className="text-[11px] px-2 py-1 rounded-full bg-white/10 text-foreground/80"
          >
            Dashboard
          </button>
        </header>
        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-md px-4 py-4">
            <GymGuideSection />
          </div>
        </main>
      </div>
    );
  }

  return (
    <MobileShell activeTab={activeTab} onChangeTab={setActiveTab}>
      {activeTab === "meals" && (
        <MealsSection
          meals={meals}
          onUpsertMeal={handleUpsertMeal}
          onDeleteMeal={handleDeleteMeal}
        />
      )}

      {activeTab === "plan" && resolvedPlan && (
        <PlanSection meals={meals} plan={resolvedPlan} onUpdatePlan={handleUpdatePlan} />
      )}

      {activeTab === "grocery" && resolvedPlan && (
        <GrocerySection meals={meals} plan={resolvedPlan} />
      )}
    </MobileShell>
  );
}

