export type Accent = "sage" | "lavender" | "peach" | "blueGray" | "paleGreen";

export type Project = {
  number: string;
  title: string;
  shortTitle: string;
  category: string[];
  challenge: string;
  approach: string;
  outcome?: string;
  status?: string;
  slug: string;
  accent: Accent;
  previewImage: string;
  timeline: string;
  role: string;
  team: string;
  context: string;
  problem: string;
  research: string[];
  insights: { title: string; detail: string }[];
  decisions: { title: string; detail: string }[];
  outcomes: string[];
  learning: string;
};

export const projects: Project[] = [
  {
    number: "01",
    title: "Making money feel less intimidating",
    shortTitle: "A kinder first week in personal finance",
    category: ["UX Research", "Product Strategy", "Mobile"],
    challenge: "New members left before connecting their first account.",
    approach: "Funnel analysis, interviews, and three rounds of prototype testing.",
    outcome: "+24% onboarding completion and a clearer path to first value.",
    slug: "personal-finance-activation",
    accent: "sage",
    previewImage: "/projects/project-1.webp",
    timeline: "12 weeks · 2025",
    role: "Lead Product Designer",
    team: "1 PM · 4 engineers · 1 data analyst",
    context: "Pocketwise helps early-career professionals understand spending and build resilient money habits. Growth was healthy, but too many new members stalled before seeing a useful insight.",
    problem: "The onboarding flow asked for trust, financial access, and unfamiliar decisions before showing any meaningful value. The team needed to improve activation without adding urgency or manipulative patterns.",
    research: ["18 new-member interviews", "Onboarding funnel review", "Competitive trust audit", "3 rounds of moderated testing"],
    insights: [
      { title: "Trust arrives in layers", detail: "People wanted to know what would happen to their data before being asked to connect an account." },
      { title: "A blank state feels like failure", detail: "Members interpreted an empty dashboard as evidence they had done something wrong." },
      { title: "One useful answer beats a tour", detail: "A personalized spending snapshot created more confidence than feature education." },
    ],
    decisions: [
      { title: "Lead with a promise", detail: "We reframed setup around the insight members would receive, then explained each permission in context." },
      { title: "Make progress tangible", detail: "A three-step structure replaced the long checklist and preserved state across sessions." },
      { title: "Design a useful fallback", detail: "People could explore a sample snapshot before linking live financial data." },
    ],
    outcomes: ["24% lift in completed account connections", "17% faster time to first insight", "Support contacts about linking fell 31%"],
    learning: "Trust is not a disclosure screen. It is a sequence of small, understandable exchanges that prove the product deserves the next commitment.",
  },
  {
    number: "02",
    title: "Turning trip planning into a shared rhythm",
    shortTitle: "Collaborative planning without the spreadsheet",
    category: ["Product Design", "Collaboration", "Mobile"],
    challenge: "Group travelers coordinated across too many disconnected tools.",
    approach: "Diary study, co-creation workshops, and interaction prototyping.",
    outcome: "2.1× more shared itinerary contributions in the beta cohort.",
    slug: "collaborative-travel-planning",
    accent: "lavender",
    previewImage: "/projects/project-2.webp",
    timeline: "16 weeks · 2024",
    role: "Senior Product Designer",
    team: "1 PM · 3 engineers · 1 researcher",
    context: "Roamly is a travel-planning app for small groups. People loved saving places but still relied on chat threads and spreadsheets to make actual decisions together.",
    problem: "Planning felt like project management. Suggestions, decisions, and booking details lived in separate places, leaving one person to carry the invisible coordination work.",
    research: ["10-day diary study", "12 group-planning interviews", "2 co-creation workshops", "Unmoderated concept test"],
    insights: [
      { title: "Ideas and decisions are different", detail: "Groups needed a low-pressure place to collect options before asking anyone to commit." },
      { title: "The organizer needs relief", detail: "One person usually became the human notification system for the entire trip." },
      { title: "Time is the shared constraint", detail: "People planned around energy and distance, not just lists of destinations." },
    ],
    decisions: [
      { title: "Separate saving from scheduling", detail: "A shared shortlist let the group react first and place ideas on the itinerary later." },
      { title: "Show planning load", detail: "Gentle prompts surfaced unresolved items without turning the trip into a task board." },
      { title: "Design for the day", detail: "A spatial day view made travel time and pace visible at a glance." },
    ],
    outcomes: ["2.1× more itinerary contributions", "38% fewer planning messages reported", "Beta satisfaction rose from 3.8 to 4.5/5"],
    learning: "Collaboration improves when a product makes different levels of commitment visible, without forcing a group to decide too early.",
  },
  {
    number: "03",
    title: "A calmer path to the right care",
    shortTitle: "Healthcare booking designed around uncertainty",
    category: ["Service Design", "Accessibility", "Responsive Web"],
    challenge: "People abandoned booking when they could not identify the right service.",
    approach: "Journey mapping, content testing, and accessible prototype validation.",
    outcome: "Task success increased from 62% to 91% in usability studies.",
    slug: "healthcare-booking",
    accent: "peach",
    previewImage: "/projects/project-3.webp",
    timeline: "10 weeks · 2024",
    role: "Product Designer & Researcher",
    team: "Clinical lead · 1 PM · 3 engineers",
    context: "Harbor Health connects people with virtual and in-person care. Its booking flow mirrored the organization chart rather than the way patients describe what they need.",
    problem: "People arrived stressed and uncertain, yet the interface asked them to choose between clinical service names they did not understand. Errors appeared only at the end of the flow.",
    research: ["Patient journey mapping", "Plain-language content tests", "Screen-reader walkthroughs", "Moderated mobile usability testing"],
    insights: [
      { title: "Symptoms are a starting point", detail: "Patients spoke in goals and symptoms, not in clinic departments or appointment types." },
      { title: "Availability changes the decision", detail: "People traded preferred format for a faster appointment when timing was made clear." },
      { title: "Reassurance is functional", detail: "Short explanations reduced hesitation more effectively than adding more options." },
    ],
    decisions: [
      { title: "Ask human questions", detail: "The service selector begins with what the person needs help with, then maps to available care." },
      { title: "Compare complete options", detail: "Time, format, price, and provider details appear together before selection." },
      { title: "Validate as you go", detail: "Inline guidance and forgiving inputs prevent late-stage errors." },
    ],
    outcomes: ["91% booking task success", "Median completion time fell by 42%", "Accessibility review passed WCAG 2.2 AA criteria"],
    learning: "In high-stress journeys, clarity is not cosmetic. Every label, sequence, and default has to reduce uncertainty at the moment it appears.",
  },
  {
    number: "04",
    title: "Analytics that invite better questions",
    shortTitle: "From reporting dashboard to decision workspace",
    category: ["Enterprise UX", "Data Visualization", "Web App"],
    challenge: "Teams exported reports because the dashboard could not explain change.",
    approach: "Workflow observation, taxonomy redesign, and progressive prototyping.",
    outcome: "Weekly active use grew 46% across pilot accounts.",
    slug: "decision-analytics",
    accent: "blueGray",
    previewImage: "/projects/project-4.webp",
    timeline: "20 weeks · 2023",
    role: "Senior Product Designer",
    team: "2 PMs · 6 engineers · data science",
    context: "Northstar gives operations teams a shared view of performance. The dashboard was technically powerful but optimized for report builders rather than daily decision-makers.",
    problem: "Users could see that a metric changed but not what contributed to the movement. They exported data to spreadsheets to compare segments, annotate patterns, and brief stakeholders.",
    research: ["8 contextual inquiries", "Query-log analysis", "Information architecture audit", "Concept benchmark study"],
    insights: [
      { title: "Comparison creates meaning", detail: "A metric became useful only when teams could compare it to a relevant period or segment." },
      { title: "Analysis is collaborative", detail: "People needed to preserve interpretation and context, not just share a chart." },
      { title: "Power needs a gentle entry", detail: "Flexible controls mattered, but visible defaults helped occasional users begin." },
    ],
    decisions: [
      { title: "Build around questions", detail: "We introduced guided comparison paths instead of exposing every filter at once." },
      { title: "Keep context with the data", detail: "Annotations and saved views made team reasoning durable and shareable." },
      { title: "Reveal depth progressively", detail: "A clear default dashboard expands into advanced analysis without changing mental models." },
    ],
    outcomes: ["46% growth in weekly active use", "Report exports decreased by 28%", "Analysis setup time fell from 11 to 4 minutes"],
    learning: "Data products become decision tools when they preserve the question, comparison, and interpretation—not only the output.",
  },
  {
    number: "05",
    title: "Evidence, organized around decisions",
    shortTitle: "An AI research workspace for product teams",
    category: ["AI Product", "Research Ops", "In progress"],
    challenge: "Research knowledge was searchable but difficult to apply confidently.",
    approach: "Discovery interviews, retrieval experiments, and trust-pattern exploration.",
    status: "In progress · private beta",
    slug: "research-knowledge-ai",
    accent: "paleGreen",
    previewImage: "/projects/project-5.webp",
    timeline: "In progress · 2026",
    role: "Founding Product Designer",
    team: "1 founder · 2 engineers · 6 design partners",
    context: "Threadline helps product teams recover and reuse research across projects. Early prototypes can locate relevant evidence, but discovery partners need more than a generated answer.",
    problem: "Summaries often remove the context required to judge evidence. Teams need to understand where a claim came from, how strong it is, and whether it still applies to the current decision.",
    research: ["14 discovery interviews", "Evidence-retrieval benchmark", "Trust and citation concept tests", "Weekly design-partner sessions"],
    insights: [
      { title: "A result is not evidence", detail: "Teams need a traceable chain from recommendation to source material and study context." },
      { title: "Contradictions are useful", detail: "Different findings often reflect meaningful segment or timing differences, not bad data." },
      { title: "The decision is the organizing unit", detail: "People searched more effectively when they began with the choice in front of them." },
    ],
    decisions: [
      { title: "Cite at the claim level", detail: "Every generated synthesis links directly to the supporting excerpt and study context." },
      { title: "Surface tension", detail: "The workspace shows confirming and conflicting evidence together instead of flattening it." },
      { title: "Record what changed", detail: "Decision notes preserve which evidence mattered and what the team learned later." },
    ],
    outcomes: ["Private beta with 6 cross-functional teams", "Retrieval benchmark accuracy at 89%", "Decision-history prototype now in validation"],
    learning: "AI can shorten the distance to evidence, but product trust depends on keeping provenance, uncertainty, and human judgment visible.",
  },
];

export const getProject = (slug: string) => projects.find((project) => project.slug === slug);
