import { zodResolver } from '@hookform/resolvers/zod';
import { MenuItem } from '@mui/material';
import { FC } from 'react';
import { UseFormProps } from 'react-hook-form';
import { z } from 'zod';

import { useLazyGetListProcedureQuery } from '@/api/procedure';
import { MyFormTextField } from '@/components';
import { MyFormSelectField } from '@/components/Elements/Inputs/MyFormSelectField';
import { ExpandableFormContainer } from '@/components/Form/ExpandableFormContainer';
import { MyFormPrimaryFilterField } from '@/components/Form/MyFormPrimaryFilterField';
import { TableFooterFormGroup } from '@/components/Form/TableFooterFormGroup';
import { useAppDispatch, useAppSelector, useTranslate } from '@/hooks';
import { TABLE_PROCEDURE } from '@/stores/table/tableInitialState';
import { getCurrentTableQuery } from '@/stores/table/tableSelectors';
import { setTableFilter } from '@/stores/table/tableSlice';
import { ISearchProcedureFilter } from '@/types/dto';
import { mapNullOrEmptyStringToUndefined } from '@/utils/format';
import { uuidv4 } from '@/utils/uuidv4';

import { useGetListBodyPartsQuery } from '../../api/general';

import { ProcedureModalityTypesAutocompleteField } from './ProcedureModalityTypesAutocompleteField';

const DEFAULT_VALUES: Partial<ISearchProcedureFilter> = {
  code: '',
  name: '',
  bodyPart: '',
  modalityTypes: undefined,
};

export const ProcedureListFilterForm: FC = () => {
  const translate = useTranslate();
  const dispatch = useAppDispatch();
  const { data } = useGetListBodyPartsQuery({
    filter: {},
  });
  const [trigger] = useLazyGetListProcedureQuery();
  const query = useAppSelector(
    getCurrentTableQuery<ISearchProcedureFilter>(TABLE_PROCEDURE),
  );
  const bodyPartList = data?.list;
  const formOptions: UseFormProps<ISearchProcedureFilter> = {
    mode: 'onChange',
    // form validation and pre-processing
    resolver: zodResolver(
      z.object({
        code: z.string().trim().optional().transform(mapNullOrEmptyStringToUndefined),
        name: z.string().trim().optional().transform(mapNullOrEmptyStringToUndefined),
        bodyPart: z.string().trim().optional().transform(mapNullOrEmptyStringToUndefined),
        modalityTypes: z
          .array(z.string())
          .transform((v) => (v && v.length ? v : undefined))
          .optional(),
      }),
    ),
    defaultValues: {
      code: query?.filter.code ?? '',
      name: query?.filter.name ?? '',
      bodyPart: query?.filter.bodyPart ?? '',
      modalityTypes: query?.filter.modalityTypes ?? undefined,
    },
  };
  const handleSubmit = (formData: ISearchProcedureFilter) => {
    dispatch(setTableFilter({ tableId: TABLE_PROCEDURE, filter: formData }));
    trigger({ ...query, filter: formData });
  };

  return (
    <TableFooterFormGroup
      formOptions={formOptions}
      onSubmit={handleSubmit}
      submitOnEnter
      autoSubmit
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
                placeholder: translate.resources.procedure.name(),
                fullWidth: true,
                onKeyDown: formControlProps.onKeyDown,
              }}
            />
          )}
          ExtraFieldsComponent={
            <>
              <MyFormTextField
                name="code"
                control={formControlProps.control}
                MyTextFieldProps={{
                  label: translate.resources.procedure.code(),
                  placeholder: translate.resources.procedure.code(),
                  fullWidth: true,
                  onKeyDown: formControlProps.onKeyDown,
                }}
              />
              <ProcedureModalityTypesAutocompleteField
                key={uuidv4()}
                label={translate.resources.modality.modalityType.long()}
                placeholder={translate.resources.modality.modalityType.long()}
                control={formControlProps.control}
                name="modalityTypes"
              />
              <MyFormSelectField
                name="bodyPart"
                control={formControlProps.control}
                MySelectProps={{
                  label: translate.resources.procedure.bodyParts(),
                }}
              >
                <MenuItem key="null" value={''}>
                  &nbsp;
                </MenuItem>
                {bodyPartList &&
                  bodyPartList.map((item) => (
                    <MenuItem key={item.id} value={item.id || ''}>
                      {item.id}
                    </MenuItem>
                  ))}
              </MyFormSelectField>
            </>
          }
        />
      )}
    ></TableFooterFormGroup>
  );
};
