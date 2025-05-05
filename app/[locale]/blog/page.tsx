import React from 'react';
import { performRequest } from '@/lib/datocms';
import BlogListing from './components/BlogListing';
import { IPageContent } from '@/types/pageContent.types';
import { Metadata } from 'next';

// DOC : Metadata - https://nextjs.org/docs/app/api-reference/functions/generate-metadata
// NextJS looks for export of 'const metadata'.
// Page Metadata overrides layout Metadata
export const metadata: Metadata = {
  title: 'Blog',
  description: 'Latest news from Hidonix',
  // keywords: ['Next.js', 'React', 'JavaScript'],
  // manifest: '/manifest.json',
}


export default async function BlogLayout(
  {params} : {params: Promise<{locale: string}>;}
) {
  const {locale} = await params;

  const BLOG_PAGE_CONTENT_QUERY = `
    query Blog {
      blogPageHeadingModel(locale: ${locale}) {
        blogListingPageHeading
        blogListingPageSubheading
      }

      allBlogPageModels(locale: ${locale}) {
        blogPage {
          blogArticleImage {
            alt
            url
          }
          blogArticleDate
          blogArticleTitleMetadata
          blogArticleDescMetadata
          blogArticleButton
          heading
          blogLink
          body
          nextBlogLink
          videos {
            alt
            video {
              alt
              blurhash
              duration
              mp4Url
              title
            }
          }
        }
      }
    }`;

  const { 
    blogPageHeadingModel, 
    allBlogPageModels 
  }: IPageContent = await performRequest(BLOG_PAGE_CONTENT_QUERY);

  const filteredBlogPage = allBlogPageModels.filter(
    item => item.blogPage.length > 0
  );

  return (
    <>
      <BlogListing 
        blogPageHeadingModel={blogPageHeadingModel} 
        allBlogPageModels={filteredBlogPage} 
      />
    </>
  )
}
















