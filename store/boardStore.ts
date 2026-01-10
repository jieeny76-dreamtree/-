
import { useState, useEffect, useCallback } from 'react';
import { Post, BoardType } from '../types';

const STORAGE_KEY = 'kkumttre_posts';

export const useBoardStore = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setPosts(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to parse stored posts", e);
      }
    }
  }, []);

  const addPost = useCallback((post: Post): boolean => {
    try {
      const next = [post, ...posts];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      setPosts(next);
      return true;
    } catch (e) {
      console.error("Storage limit exceeded", e);
      alert("브라우저 저장 공간이 부족합니다. 오래된 게시글이나 큰 사진을 삭제한 후 다시 시도해 주세요.");
      return false;
    }
  }, [posts]);

  const getPostsByType = useCallback((type: BoardType) => {
    return posts.filter(p => p.type === type);
  }, [posts]);

  const deletePost = useCallback((id: string) => {
    const next = posts.filter(p => p.id !== id);
    setPosts(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }, [posts]);

  return {
    posts,
    addPost,
    getPostsByType,
    deletePost
  };
};
