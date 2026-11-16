import CopyButton from "./CopyButton";

export default function CodeBlock({ code, title }: { code: string; title?: string }) {
  return (
    <div className="my-6 overflow-hidden rounded-lg border border-zinc-800 bg-zinc-950">
      <div className="flex items-center justify-between gap-3 border-b border-zinc-800 bg-zinc-900/50 px-4 py-2">
        <span className="truncate font-mono text-xs text-zinc-500">{title ?? ""}</span>
        <CopyButton value={code} />
      </div>
      <pre className="overflow-x-auto p-4 text-[13px] leading-relaxed">
        <code className="font-mono text-zinc-300">{code}</code>
      </pre>
    </div>
  );
}
