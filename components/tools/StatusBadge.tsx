import { askKindLabels, askStatusLabels, moduleStatusLabels, type AskKind, type AskStatus, type ModuleStatus } from "@/lib/tools";

const moduleTone: Record<ModuleStatus, string> = {
  connected: "border-emerald-500/30 bg-emerald-500/10 text-emerald-300",
  partial: "border-amber-500/30 bg-amber-500/10 text-amber-300",
  ready: "border-sky-500/30 bg-sky-500/10 text-sky-300",
  blocked: "border-red-500/30 bg-red-500/10 text-red-300",
  "no-backend": "border-zinc-600/60 bg-zinc-500/10 text-zinc-400",
};

const dotTone: Record<ModuleStatus, string> = {
  connected: "bg-emerald-400",
  partial: "bg-amber-400",
  ready: "bg-sky-400",
  blocked: "bg-red-400",
  "no-backend": "bg-zinc-500",
};

const askTone: Record<AskStatus, string> = {
  open: "border-amber-500/30 bg-amber-500/10 text-amber-300",
  claimed: "border-sky-500/30 bg-sky-500/10 text-sky-300",
  fixed: "border-emerald-500/30 bg-emerald-500/10 text-emerald-300",
};

const base = "inline-flex items-center gap-1.5 whitespace-nowrap rounded-md border px-2 py-0.5 text-xs font-medium";

export function StatusDot({ status }: { status: ModuleStatus }) {
  return <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${dotTone[status]}`} aria-hidden="true" />;
}

export function ModuleBadge({ status }: { status: ModuleStatus }) {
  return (
    <span className={`${base} ${moduleTone[status]}`}>
      <StatusDot status={status} />
      {moduleStatusLabels[status].label}
    </span>
  );
}

export function AskStatusBadge({ status }: { status: AskStatus }) {
  return <span className={`${base} ${askTone[status]}`}>{askStatusLabels[status].label}</span>;
}

export function KindBadge({ kind }: { kind: AskKind }) {
  return <span className={`${base} border-zinc-700 bg-zinc-800/60 text-zinc-300`}>{askKindLabels[kind].label}</span>;
}
