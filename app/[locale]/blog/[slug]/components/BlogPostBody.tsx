import React from 'react'
import parse, { HTMLReactParserOptions } from 'html-react-parser';
import Image from 'next/image';


interface IBlogPostBodyProps {
  blogPostBodyData: string;
}
interface IHtmlStringAndVideoProps {
  htmlString: string;
}

const HtmlWithNextImage = (
  { htmlString }: IHtmlStringAndVideoProps
) => {
  const options: HTMLReactParserOptions = {
    replace: (domNode) => {
      if (domNode.type === 'tag' && domNode.name === 'img') {
        const { src, alt, width, height, class: className } = domNode.attribs;

        return (
          <Image
            src={src}
            alt={alt || ''}
            width={parseInt(width) || 800}
            height={parseInt(height) || 600}
            className={className}
            style={{ width: '100%', height: 'auto' }}
          />
        );
      }
      if (domNode.type === 'text') {
        if (domNode.data.slice(-3) === "mp4" ) {
          return (
            <iframe
              src={domNode.data}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              width="100%" 
              height="500"
            />
          )
        }
      }
    },
  };

  return <div>{parse(htmlString, options)}</div>;
};

const BlogPostBody = (
  { blogPostBodyData }: IBlogPostBodyProps
) => {
  return (
    <>
      <HtmlWithNextImage 
        htmlString={blogPostBodyData}
      />
    </>
  );
};

export default BlogPostBody;
