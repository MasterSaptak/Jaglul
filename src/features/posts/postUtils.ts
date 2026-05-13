import { Post } from './types';

export const isPublishedPost = (post: Post) => post.visibility === 'published';

export const isArticlePost = (post: Post) =>
  isPublishedPost(post) && post.type !== 'gallery' && post.type !== 'video';

export const sortNewestFirst = (posts: Post[]) =>
  [...posts].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

export const getPostImage = (post: Post) =>
  post.media[0]?.thumbnail || post.media[0]?.url || '/colonel-jaglul.png';

export const getPostExcerpt = (post: Post) => {
  const source = post.caption || post.description || '';
  return source.replace(/\s+/g, ' ').trim();
};

export const getPostUrl = (post: Post) => (post.slug ? `/update/${post.slug}` : `/news/${post.id}`);

export const formatPostDate = (post: Post) =>
  new Date(post.createdAt).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

export const getPostYear = (post: Post) => new Date(post.createdAt).getFullYear().toString();

export const getPostCategory = (post: Post) => post.category || post.type;
