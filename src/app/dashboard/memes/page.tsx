import React from 'react';

import MemesList from './components/MemesList';

type Props = {};

const MemesPage = ({ searchParams }: { searchParams: Record<string, string> }) => {
  console.log(searchParams);
  return (
    <main>
      <MemesList page={Number(searchParams.page) || 1} />
    </main>
  );
};

export default MemesPage;
