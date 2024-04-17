import { useCallback, useRef } from 'react';

import { uuidv4 } from '@/utils/uuidv4';

import { MediaData } from './useMediaRadiology';
import { OpenChooseImageButtonProps } from './useUploadImages';

export const useUploadMedia = (arg: OpenChooseImageButtonProps) => {
  const { handleUploadNonDicom, setUploadFile } = arg;

  const inputVideoRef = useRef<HTMLInputElement>(null);
  const inputImageRef = useRef<HTMLInputElement>(null);

  /**
   * Open list file available upload
   */
  const handleOpenChooseFile = useCallback(() => {
    inputVideoRef && inputVideoRef.current && inputVideoRef.current.click();
  }, [inputVideoRef]);

  const handleUpload = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    const imageFileList = new FileList();
    const videoFileList = new FileList();

    /**
     * Forearch image list
     */
    if (fileList && fileList.length > 0) {
      for (let i = 0; i < fileList.length; i++) {
        if (fileList[i].type.includes('video')) {
          videoFileList[i] = fileList[i];
        } else {
          imageFileList[i] = fileList[i];
        }
        // console.log('fileList[i].type', fileList[i].type);
      }
    }
  }, []);

  // up video => get thumbnail to display
  const handleUpVideo = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const fileList = event.target.files;
      const imageListData: MediaData[] = [];

      if (fileList && fileList.length > 0) {
        for (let i = 0; i < fileList.length; i++) {
          const video = document.createElement('video');
          const fileReader = new FileReader();
          const file = fileList[i];
          fileReader.onload = () => {
            const blob = new Blob(fileReader.result ? [fileReader.result] : [], {
              type: file.type,
            });
            const url = URL.createObjectURL(blob);
            const timeupdate = async () => {
              if (await snapImage()) {
                video.removeEventListener('timeupdate', timeupdate);
                video.pause();
              }
            };
            video.addEventListener('loadeddata', async () => {
              if (await snapImage()) {
                video.removeEventListener('timeupdate', timeupdate);
              }
            });
            const snapImage = async () => {
              const canvas = document.createElement('canvas');
              canvas.width = video.videoWidth;
              canvas.height = video.videoHeight;
              const ctx = canvas.getContext('2d');
              if (ctx) {
                ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                const videoCover: Blob = await new Promise((resolve) => {
                  ctx.canvas.toBlob(
                    (blob) => {
                      blob && resolve(blob);
                    },
                    'image/jpeg',
                    1,
                  );
                });
                const success = canvas.toDataURL().length > 100000;
                if (success) {
                  /**
                   * Create obj type MediaData
                   */
                  const imageData: MediaData = {
                    id: uuidv4(),
                    previewImage: videoCover,
                    uploadValue: file,
                  };
                  imageListData.push(imageData);
                }
                return success;
              }
            };
            video.addEventListener('timeupdate', timeupdate);
            video.preload = 'metadata';
            video.src = url;
            // Load video in Safari / IE11
            video.muted = true;
            video.playsInline = true;
            video.play();
          };
          fileReader.readAsArrayBuffer(file);
          setUploadFile((preMediaData) => [...imageListData, ...preMediaData]);
          handleUploadNonDicom([file]);
        }
      }
    },
    [handleUploadNonDicom, setUploadFile],
  );

  const handleUpImage = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const fileList = event.target.files;
      /**
       * Create array temp type Media[]
       */
      const imageListData: MediaData[] = [];
      /**
       * Forearch image list
       */
      if (fileList && fileList.length > 0) {
        for (let i = 0; i < fileList.length; i++) {
          /**
           * Create obj type MediaData
           */
          const imageData: MediaData = {
            id: uuidv4(),
            previewImage: fileList[i],
            uploadValue: fileList[i],
          };
          /**
           * Push obj(imageData) to array(imageListData)
           */
          imageListData.push(imageData);
        }
      }
      /**
       * Files using POST to API
       */
      const filesUpload = imageListData.map((data) => data.uploadValue);
      /**
       * If true, after upload images from user's computer will call  API uploadNonDicom
       */
      // handleUploadNonDicom(filesUpload);
      setUploadFile((preImageData) => [...imageListData, ...preImageData]);
    },
    [handleUploadNonDicom, setUploadFile],
  );

  return {
    inputVideoRef,
    inputImageRef,
    handleOpenChooseFile,
    handleUpload,
  };
};
