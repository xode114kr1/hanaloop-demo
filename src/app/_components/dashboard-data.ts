export const navItems = [
  { label: "Dashboard", icon: "DB", active: true },
  { label: "Emissions", icon: "CO" },
  { label: "Lifecycle", icon: "LC" },
  { label: "Social", icon: "PS" },
  { label: "Reports", icon: "RP" },
];

export const metricCards = [
  {
    title: "Total Emissions",
    icon: "CO",
    value: "42,500",
    unit: "tCO2e",
    detail: "-5.2% vs last month",
    tone: "success",
  },
  {
    title: "Monthly Progress",
    icon: "MO",
    value: "-5.2%",
    detail: "Ahead of annual reduction goal",
    tone: "progress",
  },
  {
    title: "Highest Scope",
    icon: "S2",
    value: "Scope 2",
    detail: "Indirect energy consumption",
    tone: "scope",
  },
  {
    title: "Est. Carbon Tax",
    icon: "TX",
    value: "$1.2M",
    detail: "Projected for Fiscal Year 2024",
    tone: "risk",
  },
] as const;

export const emissions = [
  { month: "JAN", scope12: 60, scope3: 40 },
  { month: "FEB", scope12: 55, scope3: 35 },
  { month: "MAR", scope12: 65, scope3: 45 },
  { month: "APR", scope12: 50, scope3: 30 },
  { month: "MAY", scope12: 70, scope3: 50 },
  { month: "JUN", scope12: 45, scope3: 25 },
  { month: "JUL", scope12: 60, scope3: 40 },
  { month: "AUG", scope12: 75, scope3: 55 },
];

export const posts = [
  {
    category: "Policy Change",
    date: "Oct 12, 2023",
    title: "New Carbon Border Adjustment Mechanism compliance",
    content:
      "Upcoming reports include detailed breakdowns for all EU-bound exports following the latest directive.",
  },
  {
    category: "Announcement",
    date: "Oct 10, 2023",
    title: "Sustainable logistics partnership with GreenFreight",
    content:
      "Scope 3 downstream emissions are projected to fall through electric fleet optimization.",
  },
  {
    category: "Achievement",
    date: "Oct 05, 2023",
    title: "ISO 14064 certification renewed",
    content:
      "Greenhouse gas verification and validation processes met international standards again.",
  },
];

export const lifecycleStages = [
  {
    stage: "01",
    name: "Raw Material",
    emissions: "12.4 kg CO2e",
    icon: "RM",
    description:
      "Extraction and initial processing of sustainable aluminum and composite polymers.",
  },
  {
    stage: "02",
    name: "Manufacturing",
    emissions: "28.1 kg CO2e",
    icon: "MF",
    description:
      "High-efficiency assembly line powered by on-site renewable energy generation.",
  },
  {
    stage: "03",
    name: "Packaging",
    emissions: "3.2 kg CO2e",
    icon: "PK",
    description:
      "Recycled biodegradable materials with low-impact printing solutions.",
  },
  {
    stage: "04",
    name: "Transportation",
    emissions: "15.7 kg CO2e",
    icon: "TR",
    description:
      "Last-mile delivery via electric freight fleet and maritime shipping offsets.",
  },
  {
    stage: "05",
    name: "Use",
    emissions: "8.4 kg CO2e",
    icon: "US",
    description:
      "Average energy consumption over a five-year product lifecycle lifespan.",
  },
  {
    stage: "06",
    name: "End of Life",
    emissions: "-4.1 kg CO2e",
    icon: "EL",
    description:
      "Carbon credits earned through a comprehensive take-back and recycle program.",
  },
] as const;
