import React from 'react';
// import { Metadata } from 'next';   // May need to add this to generateMetadata
import { performRequest } from '@/lib/datocms';
import { IGlobalAssetsProps, IPageContent } from '@/types/pageContent.types';
import ProjectView from './components/ProjectView';


export interface IProjectProps {
  projectListingPageProjectImage: {
    alt: string;
    url: string;
  }
  projectListingPageProjectHeading: string;
  projectListingPageProjectLink: string;
  projectTitleMetadata: string;
  projectDescMetadata: string;

  projectS1HeadingSubheadingImage: {
    heading: string;
    subheading: string;
    gallery: {
      alt: string;
      url: string;
    }[];
  }
  projectS2HeadingBodyImageVideoListitems: {
    heading: string;
    body: string;
    images: {
      alt: string;
      url: string;
    }[];
    videoUrl: string;
    listItems: string;
  }[];
  projectS3Heading: {
    heading: string;
  }
  projectS3BodyImage: {
    body: string;
    gallery: {
      alt: string;
      url: string;
    }
  }[];
  projectS4ImageDescImagesHeadingBody: {
    heading: string;
    body: string;
    images: {
      alt: string;
      url: string;
    }[];
    imagesDesc: string;
  }
  projectS5HeadingImagesBody: {
    heading: string;
    gallery: {
      alt: string;
      url: string;
    }[];
    image: {
      video: {
        muxPlaybackId: string;
        title: string;
        width: string;
        height: string;
        blurUpThumb: string;
      }[];
    }
    body: string;
    image2: {
      video: {
        muxPlaybackId: string;
        title: string;
        width: string;
        height: string;
        blurUpThumb: string;
      }[];
    }
    body2: string;
  }[];
  projectS6Heading: {
    heading: string;
  }
  projectS6Body: {
    body: string;
  }[];
  prevNextArticle: {
    prevArticle: string;
    prevArrow: {
      alt: string;
      url: string;
    }
    nextArticle: string;
    nextArrow: {
      alt: string;
      url: string;
    }
  }
}


const PROJECTS_PAGE_QUERY = `
  query Projects {
    globalAsset {
      images {
        url
        alt
        customData
      }
    }
    projectsListingPageModel {
      _allProjectListingPageHeadingBodyLocales {
        locale
        value
      }
      _allProjectListingPageEachProjectLocales {
        locale
        value {
          projectListingPageProjectImage {
            alt
            url
          }
          projectListingPageProjectHeading
          projectListingPageProjectLink
          projectTitleMetadata
          projectDescMetadata

          projectS1HeadingSubheadingImage {
            heading
            subheading
            gallery {
              alt
              url
            }
          }
          projectS2HeadingBodyImageVideoListitems {
            heading
            body
            images {
              alt
              url
            }
            videoUrl
            listItems
          }
          projectS3Heading {
            heading
          }
          projectS3BodyImage {
            body
            gallery {
              alt
              url
            }
          }
          projectS4ImageDescImagesHeadingBody {
            heading
            body
            images {
              alt
              url
            }
            imagesDesc
          }
          projectS5HeadingImagesBody {
            heading
            gallery {
              alt
              url
            }
            image {
              video {
                muxPlaybackId
                title
                width
                height
                blurUpThumb
              }
            }
            body
            image2 {
              video {
                muxPlaybackId
                title
                width
                height
                blurUpThumb
              }
            }
            body2
          }
          projectS6Heading {
            heading
          }
          projectS6Body {
            body
          }
          prevNextArticle {
            prevArticle
            prevArrow {
              alt
              url
              customData
            }
            nextArticle
            nextArrow {
              alt
              url
              customData
            }
          }
        }
      }
    }
  }`;

async function fetchProjectsData() {
  return await performRequest(PROJECTS_PAGE_QUERY);
}

const { 
  globalAsset,
  projectsListingPageModel 
}: IPageContent = await fetchProjectsData();


// export async function generateMetadata(
//   { params }: { params: Promise<{ locale: string, slug: string }> }
// ): Promise<Metadata> {
//   const resolvedParams = await params;
//   const slug = resolvedParams.slug;

//   if (!projectsListingPageModel) {
//     return { title: 'Loading...', description: 'Loading project metadata...' };
//   }

//   const filteredProjectArray: IProjectProps[] = [];

//   projectsListingPageModel._allProjectListingPageEachProjectLocales.map((project, index) => {
//     if (
//       project.locale === resolvedParams.locale &&
//       project.value[index + 1].projectListingPageProjectLink === `/${resolvedParams.locale}/projects/` + slug
//     ) {
//       return filteredProjectArray.push(project.value[0])
//     }
//   });

//   if (!filteredProjectArray) {
//     return { title: 'Blog not found', description: 'No such blog post exists.' };
//   }

//   return {
//     title: filteredProjectArray[0].projectTitleMetadata,
//     description: filteredProjectArray[0].projectDescMetadata,
//   };
// }



const ProjectServer = async (
  { params }: { params: Promise<{ locale: string, slug: string }> }
) => {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const narrowArrows: IGlobalAssetsProps[] = [];
  globalAsset.images.map((img) => {
    if (img.alt.includes("Chevron Narrow")) {
      narrowArrows.push(img)
    }
  });

  if (!projectsListingPageModel) {
    return <div>Loading...</div>;
  }

  const filteredProjectArray: IProjectProps[] = [];

  projectsListingPageModel._allProjectListingPageEachProjectLocales.map((projects) => {

    if (projects.locale === resolvedParams.locale) {
      projects.value.map((project) => {
        if (project.projectListingPageProjectLink === `/${resolvedParams.locale}/projects/` + slug) {
          filteredProjectArray.push(project)
        }
      })
    }
  });

  return (
    <div>
      <ProjectView 
        slug={slug}
        narrowArrows={narrowArrows}
        filteredProjectArray={filteredProjectArray} 
      />
    </div>
  )
}

export default ProjectServer;