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
  version: "2.0.0",
  tagline: "One typed source of truth for what the frontend can actually do against the backend, with checks that prove it.",
  summary:
    "A small package for JavaScript and TypeScript monorepos. Every app's screens and every ask to the backend live in one typed data file. From that data it generates a markdown report that lint keeps current, and a status page each app can serve behind a flag. Version 2 adds an optional Playwright layer that tests what the data claims and shows the evidence beside each status.",
  adoption:
    "Version 1 is in use in two client monorepos, across eight Next.js apps. Version 2 is in local testing before it replaces it. Packaged as a Claude Code plugin.",
  tags: ["TypeScript", "Next.js", "Turborepo", "Playwright", "Claude Code plugin"],

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
    {
      title: "Verify (v2, optional)",
      detail: "pnpm status:smoke runs a Playwright check for each ask and each wired screen against staging. The result is recorded as data and shown beside the status it supports.",
    },
  ],
} as const;

/* ---------- version 2 ---------- */

/** The three limits version 1 documented, and what version 2 does about each. */
export const v2Limits = [
  {
    limit: "It describes the integration; it does not test it.",
    how: "An optional Playwright layer turns each claim into a check. An ask gets a probe that asserts what the ask asks for. A wired screen gets a smoke that opens it in a browser against staging. The status sets what is expected, and the result is recorded as evidence.",
    benefit: "A regression, or a fix the backend made without telling anyone, shows up on the next run instead of in a demo.",
    state: "Solved, for whatever has a check",
  },
  {
    limit: "Nothing is detected automatically. The data is only as good as the logging.",
    how: "Lint now fails when a status has fallen behind its own reasons: a partly connected module nothing holds back, a blocked module with no open ask, a claimed ask whose recorded probe passes. A check's result is compared with the status on every run.",
    benefit: "A status cannot quietly stay behind after someone checks a screen by hand, which was the most common way version 1 went stale.",
    state: "Narrowed. Wiring itself is still logged by people",
  },
  {
    limit: "The stale-doc check runs with pnpm lint. Repos without CI rely on people running it.",
    how: "An opt-in nightly run on the developer's own machine, and a note at the start of each Claude Code session, report what the checks found. Neither needs CI.",
    benefit: "A team with no pipeline still hears about a change the next morning.",
    state: "Narrowed. Lint itself still needs someone, or CI, to run it",
  },
] as const;

/** What the entry's status leads a check to expect. */
export const v2Expectations = [
  { status: "Ask: open", expected: "The probe fails", surprise: "It passes: the backend fixed it without notice." },
  { status: "Ask: claimed", expected: "Run to find out", surprise: "Pass: mark it fixed. Fail: the claim is not met." },
  { status: "Ask: fixed", expected: "The probe passes", surprise: "It fails: a regression." },
  { status: "Module: connected", expected: "The smoke passes", surprise: "It fails: a regression." },
  { status: "Module: partly connected", expected: "Run to find out", surprise: "It passes: ready to promote." },
] as const;

export const v2Upgrades = [
  "Ask probes: one check per ask, over HTTP, with no browser. It is the repro, kept instead of thrown away.",
  "Module smokes: one check per wired screen, in a real browser, against staging.",
  "Evidence as data: each check records its steps, the method, path and status of each request, and the assertion message. Never headers, tokens or bodies.",
  "Statuses that cannot lag: each partly connected module says what holds it back, and lint fails when the reason is gone.",
  "A derived 'waiting on' for every module and ask: Frontend, Backend, Product or Check. More than one is normal.",
  "A staged upgrade from version 1: four commits, each revertible, the last two opt-in. Existing data files compile untouched.",
  "An opt-in nightly run that writes only gitignored files. It never records, commits or pushes.",
] as const;

export const v2Polish = [
  "A list or a grid of modules, with a tab per status and a 'waiting on' filter, so each person can find what is theirs.",
  "A 'How to read this page' panel: every label with what it means, who acts on it and what they do next. The same text is the tooltip on each badge and the Key section of the markdown doc.",
  "Each check explains itself: what a pass proves, what it did, what came back, and what a pass does not prove.",
  "A critique of each check, derived from its record: weak strength, no declared gaps, a retry, a failure at sign-in rather than on the fault, a write with no clean-up.",
  "A banner for checks that call for a change, and a separate note for what the last unrecorded run found.",
  "Copy ask now carries the probe's requests and their results, so a ticket arrives with a repro.",
  "Links that restore the view: ?view=grid&status=blocked&waiting=backend, and #check-<id>.",
  "The page lists data problems in a banner instead of failing to render.",
] as const;

export const v2Scripts = [
  { command: "pnpm status:doc", does: "Generates the markdown doc. Fails, naming the entry, if the data has a problem." },
  { command: "pnpm status:doc --check", does: "Fails if the doc is stale or a status has fallen behind. Run by pnpm lint." },
  { command: "pnpm status:doc --problems", does: "Lists every data problem without failing. Used while upgrading." },
  { command: "pnpm status:smoke", does: "Runs every check against staging. Writes a gitignored result; records nothing." },
  { command: "pnpm status:smoke --record", does: "Same, and writes the evidence file that is committed with the data." },
  { command: "pnpm status:smoke --if-stale 20h", does: "Skips when a run happened in the last 20 hours." },
  { command: "pnpm status:schedule", does: "Opt-in nightly run on this machine (Windows for now). --status and --remove manage it." },
] as const;

export const v2UpgradeStages = [
  { stage: "1. Core", adds: "Partly connected, claimed, pending items, waiting-on, lag rules, label key.", dependency: "None" },
  { stage: "2. Page", adds: "Grid view, status tabs, filters, key panel.", dependency: "None" },
  { stage: "3. Smoke (opt-in)", adds: "Probes, smokes, evidence, Checks tab.", dependency: "@playwright/test" },
  { stage: "4. Schedule (opt-in)", adds: "Nightly run, per machine.", dependency: "None" },
] as const;

/** What version 2 still does not do. */
export const v2RemainingLimits = [
  "A check proves what it asserts and no more. Each one says what it leaves unproven, and the page flags a weak one.",
  "Nothing writes the checks for you. A wired screen with no check is shown as unverified, not as passing.",
  "A smoke sees what the browser sees. Calls made on the server are invisible to it, so it asserts what is rendered.",
  "The suite runs against a shared staging backend, so it is not a merge gate: a red run never fails lint.",
  "The nightly run is Windows only for now, and each developer sets it up. macOS and Linux scheduling and a CI recipe are planned for version 3.",
  "A decision made in conversation and never written down is still invisible.",
] as const;

export const probeExample = `// smoke/asks/profile-update-500.probe.ts
import { expect, probeAsk } from "../helpers";

probeAsk(
  "profile-update-500",
  {
    intent: "\`PATCH /api/users/me\` accepts a body without \`phone\`.",
    gaps: ["Only \`firstName\` is tried."],
    strength: "behaviour",
  },
  async ({ request, step }) => {
    await step("Update the first name only", async () => {
      const response = await request.patch("/api/users/me", {
        data: { firstName: "Ada" },
      });
      expect(response.status(), "PATCH without phone").toBe(200);
    });
  },
);`;

export const pendingExample = `{
  id: "catalogue",
  area: "Courses",
  name: "Course catalogue",
  status: "partial",
  routes: ["/courses"],
  endpoints: ["GET /api/courses"],
  note: "Wired; nobody has checked the list on staging.",
  pending: [
    { what: "Confirm the list in a browser against staging.", owner: "check" },
  ],
}`;

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
  pending?: ReadonlyArray<{         // v2: why a partial module is held back
    what: string;
    owner: "frontend" | "check";    // code to write, or a check to run
  }>;
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
  claimed?: string;              // YYYY-MM-DD, set with "claimed"
  fixed?: string;                // YYYY-MM-DD, set with "fixed"
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
    "lint": "oxlint --type-aware && pnpm status:doc --check",
    "status:smoke": "node packages/integration-status/smoke/run.mjs",
    "status:schedule": "node packages/integration-status/smoke/schedule.mjs"
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
├─ package.json          # exports ./report, ./labels, ./evidence, ./types
├─ scripts/write-doc.mjs # renders and checks the markdown
├─ src/
│  ├─ types.ts           # Module, Ask, evidence and their status unions
│  ├─ labels.ts          # each label: meaning, who acts, next step
│  ├─ report.ts          # problems(), validate() and getAppReport()
│  ├─ evidence.ts        # verdicts and the derived critique (v2)
│  ├─ render-doc.ts      # markdown renderer
│  └─ data/
│     ├─ asks.ts         # every ask, merged
│     ├─ <app>.ts        # one module list per app
│     └─ evidence.ts     # last recorded result per check (v2)
└─ smoke/                # v2, optional: the Playwright layer
   ├─ helpers.ts         # probeAsk() and smokeModule()
   ├─ reporter.ts        # writes the evidence
   ├─ run.mjs            # pnpm status:smoke
   ├─ schedule.mjs       # pnpm status:schedule
   ├─ asks/<ask-id>.probe.ts
   └─ modules/<app>/<module-id>.smoke.ts`;
