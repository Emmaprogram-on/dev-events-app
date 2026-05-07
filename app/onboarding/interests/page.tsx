"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const interests = [
  "Web Development",
  "AI / ML",
  "Web3 / Blockchain",
  "Open Source",
  "Cloud & DevOps",
  "Cybersecurity",
  "Mobile Dev",
  "Game Dev",
  "UI / UX Design",
  "Data Engineering",
  "Developer Tools",
];

export default function OnboardingInterestsPage() {
  const router = useRouter();
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (interest: string) => {
    setSelected((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : [...prev, interest]
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
              <div className="onboarding-step-dot done">✓</div>
              <div className="flex flex-col gap-0.5">
                <span className="onboarding-step-name">Your goals</span>
                <span className="onboarding-step-sub">Done</span>
              </div>
            </div>
            <div className="onboarding-step-item">
              <div className="onboarding-step-dot done">✓</div>
              <div className="flex flex-col gap-0.5">
                <span className="onboarding-step-name">Your role</span>
                <span className="onboarding-step-sub">Done</span>
              </div>
            </div>
            <div className="onboarding-step-item">
              <div className="onboarding-step-dot active">4</div>
              <div className="flex flex-col gap-0.5">
                <span className="onboarding-step-name active">Interests</span>
                <span className="onboarding-step-sub">In progress</span>
              </div>
            </div>
          </div>
        </div>
        <p className="onboarding-sidebar-footer">CoddeConf © 2026</p>
      </aside>

      <div className="onboarding-main">
        <div className="flex flex-col flex-1 justify-center">
          <p className="onboarding-tag">Step 4 of 4</p>
          <h3>What are your interests?</h3>
          <p className="onboarding-sub">
            Pick as many as you like — we&apos;ll surface the most relevant events for you.
          </p>
          <div className="onboarding-toggle-group">
            {interests.map((interest) => (
              <button
                key={interest}
                onClick={() => toggle(interest)}
                className={`onboarding-toggle ${selected.includes(interest) ? "active" : ""}`}
              >
                {interest}
              </button>
            ))}
          </div>
        </div>
        <div className="onboarding-actions">
          <button onClick={() => router.push("/")} className="onboarding-btn">
            Finish
          </button>
        </div>
      </div>
      </section>
      </div>
  );
}