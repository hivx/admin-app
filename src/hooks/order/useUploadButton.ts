import { useCallback, useRef } from 'react';

export const useUploadButton = () => {
  // hook for create ref to use Button with input upload file
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClickUpload = useCallback(() => {
    inputRef && inputRef.current && inputRef.current.click();
  }, [inputRef]);

  return {
    inputRef,
    handleClickUpload,
  };
};
