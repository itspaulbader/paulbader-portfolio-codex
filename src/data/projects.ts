export type ProjectCard = {
  id: string;
  themeClass: string;
  extraClass?: string;
  backgroundClass: string;
  backgroundStyle?: string;
  icon:
    | { type: 'image'; src: string; alt: string }
    | { type: 'text'; label: string; style?: string };
  company: string;
  year: string;
  titleHtml: string;
  description: string;
  tags: string[];
  href: string;
  comingSoon?: boolean;
  desktopImage: {
    src: string;
    alt: string;
    style?: string;
  };
  mobileImage: {
    src: string;
    alt: string;
    style?: string;
  };
};

export const projects: ProjectCard[] = [
  {
    id: 'bershka',
    themeClass: 'card-violet',
    backgroundClass: 'bershka-bg',
    icon: { type: 'image', src: 'images/bershka-icon.jpg', alt: 'Bershka logo' },
    company: 'Bershka',
    year: '2025',
    titleHtml: 'A smoother<br>self-checkout',
    description: 'Redesigning the in-store experience to reduce friction and speed up payment.',
    tags: ['Product Design', 'Onboarding', 'User Flow'],
    href: '#',
    comingSoon: true,
    desktopImage: { src: 'images/bershka-desk.png', alt: 'Bershka self-checkout kiosk' },
    mobileImage: { src: 'images/bershka-desk-mobile2.png', alt: 'Bershka self-checkout', style: 'object-position: center center;' }
  },
  {
    id: 'sheer',
    themeClass: 'card-dark',
    extraClass: 'card-sheer',
    backgroundClass: 'sheer-bg',
    backgroundStyle: 'background-color: #1a1040;',
    icon: { type: 'image', src: 'images/sheer-icon.jpeg', alt: 'Sheer logo' },
    company: 'Sheer',
    year: '2023',
    titleHtml: 'Quicker & better<br>onboarding',
    description: 'Creating a seamless entry point so users could start strong without friction.',
    tags: ['SaaS', 'Product Design', 'User Flow'],
    href: '#',
    desktopImage: { src: 'images/sheer-desktop.png', alt: 'Sheer', style: 'object-position: 75% 55%;' },
    mobileImage: { src: 'images/sheer-mobile.png', alt: 'Sheer', style: 'object-position: center center;' }
  },
  {
    id: 'meta-learn',
    themeClass: 'card-light',
    backgroundClass: 'ml-bg',
    backgroundStyle: 'background-color: #fff;',
    icon: { type: 'text', label: 'ML', style: 'background:#dbeafe;color:#1d4ed8;' },
    company: 'Meta Learn',
    year: '2024',
    titleHtml: 'Mental fitness,<br>made intuitive',
    description: 'Meta Learn is a mobile app for stress relief, focus, and emotional resilience.',
    tags: ['Research', 'UX/UI Design', 'Branding'],
    href: 'meta-learn.html',
    desktopImage: { src: 'images/meta-learn-hero.png', alt: 'Meta Learn' },
    mobileImage: { src: 'images/ml-mobile.png', alt: 'Meta Learn app screens', style: 'object-position: center center;' }
  },
  {
    id: 'grundfos',
    themeClass: 'card-ink',
    backgroundClass: 'grundfos-bg',
    backgroundStyle: 'background-color: #12213a;',
    icon: { type: 'image', src: 'images/grundfos-icon.png', alt: 'Grundfos logo' },
    company: 'Grundfos',
    year: '2020',
    titleHtml: 'From print to<br>PowerApp',
    description: 'UX-driven internal tool used by 200+, replacing 80% of printed material.',
    tags: ['PowerApps', 'Mobile Design', 'UX/UI Design'],
    href: '#',
    desktopImage: { src: 'images/grundfos-hero.png', alt: 'Grundfos PowerApp' },
    mobileImage: { src: 'images/grundfos-mobile.png', alt: 'Grundfos', style: 'object-position: center center;' }
  }
];
