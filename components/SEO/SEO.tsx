import Head from "next/head";

interface ISeoProps {
  pageTitle: string;
  pageDescription: string;
} 

const SEO = (
  { pageTitle, 
    // pageDescription 
  }: ISeoProps
) => (
  <Head>
    <title>{pageTitle}</title>
    <meta name="robots" content="all" />
    <meta name="googlebot" content="noindex,nofollow" />
  </Head>
);

export default SEO;