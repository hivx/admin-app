import { useCallback, useRef, useState } from 'react';
import { FieldPath, UseFormSetValue } from 'react-hook-form';

import {
  base64Coded,
  base64toURI,
  convertFileToBase64,
} from '@/lib/dataHelper/base64FileHelper';

import { UserFormFields } from '../components/User/UserFormFields';

type useUserFormUploadImageProps = {
  name: FieldPath<UserFormFields>;
  image: string;
  setValue: UseFormSetValue<UserFormFields>;
};

export const useUserFormUploadImage = (props: useUserFormUploadImageProps) => {
  const { name, image, setValue } = props;
  const inputImageRef = useRef<HTMLInputElement>(null);
  const [imageSrcTaken, setImageSrcTaken] = useState<string>(base64toURI(image));

  const onSelectImage = () => {
    inputImageRef && inputImageRef.current && inputImageRef.current.click();
  };

  const handleUpImage = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files;
      if (files) {
        const imageBase64URI = await convertFileToBase64(files[0]);
        setValue(name, base64Coded(imageBase64URI));
        setImageSrcTaken(imageBase64URI);
      }
    },
    [name, setValue],
  );

  const handleDeleteImage = useCallback(() => {
    setImageSrcTaken('');
    setValue(name, '');
  }, [name, setValue]);

  return {
    inputImageRef,
    onSelectImage,
    handleUpImage,
    handleDeleteImage,
    imageSrcTaken,
  };
};
