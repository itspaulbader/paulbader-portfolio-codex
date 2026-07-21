export type StoryMedia = {
  desktopImage?: string;
  mobileImage?: string;
  videoSrc?: string;
  alt: string;
  desktopPosition: string;
  mobilePosition: string;
  fit: 'cover' | 'contain';
};

export type StoryCardData = {
  id: string;
  kind: 'image' | 'experience' | 'video' | 'text';
  variantClass: string;
  wide?: boolean;
  backgroundColor: string;
  textPlacement?: 'center' | 'bottom';
  captionPlacement?: 'outside' | 'inside';
  media?: StoryMedia;
  text?: string;
  caption: {
    label: string;
    description: string;
  };
};

export const storyItems: StoryCardData[] = [
  {
    id: 'profile',
    kind: 'image',
    variantClass: 'sc-profile',
    backgroundColor: '#dedad5',
    captionPlacement: 'outside',
    media: {
      desktopImage: 'images/profile.jpg',
      mobileImage: 'images/profile.jpg',
      alt: 'Paul Bader',
      desktopPosition: 'center center',
      mobilePosition: 'center center',
      fit: 'cover'
    },
    caption: {
      label: 'Paul Bader.',
      description: 'Product & Brand Designer based in Copenhagen.'
    }
  },
  {
    id: 'experience',
    kind: 'experience',
    variantClass: 'sc-exp',
    backgroundColor: '#f1f1f4',
    textPlacement: 'center',
    captionPlacement: 'outside',
    caption: {
      label: 'Work history.',
      description: '7+ years across product, brand, UX/UI, SaaS, and internal tools.'
    }
  },
  {
    id: 'branding',
    kind: 'video',
    variantClass: 'sc-psych',
    wide: true,
    backgroundColor: '#f5ede0',
    captionPlacement: 'outside',
    media: {
      videoSrc: 'https://framerusercontent.com/assets/LcVsL2hd7HhXtTa5HIf2kVmD7jk.m4v',
      alt: 'Abstract motion study for brand-system work',
      desktopPosition: 'center center',
      mobilePosition: 'center center',
      fit: 'cover'
    },
    caption: {
      label: 'Branding.',
      description: 'Building visual systems that feel intentional and scale across every touchpoint.'
    }
  },
  {
    id: 'psychology',
    kind: 'text',
    variantClass: 'sc-brand',
    backgroundColor: '#e5dff5',
    textPlacement: 'bottom',
    captionPlacement: 'outside',
    text: 'Fascinated by why people do what they do.',
    caption: {
      label: 'User psychology.',
      description: 'Human behavior is at the core of every design decision I make.'
    }
  }
];
