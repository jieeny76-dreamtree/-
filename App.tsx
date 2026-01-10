
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
import { NAVIGATION } from './constants';

const Breadcrumb: React.FC = () => {
  const location = useLocation();
  const pathParts = location.pathname.split('/').filter(p => p);
  
  // Find current menu name
  let title = "꿈뜨레";
  if (pathParts[0] === 'intro') {
    title = pathParts[1] === 'greetings' ? '대표인사말' : '연혁';
  } else if (pathParts[0] === 'board') {
    title = pathParts[1] === 'projects' ? '주요사업' : '공지사항';
  }

  if (location.pathname === '/' || pathParts.length === 0) return null;

  return (
    <div className="bg-white border-b border-gray-100 mb-8 py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center text-sm text-gray-500">
        <span>홈</span>
        <span className="mx-2">/</span>
        {pathParts[0] === 'intro' ? (
          <>
            <span>단체소개</span>
            <span className="mx-2">/</span>
          </>
        ) : null}
        <span className="font-bold text-purple-700">{title}</span>
      </div>
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
            <Route path="/" element={<Home />} />
            
            {/* Page layout for interior pages */}
            <Route path="*" element={
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-20">
                <Breadcrumb />
                <Routes>
                  {/* Intro */}
                  <Route path="intro/greetings" element={<Greetings />} />
                  <Route path="intro/history" element={<History />} />
                  
                  {/* Board */}
                  <Route path="board/:type" element={<BoardList />} />
                  <Route path="board/:type/write" element={<PostWrite />} />
                  <Route path="board/:type/view/:id" element={<PostView />} />
                  
                  {/* Redirects */}
                  <Route path="intro" element={<Navigate to="/intro/greetings" replace />} />
                </Routes>
              </div>
            } />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
};

export default App;
