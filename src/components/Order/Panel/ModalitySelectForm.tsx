import { zodResolver } from '@hookform/resolvers/zod';
import { MenuItem } from '@mui/material';
import { FC, useCallback, useEffect } from 'react';
import { UseFormProps } from 'react-hook-form';
import { z } from 'zod';

import {
  useGetListModalityQuery,
  useGetOneModalityQuery,
  useLazyGetListModalityQuery,
} from '@/api/modality';
import { useGetOneOrderQuery } from '@/api/order';
import { useGetOneOrderRequestQuery } from '@/api/orderRequest';
import { MyFormSelectField } from '@/components/Elements/Inputs/MyFormSelectField';
import { MyLazyFormSelectField } from '@/components/Elements/Inputs/MyLazyFormSelectField';
import { MyFormGroupUnstyled } from '@/components/Form';
import { selectSessionRadiologyConfig, useCurrentOrderID } from '@/features/order';
import { useAppDispatch, useAppSelector, useTranslate } from '@/hooks';
import {
  selectCurrentRequestID,
  selectRadiologyReportIsEditable,
  setRadiologyReportSubmissionData,
} from '@/stores/OrderRadiology';
import { IModalityDTO, IOrderDTO, IOrderRequestDTO } from '@/types/dto';

// import { RadiologyCustomSelectFieldsWrapper } from '../../../Layout/RadiologyCustomSelectFieldsWrapper';

type ModalitySelectFormType = {
  modalityID: number;
};

type ModalitySelectFormProps = {
  order?: IOrderDTO;
  request?: IOrderRequestDTO;
  disabledValue?: string;
  execModalityID?: number;
};

export const ConnectedRadiologyModalitySelectForm = () => {
  const orderID = useCurrentOrderID();
  const requestID = useAppSelector(selectCurrentRequestID(orderID));
  const dispatch = useAppDispatch();
  const sessionRadiologyData = useAppSelector(selectSessionRadiologyConfig);
  const { data: order } = useGetOneOrderQuery({ id: orderID });
  const { data: request } = useGetOneOrderRequestQuery({ orderID, requestID });

  const { data: modalityFromConfig } = useGetOneModalityQuery(
    { id: sessionRadiologyData.modalityID ?? 0 },
    { skip: !sessionRadiologyData.modalityID },
  );
  // loạy máy chụp của máy lưu trong config, giống loại máy chụp của request
  const isSameModalityType = modalityFromConfig?.modalityType === order?.modalityType;

  const execModalityID = isSameModalityType
    ? sessionRadiologyData.modalityID
    : request?.modality?.id;

  const disabledValue = isSameModalityType
    ? getModalitynameString(modalityFromConfig)
    : getModalitynameString(request?.modality ?? undefined);

  /**
   * Set default approveModalityID
   */
  useEffect(() => {
    dispatch(
      setRadiologyReportSubmissionData({
        orderID,
        requestID,
        approvedModalityID: isSameModalityType
          ? modalityFromConfig?.id
          : request?.modality?.id,
      }),
    );
  }, [
    dispatch,
    isSameModalityType,
    modalityFromConfig?.id,
    orderID,
    request?.modality?.id,
    requestID,
  ]);

  return (
    <ModalitySelectForm
      disabledValue={disabledValue ?? undefined}
      execModalityID={execModalityID}
      order={order}
      request={request}
      key={execModalityID}
    />
  );
};
/**
 * Component chọn Máy thực hiện
 * (API chưa hỗ trợ nên tạm thời chưa hiển thị background color như mockup)
 */
const ModalitySelectForm: FC<ModalitySelectFormProps> = ({
  disabledValue,
  execModalityID,
  order,
  request,
}) => {
  const orderID = useCurrentOrderID();
  const translate = useTranslate();
  const [trigger] = useLazyGetListModalityQuery();
  const dispatch = useAppDispatch();
  const isEditable = useAppSelector(selectRadiologyReportIsEditable(orderID));

  const { data: modalityData } = useGetListModalityQuery(
    {
      filter: {
        modalityTypes: order?.modalityType ? [order.modalityType] : [],
        insuranceApplied: order?.insuranceApplied ?? undefined,
      },
    },
    { skip: !order?.modalityType },
  );

  /**
   * func get list modality by modality type
   */
  const getModalityListByType = async () => {
    return (
      (
        await trigger(
          {
            filter: {
              modalityTypes: order?.modalityType ? [order.modalityType] : [],
              insuranceApplied: order?.insuranceApplied ?? undefined,
            },
          },
          true,
        )
      ).data?.list ?? []
    );
  };

  const formOptions: UseFormProps<ModalitySelectFormType> = {
    mode: 'onChange',
    criteriaMode: 'all',
    // form validation and pre-processing
    resolver: zodResolver(
      z.object({
        modalityID: z.number(),
      }),
    ),
    defaultValues: {
      modalityID: execModalityID,
    },
  };

  /**
   * update modalityID for request
   */
  const handleSubmit = useCallback(
    async (formData: ModalitySelectFormType) => {
      if (order?.id && request?.id) {
        dispatch(
          setRadiologyReportSubmissionData({
            orderID: order?.id,
            requestID: request?.id,
            approvedModalityID: formData.modalityID,
          }),
        );
      }
    },
    [dispatch, order?.id, request?.id],
  );

  return (
    <MyFormGroupUnstyled
      autoSubmit
      onSubmit={handleSubmit}
      submitOnEnter
      formOptions={formOptions}
      renderInputs={({ control, getValues }) => {
        const modalities = modalityData?.list ?? [];
        const currentModalityID = getValues('modalityID');
        const modality = currentModalityID
          ? modalities.find((item) => item.id === currentModalityID)
          : undefined;

        return (
          <>
            <MyLazyFormSelectField
              name="modalityID"
              control={control}
              required
              MySelectProps={{
                label: translate.resources.order.actionModality(),
                disabled: !isEditable,
                fullWidth: true,
                error:
                  modality?.insurance && modality?.capability
                    ? modality?.insurance >= modality?.capability
                    : false,
              }}
              disableValue={getModalitynameString(modality) ?? ''}
              onGetListRecord={getModalityListByType}
              renderSelectField={({
                listData: modalityTypeList,
                formSelectFieldProps,
              }) => (
                <MyFormSelectField {...formSelectFieldProps}>
                  {modalityTypeList.map((item) => (
                    <MenuItem key={item.id} value={item?.id || 0}>
                      {getModalitynameString(item)}
                    </MenuItem>
                  ))}
                </MyFormSelectField>
              )}
            />
          </>
        );
      }}
    />
  );
};

export const getModalitynameString = (modality?: IModalityDTO) =>
  modality
    ? `${modality?.name} (${modality?.insurance ?? 0}/${modality?.capability ?? 0})`
    : '';
