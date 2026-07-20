export type ExperienceItem = {
  company: string;
  role: string;
  period: string;
  logo?: {
    src: string;
    alt: string;
  };
  initials?: string;
};

export const experience: ExperienceItem[] = [
  {
    company: 'Sheer',
    role: 'UX/UI Designer',
    period: '2026 - Present',
    logo: {
      src: 'images/sheer-icon.jpeg',
      alt: 'Sheer logo'
    }
  },
  {
    company: 'Neeo Lab',
    role: 'Product & Brand Designer',
    period: '2024 - 2025',
    initials: 'NL'
  },
  {
    company: 'Make Influence',
    role: 'Product Designer',
    period: '2023 - 2024',
    initials: 'MI'
  },
  {
    company: 'Custimy',
    role: 'Product Designer',
    period: '2022 - 2023',
    initials: 'CU'
  },
  {
    company: 'Grundfos',
    role: 'Junior Designer',
    period: '2018 - 2022',
    logo: {
      src: 'images/grundfos-icon.png',
      alt: 'Grundfos logo'
    }
  }
];
