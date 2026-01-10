
import React from 'react';
import { Logo } from './Logo';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-800 pb-8 mb-8">
          <div className="flex items-center space-x-3 mb-4 md:mb-0">
            <Logo className="h-8 w-8 opacity-50 grayscale invert" />
            <span className="text-xl font-bold text-white">꿈뜨레 지역공동체</span>
          </div>
          <div className="flex space-x-6 text-sm">
            <a href="#" className="hover:text-white transition-colors">개인정보처리방침</a>
            <a href="#" className="hover:text-white transition-colors">이용약관</a>
            <a href="#" className="hover:text-white transition-colors">후원안내</a>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-8 text-sm leading-loose">
          <div>
            <p>단체명: 꿈뜨레 지역공동체 | 대표: 이한기</p>
            <p>주소: 창원시 마산회원구 내서읍 삼계6길 12 301호</p>
          </div>
          <div className="md:text-right">
            <p>전화: 055-232-5412</p>
            <p>이메일: zaminan@naver.com</p>
            <p className="mt-4 opacity-50">© 2024-2025 Kkumttre Community. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
