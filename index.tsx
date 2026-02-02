
import React, { useState, useEffect, useCallback, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import { 
  HashRouter as Router, 
  Routes, 
  Route, 
  Navigate, 
  Link, 
  useLocation, 
  useParams, 
  useNavigate 
} from 'react-router-dom';
import { 
  Heart, Users, MapPin, ArrowRight, Bell, Camera, ChevronRight, 
  ExternalLink, Search, Newspaper, Menu, X, ChevronDown, 
  Phone, Mail, Instagram, Facebook, Globe, Plus, FileText, 
  Download, Trash2, Calendar, User, Save, Paperclip, ClipboardCheck,
  Gift, Receipt, Settings, Edit3
} from 'lucide-react';

// --- Types ---
type BoardType = 'projects' | 'notices' | 'donations';

interface Post {
  id: string;
  type: BoardType;
  title: string;
  content: string;
  author: string;
  createdAt: number;
  imageUrl?: string;
  imageUrls?: string[];
  fileName?: string;
  fileData?: string;
}

interface SiteSettings {
  bankName: string;
  accountNumber: string;
  accountHolder: string;
}

// --- Constants ---
const NAVIGATION = [
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

const RELATED_SITES = [
  { name: '국민권익위원회', url: 'https://www.acrc.go.kr', description: '청렴한 사회, 국민의 권익보호' },
  { name: '국세청', url: 'https://www.nts.go.kr', description: '국민이 편안한, 보다 나은 국세행정' },
  { name: '창원시청', url: 'https://www.changwon.go.kr', description: '변화의 시작, 창원특례시' },
];

const STORAGE_KEY = 'kkumttre_posts';
const SETTINGS_KEY = 'kkumttre_settings';

const DEFAULT_SETTINGS: SiteSettings = {
  bankName: '농협은행',
  accountNumber: '351-1111-2222-33',
  accountHolder: '꿈뜨레 지역공동체',
};

// --- Stores (Hooks) ---
const useBoardStore = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try { setPosts(JSON.parse(stored)); } catch (e) { console.error(e); }
    }
  }, []);

  const addPost = useCallback((post: Post) => {
    const next = [post, ...posts];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    setPosts(next);
    return true;
  }, [posts]);

  const deletePost = useCallback((id: string) => {
    const next = posts.filter(p => p.id !== id);
    setPosts(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }, [posts]);

  const getPostsByType = (type: BoardType) => posts.filter(p => p.type === type);

  return { posts, addPost, deletePost, getPostsByType };
};

const useSettingsStore = () => {
  const [settings, setSettings] = useState<SiteSettings>(DEFAULT_SETTINGS);

  useEffect(() => {
    const stored = localStorage.getItem(SETTINGS_KEY);
    if (stored) {
      try { setSettings(JSON.parse(stored)); } catch (e) { console.error(e); }
    }
  }, []);

  const updateSettings = (newSettings: SiteSettings) => {
    setSettings(newSettings);
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(newSettings));
  };

  return { settings, updateSettings };
};

// --- Components ---
const Logo: React.FC<{ className?: string }> = ({ className = "h-12 w-12" }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 45 L50 10 L90 45 V90 H10 Z" stroke="#FBBF24" strokeWidth="6" strokeLinejoin="round" />
    <path d="M25 50 L50 28 L75 50 V82 H25 Z" stroke="#6B21A8" strokeWidth="4" fill="#6B21A822" />
    <circle cx="50" cy="40" r="5" fill="#6B21A8" />
    <circle cx="35" cy="58" r="5" fill="#6B21A8" />
    <circle cx="65" cy="58" r="5" fill="#6B21A8" />
    <path d="M40 45 Q50 48 60 45" stroke="#6B21A8" strokeWidth="6" strokeLinecap="round" />
    <path d="M30 65 Q35 68 40 65" stroke="#6B21A8" strokeWidth="6" strokeLinecap="round" />
    <path d="M60 65 Q65 68 70 65" stroke="#6B21A8" strokeWidth="6" strokeLinecap="round" />
    <path d="M50 58 L53 55 A3 3 0 0 0 47 55 L50 58 Z" fill="#6B21A8" />
    <path d="M50 58 Q48 56 46 54 A3 3 0 0 1 50 50 A3 3 0 0 1 54 54 Q52 56 50 58" fill="#6B21A8" />
  </svg>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="bg-white/95 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <Link to="/" className="flex items-center space-x-3 group">
            <Logo className="h-11 w-11 group-hover:rotate-6 transition-transform" />
            <div className="flex flex-col">
              <span className="text-xl font-black text-purple-900 tracking-tighter leading-none">꿈뜨레 <span className="text-yellow-500">지역공동체</span></span>
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">Kkumttre Community</span>
            </div>
          </Link>
          <div className="hidden md:flex items-center space-x-8">
            {NAVIGATION.map((item) => (
              <div key={item.path} className="relative group">
                <Link to={item.subItems ? item.subItems[0].path : item.path} className={`flex items-center py-2 text-[15px] font-bold transition-all ${location.pathname.startsWith(item.path) ? 'text-purple-700 border-b-2 border-purple-600' : 'text-gray-600 hover:text-purple-600'}`}>
                  {item.name} {item.subItems && <ChevronDown className="ml-1 h-4 w-4 opacity-50" />}
                </Link>
                {item.subItems && (
                  <div className="absolute left-1/2 -translate-x-1/2 mt-0 w-48 bg-white border border-gray-100 shadow-2xl rounded-2xl overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-2">
                    <div className="py-2">
                      {item.subItems.map((sub) => (
                        <Link key={sub.path} to={sub.path} className="block px-6 py-3 text-[14px] font-medium text-gray-700 hover:bg-purple-50 hover:text-purple-700 transition-colors">{sub.name}</Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="flex md:hidden items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600 p-2"><Menu className="h-7 w-7" /></button>
          </div>
        </div>
      </div>
      {/* Mobile Menu Simplified */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 bg-white z-[60] p-6">
          <div className="flex justify-between mb-8"><Logo /><button onClick={() => setIsOpen(false)}><X className="h-8 w-8" /></button></div>
          <div className="space-y-6">
            {NAVIGATION.map(item => (
              <div key={item.path}>
                <div className="font-bold text-purple-900 mb-2">{item.name}</div>
                {item.subItems?.map(sub => (
                  <Link key={sub.path} to={sub.path} onClick={() => setIsOpen(false)} className="block pl-4 py-2 text-gray-600">{sub.name}</Link>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

const Footer = () => (
  <footer className="bg-[#1a1a1a] text-gray-400 pt-20 pb-10 border-t border-gray-800">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid md:grid-cols-12 gap-12 mb-16">
        <div className="md:col-span-4">
          <div className="flex items-center space-x-3 mb-6">
            <Logo className="h-10 w-10 grayscale brightness-200" />
            <span className="text-2xl font-black text-white tracking-tighter">꿈뜨레 지역공동체</span>
          </div>
          <p className="text-sm leading-relaxed mb-8 max-w-sm">아이들이 행복하게 자랄 수 있는 돌봄 환경을 조성하는 비영리민간단체입니다.</p>
          <div className="flex space-x-4">
            <a href="#" className="h-10 w-10 bg-white/5 rounded-full flex items-center justify-center text-white"><Instagram className="h-5 w-5" /></a>
            <a href="#" className="h-10 w-10 bg-white/5 rounded-full flex items-center justify-center text-white"><Facebook className="h-5 w-5" /></a>
          </div>
        </div>
        <div className="md:col-span-4">
          <h4 className="text-white font-bold mb-6">바로가기</h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <Link to="/intro/greetings" className="hover:text-yellow-400">대표 인사말</Link>
            <Link to="/intro/history" className="hover:text-yellow-400">단체 연혁</Link>
            <Link to="/board/projects" className="hover:text-yellow-400">주요 사업</Link>
            <Link to="/board/notices" className="hover:text-yellow-400">공지사항</Link>
          </div>
        </div>
        <div className="md:col-span-4">
          <h4 className="text-white font-bold mb-6">연락처 및 위치</h4>
          <ul className="space-y-4 text-sm">
            <li className="flex items-start">
              <MapPin className="h-5 w-5 text-purple-400 mr-3 shrink-0" />
              <div>
                <span className="text-white block">현) 경남 창원시 마산회원구 내서읍 삼계6길 40 202호</span>
                <span className="text-[11px] text-gray-600 italic">이전) 경남 창원시 마산회원구 내서읍 삼계6길 12 301호</span>
              </div>
            </li>
            <li className="flex items-center"><Phone className="h-5 w-5 text-purple-400 mr-3" /> 055-232-5412</li>
            <li className="flex items-center"><Mail className="h-5 w-5 text-purple-400 mr-3" /> zaminan@naver.com</li>
          </ul>
        </div>
      </div>
      <div className="pt-10 border-t border-white/5 text-center text-[10px] uppercase tracking-widest">
        © 2024-2025 KKUMTTRE COMMUNITY. ALL RIGHTS RESERVED.
      </div>
    </div>
  </footer>
);

// --- Pages ---
const Home = () => {
  const { getPostsByType } = useBoardStore();
  const latestNotices = getPostsByType('notices').slice(0, 3);
  const latestProjects = getPostsByType('projects').slice(0, 4);

  return (
    <div className="flex flex-col">
      <section className="relative bg-gradient-to-br from-purple-900 to-indigo-900 text-white py-24 overflow-hidden text-center">
        <div className="absolute inset-0 opacity-10">
          <img src="https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&q=80&w=1600" className="w-full h-full object-cover" alt="bg" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4">
          <div className="inline-block bg-white/10 backdrop-blur-md p-4 rounded-full mb-8 border border-white/20"><Logo className="h-16 w-16" /></div>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6">꿈을 심고 행복을 가꾸는<br/><span className="text-yellow-400">꿈뜨레 지역공동체</span></h1>
          <p className="text-xl text-purple-100 mb-10">아이들이 안전하고 이웃이 서로를 살피는 따뜻한 마을을 만듭니다.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/intro/greetings" className="bg-yellow-500 text-purple-900 px-8 py-4 rounded-full font-bold shadow-xl hover:scale-105 transition-transform">인사말 보기</Link>
            <Link to="/board/notices" className="bg-white/10 backdrop-blur-md border border-white/30 px-8 py-4 rounded-full font-bold">공지사항 확인</Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 mb-12">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold flex items-center"><Bell className="mr-2 text-purple-600" /> 공지사항</h2>
                <Link to="/board/notices" className="text-sm text-gray-400">더보기 +</Link>
              </div>
              <div className="space-y-4">
                {latestNotices.map(post => (
                  <Link key={post.id} to={`/board/notices/view/${post.id}`} className="flex justify-between p-3 hover:bg-purple-50 rounded-xl transition-colors">
                    <span className="truncate pr-4 font-medium">{post.title}</span>
                    <span className="text-xs text-gray-400 shrink-0">{new Date(post.createdAt).toLocaleDateString()}</span>
                  </Link>
                ))}
              </div>
            </div>
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold flex items-center"><Camera className="mr-2 text-yellow-600" /> 활동 갤러리</h2>
                <Link to="/board/projects" className="text-sm text-gray-400">더보기 +</Link>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {latestProjects.map(post => (
                  <Link key={post.id} to={`/board/projects/view/${post.id}`} className="aspect-video bg-gray-100 rounded-xl overflow-hidden relative group">
                    <img src={post.imageUrl || 'https://images.unsplash.com/photo-1544333346-64e4fe18274b?q=80&w=400'} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="bg-blue-50 p-3 rounded-2xl text-blue-600"><Newspaper className="h-8 w-8" /></div>
              <div><h3 className="text-xl font-bold">언론 속의 꿈뜨레</h3><p className="text-sm text-gray-500">포털 사이트에서 보도된 소식을 확인하세요.</p></div>
            </div>
            <div className="flex gap-3">
              <a href="https://search.naver.com/search.naver?where=news&query=%EA%BF%88%EB%9C%A8%EB%A0%88+%EC%A7%80%EC%97%AD%EA%B3%B5%EB%8F%99%EC%B2%B4" target="_blank" className="bg-[#03C75A] text-white px-6 py-3 rounded-xl font-bold shadow-md hover:brightness-95">네이버 뉴스</a>
              <a href="https://search.daum.net/search?w=news&q=%EA%BF%88%EB%9C%A8%EB%A0%88+%EC%A7%80%EC%97%AD%EA%B3%B5%EB%8F%99%EC%B2%B4" target="_blank" className="bg-[#FAE100] text-[#3C1E1E] px-6 py-3 rounded-xl font-bold shadow-md hover:brightness-95">다음 뉴스</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// --- App Layout & Router ---
// Fix: Added optional modifier to children prop to resolve TypeScript error where the compiler incorrectly flags it as missing in nested JSX expressions.
const PageLayout = ({ children, title }: { children?: React.ReactNode, title?: string }) => (
  <div className="max-w-7xl mx-auto px-4 py-12">
    <div className="mb-8 flex items-center text-sm text-gray-400">
      <Link to="/" className="hover:text-purple-600">홈</Link>
      <span className="mx-2">/</span>
      <span className="font-bold text-purple-700">{title || '페이지'}</span>
    </div>
    {children}
  </div>
);

const App = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/intro/greetings" element={<PageLayout title="대표인사말"><div className="bg-white p-12 rounded-3xl shadow-sm border border-gray-100 max-w-4xl mx-auto leading-relaxed text-gray-700">
              <h2 className="text-3xl font-bold text-purple-900 mb-8 border-b pb-4">대표인사말</h2>
              <p className="mb-6 font-bold text-xl">"함께 돌보고, 함께 살아가는 지역을 꿈꾸며"</p>
              <p className="mb-4">안녕하십니까? 꿈뜨레 지역공동체 대표 이한기입니다.</p>
              <p className="mb-4">저희 공동체는 창원시 다함께돌봄센터 7호점을 운영하며 우리 아이들이 안전하고 따뜻한 환경에서 자라날 수 있도록 돕고 있습니다. 또한 2026년부터는 3호점 위탁 운영을 통해 더 넓은 돌봄의 가치를 실현하고자 합니다.</p>
              <p className="mb-8">주민 여러분의 따뜻한 관심과 참여 부탁드립니다.</p>
              <div className="text-right"><p className="text-gray-400 mb-1">2025년 2월</p><p className="text-2xl font-bold">대표 이 한 기</p></div>
            </div></PageLayout>} />
            <Route path="/intro/history" element={<PageLayout title="연혁"><div className="bg-white p-12 rounded-3xl shadow-sm border border-gray-100 max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-purple-900 mb-8">단체 연혁</h2>
              <div className="space-y-8 border-l-4 border-yellow-100 pl-8 relative">
                {[
                  { year: '2026', desc: '창원시 다함께돌봄센터 3호점 위탁운영 예정' },
                  { year: '2025', desc: '창원시 비영리민간단체 공익활동 지원사업 선정' },
                  { year: '2024', desc: '창원시 다함께돌봄센터 7호점 위탁운영' },
                  { year: '2023', desc: '꿈뜨레 지역공동체로 명칭 변경 등록' },
                ].