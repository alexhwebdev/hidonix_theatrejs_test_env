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