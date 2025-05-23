import { executeQuery } from '@datocms/cda-client';
import { gql } from 'graphql-tag';
import { TypedDocumentNode } from '@graphql-typed-document-node/core';
import { IFooterProps, IPageContent } from '@/types/pageContent.types';


export const performRequest = async (
  query: string | undefined,
  options?: Record<string, []> // Optional options
): Promise<IPageContent> => {
  // Check if the query is undefined and throw an error if so
  if (!query) {
    throw new Error('Query cannot be undefined');
  }

  // Ensure token is defined or throw an error
  const token = process.env.NEXT_DATOCMS_API_TOKEN;
  if (!token) {
    throw new Error('NEXT_DATOCMS_API_TOKEN is not defined');
  }

  // Parse the string query into a DocumentNode using gql
  const documentNode: TypedDocumentNode<IPageContent> = gql(query); // Now it's typed

  // Return the response from executeQuery
  return executeQuery(documentNode, {
    ...options,
    token,
    environment: process.env.NEXT_DATOCMS_ENVIRONMENT,
  });
}


export const performFooterRequest = async (
  query: string | undefined,
  options?: Record<string, []> // Optional options
): Promise<IFooterProps> => {
  // Check if the query is undefined and throw an error if so
  if (!query) {
    throw new Error('Query cannot be undefined');
  }

  // Ensure token is defined or throw an error
  const token = process.env.NEXT_DATOCMS_API_TOKEN;
  if (!token) {
    throw new Error('NEXT_DATOCMS_API_TOKEN is not defined');
  }

  // Parse the string query into a DocumentNode using gql
  const documentNode: TypedDocumentNode<IFooterProps> = gql(query); // Now it's typed

  // Return the response from executeQuery
  return executeQuery(documentNode, {
    ...options,
    token,
    environment: process.env.NEXT_DATOCMS_ENVIRONMENT,
  });
}


// export const performRequest = (
//   query, options
// ) => {
//   return executeQuery(query, {
//     ...options,
//     token: process.env.NEXT_DATOCMS_API_TOKEN,
//     environment: process.env.NEXT_DATOCMS_ENVIRONMENT,
//   });
// }


// Used for sitemap generation
// This function fetches all blog slugs for a given locale from DatoCMS
// and returns them as an array of strings.
// It uses GraphQL to query the DatoCMS API and retrieve the slugs.
// The function is asynchronous and returns a promise that resolves to an array of slugs.
// The query is defined using GraphQL syntax and includes a variable for the locale.
// The response is typed to ensure that the data returned matches the expected structure.
// The function is exported for use in other parts of the application.
// This function fetches all blog slugs for a given locale from DatoCMS
// and returns them as an array of strings.


