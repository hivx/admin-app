import { HtmlEditorWithLabel } from '@/components/Editor/HtmlEditorWithLabel';
import { useCurrentOrderID } from '@/features/order';
import { useAppDispatch, useAppSelector, useTranslate } from '@/hooks';
import { useRadiologyEditorContent } from '@/hooks/radiology/useRadiologyEditorContent';
import {
  selectCurrentRequestID,
  selectRadiologyReportDescription,
  selectRadiologyReportFindings,
  selectRadiologyReportIsEditable,
  setRadiologyReportSubmissionData,
} from '@/stores/OrderRadiology';

export const DescriptionEditor = () => {
  const dispatch = useAppDispatch();
  const translate = useTranslate();
  const orderID = useCurrentOrderID();
  const requestID = useAppSelector(selectCurrentRequestID(orderID));
  const description =
    useAppSelector(selectRadiologyReportDescription({ orderID, requestID })) ?? undefined;
  const isEditable = useAppSelector(selectRadiologyReportIsEditable(orderID));

  const { getContentDisplay } = useRadiologyEditorContent(orderID);

  const handleChange = (newDescription: string) => {
    dispatch(
      setRadiologyReportSubmissionData({
        orderID,
        requestID,
        description: newDescription,
      }),
    );
  };
  return (
    <HtmlEditorWithLabel
      key={requestID}
      height="50px"
      label={translate.resources.report.description()}
      value={description}
      onEditorChange={handleChange}
      toolbar={false}
      disabled={!isEditable}
    />
  );
};
