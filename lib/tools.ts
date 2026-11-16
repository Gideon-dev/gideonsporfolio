// Content for the Internal tools section on the home page and the
// /tools/integration-status documentation page.
// Examples are illustrative and contain no client data.

export type ModuleStatus = "connected" | "partial" | "ready" | "blocked" | "no-backend";
export type AskStatus = "open" | "claimed" | "fixed";
export type AskKind = "security" | "bug" | "missing" | "contract" | "environment" | "question";

export const moduleStatusLabels: Record<ModuleStatus, { label: string; meaning: string }> = {
  connected: { label: "Connected", meaning: "Wired and exercised against staging." },
  partial: { label: "Partly connected", meaning: "Wired, but part of the screen still runs on local or mock data." },
  ready: { label: "Ready to wire", meaning: "The endpoints exist; the screen is not wired yet." },
  blocked: { label: "Blocked", meaning: "The endpoints exist, but an open ask stops the work." },
  "no-backend": { label: "No backend", meaning: "No endpoint yet; the screen runs on fixtures." },
};

export const askStatusLabels: Record<AskStatus, { label: string; meaning: string }> = {
  open: { label: "Open", meaning: "Logged and not answered yet." },
  claimed: {
    label: "Claimed, not verified",
    meaning: "The backend or the spec says it is done. Nobody has measured it on staging yet, so it still holds its screens up.",
  },
  fixed: {
    label: "Fixed",
    meaning: "Answered and checked on staging, or, for a contract-only ask, visible in the spec. Kept, never deleted.",
  },
};

export const askKindLabels: Record<AskKind, { label: string; meaning: string }> = {
  security: { label: "Security", meaning: "A hole or exposure in the API." },
  bug: { label: "Bug", meaning: "The endpoint exists but misbehaves." },
  missing: { label: "Missing", meaning: "A screen needs an endpoint or field that does not exist." },
  contract: { label: "Contract", meaning: "Shape, naming or status code differs from the spec." },
  environment: { label: "Staging environment", meaning: "Test data, seeding or configuration." },
  question: { label: "Question", meaning: "A product decision the screen is waiting on." },
};

export const integrationStatus = {
  slug: "integration-status",
  name: "integration-status",
  version: "1.0.0",
  tagline: "One typed source of truth for what the frontend can actually do against the backend.",
  summary:
    "A small package for JavaScript and TypeScript monorepos. Every app's screens and every ask to the backend live in one typed data file. From that data it generates a markdown report that lint keeps current, and a status page each app can serve behind a flag.",
  adoption: "In use in two client monorepos, across eight Next.js apps. Packaged as a Claude Code plugin.",
  tags: ["TypeScript", "Next.js", "Turborepo", "Claude Code plugin"],

  problem: {
    title: "The problem",
    points: [
      "Several Next.js apps were being built against a backend that was still being built too.",
      "Nobody could say quickly which screens really worked against staging and which were still on mock data.",
      "Backend issues were spread across chats, tickets and memory, often without the endpoint, the exact request or the reason it mattered.",
      "A hand-written status doc helped, but it went out of date as soon as someone forgot to edit it.",
    ],
  },
  idea: {
    title: "The idea",
    points: [
      "Treat integration status as data, not prose: one typed package lists every module and every ask.",
      "Each ask says where (endpoints, screens), what (the exact request) and why (what it breaks for people).",
      "Generate the doc and the status page from that same data, so they cannot disagree.",
      "Make lint fail while the generated doc is out of date.",
    ],
  },
  benefits: {
    title: "What it gives a team",
    points: [
      "One answer to 'what is connected?', for every app, in a page you can open in a meeting.",
      "Backend engineers get precise asks, grouped by priority, with a button that copies one as a ticket.",
      "A claimed fix stays unconfirmed until someone has measured it on staging.",
      "Typos fail the build: duplicate ids, links to unknown asks and missing dates are rejected.",
      "Changes are plain TypeScript, so they are reviewed in pull requests like any other code.",
      "Fixed asks are kept with their answers, so the history of the integration is never lost.",
    ],
  },

  steps: [
    {
      title: "Log it as data",
      detail: "When a screen is wired, or a backend problem is found, update the app's module list or add an ask with where, what and why.",
    },
    {
      title: "Validate",
      detail: "The report builder rejects duplicate ids, malformed dates, fixed asks without a date and modules that point at unknown asks.",
    },
    {
      title: "Generate",
      detail: "pnpm status:doc renders docs/api-integration-status.md: a summary per app, module tables by area, then asks by priority.",
    },
    {
      title: "Check",
      detail: "pnpm lint runs status:doc --check and fails if the committed doc does not match the data.",
    },
    {
      title: "Share",
      detail: "Each app serves /integration-status when its flag is on: filterable modules, open, claimed and fixed asks, and deep links.",
    },
  ],
} as const;

/** Illustrative status-page data for the previews. Not from a real project. */
export const sampleReport = {
  app: "Candidate app",
  counts: { connected: 12, partial: 6, ready: 2, blocked: 3, "no-backend": 4 } satisfies Record<ModuleStatus, number>,
  modules: [
    { name: "Sign in and OTP", area: "Account", status: "connected" },
    { name: "Job search", area: "Jobs", status: "connected" },
    { name: "Profile", area: "Account", status: "blocked" },
    { name: "Saved jobs", area: "Jobs", status: "partial" },
    { name: "Messages", area: "Inbox", status: "no-backend" },
  ] satisfies { name: string; area: string; status: ModuleStatus }[],
  ask: {
    id: "profile-update-500",
    title: "Profile update fails with a 500",
    kind: "bug" as AskKind,
    priority: "high",
    status: "open" as AskStatus,
    logged: "2026-01-15",
    where: ["PATCH /api/users/me", "/settings/profile"],
    what: "Accept a partial body on PATCH /api/users/me. Today any request without phone returns 500.",
    why: "People cannot change their name or photo without also re-entering their phone number, and the error gives them no hint.",
  },
};

export const typesExample = `export const MODULE_STATUSES = ["connected", "partial", "ready", "blocked", "no-backend"] as const;

export interface Module {
  id: string;                       // the page's #module-<id> anchor
  area: string;                     // heading it is listed under
  name: string;
  status: ModuleStatus;
  routes: ReadonlyArray<string>;    // route paths
  endpoints: ReadonlyArray<string>; // SDK function or "METHOD /path"
  note: string;                     // what works, what is mock, and why
  asks?: ReadonlyArray<string>;     // ids of asks that stop or limit it
}

export const ASK_KINDS = ["security", "bug", "missing", "contract", "environment", "question"] as const;
export const ASK_STATUSES = ["open", "claimed", "fixed"] as const;

export interface Ask {
  id: string;
  title: string;
  kind: AskKind;
  priority: "urgent" | "high" | "normal" | "low";
  audience: "backend" | "product";
  status: AskStatus;
  logged: string;                // YYYY-MM-DD, found or last re-checked
  fixed?: string;                // YYYY-MM-DD, set with "claimed" or "fixed"
  where: ReadonlyArray<string>;  // endpoints, DTOs and screens involved
  what: string;                  // the exact ask
  why: string;                   // what it breaks for the people using the app
  answer?: string;               // what the backend answered or shipped
}`;

export const askExample = `{
  id: "profile-update-500",
  title: "Profile update fails with a 500",
  kind: "bug",
  priority: "high",
  audience: "backend",
  status: "open",
  logged: "2026-01-15",
  where: ["PATCH /api/users/me", "/settings/profile"],
  what: "Accept a partial body on \`PATCH /api/users/me\`; today any request without \`phone\` returns 500.",
  why: "People cannot change their name or photo without also re-entering their phone number.",
}`;

export const scriptsExample = `{
  "scripts": {
    "status:doc": "node packages/integration-status/scripts/write-doc.mjs",
    "lint": "oxlint --type-aware && pnpm status:doc --check"
  }
}`;

export const routeExample = `// apps/<app>/src/app/integration-status/page.tsx
import { connection } from "next/server";
import { notFound } from "next/navigation";
import { getAppReport } from "@repo/integration-status/report";
import { IntegrationStatusPage } from "@repo/ui/components/integration-status-page";

export const metadata = { robots: { index: false, follow: false } };

export default async function Page() {
  await connection(); // read the flag per request: a restart, not a rebuild
  if (process.env.INTEGRATION_STATUS_PAGE !== "on") notFound();
  return <IntegrationStatusPage report={getAppReport("job-board")} />;
}`;

export const layoutExample = `packages/integration-status/
├─ package.json          # exports ./report, ./labels, ./types
├─ scripts/write-doc.mjs # renders and checks the markdown
└─ src/
   ├─ types.ts           # Module, Ask and their status unions
   ├─ labels.ts          # one set of labels for the doc and the page
   ├─ report.ts          # validate() and getAppReport()
   ├─ render-doc.ts      # markdown renderer
   └─ data/
      ├─ asks.ts         # every ask, merged
      └─ <app>.ts        # one module list per app`;
