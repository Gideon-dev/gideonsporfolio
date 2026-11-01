"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import Image from "next/image";
import emailjs from "@emailjs/browser";
import { site } from "@/lib/site";

const EMAILJS = {
  serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? "",
  templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? "",
  publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? "",
};

type Status = "idle" | "sending" | "sent" | "error";

const emptyForm = { name: "", email: "", message: "" };

const Contact = () => {
  const [form, setForm] = useState(emptyForm);
  const [status, setStatus] = useState<Status>("idle");

  const handleChange = ({ target: { name, value } }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("sending");

    try {
      await emailjs.send(
        EMAILJS.serviceId,
        EMAILJS.templateId,
        {
          from_name: form.name,
          to_name: site.shortName,
          from_email: form.email,
          to_email: site.email,
          message: form.message,
        },
        { publicKey: EMAILJS.publicKey },
      );
      setStatus("sent");
      setForm(emptyForm);
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="c-space my-20 scroll-mt-24" aria-labelledby="contact-heading">
      <div className="relative min-h-screen flex items-center justify-center flex-col">
        <Image
          src="/assets/terminal.png"
          alt=""
          fill
          sizes="(min-width: 1280px) 1200px, 100vw"
          className="object-cover object-center"
        />
        <div className="contact-container">
          <h2 id="contact-heading" className="head-text">
            Let&apos;s Talk
          </h2>
          <p className="text-lg text-white-600 mt-3">
            Whether you are looking to build a new website, improve your existing platform, or bring a unique project to
            life, I&apos;m here to help.
          </p>
          <form onSubmit={handleSubmit} className="mt-12 flex flex-col space-y-7">
            <label className="space-y-3">
              <span className="field-label">Full Name</span>
              <input
                type="text"
                name="name"
                autoComplete="name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="John Doe"
                className="field-input"
              />
            </label>
            <label className="space-y-3">
              <span className="field-label">Email</span>
              <input
                type="email"
                name="email"
                autoComplete="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="johndoe@gmail.com"
                className="field-input"
              />
            </label>
            <label className="space-y-3">
              <span className="field-label">Your Message</span>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows={5}
                placeholder="Hi, I like your work and I want to offer you a job..."
                className="field-input"
              />
            </label>
            <button className="field-btn" type="submit" disabled={status === "sending"}>
              {status === "sending" ? "Sending..." : "Send Message"}
              <Image src="/assets/arrow-up.png" alt="" width={10} height={10} className="field-btn_arrow w-auto" />
            </button>
            <p
              aria-live="polite"
              className={`min-h-6 text-base ${status === "error" ? "text-red-400" : "text-green-400"}`}
            >
              {status === "sent" && "Thanks, your message has been sent. I'll get back to you soon."}
              {status === "error" && (
                <>
                  Something went wrong. Please try again or email me at{" "}
                  <a className="underline" href={`mailto:${site.email}`}>
                    {site.email}
                  </a>
                  .
                </>
              )}
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
