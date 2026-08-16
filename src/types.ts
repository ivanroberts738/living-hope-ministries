export type ActivityStatus = 'draft' | 'published' | 'archived';

export interface Programme {
  id: string;
  slug: string;
  name: string;
  description: string;
  objectives: string[];
  iconName?: string;
  imageUrl?: string;
}

export interface ActivityImage {
  id: string;
  activityId?: string;
  imageUrl: string;
  storagePath?: string;
  caption?: string;
  createdAt?: string;
}

export interface Activity {
  id: string;
  title: string;
  description: string;
  activityDate: string; // YYYY-MM-DD
  location: string;
  programmeId?: string;
  programmeName: string;
  beneficiariesTotal: number;
  womenReached: number;
  childrenReached: number;
  otherBeneficiaries: number;
  outcomes?: string;
  challenges?: string;
  nextSteps?: string;
  mainImageUrl: string;
  status: ActivityStatus;
  images?: ActivityImage[];
  createdBy?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface GalleryPhoto {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  caption?: string;
  activityId?: string;
  createdAt: string;
}

export interface WebsiteContent {
  section: string;
  title: string;
  content: Record<string, any>;
  updatedAt?: string;
  updatedBy?: string;
}

export interface ImpactStats {
  totalActivities: number;
  womenReached: number;
  childrenReached: number;
  communitiesReached: number;
  totalPhotos: number;
  totalBeneficiaries: number;
}

export interface FilterState {
  search: string;
  category: string;
  dateYear: string;
  status?: string;
}

export interface AdminUser {
  email: string;
  name: string;
  role: 'admin';
  token: string;
}
