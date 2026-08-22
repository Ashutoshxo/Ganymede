"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

export default function RegisterPage() {
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: formData.get("username"),
          email: formData.get("email"),
          password1: formData.get("password1"),
          password2: formData.get("password2")
        })
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        const messages = Object.values(data.errors || {})
          .flatMap((fieldErrors) => (fieldErrors as { message: string }[]).map((item) => item.message));
        setError(messages[0] || data.message || "Unable to create your account.");
        setIsSubmitting(false);
        return;
      }

      window.location.href = "/dashboard";
    } catch {
      setError("Cannot connect to the server. Please try again.");
      setIsSubmitting(false);
    }
  }

  return (
    <section className="auth-page">
      <form className="auth-card" onSubmit={handleSubmit}>
        <p className="eyebrow">Start listening</p>
        <h1>Create account</h1>
        <input name="username" type="text" placeholder="Username" required />
        <input name="email" type="email" placeholder="Email" required />
        <input name="password1" type="password" placeholder="Password" required />
        <input name="password2" type="password" placeholder="Confirm password" required />
        {error && <p className="form-error" role="alert">{error}</p>}
        <button type="submit" disabled={isSubmitting}>{isSubmitting ? "Creating account..." : "Sign up"}</button>
        <Link href="/login">Already have an account?</Link>
      </form>
    </section>
  );
}
