import { Stack, styled } from '@mui/material';
import { FC } from 'react';
import { Control, UseFormWatch } from 'react-hook-form';

import { MyFormTextField, MyTextField } from '@/components';
import { IFormControlInputProps } from '@/components/Form';
import { MyFormDateTimePicker } from '@/components/Form/MyFormDateTimePicker';
import { useTranslate } from '@/hooks';
import { getDisplayProcedureName } from '@/lib/dataHelper/order/getDisplayProcedureName';
import { BaseEntity } from '@/types';
import {
  ICloudUserDTO,
  IOrderDTO,
  IOrderRequestDTO,
  IOrderRequestDTOCreate,
  IProcedureDTO,
} from '@/types/dto';

import {
  StyledInfoFieldTwoOfChildrenColumn,
  StyledInfoFormFieldsMain,
} from '../StyledStudyInfo';

import { ExaminationConsumablesTable } from './ExaminationConsumablesTable';
import { ExpectedTimeButton } from './ExpectedTimeButton';
import { OperatorAutoCompleteField } from './OperatorAutoCompleteField';
import { RequestApproverSelectField } from './RequestApproverSelectField';
import { RequestFormFieldButton } from './RequestFormFieldButton';
import { RequestModalitySelectField } from './RequestModalitySelectField';
import { RequestOperatorSelectField } from './RequestOperatorSelectField';

export type RequestFormFields = IOrderRequestDTOCreate & {
  operators?: ICloudUserDTO[];
  finalApprover?: ICloudUserDTO;
  expectedReporter?: ICloudUserDTO;
};

export type RequestFieldCommonProps = {
  control: Control<RequestFormFields>;
  watch: UseFormWatch<RequestFormFields>;
  disabled?: boolean;
};

type RequestFormFieldsProps = IFormControlInputProps<RequestFormFields> & {
  procedure: IProcedureDTO | null;
  isEdit?: boolean;
  /**
   * Với request của order từ HIS , cần disabled 1 số trường. Không cho chỉnh sửa
   */
  disabledWithOrderFromHIS?: boolean;
  onDelete: () => void;
  request?: IOrderRequestDTO;
  order?: IOrderDTO;
  requestID?: BaseEntity['id'];
};

export type OrderRequestFormType = IOrderRequestDTOCreate & {
  operators?: ICloudUserDTO[];
  expectedReporter?: ICloudUserDTO;
  finalApprover?: ICloudUserDTO;
};

export const RequestFormFields: FC<RequestFormFieldsProps> = (props) => {
  const {
    control,
    watch,
    procedure,
    submit,
    disabledWithOrderFromHIS = false,
    onDelete,
    setValue,
    request,
    order,
    requestID,
  } = props;
  const translate = useTranslate();
  const isRequestFormFieldDisabled = !procedure || !!request?.finalReportID;

  return (
    <Stack height="100%" justifyContent="space-between">
      <StyledRequestFormFieldWrapper>
        <StyledInfoFormFieldsMain>
          {/* {isEdit ? (
        <EditRequestProcedureSelectField
          name="procedureID"
          control={control}
          modalityType={procedure?.modalityType ?? ''}
          disabled={disabledWithOrderFromHIS}
        />
      ) : ( */}
          <MyTextField
            label={translate.resources.procedure.title()}
            placeholder={translate.resources.procedure.title()}
            fullWidth={true}
            size="extrasmall"
            value={getDisplayProcedureName(
              order?.insuranceApplied ?? false,
              procedure?.name ?? '',
            )}
            required
            disabled
          />
          {/* )} */}
          <StyledInfoFieldTwoOfChildrenColumn>
            <MyFormTextField
              name="requestedNumber"
              control={control}
              MyTextFieldProps={{
                label: translate.studyInfo.requestNumber(),
                placeholder: translate.studyInfo.requestNumber(),
                fullWidth: true,
                size: 'extrasmall',
                required: true,
                disabled: disabledWithOrderFromHIS || isRequestFormFieldDisabled,
              }}
            />
            <MyFormTextField
              name="icdCode"
              control={control}
              MyTextFieldProps={{
                label: translate.resources.order.icdCode(),
                placeholder: translate.resources.order.icdCode(),
                fullWidth: true,
                size: 'extrasmall',
                disabled: disabledWithOrderFromHIS || isRequestFormFieldDisabled,
              }}
            />
          </StyledInfoFieldTwoOfChildrenColumn>
          <StyledInfoFieldTwoOfChildrenColumn>
            <RequestModalitySelectField
              control={control}
              disabled={isRequestFormFieldDisabled}
              watch={watch}
              modalityType={procedure?.modalityType ?? null}
            />
            <MyFormDateTimePicker
              name="requestedTime"
              type="dateTime"
              watch={watch}
              control={control}
              disabled
              label={translate.resources.order.request.requestedTime()}
              customSize="extrasmall"
            />
          </StyledInfoFieldTwoOfChildrenColumn>

          <StyledInfoFieldTwoOfChildrenColumn>
            <RequestOperatorSelectField
              control={control}
              disabled={isRequestFormFieldDisabled}
              watch={watch}
            />
            <MyFormDateTimePicker
              name="operationTime"
              type="dateTime"
              TextFieldProps={{ required: true }}
              watch={watch}
              control={control}
              disabled={isRequestFormFieldDisabled}
              label={translate.resources.order.request.operationTime()}
              customSize="extrasmall"
            />
          </StyledInfoFieldTwoOfChildrenColumn>
          <StyledInfoFieldTwoOfChildrenColumn>
            <RequestApproverSelectField
              control={control}
              disabled={isRequestFormFieldDisabled}
              watch={watch}
            />
            <MyFormDateTimePicker
              name="finalApprovedTime"
              type="dateTime"
              watch={watch}
              control={control}
              disabled={isRequestFormFieldDisabled}
              label={translate.resources.order.approvedTime()}
              customSize="extrasmall"
            />
          </StyledInfoFieldTwoOfChildrenColumn>
          <OperatorAutoCompleteField
            control={control}
            disabled={isRequestFormFieldDisabled}
            watch={watch}
          />
          <ExaminationConsumablesTable
            setValue={setValue}
            watch={watch}
            disabled={isRequestFormFieldDisabled}
            modalityType={procedure?.modalityType ?? null}
            request={request}
          />
        </StyledInfoFormFieldsMain>
      </StyledRequestFormFieldWrapper>
      <RequestFormFieldButton
        orderID={order?.id}
        requestID={requestID}
        onSubmit={submit}
        control={control}
        onDelete={onDelete}
        hideActionButton={isRequestFormFieldDisabled}
        modalityType={procedure?.modalityType ?? null}
        ExpectedTimeButton={
          procedure?.modalityType ? (
            <ExpectedTimeButton
              modalitypeType={procedure.modalityType}
              setValue={setValue}
              control={control}
            />
          ) : (
            <></>
          )
        }
      />
    </Stack>
  );
};

const StyledRequestFormFieldWrapper = styled('div')`
  display: grid;
`;
