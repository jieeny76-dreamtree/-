
import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Users, MapPin, ArrowRight, Bell, Camera, ChevronRight, ExternalLink, Search, Newspaper } from 'lucide-react';
import { Logo } from '../components/Logo';
import { useBoardStore } from '../store/boardStore';
import { RELATED_SITES } from '../constants';

const Home: React.FC = () => {
  const { getPostsByType } = useBoardStore();
  const latestNotices = getPostsByType('notices').slice(0, 3);
  const latestProjects = getPostsByType('projects').slice(0, 4);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 text-white py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src="https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&q=80&w=1600" alt="background" className="w-full h-full object-cover" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
          <div className="bg-white/10 backdrop-blur-md p-4 rounded-full mb-8 border border-white/20 animate-bounce">
            <Logo className="h-16 w-16" />
          </div>
          <h1 className="text-4xl md:text-7xl font-extrabold mb-6 tracking-tight leading-tight">
            꿈을 심고 행복을 가꾸는 <br/><span className="text-yellow-400">꿈뜨레 지역공동체</span>
          </h1>
          <p className="text-xl md:text-2xl text-purple-100 max-w-3xl mb-12 font-light leading-relaxed">
            아이들이 안전하고, 어르신이 존중받으며, <br className="hidden md:block" /> 이웃이 서로를 살피는 따뜻한 마을을 함께 만들어갑니다.
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
            <Link to="/intro/greetings" className="bg-yellow-500 hover:bg-yellow-400 text-purple-900 px-10 py-5 rounded-full font-bold text-xl transition-all shadow-xl hover:scale-105 flex items-center justify-center">
              인사말 보기 <ArrowRight className="ml-2 h-6 w-6" />
            </Link>
            <Link to="/board/notices" className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 px-10 py-5 rounded-full font-bold text-xl transition-all flex items-center justify-center">
              공지사항 확인
            </Link>
          </div>
        </div>
      </section>

      {/* Latest Content Preview */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            
            {/* Latest Notices */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                  <Bell className="mr-2 h-6 w-6 text-purple-600" /> 공지사항
                </h2>
                <Link to="/board/notices" className="text-sm text-gray-500 hover:text-purple-600 flex items-center">
                  더보기 <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="space-y-4">
                {latestNotices.length > 0 ? (
                  latestNotices.map(post => (
                    <Link key={post.id} to={`/board/notices/view/${post.id}`} className="flex justify-between items-center p-4 hover:bg-purple-50 rounded-2xl transition-all border border-transparent hover:border-purple-100 group">
                      <span className="text-gray-700 font-medium group-hover:text-purple-800 truncate pr-4">{post.title}</span>
                      <span className="text-gray-400 text-sm shrink-0">{new Date(post.createdAt).toLocaleDateString()}</span>
                    </Link>
                  ))
                ) : (
                  <p className="text-gray-400 text-center py-8">등록된 공지사항이 없습니다.</p>
                )}
              </div>
            </div>

            {/* Latest Projects Gallery */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                  <Camera className="mr-2 h-6 w-6 text-yellow-600" /> 활동 갤러리
                </h2>
                <Link to="/board/projects" className="text-sm text-gray-500 hover:text-purple-600 flex items-center">
                  더보기 <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {latestProjects.length > 0 ? (
                  latestProjects.map(post => {
                    const thumb = post.imageUrl || (post.imageUrls && post.imageUrls[0]);
                    return (
                      <Link key={post.id} to={`/board/projects/view/${post.id}`} className="relative group overflow-hidden rounded-2xl aspect-video bg-gray-100">
                        {thumb ? (
                          <img src={thumb} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-300">
                            <Camera className="h-8 w-8" />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                          <span className="text-white text-xs font-bold truncate">{post.title}</span>
                        </div>
                      </Link>
                    );
                  })
                ) : (
                  <p className="col-span-2 text-gray-400 text-center py-8">등록된 활동 소식이 없습니다.</p>
                )}
              </div>
            </div>
          </div>

          {/* External News Search Section */}
          <div className="mt-12 bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="bg-blue-50 p-3 rounded-2xl text-blue-600">
                  <Newspaper className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">꿈뜨레 소식 (외부 포털)</h3>
                  <p className="text-sm text-gray-500">네이버와 다음에서 전하는 꿈뜨레의 언론 보도 및 칼럼을 확인하세요.</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                <a 
                  href="https://search.naver.com/search.naver?where=news&query=%EA%BF%88%EB%9C%A8%EB%A0%88+%EC%A7%80%EC%97%AD%EA%B3%B5%EB%8F%99%EC%B2%B4"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center px-6 py-3 bg-[#03C75A] text-white rounded-xl font-bold hover:brightness-95 transition-all shadow-md active:scale-95"
                >
                  <Search className="mr-2 h-4 w-4" /> 네이버 뉴스 검색
                </a>
                <a 
                  href="https://search.daum.net/search?w=news&q=%EA%BF%88%EB%9C%A8%EB%A0%88+%EC%A7%80%EC%97%AD%EA%B3%B5%EB%8F%99%EC%B2%B4"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center px-6 py-3 bg-[#FAE100] text-[#3C1E1E] rounded-xl font-bold hover:brightness-95 transition-all shadow-md active:scale-95"
                >
                  <Search className="mr-2 h-4 w-4" /> 다음 뉴스 검색
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <span className="text-purple-600 font-bold tracking-widest uppercase text-sm">Our Values</span>
            <h2 className="text-4xl font-bold text-gray-900 mt-2">우리가 추구하는 가치</h2>
            <div className="mt-4 h-1.5 w-24 bg-yellow-400 mx-auto rounded-full"></div>
          </div>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="group flex flex-col items-center text-center p-10 bg-white rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-200/50 hover:-translate-y-2 transition-all">
              <div className="h-20 w-20 bg-purple-100 rounded-2xl flex items-center justify-center mb-8 group-hover:rotate-6 transition-transform">
                <Heart className="h-10 w-10 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">사랑과 나눔</h3>
              <p className="text-gray-600 leading-relaxed">소외된 이웃 없이 모두가 행복한 <br/>따뜻한 공동체를 지향합니다.</p>
            </div>
            <div className="group flex flex-col items-center text-center p-10 bg-white rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-200/50 hover:-translate-y-2 transition-all">
              <div className="h-20 w-20 bg-yellow-100 rounded-2xl flex items-center justify-center mb-8 group-hover:-rotate-6 transition-transform">
                <Users className="h-10 w-10 text-yellow-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">참여와 소통</h3>
              <p className="text-gray-600 leading-relaxed">지역 주민들이 주인이 되어 참여하는 <br/>열린 소통의 공간을 만듭니다.</p>
            </div>
            <div className="group flex flex-col items-center text-center p-10 bg-white rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-200/50 hover:-translate-y-2 transition-all">
              <div className="h-20 w-20 bg-green-100 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <MapPin className="h-10 w-10 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">변화와 도약</h3>
              <p className="text-gray-600 leading-relaxed">우리 마을의 특성을 살린 사업으로 <br/>지역의 건강한 성장을 돕습니다.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Related Sites Section */}
      <section className="py-20 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-gray-900">관련 기관 바로가기</h2>
            <p className="text-gray-500 mt-2">꿈뜨레 지역공동체와 함께하는 주요 공공기관입니다.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {RELATED_SITES.map((site) => (
              <a
                key={site.url}
                href={site.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-purple-200 transition-all text-left"
              >
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

export default Home;
