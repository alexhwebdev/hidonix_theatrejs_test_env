// import Image from "next/image";
// import { performRequest } from '../lib/datocms';
import { IPageContent } from "@/types/pageContent.types";
// import styles from "./page.module.scss";
import { performRequest } from "@/lib/datocms";
import HomeComponent from "./home/components/HomeComponent";
// import SEO from "@/components/SEO/SEO";
// import GET_USERS_QUERY from "../graphql/query.graphql";


// DOC : Metadata - https://nextjs.org/docs/app/api-reference/functions/generate-metadata
// NextJS looks for export of 'const metadata'.
// Page Metadata overrides layout Metadata
export const metadata = {
  title: 'Home | Hidonix',
  description: 'We are not your typical software company—we are a deep tech pioneer at the forefront of innovation.',
  // keywords: ['Next.js', 'React', 'JavaScript'],
  // manifest: '/manifest.json',
}


export default async function HomePage(
  {params} : {params: Promise<{locale: string}>;}
) {
  const {locale} = await params;
  
  const HOME_PAGE_CONTENT_QUERY = `
    query Home {
      homePage(locale: ${locale}) {
        homeGlobalAssets {
          alt
          url
        }
        homeS1Hero {
          heading
          body
          button
          image {
            url
            alt
          }
          link
        }
        homeS2Brands {
          images {
            url
            alt
          }
        }
        homeS3TechList {
          ... on HomeS3HeadingBodyRecord {
            __typename
            heading
            body
          }
          ... on HomeS3SubheadingBodyRecord {
            __typename
            subheading
            body
          }
        }
        homeS4LimitlessApplications {
          ... on HomeS4HeadingRecord {
            __typename
            heading
          }
          ... on HomeS4ImageSubheadingBodyRecord {
            __typename
            image {
              url
            }
            subheading
            body
          }
        }
        homeS5TechPartner {
          image {
            alt
            url
          }
          heading
          button
        }
        homeS6LatestNews {
          ... on HomeS6HeadingSubheadingRecord {
            __typename
            heading
            subheading
          }
          ... on HomeS6ImageCopyRecord {
            __typename
            image {
              url
            }
            body
            date
            link
          }
        }
        homeS7AsFeaturedIn {
          heading
          images {
            url
            alt
            customData
          }
        }
      }
    }
  `;

  const { homePage }: IPageContent = await performRequest(HOME_PAGE_CONTENT_QUERY);
  const homeGlobalAssets = homePage.homeGlobalAssets;
  const secOneData = homePage.homeS1Hero;
  const secTwoData = homePage.homeS2Brands;
  const secThreeHeading: { 
    heading: string;
    body: string;
  }[] = [];
  const secThreeTechList: { 
    subheading: string;
    body: string;
  }[] = [];

  homePage.homeS3TechList.forEach((item) => {
    if ("heading" in item) {
      secThreeHeading.push({ 
        heading: item.heading,
        body: item.body
      });
    } 
    else if ("subheading" in item) {
      secThreeTechList.push({
        subheading: item.subheading,
        body: item.body,
      });
    }
  })
  const sectionThreeData = {
    headingBody: secThreeHeading,
    subheadingBody: secThreeTechList,
  };
  

  // --------------- Section 4 : Limitless Applications...
  const secFourHeading: { heading: string }[] = [];
  const secFourImgs: { 
    image: { url: string }; 
    subheading: string; 
    body: string 
  }[] = [];
  homePage.homeS4LimitlessApplications.forEach((item) => {
    if ("heading" in item) {
      secFourHeading.push({ heading: item.heading });
    } else if ("image" in item) {
      secFourImgs.push({
        image: item.image,
        subheading: item.subheading,
        body: item.body,
      });
    }
  });
  const sectionFourData = {
    headings: secFourHeading,
    images: secFourImgs,
  };


  // --------------- Section 5 : Looking for a technology partner...
  const secFiveData = homePage.homeS5TechPartner;


  // --------------- Section 6 : Latest news
  const secSixHeading: { 
    heading: string;
    subheading: string;
  }[] = [];
  const secSixImgs: { 
    image: { url: string }; 
    body: string 
    date: string;
    link: string;
  }[] = [];
  homePage.homeS6LatestNews.forEach((item) => {
    if ("heading" in item) {
      secSixHeading.push({ 
        heading: item.heading,
        subheading: item.subheading
      });
    } else if ("image" in item) {
      secSixImgs.push({
        image: item.image,
        body: item.body,
        date: item.date,
        link: item.link
      });
    }
  });
  const sectionSixData = {
    headings: secSixHeading,
    images: secSixImgs,
  };

  
  // --------------- Section 7 : As Featured In
  const sectionSevenData = homePage.homeS7AsFeaturedIn;

  return (
    <>
      {/* <SEO pageTitle={"Home"} pageDescription={"We are not your typical software company—we are a deep tech pioneer at the forefront of innovation."} /> */}
      <HomeComponent 
        homeGlobalAssets={homeGlobalAssets}
        secOneData={secOneData}
        secTwoData={secTwoData}
        sectionThreeData={sectionThreeData}
        sectionFourData={sectionFourData}
        secFiveData={secFiveData}
        sectionSixData={sectionSixData}
        sectionSevenData={sectionSevenData}
        // filteredPageContent={typedFilteredPageContent}  // Now this is a valid [string, ...string[]]
      />
    </>
  );
}
