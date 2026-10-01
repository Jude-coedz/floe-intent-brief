export type IntentKey = "forecast" | "billing" | "overages";

export type IntentOption = {
  key: IntentKey;
  label: string;
  description: string;
  floeReply: string;
  screenTitle: string;
  screenDescription: string;
  primaryMetric: string;
  primaryValue: string;
  secondaryMetric: string;
  secondaryValue: string;
  detailTitle: string;
  detailRows: Array<{ label: string; value: string }>;
  learned: string;
};

export const intentOptions: IntentOption[] = [
  {
    key: "forecast",
    label: "Forecast monthly spend",
    description: "I need to know what usage will cost before the invoice lands.",
    floeReply: "Got it. Let’s skip invoice setup for now and look at how Meterly projects spend from live usage.",
    screenTitle: "Spend forecast",
    screenDescription: "Projected month-end cost based on current usage velocity.",
    primaryMetric: "Projected spend",
    primaryValue: "$6,460",
    secondaryMetric: "vs. last month",
    secondaryValue: "+8.4%",
    detailTitle: "Forecast drivers",
    detailRows: [
      { label: "API calls", value: "$3,820" },
      { label: "Seats", value: "$1,920" },
      { label: "Storage", value: "$720" },
    ],
    learned: "Predictability before the invoice matters more than billing setup.",
  },
  {
    key: "billing",
    label: "Bill customers accurately",
    description: "I need confidence that usage turns into the right customer charge.",
    floeReply: "Makes sense. I’ll take you straight to the rating and invoice preview instead of spend forecasting.",
    screenTitle: "Invoice preview",
    screenDescription: "Usage events translated into billable line items before invoices are issued.",
    primaryMetric: "Draft invoice",
    primaryValue: "$12,840",
    secondaryMetric: "Unrated events",
    secondaryValue: "0",
    detailTitle: "Line items",
    detailRows: [
      { label: "API usage", value: "$8,200" },
      { label: "Platform seats", value: "$3,840" },
      { label: "Storage overage", value: "$800" },
    ],
    learned: "Rating accuracy and invoice confidence are the real buying questions.",
  },
  {
    key: "overages",
    label: "Control overages",
    description: "I need to catch abnormal usage before costs get out of hand.",
    floeReply: "Understood. Let’s ignore invoicing for a moment and look at usage limits and alerts.",
    screenTitle: "Usage controls",
    screenDescription: "Thresholds that surface unusual usage before it becomes a surprise charge.",
    primaryMetric: "Accounts near limit",
    primaryValue: "4",
    secondaryMetric: "Alerts today",
    secondaryValue: "7",
    detailTitle: "Highest risk accounts",
    detailRows: [
      { label: "Northstar Labs", value: "92% of limit" },
      { label: "Orbit Systems", value: "87% of limit" },
      { label: "Acme Cloud", value: "81% of limit" },
    ],
    learned: "The buyer is evaluating operational control, not billing mechanics.",
  },
];

export const baseUsageRows = [
  { meter: "API calls", volume: "1.2M", rate: "$0.003 / call", projected: "$3,600" },
  { meter: "Seats", volume: "40", rate: "$48 / seat", projected: "$1,920" },
  { meter: "Storage", volume: "940 GB", rate: "$1 / GB", projected: "$940" },
];
