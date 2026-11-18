import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import CodeBlock from "@/components/docs/CodeBlock";
import StatusPreview from "@/components/tools/StatusPreview";
import { AskStatusBadge, KindBadge, ModuleBadge } from "@/components/tools/StatusBadge";
import { site } from "@/lib/site";
import {
  askExample,
  askKindLabels,
  askStatusLabels,
  integrationStatus as tool,
  layoutExample,
  moduleStatusLabels,
  pendingExample,
  probeExample,
  routeExample,
  scriptsExample,
  typesExample,
  v2Expectations,
  v2Limits,
  v2Polish,
  v2RemainingLimits,
  v2Scripts,
  v2UpgradeStages,
  v2Upgrades,
  type AskKind,
  type AskStatus,
  type ModuleStatus,
} from "@/lib/tools";

const title = "integration-status docs";
const description = tool.summary;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `/tools/${tool.slug}` },
  openGraph: { type: "article", url: `/tools/${tool.slug}`, siteName: site.name, title, description, locale: site.locale },
  twitter: { card: "summary_large_image", title, description },
};

const toc = [
  { id: "introduction", label: "Introduction" },
  { id: "whats-new", label: "What's new in v2" },
  { id: "why", label: "Why it exists" },
  { id: "how-it-works", label: "How it works" },
  { id: "data-model", label: "Data model" },
  { id: "statuses", label: "Statuses" },
  { id: "ask-lifecycle", label: "Ask lifecycle" },
  { id: "status-page", label: "The status page" },
  { id: "testing", label: "Testing the claims" },
  { id: "scripts", label: "Scripts" },
  { id: "installation", label: "Installation" },
  { id: "upgrading", label: "Upgrading from v1" },
  { id: "upkeep", label: "Keeping it current" },
  { id: "limits", label: "Limits" },
] as const;

const moduleStatuses = Object.keys(moduleStatusLabels) as ModuleStatus[];
const askStatuses = Object.keys(askStatusLabels) as AskStatus[];
const askKinds = Object.keys(askKindLabels) as AskKind[];

/* ---------- small doc primitives ---------- */

function H2({ id, children }: { id: string; children: ReactNode }) {
  return (
    <h2 id={id} className="mt-14 scroll-mt-28 border-b border-zinc-800 pb-2 text-2xl font-semibold tracking-tight text-zinc-100 first:mt-0">
      <a href={`#${id}`} className="hover:underline hover:decoration-zinc-600 hover:underline-offset-4">
        {children}
      </a>
    </h2>
  );
}

function H3({ children }: { children: ReactNode }) {
  return <h3 className="mt-8 text-lg font-semibold tracking-tight text-zinc-100">{children}</h3>;
}

function P({ children }: { children: ReactNode }) {
  return <p className="mt-5 leading-7 text-zinc-400">{children}</p>;
}

function Code({ children }: { children: ReactNode }) {
  return (
    <code className="rounded-md border border-zinc-800 bg-zinc-900 px-1.5 py-0.5 font-mono text-[0.85em] text-zinc-200">
      {children}
    </code>
  );
}

function Callout({ title: heading, children }: { title: string; children: ReactNode }) {
  return (
    <div className="mt-6 rounded-lg border border-zinc-800 bg-zinc-900/40 px-4 py-3">
      <p className="text-sm font-medium text-zinc-100">{heading}</p>
      <div className="mt-1 text-sm leading-6 text-zinc-400">{children}</div>
    </div>
  );
}

function Steps({ children }: { children: ReactNode }) {
  return <ol className="mt-6 ml-3 border-l border-zinc-800 [counter-reset:step]">{children}</ol>;
}

function Step({ title: heading, children }: { title: string; children: ReactNode }) {
  return (
    <li className="relative pb-8 pl-8 [counter-increment:step] last:pb-0 before:absolute before:-left-[13px] before:top-0 before:flex before:h-[26px] before:w-[26px] before:items-center before:justify-center before:rounded-full before:border before:border-zinc-700 before:bg-zinc-950 before:font-mono before:text-xs before:text-zinc-300 before:content-[counter(step)]">
      <h3 className="pt-0.5 font-semibold text-zinc-100">{heading}</h3>
      <div className="text-zinc-400 [&>p]:mt-2 [&>p]:leading-7">{children}</div>
    </li>
  );
}

function List({ items }: { items: readonly string[] }) {
  return (
    <ul className="mt-5 ml-6 list-disc space-y-2 text-zinc-400 marker:text-zinc-600">
      {items.map((item) => (
        <li key={item} className="leading-7">
          {item}
        </li>
      ))}
    </ul>
  );
}

function Table({ head, rows }: { head: readonly string[]; rows: readonly (readonly ReactNode[])[] }) {
  return (
    <div className="mt-6 overflow-x-auto rounded-lg border border-zinc-800">
      <table className="w-full text-left text-sm">
        <thead className="bg-zinc-900/60 text-zinc-300">
          <tr>
            {head.map((cell) => (
              <th key={cell} className="px-4 py-2.5 font-medium">
                {cell}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-800">
          {rows.map((row, index) => (
            <tr key={index} className="align-top">
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className={`px-4 py-3 ${cellIndex === 0 ? "whitespace-nowrap" : "text-zinc-400"}`}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ---------- page ---------- */

export default function IntegrationStatusDocs() {
  return (
    <div className="mx-auto max-w-7xl c-space pb-24 pt-28">
      <div className="lg:grid lg:grid-cols-[200px_minmax(0,1fr)] lg:gap-10 xl:grid-cols-[200px_minmax(0,1fr)_180px]">
        {/* Left: site-level docs nav */}
        <aside className="hidden lg:block" aria-label="Docs">
          <nav className="sticky top-28 space-y-6 text-sm">
            <div>
              <p className="mb-2 font-medium text-zinc-100">Internal tools</p>
              <ul className="space-y-1">
                <li>
                  <Link
                    href={`/tools/${tool.slug}`}
                    aria-current="page"
                    className="block rounded-md bg-zinc-900 px-2 py-1 font-mono text-zinc-100"
                  >
                    {tool.name}
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <p className="mb-2 font-medium text-zinc-100">Portfolio</p>
              <ul className="space-y-1 text-zinc-500">
                <li>
                  <Link href="/#tools" className="block px-2 py-1 transition-colors hover:text-zinc-100">
                    Tools overview
                  </Link>
                </li>
                <li>
                  <Link href="/#experience" className="block px-2 py-1 transition-colors hover:text-zinc-100">
                    Work
                  </Link>
                </li>
                <li>
                  <Link href="/#contact" className="block px-2 py-1 transition-colors hover:text-zinc-100">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        </aside>

        {/* Main column */}
        <main id="main" className="min-w-0 max-w-3xl">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-zinc-500">
            <Link href="/#tools" className="transition-colors hover:text-zinc-100">
              Tools
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-zinc-300">{tool.name}</span>
          </nav>

          <h1 className="mt-4 font-mono text-4xl font-semibold tracking-tight text-zinc-50">{tool.name}</h1>
          <p className="mt-3 text-lg text-zinc-400">{tool.tagline}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            <span className="rounded-md border border-zinc-700 bg-zinc-900 px-2 py-0.5 font-mono text-xs text-zinc-300">
              v{tool.version}
            </span>
            {tool.tags.map((tag) => (
              <span key={tag} className="rounded-md border border-zinc-800 px-2 py-0.5 text-xs text-zinc-400">
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-10">
            <H2 id="introduction">Introduction</H2>
            <P>{tool.summary}</P>
            <P>{tool.adoption}</P>
            <Callout title="The rule it enforces">
              If a screen is wired, or a backend problem is found, it is written down as data in the same pull request.
              Everything else (the doc, the page, the counts) is generated from that.
            </Callout>

            <H2 id="whats-new">What&apos;s new in v2</H2>
            <P>
              Version 1 ended its own documentation with three limits. Version 2 is built around them. The largest was
              that the tool described the integration without testing it, so a status was only ever someone&apos;s word.
            </P>
            <H3>The limits, and what v2 does about each</H3>
            <div className="mt-6 space-y-4">
              {v2Limits.map((item) => (
                <div key={item.limit} className="rounded-lg border border-zinc-800 bg-zinc-900/40 px-4 py-4">
                  <p className="font-medium text-zinc-100">&ldquo;{item.limit}&rdquo;</p>
                  <dl className="mt-3 space-y-2 text-sm leading-6">
                    <div>
                      <dt className="inline font-medium text-zinc-300">How v2 solves it: </dt>
                      <dd className="inline text-zinc-400">{item.how}</dd>
                    </div>
                    <div>
                      <dt className="inline font-medium text-zinc-300">What you gain: </dt>
                      <dd className="inline text-zinc-400">{item.benefit}</dd>
                    </div>
                    <div>
                      <dt className="inline font-medium text-zinc-300">Where it stands: </dt>
                      <dd className="inline text-zinc-400">{item.state}.</dd>
                    </div>
                  </dl>
                </div>
              ))}
            </div>
            <H3>Upgrades</H3>
            <List items={v2Upgrades} />
            <H3>Polish</H3>
            <List items={v2Polish} />
            <Callout title="Where v2 stands">
              Version 2 is finished and tested against a throwaway monorepo with a stub backend. It is in local testing
              before it replaces version 1 in the client monorepos.
            </Callout>

            <H2 id="why">Why it exists</H2>
            <List items={tool.problem.points} />
            <H3>The idea</H3>
            <List items={tool.idea.points} />
            <H3>What it gives a team</H3>
            <List items={tool.benefits.points} />

            <H2 id="how-it-works">How it works</H2>
            <P>One package, one direction of flow: data in, doc and page out.</P>
            <Steps>
              {tool.steps.map((step) => (
                <Step key={step.title} title={step.title}>
                  <p>{step.detail}</p>
                </Step>
              ))}
            </Steps>
            <CodeBlock title="Package layout" code={layoutExample} />

            <H2 id="data-model">Data model</H2>
            <P>
              Two shapes carry everything. A <Code>Module</Code> is a screen or feature in one app. An <Code>Ask</Code> is
              something the frontend needs from the backend or from product, with where, what and why.
            </P>
            <CodeBlock title="src/types.ts (excerpt)" code={typesExample} />
            <H3>An ask</H3>
            <P>
              Asks are written for the person who will fix them. <Code>where</Code> points at the endpoint and the screen,{" "}
              <Code>what</Code> is the exact request, and <Code>why</Code> says what it breaks for people using the app.
            </P>
            <CodeBlock title="src/data/asks.ts" code={askExample} />
            <H3>A partly connected module says why</H3>
            <P>
              In version 2 a module that is wired but held back must name the reason: an open or claimed ask, or a{" "}
              <Code>pending</Code> item owned by <Code>frontend</Code> (code still to write) or <Code>check</Code> (it
              should work, and nobody has confirmed it). Lint fails when a partly connected module has no reason left, so
              the status cannot stay behind after the check is done.
            </P>
            <CodeBlock title="src/data/<app>.ts" code={pendingExample} />

            <H2 id="statuses">Statuses</H2>
            <H3>Module status</H3>
            <Table
              head={["Status", "Meaning"]}
              rows={moduleStatuses.map((status) => [<ModuleBadge key={status} status={status} />, moduleStatusLabels[status].meaning])}
            />
            <H3>Ask kind</H3>
            <Table
              head={["Kind", "Meaning"]}
              rows={askKinds.map((kind) => [<KindBadge key={kind} kind={kind} />, askKindLabels[kind].meaning])}
            />
            <H3>Priority</H3>
            <Table
              head={["Priority", "Use it when"]}
              rows={[
                [<Code key="u">urgent</Code>, "A security hole, or it blocks a demo."],
                [<Code key="h">high</Code>, "It blocks a module."],
                [<Code key="n">normal</Code>, "It limits a module."],
                [<Code key="l">low</Code>, "Nice to have."],
              ]}
            />

            <H2 id="ask-lifecycle">Ask lifecycle</H2>
            <P>Asks move forward and are never deleted. A fix is not a fix until someone has checked it.</P>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              {askStatuses.map((status, index) => (
                <span key={status} className="flex items-center gap-3">
                  <AskStatusBadge status={status} />
                  {index < askStatuses.length - 1 && (
                    <span className="text-zinc-600" aria-hidden="true">
                      →
                    </span>
                  )}
                </span>
              ))}
            </div>
            <Table
              head={["Status", "Meaning"]}
              rows={askStatuses.map((status) => [<AskStatusBadge key={status} status={status} />, askStatusLabels[status].meaning])}
            />
            <Callout title="Why 'claimed' exists">
              Backends often report a fix before it reaches the test environment. Claimed asks keep holding their screens
              up on the page until the fix has been measured, so a status page never shows green on someone&apos;s word.
            </Callout>

            <H2 id="status-page">The status page</H2>
            <P>
              Each app serves <Code>/integration-status</Code> when <Code>INTEGRATION_STATUS_PAGE=on</Code>. It is off by
              default, never indexed, and needs no sign-in, so it can be opened in a meeting.
            </P>
            <div className="mt-6">
              <StatusPreview />
            </div>
            <List
              items={[
                "Summary tiles per status that filter the module list.",
                "Tabs for modules, open asks, claimed asks and fixed asks, with search and a priority filter.",
                "Ask cards with where, what and why, the modules each one blocks, and other apps it affects.",
                "A Copy ask button that copies an ask as plain text, ready for a ticket or a chat.",
                "Deep links to #module-<id> and #ask-<id> that open the right tab.",
                "New in v2: modules as a list or a grid, a tab per status, and a 'waiting on' filter (Frontend, Backend, Product, Check).",
                "New in v2: a 'How to read this page' panel that says what each label means, who acts on it and what they do next.",
                "New in v2: a Checks tab, and a verification badge on each module and ask that opens the evidence behind it.",
              ]}
            />
            <CodeBlock title="apps/<app>/src/app/integration-status/page.tsx" code={routeExample} />

            <H2 id="testing">Testing the claims</H2>
            <P>
              The smoke layer is optional and lives in its own folder; the core package never imports Playwright. A check
              points at the data by id, and the entry&apos;s status sets what is expected. The suite never edits a status:
              it reports a disagreement, and a person changes the data in a pull request.
            </P>
            <Table
              head={["The data says", "Expected", "A surprise means"]}
              rows={v2Expectations.map((row) => [row.status, row.expected, row.surprise])}
            />
            <H3>A probe</H3>
            <P>
              A probe asserts what the ask asks for, not what happens today. While the ask is open it is expected to
              fail. The day it passes, the run says the backend fixed it without notice.
            </P>
            <CodeBlock title="smoke/asks/profile-update-500.probe.ts" code={probeExample} />
            <H3>What the page shows for each check</H3>
            <List
              items={[
                "What a pass proves, in one sentence, written by whoever wrote the check.",
                "Each step and whether it passed, and each request with its method, path and status.",
                "What was expected from the status at the time, what happened, and what to do next.",
                "What a pass does not prove: the author's declared gaps, then a critique derived from the record.",
                "The check's code, and when it last ran.",
              ]}
            />
            <Callout title="Two files, on purpose">
              Every run writes a gitignored result, so an unattended run never dirties the working tree. Only an explicit{" "}
              <Code>--record</Code> writes the evidence file that is committed with the data, which keeps the generated doc
              the same for everyone.
            </Callout>

            <H2 id="scripts">Scripts</H2>
            <Table
              head={["Command", "What it does"]}
              rows={v2Scripts.map((row) => [<Code key={row.command}>{row.command}</Code>, row.does])}
            />

            <H2 id="installation">Installation</H2>
            <P>
              The tool ships as a Claude Code plugin with a setup skill that scaffolds it into an existing pnpm and
              Turborepo monorepo. The plugin repository is private; access is available on request.
            </P>
            <Steps>
              <Step title="Detect the repo">
                <p>
                  Find the package scope, the apps and their dev ports, the shared UI package and the API client. Node 22.18
                  or later runs the TypeScript sources directly.
                </p>
              </Step>
              <Step title="Add the package">
                <p>
                  Copy the package template to <Code>packages/integration-status</Code> and create one data file per app.
                  List every existing screen as a module with an honest status: a status page that starts empty is never
                  filled.
                </p>
              </Step>
              <Step title="Wire the scripts">
                <p>Add the doc script and append the check to lint, then generate the first doc.</p>
                <CodeBlock title="package.json" code={scriptsExample} />
              </Step>
              <Step title="Add the page">
                <p>
                  Copy the UI components into the shared UI package, add the route to each app, and add{" "}
                  <Code>INTEGRATION_STATUS_PAGE=</Code> to each <Code>.env.example</Code>.
                </p>
              </Step>
              <Step title="Verify">
                <p>
                  <Code>pnpm status:doc --check</Code> exits 0, lint and type checks pass, and the page loads with the flag on
                  and returns 404 with it off.
                </p>
              </Step>
            </Steps>

            <H2 id="upgrading">Upgrading from v1</H2>
            <P>
              The tool copies its code into the repo, so updating the plugin changes nothing in a repo that is already set
              up. The upgrade is a guided merge in four stages. Each is one commit and can be reverted on its own, and
              the last two are opt-in.
            </P>
            <Table
              head={["Stage", "Adds", "New dependency"]}
              rows={v2UpgradeStages.map((row) => [row.stage, row.adds, row.dependency])}
            />
            <List
              items={[
                "Existing data files compile untouched: every new field is optional.",
                "Links to #module-<id> and #ask-<id> keep working, and the page still opens in the list view.",
                "Stage 1 lists every status that has fallen behind before the new rules are enforced, so they are corrected in that commit.",
                "The plugin keeps working with a repo that has not been upgraded, and an upgraded repo works for a teammate without the plugin.",
              ]}
            />

            <H2 id="upkeep">Keeping it current</H2>
            <Table
              head={["When", "Do"]}
              rows={[
                ["A screen is wired", "Update the module's status, endpoints and note."],
                ["A backend problem is found", "Add an ask with where, what and why, and link it from the modules it blocks."],
                ["The backend says it is fixed", "Mark the ask claimed with the date."],
                ["The fix is measured on staging", "Mark it fixed, record the answer, and update the modules."],
                ["A pending check is confirmed (v2)", "Remove the pending item. If nothing else holds the module back, promote it to connected."],
                ["An ask is logged or a screen is wired (v2)", "Write its probe or smoke, run pnpm status:smoke, then record."],
                ["Any of the above", "Run pnpm status:doc and commit it separately as docs(integration-status): …"],
              ]}
            />
            <Callout title="Help for AI-assisted work">
              The plugin adds Claude Code hooks. If a session commits wiring code without a matching integration-status
              update, the assistant is sent back once to log it. In version 2 it is also sent back when wiring has no
              check, and it is told at the start of a session what the checks found.
            </Callout>

            <H2 id="limits">Limits</H2>
            <P>
              The three limits of version 1 are covered under <a href="#whats-new" className="text-zinc-200 underline decoration-zinc-600 underline-offset-4">What&apos;s new in v2</a>.
              These are the ones that remain.
            </P>
            <List items={v2RemainingLimits} />

            <div className="mt-16 flex flex-col gap-4 border-t border-zinc-800 pt-8 sm:flex-row sm:items-center sm:justify-between">
              <Link href="/#tools" className="hero-link text-sm">
                <span aria-hidden="true">←</span> Back to the portfolio
              </Link>
              <Link href="/#contact" className="hero-link text-sm">
                Ask me about it <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </main>

        {/* Right: on this page */}
        <aside className="hidden xl:block" aria-label="On this page">
          <div className="sticky top-28 text-sm">
            <p className="mb-3 font-medium text-zinc-100">On this page</p>
            <ul className="space-y-2 text-zinc-500">
              {toc.map((item) => (
                <li key={item.id}>
                  <a href={`#${item.id}`} className="transition-colors hover:text-zinc-100">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
