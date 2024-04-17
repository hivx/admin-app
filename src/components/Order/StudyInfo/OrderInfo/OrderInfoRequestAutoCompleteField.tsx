import {
  MenuItem,
  Paper,
  Stack,
  Typography,
  styled,
  lighten,
  CircularProgress,
} from '@mui/material';
import { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  Control,
  Controller,
  FieldPath,
  UseFormTrigger,
  UseFormWatch,
} from 'react-hook-form';

import { useLazyGetListProcedureQuery } from '@/api/procedure';
import { MyTextField } from '@/components/Elements';
import { MyAutoComplete } from '@/components/Elements/Inputs/MyAutoComplete';
import { ErrorTooltip } from '@/components/Elements/Tooltip/ErrorTooltip';
import { MyFormLabel } from '@/components/Form/MyFormLabel';
import { useAppDispatch, useAppSelector, useTranslate } from '@/hooks';
import { useRegisterCreateOrderFunctions } from '@/providers/Order/CreateOrderFunctionsProvider';
import { globalStyles } from '@/providers/ThemeProvider';
import {
  selectProcedures,
  setCurrentProcedureData,
  setModalityType,
  setProcedures,
} from '@/stores/examinnation/createOrderSlice';
import { BaseEntity } from '@/types';
import { IOrderDTO, IProcedureDTO } from '@/types/dto';
import { filterTransientProps } from '@/utils/filterTransientProps';
import { uuidv4 } from '@/utils/uuidv4';

import { IOrderInfoFormFields } from './OrderInfoFormFields';
import { OrerInfoRequestWrapper } from './OrerInfoRequestWrapper';

type OrderInfoRequestAutoCompleteFieldProps = {
  order?: IOrderDTO;
  readonly?: boolean;
  name: FieldPath<IOrderInfoFormFields>;
  control?: Control<IOrderInfoFormFields>;
  watch: UseFormWatch<IOrderInfoFormFields>;
  validateTrigger: UseFormTrigger<IOrderInfoFormFields>;
};

export const OrderInfoRequestAutoCompleteField: FC<
  OrderInfoRequestAutoCompleteFieldProps
> = (props) => {
  const { order, readonly, watch, name, control, validateTrigger } = props;
  const translate = useTranslate();
  const [open, setOpen] = useState<boolean>();
  const register = useRegisterCreateOrderFunctions();
  const dispatch = useAppDispatch();

  const modatlityType = watch('modalityType');
  const accessionNumber = watch('accessionNumber');
  const [trigger, { data: procedureData, isFetching }] = useLazyGetListProcedureQuery();
  const orderID = order?.id ?? 0;

  const requests = order?.requests;
  const proceduresFromApi = requests?.map((request) => request.procedure);
  const procedures = useAppSelector(selectProcedures);
  /**
   * If procedures display will be proceduresFromApi or localProcedures
   * proceduresFromApi: edit order info
   * localProcedures: create order info
   */
  const localProcedures = proceduresFromApi
    ? procedures.filter((item) => {
        return !proceduresFromApi.find((procedure) => procedure?.id === item.id);
      })
    : procedures;

  const proceduresDisplay = useMemo(
    () =>
      proceduresFromApi && proceduresFromApi.length !== 0
        ? [...proceduresFromApi, ...localProcedures]
        : procedures,
    [localProcedures, procedures, proceduresFromApi],
  );

  const defaultProcedureID = requests ? requests[0]?.procedureID ?? undefined : undefined;

  const handleEditValue = (
    selectedOption?: IProcedureDTO,
    editOptionID?: BaseEntity['id'],
  ) => {
    const editOption = procedureData?.list.find(
      (option: IProcedureDTO) => option.id === editOptionID,
    );
    if (selectedOption && editOption) {
      if (selectedOption.id !== editOptionID) {
        dispatch(setProcedures(editOption));
      }
      dispatch(setModalityType(selectedOption.modalityType));
    }
  };

  register('handleEditValue', handleEditValue);

  /**
   * control when click button + in list procedure
   * If modalityType, accessionNumber exist will open modal add request
   * else show error message bottom field input
   * @param selectedValue
   */
  const handleClickCreateOrderRequestButton = async (
    selectedValue: IProcedureDTO['name'],
  ) => {
    const selectedOption = procedureData?.list.find(
      (option: IProcedureDTO) => option.name === selectedValue,
    );
    if (selectedOption) {
      dispatch(setProcedures(selectedOption));
      dispatch(setModalityType(selectedOption.modalityType));
    }
    setOpen(false);
  };

  const handleClickOneProcedure = useCallback(
    (procedure: IProcedureDTO) => {
      dispatch(setCurrentProcedureData(procedure));
    },
    [dispatch],
  );

  useEffect(() => {
    if (defaultProcedureID) {
      const procedure = proceduresDisplay.find((item) => {
        if (item) {
          return item.id === defaultProcedureID;
        }
      });
      if (procedure) {
        handleClickOneProcedure(procedure);
      }
    }
  }, [defaultProcedureID, handleClickOneProcedure, proceduresDisplay]);

  /**
   * When click 'Chọn dịch vụ chụp'if validateResult is:
   * True: call API get and open list request
   * False: Display validate field 'Mã chỉ định' hoặc 'Loại ca'
   */
  const handleClickOpenListRequest = async () => {
    const validateResult = await validateTrigger(['modalityType', 'accessionNumber']);

    if (validateResult) {
      await trigger({
        filter: { modalityTypes: modatlityType ? [modatlityType] : [] },
      });
      setOpen(true);
    }
  };

  const fieldState = control?.getFieldState(name);
  const hasError = !!fieldState?.error;
  const errorMessage = fieldState?.error?.message;

  const textFieldRef = useRef<HTMLDivElement>(null); // for tooltip to get anchor position
  return (
    <Controller
      key={orderID}
      name={name}
      control={control}
      render={() => {
        return (
          <OrerInfoRequestWrapper
            initialProcedureIDs={defaultProcedureID}
            renderRequestAutoCompleteField={(
              setCurrentProcedureIds,
              currentProcedureIds,
            ) => (
              <>
                <ErrorTooltip
                  errorMessage={errorMessage}
                  fieldRef={textFieldRef}
                  key={uuidv4()} // create a new component when re-render
                />
                <MyFormLabel
                  label={translate.resources.order.requests()}
                  focused={false}
                  isFilled={false}
                  alwaysShrinkLabel
                  InputLabelProps={{
                    disabled: readonly,
                    required: true,
                    error: hasError,
                  }}
                >
                  <StyledOrderInfoRequestAutoCompleteFieldContainer
                    ref={textFieldRef}
                    $readonly={readonly}
                  >
                    {!readonly && (
                      <MyAutoComplete
                        key={`${uuidv4()}- ${modatlityType}`}
                        open={open}
                        onOpen={handleClickOpenListRequest}
                        onClose={() => {
                          setOpen(false);
                        }}
                        size="extrasmall"
                        disabled={readonly}
                        loading={isFetching}
                        value={procedures}
                        options={procedureData?.list ?? []}
                        isOptionEqualToValue={(option, value) => option?.id === value?.id}
                        getOptionLabel={(option) => `${option?.name}`}
                        fullWidth
                        filterOptions={(options) =>
                          options.filter(
                            (option) =>
                              !procedures.some(
                                (procedure) => procedure?.id === option?.id,
                              ),
                          )
                        }
                        // open
                        renderOption={(props, option) => {
                          return (
                            !isFetching && (
                              <li {...props}>
                                <Stack
                                  direction={'row'}
                                  justifyContent={'space-between'}
                                  width={'100%'}
                                  onClick={() =>
                                    handleClickCreateOrderRequestButton(
                                      option?.name ?? '',
                                    )
                                  }
                                >
                                  <StyledTitleRequest
                                    spacing={1}
                                    direction={'row'}
                                    width={'100%'}
                                    alignItems={'center'}
                                  >
                                    <StyledProcedureCode title={option?.code ?? ''}>
                                      {option?.code}
                                    </StyledProcedureCode>
                                    <StyledProcedureName title={option?.name ?? ''}>
                                      {option?.name}
                                    </StyledProcedureName>
                                  </StyledTitleRequest>
                                </Stack>
                              </li>
                            )
                          );
                        }}
                        MyTextFieldProps={{
                          label: translate.resources.order.requests(),
                        }}
                        renderInput={(params) =>
                          readonly ? (
                            <MyTextField
                              {...params}
                              title=""
                              variant="standard"
                              InputProps={{
                                disableUnderline: true,
                              }}
                            />
                          ) : (
                            <MyTextField
                              {...params}
                              placeholder={translate.studyInfo.selectRequest()}
                              InputProps={{
                                ...params.InputProps,
                                endAdornment: (
                                  <>
                                    {isFetching ? (
                                      <CircularProgress color="primary" size={20} />
                                    ) : null}
                                    {readonly ? <></> : params.InputProps.endAdornment}
                                  </>
                                ),
                              }}
                            />
                          )
                        }
                        renderTags={(value) =>
                          value.map((option, index) => (
                            <span key={index} style={{ display: 'none' }}>
                              {option?.name}
                            </span>
                          ))
                        }
                        PaperComponent={({ children }) => (
                          <Paper
                            sx={{
                              background: (theme) => theme.palette.background.default,
                            }}
                          >
                            {children}
                          </Paper>
                        )}
                        componentsProps={{
                          clearIndicator: {
                            disabled: true,
                            sx: { display: 'none' },
                          },
                        }}
                      />
                    )}
                    <StyledOrderInfoRequestAutoCompleteFieldMain $readonly={readonly}>
                      {proceduresDisplay.length > 0 &&
                        proceduresDisplay?.map((procedure, index) => {
                          return (
                            <StyledMenuItem
                              key="null"
                              value={procedure?.code ?? ''}
                              onClick={() => {
                                procedure && handleClickOneProcedure(procedure);
                                setCurrentProcedureIds(procedure?.id);
                              }}
                              $isSelected={currentProcedureIds === procedure?.id}
                            >
                              <Stack
                                direction={'row'}
                                justifyContent={'space-between'}
                                alignItems={'center'}
                                width={'100%'}
                                spacing={1}
                              >
                                <StyledTitleRequest
                                  spacing={1}
                                  direction={'row'}
                                  width={'100%'}
                                  alignItems={'center'}
                                >
                                  <StyledProcedureCode title={procedure?.code ?? ''}>
                                    {procedure?.code}
                                  </StyledProcedureCode>
                                  <StyledProcedureName title={procedure?.name ?? ''}>
                                    {procedure?.name}
                                  </StyledProcedureName>
                                </StyledTitleRequest>
                              </Stack>
                            </StyledMenuItem>
                          );
                        })}
                    </StyledOrderInfoRequestAutoCompleteFieldMain>
                  </StyledOrderInfoRequestAutoCompleteFieldContainer>
                </MyFormLabel>
              </>
            )}
          />
        );
      }}
    />
  );
};

/**
 * Styles css
 */
const StyledOrderInfoRequestAutoCompleteFieldContainer = styled(
  'div',
  filterTransientProps,
)<{
  $readonly?: boolean;
}>`
  padding: ${(props) => props.theme.spacing(1)};
  background-color: ${(props) =>
    props.$readonly
      ? props.theme.pacs?.customColors.fieldDisabledBackground
      : props.theme.palette.background.default};
`;

const StyledOrderInfoRequestAutoCompleteFieldMain = styled('div', filterTransientProps)<{
  $readonly?: boolean;
}>`
  min-height: 100px;
  max-height: 100px;
  overflow: auto;
  background-color: ${(props) =>
    props.$readonly
      ? props.theme.pacs?.customColors.fieldDisabledBackground
      : props.theme.palette.background.default};
  li:first-child {
    border-top: 0;
  }
  li:last-child {
  }
  li {
    border-top: 0.5px solid ${(props) => lighten(props.theme.palette.text.primary, 0.7)};
    padding: 0 0 0 ${(props) => props.theme.spacing(1)};
  }
  .MuiAutocomplete-hasPopupIcon.MuiAutocomplete-hasClearIcon.css-1lbvoig-MuiAutocomplete-root
    .MuiOutlinedInput-root {
    border-radius: 0;
  }
`;

const StyledMenuItem = styled(MenuItem, filterTransientProps)<{
  $isSelected?: boolean;
}>`
  background-color: ${(props) =>
    props.$isSelected ? lighten(props.theme.palette.primary.main, 0.6) : ''};
`;

const StyledProcedureName = styled(Typography)`
  ${globalStyles.ellipsisEffect}
`;
const StyledProcedureCode = styled(Typography)`
  ${globalStyles.ellipsisEffect}
  min-width: 70px;
  max-width: 70px;
  color: ${(props) => props.theme.pacs?.customColors.text.gray};
`;
const StyledTitleRequest = styled(Stack)`
  ${globalStyles.ellipsisEffect}
`;
