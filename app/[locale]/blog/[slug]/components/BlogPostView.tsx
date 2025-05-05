"use client";
import React from 'react';
import Link from 'next/link';
import parse from 'html-react-parser';
import BlogPostBody from './BlogPostBody';
import './blog-post-component.scss';
import { IBlogValue } from '../../components/BlogListing';
// import BlogNotFound from '../../components/BlogNotFound/page';
import { notFound } from "next/navigation";
import ThemeSwitchAssetsNoLink from '@/utils/ThemeSwitchAssetsNoLink';
import { IGlobalAssetsProps } from '@/types/pageContent.types';


export interface IBlogPostViewProp {
  prevNextArrows: IGlobalAssetsProps[];
  currentBlog: IBlogValue[];
  prevBlogTitle: string;
  prevBlogLink: string;
  nextBlogTitle: string;
  nextBlogLink: string;
};

const BlogPostView = (
  {
    prevNextArrows, 
    currentBlog,
    prevBlogTitle,
    prevBlogLink,
    nextBlogTitle,
    nextBlogLink
  }: IBlogPostViewProp
) => {

  return (
    <div className={`blog_post__container`}>
      <div className={`blog_post`}>
        <div className={`blog_post__body`}>
          {/* {parse(currentBlog[0].body)} */}
          {/* <BlogPostBody blogPostBodyData={currentBlog[0].body} /> */}
          {
            currentBlog[0]?.body === undefined || currentBlog[0]?.body === null
              // ? <BlogNotFound />
              ? notFound()
              : <BlogPostBody 
                  blogPostBodyData={currentBlog[0].body} 
                />
          }
        </div>
      </div>
      <div className={`prev_next_blog_links`}>
        <div className={`blog_prev`}>
          {
            prevBlogTitle
              ? <Link href={`${prevBlogLink}`}>
                  <div className={`links`}>
                    <ThemeSwitchAssetsNoLink 
                      receivedAssets={prevNextArrows} 
                    />                    
                  </div>

                  <p>{parse(prevBlogTitle)}</p>
                </Link>
              : <></>
          }
        </div>

        <div className={`blog_next`}>
          {
            nextBlogTitle
              ? <Link href={`${nextBlogLink}`}>
                  <p>{parse(nextBlogTitle)}</p>
                  <div className={`links`}>
                    <ThemeSwitchAssetsNoLink 
                      receivedAssets={prevNextArrows} 
                    />                    
                  </div>
                </Link>
              : <></>
          }
        </div>
      </div>
    </div>
  )
}

export default BlogPostView;