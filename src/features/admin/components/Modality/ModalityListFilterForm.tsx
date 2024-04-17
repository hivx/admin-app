import { zodResolver } from '@hookform/resolvers/zod';
import React, { FC } from 'react';
import { UseFormProps } from 'react-hook-form';
import { z } from 'zod';

import { useLazyGetListModalityQuery } from '@/api/modality';
import { ExpandableFormContainer } from '@/components/Form/ExpandableFormContainer';
import { MyFormPrimaryFilterField } from '@/components/Form/MyFormPrimaryFilterField';
import { TableFooterFormGroup } from '@/components/Form/TableFooterFormGroup';
import { useAppDispatch, useAppSelector, useTranslate } from '@/hooks';
import { TABLE_MODALITY } from '@/stores/table/tableInitialState';
import { getCurrentTableQuery } from '@/stores/table/tableSelectors';
import { setTableFilter } from '@/stores/table/tableSlice';
import { IModalityTypeNameDTO, ISearchModalityFilter } from '@/types/dto';
import { mapNullOrEmptyStringToUndefined } from '@/utils/format';
import { uuidv4 } from '@/utils/uuidv4';

import ModalityListFilterFormFields from './ModalityListFilterFormFields';

// local type, no need to name it as DepartmentListFilterForm

export type ModalityFilterForm = ISearchModalityFilter & {
  modalityTypeData?: Record<string, Pick<IModalityTypeNameDTO, 'id'>>;
  groupIdString?: string;
  roomIdString?: string;
};

const DEFAULT_VALUES: Partial<ModalityFilterForm> = {
  name: '',
  code: '',
  groupID: undefined,
  modalityTypeData: undefined,
  roomID: undefined,
};

export const ModalityListFilterForm: FC = () => {
  const translate = useTranslate();
  const dispatch = useAppDispatch();
  const [trigger] = useLazyGetListModalityQuery();
  const query = useAppSelector(
    getCurrentTableQuery<ISearchModalityFilter>(TABLE_MODALITY),
  );
  const formOptions: UseFormProps<ModalityFilterForm> = {
    mode: 'onChange',
    // form validation and pre-processing
    resolver: zodResolver(
      z
        .object({
          name: z.string().trim().optional().transform(mapNullOrEmptyStringToUndefined),
          code: z.string().trim().optional().transform(mapNullOrEmptyStringToUndefined),
          groupIdString: z.string().optional(),
          roomIdString: z.string().optional(),
          roomID: z.number().optional(),
          groupID: z.number().optional(),
          modalityTypeData: z.array(z.object({ id: z.string() })).optional(),
          modalityTypes: z.array(z.string()).optional(),
        })
        .transform((val) => {
          return {
            ...val,
            modalityTypes:
              val.modalityTypeData && val.modalityTypeData.length
                ? val.modalityTypeData.map((item) => item.id)
                : undefined,
            modalityTypeData: undefined,
            roomID: val.roomIdString ? parseInt(val.roomIdString) : undefined,
            groupID: val.groupIdString ? parseInt(val.groupIdString) : undefined,
            groupIdString: undefined,
            roomIdString: undefined,
          };
        }),
    ),
    defaultValues: {
      name: query?.filter.name ?? '',
      code: query?.filter.code ?? '',
      groupID: query?.filter.groupID ?? undefined,
      modalityTypes: query?.filter.modalityTypes ?? undefined,
      roomID: query?.filter.roomID ?? undefined,
    },
  };
  const handleSubmit = (formData: ModalityFilterForm) => {
    dispatch(setTableFilter({ tableId: TABLE_MODALITY, filter: formData }));
    query && trigger({ ...query, filter: formData });
  };

  return (
    <TableFooterFormGroup
      formOptions={formOptions}
      onSubmit={handleSubmit}
      autoSubmit
      submitOnEnter
      renderInputs={(formControlProps) => (
        <ExpandableFormContainer
          handleSubmit={formControlProps.submit}
          renderPrimaryField={({ open, isOpen }) => (
            <MyFormPrimaryFilterField
              name="name"
              control={formControlProps.control}
              handleSubmit={formControlProps.submit}
              handleExpand={open}
              isExpanded={isOpen}
              isFormDirty={formControlProps.formState.isDirty}
              resetFormOnDirty={false}
              handleReset={() => formControlProps.reset(DEFAULT_VALUES)}
              MyTextFieldProps={{
                placeholder: translate.resources.modality.name.long(),
                fullWidth: true,
                onKeyDown: formControlProps.onKeyDown,
              }}
            />
          )}
          ExtraFieldsComponent={
            <ModalityListFilterFormFields
              key={uuidv4()}
              formControlProps={formControlProps}
            />
          }
        />
      )}
    ></TableFooterFormGroup>
  );
};
