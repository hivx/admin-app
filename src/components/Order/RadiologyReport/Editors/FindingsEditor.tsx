import { HtmlEditorWithLabel } from '@/components/Editor/HtmlEditorWithLabel';
import { useCurrentOrderID } from '@/features/order';
import { useAppDispatch, useAppSelector, useTranslate } from '@/hooks';
import { useRadiologyEditorContent } from '@/hooks/radiology/useRadiologyEditorContent';
import {
  selectCurrentRequestID,
  selectRadiologyReportFindings,
  selectRadiologyReportIsEditable,
  setRadiologyReportSubmissionData,
} from '@/stores/OrderRadiology';

export const FindingsEditor = () => {
  const dispatch = useAppDispatch();
  const translate = useTranslate();
  const orderID = useCurrentOrderID();
  const requestID = useAppSelector(selectCurrentRequestID(orderID));
  const findings =
    useAppSelector(selectRadiologyReportFindings({ orderID, requestID })) ?? undefined;
  const isEditable = useAppSelector(selectRadiologyReportIsEditable(orderID));

  const { getContentDisplay } = useRadiologyEditorContent(orderID);

  const handleChange = (newFindings: string) => {
    dispatch(
      setRadiologyReportSubmissionData({ orderID, requestID, findings: newFindings }),
    );
  };
  return (
    <HtmlEditorWithLabel
      key={requestID}
      height="100%"
      label={translate.resources.report.findings()}
      value={findings}
      onEditorChange={handleChange}
      disabled={!isEditable}
    />
  );
};
