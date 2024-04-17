import { base64toURI, detectMimeTypeBase64 } from '@/lib/dataHelper/base64FileHelper';

export const MAX_FILE_SIZE_PREVIEW = 5242880; // max file size can preview is 5MB in bytes
export const MAX_FILE_SIZE_MB = 100; // max file size can be upload in MB for showing message
export const MAX_FILE_SIZE = MAX_FILE_SIZE_MB * 1024 * 1024; // max file size can be upload is 100 MB in bytes: 104857600

export const FILE_TYPE = {
  IMAGE: 'IMAGE',
  VIDEO: 'VIDEO',
  AUDIO: 'AUDIO',
  PDF: 'PDF',
  DOC: 'DOC',
  DOCX: 'DOCX',
  OTHER: 'OTHER',
};

const listFileTypePreview = [
  FILE_TYPE.IMAGE,
  FILE_TYPE.VIDEO,
  FILE_TYPE.AUDIO,
  FILE_TYPE.PDF,
  FILE_TYPE.DOCX,
];

export const getFileSizeMB = (size?: number | null, decimal = 3) => {
  // convert file size from bytes => MB
  if (!size) {
    return 0;
  }
  return (size / 1048576).toFixed(decimal);
};

export const getFileSizeMBText = (size?: number | null) => {
  return `${getFileSizeMB(size)} MB`;
};

export const getFileType = (contentType: string) => {
  const prefixType = contentType.split('/')[0]; // to get the type of file: image/audio/video/...
  switch (contentType) {
    // check specific application beside audio, image, video
    case 'application/pdf': {
      return FILE_TYPE.PDF;
    }
    case 'application/msword': {
      return FILE_TYPE.DOC;
    }
    case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document': {
      return FILE_TYPE.DOCX;
    }
  }
  switch (prefixType) {
    case 'image': {
      return FILE_TYPE.IMAGE;
    }
    case 'video': {
      return FILE_TYPE.VIDEO;
    }
    case 'audio': {
      return FILE_TYPE.AUDIO;
    }
    default: {
      return FILE_TYPE.OTHER;
    }
  }
};

export const checkFileCanPreview = (size: number, contentType: string) => {
  // to check if a file can preview or need to download to view the file
  const fileType = getFileType(contentType);
  return size <= MAX_FILE_SIZE_PREVIEW && listFileTypePreview.includes(fileType);
};

export const validateMaxSizeFile = (files: FileList | null, maxSize = MAX_FILE_SIZE) => {
  // check if a file is exceed the max size or not
  if (!files) {
    return false;
  }
  for (const file of files) {
    if (file.size > maxSize) {
      return false;
    }
  }
  return true;
};

export const downloadFileFromBlob = (blobData: Blob, fileName: string) => {
  // download file from blob
  const url = URL.createObjectURL(blobData);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

export const urltoFile = async (dataUrl: string, filename: string) => {
  const mimeType = detectMimeTypeBase64(dataUrl);
  const res: Response = await fetch(base64toURI(dataUrl));
  const blob: Blob = await res.blob();
  const file = new File([blob], filename, { type: mimeType });
  return file;
};
