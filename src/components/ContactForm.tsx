"use client";

import { useState } from "react";
import { site } from "@/data/site";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent("Portfolio: " + (name || "hello"));
    const body = encodeURIComponent(`${message}\n\n— ${name}`);
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
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
      <button
        type="submit"
        className="mt-5 rounded bg-accent px-5 py-2.5 font-mono text-sm text-white transition-opacity hover:opacity-90"
      >
        send via email ↗
      </button>
      <p className="mt-3 font-mono text-xs text-faint">
        opens your mail client — no data stored.
      </p>
    </form>
  );
}
