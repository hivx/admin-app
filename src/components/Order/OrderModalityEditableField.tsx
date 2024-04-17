import { MenuItem } from '@mui/material';
import { FC } from 'react';

import { useGetListModalityQuery } from '@/api/modality';
import { useUpdateOrderRequestMutation } from '@/api/orderRequest';
import { MySelect } from '@/components';
import { DynamicEditableField } from '@/components/Form/DynamicEditableField';
import { StyledInlineFormField } from '@/components/Form/StyledInlineFormField';
import { IOrderDTO, IOrderRequestDTO } from '@/types/dto';

import OrderInfoTypography from './Panel/OrderInfoTypography';

type OrderModalityEditableFieldProps = {
  order?: IOrderDTO;
  readonly?: boolean;
  request?: IOrderRequestDTO;
};
export const OrderModalityEditableField: FC<OrderModalityEditableFieldProps> = (
  props,
) => {
  const { order, readonly, request } = props;
  const { data: modality } = useGetListModalityQuery({
    filter: { modalityTypes: order?.modalityType ? [order.modalityType] : [] },
  });
  const modalityList = modality?.list;

  const [updateRequest] = useUpdateOrderRequestMutation();

  const ReadonlyComponent = (
    <OrderInfoTypography>{request?.modality?.name || ''}</OrderInfoTypography>
  );
  if (readonly) return ReadonlyComponent;
  else
    return (
      <DynamicEditableField
        DisplayComponent={ReadonlyComponent}
        EditComponent={
          order ? (
            <StyledInlineFormField $variant="body2">
              <MySelect value={request?.modality?.id} fullWidth defaultOpen>
                {modalityList?.map((modality) => (
                  <MenuItem
                    key={modality.id}
                    value={modality.id}
                    onClick={async () => {
                      await updateRequest({
                        id: request?.id ?? 0,
                        orderID: order.id,
                        modalityID: modality.id,
                      });
                    }}
                  >
                    {modality.name}
                  </MenuItem>
                ))}
              </MySelect>
            </StyledInlineFormField>
          ) : (
            <></>
          )
        }
      />
    );
};
