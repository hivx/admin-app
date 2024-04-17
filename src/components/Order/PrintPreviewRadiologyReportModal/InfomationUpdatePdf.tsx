import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Stack, Typography } from '@mui/material';
import { FC, useState } from 'react';
import { Controller, UseFormProps } from 'react-hook-form';
import { z } from 'zod';

import { MyCheckbox, MyFormTextField } from '@/components';
import { MyFormGroupUnstyled } from '@/components/Form';
import { MyFormDateTimePicker } from '@/components/Form/MyFormDateTimePicker';
import { useTranslate } from '@/hooks';
import { InformationPrintFormData } from '@/hooks/printRadiologyReport/usePrintReportButton';
import { useSlowPrintRadiologyReport } from '@/hooks/printRadiologyReport/useSlowPrintRadiologyReport';
import { ImageDataState, useSelectDicomImage } from '@/hooks/useSelectDicomImage';
import { IOrderDTO, IOrderRequestDTO } from '@/types/dto';
import { mapNullOrEmptyStringToUndefined } from '@/utils/format';

import { GenderCheckbox } from './GenderCheckbox';
import ListImagePrintRadiologyReportModal from './ListImagePrintRadiologyReportModal';
import { RequestProcedureSelectField } from './RequestProcedureSelectField';
import SelectTemplateField from './SelectTemplateField';

export type InfomationUpdatePdfProps = {
  onPrintFieldsChange: (
    formData: InformationPrintFormData,
    selectedImages?: ImageDataState[],
  ) => void;
  selectDicomImage: ReturnType<typeof useSelectDicomImage>;
  currentTemplate: ReturnType<typeof useSlowPrintRadiologyReport>['currentTemplate'];
  order?: IOrderDTO;
  request?: IOrderRequestDTO;
};

export const InfomationUpdatePdf: FC<InfomationUpdatePdfProps> = (props) => {
  const { onPrintFieldsChange, selectDicomImage, currentTemplate, order, request } =
    props;
  const [formFieldsData, setFormFieldsData] = useState<InformationPrintFormData>({
    lineHeight: 1.2,
    fontSize: 12,
  });
  const translate = useTranslate();
  const [selectedImages, setSelectedImages] = useState<ImageDataState[]>();
  /**
   * Form data
   */
  const formOptions: UseFormProps<InformationPrintFormData> = {
    mode: 'onChange',
    criteriaMode: 'all',
    // form validation and pre-processing
    resolver: zodResolver(
      z.object({
        fontSize: z.coerce.string(),
        lineHeight: z.coerce.string(),
        templateID: z.coerce.number(),
        patientName: z.string().optional().transform(mapNullOrEmptyStringToUndefined),
        patientBirthday: z.string().optional(),
        patientGender: z.string().optional(),
        requestedProcedureName: z.string().optional(),
        clinicalDiagnosis: z.string().optional(),
        includeSignature: z.boolean().optional(),
      }),
    ),
    defaultValues: {
      lineHeight: 1.2,
      fontSize: 14,
      templateID: currentTemplate?.id ?? 0,
      patientName: order?.patient?.fullname ?? '',
      patientBirthday: order?.patient?.birthDate ?? '',
      patientGender: order?.patient?.gender ?? 'O',
      requestedProcedureName: request?.procedure?.name ?? undefined,
      clinicalDiagnosis: order?.diagnosis ?? '',
      includeSignature: false,
    },
  };

  const handleSubmit = async (formData: InformationPrintFormData) => {
    onPrintFieldsChange(formData, selectedImages);
    setFormFieldsData(formData);
  };

  /**
   * Condition to show field
   */
  const isShowField = Boolean(currentTemplate?.numOfImages);

  /**
   * Preview button
   */
  // const handlePreview = () => {
  //   onPrintFieldsChange(formFieldsData, selectedImages);
  // };
  return (
    <MyFormGroupUnstyled
      onSubmit={handleSubmit}
      formOptions={formOptions}
      submitOnEnter
      submitDelay={1000}
      autoSubmit
      renderInputs={({ control, onKeyDown, watch }) => (
        <Stack spacing={2} height="100%" width="100%" p={1}>
          <SelectTemplateField name="templateID" control={control} />
          <MyFormTextField
            name="patientName"
            control={control}
            MyTextFieldProps={{
              label: translate.resources.order.patient.fullname.long(),
              onKeyDown,
              size: 'small',
              title: translate.resources.order.patient.fullname.long(),
            }}
          />
          <Stack direction="row">
            <MyFormDateTimePicker
              name="patientBirthday"
              type="date"
              watch={watch}
              control={control}
              label={translate.resources.patient.birthDate()}
            />
            <GenderCheckbox control={control} name="patientGender" watch={watch} />
          </Stack>
          <MyFormTextField
            name="clinicalDiagnosis"
            control={control}
            MyTextFieldProps={{
              label: translate.resources.order.diagnosis.long(),
              placeholder: translate.resources.order.diagnosis.long(),
              fullWidth: true,
              size: 'small',
              multiline: true,
              maxRows: 3,
            }}
          />

          <Box display="flex" alignItems="center">
            <Controller
              name="includeSignature"
              control={control}
              render={({ field: { value, onChange } }) => (
                <MyCheckbox checked={!!value} onChange={onChange} />
              )}
            />
            <Typography>{translate.pages.orderReport.includeSignature()}</Typography>
          </Box>

          {/* <Stack direction="row" spacing={2}>
            <Stack direction="row" spacing={2}>
              <MyFormTextField
                control={control}
                name="fontSize"
                MyTextFieldProps={{
                  label: translate.resources.report.print.updatePdf.fontSize(),
                  placeholder: translate.resources.report.print.updatePdf.fontSize(),
                  fullWidth: true,
                  size: 'small',
                  type: 'number',
                }}
              />
              <MyFormTextField
                control={control}
                name="lineHeight"
                MyTextFieldProps={{
                  label: translate.resources.report.print.updatePdf.lineHeight(),
                  placeholder: translate.resources.report.print.updatePdf.lineHeight(),
                  fullWidth: true,
                  size: 'small',
                  type: 'number',
                }}
              />
            </Stack>
            <StyledPrimaryButton variant="contained" onClick={handlePreview}>
                {translate.buttons.preview()}
              </StyledPrimaryButton>
          </Stack> */}
          <RequestProcedureSelectField
            name="requestedProcedureName"
            control={control}
            modalityType={order?.modalityType ?? undefined}
          />
          <ListImagePrintRadiologyReportModal
            {...selectDicomImage}
            currentTemplate={currentTemplate}
            onSelectImageCallback={(currentSelectedID, selectedImages) => {
              setSelectedImages(selectedImages);
              onPrintFieldsChange(formFieldsData, selectedImages);
            }}
          />
        </Stack>
      )}
    />
  );
};
