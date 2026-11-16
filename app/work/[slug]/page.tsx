import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { site } from "@/lib/site";
import { getProject, projects } from "@/lib/work";

type Props = { params: Promise<{ slug: string }> };

// Every case study is known at build time; anything else is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  const title = `${project.name}: ${project.kind}`;

  return {
    title,
    description: project.summary,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: {
      type: "article",
      url: `/work/${project.slug}`,
      siteName: site.name,
      title,
      description: project.summary,
      locale: site.locale,
    },
    twitter: { card: "summary_large_image", title, description: project.summary },
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const index = projects.indexOf(project);
  const next = projects[(index + 1) % projects.length];
  const number = String(index + 1).padStart(2, "0");

  return (
    <main id="main" className="mx-auto max-w-4xl c-space pb-24 pt-32">
      <Link href="/#experience" className="hero-link text-sm">
        <span aria-hidden="true">←</span> All work
      </Link>

      <header className="mt-10 border-b border-black-300 pb-10">
        <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-white-500">
          {project.recent && <span className="recent-badge mr-2">Recent work</span>}
          <span className="tabular-nums">{number}</span>
          <span aria-hidden="true">/</span>
          <span>{project.role}</span>
          <span aria-hidden="true">/</span>
          <span>{project.period}</span>
          <span aria-hidden="true">/</span>
          <span>{project.location}</span>
        </p>
        <h1 className="mt-5 text-[clamp(2.5rem,7vw,5rem)] font-semibold leading-[0.95] tracking-[-0.04em] text-white-800">
          {project.name}
        </h1>
        <p className="mt-3 text-xl text-white-600">{project.kind}</p>
        {project.href && (
          <p className="mt-6">
            <a href={project.href} target="_blank" rel="noopener noreferrer" className="hero-link">
              {project.linkLabel ?? "Visit"} <span aria-hidden="true">↗</span>
            </a>
          </p>
        )}
        {!project.href && project.linkLabel && <p className="mt-6 text-sm text-white-500">{project.linkLabel}</p>}
      </header>

      <dl className="grid gap-x-10 gap-y-6 border-b border-black-300 py-10 sm:grid-cols-2">
        {project.facts.map((fact) => (
          <div key={fact.label}>
            <dt className="text-xs uppercase tracking-wider text-white-500">{fact.label}</dt>
            <dd className="mt-1 text-white-800">{fact.value}</dd>
          </div>
        ))}
        <div className="sm:col-span-2">
          <dt className="text-xs uppercase tracking-wider text-white-500">Stack</dt>
          <dd className="mt-2">
            <ul className="flex flex-wrap gap-2">
              {project.stack.map((item) => (
                <li key={item} className="rounded-full border border-black-300 bg-black-200 px-3 py-1 text-sm text-white-600">
                  {item}
                </li>
              ))}
            </ul>
          </dd>
        </div>
      </dl>

      <section className="py-10" aria-labelledby="overview-heading">
        <h2 id="overview-heading" className="text-sm uppercase tracking-wider text-white-500">
          The product
        </h2>
        <div className="mt-4 space-y-4 text-lg leading-relaxed text-white-700">
          {project.overview.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <h2 className="mt-10 text-sm uppercase tracking-wider text-white-500">My role</h2>
        <p className="mt-4 text-lg leading-relaxed text-white-700">{project.myRole}</p>
      </section>

      {project.sections.map((section) => (
        <section key={section.heading} className="border-t border-black-300 py-12">
          <h2 className="text-2xl font-semibold tracking-tight text-white-800 sm:text-3xl">{section.heading}</h2>
          {section.intro && <p className="mt-4 max-w-2xl text-lg leading-relaxed text-white-600">{section.intro}</p>}
          <ul className="mt-8 grid gap-x-10 gap-y-8 sm:grid-cols-2">
            {section.points.map((point) => (
              <li key={point.title}>
                <h3 className="font-medium text-white-800">{point.title}</h3>
                <p className="mt-2 leading-relaxed text-white-600">{point.detail}</p>
              </li>
            ))}
          </ul>
        </section>
      ))}

      <nav className="flex flex-col gap-6 border-t border-black-300 pt-10 sm:flex-row sm:items-end sm:justify-between" aria-label="More work">
        <div>
          <p className="text-sm text-white-500">Next case file</p>
          <Link href={`/work/${next.slug}`} className="hero-link mt-2 text-2xl font-semibold">
            {next.name} <span aria-hidden="true">→</span>
          </Link>
        </div>
        <Link href="/#contact" className="hero-link">
          Get in touch <span aria-hidden="true">→</span>
        </Link>
      </nav>
    </main>
  );
}
