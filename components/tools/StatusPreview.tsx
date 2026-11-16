// A static, illustrative rendering of the integration status page.
// Server component: no data or behaviour, just the look.

import { moduleStatusLabels, sampleReport, type ModuleStatus } from "@/lib/tools";
import { AskStatusBadge, KindBadge, ModuleBadge, StatusDot } from "./StatusBadge";

const order: ModuleStatus[] = ["connected", "partial", "ready", "blocked", "no-backend"];

export default function StatusPreview({ compact = false }: { compact?: boolean }) {
  const { app, counts, modules, ask } = sampleReport;

  return (
    <figure className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950 text-left shadow-2xl shadow-black/50">
      {/* Window bar */}
      <div className="flex items-center gap-2 border-b border-zinc-800 bg-zinc-900/60 px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" aria-hidden="true" />
        <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" aria-hidden="true" />
        <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" aria-hidden="true" />
        <span className="ml-3 truncate rounded-md border border-zinc-800 bg-zinc-950 px-2.5 py-0.5 font-mono text-[11px] text-zinc-500">
          localhost:3000/integration-status
        </span>
      </div>

      <div className="space-y-4 p-4 sm:p-5">
        <div>
          <p className="text-sm font-semibold text-zinc-100">{app}</p>
          <p className="text-xs text-zinc-500">Updated 2026-01-15 · staging backend</p>
        </div>

        <ul className={`grid gap-2 ${compact ? "grid-cols-3 sm:grid-cols-5" : "grid-cols-2 sm:grid-cols-5"}`}>
          {order.map((status) => (
            <li key={status} className="rounded-lg border border-zinc-800 bg-zinc-900/50 px-3 py-2">
              <p className="text-lg font-semibold tabular-nums text-zinc-100">{counts[status]}</p>
              <p className="flex items-center gap-1.5 truncate text-[11px] text-zinc-500">
                <StatusDot status={status} />
                {moduleStatusLabels[status].label}
              </p>
            </li>
          ))}
        </ul>

        <div className="flex gap-1 rounded-lg bg-zinc-900 p-1 text-xs">
          <span className="rounded-md bg-zinc-950 px-2.5 py-1 font-medium text-zinc-100 shadow">Modules</span>
          <span className="px-2.5 py-1 text-zinc-500">Open asks</span>
          <span className="px-2.5 py-1 text-zinc-500">Claimed</span>
          <span className="hidden px-2.5 py-1 text-zinc-500 sm:inline">Fixed</span>
        </div>

        <ul className="divide-y divide-zinc-800 rounded-lg border border-zinc-800">
          {modules.slice(0, compact ? 4 : modules.length).map((module) => (
            <li key={module.name} className="flex items-center justify-between gap-3 px-3 py-2">
              <span className="min-w-0">
                <span className="block truncate text-sm text-zinc-200">{module.name}</span>
                <span className="block text-[11px] text-zinc-500">{module.area}</span>
              </span>
              <ModuleBadge status={module.status} />
            </li>
          ))}
        </ul>

        {!compact && (
          <div className="rounded-lg border border-zinc-800 bg-zinc-900/40 p-3">
            <div className="flex flex-wrap items-center gap-2">
              <KindBadge kind={ask.kind} />
              <AskStatusBadge status={ask.status} />
              <span className="text-[11px] text-zinc-500">High · logged {ask.logged}</span>
            </div>
            <p className="mt-2 text-sm font-medium text-zinc-100">{ask.title}</p>
            <dl className="mt-2 space-y-1 text-xs leading-relaxed">
              <div className="flex gap-2">
                <dt className="w-12 shrink-0 text-zinc-500">Where</dt>
                <dd className="font-mono text-zinc-300">{ask.where.join(" · ")}</dd>
              </div>
              <div className="flex gap-2">
                <dt className="w-12 shrink-0 text-zinc-500">What</dt>
                <dd className="text-zinc-300">{ask.what}</dd>
              </div>
              <div className="flex gap-2">
                <dt className="w-12 shrink-0 text-zinc-500">Why</dt>
                <dd className="text-zinc-300">{ask.why}</dd>
              </div>
            </dl>
          </div>
        )}
      </div>
      <figcaption className="border-t border-zinc-800 px-4 py-2 text-[11px] text-zinc-500">Illustrative data</figcaption>
    </figure>
  );
}
