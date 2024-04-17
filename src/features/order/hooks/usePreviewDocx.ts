import { renderAsync } from 'docx-preview';
import { useState, useEffect, useRef } from 'react';

type UsePreviewDocxProps = {
  fileData?: Blob;
};

export const usePreviewDocx = ({ fileData }: UsePreviewDocxProps) => {
  // use this for render file docx and get status of rendering
  const [renderFinish, setRenderFinish] = useState(false);
  const [renderSuccess, setRenderSuccess] = useState(false);

  /**
   * create docxRef for preview file docx
   * to read file docx,
   * you need to render element first then read data and parse it to the docxRef Element
   */
  const docxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const readFileDocx = async () => {
      const previewDocxEle = docxRef.current;
      if (!previewDocxEle) {
        // if not have div to contain docx preview, not run renderAsync function
        return setRenderFinish(true);
      }
      try {
        // convert blob fileData to html and set this to previewDocxEle
        await renderAsync(fileData, previewDocxEle);
        setRenderSuccess(true);
      } catch (error) {
        undefined;
      } finally {
        setRenderFinish(true);
      }
    };
    if (fileData) {
      readFileDocx();
    }
  }, [fileData]);

  return {
    renderFinish,
    renderSuccess,
    docxRef,
  };
};
