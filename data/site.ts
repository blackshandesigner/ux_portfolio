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
  { value: "5+", label: "Years in B2B SaaS.", tone: "sage" },
  { value: "0→1", label: "AI Product Delivery.", tone: "lavender" },
  { value: "EMEA", label: "International B2B Users.", tone: "charcoal" },
  { value: "3×", label: "International Design Awards.", tone: "peach" },
];

export const experiences = [
  {
    start: "07/2021",
    end: "Present",
    duration: "Berlin, Germany",
    title: "Product Designer",
    company: "Customer Alliance GmbH",
    description: "",
    achievements: [
      "Led end-to-end design and delivery of AI-driven features from 0 to 1, launching AI Insights MVPs. This tool helps hotel managers across the EMEA region understand customer sentiment and take AI-recommended actions, improving satisfaction and revenue performance.",
      "Developed and maintained an accessible design system and design tokens fully compliant with WCAG standards by integrating Figma, Zeroheight, and the codebase to resolve inconsistent naming and maintenance issues. This significantly streamlined design-development workflows, enhanced system scalability, and improved cross-functional collaboration with engineers.",
      "Applied a data-driven design approach, integrating global user research, usability testing, Google Analytics, and customer interviews to pinpoint pain points and optimize solutions. Improvements were continuously measured through KPIs such as CSAT and NPS.",
      "Defined and implemented an AI-driven design framework utilizing intelligent prototyping and behavior analysis to enhance user-centered design and delivery.",
      "Maintained hands-on design work to stay connected with the design process by developing user stories, prototypes, mockups, and detailed specifications to communicate design solutions.",
    ],
  },
  {
    start: "08/2020",
    end: "10/2020",
    duration: "Milan, Italy",
    title: "UI/UX Design Intern",
    company: "Penguinpass",
    description: "",
    achievements: [
      "Designed multiple landing page mockups to support marketing campaigns and event engagement strategies.",
      "Redesigned the Penguinpass trade fair UI to improve clarity and usability.",
      "Collaborated with the project manager to coordinate design tasks and ensure alignment with business and user needs.",
      "Contributed to a lean, user-focused design process in a startup environment.",
    ],
  },
  {
    start: "05/2020",
    end: "08/2020",
    duration: "Milan, Italy",
    title: "UI/UX Designer (Project)",
    company: "Ktchn Lab, Vinhood, Morsy",
    description: "",
    achievements: [
      "Designed a contactless food delivery app to help the HoReCa sector adapt during COVID-19, improving the ordering flow and customer experience.",
      "Addressed the urgent needs of a rapidly shifting food and beverage industry, focusing on safety, accessibility, and digital adaptability.",
    ],
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
