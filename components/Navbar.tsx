
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Logo } from './Logo';
import { NAVIGATION } from '../constants';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const location = useLocation();

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Logo className="h-10 w-10" />
              <span className="text-xl font-bold text-purple-900 tracking-tight">
                꿈뜨레 <span className="text-yellow-500">지역공동체</span>
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {NAVIGATION.map((item) => (
              <div
                key={item.path}
                className="relative group"
                onMouseEnter={() => setActiveMenu(item.name)}
                onMouseLeave={() => setActiveMenu(null)}
              >
                <Link
                  to={item.subItems ? item.subItems[0].path : item.path}
                  className={`flex items-center py-2 text-sm font-medium transition-colors ${
                    location.pathname.startsWith(item.path) ? 'text-purple-700' : 'text-gray-600 hover:text-purple-600'
                  }`}
                >
                  {item.name}
                  {item.subItems && <ChevronDown className="ml-1 h-4 w-4" />}
                </Link>

                {item.subItems && (
                  <div className="absolute left-0 mt-0 w-48 bg-white border border-gray-100 shadow-xl rounded-md overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    {item.subItems.map((sub) => (
                      <Link
                        key={sub.path}
                        to={sub.path}
                        className="block px-4 py-3 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-700"
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-purple-700 p-2"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 pb-4">
          {NAVIGATION.map((item) => (
            <div key={item.path} className="px-4 py-2">
              <div className="font-semibold text-gray-800 py-2 border-b border-gray-50 mb-2">
                {item.name}
              </div>
              {item.subItems ? (
                <div className="pl-4 space-y-2 mt-2">
                  {item.subItems.map((sub) => (
                    <Link
                      key={sub.path}
                      to={sub.path}
                      onClick={() => setIsOpen(false)}
                      className="block text-sm text-gray-600 py-1"
                    >
                      {sub.name}
                    </Link>
                  ))}
                </div>
              ) : (
                <Link
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className="block text-sm text-gray-600 mt-2"
                >
                  보러가기
                </Link>
              )}
            </div>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
