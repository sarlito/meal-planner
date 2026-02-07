"use client";

import React from "react";

type GymDayId = "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday";

type Exercise = {
  name: string;
  description: string;
  imageUrl: string;
};

type GymDay = {
  label: string;
  focus: string;
  type: "push" | "pull" | "legs";
  exercises: Exercise[];
};

const GYM_PLAN: Record<GymDayId, GymDay> = {
  monday: {
    label: "Monday",
    focus: "Push – Chest, Shoulders, Triceps",
    type: "push",
    exercises: [
      {
        name: "Barbell Bench Press",
        description: "Lie on a bench, lower the bar to mid-chest, press back up.",
        imageUrl: "https://images.pexels.com/photos/3837781/pexels-photo-3837781.jpeg?auto=compress&cs=tinysrgb&w=400"
      },
      {
        name: "Incline Dumbbell Press",
        description: "Press dumbbells up on a 30–45° bench, control the descent.",
        imageUrl: "https://images.pexels.com/photos/6456309/pexels-photo-6456309.jpeg?auto=compress&cs=tinysrgb&w=400"
      },
      {
        name: "Overhead Shoulder Press",
        description: "Press dumbbells from shoulder height to overhead, avoid arching the back.",
        imageUrl: "https://images.pexels.com/photos/6456220/pexels-photo-6456220.jpeg?auto=compress&cs=tinysrgb&w=400"
      },
      {
        name: "Cable Triceps Pushdown",
        description: "Keep elbows close to your sides, extend forearms down and control back up.",
        imageUrl: "https://images.pexels.com/photos/1552249/pexels-photo-1552249.jpeg?auto=compress&cs=tinysrgb&w=400"
      }
    ]
  },
  tuesday: {
    label: "Tuesday",
    focus: "Pull – Back, Biceps",
    type: "pull",
    exercises: [
      {
        name: "Lat Pulldown",
        description: "Pull the bar to your upper chest, squeeze your back, control the return.",
        imageUrl: "https://images.pexels.com/photos/6456091/pexels-photo-6456091.jpeg?auto=compress&cs=tinysrgb&w=400"
      },
      {
        name: "Seated Cable Row",
        description: "Sit tall, pull the handle toward your abdomen, keep shoulders down.",
        imageUrl: "https://images.pexels.com/photos/3768904/pexels-photo-3768904.jpeg?auto=compress&cs=tinysrgb&w=400"
      },
      {
        name: "Dumbbell Row",
        description: "Support one hand on a bench, pull the weight toward your hip, control down.",
        imageUrl: "https://images.pexels.com/photos/7676400/pexels-photo-7676400.jpeg?auto=compress&cs=tinysrgb&w=400"
      },
      {
        name: "Dumbbell Biceps Curl",
        description: "Curl the weights up with palms forward, avoid swinging your body.",
        imageUrl: "https://images.pexels.com/photos/6456300/pexels-photo-6456300.jpeg?auto=compress&cs=tinysrgb&w=400"
      }
    ]
  },
  wednesday: {
    label: "Wednesday",
    focus: "Legs – Quads, Hamstrings, Glutes",
    type: "legs",
    exercises: [
      {
        name: "Barbell Back Squat",
        description: "Stand shoulder-width, sit hips back and down, drive up through your heels.",
        imageUrl: "https://images.pexels.com/photos/3837780/pexels-photo-3837780.jpeg?auto=compress&cs=tinysrgb&w=400"
      },
      {
        name: "Romanian Deadlift",
        description: "Hinge at the hips with a slight knee bend, feel the stretch in hamstrings.",
        imageUrl: "https://images.pexels.com/photos/6456302/pexels-photo-6456302.jpeg?auto=compress&cs=tinysrgb&w=400"
      },
      {
        name: "Leg Press",
        description: "Press the platform away with heels, avoid locking out your knees.",
        imageUrl: "https://images.pexels.com/photos/6455906/pexels-photo-6455906.jpeg?auto=compress&cs=tinysrgb&w=400"
      },
      {
        name: "Walking Lunges",
        description: "Step forward, drop into a lunge, push through the front heel to step forward.",
        imageUrl: "https://images.pexels.com/photos/6456221/pexels-photo-6456221.jpeg?auto=compress&cs=tinysrgb&w=400"
      }
    ]
  },
  thursday: {
    label: "Thursday",
    focus: "Push – Chest, Shoulders, Triceps (variation)",
    type: "push",
    exercises: [
      {
        name: "Push-Ups",
        description: "Keep body in a straight line, lower chest toward floor, press back up.",
        imageUrl: "https://images.pexels.com/photos/4167788/pexels-photo-4167788.jpeg?auto=compress&cs=tinysrgb&w=400"
      },
      {
        name: "Dumbbell Flyes",
        description: "On a flat bench, open arms wide with slight elbow bend, squeeze chest to close.",
        imageUrl: "https://images.pexels.com/photos/4162486/pexels-photo-4162486.jpeg?auto=compress&cs=tinysrgb&w=400"
      },
      {
        name: "Lateral Raises",
        description: "Raise dumbbells to shoulder height with a slight elbow bend, control down.",
        imageUrl: "https://images.pexels.com/photos/3823039/pexels-photo-3823039.jpeg?auto=compress&cs=tinysrgb&w=400"
      },
      {
        name: "Overhead Triceps Extension",
        description: "With a dumbbell overhead, bend elbows to lower behind head, extend back up.",
        imageUrl: "https://images.pexels.com/photos/7676405/pexels-photo-7676405.jpeg?auto=compress&cs=tinysrgb&w=400"
      }
    ]
  },
  friday: {
    label: "Friday",
    focus: "Pull – Back, Biceps (variation)",
    type: "pull",
    exercises: [
      {
        name: "Pull-Ups or Assisted Pull-Ups",
        description: "Pull your chest toward the bar, control your descent.",
        imageUrl: "https://images.pexels.com/photos/6456090/pexels-photo-6456090.jpeg?auto=compress&cs=tinysrgb&w=400"
      },
      {
        name: "Face Pulls",
        description: "Pull cable rope toward your face, elbows high, squeeze rear shoulders.",
        imageUrl: "https://images.pexels.com/photos/6456075/pexels-photo-6456075.jpeg?auto=compress&cs=tinysrgb&w=400"
      },
      {
        name: "Hammer Curls",
        description: "Curl dumbbells with palms facing each other, control both up and down.",
        imageUrl: "https://images.pexels.com/photos/7676395/pexels-photo-7676395.jpeg?auto=compress&cs=tinysrgb&w=400"
      },
      {
        name: "Back Extensions",
        description: "On a back extension bench, hinge at the hips and extend to a neutral spine.",
        imageUrl: "https://images.pexels.com/photos/6455842/pexels-photo-6455842.jpeg?auto=compress&cs=tinysrgb&w=400"
      }
    ]
  },
  saturday: {
    label: "Saturday",
    focus: "Legs & Core – Lighter day",
    type: "legs",
    exercises: [
      {
        name: "Goblet Squats",
        description: "Hold a dumbbell at your chest, squat down keeping chest tall.",
        imageUrl: "https://images.pexels.com/photos/6456303/pexels-photo-6456303.jpeg?auto=compress&cs=tinysrgb&w=400"
      },
      {
        name: "Glute Bridges",
        description: "Lie on your back, drive hips up by squeezing glutes.",
        imageUrl: "https://images.pexels.com/photos/6456105/pexels-photo-6456105.jpeg?auto=compress&cs=tinysrgb&w=400"
      },
      {
        name: "Plank",
        description: "Hold a straight line from shoulders to heels, brace your core.",
        imageUrl: "https://images.pexels.com/photos/3823036/pexels-photo-3823036.jpeg?auto=compress&cs=tinysrgb&w=400"
      },
      {
        name: "Side Plank",
        description: "Support body on one forearm and side of foot, keep hips lifted.",
        imageUrl: "https://images.pexels.com/photos/6455973/pexels-photo-6455973.jpeg?auto=compress&cs=tinysrgb&w=400"
      }
    ]
  }
};

const ORDER: GymDayId[] = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

export function GymGuideSection() {
  return (
    <section className="space-y-4 pb-16">
      <h2 className="text-lg font-semibold">Weekly Gym Guide</h2>
      <p className="text-xs text-foreground/70">
        Push / pull / legs split from Monday to Saturday. Tap through each day and follow the
        pictures for form cues.
      </p>

      <div className="space-y-4">
        {ORDER.map((id) => {
          const day = GYM_PLAN[id];
          return (
            <div
              key={id}
              className="rounded-xl bg-white/5 border border-white/10 px-3 py-3 space-y-2"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-semibold">{day.label}</h3>
                  <p className="text-[11px] text-foreground/60">{day.focus}</p>
                </div>
                <span className="text-[10px] uppercase tracking-wide text-foreground/60">
                  {day.type}
                </span>
              </div>

              <div className="space-y-2 mt-1">
                {day.exercises.map((ex) => (
                  <div
                    key={ex.name}
                    className="flex gap-2 rounded-lg bg-black/30 overflow-hidden border border-white/5"
                  >
                    <div className="w-24 h-20 shrink-0 bg-black/40">
                      <img
                        src={ex.imageUrl}
                        alt={ex.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div className="flex-1 px-2 py-2">
                      <p className="text-xs font-semibold">{ex.name}</p>
                      <p className="text-[11px] text-foreground/70 mt-0.5">{ex.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

