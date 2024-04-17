import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useGetOneDicomMutation } from '@/api/study';
import { downloadFileFromBlob } from '@/utils/fileUtils';
import { uuidv4 } from '@/utils/uuidv4';

export const DownloadDicomMain = () => {
  const { studyID } = useParams();
  const urlParams = new URLSearchParams(window.location.search);
  const fileName = urlParams.get('fileName');
  const [triggerGetOneDicom, { data }] = useGetOneDicomMutation();
  const handleDownloadDicomImage = async () => {
    try {
      const res = await triggerGetOneDicom({
        studyID: Number(studyID) ?? 0,
      }).unwrap();
      if (res) {
        downloadFileFromBlob(res, `${fileName ? fileName : uuidv4()}.zip`);
        /**
         * Hiện tại chưa tìm ra phương án để đóng tab sau khi download file
         * tạm thời xử lý bằng cách đóng sau 3000ms
         */
        setTimeout(() => {
          window.close();
        }, 3000);
      }
    } catch (e) {
      undefined;
    }
  };
  useEffect(() => {
    if (!data) {
      handleDownloadDicomImage();
    }
  }, [studyID]);
  return <></>;
};
