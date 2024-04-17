import styled from '@emotion/styled';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { UseFormProps } from 'react-hook-form';
import { z } from 'zod';

import { useGetListContentGroupsQuery } from '@/api/contentGroup';
import { useGetOneOrderQuery } from '@/api/order';
import { MyFormGroupUnstyled } from '@/components/Form';
import { IMyDatagridProps } from '@/components/Table/MyDatagrid';
import { useAppSelector, useAppDispatch } from '@/hooks';
import { selectCurrentUser } from '@/stores/auth/authSelectors';
import { selectCurrentRequestID } from '@/stores/OrderRadiology';
import { TABLE_SELECT_TEMPLATE } from '@/stores/table/tableInitialState';
import { getCurrentTableQuery } from '@/stores/table/tableSelectors';
import { setTableFilter } from '@/stores/table/tableSlice';
import { IContentDTO, ISearchContentFilter } from '@/types/dto';

import { useCurrentOrderID } from '../../../../providers';

import {
  ISelectTemplateFormFields,
  SelectTemplateFormFields,
} from './SelectTemplateFormFields';
import { SelectTemplateTable } from './SelectTemplateTable';

export const SelectTemplateInfo = ({
  onRowClick,
}: Pick<IMyDatagridProps<IContentDTO>, 'onRowClick'>) => {
  const dispatch = useAppDispatch();
  const orderID = useCurrentOrderID();
  const { data: order } = useGetOneOrderQuery({ id: orderID });
  const currentRequestID = useAppSelector(selectCurrentRequestID(orderID));
  const requestFromRequestID = order?.requests?.find(
    (request) => request.id === currentRequestID,
  );

  const modalityType = order?.modalityType;

  const { data: contentGroupData } = useGetListContentGroupsQuery({
    filter: { modalityTypes: modalityType ? [modalityType] : [] },
  });

  const querySelectTemplate = useAppSelector(
    getCurrentTableQuery<ISearchContentFilter>(TABLE_SELECT_TEMPLATE),
  );
  const paramSearch = querySelectTemplate?.filter;

  const currentUser = useAppSelector(selectCurrentUser);
  const listContentGroup = contentGroupData?.list;

  useEffect(() => {
    // set table filter default each time open modal Select Template
    dispatch(
      setTableFilter({
        tableId: TABLE_SELECT_TEMPLATE,
        filter: {
          name: '',
          procedureID: requestFromRequestID?.procedure?.id,
          modalityTypes: modalityType ? [modalityType] : [],
        },
        merge: true,
      }),
    );
  }, [requestFromRequestID?.procedure?.id, modalityType, dispatch]);

  const handleSubmit = async (formData: ISelectTemplateFormFields) => {
    const { name, filterProcedureID, groupID, filterUserID } = formData;
    dispatch(
      setTableFilter({
        tableId: TABLE_SELECT_TEMPLATE,
        filter: {
          name: name?.trim() || '',
          procedureID: filterProcedureID ? requestFromRequestID?.procedure?.id : null,
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
          <SelectTemplateFormFields
            listContentGroup={listContentGroup}
            procedure={requestFromRequestID?.procedure}
            {...controls}
          />
        )}
      />
      <StyledDivTableContainer>
        <SelectTemplateTable onRowClick={onRowClick} />
      </StyledDivTableContainer>
    </div>
  );
};

const StyledDivTableContainer = styled('div')`
  padding: 30px 0 15px;
`;
