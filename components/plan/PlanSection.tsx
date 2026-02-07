"use client";

import React, { useState } from "react";
import type { Meal } from "@/types/meal";
import type { DayId, WeeklyPlan, MealSlot } from "@/types/plan";
import { DAY_ORDER } from "@/types/plan";
import { DayPlanCard } from "./DayPlanCard";
import { MealPickerModal } from "./MealPickerModal";

export interface PlanSectionProps {
  meals: Meal[];
  plan: WeeklyPlan;
  onUpdatePlan: (plan: WeeklyPlan) => void;
}

const DAY_LABELS: Record<DayId, string> = {
  monday: "Monday",
  tuesday: "Tuesday",
  wednesday: "Wednesday",
  thursday: "Thursday",
  friday: "Friday",
  saturday: "Saturday",
  sunday: "Sunday"
};

export function PlanSection({ meals, plan, onUpdatePlan }: PlanSectionProps) {
  const [pickerOpen, setPickerOpen] = useState(false);
  const [activeDay, setActiveDay] = useState<DayId | null>(null);
  const [activeSlot, setActiveSlot] = useState<MealSlot | null>(null);

  const handleAddMeal = (day: DayId, slot: MealSlot) => {
    setActiveDay(day);
    setActiveSlot(slot);
    setPickerOpen(true);
  };

  const handleSelectMeal = (mealId: string) => {
    if (!activeDay || !activeSlot) return;
    const dayMeals = plan.days[activeDay];
    onUpdatePlan({
      ...plan,
      days: {
        ...plan.days,
        [activeDay]: {
          ...dayMeals,
          [activeSlot]: mealId
        }
      }
    });
    setPickerOpen(false);
    setActiveSlot(null);
  };

  const handleClearSlot = (day: DayId, slot: MealSlot) => {
    const dayMeals = plan.days[day];
    onUpdatePlan({
      ...plan,
      days: {
        ...plan.days,
        [day]: {
          ...dayMeals,
          [slot]: null
        }
      }
    });
  };

  return (
    <section className="space-y-4 pb-16">
      <h2 className="text-lg font-semibold">Weekly plan</h2>
      <p className="text-xs text-foreground/70">
        Tap a day to add meals you’ve saved. You can assign the same meal to
        multiple days.
      </p>

      <div className="space-y-3">
        {DAY_ORDER.map((day) => (
          <DayPlanCard
            key={day}
            dayId={day}
            label={DAY_LABELS[day]}
            mealsBySlot={plan.days[day]}
            meals={meals}
            onAddMeal={handleAddMeal}
            onClearSlot={handleClearSlot}
          />
        ))}
      </div>

      <MealPickerModal
        open={pickerOpen}
        meals={meals}
        onSelect={handleSelectMeal}
        onClose={() => setPickerOpen(false)}
      />
    </section>
  );
}

