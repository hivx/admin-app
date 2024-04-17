import { zodResolver } from '@hookform/resolvers/zod';
import { MenuItem, Stack, styled } from '@mui/material';
import { FC } from 'react';
import { UseFormProps } from 'react-hook-form';
import { z } from 'zod';

import { useGetListProcedureQuery } from '@/api/procedure';
import { MyFormSelectField } from '@/components/Elements/Inputs/MyFormSelectField';
import { ExpandableFormContainer } from '@/components/Form/ExpandableFormContainer';
import { MyFormPrimaryFilterField } from '@/components/Form/MyFormPrimaryFilterField';
import { TableFooterFormGroup } from '@/components/Form/TableFooterFormGroup';
import { useAppDispatch, useAppSelector, useTranslate } from '@/hooks';
import { globalStyles } from '@/providers/ThemeProvider';
import { TABLE_CONTENT_BY_USER } from '@/stores/table/tableInitialState';
import { getCurrentTableQuery } from '@/stores/table/tableSelectors';
import { setTableFilter } from '@/stores/table/tableSlice';
import { ISearchContentFilter } from '@/types/dto';
import { mapNullOrEmptyStringToUndefined } from '@/utils/format';
import { uuidv4 } from '@/utils/uuidv4';

const DEFAULT_VALUES: ISearchContentFilter = {
  name: '',
  procedureID: undefined,
};

export const ContentTemplateFilterForm: FC = () => {
  const translate = useTranslate();
  const dispatch = useAppDispatch();
  const { data: procedureData } = useGetListProcedureQuery({
    filter: {},
  });
  const query = useAppSelector(
    getCurrentTableQuery<ISearchContentFilter>(TABLE_CONTENT_BY_USER),
  );

  const formOptions: UseFormProps<ISearchContentFilter> = {
    mode: 'onChange',
    // form validation and pre-processing
    resolver: zodResolver(
      z.object({
        name: z.string().trim().optional().transform(mapNullOrEmptyStringToUndefined),
        procedureID: z
          .union([z.number(), z.string()])
          .optional()
          .transform(mapNullOrEmptyStringToUndefined),
      }),
    ),
    defaultValues: {
      name: query?.filter.name ?? '',
      procedureID: query?.filter.procedureID ?? undefined,
    },
  };
  const handleSubmit = (formData: ISearchContentFilter) => {
    dispatch(
      setTableFilter({
        tableId: TABLE_CONTENT_BY_USER,
        filter: { ...query?.filter, ...formData },
      }),
    );
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
                placeholder: translate.resources.content.name.short(),
                fullWidth: true,
                onKeyDown: formControlProps.onKeyDown,
              }}
            />
          )}
          ExtraFieldsComponent={
            <Stack key={uuidv4()} spacing={1}>
              <StyledMyFormSelectField
                name="procedureID"
                control={formControlProps.control}
                MySelectProps={{
                  label: translate.resources.content.procedureIDs(),
                  MenuProps: {
                    PaperProps: {
                      style: {
                        maxHeight: 300, // thiết lập chiều cao tối đa của danh sách tùy chọn
                        overflowY: 'auto',
                        maxWidth: 300,
                      },
                    },
                  },
                }}
              >
                <MenuItem key="null" value={''}>
                  &nbsp;
                </MenuItem>
                {procedureData &&
                  procedureData?.list?.map((item) => (
                    <MenuItem key={item.id} value={item.id || ''}>
                      <StyledTextMenuItem title={item.name ?? ''}>
                        {item.name}
                      </StyledTextMenuItem>
                    </MenuItem>
                  ))}
              </StyledMyFormSelectField>
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

const StyledMyFormSelectField = styled(MyFormSelectField)`
  .MuiPopover-paper {
    max-width: 20vw;
    max-height: 300px;
  }
`;
