import { IconButton, ImageList, ImageListItem, ImageListItemBar } from '@mui/material';
import { prisma } from 'src/app/lib/prisma';
import Iconify from 'src/components/iconify';
import MemePagination from './MemePagination';

type Props = {
  page: number;
};

const MemesList = async ({ page }: Props) => {
  console.log(page);
  const memes = await prisma.meme.findMany({
    skip: page * 3 - 3 ?? 0,
    take: 3,
    include: { createdBy: true },
  });
  const total = await prisma.meme.count();

  if (!memes.length) {
    return <div>No memes found</div>;
  }

  return (
    <div>
      <ImageList variant="masonry" cols={5} gap={8}>
        {memes.map((item) => (
          <ImageListItem key={item.id}>
            <img
              style={{
                borderRadius: '0.5rem',
              }}
              srcSet={`${item.url}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
              src={`${item.url}?w=164&h=164&fit=crop&auto=format`}
              alt={item.caption ?? 'Meme'}
              loading="lazy"
            />
            <ImageListItemBar
              title={item.createdBy?.firstName ?? 'No name'}
              subtitle={item.prompt}
              actionIcon={
                <IconButton sx={{ color: 'rgba(255, 255, 255, 0.54)' }}>
                  <Iconify icon="mdi:heart" />
                </IconButton>
              }
            />
          </ImageListItem>
        ))}
      </ImageList>
      <MemePagination total={total} />
    </div>
  );
};

export default MemesList;
