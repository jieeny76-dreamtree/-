
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Plus, Search, FileText, Image as ImageIcon } from 'lucide-react';
import { useBoardStore } from '../../store/boardStore';
import { BoardType } from '../../types';

const BoardList: React.FC = () => {
  const { type } = useParams<{ type: string }>();
  const boardType = type as BoardType;
  const { getPostsByType } = useBoardStore();
  
  const posts = getPostsByType(boardType);
  
  const getBoardTitle = () => {
    switch(boardType) {
      case 'projects': return '주요사업';
      case 'notices': return '공지사항';
      case 'donations': return '후원소식';
      default: return '게시판';
    }
  };

  const getBoardDesc = () => {
    switch(boardType) {
      case 'donations': return '여러분의 소중한 후원금이 어떻게 쓰였는지 투명하게 알려드립니다.';
      default: return '꿈뜨레의 다양한 활동과 소식을 전해드립니다.';
    }
  };

  const boardTitle = getBoardTitle();

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden min-h-[600px]">
      <div className="bg-purple-900 text-white px-8 py-10 flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold">{boardTitle}</h2>
          <p className="text-purple-200 text-sm mt-1">{getBoardDesc()}</p>
        </div>
        <Link 
          to={`/board/${boardType}/write`}
          className="bg-yellow-500 hover:bg-yellow-400 text-purple-900 px-6 py-3 rounded-full font-bold transition-all shadow-md flex items-center"
        >
          <Plus className="mr-2 h-5 w-5" /> 글쓰기
        </Link>
      </div>

      <div className="p-4 md:p-8">
        <div className="mb-8 relative max-w-md">
          <input 
            type="text" 
            placeholder="검색어를 입력하세요..."
            className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
          />
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-500 text-sm uppercase">
              <tr>
                <th className="px-6 py-4 font-semibold">번호</th>
                <th className="px-6 py-4 font-semibold">제목</th>
                <th className="px-6 py-4 font-semibold">작성자</th>
                <th className="px-6 py-4 font-semibold">날짜</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {posts.length > 0 ? (
                posts.map((post, idx) => {
                  const hasImages = (post.imageUrls && post.imageUrls.length > 0) || post.imageUrl;
                  return (
                    <tr key={post.id} className="hover:bg-purple-50 transition-colors cursor-pointer group">
                      <td className="px-6 py-4 text-gray-400">{posts.length - idx}</td>
                      <td className="px-6 py-4">
                        <Link to={`/board/${boardType}/view/${post.id}`} className="flex items-center">
                          <span className="font-medium text-gray-900 group-hover:text-purple-700 transition-colors">
                            {post.title}
                          </span>
                          {hasImages && <ImageIcon className="ml-2 h-4 w-4 text-purple-300" />}
                          {post.fileName && <FileText className="ml-2 h-4 w-4 text-blue-300" />}
                        </Link>
                      </td>
                      <td className="px-6 py-4 text-gray-600">{post.author}</td>
                      <td className="px-6 py-4 text-gray-400 text-sm">
                        {new Date(post.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={4} className="px-6 py-20 text-center text-gray-400">
                    등록된 게시글이 없습니다. 첫 글을 작성해보세요!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BoardList;
