export type MetaLearnHero = {
  eyebrow: string;
  titleHtml: string;
  meta: Array<{ label: string; value: string }>;
};

export type Highlight = {
  text: string;
  align: 'left' | 'center' | 'right';
  dark?: boolean;
  style: string;
};

export type ResearchCard = {
  label: string;
  title: string;
  body: string;
  visualClass?: string;
  visualStyle?: string;
  visualText?: string;
  modalBodyHtml: string;
};

export const hero: MetaLearnHero = {
  eyebrow: 'Meta Learn',
  titleHtml: 'Mental fitness,<br>made intuitive.',
  meta: [
    { label: 'Role', value: 'Product Designer' },
    { label: 'Team', value: '4 people' },
    { label: 'Timeline', value: '8 weeks' }
  ]
};

export const highlights: Highlight[] = [
  {
    text: 'A brand-new design system, rebuilt from the ground up for clarity.',
    align: 'left',
    dark: true,
    style: "background-image:linear-gradient(rgba(0,0,0,0.4),rgba(0,0,0,0) 42%),url('images/ml/node-35.png')"
  },
  {
    text: '84 SUS usability score, up from 52. Now above the industry benchmark.',
    align: 'center',
    style: 'background:radial-gradient(120% 120% at 80% 0%,#eafbe9,#cdeccf)'
  },
  {
    text: '2.1× faster task completion across the five core flows.',
    align: 'right',
    style: 'background:radial-gradient(120% 120% at 80% 0%,#eef0ff,#cdd4f4)'
  },
  {
    text: '+71% 30-day retention after the redesign launched.',
    align: 'center',
    style: 'background:radial-gradient(120% 120% at 80% 0%,#ffeef5,#f7c9dc)'
  },
  {
    text: 'An 80-component design system, documented and App Store ready.',
    align: 'center',
    style: 'background:radial-gradient(120% 120% at 80% 0%,#fff7e3,#ffe6ab)'
  },
  {
    text: 'Onboarding cut from 11 steps to 3 — value before commitment.',
    align: 'center',
    dark: true,
    style: "background-image:linear-gradient(rgba(0,0,0,0.4),rgba(0,0,0,0) 42%),url('images/ml/node-42.png')"
  }
];

export const problem = {
  eyebrow: 'Problem',
  heading: 'Great content. Poor delivery.',
  body: 'Meta Learn already had strong content: science-backed exercises, quality programs, and real mental-fitness expertise. The problem was access. Key actions were buried, progress was invisible, and users dropped off before reaching the value.'
};

export const research = {
  eyebrow: 'Research',
  heading: 'Research confirmed what users already felt.',
  cards: [
    {
      label: 'Usability testing',
      title: 'Users could not find the next step.',
      body: 'Exercise content existed, but the route to it felt unclear and easy to abandon.',
      visualStyle: '--px:6.3%',
      modalBodyHtml: '<p>In moderated sessions, users struggled to discover new exercises even when the content was available.</p><p>The main issue was not content quality. It was the lack of an obvious path forward after the first few taps.</p>'
    },
    {
      label: 'Analytics',
      title: 'Progress had no visible anchor.',
      body: 'Users had little feedback on improvement, consistency, or what their sessions added up to.',
      visualStyle: '--px:49.85%',
      modalBodyHtml: '<p>Behavioural data showed that sessions rarely surfaced streaks, history, or outcomes.</p><p>Without visible feedback, users had little reason to connect one session to the next.</p>'
    },
    {
      label: 'Heuristic evaluation',
      title: 'High-value actions sat too deep.',
      body: 'Useful tools were often two or three taps away from the moments users needed them.',
      visualStyle: '--px:93.6%',
      modalBodyHtml: '<p>The expert review found that core tools were often hidden behind menus or low-priority screens.</p><p>Actions users needed frequently were not visible enough to support quick use.</p>'
    },
    {
      label: 'User surveys',
      title: 'Onboarding asked too much too soon.',
      body: 'The original setup delayed value and lost most new users before they reached the product.',
      visualClass: 'r-visual--tint',
      visualText: '68%',
      modalBodyHtml: '<p>The original 11-step setup asked users for commitment before they had experienced value.</p><p>Survey responses showed that 68% of new users quit before finishing onboarding.</p>'
    },
    {
      label: 'User interviews',
      title: 'Professionals wanted quick wins.',
      body: 'Users needed short, credible sessions they could fit between meetings without searching.',
      visualClass: 'r-visual--tint',
      visualStyle: 'background:radial-gradient(120% 120% at 78% 8%, #eef0ff, #cdd4f4)',
      visualText: '18',
      modalBodyHtml: '<p>Time-pressed professionals wanted fast, science-backed sessions they could fit between meetings.</p><p>The redesign needed to make those quick wins visible from the start.</p>'
    },
    {
      label: 'SUS testing + benchmarking',
      title: 'Usability benchmarked poorly.',
      body: 'The original app scored 52 on SUS, well below the 68-point industry benchmark.',
      visualClass: 'r-visual--tint',
      visualStyle: 'background:radial-gradient(120% 120% at 78% 8%, #fff7e3, #ffe6ab)',
      visualText: '52',
      modalBodyHtml: '<p>A System Usability Scale study put the original app at 52 points, below the 68-point industry benchmark.</p><p>That score validated the qualitative findings with a clear baseline for improvement.</p>'
    },
    {
      label: 'Desk research',
      title: 'Habit loops were missing.',
      body: 'Research pointed to cues, streaks, and rewards as the missing support for repeat use.',
      visualClass: 'r-visual--tint',
      visualStyle: 'background:radial-gradient(120% 120% at 78% 8%, #eafbe9, #cdeccf)',
      visualText: '40+',
      modalBodyHtml: '<p>A review of cognitive-training literature pointed to cues, streaks, and rewards as important retention supports.</p><p>The original app had content, but it lacked the reinforcement loops that help users return.</p>'
    }
  ] satisfies ResearchCard[]
};
