// test if the image is an data url
export const isDataURI = (image: string): boolean => {
  return image.startsWith('data:');
};

export const loadImage = async (imagePath: string): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    fetch(imagePath)
      .then((res) => res.blob())
      .then((blob) => resolve(blob))
      .catch((e) => reject(e));
  });
};
