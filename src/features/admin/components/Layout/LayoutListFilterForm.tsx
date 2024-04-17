import { zodResolver } from '@hookform/resolvers/zod';
import { MenuItem, Stack, styled } from '@mui/material';
import { FC } from 'react';
import { UseFormProps } from 'react-hook-form';
import { z } from 'zod';

import { useGetListDepartmentsQuery } from '@/api/departments';
import { useLazyGetListLayoutQuery } from '@/api/layout';
import { useGetListModalityTypeNameQuery } from '@/api/modalityTypeName';
import { useGetListProcedureQuery } from '@/api/procedure';
import { MyFormSelectField } from '@/components/Elements/Inputs/MyFormSelectField';
import { ExpandableFormContainer } from '@/components/Form/ExpandableFormContainer';
import { MyFormPrimaryFilterField } from '@/components/Form/MyFormPrimaryFilterField';
import { TableFooterFormGroup } from '@/components/Form/TableFooterFormGroup';
import { useAppDispatch, useAppSelector, useTranslate } from '@/hooks';
import { globalStyles } from '@/providers/ThemeProvider';
import { TABLE_LAYOUT } from '@/stores/table/tableInitialState';
import { getCurrentTableQuery } from '@/stores/table/tableSelectors';
import { setTableFilter } from '@/stores/table/tableSlice';
import { ISearchLayoutFilter } from '@/types/dto';
import { mapNullOrEmptyStringToUndefined } from '@/utils/format';

const DEFAULT_VALUES: ISearchLayoutFilter = {
  name: '',
  modalityType: '',
  procedureID: undefined,
};

const MAX_WIDTH_EXPAND = '20vw';
const MAX_HEIGHT_EXPAND = '300px';
export const LayoutListFilterForm: FC = () => {
  const translate = useTranslate();
  const dispatch = useAppDispatch();
  const query = useAppSelector(getCurrentTableQuery<ISearchLayoutFilter>(TABLE_LAYOUT));
  const [trigger] = useLazyGetListLayoutQuery();
  const { data: modalitTypeData } = useGetListModalityTypeNameQuery({
    filter: {},
  });
  const { data: departmentData } = useGetListDepartmentsQuery({
    filter: {},
  });
  const modalityTypes = modalitTypeData?.list;

  const { data: procedureData } = useGetListProcedureQuery({
    filter: {},
  });
  const procedures = procedureData?.list;
  const departments = departmentData?.list;

  const formOptions: UseFormProps<ISearchLayoutFilter> = {
    mode: 'onChange',
    // form validation and pre-processing
    resolver: zodResolver(
      z.object({
        name: z.string().trim().optional().transform(mapNullOrEmptyStringToUndefined),
        modalityType: z
          .string()
          .trim()
          .optional()
          .transform(mapNullOrEmptyStringToUndefined),
        procedureID: z
          .union([z.number(), z.string()])
          .optional()
          .transform(mapNullOrEmptyStringToUndefined),
        departmentID: z
          .union([z.number(), z.string()])
          .optional()
          .transform(mapNullOrEmptyStringToUndefined),
      }),
    ),
    defaultValues: {
      name: query?.filter.name ?? '',
      modalityType: query?.filter.modalityType ?? '',
      procedureID: query?.filter.procedureID ?? undefined,
      departmentID: query?.filter.departmentID ?? undefined,
    },
  };
  const handleSubmit = (formData: ISearchLayoutFilter) => {
    dispatch(setTableFilter({ tableId: TABLE_LAYOUT, filter: formData }));
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
                placeholder: translate.resources.layout.name.long(),
                fullWidth: true,
                onKeyDown: formControlProps.onKeyDown,
              }}
            />
          )}
          ExtraFieldsComponent={
            <Stack spacing={1}>
              <MyFormSelectField
                name="modalityType"
                control={formControlProps.control}
                MySelectProps={{
                  label: translate.resources.layout.modalityType(),
                }}
              >
                <MenuItem key="null" value={''}>
                  &nbsp;
                </MenuItem>
                {modalityTypes &&
                  modalityTypes.map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      <StyledTextMenuItem title={item.id ?? ''}>
                        {item.id}
                      </StyledTextMenuItem>
                    </MenuItem>
                  ))}
              </MyFormSelectField>

              <MyFormSelectField
                name="procedureID"
                control={formControlProps.control}
                MySelectProps={{
                  label: translate.resources.layout.procedureID(),
                  MenuProps: {
                    sx: {
                      '.MuiPopover-paper': {
                        maxWidth: MAX_WIDTH_EXPAND,
                        maxHeight: MAX_HEIGHT_EXPAND,
                      },
                    },
                  },
                }}
              >
                <MenuItem key="null" value={''}>
                  &nbsp;
                </MenuItem>
                {procedures &&
                  procedures.map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      <StyledTextMenuItem title={item.name ?? ''}>
                        {item.name}
                      </StyledTextMenuItem>
                    </MenuItem>
                  ))}
              </MyFormSelectField>

              <MyFormSelectField
                name="departmentID"
                control={formControlProps.control}
                MySelectProps={{
                  label: translate.resources.layout.department(),
                  MenuProps: {
                    sx: {
                      '.MuiPopover-paper': {
                        maxWidth: MAX_WIDTH_EXPAND,
                        maxHeight: MAX_HEIGHT_EXPAND,
                      },
                    },
                  },
                }}
              >
                <MenuItem key="null" value={''}>
                  &nbsp;
                </MenuItem>
                {departments &&
                  departments.map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      <StyledTextMenuItem title={item.name ?? ''}>
                        {item.name}
                      </StyledTextMenuItem>
                    </MenuItem>
                  ))}
              </MyFormSelectField>
            </Stack>
          }
        />
      )}
    ></TableFooterFormGroup>
  );
};

const StyledTextMenuItem = styled('div')`
  ${globalStyles.ellipsisEffect}
`;
