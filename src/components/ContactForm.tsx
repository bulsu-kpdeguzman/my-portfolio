"use client";

import { useState } from "react";
import { site } from "@/data/site";

type Status = "idle" | "sending" | "success" | "error";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, message, website }),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) throw new Error(data.error ?? "Send failed.");
      setStatus("success");
      setName("");
      setMessage("");
    } catch {
      setStatus("error");
    }
  };

  return (
    <form
      onSubmit={submit}
      className="rounded-md border border-line bg-surface p-5"
    >
      <label className="block font-mono text-xs text-faint">
        $ who is this
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="your name"
          className="mt-1 block w-full rounded border border-line bg-bg px-3 py-2 font-sans text-sm text-text placeholder:text-faint focus:border-accent focus:outline-none"
        />
      </label>
      <label className="mt-4 block font-mono text-xs text-faint">
        $ message
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={5}
          required
          placeholder="what are you building?"
          className="mt-1 block w-full resize-y rounded border border-line bg-bg px-3 py-2 font-sans text-sm text-text placeholder:text-faint focus:border-accent focus:outline-none"
        />
      </label>
      <input
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />
      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-5 rounded bg-accent px-5 py-2.5 font-mono text-sm text-white transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        {status === "sending" ? "sending…" : "send ↗"}
      </button>
      {status === "success" ? (
        <p className="mt-3 font-mono text-xs text-ok">
          ✓ sent — I&apos;ll reply from {site.email}.
        </p>
      ) : null}
      {status === "error" ? (
        <p className="mt-3 font-mono text-xs text-danger">
          ✗ failed to send — try the email link above, or try again later.
        </p>
      ) : null}
      <p className="mt-3 font-mono text-xs text-faint">
        delivered to my inbox via Resend — no data stored.
      </p>
    </form>
  );
}