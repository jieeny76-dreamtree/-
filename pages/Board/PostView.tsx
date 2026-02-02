
import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Trash2, Calendar, User, FileText, Download, Image as ImageIcon } from 'lucide-react';
import { useBoardStore } from '../../store/boardStore';

const PostView: React.FC = () => {
  const { type, id } = useParams<{ type: string; id: string }>();
  const navigate = useNavigate();
  const { posts, deletePost } = useBoardStore();

  const post = posts.find(p => p.id === id);

  if (!post) {
    return (
      <div className="p-20 text-center bg-white rounded-3xl shadow-sm">
        <p className="text-gray-500 mb-6">게시글을 찾을 수 없습니다.</p>
        <button onClick={() => navigate(-1)} className="px-6 py-2 bg-purple-600 text-white rounded-full">
          뒤로가기
        </button>
      </div>
    );
  }

  const handleDelete = () => {
    if (confirm('정말로 이 게시글을 삭제하시겠습니까?')) {
      deletePost(post.id);
      navigate(`/board/${type}`);
    }
  };

  const getBoardTitle = () => {
    switch(type) {
      case 'projects': return '주요사업';
      case 'notices': return '공지사항';
      case 'donations': return '후원소식';
      default: return '게시판';
    }
  };

  const boardTitle = getBoardTitle();

  // Support both old posts with single imageUrl and new posts with imageUrls array
  const displayImages = post.imageUrls || (post.imageUrl ? [post.imageUrl] : []);

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="bg-purple-900 text-white px-8 py-10">
        <Link to={`/board/${type}`} className="inline-flex items-center text-purple-200 hover:text-white mb-4 transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" /> {boardTitle} 목록으로
        </Link>
        <h2 className="text-3xl font-bold leading-tight">{post.title}</h2>
        <div className="flex flex-wrap gap-6 mt-6 text-purple-100 text-sm">
          <div className="flex items-center"><User className="mr-2 h-4 w-4" /> {post.author}</div>
          <div className="flex items-center"><Calendar className="mr-2 h-4 w-4" /> {new Date(post.createdAt).toLocaleString()}</div>
        </div>
      </div>

      <div className="p-8 md:p-12">
        {/* Content Area */}
        <div className="prose prose-purple max-w-none mb-12 min-h-[200px] whitespace-pre-wrap text-gray-800 leading-relaxed text-lg">
          {post.content}
        </div>

        {/* Multi Image Gallery */}
        {displayImages.length > 0 && (
          <div className="space-y-6 my-12 pt-12 border-t border-gray-50">
            <h3 className="text-xl font-bold text-gray-900 flex items-center">
              <ImageIcon className="mr-2 h-6 w-6 text-purple-600" /> 활동 사진
            </h3>
            <div className="grid grid-cols-1 gap-8 max-w-3xl mx-auto">
              {displayImages.map((url, index) => (
                <div key={index} className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm bg-gray-50">
                  <img 
                    src={url} 
                    alt={`activity-${index}`} 
                    className="w-full h-auto object-contain max-h-[800px] block mx-auto" 
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Attachment Area */}
        {post.fileName && (
          <div className="p-6 bg-gray-50 rounded-2xl border border-gray-200 flex items-center justify-between mt-12">
            <div className="flex items-center">
              <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="font-bold text-gray-900">{post.fileName}</p>
                <p className="text-xs text-gray-500">첨부파일</p>
              </div>
            </div>
            <a 
              href={post.fileData} 
              download={post.fileName}
              className="flex items-center px-4 py-2 bg-white text-gray-700 rounded-full border border-gray-200 hover:bg-gray-50 transition-colors shadow-sm text-sm"
            >
              <Download className="mr-2 h-4 w-4" /> 다운로드
            </a>
          </div>
        )}

        <div className="flex justify-between items-center mt-12 pt-8 border-t border-gray-100">
          <button
            onClick={() => navigate(`/board/${type}`)}
            className="px-8 py-3 bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200 font-bold transition-all"
          >
            목록으로
          </button>
          <button
            onClick={handleDelete}
            className="px-8 py-3 bg-red-50 text-red-600 rounded-full hover:bg-red-100 font-bold transition-all flex items-center"
          >
            <Trash2 className="mr-2 h-5 w-5" /> 게시글 삭제
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostView;
