
import React, { useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Camera, Paperclip, X, Save, ArrowLeft, Image as ImageIcon } from 'lucide-react';
import { useBoardStore } from '../../store/boardStore';
import { BoardType, Post } from '../../types';

const PostWrite: React.FC = () => {
  const { type } = useParams<{ type: string }>();
  const boardType = type as BoardType;
  const navigate = useNavigate();
  const { addPost } = useBoardStore();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('관리자');
  const [images, setImages] = useState<string[]>([]);
  const [file, setFile] = useState<{ name: string; data: string } | null>(null);
  const [isCompressing, setIsCompressing] = useState(false);

  const imageInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const compressImage = (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target?.result as string;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 1200; 
          let width = img.width;
          let height = img.height;

          if (width > MAX_WIDTH) {
            height = (height * MAX_WIDTH) / width;
            width = MAX_WIDTH;
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL('image/jpeg', 0.7));
        };
      };
    });
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (selectedFiles && selectedFiles.length > 0) {
      setIsCompressing(true);
      const newImages: string[] = [];
      try {
        for (let i = 0; i < selectedFiles.length; i++) {
          const compressedData = await compressImage(selectedFiles[i]);
          newImages.push(compressedData);
        }
        setImages(prev => [...prev, ...newImages]);
      } catch (err) {
        console.error("Image compression failed", err);
        alert("이미지 처리 중 오류가 발생했습니다.");
      } finally {
        setIsCompressing(false);
        if (imageInputRef.current) imageInputRef.current.value = "";
      }
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.size > 1024 * 1024 * 2) { 
        alert("파일 용량이 너무 큽니다. (최대 2MB)");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFile({
          name: selectedFile.name,
          data: reader.result as string
        });
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      alert('제목과 내용을 입력해주세요.');
      return;
    }

    const newPost: Post = {
      id: Date.now().toString(),
      type: boardType,
      title,
      content,
      author,
      createdAt: Date.now(),
      imageUrl: images.length > 0 ? images[0] : undefined,
      imageUrls: images.length > 0 ? images : undefined,
      fileName: file?.name,
      fileData: file?.data
    };

    const success = addPost(newPost);
    if (success) {
      navigate(`/board/${boardType}`);
    }
  };

  const getBoardTitle = () => {
    switch(boardType) {
      case 'projects': return '주요사업';
      case 'notices': return '공지사항';
      case 'donations': return '후원소식';
      default: return '게시판';
    }
  };

  const boardTitle = getBoardTitle();

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="bg-purple-900 text-white px-8 py-10">
        <h2 className="text-3xl font-bold">{boardTitle} 글쓰기</h2>
      </div>

      <form onSubmit={handleSubmit} className="p-8 space-y-8">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">제목</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="제목을 입력하세요"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all text-lg font-medium"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">작성자</label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">내용</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="내용을 입력하세요"
              rows={12}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all resize-none"
              required
            ></textarea>
          </div>
        </div>

        <div className="flex flex-wrap gap-4">
          <div className="space-y-2">
            <button
              type="button"
              disabled={isCompressing}
              onClick={() => imageInputRef.current?.click()}
              className={`flex items-center px-5 py-3 rounded-xl transition-all font-bold ${isCompressing ? 'bg-gray-100 text-gray-400' : 'bg-purple-600 text-white hover:bg-purple-700 shadow-md active:scale-95'}`}
            >
              <Camera className="mr-2 h-5 w-5" /> {isCompressing ? '사진 처리 중...' : '사진 여러장 첨부'}
            </button>
            <input 
              type="file" 
              ref={imageInputRef} 
              onChange={handleImageChange} 
              accept="image/*" 
              multiple 
              className="hidden" 
            />
          </div>

          <div className="space-y-2">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center px-5 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-bold transition-all shadow-md active:scale-95"
            >
              <Paperclip className="mr-2 h-5 w-5" /> 파일 첨부
            </button>
            <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" />
          </div>
        </div>

        {/* Image Previews */}
        {images.length > 0 && (
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-700">첨부된 사진 ({images.length})</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {images.map((img, index) => (
                <div key={index} className="relative group aspect-square rounded-2xl overflow-hidden border-2 border-gray-100 bg-gray-50">
                  <img src={img} alt={`preview-${index}`} className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full shadow-lg hover:scale-110 transition-transform"
                  >
                    <X className="h-4 w-4" />
                  </button>
                  {index === 0 && (
                    <div className="absolute bottom-0 left-0 right-0 bg-yellow-400 text-purple-900 text-[10px] font-bold text-center py-1">
                      대표 이미지
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* File Preview */}
        {file && (
          <div className="flex items-center p-4 bg-blue-50 rounded-xl border border-blue-100 max-w-md">
            <Paperclip className="h-5 w-5 mr-3 text-blue-500" />
            <span className="text-sm font-medium text-blue-900 mr-4 truncate flex-grow">{file.name}</span>
            <button type="button" onClick={() => setFile(null)} className="text-red-500 hover:bg-red-50 p-1 rounded-full transition-colors">
              <X className="h-5 w-5" />
            </button>
          </div>
        )}

        <div className="flex justify-between pt-8 border-t border-gray-100">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-8 py-3 bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200 font-bold transition-all flex items-center"
          >
            <ArrowLeft className="mr-2 h-5 w-5" /> 취소
          </button>
          <button
            type="submit"
            disabled={isCompressing}
            className="px-10 py-3 bg-purple-700 text-white rounded-full hover:bg-purple-800 font-bold transition-all shadow-lg flex items-center disabled:opacity-50"
          >
            <Save className="mr-2 h-5 w-5" /> 게시글 저장
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostWrite;
