import { IconButton, ImageList, ImageListItem, ImageListItemBar } from '@mui/material';
import { prisma } from 'src/app/lib/prisma';
import Iconify from 'src/components/iconify';

type Props = {};

const MemesList = async (props: Props) => {
  const memes = await prisma.meme.findMany({ skip: 0, take: 40, include: { createdBy: true } });

  if (!memes.length) {
    return <div>No memes found</div>;
  }

  return (
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
  );
};

export default MemesList;
