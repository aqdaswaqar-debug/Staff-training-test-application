"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EntryPage() {
  const router = useRouter();
  const [employeeId, setEmployeeId] = useState("");
  const [name, setName] = useState("");
  const [branch, setBranch] = useState("");
  const [error, setError] = useState("");
  const [checking, setChecking] = useState(false);

  async function handleStart(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!employeeId.trim() || !name.trim() || !branch.trim()) {
      setError("Please fill in all three fields to continue.");
      return;
    }

    setChecking(true);
    try {
      const res = await fetch("/api/check-id", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ employeeId: employeeId.trim() }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong. Please try again.");
        setChecking(false);
        return;
      }

      if (data.used) {
        setError(
          "This Employee ID has already submitted the test. Each employee can attempt the test only once."
        );
        setChecking(false);
        return;
      }

      sessionStorage.setItem(
        "berkowits_candidate",
        JSON.stringify({ employeeId: employeeId.trim(), name: name.trim(), branch: branch.trim() })
      );
      router.push("/test");
    } catch {
      setError("Could not connect right now. Please check your internet connection and try again.");
      setChecking(false);
    }
  }

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-5 py-10" style={{ background: "var(--color-cream)" }}>
      <div
        className="w-full max-w-md rounded-2xl px-7 py-9 sm:px-9 sm:py-10"
        style={{ background: "var(--color-cream-card)", border: "1px solid var(--color-line)", boxShadow: "0 1px 3px rgba(20,48,46,0.06)" }}
      >
        <div className="mb-7 text-center">
          <div
            className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full"
            style={{ background: "var(--color-teal)" }}
          >
            <span style={{ color: "var(--color-cream)", fontFamily: "var(--font-serif)", fontSize: "20px", fontWeight: 700 }}>B</span>
          </div>
          <p className="text-xs font-medium uppercase tracking-wider" style={{ color: "var(--color-teal)", letterSpacing: "0.08em" }}>
            Berkowits Hair &amp; Skin Clinic
          </p>
          <h1
            className="mt-2 text-2xl font-semibold"
            style={{ fontFamily: "var(--font-serif)", color: "var(--color-ink)" }}
          >
            Hair Loss Knowledge Test
          </h1>
          <p className="mt-2 text-sm" style={{ color: "var(--color-ink)", opacity: 0.65 }}>
            25 questions &middot; 30 seconds each &middot; one attempt only
          </p>
        </div>

        <form onSubmit={handleStart} className="space-y-4">
          <Field label="Employee ID" value={employeeId} onChange={setEmployeeId} placeholder="e.g. BWE1024" autoFocus />
          <Field label="Full name" value={name} onChange={setName} placeholder="Your full name" />
          <Field label="Branch" value={branch} onChange={setBranch} placeholder="e.g. Andheri West" />

          {error && (
            <div
              className="rounded-lg px-4 py-3 text-sm"
              style={{ background: "#FBEDEA", color: "var(--color-error)", border: "1px solid #E8C5BE" }}
              role="alert"
            >
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={checking}
            className="focus-ring mt-2 w-full rounded-lg px-5 py-3.5 text-sm font-semibold transition-opacity disabled:opacity-60"
            style={{ background: "var(--color-teal)", color: "white" }}
          >
            {checking ? "Checking…" : "Begin test"}
          </button>
        </form>

        <p className="mt-6 text-center text-xs leading-relaxed" style={{ color: "var(--color-ink)", opacity: 0.5 }}>
          This test will request camera access to verify your presence during the assessment.
          Each question is timed — once answered or timed out, you cannot return to it.
        </p>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  autoFocus,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  autoFocus?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium" style={{ color: "var(--color-ink)" }}>
        {label}
      </span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoFocus={autoFocus}
        className="focus-ring w-full rounded-lg px-4 py-3 text-sm"
        style={{ border: "1px solid var(--color-line)", background: "white", color: "var(--color-ink)" }}
      />
    </label>
  );
}
