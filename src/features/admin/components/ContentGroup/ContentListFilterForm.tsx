import { zodResolver } from '@hookform/resolvers/zod';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import { Checkbox, Chip, Typography, styled, alpha } from '@mui/material';
import { FC } from 'react';
import { UseFormProps } from 'react-hook-form';
import { z } from 'zod';

import { useGetListModalityTypeQuery } from '@/api/modalityType';
import { ExpandableFormContainer } from '@/components/Form/ExpandableFormContainer';
import { MyFormPrimaryFilterSelectField } from '@/components/Form/MyFormPrimaryFilterSelectField';
import { TableFooterFormGroup } from '@/components/Form/TableFooterFormGroup';
import { ActionComponentWithMenu } from '@/components/Table/ActionComponentWithMenu';
import { useAppDispatch, useAppSelector, useTranslate } from '@/hooks';
import { globalStyles } from '@/providers/ThemeProvider';
import { TABLE_CONTENT_GROUP } from '@/stores/table/tableInitialState';
import { getCurrentTableQuery } from '@/stores/table/tableSelectors';
import { setTableFilter } from '@/stores/table/tableSlice';
import { ISearchContentGroupFilter } from '@/types/dto';

import { useLazyGetListContentGroupsQuery } from '../../../../api/contentGroup';

// local type, no need to name it as DepartmentListFilterForm

export const ContentListFilterForm: FC = () => {
  const translate = useTranslate();
  const dispatch = useAppDispatch();
  const { data } = useGetListModalityTypeQuery({
    filter: {},
  });

  const [trigger] = useLazyGetListContentGroupsQuery();
  const query = useAppSelector(
    getCurrentTableQuery<ISearchContentGroupFilter>(TABLE_CONTENT_GROUP),
  );
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;
  const modalityTypes = data?.list?.map((item) => item.name);
  const formOptions: UseFormProps<ISearchContentGroupFilter> = {
    mode: 'onChange',
    // form validation and pre-processing
    resolver: zodResolver(
      z.object({
        modalityTypes: z
          .array(z.string())
          .transform((v) => (v && v.length ? v : undefined))
          .optional(),
      }),
    ),
    defaultValues: {
      modalityTypes: query?.filter.modalityTypes ?? undefined,
    },
  };
  const handleSubmit = (formData: ISearchContentGroupFilter) => {
    dispatch(setTableFilter({ tableId: TABLE_CONTENT_GROUP, filter: formData }));
    trigger({ ...query, filter: formData });
  };

  return (
    <StyledTableFooterFormGroup
      formOptions={formOptions}
      onSubmit={handleSubmit}
      submitOnEnter
      autoSubmit
      renderInputs={({ control, submit }) => (
        <ExpandableFormContainer
          handleSubmit={submit}
          renderPrimaryField={() => (
            <MyFormPrimaryFilterSelectField
              control={control}
              name="modalityTypes"
              placeholder={translate.resources.modality.modalityType.long()}
              handleSubmit={submit}
              MyAutoCompleteProps={{
                options: modalityTypes ?? [],
                fullWidth: true,
                ListboxProps: { style: { maxHeight: 300 } },
                disablePortal: true,
                isOptionEqualToValue: (option, value) => option === value,
                getOptionLabel: (option) => `${option}`,
                renderTags: (value, getTagProps) => {
                  const numTags = value.length;
                  const limitTags = 2;
                  const readOnly = value.slice(0, limitTags);
                  return (
                    <>
                      {readOnly.map((option, index) => (
                        <Chip
                          {...getTagProps({ index })}
                          size="small"
                          key={index}
                          label={option ?? ''}
                        />
                      ))}
                      {numTags > limitTags && (
                        <ActionComponentWithMenu
                          MyMenuProps={{
                            transformOrigin: { horizontal: 'right', vertical: 'top' },
                            anchorOrigin: { horizontal: 'right', vertical: 'bottom' },
                          }}
                          ActionComponent={
                            <StyledListTag variant="body2">
                              {`+${numTags - limitTags}`}
                            </StyledListTag>
                          }
                          ListMenu={
                            <StyledListMenuChip>
                              {value.slice(limitTags).map((option, index) => {
                                return (
                                  <Chip
                                    {...getTagProps({ index: index + limitTags })}
                                    size="small"
                                    key={`${index + limitTags}`}
                                    label={option ?? ''}
                                  />
                                );
                              })}
                            </StyledListMenuChip>
                          }
                        />
                      )}
                    </>
                  );
                },
                renderOption: (props, option, { selected }) => {
                  return (
                    <li {...props}>
                      <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{ marginRight: 8 }}
                        checked={selected}
                      />
                      {option}
                    </li>
                  );
                },
              }}
            />
          )}
          ExtraFieldsComponent={<></>}
        />
      )}
    ></StyledTableFooterFormGroup>
  );
};

const StyledTableFooterFormGroup = styled(TableFooterFormGroup)`
  .MuiAutocomplete-root .MuiOutlinedInput-root.MuiInputBase-sizeSmall {
    padding: ${(props) => props.theme.spacing(0.5, 1)};
    max-height: ${(props) => props.theme.spacing(4.5)};
  }
`;

const StyledListTag = styled(Typography)`
  padding: 0 ${(props) => props.theme.spacing(0.5)};
  border-radius: 5px;
  margin-left: ${(props) => props.theme.spacing(1)};
  background-color: ${(props) => alpha(props.theme.palette.primary.main, 0.1)};
  :hover {
    ${globalStyles.onMenuHover};
  }
`;

const StyledListMenuChip = styled('div')`
  display: flex;
  gap: ${(props) => props.theme.spacing(0.5)};
  max-width: 300px;
  overflow: auto;
`;
