import React from 'react';
import { useContentPage } from '../hooks/useContentPage';
import ContentPageTemplate from './ContentPageTemplate';

const Waiver = () => {
  const { data, isLoading, isError } = useContentPage('waiver');
  const page = data?.page || data?.data || (data?.title ? data : null);

  return (
    <ContentPageTemplate
      page={page}
      isLoading={isLoading}
      isError={isError}
    />
  );
};

export default Waiver;
