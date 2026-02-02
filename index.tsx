
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
  Heart, MapPin, ArrowRight, Bell, Camera, ChevronRight, 
  Search, Newspaper, Menu, X, ChevronDown, 
  Phone, Mail, Instagram, Facebook, Globe, Plus, FileText, 
  Trash2, Calendar, User, Users, Save, ClipboardCheck,
  Gift, Receipt, Edit3, Quote, ExternalLink, Image as ImageIcon, Loader2,
  Sparkles, ShieldCheck, Flower2, Download, Paperclip
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
const STORAGE_KEY = 'kkumttre_posts_v3';
const SETTINGS_KEY = 'kkumttre_settings_v3';

const DEFAULT_SETTINGS: SiteSettings = {
  bankName: '농협은행',
  accountNumber: '351-1111-2222-33',
  accountHolder: '꿈뜨레 지역공동체',
};

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

// --- Utility: Image Compression ---
const compressImage = (file: File): Promise<string> => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 800; // 용량 확보를 위해 해상도 최적화
        let width = img.width;
        let height = img.height;
        if (width > MAX_WIDTH) {
          height = (height * MAX_WIDTH) / width;
          width = MAX_WIDTH;
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, width, height);
        // 압축률을 0.6으로 설정하여 여러 장 저장 가능하도록 최적화
        resolve(canvas.toDataURL('image/jpeg', 0.6));
      };
    };
  });
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
    try {
      const next = [post, ...posts];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      setPosts(next);
      return true;
    } catch (e) {
      alert('브라우저 저장 공간이 부족합니다. 사진 장수를 줄이거나 기존 게시글을 삭제해 주세요.');
      return false;
    }
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
      <div className={`fixed inset-0 bg-white z-[100] transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-6 h-full flex flex-col">
          <div className="flex justify-between items-center mb-10">
            <Logo className="h-10 w-10" />
            <button onClick={() => setIsOpen(false)}><X className="h-8 w-8 text-gray-400" /></button>
          </div>
          <div className="space-y-6 overflow-y-auto">
            {NAVIGATION.map(item => (
              <div key={item.path} className="border-b border-gray-50 pb-6">
                <div className="text-xl font-black text-purple-900 mb-4">{item.name}</div>
                <div className="grid grid-cols-1 gap-4 pl-4">
                  {item.subItems ? (
                    item.subItems.map(sub => (
                      <Link key={sub.path} to={sub.path} onClick={() => setIsOpen(false)} className="text-lg text-gray-600 font-medium">{sub.name}</Link>
                    ))
                  ) : (
                    <Link to={item.path} onClick={() => setIsOpen(false)} className="text-lg text-gray-600 font-medium">바로가기</Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

const Breadcrumb = () => {
  const location = useLocation();
  const path = location.pathname;
  if (path === '/' || path === '') return null;
  let category = "";
  let pageName = "";
  if (path.includes('/intro/')) {
    category = "단체소개";
    pageName = path.includes('greetings') ? "대표인사말" : "연혁";
  } else if (path.includes('/board/')) {
    if (path.includes('projects')) category = "주요사업";
    else if (path.includes('notices')) category = "공지사항";
    else if (path.includes('donations')) category = "후원소식";
    pageName = path.includes('write') ? "글쓰기" : path.includes('view') ? "상세보기" : "목록";
  } else if (path.includes('/donation/')) {
    category = "후원안내";
    pageName = "계좌안내";
  }
  return (
    <div className="bg-white border-b border-gray-100 py-4 mb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-sm text-gray-500 flex items-center">
        <Link to="/" className="hover:text-purple-600">홈</Link>
        <span className="mx-2">/</span>
        {category && <><span className="text-gray-400">{category}</span><span className="mx-2">/</span></>}
        <span className="font-bold text-purple-700">{pageName}</span>
      </div>
    </div>
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
          <p className="text-sm leading-relaxed mb-8 max-w-sm">지역 주민과 함께 따뜻한 나눔의 문화를 만들고, 아이들이 행복하게 자랄 수 있는 돌봄 환경을 조성하는 비영리민간단체입니다.</p>
          <div className="flex space-x-4">
            <a href="#" className="h-10 w-10 bg-white/5 rounded-full flex items-center justify-center text-white hover:bg-white/10 transition-colors"><Instagram className="h-5 w-5" /></a>
            <a href="#" className="h-10 w-10 bg-white/5 rounded-full flex items-center justify-center text-white hover:bg-white/10 transition-colors"><Facebook className="h-5 w-5" /></a>
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
              <MapPin className="h-5 w-5 text-purple-400 mr-3 shrink-0 mt-1" />
              <div>
                <span className="text-white block font-semibold">현) 경남 창원시 마산회원구 내서읍 삼계6길 40 202호</span>
                <span className="text-[11px] text-gray-500 italic">이전) 경남 창원시 마산회원구 내서읍 삼계6길 12 301호</span>
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
      <section className="relative bg-gradient-to-br from-purple-900 to-indigo-900 text-white py-24 md:py-32 overflow-hidden text-center">
        <div className="absolute inset-0 opacity-15">
          <img src="https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&q=80&w=1600" className="w-full h-full object-cover" alt="bg" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4">
          <div className="inline-block bg-white/10 backdrop-blur-md p-4 rounded-full mb-8 border border-white/20"><Logo className="h-16 w-16" /></div>
          <h1 className="text-4xl md:text-7xl font-extrabold mb-6 tracking-tighter leading-tight">꿈을 심고 행복을 가꾸는<br/><span className="text-yellow-400">꿈뜨레 지역공동체</span></h1>
          <p className="text-xl md:text-2xl text-purple-100 mb-12 font-light">아이들이 안전하고 이웃이 서로를 살피는 따뜻한 마을을 만듭니다.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/intro/greetings" className="bg-yellow-500 text-purple-900 px-10 py-5 rounded-full font-bold text-xl shadow-xl hover:scale-105 transition-transform flex items-center justify-center">인사말 보기 <ArrowRight className="ml-2 h-6 w-6" /></Link>
            <Link to="/board/notices" className="bg-white/10 backdrop-blur-md border border-white/30 px-10 py-5 rounded-full font-bold text-xl hover:bg-white/20 transition-colors">공지사항 확인</Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 mb-12">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold flex items-center"><Bell className="mr-2 text-purple-600 h-6 w-6" /> 공지사항</h2>
                <Link to="/board/notices" className="text-sm text-gray-400 hover:text-purple-600">더보기 +</Link>
              </div>
              <div className="space-y-4">
                {latestNotices.length > 0 ? latestNotices.map(post => (
                  <Link key={post.id} to={`/board/notices/view/${post.id}`} className="flex justify-between p-4 hover:bg-purple-50 rounded-2xl transition-all group">
                    <span className="truncate pr-4 font-medium group-hover:text-purple-800">{post.title}</span>
                    <span className="text-xs text-gray-400 shrink-0">{new Date(post.createdAt).toLocaleDateString()}</span>
                  </Link>
                )) : <p className="text-gray-300 py-10 text-center">등록된 공지가 없습니다.</p>}
              </div>
            </div>
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold flex items-center"><Camera className="mr-2 text-yellow-600 h-6 w-6" /> 활동 갤러리</h2>
                <Link to="/board/projects" className="text-sm text-gray-400 hover:text-purple-600">더보기 +</Link>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {latestProjects.length > 0 ? latestProjects.map(post => {
                  const thumb = post.imageUrl || (post.imageUrls && post.imageUrls[0]);
                  return (
                    <Link key={post.id} to={`/board/projects/view/${post.id}`} className="aspect-video bg-gray-100 rounded-2xl overflow-hidden relative group">
                      <img src={thumb || 'https://images.unsplash.com/photo-1544333346-64e4fe18274b?q=80&w=400'} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={post.title} />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold p-2 text-center">{post.title}</div>
                    </Link>
                  );
                }) : <p className="col-span-2 text-gray-300 py-10 text-center">활동 소식이 없습니다.</p>}
              </div>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {RELATED_SITES.map((site) => (
              <a key={site.url} href={site.url} target="_blank" rel="noopener noreferrer" className="group flex flex-col p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-purple-200 transition-all text-left">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-lg font-bold text-gray-900 group-hover:text-purple-700 transition-colors">{site.name}</span>
                  <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-purple-500 transition-colors" />
                </div>
                <p className="text-sm text-gray-500 leading-relaxed">{site.description}</p>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

const Greetings = () => (
  <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
    <div className="bg-purple-900 text-white px-8 py-16 text-center relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M0 100 C 20 0 50 0 100 100 Z" fill="white" />
        </svg>
      </div>
      <div className="relative z-10">
        <span className="inline-block bg-yellow-400 text-purple-900 px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest mb-4">Message from Representative</span>
        <h2 className="text-3xl md:text-4xl font-black mb-3 leading-tight">대표 인사말</h2>
        <p className="text-purple-200 font-light text-lg italic">"꿈을 심고 행복을 가꾸는 따뜻한 울타리가 되겠습니다."</p>
      </div>
    </div>
    <div className="p-8 md:p-16 lg:p-24 bg-[#fcfbf9]">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col gap-12">
          <div className="relative">
            <Quote className="h-16 w-16 text-yellow-500 mb-6 opacity-20 absolute -top-8 -left-8" />
            <h3 className="text-2xl md:text-3xl font-black text-purple-900 leading-tight mb-8">
              아이들이 웃고, 이웃이 소통하며,<br/>
              마을 전체가 하나의 가족이 되는 세상을 꿈꿉니다.
            </h3>
            <div className="space-y-8 text-gray-700 leading-relaxed text-lg font-normal">
              <p>안녕하십니까? 꿈뜨레 지역공동체 대표 <span className="font-bold text-gray-900">이한기</span>입니다.</p>
              <p>꿈뜨레 지역공동체는 <strong>'꿈을 심는 뜰(Yard)'</strong>이라는 뜻을 품고 있습니다. 우리가 살고 있는 이 지역사회가 단순히 거주하는 공간을 넘어, 우리 아이들이 마음껏 꿈을 꾸고 그 꿈이 건강하게 자라날 수 있는 비옥한 토양이 되기를 바라는 마음으로 첫발을 내디뎠습니다.</p>
              <p>현대 사회의 급격한 변화 속에서 우리는 많은 것을 얻었지만, 소중한 '이웃'과 '공동체'라는 가치를 잃어가고 있습니다. 특히 맞벌이 가구의 증가와 돌봄의 공백은 우리 아이들에게 정서적 외로움을, 부모님들에게는 막중한 부담을 안겨주고 있습니다. 꿈뜨레 지역공동체는 이러한 시대적 과제 앞에 <strong>'마을 돌봄'</strong>이라는 해답을 제시하고자 합니다.</p>
              <div className="grid md:grid-cols-3 gap-6 my-12 pt-8 border-t border-purple-50">
                <div className="text-center p-6 bg-white rounded-2xl shadow-sm border border-purple-50">
                  <Heart className="h-8 w-8 text-purple-600 mx-auto mb-4" />
                  <h4 className="font-bold text-gray-900 mb-2">따뜻한 공존</h4>
                  <p className="text-sm text-gray-500">누구도 소외되지 않는 포용적인 마을</p>
                </div>
                <div className="text-center p-6 bg-white rounded-2xl shadow-sm border border-purple-50">
                  <ShieldCheck className="h-8 w-8 text-purple-600 mx-auto mb-4" />
                  <h4 className="font-bold text-gray-900 mb-2">안전한 성지</h4>
                  <p className="text-sm text-gray-500">믿고 맡길 수 있는 돌봄 시스템</p>
                </div>
                <div className="text-center p-6 bg-white rounded-2xl shadow-sm border border-purple-50">
                  <Users className="h-8 w-8 text-purple-600 mx-auto mb-4" />
                  <h4 className="font-bold text-gray-900 mb-2">함께하는 성장</h4>
                  <p className="text-sm text-gray-500">이웃과 이웃이 서로를 키우는 연대</p>
                </div>
              </div>
              <p>현재 저희 공동체는 <span className="bg-yellow-100 px-1 font-bold text-purple-900">창원시 다함께돌봄센터 7호점</span>을 운영하며 아이들의 방과 후 일상을 책임지고 있습니다. 단순히 보호를 넘어, 다양한 체험 활동과 정서적 교감을 통해 아이들이 자존감을 회복하고 사회성을 기를 수 있도록 돕고 있습니다.</p>
              <p>또한, 다가오는 <span className="text-purple-800 font-bold underline underline-offset-4 decoration-yellow-400">2026년에는 다함께돌봄센터 3호점</span> 운영을 새롭게 시작하게 되었습니다. 이는 그동안 꿈뜨레가 보여준 진정성에 대해 지역사회가 보내준 신뢰의 결과라 생각합니다. 우리는 이 신뢰에 보답하기 위해 더욱 세심하고 전문적인 돌봄 체계를 구축해 나갈 것입니다.</p>
              <p>우리의 발걸음은 혼자서 갈 수 없습니다. 주민 여러분의 따뜻한 관심과 참여, 그리고 후원자분들의 소중한 나눔이 모일 때 비로소 '꿈뜨레'라는 정원은 꽃을 피울 수 있습니다. 여러분과 함께 걷고 싶습니다. 언제든 열려 있는 소통의 공간에서 여러분의 목소리를 듣겠습니다.</p>
              <p className="text-xl font-bold text-purple-900 mt-12">감사합니다. 꿈뜨레 지역공동체는 오늘도 우리 마을의 행복한 내일을 위해 정성을 다하겠습니다.</p>
            </div>
            <div className="mt-20 pt-12 border-t border-gray-200 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex items-center gap-4 text-gray-500">
                <Flower2 className="h-10 w-10 text-yellow-400 opacity-50" />
                <p className="text-sm text-left">꿈뜨레 지역공동체는 <br/>창원시 비영리 민간단체 등록(제 1호) 기관입니다.</p>
              </div>
              <div className="flex flex-col items-end">
                <p className="text-gray-500 text-lg mb-2 font-medium">2025년 2월</p>
                <div className="flex items-center gap-4">
                  <span className="text-gray-400 text-sm font-bold uppercase tracking-widest">Representative</span>
                  <span className="text-4xl font-black text-gray-900 tracking-tighter">이 한 기</span>
                  <div className="relative w-16 h-16 flex items-center justify-center">
                     <div className="absolute inset-0 border-2 border-red-500 rounded-full opacity-30 transform rotate-12"></div>
                     <span className="text-red-600 font-serif font-bold text-xl -rotate-12">印</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const History = () => {
  const events = [
    { year: '2026', desc: '창원시 다함께돌봄센터 3호점 위탁운영 개시 예정' },
    { year: '2025', desc: '창원시 비영리민간단체 공익활동 지원사업 선정' },
    { year: '2024', desc: '창원시 다함께돌봄센터 7호점 위탁운영 개시' },
    { year: '2023', desc: '비영리민간단체 변경등록 (꿈뜨레 지역공동체)' },
    { year: '2017', desc: '마산세무서 비영리단체 등록 (01.12)' },
  ];
  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="bg-purple-900 text-white px-8 py-12 text-center"><h2 className="text-3xl font-bold mb-2">단체 연혁</h2><p className="text-purple-200">꿈뜨레가 걸어온 소중한 발자취입니다.</p></div>
      <div className="p-8 md:p-16">
        <div className="relative border-l-4 border-yellow-100 pl-8 space-y-12 ml-4">
          {events.map((e, i) => (
            <div key={i} className="relative group">
              <div className="absolute -left-[42px] top-1 w-5 h-5 bg-white border-4 border-yellow-400 rounded-full group-hover:scale-125 transition-transform"></div>
              <h4 className="text-2xl font-black text-purple-700 mb-1">{e.year}</h4>
              <p className="text-gray-600 bg-gray-50 p-4 rounded-xl border border-gray-100 group-hover:border-purple-200 transition-all">{e.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const AccountInfo = () => {
  const { settings, updateSettings } = useSettingsStore();
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState(settings);
  const handleCopy = () => { navigator.clipboard.writeText(settings.accountNumber); alert('계좌번호가 복사되었습니다.'); };
  const handleSave = () => { updateSettings(editForm); setIsEditing(false); alert('정보가 변경되었습니다.'); };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden mb-8">
        <div className="bg-purple-900 text-white px-8 py-16 text-center relative">
          <Heart className="h-20 w-20 text-white/10 absolute top-4 right-4" />
          <h2 className="text-3xl font-bold mb-4">후원 계좌 안내</h2>
          <p className="text-purple-200 font-light">보내주신 후원금은 투명하고 공정하게 사용됩니다.</p>
        </div>
        <div className="p-10">
          {!isEditing ? (
            <div className="bg-gradient-to-br from-purple-50 to-white p-10 rounded-[2rem] border border-purple-100 text-center">
              <p className="text-purple-600 font-bold mb-4 uppercase tracking-widest text-sm">{settings.bankName}</p>
              <p className="text-3xl md:text-4xl font-mono font-bold text-purple-900 mb-6 tracking-tighter">{settings.accountNumber}</p>
              <p className="text-gray-500 mb-8 font-medium">예금주: <span className="text-gray-900 font-bold">{settings.accountHolder}</span></p>
              <button onClick={handleCopy} className="bg-purple-700 text-white px-8 py-4 rounded-full font-bold shadow-lg hover:bg-purple-800 flex items-center mx-auto transition-all"><ClipboardCheck className="mr-2 h-5 w-5" /> 계좌번호 복사하기</button>
            </div>
          ) : (
            <div className="space-y-4">
              <input type="text" value={editForm.bankName} onChange={e=>setEditForm({...editForm, bankName: e.target.value})} className="w-full p-4 border rounded-xl" placeholder="은행명" />
              <input type="text" value={editForm.accountNumber} onChange={e=>setEditForm({...editForm, accountNumber: e.target.value})} className="w-full p-4 border rounded-xl" placeholder="계좌번호" />
              <input type="text" value={editForm.accountHolder} onChange={e=>setEditForm({...editForm, accountHolder: e.target.value})} className="w-full p-4 border rounded-xl" placeholder="예금주" />
              <div className="flex gap-2 pt-4"><button onClick={handleSave} className="flex-1 bg-purple-700 text-white py-4 rounded-xl font-bold">저장</button><button onClick={()=>setIsEditing(false)} className="px-8 bg-gray-100 text-gray-500 py-4 rounded-xl">취소</button></div>
            </div>
          )}
          {!isEditing && <div className="mt-10 flex justify-center"><button onClick={()=>{setEditForm(settings); setIsEditing(true);}} className="text-gray-300 hover:text-purple-400 text-xs flex items-center transition-colors"><Edit3 className="mr-1 h-3 w-3" /> 관리자: 정보 수정</button></div>}
        </div>
      </div>
    </div>
  );
};

const BoardList = () => {
  const { type } = useParams<{ type: string }>();
  const boardType = type as BoardType;
  const { getPostsByType } = useBoardStore();
  const posts = getPostsByType(boardType);
  const titles = { projects: '주요사업', notices: '공지사항', donations: '후원소식' };

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden min-h-[500px]">
      <div className="bg-purple-900 text-white px-8 py-10 flex flex-col md:flex-row justify-between items-center gap-4">
        <div><h2 className="text-3xl font-bold">{titles[boardType] || '게시판'}</h2></div>
        <Link to={`/board/${boardType}/write`} className="bg-yellow-500 hover:bg-yellow-400 text-purple-900 px-6 py-3 rounded-full font-bold shadow-md flex items-center"><Plus className="mr-2 h-5 w-5" /> 글쓰기</Link>
      </div>
      <div className="p-8">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-400 text-xs uppercase tracking-widest border-b">
              <tr><th className="px-6 py-4">번호</th><th className="px-6 py-4">제목</th><th className="px-6 py-4">날짜</th></tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {posts.length > 0 ? posts.map((p, i) => (
                <tr key={p.id} className="hover:bg-purple-50 transition-colors">
                  <td className="px-6 py-4 text-gray-400 text-sm">{posts.length - i}</td>
                  <td className="px-6 py-4 font-bold text-gray-800 flex items-center gap-2">
                    <Link to={`/board/${boardType}/view/${p.id}`} className="hover:text-purple-700">{p.title}</Link>
                    {((p.imageUrls && p.imageUrls.length > 0) || p.imageUrl) && <ImageIcon className="h-4 w-4 text-purple-300" />}
                  </td>
                  <td className="px-6 py-4 text-gray-400 text-sm">{new Date(p.createdAt).toLocaleDateString()}</td>
                </tr>
              )) : <tr><td colSpan={3} className="px-6 py-20 text-center text-gray-300">등록된 글이 없습니다.</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const PostWrite = () => {
  const { type } = useParams<{ type: string }>();
  const navigate = useNavigate();
  const { addPost } = useBoardStore();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [isCompressing, setIsCompressing] = useState(false);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const handleImages = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setIsCompressing(true);
      const compressed: string[] = [];
      for (let i = 0; i < files.length; i++) {
        const data = await compressImage(files[i]);
        compressed.push(data);
      }
      // 새로운 사진들을 기존 리스트 뒤에 추가
      setImages(prev => [...prev, ...compressed]);
      setIsCompressing(false);
      // 같은 파일을 다시 선택할 수 있도록 input 초기화
      if (imageInputRef.current) imageInputRef.current.value = "";
    }
  };

  const removeImage = (index: number) => { 
    setImages(prev => prev.filter((_, i) => i !== index)); 
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) return alert('제목과 내용을 입력해 주세요.');
    const success = addPost({ 
      id: Date.now().toString(), 
      type: type as BoardType, 
      title, 
      content, 
      author: '관리자', 
      createdAt: Date.now(), 
      // 첫 번째 이미지를 썸네일로 사용, 전체 리스트는 imageUrls에 저장
      imageUrl: images.length > 0 ? images[0] : undefined, 
      imageUrls: images.length > 0 ? images : undefined 
    });
    if (success) navigate(`/board/${type}`);
  };

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden max-w-4xl mx-auto">
      <div className="bg-purple-900 text-white px-8 py-10 font-bold text-2xl">게시글 작성</div>
      <form onSubmit={handleSubmit} className="p-8 space-y-8">
        <div>
          <label className="block text-sm font-bold text-gray-400 uppercase mb-2 ml-1">게시글 제목</label>
          <input type="text" value={title} onChange={e=>setTitle(e.target.value)} placeholder="제목을 입력하세요" className="w-full p-4 bg-gray-50 rounded-2xl border-none text-xl font-bold focus:ring-2 focus:ring-purple-200 outline-none" required />
        </div>
        
        <div>
          <label className="block text-sm font-bold text-gray-400 uppercase mb-2 ml-1">본문 내용</label>
          <textarea value={content} onChange={e=>setContent(e.target.value)} placeholder="마을의 소중한 이야기를 들려주세요" rows={12} className="w-full p-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-purple-200 outline-none resize-none text-lg leading-relaxed" required></textarea>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="block text-sm font-bold text-gray-400 uppercase ml-1">사진 첨부 ({images.length}장)</label>
            <div className="flex items-center gap-4">
              <input type="file" ref={imageInputRef} onChange={handleImages} accept="image/*" multiple className="hidden" id="img-upload" />
              <label htmlFor="img-upload" className="flex items-center px-6 py-3 bg-purple-700 text-white rounded-full font-bold cursor-pointer hover:bg-purple-800 shadow-md transition-all active:scale-95">
                {isCompressing ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Camera className="mr-2 h-5 w-5" />} 사진 추가하기
              </label>
            </div>
          </div>
          
          {images.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
              {images.map((img, idx) => (
                <div key={idx} className="relative aspect-square rounded-2xl overflow-hidden border border-gray-100 bg-white group shadow-sm">
                  <img src={img} className="w-full h-full object-cover" alt="preview" />
                  <button type="button" onClick={() => removeImage(idx)} className="absolute top-1.5 right-1.5 bg-red-500 text-white p-1.5 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600">
                    <X className="h-4 w-4" />
                  </button>
                  {idx === 0 && (
                    <div className="absolute bottom-0 left-0 right-0 bg-yellow-400 text-purple-900 text-[10px] font-black py-1 text-center">대표</div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="py-12 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-gray-300">
              <ImageIcon className="h-12 w-12 mb-2 opacity-20" />
              <p className="text-sm">첨부된 사진이 없습니다. (여러 장 선택 가능)</p>
            </div>
          )}
        </div>

        <div className="pt-8 border-t flex flex-col sm:flex-row justify-end gap-3">
          <button type="button" onClick={()=>navigate(-1)} className="order-2 sm:order-1 px-8 py-4 bg-gray-100 text-gray-500 rounded-full font-bold hover:bg-gray-200 transition-all">취소</button>
          <button type="submit" disabled={isCompressing} className="order-1 sm:order-2 bg-purple-700 text-white px-10 py-4 rounded-full font-bold shadow-lg hover:bg-purple-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed">
            게시글 저장하기
          </button>
        </div>
        <p className="text-center text-[11px] text-gray-400">※ 사진은 자동으로 최적화되어 저장됩니다. 용량이 큰 사진은 로딩이 다소 걸릴 수 있습니다.</p>
      </form>
    </div>
  );
};

const PostView = () => {
  const { type, id } = useParams<{ type: string; id: string }>();
  const navigate = useNavigate();
  const { posts, deletePost } = useBoardStore();
  const post = posts.find(p => p.id === id);
  if (!post) return <div className="p-20 text-center">글을 찾을 수 없습니다.</div>;
  
  // imageUrls 배열이 있으면 사용하고, 없으면 단일 imageUrl을 배열로 만들어 사용
  const displayImages = post.imageUrls || (post.imageUrl ? [post.imageUrl] : []);

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden max-w-5xl mx-auto">
      <div className="bg-purple-900 text-white px-8 py-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 opacity-10 pointer-events-none">
           <Logo className="h-48 w-48 -mr-10 -mt-10" />
        </div>
        <div className="relative z-10">
          <button onClick={()=>navigate(-1)} className="text-purple-300 text-sm mb-4 flex items-center hover:text-white transition-colors"><ChevronRight className="rotate-180 mr-1 h-4 w-4" /> 목록으로 돌아가기</button>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight break-all">{post.title}</h2>
          <div className="flex flex-wrap text-sm text-purple-200 gap-6 opacity-80">
            <div className="flex items-center"><User className="mr-2 h-4 w-4" /> {post.author}</div>
            <div className="flex items-center"><Calendar className="mr-2 h-4 w-4" /> {new Date(post.createdAt).toLocaleString()}</div>
          </div>
        </div>
      </div>
      
      <div className="p-8 md:p-16">
        <div className="prose max-w-none text-gray-800 leading-relaxed text-lg whitespace-pre-wrap mb-16 min-h-[150px]">
          {post.content}
        </div>

        {displayImages.length > 0 && (
          <div className="space-y-10 mb-16 border-t pt-16">
            <div className="flex items-center justify-between mb-8">
               <h3 className="text-2xl font-black flex items-center text-purple-900"><ImageIcon className="mr-3 h-7 w-7" /> 활동 갤러리</h3>
               <span className="text-sm font-bold text-gray-400">{displayImages.length}장의 사진</span>
            </div>
            <div className="grid gap-12">
              {displayImages.map((img, idx) => (
                <div key={idx} className="group relative rounded-3xl overflow-hidden border border-gray-100 bg-gray-50 shadow-sm hover:shadow-md transition-shadow">
                  <img src={img} className="w-full h-auto max-h-[1200px] object-contain mx-auto" alt={`활동 사진 ${idx + 1}`} />
                  <div className="absolute bottom-4 right-6 bg-black/30 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                    Activity Photo {idx + 1}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex justify-between items-center border-t pt-10">
          <button onClick={()=>navigate(`/board/${type}`)} className="bg-gray-100 text-gray-600 px-8 py-3 rounded-full hover:bg-gray-200 font-bold transition-all">목록</button>
          <button onClick={()=>{if(confirm('이 게시글을 삭제하시겠습니까?')){deletePost(post.id); navigate(`/board/${type}`);}}} className="text-red-400 hover:text-red-600 flex items-center text-sm font-bold transition-colors">
            <Trash2 className="mr-2 h-5 w-5" /> 게시글 삭제
          </button>
        </div>
      </div>
    </div>
  );
};

// --- App Root ---
const App = () => (
  <Router>
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-grow">
        <Breadcrumb />
        <div className="max-w-7xl mx-auto px-4 py-10">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/intro/greetings" element={<Greetings />} />
            <Route path="/intro/history" element={<History />} />
            <Route path="/donation/account" element={<AccountInfo />} />
            <Route path="/board/:type" element={<BoardList />} />
            <Route path="/board/:type/write" element={<PostWrite />} />
            <Route path="/board/:type/view/:id" element={<PostView />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </main>
      <Footer />
    </div>
  </Router>
);

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<App />);
}
