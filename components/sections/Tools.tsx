import Link from "next/link";
import StatusPreview from "@/components/tools/StatusPreview";
import { integrationStatus as tool } from "@/lib/tools";

const columns = [tool.problem, tool.idea, tool.benefits] as const;

const Tools = () => (
  <section id="tools" className="c-space my-24 scroll-mt-24" aria-labelledby="tools-heading">
    <p className="xp-eyebrow">Internal tools</p>
    <h2 id="tools-heading" className="xp-heading">
      Built for the team
    </h2>
    <p className="xp-lede">
      Tools I made to make day-to-day work on large frontends calmer. The first one answers a question every team
      building against a moving backend keeps asking: what actually works right now?
    </p>

    <article className="mt-12 overflow-hidden rounded-2xl border border-black-300 bg-black-200">
      <div className="grid gap-10 p-6 sm:p-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:items-center">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-md border border-zinc-700 bg-zinc-900 px-2 py-0.5 font-mono text-xs text-zinc-300">
              v{tool.version}
            </span>
            {tool.tags.map((tag) => (
              <span key={tag} className="rounded-md border border-black-300 px-2 py-0.5 text-xs text-white-600">
                {tag}
              </span>
            ))}
          </div>
          <h3 className="mt-5 font-mono text-3xl font-semibold tracking-tight text-white-800 sm:text-4xl">{tool.name}</h3>
          <p className="mt-4 text-lg leading-relaxed text-white-700">{tool.tagline}</p>
          <p className="mt-4 leading-relaxed text-white-600">{tool.summary}</p>
          <p className="mt-4 text-sm text-white-500">{tool.adoption}</p>
          <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
            <Link href={`/tools/${tool.slug}`} className="hero-link">
              Read the docs <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
        <StatusPreview />
      </div>

      <div className="grid border-t border-black-300 md:grid-cols-3">
        {columns.map((column, index) => (
          <div
            key={column.title}
            className={`p-6 sm:p-8 ${index > 0 ? "border-t border-black-300 md:border-l md:border-t-0" : ""}`}
          >
            <p className="flex items-center gap-3 text-sm font-medium text-white-800">
              <span className="font-mono text-xs text-white-500">0{index + 1}</span>
              {column.title}
            </p>
            <ul className="mt-4 space-y-3 text-sm leading-relaxed text-white-600">
              {column.points.slice(0, 4).map((point) => (
                <li key={point} className="relative pl-4 before:absolute before:left-0 before:top-[0.6em] before:h-px before:w-2 before:bg-white-500">
                  {point}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </article>
  </section>
);

export default Tools;
