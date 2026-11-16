"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import Image from "next/image";
import CopyEmail from "@/components/about/CopyEmail";
import LocalTime from "@/components/ui/LocalTime";
import { activeSocials, site } from "@/lib/site";

// Web3Forms delivers submissions to the inbox the key was created for.
// The access key is designed to be public, so it can live in client code.
const WEB3FORMS = {
  endpoint: "https://api.web3forms.com/submit",
  accessKey: process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ?? "",
};

type Status = "idle" | "sending" | "sent" | "error";

const emptyForm = { name: "", email: "", message: "", botcheck: false };

const Contact = () => {
  const [form, setForm] = useState(emptyForm);
  const [status, setStatus] = useState<Status>("idle");

  const handleChange = ({ target }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = target instanceof HTMLInputElement && target.type === "checkbox" ? target.checked : target.value;
    setForm((prev) => ({ ...prev, [target.name]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("sending");

    try {
      const response = await fetch(WEB3FORMS.endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS.accessKey,
          subject: `Portfolio message from ${form.name}`,
          from_name: `${site.shortName}'s portfolio`,
          name: form.name,
          email: form.email,
          message: form.message,
          // Honeypot: people never see or tick this, bots often do.
          botcheck: form.botcheck,
        }),
      });
      const result: { success?: boolean; message?: string } = await response.json();
      if (!response.ok || !result.success) throw new Error(result.message ?? `Web3Forms returned ${response.status}`);
      setStatus("sent");
      setForm(emptyForm);
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="c-space my-24 scroll-mt-24" aria-labelledby="contact-heading">
      <p className="xp-eyebrow">Contact</p>
      <h2 id="contact-heading" className="xp-heading">
        Let&apos;s talk
      </h2>
      <p className="xp-lede">
        Hiring for a frontend role, or have a product to build or improve? Send a note and I&apos;ll get back to you.
      </p>

      <div className="mt-12 overflow-hidden rounded-2xl border border-black-300 bg-black-200">
        <div className="grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
          {/* Direct details */}
          <div className="flex flex-col gap-8 border-b border-black-300 p-6 sm:p-10 lg:border-b-0 lg:border-r">
            <div>
              <p className="flex items-center gap-2 text-sm text-white-600">
                {site.available && (
                  <span className="relative flex h-2 w-2" aria-hidden="true">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-60 motion-reduce:animate-none" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                  </span>
                )}
                {site.available ? site.availability : site.role}
              </p>
              <p className="mt-2 text-sm text-white-500">Usually replies within a day.</p>
            </div>

            <div>
              <p className="contact-label">Email</p>
              <div className="mt-2 rounded-lg border border-black-300 bg-black-100 px-4 py-3">
                <CopyEmail email={site.email} />
              </div>
            </div>

            <dl className="grid grid-cols-2 gap-6 text-sm">
              <div>
                <dt className="contact-label">Based in</dt>
                <dd className="mt-2 text-white-800">Lagos, {site.location}</dd>
              </div>
              <div>
                <dt className="contact-label">Local time</dt>
                <dd className="mt-2 text-white-800">
                  <LocalTime timeZone={site.timezone} label={site.timezoneLabel} prefix="" />
                </dd>
              </div>
            </dl>

            <div className="mt-auto flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-black-300 pt-6">
              {site.cvUrl && (
                <a href={site.cvUrl} target="_blank" rel="noopener noreferrer" className="hero-link">
                  View my CV <span aria-hidden="true">↗</span>
                </a>
              )}
              {activeSocials.length > 0 && (
                <ul className="flex gap-2" aria-label="Social links">
                  {activeSocials.map((social) => (
                    <li key={social.name}>
                      <a
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer me"
                        aria-label={social.name}
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-black-300 bg-black-100 transition-colors hover:border-black-500"
                      >
                        <Image src={social.icon} alt="" width={18} height={18} className="h-[18px] w-auto opacity-80" />
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-6 p-6 sm:p-10">
            <input
              type="checkbox"
              name="botcheck"
              checked={form.botcheck}
              onChange={handleChange}
              className="hidden"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
            />
            <div className="grid gap-6 sm:grid-cols-2">
              <label className="flex flex-col gap-2">
                <span className="contact-label">Name</span>
                <input
                  type="text"
                  name="name"
                  autoComplete="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="Your name"
                  className="contact-input"
                />
              </label>
              <label className="flex flex-col gap-2">
                <span className="contact-label">Email</span>
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="you@company.com"
                  className="contact-input"
                />
              </label>
            </div>
            <label className="flex flex-1 flex-col gap-2">
              <span className="contact-label">Message</span>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows={6}
                placeholder="A little about the role or the project…"
                className="contact-input min-h-40 flex-1 resize-y"
              />
            </label>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p
                aria-live="polite"
                className={`min-h-5 text-sm ${status === "error" ? "text-red-400" : "text-green-400"}`}
              >
                {status === "sent" && "Thanks, your message is on its way. I'll get back to you soon."}
                {status === "error" && (
                  <>
                    Something went wrong. Email me at{" "}
                    <a className="underline" href={`mailto:${site.email}`}>
                      {site.email}
                    </a>
                    .
                  </>
                )}
              </p>
              <button className="contact-submit" type="submit" disabled={status === "sending"}>
                {status === "sending" ? "Sending…" : "Send message"}
                <span aria-hidden="true">→</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
