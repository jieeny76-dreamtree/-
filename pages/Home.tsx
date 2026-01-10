
import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Users, MapPin, ArrowRight } from 'lucide-react';
import { Logo } from '../components/Logo';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-purple-900 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src="https://picsum.photos/1600/900?nature" alt="background" className="w-full h-full object-cover" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
          <Logo className="h-24 w-24 mb-8" />
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
            꿈을 심고 행복을 가꾸는 <br/><span className="text-yellow-400">꿈뜨레 지역공동체</span>
          </h1>
          <p className="text-xl md:text-2xl text-purple-100 max-w-3xl mb-10 font-light">
            우리는 이웃과 함께 따뜻한 마음을 나누고, <br className="hidden md:block" /> 살기 좋은 지역 사회를 만들어 나가는 비영리민간단체입니다.
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <Link to="/intro/greetings" className="bg-yellow-500 hover:bg-yellow-400 text-purple-900 px-8 py-4 rounded-full font-bold text-lg transition-all shadow-lg flex items-center justify-center">
              단체 소개 <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link to="/board/projects" className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 px-8 py-4 rounded-full font-bold text-lg transition-all flex items-center justify-center">
              주요 사업 보기
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">우리의 가치</h2>
            <div className="mt-2 h-1 w-20 bg-yellow-500 mx-auto rounded-full"></div>
          </div>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="flex flex-col items-center text-center p-8 bg-gray-50 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
              <div className="h-16 w-16 bg-purple-100 rounded-full flex items-center justify-center mb-6">
                <Heart className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold mb-4">사랑과 나눔</h3>
              <p className="text-gray-600">소외된 이웃 없이 모두가 행복한 따뜻한 공동체를 지향합니다.</p>
            </div>
            <div className="flex flex-col items-center text-center p-8 bg-gray-50 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
              <div className="h-16 w-16 bg-yellow-100 rounded-full flex items-center justify-center mb-6">
                <Users className="h-8 w-8 text-yellow-600" />
              </div>
              <h3 className="text-xl font-bold mb-4">함께하는 참여</h3>
              <p className="text-gray-600">지역 주민들이 주인이 되어 참여하는 열린 공간을 만듭니다.</p>
            </div>
            <div className="flex flex-col items-center text-center p-8 bg-gray-50 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
              <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <MapPin className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-4">지역 밀착</h3>
              <p className="text-gray-600">우리 마을의 특성을 살린 사업을 통해 지역의 성장을 돕습니다.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
