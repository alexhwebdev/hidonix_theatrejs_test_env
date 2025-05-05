"use client";
import Image from 'next/image';
import { useState } from 'react';
import Search from '@/components/Search/Search';
import "./blog-component.scss";

export interface IBlogValue {
  blogArticleImage: {
    alt: string;
    url: string;
  };
  blogArticleDate: string;
  blogArticleTitleMetadata: string;
  blogArticleDescMetadata: string;
  blogArticleButton: string;
  heading: string;
  blogLink: string;
  body: string;
  nextBlogLink: string;
};

export interface IBlogProps {
  blogPageHeadingModel: {
    blogListingPageHeading: string;
    blogListingPageSubheading: string;
  };
  allBlogPageModels: {
    blogPage: IBlogValue[];
  }[];
};

const BlogListing = (
  { blogPageHeadingModel, allBlogPageModels }: IBlogProps
) => {
  const [blogPosts, setBlogPosts] = useState<IBlogValue[] | null>(null);

  const parseDate = (dateStr: string) => {
    const [month, day, year] = dateStr.split('/').map(Number);
    return new Date(year, month - 1, day);
  };

  const handleSearch = (query: string) => {
    const allBlogs = allBlogPageModels.flatMap(page => page.blogPage);

    const filteredResults = allBlogs.filter(blog =>
      blog.heading.toLowerCase().includes(query.toLowerCase()) ||
      blog.body.toLowerCase().includes(query.toLowerCase())
    );

    const sortedResults = filteredResults.sort((a, b) =>
      parseDate(b.blogArticleDate).getTime() - parseDate(a.blogArticleDate).getTime()
    );

    setBlogPosts(sortedResults);
  };

  const allSortedBlogs = [...allBlogPageModels].sort((a, b) => {
    const dateA = parseDate(a.blogPage[0].blogArticleDate);
    const dateB = parseDate(b.blogPage[0].blogArticleDate);

    return dateB.getTime() - dateA.getTime();
  });

  const blogsToDisplay = blogPosts ?? allSortedBlogs.flatMap(model => model.blogPage);

  return (
    <div id={`blog__component`}>
      <header>
        <div className={`blog__component_container`}>
          <div className={`blog__heading_subheading`}>
            <p>{blogPageHeadingModel.blogListingPageHeading}</p>
            <h1>{blogPageHeadingModel.blogListingPageSubheading}</h1>
          </div>
          <Search onSearch={handleSearch} />
        </div>
      </header>

      <ul>
        {
          blogsToDisplay.map((blog, index) => (
            <li key={`blog-${index}`}>
              <a href={blog.blogLink}>
                <Image 
                  src={blog.blogArticleImage.url} 
                  alt={blog.blogArticleImage.alt} 
                  width={375}
                  height={325}
                />
              </a>
              <span>{blog.blogArticleDate}</span>
              <a href={blog.blogLink}>
                <p>{blog.heading}</p>
              </a>
              <a href={blog.blogLink}>
                {blog.blogArticleButton}
              </a>
            </li>
          ))
        }
      </ul>
    </div>
  );
};

export default BlogListing;
