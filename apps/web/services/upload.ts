import axios from 'axios';

import { IMAGE_BB_API_KEY } from '../constants';

export const uploadToImageBB = async (imageFile: File): Promise<string> => {
  const data = new FormData();
  data.append('image', imageFile);
  data.append('key', IMAGE_BB_API_KEY);

  const config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://api.imgbb.com/1/upload',
    headers: {
      'content-type': 'multipart/form-data',
    },
    data: data,
  };

  try {
    const response = await axios.request(config);
    return response.data.data.url;
  } catch (_error) {
    throw new Error('Image upload failed');
  }
};
