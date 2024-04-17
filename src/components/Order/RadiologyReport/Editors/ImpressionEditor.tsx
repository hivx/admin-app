import React from 'react';

import { HtmlEditorWithLabel } from '@/components/Editor/HtmlEditorWithLabel';
import { useCurrentOrderID } from '@/features/order';
import { useAppDispatch, useAppSelector, useTranslate } from '@/hooks';
import { useRadiologyEditorContent } from '@/hooks/radiology/useRadiologyEditorContent';
import {
  selectCurrentRequestID,
  selectRadiologyReportImpression,
  selectRadiologyReportIsEditable,
  setRadiologyReportSubmissionData,
} from '@/stores/OrderRadiology';

export const ImpressionEditor = () => {
  const dispatch = useAppDispatch();
  const translate = useTranslate();
  const orderID = useCurrentOrderID();
  const requestID = useAppSelector(selectCurrentRequestID(orderID));
  const impression =
    useAppSelector(selectRadiologyReportImpression({ orderID, requestID })) ?? undefined;
  const isEditable = useAppSelector(selectRadiologyReportIsEditable(orderID));
  const { getContentDisplay } = useRadiologyEditorContent(orderID);

  const handleChange = (newImpression: string) => {
    dispatch(
      setRadiologyReportSubmissionData({ orderID, requestID, impression: newImpression }),
    );
  };
  return (
    <HtmlEditorWithLabel
      key={requestID}
      height="100%"
      label={translate.resources.report.impression()}
      value={impression}
      onEditorChange={handleChange}
      toolbar={false}
      disabled={!isEditable}
    />
  );
};
