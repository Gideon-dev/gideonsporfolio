// Single source for project content: the Experience folders on the home page
// and the case-study pages under /work/[slug] both read from here.
// Keep every claim inside what the CV states and what the code shows.

export type Fact = { label: string; value: string };

export type CasePoint = { title: string; detail: string };

export type CaseSection = {
  heading: string;
  intro?: string;
  points: readonly CasePoint[];
};

export type Project = {
  slug: string;
  name: string;
  /** Short product description shown beside the name. */
  kind: string;
  role: string;
  period: string;
  /** Shows a "Recent work" tag on the folder and the case page. */
  recent?: boolean;
  location: string;
  /** Folder card: two sentences at most. */
  summary: string;
  /** Folder card: three or four short lines. */
  highlights: readonly string[];
  stack: readonly string[];
  facts: readonly Fact[];
  /** Public product link, when there is one. */
  href?: string;
  linkLabel?: string;
  /** Case study: what the product is. */
  overview: readonly string[];
  /** Case study: how I fitted into the team. */
  myRole: string;
  sections: readonly CaseSection[];
};

const LOCATION = "Remote · Lagos, Nigeria";

// Written oldest first; shown newest first.
const entries: readonly Project[] = [
  {
    slug: "bambamload",
    name: "BamBamLoad",
    kind: "Multi-application e-commerce SaaS",
    role: "Frontend Engineer",
    period: "Feb 2026",
    location: LOCATION,
    summary:
      "A B2B marketplace for sand and building materials in Nigeria, run as one Turborepo of Next.js apps for buyers, suppliers, admins and the public site. I built supplier and admin management workflows and the table and modal patterns they share.",
    highlights: [
      "Shared data table with a server-pagination mode, matching loading skeletons and tooltips that show only when text is cut off",
      "Product, order and team modals on parallel and intercepting routes, so every modal has its own URL and still opens over the list",
      "A delete flow that turns into an archive recommendation when a product is tied to existing orders",
      "One typed ROUTES object and one zod schema convention across the buyer, supplier and admin apps",
    ],
    stack: ["Next.js 16", "React 19", "TypeScript", "Turborepo", "Tailwind CSS 4", "TanStack Query", "TanStack Table", "zod"],
    facts: [
      { label: "Product", value: "B2B building-materials marketplace" },
      { label: "Apps", value: "Buyer, supplier, admin, public website" },
      { label: "My focus", value: "Supplier and admin workflows, shared table and modal patterns" },
      { label: "Team", value: "Small team, alongside a senior engineer" },
    ],
    href: "https://bambamload.com",
    linkLabel: "bambamload.com",
    overview: [
      "BamBamLoad is a marketplace where contractors and builders buy sand and building materials directly from suppliers. Buyers browse, negotiate and check out; suppliers manage products, inventory, orders and their team; operations staff approve suppliers and oversee payments.",
      "The frontend is a Turborepo monorepo of Next.js App Router apps (buyer, supplier, admin and the public website) on shared UI, utility and query packages.",
    ],
    myRole:
      "I worked as a frontend engineer in a small team, alongside a senior engineer. I built the interface workflows and shared patterns described here. Connecting several of these screens to the live API was done together with the team.",
    sections: [
      {
        heading: "Product and supplier management",
        intro: "The supplier and admin apps are table-heavy, so most of this work went into one table that every list screen could share.",
        points: [
          {
            title: "A shared data table with server pagination",
            detail:
              "Built on TanStack Table in the shared UI package. Passing a serverPagination prop turns the table into a display shell: it stops paginating in memory, works out the page count from the server total and only reports page changes to the caller. Without the prop it paginates client-side, so older screens kept working. The page list shortens with ellipses and shows fewer numbers on small screens.",
          },
          {
            title: "Skeletons that match the real table",
            detail:
              "The loading skeleton mirrors the table's border, header, rows and optional toolbar and pagination, with cell widths that vary by row so it does not read as a grey block. It is used for first load, refetches and in-flight mutations.",
          },
          {
            title: "Tooltips only when text is actually cut off",
            detail:
              "A column can opt in to truncation. The cell measures itself and shows a tooltip only when its text overflows, so short values never get a pointless tooltip.",
          },
          {
            title: "Supplier product list",
            detail:
              "Search, status and page live in the URL, so a filtered list can be refreshed or shared. Search is debounced, any filter change returns to page one, and there is a single clear-filters action. Row actions (view, edit, archive, unarchive, delete) are shown or hidden by product status, and the table supports row selection.",
          },
          {
            title: "Bulk upload",
            detail: "Suppliers can add many products at once through a spreadsheet dropzone that opens as a modal over the product list.",
          },
          {
            title: "Archive and delete",
            detail:
              "Delete has two states. If the product cannot be deleted because orders reference it, the same modal changes to explain why and recommends archiving instead, so the supplier is never left at a dead end.",
          },
          {
            title: "Supplier review for the admin team",
            detail:
              "Approve, reject and suspend dialogs with required reasons, a commission dialog, document review and tabbed supplier detail (KYC, overview, financials, audit), with phone numbers validated by libphonenumber.",
          },
        ],
      },
      {
        heading: "Modal workflows on parallel and intercepting routes",
        intro: "Supplier actions such as add, edit, archive, accept order or change role open as modals, but each one is a real route.",
        points: [
          {
            title: "Modals with URLs",
            detail:
              "Each section has a @modal parallel slot with intercepting routes. Clicking an action navigates to its URL; Next.js intercepts it and draws the modal over the list, which stays mounted underneath.",
          },
          {
            title: "One RouteModal wrapper",
            detail:
              "A small wrapper owns open state and closing. It supports two close strategies, going back or replacing with a base URL, guards against double navigation, and shares its close handler through context so modal content does not need props drilled into it.",
          },
          {
            title: "Same behaviour from a link or a pasted URL",
            detail:
              "Closing by replace gives the same result whether the modal was opened from the list or loaded directly. On a hard refresh the real route renders the same modal component, in most cases together with the list behind it.",
          },
          {
            title: "No stale modals",
            detail: "Empty default and catch-all files in the slot make sure a modal's content is cleared when the user navigates back to the list.",
          },
          {
            title: "Sign-in returns somewhere sensible",
            detail:
              "If a session expires while a modal is open, the login form strips the modal segment from the return path, so the user lands on the page rather than on a bare modal URL.",
          },
          {
            title: "Reuse on detail pages",
            detail:
              "A second wrapper provides the same context from local state, so the archive, delete and order modals can also open over a product's detail page without changing the route.",
          },
        ],
      },
      {
        heading: "Routes and schema conventions",
        points: [
          {
            title: "A single ROUTES object",
            detail:
              "I introduced one typed route map for every app, with dynamic paths as functions, for example ACTIONS.EDIT(id). I then replaced hand-written template strings across the supplier app with it, which also fixed links that were missing a leading slash. It is now imported in well over a hundred files.",
          },
          {
            title: "One way to name and place schemas",
            detail:
              "Form schemas live under lib/schemas by domain, are named in capitals with a _SCHEMA suffix, and their types are always inferred from the schema, never written by hand. I applied this across the admin, buyer and supplier apps in one pass and wrote the convention down for the team.",
          },
          {
            title: "Multi-step forms on one schema",
            detail:
              "The add-product wizard uses a single schema. A typed map says which fields belong to each step, and the wizard validates only those fields before moving on.",
          },
        ],
      },
    ],
  },
  {
    slug: "filmporte",
    name: "Filmporte",
    kind: "Film distribution platform",
    role: "Frontend Engineer",
    period: "Jun 2026",
    location: LOCATION,
    summary:
      "A pay-per-view platform where independent filmmakers publish, price and premiere films, and audiences buy tickets and watch protected streams. I worked on the film page architecture, region-aware pricing and playback reliability.",
    highlights: [
      "Split a 953-line client-side film page into a server-rendered shell with small client islands for the player and checkout",
      "Region-aware pricing with request types that make an invalid payload a compile error",
      "Fixed playback failing to resume after a page refresh",
      "Entitlement, ticketing and gift-voucher flows that survive sign-in and stale data",
    ],
    stack: ["Next.js 15", "React 19", "TypeScript", "TanStack Query", "Zustand", "zod", "Mux Player", "Tailwind CSS"],
    facts: [
      { label: "Product", value: "Pay-per-view cinema for independent film" },
      { label: "Apps", value: "Viewer, producer dashboard, admin, landing" },
      { label: "My focus", value: "Film page architecture, pricing, playback and tickets" },
      { label: "Team", value: "Wider frontend team, alongside a senior engineer" },
    ],
    href: "https://films.filmporte.com",
    linkLabel: "films.filmporte.com",
    overview: [
      "Filmporte lets filmmakers upload a film, set prices by region and sell time-limited tickets. Viewers buy a ticket or redeem a voucher and watch a protected stream.",
      "The platform is four Next.js apps on one API: the audience app, the producer dashboard, an internal admin console and the marketing site. Payments run through Paystack and Stripe, and video through Mux.",
    ],
    myRole:
      "I work on Filmporte alongside a senior engineer, inside a wider frontend team. The work here is the part I was involved in. It builds on payment, player and upload foundations laid by other engineers on the team.",
    sections: [
      {
        heading: "Server-rendered film details page",
        intro:
          "The film page was one 953-line client component. The server sent a skeleton, the film was fetched three times per visit, and every playback tick re-rendered the whole page.",
        points: [
          {
            title: "A server shell with client islands",
            detail:
              "The page is now an async server component that renders the title, synopsis, credits, gallery, cast and poster as HTML, with structured data for search engines. Interactive parts (player, ticket panel, checkout modals, live progress) are separate client components that receive only plain data.",
          },
          {
            title: "One cached loader",
            detail:
              "Metadata, structured data and the page body share a single cached loader, which took film fetches per navigation from three to two. A failed fetch is treated as not found, and a missing channel theme only costs the custom colours.",
          },
          {
            title: "Streaming and purchase are decoupled",
            detail:
              "Checkout runs on a reducer, with separate hooks for entitlement, playback, deep links and payment detection. Three different copies of the payment-resume logic became one, and payment keys in local storage are written from a single module.",
          },
          {
            title: "Prices are still fetched in the browser, on purpose",
            detail:
              "Prices depend on the viewer's region, and the server would see its own region. The ticket panel refetches with the server's film as placeholder data, and the hero reads its price from that same panel, so the two can never disagree.",
          },
          {
            title: "Nothing ejects a viewer mid-film",
            detail:
              "Background refetches are ignored while a film is playing, and a payment settles by checking entitlement for a few seconds, which replaced a full page reload that raced the payment confirmation.",
          },
          {
            title: "Recorded results",
            detail:
              "From the project's own before and after notes: the heading, poster and theme are now in the server HTML, the page store shrank from 235 to 133 lines, and lint warnings on the touched files went from 13 to 0.",
          },
        ],
      },
      {
        heading: "Region-aware pricing",
        intro: "Pricing moved from a fixed local and international pair to any number of regional tiers, matched by country, then continent, then a catch-all.",
        points: [
          {
            title: "Request types that refuse invalid combinations",
            detail:
              "The create-pricing request is a discriminated union: one arm carries the regional tier list, the other the older local and international pair, and each forbids the other's fields. Mixing formats fails at compile time, not as a rejected request.",
          },
          {
            title: "Checks before the request leaves",
            detail: "The builder asserts there is exactly one default tier and that it names no regions, which mirrors the API's own rule.",
          },
          {
            title: "Reading saved pricing defensively",
            detail:
              "The API returns one row per country or continent, so a three-tier setup can come back as ten rows. The parser groups rows back into tiers and classifies each in a fixed order. If anything cannot be read with confidence, editing is switched off, so an edit is never built from a partial picture.",
          },
          {
            title: "Payment and wallet routing",
            detail:
              "The settlement country was being looked up by currency, and several countries share a currency. It is now resolved by ISO country code. In the audience app, the payment gateway is chosen from the gateway the backend returns, and currency display reads the currency code directly.",
          },
        ],
      },
      {
        heading: "Playback, entitlement and tickets",
        points: [
          {
            title: "Resume after a refresh",
            detail:
              "Refreshing during an active session could leave the player unable to load the video, because the resume path was assembled from data that did not include the playback details. Resume now goes through the stream endpoint, which returns the active view and its progress, and the player starts from there.",
          },
          {
            title: "Stable playback",
            detail:
              "The stream a session starts with is kept for the whole session, which stopped switching tabs from restarting the film. Playback after a refresh waits for an explicit Continue Watching action.",
          },
          {
            title: "Entitlement that reflects reality",
            detail:
              "After a viewing ends the page returns to the purchase state with a brief skeleton instead of showing a stale ticket. A not-found response is treated as no ticket, while network errors are not, and tickets the backend marks unusable are respected.",
          },
          {
            title: "Bulk gift vouchers",
            detail:
              "Buyers can purchase 5 to 50 gift vouchers in one order. The chosen tier and quantity are kept in the URL, so they survive signing in part-way through. Redeeming a voucher is a checkout at full discount that skips the payment gateway.",
          },
        ],
      },
    ],
  },
  {
    slug: "sandwich",
    name: "Sandwich",
    kind: "Multi-application job board and HRMS frontend",
    role: "Frontend Engineer",
    period: "Sep 2026",
    location: LOCATION,
    summary:
      "A recruitment and HR platform: a candidate job board, an employer hiring workspace and an HR management app, all in one Turborepo. I built the frontend: the shared packages the apps stand on, the data table, the API and cache layer, and the portals themselves.",
    highlights: [
      "Shared UI, API-client, query, utility and security packages used by every Next.js app in the repo",
      "A data table with client, server and cursor pagination behind one API",
      "Retry rules by status code, and cancelled requests that are never mistaken for server errors",
      "Cursor paging and cache patching so pipeline changes show at once without flicker",
    ],
    stack: ["Next.js 16", "React 19", "TypeScript", "Turborepo", "Tailwind CSS 4", "TanStack Query", "OpenAPI codegen", "zod"],
    facts: [
      { label: "Product", value: "Job board, employer ATS and HRMS" },
      { label: "Apps", value: "Candidate, employer, HRMS, admin, two marketing sites" },
      { label: "My focus", value: "Shared platform packages, data table, API and query state" },
      { label: "Ownership", value: "Sole frontend engineer" },
    ],
    href: "https://dev-website-recruit.sandwichrecruit.com/",
    linkLabel: "sandwichrecruit.com",
    overview: [
      "Sandwich covers hiring from both sides and the HR work that follows: candidates search and apply for jobs, employers post jobs and move applicants through a pipeline, and companies manage their people in the HR app.",
      "The frontend is a pnpm and Turborepo monorepo of Next.js apps that share one set of internal packages.",
    ],
    myRole:
      "I handled the Sandwich frontend on my own, from setting up the monorepo and its shared packages to building features across the candidate, employer and HR apps, working with the backend team on the API.",
    sections: [
      {
        heading: "A shared frontend platform",
        intro: "Every app is assembled from the same internal packages, so a fix or a new primitive lands everywhere at once.",
        points: [
          {
            title: "UI package",
            detail:
              "Vendored shadcn primitives plus shared composites: the data table, dashboard shell and sidebar, form field wrappers, a wizard stepper, charts and a workspace switcher, with brand tokens per app.",
          },
          {
            title: "API client package",
            detail:
              "The SDK, types and query helpers are generated from the backend's OpenAPI spec and committed. A hand-written layer adds one axios instance, a typed error class, and a sign-out bridge on 401 that apps register themselves, so the package never imports a router.",
          },
          {
            title: "Codegen that does not break the build",
            detail:
              "The generation script probes the spec first. If the spec is unreachable it keeps the committed SDK so builds continue, and on a fresh clone with no spec it writes typed placeholders so the repo still type-checks.",
          },
          {
            title: "Query package",
            detail: "One query client with the shared retry policy, created per request on the server and once in the browser.",
          },
          {
            title: "Security package",
            detail:
              "A single Content-Security-Policy builder that each app can extend, restrictive default headers, a report-only mode, and a Cloudflare Turnstile gate used by every app's auth routes.",
          },
        ],
      },
      {
        heading: "UI primitives and portal features",
        points: [
          {
            title: "A standard DataTable",
            detail:
              "Generic over the row type, with three pagination modes chosen by the props you pass: client (the table slices rows), server (page, size and total) and cursor (a Load more button). Sorting cycles through ascending, descending and off, sets aria-sort, and sorts a copy so cached data is never mutated.",
          },
          {
            title: "Careful states",
            detail:
              "Skeleton rows while loading, separate empty and no-results states, and select-all that covers only the visible page. The card and its toolbar stay mounted across states, so a search box does not lose focus mid-typing. In development it warns if local sorting is used over server-paged data.",
          },
          {
            title: "Candidate portal",
            detail:
              "Job search with filters and cursor paging, job detail and apply with résumé and screening questions, saved jobs with optimistic updates, applications and offers.",
          },
          {
            title: "Employer portal",
            detail:
              "Job management, a hiring pipeline with stage moves, rejections, offers and notes, applicant pages, company profile, and team invitations.",
          },
          {
            title: "HR app",
            detail: "Sign-in, company setup, roles and invitations, plus the attendance, leave and performance screens.",
          },
        ],
      },
      {
        heading: "API integration and query state",
        points: [
          {
            title: "Retry rules by status",
            detail:
              "Client errors and cancellations are never retried. Server errors and dropped connections retry at most twice with backoff. A rate-limit response retries once, and only when the server asks for a wait of a few seconds. Mutations are never retried. Without this, a single 401 would have triggered sign-out four times.",
          },
          {
            title: "Cancellation handled correctly",
            detail:
              "Every query passes its abort signal through to the request. A cancelled request is re-thrown as a cancellation, so it is not converted into a server error and retried.",
          },
          {
            title: "Cursor pagination",
            detail:
              "Infinite lists read the server's cursor and has-next flag, stop cleanly when the cursor is empty, and keep the previous rows visible, dimmed, while a new filter loads.",
          },
          {
            title: "Cache updates without flicker",
            detail:
              "In the hiring pipeline a change is patched into every cached list that contains the applicant, keeping the paging data intact, and the lists are then refetched in the background. The inbox marks messages read optimistically, with a snapshot to roll back to if the request fails.",
          },
        ],
      },
    ],
  },
  {
    slug: "thatpurpledot",
    name: "ThatPurpleDot",
    kind: "Custom WooCommerce storefront",
    role: "Frontend Engineer",
    period: "Oct 2026",
    location: LOCATION,
    summary:
      "A storefront for a fashion house with three brands that share one store, one bag and one checkout. I designed and built the custom theme and the commerce plugin behind it, with no page builder.",
    highlights: [
      "Theme for presentation, plugin for commerce rules: anything that must survive a redesign lives in the plugin",
      "A shipping engine in plain PHP for Lagos areas, other Nigerian states and international zones",
      "Brand rules enforced in the editor, quick edit, bulk edit and the REST API",
      "Accessible dialogs, menus and accordions, tested in a real browser",
    ],
    stack: ["WordPress", "WooCommerce", "PHP", "TypeScript", "Vite", "Tailwind CSS 4"],
    facts: [
      { label: "Product", value: "Three-brand fashion storefront" },
      { label: "Build", value: "Custom theme and commerce plugin" },
      { label: "My focus", value: "Architecture, shipping, brand rules, accessibility and tests" },
      { label: "Status", value: "Live" },
    ],
    href: "https://www.thatpurpledot.com",
    linkLabel: "thatpurpledot.com",
    overview: [
      "That Purple Dot is a fashion house with a ready-to-wear line, a second label and a bespoke atelier. All three sell through one WooCommerce store with a shared bag and checkout, but each needs its own catalogue, landing page and rules.",
      "I built it as a custom theme and a custom plugin, using TypeScript modules and Tailwind on the front end and no page builder. The store is live at thatpurpledot.com.",
    ],
    myRole: "This is my own build, from architecture to tests. I made the design decisions and recorded them as written decision notes in the repository.",
    sections: [
      {
        heading: "Theme and plugin, kept apart",
        points: [
          {
            title: "One rule for where code goes",
            detail:
              "If something has to survive a redesign, it does not belong in the theme. The theme holds templates, styles and interface modules; the plugin holds brands, collections, catalogue rules, shipping, policies and the newsletter, and never depends on the theme.",
          },
          {
            title: "Filters as the contract",
            detail:
              "Templates ask the plugin for what they need through named WordPress filters, for example the active brand, the homepage content or a product page's data, and get back validated, normalised data. Templates never work out brand or collection relationships themselves.",
          },
          {
            title: "A small build pipeline",
            detail: "TypeScript modules and Tailwind are built with Vite and loaded through its manifest, with self-hosted fonts and design tokens in one place.",
          },
        ],
      },
      {
        heading: "Deterministic shipping",
        intro: "Delivery pricing is a pure function: the same bag and address always give the same answer, and it can be tested without WordPress running.",
        points: [
          {
            title: "Three kinds of destination",
            detail:
              "Lagos is priced by delivery area at a fixed rate. Other Nigerian states use a regional base rate up to two kilograms, then a rate for each started kilogram above that. International orders use the first weight row at or above the bag's weight for the destination zone.",
          },
          {
            title: "It says why when it cannot quote",
            detail:
              "Each case where no rate is offered has a named reason, such as a product with no weight, no area selected or a bag over the maximum weight, and each reason maps to a customer message the merchant can edit. An unset fallback rate means no delivery, never free delivery.",
          },
          {
            title: "Edge cases found along the way",
            detail:
              "Weights are rounded to remove floating-point noise, so 1.1 kg plus 1.9 kg is not charged as a fourth kilogram. The Lagos area field checks country and state together, because Louisiana shares the code LA. A saved Lagos area is ignored for any other state.",
          },
          {
            title: "Orders keep their own record",
            detail:
              "Each order stores the shipping calculation it was charged with, so later rate changes never alter past orders. The merchant manages rates in four sections that save independently and reject the whole section if any value is invalid.",
          },
        ],
      },
      {
        heading: "Brand constraints",
        points: [
          {
            title: "Brands as a first-class concept",
            detail: "Brands are a plugin-owned taxonomy with stable slugs. Two brands can be assigned to products; the atelier's work is a separate content type and cannot be purchased.",
          },
          {
            title: "Every way of editing is covered",
            detail:
              "The brand rule is checked in the full product editor before anything saves, in quick edit and bulk edit, and on writes through the WordPress REST API, so a product cannot pick up an invalid brand from a side door.",
          },
          {
            title: "Collections belong to one brand",
            detail:
              "Each collection has exactly one owning brand, which cannot change while the collection has products. Catalogue pages are scoped by brand and collection, and breadcrumbs are built from them, not from generic categories.",
          },
        ],
      },
      {
        heading: "Accessible interface and browser tests",
        points: [
          {
            title: "Dialogs on the native element",
            detail:
              "Modals use the native dialog element for focus trapping and Escape. Focus returns to the control that opened the dialog, a drag that starts inside does not close it, and the close animation is skipped for people who prefer reduced motion.",
          },
          {
            title: "Menus and accordions",
            detail:
              "The mega menu is a disclosure with proper expanded state and keyboard support, and opens on hover only for mouse users. Mobile submenus move focus predictably. FAQs use native details elements linked to the URL.",
          },
          {
            title: "Motion that can be turned off",
            detail: "The video hero does not autoplay under reduced motion and has a labelled play and pause control; carousels and transitions follow the same setting.",
          },
          {
            title: "Tests without a test framework",
            detail:
              "Integration scripts run against a real local WordPress install, create their own fixtures and clean up after themselves. Browser tests launch headless Chrome and drive it directly over the Chrome DevTools Protocol to check viewports, keyboard navigation and the real checkout. Small unit tests cover the interface modules.",
          },
        ],
      },
    ],
  },
  {
    slug: "intelsprings",
    name: "IntelSprings",
    kind: "Experiential learning platform",
    role: "Frontend Engineer",
    period: "Oct 2026 – Present",
    recent: true,
    location: LOCATION,
    summary:
      "A practice-first learning platform for students and professionals in finance, tax and related fields. Four Next.js apps for learners, instructors and administrators, built on a shared platform with a server-side session layer. I build the frontend on my own.",
    highlights: [
      "A backend-for-frontend proxy that keeps access tokens in httpOnly cookies and out of page scripts",
      "A course builder with drag and drop, a constrained rich-text editor and autosave",
      "Certificates with a server-rendered QR code and a public verification page",
      "One Docker image recipe that builds and ships any of the four apps",
    ],
    stack: ["Next.js 16", "React 19", "TypeScript", "Turborepo", "Tailwind CSS 4", "TanStack Query", "dnd-kit", "Tiptap", "Docker"],
    facts: [
      { label: "Product", value: "Practice-first learning for finance and business professions" },
      { label: "Apps", value: "Learner, instructor, institution admin, staff console" },
      { label: "My focus", value: "Session layer, course builder, certificates, release path" },
      { label: "Ownership", value: "Sole frontend engineer" },
      { label: "Status", value: "In development, pre-launch" },
    ],
    linkLabel: "Private beta · walkthrough on request",
    overview: [
      "IntelSprings teaches by doing. Every lesson follows the same five-stage loop: do, reflect, learn, reinforce, transfer. Learners work through a real task first and meet the theory after. Courses are organised by discipline, course, level and lesson, and each level ends in an assessment gate and a verifiable certificate.",
      "The frontend is a Turborepo of four Next.js apps: the learner app, the instructor app with its course builder, an institution admin console and an internal staff console. They share UI, API-client, query and security packages. The platform is in active development against a test backend and has not launched.",
    ],
    myRole:
      "I handle the IntelSprings frontend on my own, across all four apps, from the shared platform and session layer to the course builder and the release pipeline.",
    sections: [
      {
        heading: "A session layer the browser never sees",
        intro: "The browser never talks to the backend directly. Each app has one catch-all API route that proxies every call.",
        points: [
          {
            title: "Tokens live in httpOnly cookies",
            detail:
              "On sign-in the proxy moves the access and refresh tokens out of the response body and into httpOnly cookies, so no page script can read them. On the way out it adds the bearer token from the cookie.",
          },
          {
            title: "Safe failures",
            detail:
              "A 401 clears the session cookies. Error responses are stripped of the backend's internal exception details before they reach the browser. State-changing requests must come from the app's own pages.",
          },
          {
            title: "Refresh before expiry, once",
            detail:
              "Tokens are refreshed when less than a minute remains, rather than retried after a 401, because an upload body cannot be sent twice. Parallel requests share a single refresh call, which matters because the backend rotates the refresh token on every use.",
          },
          {
            title: "Private by default",
            detail:
              "A shared proxy sends signed-out visitors to sign-in before a page renders, using an allow-list of public paths, so a newly added route is private unless someone says otherwise. Security headers and the Content-Security-Policy come from one shared builder.",
          },
        ],
      },
      {
        heading: "Course builder",
        intro: "Instructors build a course step by step: setup, structure, an editor for each stage of each lesson, then review and publish.",
        points: [
          {
            title: "Rules enforced in code",
            detail:
              "Lesson content is validated by zod schemas, and the course rules (lessons per level, the minimum number of gate and drill questions, the minimum length of reflection prompts) are checked before publishing, not left to reviewers.",
          },
          {
            title: "Accessible drag and drop",
            detail:
              "Levels and lessons are reordered with dnd-kit, using both pointer and keyboard sensors. Screen-reader announcements use item names rather than ids, and the motion respects reduced-motion settings.",
          },
          {
            title: "A constrained rich-text editor",
            detail:
              "The theory editor is Tiptap, limited to an agreed set of elements, with custom nodes for media (with alt text and transcript) and formulas, so content stays consistent across courses.",
          },
          {
            title: "Autosave that does not lose work",
            detail:
              "Edits save after a short pause, with only one save in flight at a time. The builder saves when the instructor leaves the page and keeps failed edits so they can be retried.",
          },
        ],
      },
      {
        heading: "Certificates, design system and release path",
        points: [
          {
            title: "Verifiable certificates",
            detail:
              "The certificate QR code is rendered on the server as a single SVG path: no client JavaScript, and sharp when printed. The public verification page has verified and pending states and structured data, and only verified certificates can be indexed.",
          },
          {
            title: "Tokens, not colours",
            detail:
              "Components use semantic token names only, and each app supplies its own values, so the four apps share every component while keeping their own look.",
          },
          {
            title: "One image recipe for four apps",
            detail:
              "A multi-stage Dockerfile prunes the monorepo down to the chosen app, installs from a cached store, builds Next.js in standalone mode and ships a small Node runtime. A publish script pushes images tagged by stage and commit, and the API address is read at runtime instead of being baked in.",
          },
          {
            title: "Quality gates on every commit",
            detail:
              "Pre-commit hooks lint the staged files and type-check only the apps that changed. Lint includes accessibility rules and fails on any warning.",
          },
          {
            title: "Where integration-status started",
            detail:
              "The integration-status tool described on this site was first built here, to track which screens were wired to the test backend and what each blocked screen was waiting on.",
          },
        ],
      },
    ],
  },
];

export const projects: readonly Project[] = [...entries].reverse();

export const getProject = (slug: string) => projects.find((project) => project.slug === slug);
