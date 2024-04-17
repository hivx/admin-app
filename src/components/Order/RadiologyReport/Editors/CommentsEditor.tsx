import React from 'react';
import { Editor } from 'tinymce';

import { HtmlEditorWithLabel } from '@/components/Editor/HtmlEditorWithLabel';
import { useCurrentOrderID } from '@/features/order';
import { useAppDispatch, useAppSelector, useTranslate } from '@/hooks';
import { useRadiologyEditorContent } from '@/hooks/radiology/useRadiologyEditorContent';
import {
  selectCurrentRequestID,
  selectRadiologyReportComments,
  selectRadiologyReportIsEditable,
  setRadiologyReportSubmissionData,
} from '@/stores/OrderRadiology';

export const CommentsEditor = () => {
  const dispatch = useAppDispatch();
  const orderID = useCurrentOrderID();
  const translate = useTranslate();
  const requestID = useAppSelector(selectCurrentRequestID(orderID));
  const comments =
    useAppSelector(selectRadiologyReportComments({ orderID, requestID })) ?? undefined;
  const isEditable = useAppSelector(selectRadiologyReportIsEditable(orderID));

  const { getContentDisplay } = useRadiologyEditorContent(orderID);

  const handleChange = (_: string, editor: Editor) => {
    const newComments = editor.getContent({ format: 'text' });
    dispatch(
      setRadiologyReportSubmissionData({ orderID, requestID, comments: newComments }),
    );
  };

  return (
    <HtmlEditorWithLabel
      key={requestID}
      height="100%"
      label={translate.resources.report.comments()}
      value={comments}
      onEditorChange={handleChange}
      toolbar={false}
      disabled={!isEditable}
    />
  );
};
