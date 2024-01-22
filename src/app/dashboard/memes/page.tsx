import MemesList from './components/MemesList';

const MemesPage = ({ searchParams }: { searchParams: Record<string, string> }) => (
  <main>
    <MemesList page={Number(searchParams.page) || 1} />
  </main>
);

export default MemesPage;
