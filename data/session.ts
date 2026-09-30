export type EvidenceSource = "Discovery answer" | "Buyer question" | "Demo navigation" | "Follow-up action";

export type Signal = {
  id: string;
  label: string;
  summary: string;
  confidence: "Direct" | "Strong";
  evidence: {
    source: EvidenceSource;
    timestamp: string;
    quote: string;
    context: string;
  }[];
};

export const buyer = {
  name: "Maya Chen",
  role: "VP, Demand Generation",
  company: "Ledgerline",
  companySize: "220 employees",
  sessionLength: "12m 41s",
  source: "Pricing page",
};

export const nextMove = {
  title: "Run a technical validation call, not another product demo.",
  reason:
    "Maya has already seen the workflow. The open questions are CRM writeback, security posture, and procurement fit.",
  owner: "AE + Solutions Engineer",
  people: "Invite RevOps and Finance",
};

export const signals: Signal[] = [
  {
    id: "demo-gate",
    label: "Primary job",
    summary: "Replace the demo gate without adding more SE coverage.",
    confidence: "Direct",
    evidence: [
      {
        source: "Discovery answer",
        timestamp: "01:12",
        quote: "We have enough inbound. The problem is the wait between interest and someone actually seeing the product.",
        context: "Stated problem during discovery",
      },
      {
        source: "Buyer question",
        timestamp: "03:06",
        quote: "Could this handle the after-hours traffic without someone from our team joining?",
        context: "Confirms the coverage problem",
      },
    ],
  },
  {
    id: "hubspot",
    label: "Integration dependency",
    summary: "HubSpot writeback is part of the buying decision, not a nice-to-have.",
    confidence: "Direct",
    evidence: [
      {
        source: "Buyer question",
        timestamp: "05:42",
        quote: "Does the qualification data actually write back to HubSpot, or does someone still copy it over?",
        context: "Explicit integration requirement",
      },
      {
        source: "Demo navigation",
        timestamp: "06:03",
        quote: "Floe opened Integrations → HubSpot and showed the recap fields passed into CRM.",
        context: "Feature inspected during the demo",
      },
    ],
  },
  {
    id: "security",
    label: "Open blocker",
    summary: "Security and data handling still need a human answer before procurement moves.",
    confidence: "Strong",
    evidence: [
      {
        source: "Buyer question",
        timestamp: "09:18",
        quote: "Where is conversation data stored, and can we control how long you keep it?",
        context: "Security question not fully resolved in-session",
      },
      {
        source: "Follow-up action",
        timestamp: "11:54",
        quote: "Maya asked to include their RevOps lead and finance partner in the next conversation.",
        context: "Signals cross-functional evaluation",
      },
    ],
  },
];

export const evaluationPath = [
  {
    time: "01:12",
    title: "Discovery",
    detail: "Explains scheduling delay and SE coverage problem.",
    type: "Declared intent",
  },
  {
    time: "04:10",
    title: "Usage pricing",
    detail: "Checks whether the model works for a 40-seat revenue team.",
    type: "Commercial fit",
  },
  {
    time: "05:42",
    title: "HubSpot",
    detail: "Asks whether qualification and recap data write back automatically.",
    type: "Technical dependency",
  },
  {
    time: "09:18",
    title: "Security",
    detail: "Asks about data residency and retention controls.",
    type: "Open blocker",
  },
  {
    time: "11:54",
    title: "Next step",
    detail: "Requests a follow-up with RevOps and Finance included.",
    type: "Buying motion",
  },
];

export const callPrep = [
  {
    label: "Answer first",
    value: "Show exact HubSpot fields + writeback behaviour",
  },
  {
    label: "Bring",
    value: "Security posture + retention controls",
  },
  {
    label: "Avoid",
    value: "Repeating the core product walkthrough",
  },
];
