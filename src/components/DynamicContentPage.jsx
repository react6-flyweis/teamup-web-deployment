import React from 'react';
import { useParams } from 'react-router-dom';
import { useContentPage } from '../hooks/useContentPage';
import ContentPageTemplate from './ContentPageTemplate';

/**
 * Catch-all component for admin-created footer pages.
 * Reads the :slug from the URL and fetches the page content from the API.
 * Example: /page/accessibility → fetches slug "accessibility"
 */
const DynamicContentPage = () => {
  const { slug } = useParams();
  const { data, isLoading, isError } = useContentPage(slug);

  // Normalize response shape — API may return { page: {...} } or { data: {...} }
  const page = data?.page || data?.data || (data?.title ? data : null);

  return (
    <ContentPageTemplate
      page={page}
      isLoading={isLoading}
      isError={isError}
    />
  );
};

export default DynamicContentPage;
