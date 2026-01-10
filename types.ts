
export type BoardType = 'projects' | 'notices';

export interface Post {
  id: string;
  type: BoardType;
  title: string;
  content: string;
  author: string;
  createdAt: number;
  imageUrl?: string;
  fileName?: string;
  fileData?: string; // base64 simulated file storage
}

export interface NavigationItem {
  name: string;
  path: string;
  subItems?: NavigationItem[];
}
