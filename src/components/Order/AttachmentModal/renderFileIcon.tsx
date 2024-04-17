import AttachFileIcon from '@mui/icons-material/AttachFile';
import AudioFileIcon from '@mui/icons-material/AudioFile';
import ImageIcon from '@mui/icons-material/Image';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import VideoFileIcon from '@mui/icons-material/VideoFile';

import { FILE_TYPE, getFileType } from '@/utils/fileUtils';

export const renderFileIcon = (contentType: string) => {
  const fileType = getFileType(contentType);
  switch (fileType) {
    case FILE_TYPE.AUDIO: {
      return <AudioFileIcon color="action" />;
    }
    case FILE_TYPE.PDF: {
      return <PictureAsPdfIcon color="action" />;
    }
    case FILE_TYPE.VIDEO: {
      return <VideoFileIcon color="action" />;
    }
    case FILE_TYPE.IMAGE: {
      return <ImageIcon color="action" />;
    }
    case FILE_TYPE.OTHER: {
      return <AttachFileIcon color="action" />;
    }
    default: {
      return <AttachFileIcon color="action" />;
    }
  }
};
