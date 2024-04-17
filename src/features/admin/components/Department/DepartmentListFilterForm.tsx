import { zodResolver } from '@hookform/resolvers/zod';
import { MenuItem } from '@mui/material';
import { FC } from 'react';
import { UseFormProps } from 'react-hook-form';
import { z } from 'zod';

import {
  useGetListDepartmentsQuery,
  useLazyGetListDepartmentsQuery,
} from '@/api/departments';
import { MyFormTextField } from '@/components';
import { MyFormSelectField } from '@/components/Elements/Inputs/MyFormSelectField';
import { ExpandableFormContainer } from '@/components/Form/ExpandableFormContainer';
import { MyFormPrimaryFilterField } from '@/components/Form/MyFormPrimaryFilterField';
import { TableFooterFormGroup } from '@/components/Form/TableFooterFormGroup';
import { useAppDispatch, useAppSelector, useTranslate } from '@/hooks';
import { TABLE_DEPARTMENT } from '@/stores/table/tableInitialState';
import { getCurrentTableQuery } from '@/stores/table/tableSelectors';
import { setTableFilter } from '@/stores/table/tableSlice';
import { ISearchDepartmentFilter } from '@/types/dto';
import { mapNullOrEmptyStringToUndefined } from '@/utils/format';

const DEFAULT_VALUES: ISearchDepartmentFilter = {
  code: '',
  name: '',
  parentID: '',
};

export const DepartmentListFilterForm: FC = () => {
  const translate = useTranslate();
  const dispatch = useAppDispatch();
  const query = useAppSelector(
    getCurrentTableQuery<ISearchDepartmentFilter>(TABLE_DEPARTMENT),
  );
  const [trigger] = useLazyGetListDepartmentsQuery();
  const { data } = useGetListDepartmentsQuery({
    filter: {},
  });
  const listDepartments = data?.list;
  const formOptions: UseFormProps<ISearchDepartmentFilter> = {
    mode: 'onChange',
    // form validation and pre-processing
    resolver: zodResolver(
      z.object({
        name: z.string().trim().optional().transform(mapNullOrEmptyStringToUndefined),
        code: z.string().trim().optional().transform(mapNullOrEmptyStringToUndefined),
        parentID: z
          .union([z.number(), z.string()])
          .optional()
          .transform(mapNullOrEmptyStringToUndefined),
      }),
    ),
    defaultValues: {
      code: query?.filter.code ?? '',
      name: query?.filter.name ?? '',
      parentID: query?.filter.parentID ?? '',
    },
  };
  const handleSubmit = (formData: ISearchDepartmentFilter) => {
    dispatch(setTableFilter({ tableId: TABLE_DEPARTMENT, filter: formData }));
    query && trigger({ ...query, filter: formData });
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
                placeholder: translate.resources.department.name(),
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
                  label: translate.resources.department.code(),
                  placeholder: translate.resources.department.code(),
                  fullWidth: true,
                  onKeyDown: formControlProps.onKeyDown,
                }}
              />
              <MyFormSelectField
                name="parentID"
                control={formControlProps.control}
                MySelectProps={{
                  label: translate.resources.department.parent(),
                }}
              >
                <MenuItem key="null" value={''}>
                  &nbsp;
                </MenuItem>
                {listDepartments &&
                  listDepartments.map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      {item.name}
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
