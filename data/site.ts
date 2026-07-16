export type NavigationItem = {
  label: string;
  href: string;
  external?: boolean;
};

export const navigation: NavigationItem[] = [
  { label: "Home", href: "/#home" },
  { label: "Work", href: "/#work" },
  { label: "About", href: "/#about" },
  { label: "Process", href: "/#process" },
  { label: "Contact", href: "/#contact" },
  { label: "LinkedIn ↗", href: "https://www.linkedin.com/in/yourprofile", external: true },
];

export const metrics = [
  { value: "8+", label: "Years of experience", tone: "sage" },
  { value: "12+", label: "Mobile products", tone: "lavender" },
  { value: "30+", label: "Research studies", tone: "charcoal" },
  { value: "20+", label: "Product launches", tone: "peach" },
];

export const experiences = [
  {
    start: "Jan 2022",
    end: "Present",
    duration: "4 yrs",
    title: "Senior Product Designer",
    company: "Digital Product Studio · Taipei",
    description: "Lead discovery, research, and interaction design for mobile and responsive product teams.",
    achievements: ["Created evidence-led product strategies across fintech and health.", "Designed and tested end-to-end journeys with engineering partners.", "Built reusable patterns that shortened delivery cycles."],
  },
  {
    start: "Mar 2020",
    end: "Dec 2021",
    duration: "1 yr 10 mos",
    title: "Product Designer",
    company: "Luma Financial · Remote",
    description: "Designed member experiences for a consumer finance platform during a period of rapid growth.",
    achievements: ["Redesigned onboarding and account-linking experiences.", "Established weekly research and experiment reviews.", "Partnered with data teams to define activation metrics."],
  },
  {
    start: "Jul 2018",
    end: "Feb 2020",
    duration: "1 yr 8 mos",
    title: "UX Researcher",
    company: "Urban Mobility Lab · Singapore",
    description: "Studied the daily travel behavior of riders and operations teams across Southeast Asia.",
    achievements: ["Ran mixed-method studies across four markets.", "Translated field insights into service concepts.", "Introduced a searchable research repository."],
  },
  {
    start: "Jun 2017",
    end: "Jun 2018",
    duration: "1 yr",
    title: "Interaction Designer",
    company: "Common Ground · Taipei",
    description: "Created accessible public-service and cultural experiences for web and mobile.",
    achievements: ["Built responsive prototypes for complex services.", "Facilitated alignment workshops with public stakeholders.", "Documented accessibility patterns for the studio."],
  },
];

export const processSteps = [
  ["01", "Align", "Understand goals, user needs, metrics, risks, constraints, and assumptions."],
  ["02", "Choose", "Select methods based on the decision, available time, risk, and complexity."],
  ["03", "Execute", "Interview, observe, prototype, test, and analyze behavior with care."],
  ["04", "Synthesize", "Identify patterns, tensions, unmet needs, and product opportunities."],
  ["05", "Decide", "Translate evidence into clear priorities and accountable product choices."],
  ["06", "Measure", "Evaluate usability, behavior, outcomes, and what the team learned."],
];

export const methods = {
  Qualitative: ["In-depth interviews", "Moderated usability testing", "Diary studies", "Contextual inquiry", "Co-creation", "Card sorting"],
  Quantitative: ["Surveys", "A/B testing", "Behavioral analysis", "Cohort analysis", "Funnel analysis"],
  Synthesis: ["Personas", "User segments", "Jobs to Be Done", "Journey maps", "Affinity mapping", "Opportunity solution trees"],
};

export const tools = ["Figma", "FigJam", "Dovetail", "Maze", "UserTesting", "Hotjar", "GA4", "Amplitude", "Mixpanel", "Notion", "Miro", "Airtable", "ChatGPT", "Claude", "Jira", "Webflow"];

export const capabilityGroups = [
  { title: "Core skills", items: ["UX Research", "Product Discovery", "Usability Testing", "Information Architecture", "Interaction Design", "Prototyping"] },
  { title: "Strategy", items: ["UX Strategy", "Design Systems", "Stakeholder Alignment", "Roadmap Prioritization", "Product Metrics"] },
  { title: "Outcomes", items: ["Reduced onboarding friction", "Improved activation", "Higher task completion", "Stronger design consistency", "Faster product validation"] },
  { title: "Languages", items: ["English — Professional", "Mandarin — Native", "Spanish — Intermediate"] },
];
