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

export type GoalBubble = {
  text: string;
  kind: 'small' | 'main';
  x0: number;
  y0: number;
  x1: number;
  y1: number;
  s0: number;
  s1: number;
  size: string;
};

export type WireframeSlide = {
  alt: string;
  src: string;
};

export type ExploreFeature = {
  label: string;
  descriptionHtml: string;
  alt: string;
};

export type ScaleCard = {
  eyebrow: string;
  title: string;
  text: string;
  variant: 'system' | 'handoff';
};

export type OutcomeTile = {
  kind: 'photo' | 'stat' | 'icon';
  delayClass?: string;
  labelHtml?: string;
  shapes?: Array<{ style: string }>;
  statPre?: string;
  statNum?: string;
  statUnit?: string;
  statPostHtml?: string;
  iconBodyHtml?: string;
};

export type ReflectionLesson = {
  number: string;
  label: string;
  title: string;
  body: string;
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

export const goals = {
  eyebrow: 'Goals',
  heading: 'Defining the redesign goals.',
  ariaLabel: 'Small improvements grouping into three redesign goals',
  visionKicker: 'Vision',
  visionText: 'Turn scattered fixes into one clear path: find value fast, feel progress early, and move through a calmer system.',
  bubbles: [
    { text: 'fewer dead ends', kind: 'small', x0: -43, y0: -28, x1: -23, y1: -8, s0: 0.9, s1: 0.66, size: '92px' },
    { text: 'clear content paths', kind: 'small', x0: -18, y0: -36, x1: -21, y1: -12, s0: 1, s1: 0.64, size: '112px' },
    { text: 'visible free states', kind: 'small', x0: -35, y0: 19, x1: -19, y1: 8, s0: 0.92, s1: 0.62, size: '86px' },
    { text: 'Clearer paths', kind: 'main', x0: -10, y0: 28, x1: -21, y1: 0, s0: 0.92, s1: 1.04, size: '170px' },
    { text: 'shorter setup', kind: 'small', x0: 4, y0: -31, x1: -2, y1: -11, s0: 0.95, s1: 0.64, size: '98px' },
    { text: 'progress cues', kind: 'small', x0: 16, y0: 27, x1: 2, y1: 9, s0: 1, s1: 0.66, size: '108px' },
    { text: 'early reward', kind: 'small', x0: -5, y0: 15, x1: -3, y1: 6, s0: 0.96, s1: 0.62, size: '88px' },
    { text: 'Faster momentum', kind: 'main', x0: 25, y0: -10, x1: 0, y1: 0, s0: 0.88, s1: 1.04, size: '170px' },
    { text: 'calmer hierarchy', kind: 'small', x0: 33, y0: -34, x1: 19, y1: -11, s0: 0.96, s1: 0.64, size: '102px' },
    { text: 'accessible contrast', kind: 'small', x0: 43, y0: 6, x1: 23, y1: 7, s0: 0.94, s1: 0.62, size: '96px' },
    { text: 'reusable components', kind: 'small', x0: 22, y0: 31, x1: 19, y1: 10, s0: 1, s1: 0.64, size: '110px' },
    { text: 'Calmer system', kind: 'main', x0: 8, y0: -4, x1: 21, y1: 0, s0: 0.9, s1: 1.04, size: '170px' }
  ] satisfies GoalBubble[]
};

export const wireframes = {
  eyebrow: 'Process',
  heading: 'Wireframing every core flow.',
  subtitleHtml: '<em>Dozens of low-fidelity screens</em> mapped the full experience <em>before a single pixel was polished</em>.',
  slides: [
    { alt: 'Onboarding question screen', src: 'https://framerusercontent.com/images/IUZwbv1PpIeWqeRZXN94th99eA.png?width=375&height=812' },
    { alt: 'Today home screen', src: 'https://framerusercontent.com/images/Ia9D6ia7dpXYYvb0RPwt9kdLQX8.png?width=375&height=812' },
    { alt: 'Daily goals, no measurement', src: 'https://framerusercontent.com/images/1fyoxlrdpsqT4A2eRowdWaHY3zQ.png?width=375&height=812' },
    { alt: 'Daily goals setup', src: 'https://framerusercontent.com/images/GkNFaDA7KDpcYJKM3ef4X0eLqs.png?width=375&height=812' },
    { alt: 'Exercises list', src: 'https://framerusercontent.com/images/lF5ihXcN4UJQjW3wZfbNvpzGwys.png?width=375&height=812' },
    { alt: 'Exercises overview', src: 'https://framerusercontent.com/images/wMv8cOW7LUrqzgUjWrVKQlYNY.png?width=375&height=812' },
    { alt: 'Exercise detail', src: 'https://framerusercontent.com/images/2pytTADzx4CBo2lxd3wbd53mXA.png?width=375&height=812' }
  ] satisfies WireframeSlide[]
};

export const validation = {
  eyebrow: 'Validation',
  heading: 'The structure worked before the polish.',
  scoreKicker: 'Moderated test, n=10',
  scoreMain: '9',
  scoreTotal: '/10',
  scoreCaption: 'found a useful exercise without help.',
  rows: [
    { label: 'Before', value: '3/10', width: '33%' },
    { label: 'Wireframe', value: '9/10', width: '90%' }
  ],
  beta: 'Same core task, same user profile, redesigned information architecture.',
  noteKicker: 'Reconsidered after testing',
  noteTitle: 'Progress still did not feel motivating enough.',
  noteText: 'Users could find an exercise, but the reward loop felt too quiet. That pushed the next design pass toward clearer progress cues, streaks, and moments of feedback.'
};

export const explore = {
  eyebrow: 'Design',
  heading: 'Even more thoughtful. Even more calming.',
  copyHtml: 'Meet the redesigned Meta Learn. Built around a single daily check-in, <strong>tailored exercises</strong>, and a streak system that actually feels earned.',
  features: [
    {
      label: 'Home dashboard',
      alt: 'Abstract home dashboard placeholder',
      descriptionHtml: '<strong>Home dashboard.</strong> Your evening check-in, mood picker, and personalized exercise picks — all in one glance.'
    },
    {
      label: 'Personalized onboarding',
      alt: 'Abstract personalized onboarding placeholder',
      descriptionHtml: '<strong>Personalized onboarding.</strong> A guided setup that learns how you\'re feeling before recommending a single exercise.'
    },
    {
      label: 'Exercise library',
      alt: 'Abstract exercise library placeholder',
      descriptionHtml: '<strong>Exercise library.</strong> Filter by Interactive, Audio, or Text — and jump back into anything you\'ve favorited.'
    },
    {
      label: 'Guided exercise detail',
      alt: 'Abstract guided exercise placeholder',
      descriptionHtml: '<strong>Guided exercise detail.</strong> Clear instructions and an optional mood check-in before you even start the timer.'
    },
    {
      label: 'Live breathing session',
      alt: 'Abstract breathing session placeholder',
      descriptionHtml: '<strong>Live breathing session.</strong> A focused, full-screen breathing guide with a visible countdown so you always know where you are.'
    },
    {
      label: 'Streak rewards',
      alt: 'Abstract streak rewards placeholder',
      descriptionHtml: '<strong>Streak rewards.</strong> Finish onboarding and unlock a full week of premium access — momentum, rewarded.'
    }
  ] satisfies ExploreFeature[]
};

export const scale = {
  eyebrow: 'Collab',
  heading: 'Built to scale.',
  cards: [
    {
      eyebrow: 'Design system',
      title: 'Carry your system everywhere.',
      text: '80 components, fully documented in Figma. The dev team ships new features 50% faster since handoff.',
      variant: 'system'
    },
    {
      eyebrow: 'Handoff',
      title: 'App Store ready.',
      text: 'Passed Apple review on first submission. Helped close a seed funding round with a refreshed investor deck.',
      variant: 'handoff'
    }
  ] satisfies ScaleCard[]
};

export const outcomes = {
  eyebrow: 'Outcomes',
  heading: "The numbers don't lie.",
  tiles: [
    {
      kind: 'photo',
      labelHtml: 'SUS usability score<br><strong>84 pts</strong> — up from 52',
      shapes: [
        { style: 'width:180px;height:180px;background:#e8e8ed;bottom:-50px;left:-40px;opacity:.86' },
        { style: 'width:120px;height:120px;background:#d6d6dc;bottom:10px;left:60px;opacity:.7' },
        { style: 'width:80px;height:80px;background:#c7c7cc;bottom:60px;left:120px;opacity:.58' },
        { style: 'width:100px;height:100px;background:#f5f5f7;bottom:-20px;right:-20px;opacity:1' }
      ]
    },
    {
      kind: 'photo',
      delayClass: 'd1',
      labelHtml: 'Task completion<br><strong>2.1× faster</strong> across 5 flows',
      shapes: [
        { style: 'width:200px;height:140px;background:#e8e8ed;bottom:-30px;right:-50px;opacity:.86' },
        { style: 'width:110px;height:110px;background:#d6d6dc;bottom:20px;left:20px;opacity:.68' },
        { style: 'width:70px;height:70px;background:#c7c7cc;bottom:70px;left:80px;opacity:.55' },
        { style: 'width:90px;height:60px;background:#f5f5f7;bottom:0;left:-10px;opacity:1' }
      ]
    },
    {
      kind: 'stat',
      delayClass: 'd2',
      statPre: 'Up to',
      statNum: '+71',
      statUnit: '%',
      statPostHtml: '30-day retention<br>after redesign launch'
    },
    {
      kind: 'stat',
      statNum: '3',
      statPostHtml: 'Onboarding steps<br>down from 11'
    },
    {
      kind: 'photo',
      delayClass: 'd1',
      labelHtml: 'Time to first action<br><strong>12 s</strong> from cold launch',
      shapes: [
        { style: 'width:160px;height:160px;background:#e8e8ed;bottom:-40px;right:-30px;opacity:.86' },
        { style: 'width:100px;height:100px;background:#d6d6dc;bottom:20px;left:10px;opacity:.68' },
        { style: 'width:65px;height:65px;background:#c7c7cc;bottom:70px;left:70px;opacity:.55' },
        { style: 'width:120px;height:80px;background:#f5f5f7;bottom:-10px;left:-20px;opacity:1' }
      ]
    },
    {
      kind: 'icon',
      delayClass: 'd2',
      statPostHtml: '80-component<br>design system',
      iconBodyHtml: 'Fully documented in Figma. The dev team ships new features <strong>50% faster</strong> since handoff.'
    }
  ] satisfies OutcomeTile[]
};

export const reflections = {
  eyebrow: 'Reflection',
  heading: 'What I learned.',
  takeawayLabel: 'Main takeaway',
  takeawayText: 'The interface was never the first problem. The path was.',
  takeawayNote: 'Once the product had a clear route to value, the visual system had something meaningful to support. Next, I would deepen the progress model around adaptive paths and richer habit cues.',
  lessons: [
    {
      number: '01',
      label: 'Navigation',
      title: 'Structure is invisible until it breaks.',
      body: 'Users did not describe the app as an information architecture problem. They described it as feeling stuck, unsure, or unmotivated.'
    },
    {
      number: '02',
      label: 'Research',
      title: 'The numbers made the feeling actionable.',
      body: 'Testing and analytics turned a vague sense of friction into specific decisions: fewer steps, clearer entry points, and visible progress.'
    }
  ] satisfies ReflectionLesson[]
};

export const moreWork = {
  eyebrow: 'More work',
  heading: "See what else I've been building."
};
