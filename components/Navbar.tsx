
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Logo } from './Logo';
import { NAVIGATION } from '../constants';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="bg-white/95 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3 group">
              <Logo className="h-11 w-11 group-hover:rotate-6 transition-transform" />
              <div className="flex flex-col">
                <span className="text-xl font-black text-purple-900 tracking-tighter leading-none">
                  꿈뜨레 <span className="text-yellow-500">지역공동체</span>
                </span>
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">Kkumttre Community</span>
              </div>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {NAVIGATION.map((item) => (
              <div key={item.path} className="relative group">
                <Link
                  to={item.subItems ? item.subItems[0].path : item.path}
                  className={`flex items-center py-2 text-[15px] font-bold transition-all ${
                    location.pathname.startsWith(item.path) 
                    ? 'text-purple-700 border-b-2 border-purple-600' 
                    : 'text-gray-600 hover:text-purple-600'
                  }`}
                >
                  {item.name}
                  {item.subItems && <ChevronDown className="ml-1 h-4 w-4 opacity-50" />}
                </Link>

                {item.subItems && (
                  <div className="absolute left-1/2 -translate-x-1/2 mt-0 w-48 bg-white border border-gray-100 shadow-2xl rounded-2xl overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-2">
                    <div className="py-2">
                      {item.subItems.map((sub) => (
                        <Link
                          key={sub.path}
                          to={sub.path}
                          className="block px-6 py-3 text-[14px] font-medium text-gray-700 hover:bg-purple-50 hover:text-purple-700 transition-colors"
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-purple-700 p-2 transition-colors"
              aria-label="메뉴 열기"
            >
              {isOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden fixed inset-0 bg-white z-[60] transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-6 h-full flex flex-col">
          <div className="flex justify-between items-center mb-10">
            <Logo className="h-10 w-10" />
            <button onClick={() => setIsOpen(false)} className="p-2 text-gray-400">
              <X className="h-8 w-8" />
            </button>
          </div>
          <div className="space-y-6 overflow-y-auto">
            {NAVIGATION.map((item) => (
              <div key={item.path} className="border-b border-gray-50 pb-6">
                <div className="text-xl font-black text-purple-900 mb-4">{item.name}</div>
                <div className="grid grid-cols-1 gap-4 pl-4">
                  {item.subItems ? (
                    item.subItems.map((sub) => (
                      <Link
                        key={sub.path}
                        to={sub.path}
                        onClick={() => setIsOpen(false)}
                        className="text-lg text-gray-600 font-medium active:text-purple-600"
                      >
                        {sub.name}
                      </Link>
                    ))
                  ) : (
                    <Link
                      to={item.path}
                      onClick={() => setIsOpen(false)}
                      className="text-lg text-gray-600 font-medium"
                    >
                      바로가기
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-auto py-8">
            <Link 
              to="/donation/account" 
              onClick={() => setIsOpen(false)}
              className="block w-full text-center bg-yellow-400 text-purple-900 font-black py-4 rounded-2xl text-lg shadow-lg"
            >
              후원 참여하기
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
