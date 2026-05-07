"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const roles = [
  "Frontend Developer",
  "Backend Developer",
  "Fullstack Developer",
  "DevOps Engineer",
  "Mobile Developer",
  "UI/UX Designer",
  "Student",
];

export default function OnboardingRolePage() {
  const router = useRouter();
  const [selected, setSelected] = useState<string>("");

  return (
    <div id="onboarding">
    <section className="onboarding-wrapper">
      <aside className="onboarding-sidebar">
        <div>
          <p className="onboarding-sidebar-logo">DevEvents</p>
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
              <div className="onboarding-step-dot active">3</div>
              <div className="flex flex-col gap-0.5">
                <span className="onboarding-step-name active">Your role</span>
                <span className="onboarding-step-sub">In progress</span>
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
        <p className="onboarding-sidebar-footer">CoddeConf © 2026</p>
      </aside>

      <div className="onboarding-main">
        <div className="flex flex-col flex-1 justify-center">
          <p className="onboarding-tag">Step 3 of 4</p>
          <h3>What best describes your role?</h3>
          <p className="onboarding-sub">Pick one that fits you best.</p>
          <div className="onboarding-toggle-group">
            {roles.map((role) => (
              <button
                key={role}
                onClick={() => setSelected(role)}
                className={`onboarding-toggle ${selected === role ? "active" : ""}`}
              >
                {role}
              </button>
            ))}
          </div>
        </div>
        <div className="onboarding-actions">
          <button onClick={() => router.push("/onboarding/interests")} className="onboarding-skip">
            Skip for now
          </button>
          <button onClick={() => router.push("/onboarding/interests")} className="onboarding-btn">
            Continue
          </button>
        </div>
      </div>
    </section>
    </div>
  );
}