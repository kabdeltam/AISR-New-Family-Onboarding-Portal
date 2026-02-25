
export interface LinkItem {
  title: string;
  url: string;
  modalContent?: ModalContent;
}

export interface ModalContent {
  title: string;
  body?: string; // Can contain markdown
  imageUrl?: string;
  links?: LinkItem[];
  embedUrl?: string;
}

export interface InteractiveCard {
  id: string;
  title: string;
  modalContent: ModalContent;
  category?: string;
}

export interface QuickAccessCard {
  id: string;
  title: string;
  description?: string;
  linkUrl?: string;
  variant: 'blue' | 'yellow';
}

export interface PageContent {
  id: string;
  title: string;
  welcomeVideoUrl: string;
  topImageUrls?: string[];
  mainContent: string;
  links: LinkItem[];
  interactiveContent?: InteractiveCard[];
  quickAccessCards?: QuickAccessCard[];
}

export interface AdminUser {
  id:string;
  email: string;
  passwordHash: string; // In a real app, this would be a hash
}
