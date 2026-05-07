"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const goals = [
  "Discover new events",
  "Network with developers",
  "Learn new skills",
];

export default function OnboardingGoalsPage() {
  const router = useRouter();
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (goal: string) => {
    setSelected((prev) =>
      prev.includes(goal) ? prev.filter((g) => g !== goal) : [...prev, goal]
    );
  };

  return (
    <div id="onboarding">
    <section className="onboarding-wrapper">
      <aside className="onboarding-sidebar">
        <div>
          <p className="onboarding-sidebar-logo">CoddeConf</p>
          <div className="onboarding-steps">
            <div className="onboarding-step-item">
              <div className="onboarding-step-dot done">✓</div>
              <div className="flex flex-col gap-0.5">
                <span className="onboarding-step-name">Account</span>
                <span className="onboarding-step-sub">Created</span>
              </div>
            </div>
            <div className="onboarding-step-item">
              <div className="onboarding-step-dot active">2</div>
              <div className="flex flex-col gap-0.5">
                <span className="onboarding-step-name active">Your goals</span>
                <span className="onboarding-step-sub">In progress</span>
              </div>
            </div>
            <div className="onboarding-step-item">
              <div className="onboarding-step-dot">3</div>
              <div className="flex flex-col gap-0.5">
                <span className="onboarding-step-name">Your role</span>
                <span className="onboarding-step-sub">Pending</span>
              </div>
            </div>
            <div className="onboarding-step-item">
              <div className="onboarding-step-dot">4</div>
              <div className="flex flex-col gap-0.5">
                <span className="onboarding-step-name">Interests</span>
                <span className="onboarding-step-sub">Pending</span>
              </div>
            </div>
          </div>
        </div>
        <p className="onboarding-sidebar-footer">CodeConf © 2026</p>
      </aside>

      <div className="onboarding-main">
        <div className="flex flex-col flex-1 justify-center">
          <p className="onboarding-tag">Step 2 of 4</p>
          <h3 className="text-[30px]">What can CoddeConf help you with?</h3>
          <p className="onboarding-sub">
            Pick everything that applies — we&apos;ll tailor your experience around it.
          </p>
          <div className="onboarding-toggle-group">
            {goals.map((goal) => (
              <button
                key={goal}
                onClick={() => toggle(goal)}
                className={`onboarding-toggle ${selected.includes(goal) ? "active" : ""}`}
              >
                {goal}
              </button>
            ))}
          </div>
        </div>
        <div className="onboarding-actions">
          <button onClick={() => router.push("/onboarding/role")} className="onboarding-skip">
            Skip for now
          </button>
          <button onClick={() => router.push("/onboarding/role")} className="onboarding-btn">
            Continue
          </button>
        </div>
      </div>
      </section>
      </div>
  );
}