import React from 'react';
import Image from 'next/image';
import parse from 'html-react-parser';
import { performRequest } from '@/lib/datocms';
// import ProjectsComponent from './components/ProjectsComponent';
import { IPageContent } from '@/types/pageContent.types';
import './projects.scss';
import ItProjectsListingComponenet from './components/ItProjectListing';


// DOC : Metadata - https://nextjs.org/docs/app/api-reference/functions/generate-metadata
// NextJS looks for export of 'const metadata'.
export const metadata = {
  // https://nextjs.org/docs/app/api-reference/functions/generate-metadata
  title: 'Projects | Hidonix',
  description: 'Transforming Challenges into Innovations',
  // keywords: ['Next.js', 'React', 'JavaScript'],
  // manifest: '/manifest.json',
}

export default async function ProjectsListingServer(
  {params} : {params: Promise<{locale: string}>;}
) {
  const {locale} = await params;
  
  const PROJECTS_PAGE_QUERY = `
    query Projects {
      globalAsset {
        images {
          alt
          url
        }
      }
      projectsListingPageModel(locale: ${locale}) {
        projectListingPageHeadingBody

        projectListingPageEachProject {
          projectListingPageProjectImage {
            alt
            url
          }
          projectListingPageProjectHeading
          projectListingPageProjectLink
          projectTitleMetadata
          projectDescMetadata
        }

        itProjectListingModel {
          heading
          subheading
          body
          accordianTitleAccordianBody {
            subheading
            body
          }
          image {
            alt
            url
          }
        }
      }
    }`;

  const { 
    globalAsset,
    projectsListingPageModel 
  }: IPageContent = await performRequest(PROJECTS_PAGE_QUERY);

  const eachProjectData = projectsListingPageModel.projectListingPageEachProject;

  return (
    <div id={`projects_listing`} className={`${locale}`}>
      <header>
        {
          locale === 'en'
            ? <>
                {parse(projectsListingPageModel.projectListingPageHeadingBody)}
                
              </>
            : 
            <div className={`it__project_header`}>.
              {parse(projectsListingPageModel.projectListingPageHeadingBody)}
            </div>
        }
      </header>


      {
        locale === 'en' ? (
          <ul>
            {eachProjectData.map((project) => (
              <li key={`projects-${project.projectListingPageProjectImage.alt}`}>
                <a href={project.projectListingPageProjectLink}>
                  <p>{project.projectListingPageProjectImage.alt}</p>
                  <Image 
                    src={project.projectListingPageProjectImage.url} 
                    alt={project.projectListingPageProjectImage.alt} 
                    width={400}
                    height={400}
                  />                
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <ItProjectsListingComponenet 
            globalAsset={globalAsset}
            itProjectListingModel={projectsListingPageModel.itProjectListingModel}
          />
        )
      }

    </div>
  )
}
