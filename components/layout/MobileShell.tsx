 "use client";
 
 import React from "react";

type TabId = "meals" | "plan" | "grocery";

export interface MobileShellProps {
  activeTab: TabId;
  onChangeTab: (tab: TabId) => void;
  children: React.ReactNode;
}

const tabs: { id: TabId; label: string }[] = [
  { id: "meals", label: "Meals" },
  { id: "plan", label: "Plan" },
  { id: "grocery", label: "Grocery" }
];

export function MobileShell({ activeTab, onChangeTab, children }: MobileShellProps) {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <header className="px-4 pt-4 pb-3 border-b border-white/10">
        <h1 className="text-xl font-semibold tracking-tight">Weekly Meal Planner</h1>
        <p className="text-xs text-foreground/70 mt-1">
          Plan your week and auto-generate a grocery list.
        </p>
      </header>

      <main className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-md px-4 py-4">{children}</div>
      </main>

      <nav className="border-t border-white/10 bg-background/95 backdrop-blur">
        <div className="mx-auto max-w-md flex">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onChangeTab(tab.id)}
                className={
                  "flex-1 py-3 text-xs font-medium flex flex-col items-center justify-center focus:outline-none " +
                  (isActive ? "text-foreground" : "text-foreground/60")
                }
              >
                <span
                  className={
                    "px-3 py-1 rounded-full " +
                    (isActive
                      ? "bg-foreground text-background"
                      : "bg-white/5")
                  }
                >
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}

