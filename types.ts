
export type BoardType = 'projects' | 'notices' | 'donations';

export interface Post {
  id: string;
  type: BoardType;
  title: string;
  content: string;
  author: string;
  createdAt: number;
  imageUrl?: string; // Thumbnail or primary image
  imageUrls?: string[]; // Multiple images array
  fileName?: string;
  fileData?: string; // base64 simulated file storage
}

export interface SiteSettings {
  bankName: string;
  accountNumber: string;
  accountHolder: string;
}

export interface NavigationItem {
  name: string;
  path: string;
  subItems?: NavigationItem[];
}
