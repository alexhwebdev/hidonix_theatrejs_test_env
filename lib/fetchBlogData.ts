import { performRequest } from '@/lib/datocms';
import { IGlobalAssetsProps, IPageContent } from '@/types/pageContent.types';


export async function fetchBlogData(locale: string) {
  const BLOG_PAGE_CONTENT_QUERY = `
    query Blog {
      globalAsset {
        images {
          alt
          url
          customData 
        }
      }
      allBlogPageModels(locale: ${locale}) {
        title
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
          prevBlogLink
          nextBlogLink
        }
      }
    }`;

  const { globalAsset, allBlogPageModels }: IPageContent = await performRequest(BLOG_PAGE_CONTENT_QUERY);
  const prevNextArrows: IGlobalAssetsProps[] = [];
  globalAsset.images.forEach((img) => {
    if (img.alt.includes("Narrow")) {
      prevNextArrows.push(img);
    }
  });

  const filterOutEmptyBlogPage = allBlogPageModels.filter(
    blog => blog.blogPage.length > 0
  )

  const sortedBlogs = filterOutEmptyBlogPage.sort((a, b) => {
    const dateA = new Date(a.blogPage?.[0]?.blogArticleDate);
    const dateB = new Date(b.blogPage?.[0]?.blogArticleDate);
  
    return dateB.getTime() - dateA.getTime(); // descending order
  });

  return {
    prevNextArrows,
    sortedBlogs,
  };
}
