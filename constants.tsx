
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
  {
    name: '후원안내',
    path: '/donation',
    subItems: [
      { name: '계좌안내', path: '/donation/account' },
      { name: '후원소식', path: '/board/donations' },
    ],
  },
];

export const RELATED_SITES = [
  { name: '국민권익위원회', url: 'https://www.acrc.go.kr', description: '청렴한 사회, 국민의 권익보호' },
  { name: '국세청', url: 'https://www.nts.go.kr', description: '국민이 편안한, 보다 나은 국세행정' },
  { name: '창원시청', url: 'https://www.changwon.go.kr', description: '변화의 시작, 창원특례시' },
];

export const COLORS = {
  primary: '#6B21A8', // Purple from logo
  secondary: '#FBBF24', // Yellow from logo
};
