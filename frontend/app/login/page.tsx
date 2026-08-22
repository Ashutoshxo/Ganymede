"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

export default function LoginPage() {
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: formData.get("username"),
          password: formData.get("password")
        })
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        setError(data.message || "Unable to log in. Please try again.");
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
        <p className="eyebrow">Welcome back</p>
        <h1>Log in</h1>
        <input name="username" type="text" placeholder="Username or email" required />
        <input name="password" type="password" placeholder="Password" required />
        {error && <p className="form-error" role="alert">{error}</p>}
        <button type="submit" disabled={isSubmitting}>{isSubmitting ? "Logging in..." : "Continue"}</button>
        <Link href="/register">Create an account</Link>
      </form>
    </section>
  );
}
