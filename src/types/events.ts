export interface EventsHeroData {
  title: string;
  subtitle?: string;
  bgMediaUrl: string;
  bgMediaType?: 'image' | 'video';
  pageUrl?: string;
}

export type AgeGroupActionType = 'book_now' | 'contact_us';

export interface AgeGroupCardItem {
  id: string;
  title: string;
  description: string;
  actionType?: AgeGroupActionType;
  aLaCarteMenuLink?: string;
  preselectMenuLink?: string;
  contactLink?: string;
  contactButtonText?: string;
  badge?: string;
  order: number;
  isActive?: boolean;
}

export interface AgeGroupsSectionData {
  sectionTitle: string;
  sectionSubtitle?: string;
  cards: AgeGroupCardItem[];
}

export interface InfoCardItem {
  id: string;
  title: string;
  description: string;
  mediaUrl: string;
  mediaType: 'image' | 'video';
  order: number;
  isActive?: boolean;
}

export interface InfoCardsSectionData {
  sectionTitle: string;
  sectionSubtitle?: string;
  cards: InfoCardItem[];
}

export interface EventPageData {
  hero: EventsHeroData;
  ageGroups: AgeGroupsSectionData;
  infoCards: InfoCardsSectionData;
}
