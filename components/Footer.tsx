
import React from 'react';
import { Logo } from './Logo';
import { Phone, Mail, MapPin, Instagram, Facebook, Globe } from 'lucide-react';
import { RELATED_SITES } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#1a1a1a] text-gray-400 pt-20 pb-10 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-12 gap-12 mb-16">
          <div className="md:col-span-4">
            <div className="flex items-center space-x-3 mb-6">
              <Logo className="h-10 w-10 grayscale brightness-200" />
              <span className="text-2xl font-black text-white tracking-tighter">꿈뜨레 지역공동체</span>
            </div>
            <p className="text-sm leading-relaxed mb-8 max-w-sm">
              꿈뜨레 지역공동체는 지역 주민들과 함께 따뜻한 나눔의 문화를 만들고, 아이들이 행복하게 자랄 수 있는 돌봄 환경을 조성하는 비영리민간단체입니다.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="h-10 w-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors text-white" title="인스타그램">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="h-10 w-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors text-white" title="페이스북">
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div className="md:col-span-2">
            <h4 className="text-white font-bold mb-6">바로가기</h4>
            <ul className="space-y-4 text-sm">
              <li><a href="#/intro/greetings" className="hover:text-yellow-400 transition-colors">대표 인사말</a></li>
              <li><a href="#/intro/history" className="hover:text-yellow-400 transition-colors">단체 연혁</a></li>
              <li><a href="#/board/projects" className="hover:text-yellow-400 transition-colors">주요 사업</a></li>
              <li><a href="#/board/notices" className="hover:text-yellow-400 transition-colors">공지사항</a></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-white font-bold mb-6">관련 기관</h4>
            <ul className="space-y-4 text-sm">
              {RELATED_SITES.map((site) => (
                <li key={site.url}>
                  <a href={site.url} target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400 transition-colors flex items-center">
                    <Globe className="h-3 w-3 mr-2 opacity-50" /> {site.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <h4 className="text-white font-bold mb-6">연락처 및 위치</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-purple-400 mr-3 shrink-0 mt-1" />
                <div className="flex flex-col space-y-1">
                  <span className="text-white font-semibold">현) 경상남도 창원시 마산회원구 내서읍 삼계6길 40 202호</span>
                  <span className="text-[12px] text-gray-500 italic">이전) 경상남도 창원시 마산회원구 내서읍 삼계6길 12 301호</span>
                </div>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-purple-400 mr-3 shrink-0" />
                <span>055-232-5412</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-purple-400 mr-3 shrink-0" />
                <span>zaminan@naver.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-[12px] font-medium uppercase tracking-wider">
          <div className="flex space-x-6 mb-4 md:mb-0">
            <a href="#" className="hover:text-white transition-colors border-b border-transparent hover:border-white">개인정보처리방침</a>
            <a href="#" className="hover:text-white transition-colors border-b border-transparent hover:border-white">이용약관</a>
            <a href="#" className="hover:text-white transition-colors border-b border-transparent hover:border-white">이메일무단수집거부</a>
          </div>
          <div className="text-center md:text-right">
            <p>© 2024-2025 KKUMTTRE COMMUNITY. ALL RIGHTS RESERVED.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
