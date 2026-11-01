import type { CSSProperties } from "react";
import LocalTime from "@/components/ui/LocalTime";
import { site } from "@/lib/site";

// Staggered, one-time entrance. CSS only, disabled under prefers-reduced-motion.
const rise = (step: number): CSSProperties => ({ animationDelay: `${step * 90}ms` });

const Hero = () => {
  const [firstName, ...rest] = site.name.split(" ");

  return (
    <section id="home" aria-labelledby="hero-heading" className="relative flex min-h-svh flex-col c-space pt-28 pb-8">
      <div className="flex flex-1 flex-col justify-center">
        <p className="hero-rise flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-white-600" style={rise(0)}>
          {site.available && <span className="h-2 w-2 rounded-full bg-green-500" aria-hidden="true" />}
          <span>{site.available ? site.availability : site.role}</span>
          <span className="text-white-500" aria-hidden="true">
            /
          </span>
          <span className="text-white-500">Based in {site.location}, working remotely</span>
        </p>

        <h1
          id="hero-heading"
          className="hero-rise mt-8 text-[clamp(3.25rem,10vw,9rem)] font-semibold leading-[0.92] tracking-[-0.045em] text-white-800"
          style={rise(1)}
        >
          {firstName}
          <br />
          <span className="text-white-500">{rest.join(" ")}</span>
        </h1>

        <div className="mt-12 grid items-end gap-10 md:grid-cols-12">
          <p className="hero-rise max-w-xl text-lg leading-relaxed text-white-600 md:col-span-7 md:text-xl" style={rise(2)}>
            {site.intro}
          </p>
          <div className="hero-rise flex gap-8 text-base md:col-span-5 md:justify-self-end" style={rise(3)}>
            <a href="#work" className="hero-link">
              View work <span aria-hidden="true">↓</span>
            </a>
            <a href="#contact" className="hero-link">
              Get in touch <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>

      <div
        className="hero-rise mt-16 flex flex-col gap-3 border-t border-black-300 pt-5 text-sm text-white-500 sm:flex-row sm:items-center sm:justify-between"
        style={rise(4)}
      >
        <ul className="flex flex-wrap gap-x-5 gap-y-1" aria-label="Core stack">
          {site.skills.map((skill) => (
            <li key={skill}>{skill}</li>
          ))}
        </ul>
        <LocalTime timeZone={site.timezone} label={site.timezoneLabel} />
      </div>
    </section>
  );
};

export default Hero;
