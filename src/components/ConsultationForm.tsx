"use client";

import { useState } from "react";
import { consultationServices } from "@/data/site";
import { Button, cn } from "./ui";
import { ArrowRight, Check } from "./Icons";

type Errors = Partial<Record<string, string>>;

export default function ConsultationForm({
  defaultService,
  variant = "surface",
}: {
  defaultService?: string;
  /** "glass" renders light-on-dark for use over the video banner; "plain"
   *  drops the card around the form, for use inside the pop-up. */
  variant?: "surface" | "glass" | "plain";
}) {
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">(
    "idle"
  );
  const [reference, setReference] = useState("");

  const glass = variant === "glass";

  function validate(data: FormData): Errors {
    const next: Errors = {};
    const name = String(data.get("name") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();

    if (name.length < 2) next.name = "Please enter your full name.";
    if (!/^(\+?91[- ]?)?[6-9]\d{9}$/.test(phone.replace(/[\s-]/g, "")))
      next.phone = "Enter a valid 10-digit mobile number.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email))
      next.email = "Enter a valid email address.";
    if (!data.get("service")) next.service = "Select the service you need.";

    return next;
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const found = validate(data);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setStatus("sending");
    try {
      const res = await fetch("/api/consultation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(data.entries())),
      });
      if (!res.ok) throw new Error("Request failed");
      const json = await res.json();
      setReference(json.reference ?? "");
      setStatus("done");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  const shell = glass
    ? "rounded-3xl border border-white/15 bg-white/10 p-6 backdrop-blur-xl shadow-2xl shadow-black/40 sm:p-7"
    : variant === "plain"
      ? ""
      : "surface rounded-2xl p-6 sm:p-8";

  if (status === "done") {
    return (
      <div className={cn(shell, "text-center")}>
        <span
          className={cn(
            "mx-auto grid h-14 w-14 place-items-center rounded-full",
            glass ? "bg-accent-500 text-ink" : "bg-brand-600/10 text-brand-600"
          )}
        >
          <Check className="h-7 w-7" />
        </span>
        <h2
          className={cn("mt-5 text-xl font-bold", glass && "text-white")}
        >
          Request received
        </h2>
        <p
          className={cn(
            "mx-auto mt-3 max-w-md text-sm leading-relaxed",
            glass ? "text-white/70" : "muted"
          )}
        >
          One of our consultants will call you back during working hours. Your
          reference number is{" "}
          <span className={glass ? "font-semibold text-accent-400" : "font-semibold text-brand-600"}>
            {reference}
          </span>
          .
        </p>
        <Button
          className="mt-7"
          variant={glass ? "accent" : "outline"}
          onClick={() => setStatus("idle")}
        >
          Send another request
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className={shell}>
      {glass ? (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-white">
            Request a Consultation
          </h2>
          <p className="mt-1 text-xs text-white/60">
            Share your requirement and our experts will get back to you.
          </p>
        </div>
      ) : null}

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full Name" name="name" error={errors.name} glass={glass}>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Your full name"
            className={inputClass(errors.name, glass)}
          />
        </Field>

        <Field label="Phone Number" name="phone" error={errors.phone} glass={glass}>
          <input
            id="phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="84548 16913"
            className={inputClass(errors.phone, glass)}
          />
        </Field>

        <Field label="Email" name="email" error={errors.email} glass={glass}>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@company.com"
            className={inputClass(errors.email, glass)}
          />
        </Field>

        <Field
          label="Service Needed"
          name="service"
          error={errors.service}
          glass={glass}
        >
          <select
            id="service"
            name="service"
            defaultValue={defaultService ?? ""}
            className={inputClass(errors.service, glass)}
          >
            <option value="" disabled>
              Select a service
            </option>
            {consultationServices.map((s) => (
              <option key={s} value={s} className="text-ink">
                {s}
              </option>
            ))}
          </select>
        </Field>

        <div className="sm:col-span-2">
          <Field label="Message" name="message" glass={glass}>
            <textarea
              id="message"
              name="message"
              rows={glass ? 3 : 4}
              placeholder="Tell us briefly what you need help with."
              className={inputClass(undefined, glass)}
            />
          </Field>
        </div>
      </div>

      {status === "error" ? (
        <p
          className={cn(
            "mt-5 rounded-xl px-4 py-3 text-sm",
            glass
              ? "border border-red-400/40 bg-red-500/15 text-red-100"
              : "border border-red-300 bg-red-50 text-red-700 dark:border-red-900 dark:bg-red-950/40 dark:text-red-300"
          )}
        >
          Something went wrong sending your request. Please call us instead and
          we will take the details on the phone.
        </p>
      ) : null}

      <Button
        type="submit"
        size="lg"
        variant={glass ? "accent" : "primary"}
        disabled={status === "sending"}
        className="mt-6 w-full"
      >
        {status === "sending" ? "Sending..." : "Submit Request"}
        <ArrowRight className="h-4 w-4" />
      </Button>

      <p
        className={cn(
          "mt-4 text-center text-xs",
          glass ? "text-white/50" : "muted"
        )}
      >
        No obligation. We respond during working hours.
      </p>
    </form>
  );
}

function inputClass(error?: string, glass?: boolean) {
  return cn(
    "w-full rounded-xl border px-4 py-3 text-sm outline-none transition-colors",
    glass
      ? "border-white/20 bg-white/10 text-white placeholder:text-white/45 focus:border-accent-400"
      : "bg-transparent placeholder:text-[var(--fg-muted)] focus:border-brand-500",
    error && (glass ? "border-red-400" : "border-red-400")
  );
}

function Field({
  label,
  name,
  error,
  glass,
  children,
}: {
  label: string;
  name: string;
  error?: string;
  glass?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className={cn(
          "mb-2 block text-sm font-medium",
          glass && "text-white/85"
        )}
      >
        {label}
      </label>
      {children}
      {error ? (
        <p
          className={cn(
            "mt-1.5 text-xs",
            glass ? "text-red-300" : "text-red-600 dark:text-red-400"
          )}
        >
          {error}
        </p>
      ) : null}
    </div>
  );
}
