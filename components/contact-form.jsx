"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Check } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import FlipText from "@/components/flip-text";
import { CONTACT, PROJECT_TYPES } from "@/lib/data";

const EMPTY = {
  name: "",
  email: "",
  company: "",
  type: "",
  budget: "",
  message: "",
};

const BUDGETS = [
  "Under £25k",
  "£25k - £75k",
  "£75k - £200k",
  "£200k +",
  "Not sure yet",
];

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export default function ContactForm() {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const timerRef = useRef(null);

  useEffect(() => () => window.clearTimeout(timerRef.current), []);

  const update = (field) => (event) => {
    const { value } = event.target;
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) =>
      current[field] ? { ...current, [field]: undefined } : current,
    );
  };

  const validate = () => {
    const next = {};

    if (!values.name.trim()) next.name = "Tell us who we are talking to.";
    if (!values.email.trim()) {
      next.email = "We need an address to reply to.";
    } else if (!EMAIL_PATTERN.test(values.email.trim())) {
      next.email = "That address looks incomplete.";
    }
    if (!values.type) next.type = "Pick whichever is closest.";
    if (values.message.trim().length < 12) {
      next.message = "A sentence or two is plenty to start with.";
    }

    return next;
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const next = validate();
    setErrors(next);

    const fields = Object.keys(next);
    if (fields.length > 0) {
      const input = document.querySelector(`[data-field="${fields[0]}"]`);
      input?.focus();
      return;
    }

    setStatus("sending");
    timerRef.current = window.setTimeout(() => setStatus("sent"), 900);
  };

  const reset = () => {
    setValues(EMPTY);
    setErrors({});
    setStatus("idle");
  };

  if (status === "sent") {
    return (
      <div className="border border-lime/40 bg-lime/[0.05] p-6 sm:p-8">
        <p className="label flex items-center gap-3 text-lime">
          <Check className="size-4" aria-hidden="true" />
          Message sent
        </p>

        <h3 className="display-condensed mt-5 font-display text-3xl font-extrabold uppercase text-bone">
          Thank you for your message
        </h3>

        <p className="mt-4 max-w-[46ch] text-sm leading-relaxed text-ash">
          We&apos;ll be in touch shortly. If it&apos;s urgent, please email{" "}
          <a href={CONTACT.emailHref} className="link-underline text-bone">
            {CONTACT.email}
          </a>
          .
        </p>

        <button
          type="button"
          onClick={reset}
          className="flip-host label mt-8 inline-flex items-center gap-2 border border-bone/25 px-4 py-3 text-bone transition-colors duration-300 hover:border-lime hover:text-lime"
        >
          <FlipText text="Send another message" />
        </button>
      </div>
    );
  }

  const sending = status === "sending";

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <Field
          id="contact-name"
          label="Name"
          error={errors.name}
          required
        >
          <Input
            data-field="name"
            id="contact-name"
            name="name"
            autoComplete="name"
            value={values.name}
            onChange={update("name")}
            className="h-10"
            aria-invalid={Boolean(errors.name) || undefined}
            aria-describedby={errors.name ? "contact-name-error" : undefined}
          />
        </Field>

        <Field
          id="contact-email"
          label="Email"
          error={errors.email}
          required
        >
          <Input
            data-field="email"
            id="contact-email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            value={values.email}
            onChange={update("email")}
            className="h-10"
            aria-invalid={Boolean(errors.email) || undefined}
            aria-describedby={errors.email ? "contact-email-error" : undefined}
          />
        </Field>

        <Field id="contact-company" label="Company">
          <Input
            data-field="company"
            id="contact-company"
            name="company"
            autoComplete="organization"
            value={values.company}
            onChange={update("company")}
            className="h-10"
          />
        </Field>

        <Field id="contact-budget" label="Budget">
          <select
            data-field="budget"
            id="contact-budget"
            name="budget"
            value={values.budget}
            onChange={update("budget")}
            className="h-10 w-full rounded-lg border border-input bg-transparent px-3 text-base text-bone outline-none transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 md:text-sm dark:bg-input/30"
          >
            <option value="">Select a range</option>
            {BUDGETS.map((budget) => (
              <option key={budget} value={budget} className="bg-coal">
                {budget}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field id="contact-type" label="Project type" error={errors.type} required>
        <select
          data-field="type"
          id="contact-type"
          name="type"
          value={values.type}
          onChange={update("type")}
          aria-invalid={Boolean(errors.type) || undefined}
          aria-describedby={errors.type ? "contact-type-error" : undefined}
          className="h-10 w-full rounded-lg border border-input bg-transparent px-3 text-base text-bone outline-none transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 md:text-sm dark:bg-input/30"
        >
          <option value="">Select a type</option>
          {PROJECT_TYPES.map((type) => (
            <option key={type} value={type} className="bg-coal">
              {type}
            </option>
          ))}
        </select>
      </Field>

      <Field
        id="contact-message"
        label="The brief"
        error={errors.message}
        required
      >
        <Textarea
          data-field="message"
          id="contact-message"
          name="message"
          rows={5}
          value={values.message}
          onChange={update("message")}
          className="min-h-[9rem]"
          aria-invalid={Boolean(errors.message) || undefined}
          aria-describedby={errors.message ? "contact-message-error" : undefined}
        />
      </Field>

      <div className="flex flex-wrap items-center gap-5">
        <button
          type="submit"
          disabled={sending}
          className="flip-host group inline-flex items-center gap-3 border border-bone bg-bone px-6 py-3.5 text-void transition-colors duration-300 hover:border-lime hover:bg-lime disabled:cursor-wait disabled:opacity-70"
        >
          <FlipText text={sending ? "Sending…" : "Send the brief"} className="label" />
          <ArrowUpRight
            className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            aria-hidden="true"
          />
        </button>

        <p className="label max-w-[26ch] text-smoke" role="status">
          {status === "sending"
            ? "Working…"
            : "We'll get back to you shortly."}
        </p>
      </div>
    </form>
  );
}

function Field({ id, label, error, required, children }) {
  return (
    <div className="flex flex-col gap-2.5">
      <label htmlFor={id} className="label flex items-center gap-2 text-smoke">
        {label}
        {required ? <span className="text-lime">*</span> : null}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="text-xs text-ember">
          {error}
        </p>
      ) : null}
    </div>
  );
}
