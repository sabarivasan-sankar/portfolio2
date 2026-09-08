export type Role = "recruiter" | "engineer" | "founder";

export type Access = "granted" | "restricted";

export const ROLES: { id: Role; label: string; principal: string; blurb: string }[] = [
  {
    id: "recruiter",
    label: "recruiter",
    principal: "talent@company",
    blurb: "Fit, availability, and how to reach me.",
  },
  {
    id: "engineer",
    label: "engineer",
    principal: "dev@company",
    blurb: "How the systems actually work under the hood.",
  },
  {
    id: "founder",
    label: "founder",
    principal: "founder@company",
    blurb: "What these systems changed for the business.",
  },
];

/** Short, punchy lines built to carry display-scale type. One set per role. */
export const HEADLINES: Record<Role, string[]> = {
  recruiter: ["Three years.", "Two promotions.", "One company where it had to work."],
  engineer: ["Idempotent webhooks.", "Indexed permission checks.", "Streams, not nightly batches."],
  founder: ["Billing that runs itself.", "Permissions that hold.", "Data that stays in sync."],
};

export type ResourceKind = "prose" | "timeline" | "stack" | "credentials" | "links";

export type Resource = {
  id: string;
  path: string;
  scope: string;
  /** Restricted for every role, with an honest reason. */
  restricted?: string;
  kind: ResourceKind;
  /** Per-role body copy. The same work, framed for who is reading. */
  body?: Record<Role, string>;
};

export const RESOURCES: Resource[] = [
  {
    id: "identity",
    path: "identity/summary",
    scope: "read:identity",
    kind: "prose",
    body: {
      recruiter:
        "Mid-level full-stack engineer with 3+ years at Rently Software Development, promoted twice from intern. Strongest in secure backend systems: access control, billing, payments, and data pipelines, with React and TypeScript on the front end. Based in Coimbatore, open to new roles.",
      engineer:
        "TypeScript and React on the front end, Node.js, Express, and PostgreSQL behind it. Day to day I work on authorization models, payment integrations, and Kafka pipelines. I care most about the parts that have to stay correct under retries and partial failure.",
      founder:
        "Three years building the systems that move money and grant permissions. I've owned invoicing, billing, payment integration, and the access-control layer, so I'm used to work where a bug is a financial or compliance problem rather than a cosmetic one.",
    },
  },
  {
    id: "experience",
    path: "experience/rently",
    scope: "read:history",
    kind: "timeline",
  },
  {
    id: "sys-rbac",
    path: "systems/access-control",
    scope: "read:systems",
    kind: "prose",
    body: {
      recruiter:
        "Owns the role- and permission-based access control layer securing enterprise workflows across the platform.",
      engineer:
        "A granular role and permission model replacing a flat role check. Authorization resolves through a single indexed query per request instead of a cascade of role lookups, so permission checks never became the request-path bottleneck.",
      founder:
        "Enterprise customers can delegate admin duties without over-granting access. That removed a recurring blocker in security review and made larger accounts easier to onboard.",
    },
  },
  {
    id: "sys-payments",
    path: "systems/payments",
    scope: "read:systems",
    kind: "prose",
    body: {
      recruiter:
        "Integrated the Cybersource payment gateway for one-time client payments and automated recurring billing cycles.",
      engineer:
        "Cybersource integration covering one-off charges and scheduled billing. Webhook handling is idempotent, so a retried callback never double-charges, and invoice state reconciles against the gateway rather than trusting local writes.",
      founder:
        "The billing cycle runs end to end without manual intervention. Money moves on schedule, and failed charges surface as events to act on instead of going silent.",
    },
  },
  {
    id: "sys-pipelines",
    path: "systems/data-pipelines",
    scope: "read:systems",
    kind: "prose",
    body: {
      recruiter:
        "Engineered Kafka-based data pipelines syncing high-volume data across multiple enterprise systems.",
      engineer:
        "Change data capture streams row-level changes into Kafka, with Celigo and REST consumers downstream. It replaced a nightly batch job, so systems converge continuously instead of once a day.",
      founder:
        "Inventory and billing data stay aligned across systems in near real time. That cut the class of reconciliation problems that came from overnight batches drifting out of sync.",
    },
  },
  {
    id: "source",
    path: "systems/*/source",
    scope: "read:source",
    kind: "prose",
    restricted:
      "Employer-owned code. Not publicly disclosable, so the writeups above describe architecture and outcomes only.",
  },
  {
    id: "stack",
    path: "stack/technical",
    scope: "read:stack",
    kind: "stack",
  },
  {
    id: "credentials",
    path: "credentials",
    scope: "read:credentials",
    kind: "credentials",
  },
  {
    id: "contact",
    path: "contact/channels",
    scope: "read:contact",
    kind: "links",
  },
  {
    id: "phone",
    path: "contact/phone",
    scope: "read:contact.phone",
    kind: "prose",
    restricted: "Withheld by owner policy. Email and LinkedIn are the open channels.",
  },
];

/** Engineers see the full stack including the familiar-but-not-primary tier. */
export function showsFamiliarTier(role: Role) {
  return role === "engineer";
}

export const RESTRICTED_COUNT = RESOURCES.filter((r) => r.restricted).length;
export const GRANTED_COUNT = RESOURCES.length - RESTRICTED_COUNT;
