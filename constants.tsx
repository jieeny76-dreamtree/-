
import { NavigationItem } from './types';

export const NAVIGATION: NavigationItem[] = [
  {
    name: '단체소개',
    path: '/intro',
    subItems: [
      { name: '대표인사말', path: '/intro/greetings' },
      { name: '연혁', path: '/intro/history' },
    ],
  },
  { name: '주요사업', path: '/board/projects' },
  { name: '공지사항', path: '/board/notices' },
];

export const COLORS = {
  primary: '#6B21A8', // Purple from logo
  secondary: '#FBBF24', // Yellow from logo
};
