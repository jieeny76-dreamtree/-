
import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Greetings from './pages/Intro/Greetings';
import History from './pages/Intro/History';
import BoardList from './pages/Board/BoardList';
import PostWrite from './pages/Board/PostWrite';
import PostView from './pages/Board/PostView';

const Breadcrumb: React.FC = () => {
  const location = useLocation();
  const path = location.pathname;
  
  if (path === '/' || path === '') return null;

  let category = "";
  let pageName = "";

  if (path.includes('/intro/')) {
    category = "단체소개";
    pageName = path.includes('greetings') ? "대표인사말" : "연혁";
  } else if (path.includes('/board/')) {
    category = path.includes('projects') ? "주요사업" : "공지사항";
    pageName = path.includes('write') ? "글쓰기" : path.includes('view') ? "상세보기" : "목록";
  }

  return (
    <div className="bg-white border-b border-gray-100 mb-8 py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center text-sm text-gray-500">
        <span className="hover:text-purple-600 cursor-pointer" onClick={() => window.location.hash = '#'}>홈</span>
        <span className="mx-2">/</span>
        {category && (
          <>
            <span>{category}</span>
            <span className="mx-2">/</span>
          </>
        )}
        <span className="font-bold text-purple-700">{pageName}</span>
      </div>
    </div>
  );
};

const PageLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-20">
      <Breadcrumb />
      {children}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        
        <main className="flex-grow">
          <Routes>
            {/* Main Page */}
            <Route path="/" element={<Home />} />
            
            {/* Intro Pages */}
            <Route path="/intro/greetings" element={<PageLayout><Greetings /></PageLayout>} />
            <Route path="/intro/history" element={<PageLayout><History /></PageLayout>} />
            <Route path="/intro" element={<Navigate to="/intro/greetings" replace />} />
            
            {/* Board Pages */}
            <Route path="/board/:type" element={<PageLayout><BoardList /></PageLayout>} />
            <Route path="/board/:type/write" element={<PageLayout><PostWrite /></PageLayout>} />
            <Route path="/board/:type/view/:id" element={<PageLayout><PostView /></PageLayout>} />
            
            {/* 404 Redirect to Home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
};

export default App;
