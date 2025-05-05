// https://www.youtube.com/watch?v=wTGVHLyV09M&t=3042s
import React from 'react';
import { Metadata } from 'next';   // May need to add this to generateMetadata
// import { title } from 'process';
import BlogPostView from './components/BlogPostView';
import { IBlogValue } from '../components/BlogListing';
import { fetchBlogData } from '@/lib/fetchBlogData';

// // THIS RESULTS --> 
// // ● (SSG) prerendered as static HTML (uses getStaticProps)
// // instead of :
// // ƒ  (Dynamic)  server-rendered on demand
// // which builds the HTML when page requested
export async function generateMetadata(
  { params }: { params: Promise<{ locale: string, slug: string }> }
): Promise<Metadata> {
  const resolvedParams = await params;
  const { locale, slug } = resolvedParams;
  const { sortedBlogs } = await fetchBlogData(locale);

  if (!sortedBlogs) {
    return { title: 'Loading...', description: 'Loading blog metadata...' };
  }

  const currentBlog: IBlogValue[] = [];

  sortedBlogs.forEach((blog) => {
    blog.blogPage.forEach((item) => {
      if (item.blogLink === `/${locale}/blog/${slug}`) {
        currentBlog.push(item);
      }
    });
  });

  if (currentBlog.length === 0) {
    return { title: 'Blog not found', description: 'No such blog post exists.' };
  }

  return {
    title: currentBlog[0].blogArticleTitleMetadata,
    description: currentBlog[0].blogArticleDescMetadata,
  };
}


export default async function BlogPostServer(
  { params }: { params: Promise<{ locale: string, slug: string }> }
) {
  const { locale, slug } = await params;
  const { prevNextArrows, sortedBlogs } = await fetchBlogData(locale);

  if (!sortedBlogs) {
    return <div>Loading...</div>;
  }

  // Flatten all blogPage entries into one array
  const allBlogs: IBlogValue[] = sortedBlogs.flatMap(blog => blog.blogPage);

  const currentIndex = allBlogs.findIndex(
    item => item.blogLink === `/${locale}/blog/${slug}`
  );

  const currentBlog = currentIndex !== -1 ? [allBlogs[currentIndex]] : [];
  const prevBlog = currentIndex > 0 ? [allBlogs[currentIndex - 1]] : [];
  const nextBlog = currentIndex < allBlogs.length - 1 ? [allBlogs[currentIndex + 1]] : [];

  if (currentBlog.length === 0) {
    return <div>Blog post not found</div>;
  }

  return (
    <BlogPostView
      prevNextArrows={prevNextArrows}
      currentBlog={currentBlog}
      prevBlogTitle={prevBlog[0]?.blogArticleTitleMetadata}
      prevBlogLink={prevBlog[0]?.blogLink}
      nextBlogTitle={nextBlog[0]?.blogArticleTitleMetadata}
      nextBlogLink={nextBlog[0]?.blogLink}
    />
  );
}
