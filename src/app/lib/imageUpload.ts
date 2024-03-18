import { supabase } from 'src/utils/db';

const uploadImage = async (name: string, combinedImageBuffer: any) => {
  const filename = `${name}-${Date.now()}.png`;
  const fileBody = Buffer.from(combinedImageBuffer);
  const { data, error } = await supabase.storage.from('images').upload(filename, fileBody, {
    cacheControl: '3600',
    contentType: 'image/png',
    upsert: false,
  });

  return {
    data,
    error,
  };
};

export { uploadImage };
