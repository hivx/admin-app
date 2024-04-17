import styled from '@emotion/styled';
import { zodResolver } from '@hookform/resolvers/zod';
import { UseFormProps } from 'react-hook-form';
import { z } from 'zod';

import { useGetListContentGroupsQuery } from '@/api/contentGroup';
import { MyFormGroupUnstyled } from '@/components/Form';
import { IMyDatagridProps } from '@/components/Table/MyDatagrid';
import { useAppSelector, useAppDispatch } from '@/hooks';
import { selectCurrentUser } from '@/stores/auth/authSelectors';
import { TABLE_SELECT_TEMPLATE } from '@/stores/table/tableInitialState';
import { getCurrentTableQuery } from '@/stores/table/tableSelectors';
import { setTableFilter } from '@/stores/table/tableSlice';
import {
  IContentDTO,
  IOrderDTO,
  IOrderRequestDTO,
  ISearchContentFilter,
} from '@/types/dto';

import { ISelectTemplateFormFields } from '../../../../../features/order/components/RadiologyReport/Modal/SelectTemplateModal/SelectTemplateFormFields';
import { SelectTemplateTable } from '../../../../../features/order/components/RadiologyReport/Modal/SelectTemplateModal/SelectTemplateTable';
import { MobileDisplayTableNoButtons } from '../../table/MobileDisplayTableNoButtons';

import { MobileRadiologySelectTemplateFormFields } from './MobileRadiologySelectTemplateFormFields';
export const MobileRadiologySelectTemplateInfo = ({
  onRowClick,
  order,
  request,
  modalityType,
}: Pick<IMyDatagridProps<IContentDTO>, 'onRowClick'> & {
  order: IOrderDTO;
  request?: IOrderRequestDTO;
  modalityType?: IOrderDTO['modalityType'];
}) => {
  const dispatch = useAppDispatch();

  const { data: contentGroupData } = useGetListContentGroupsQuery({
    filter: { modalityTypes: modalityType ? [modalityType] : [] },
  });

  const querySelectTemplate = useAppSelector(
    getCurrentTableQuery<ISearchContentFilter>(TABLE_SELECT_TEMPLATE),
  );
  const paramSearch = querySelectTemplate?.filter;

  const currentUser = useAppSelector(selectCurrentUser);
  const listContentGroup = contentGroupData?.list;

  const handleSubmit = async (formData: ISelectTemplateFormFields) => {
    const { name, filterProcedureID, groupID, filterUserID } = formData;
    dispatch(
      setTableFilter({
        tableId: TABLE_SELECT_TEMPLATE,
        filter: {
          name: name?.trim() || '',
          procedureID: filterProcedureID ? request?.procedure?.id : null,
          groupID,
          userID: filterUserID ? currentUser?.id : null,
        },
        merge: true,
      }),
    );
  };

  const formOptions: UseFormProps<ISelectTemplateFormFields> = {
    criteriaMode: 'all',
    resolver: zodResolver(
      z.object({
        name: z.string().trim().optional(),
        filterProcedureID: z.boolean().optional(),
        groupID: z.union([z.number(), z.string()]).optional(),
        filterUserID: z.boolean().optional(),
      }),
    ),
    defaultValues: {
      name: '',
      filterProcedureID: true,
      groupID: undefined,
      filterUserID: !!paramSearch?.userID,
    },
  };

  return (
    <div>
      <MyFormGroupUnstyled
        autoSubmit
        formOptions={formOptions}
        submitOnEnter
        onSubmit={handleSubmit}
        renderInputs={(controls) => (
          <MobileRadiologySelectTemplateFormFields
            listContentGroup={listContentGroup}
            procedure={request?.procedure}
            {...controls}
          />
        )}
      />
      <StyledDivTableContainer>
        <MobileDisplayTableNoButtons
          TableComponent={<SelectTemplateTable onRowClick={onRowClick} />}
        />
      </StyledDivTableContainer>
    </div>
  );
};

const StyledDivTableContainer = styled('div')`
  padding: 30px 0 15px;
`;
