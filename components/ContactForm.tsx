"use client";

import { FormEvent, useMemo, useState } from "react";

type SubmitState = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [state, setState] = useState<SubmitState>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [startedAt] = useState(() => Date.now());
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    role: "",
    message: "",
    website: "",
    turnstileToken: ""
  });

  const canSubmit = useMemo(
    () =>
      Boolean(
        state !== "submitting" && formData.name.trim() && formData.email.trim() && formData.message.trim()
      ),
    [formData.email, formData.message, formData.name, state]
  );

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canSubmit) {
      return;
    }

    setState("submitting");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          startedAt: String(startedAt)
        })
      });

      const payload = (await response.json()) as { error?: string; success?: boolean };
      if (!response.ok || !payload.success) {
        throw new Error(payload.error || "Unable to send message.");
      }

      setState("success");
      setFormData({
        name: "",
        email: "",
        company: "",
        role: "",
        message: "",
        website: "",
        turnstileToken: ""
      });
    } catch (error) {
      setState("error");
      setErrorMessage(error instanceof Error ? error.message : "Something went wrong.");
    }
  }

  return (
    <form className="contact-form" onSubmit={onSubmit}>
      <label className="field">
        Name
        <input
          autoComplete="name"
          onChange={(event) => setFormData((current) => ({ ...current, name: event.target.value }))}
          required
          type="text"
          value={formData.name}
        />
      </label>

      <label className="field">
        Work email
        <input
          autoComplete="email"
          onChange={(event) => setFormData((current) => ({ ...current, email: event.target.value }))}
          required
          type="email"
          value={formData.email}
        />
      </label>

      <div className="field-row">
        <label className="field">
          Company
          <input
            autoComplete="organization"
            onChange={(event) => setFormData((current) => ({ ...current, company: event.target.value }))}
            type="text"
            value={formData.company}
          />
        </label>

        <label className="field">
          Role
          <input
            onChange={(event) => setFormData((current) => ({ ...current, role: event.target.value }))}
            placeholder="Hiring Manager, Recruiter, Founder..."
            type="text"
            value={formData.role}
          />
        </label>
      </div>

      <label className="field">
        Project or role context
        <textarea
          onChange={(event) => setFormData((current) => ({ ...current, message: event.target.value }))}
          placeholder="Tell me what you're hiring for or the workflow you need solved."
          required
          rows={6}
          value={formData.message}
        />
      </label>

      <label className="field-honeypot" aria-hidden="true" tabIndex={-1}>
        Leave this field empty
        <input
          autoComplete="off"
          onChange={(event) => setFormData((current) => ({ ...current, website: event.target.value }))}
          tabIndex={-1}
          type="text"
          value={formData.website}
        />
      </label>

      <button className="btn btn-primary" disabled={!canSubmit} type="submit">
        {state === "submitting" ? "Sending..." : "Send Message"}
      </button>

      {state === "success" ? (
        <p className="form-success">Thanks, your message is in. I will follow up shortly.</p>
      ) : null}

      {state === "error" ? <p className="form-error">{errorMessage}</p> : null}

      <p className="meta">Spam protection is enabled via validation, honeypot, and submission throttling.</p>
    </form>
  );
}
