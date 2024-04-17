/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import CloseIcon from '@mui/icons-material/Close';
import { Stack, styled } from '@mui/material';
import React, { FC, useCallback, useEffect, useRef } from 'react';

import { ItechConfigTableIcon } from '@/assets/icon';
import ItechConfigIcon from '@/assets/icon/ConfigIcon';
import { TableSVGIcon } from '@/components/Table/TableSVGIcon';
import { useAnchorElement, useAppSelector, useTranslate } from '@/hooks';
import { getCurrentTableDefaultFieldName } from '@/stores/table/tableSelectors';
import { RenderFormFieldDefinition } from '@/types/form';

import { StyledIconButtonWithToolTip } from '../../Layout/NavBar/NavBar';
import { StyledPrimaryFieldInsideTableHeader } from '../StyledPrimaryFieldInsideTableHeader';

import DefaultFieldSelector from './DefaultFieldSelector';
type MyFormFieldWithDefaultSelectorProps = {
  /**
   * List of filter fields
   */
  fieldsDef: RenderFormFieldDefinition;
  tableID: string;
  handleExpand: ReturnType<typeof useAnchorElement>['open'];
  /**
   * If form values are not equal to default values (form has been touched by the user)
   * @default false
   */
  isFormDirty: boolean;
  /**
   * If true, we will only show reset button when form is dirty
   * If false, the reset button will show at all times
   * @default true
   */
  resetFormOnDirty: boolean;
  /**
   * Reset form values
   */
  handleReset: () => void;
};

/**
 * A form field with default selector drop down to select default field
 * The default field is retrieved from Redux for each table and we select the
 * correct field component based on the field name
 */
export const MyFormFieldWithDefaultSelector: FC<MyFormFieldWithDefaultSelectorProps> = (
  props,
) => {
  const {
    fieldsDef,
    tableID,
    isFormDirty = false,
    resetFormOnDirty = true,
    handleExpand,
    handleReset,
  } = props;
  const fieldRef = useRef(null);
  const translate = useTranslate();
  const defaultFieldName =
    useAppSelector(getCurrentTableDefaultFieldName(tableID)) || Object.keys(fieldsDef)[0];

  const defaultFieldDef = fieldsDef[defaultFieldName];

  const handleClick = useCallback(
    (
      e:
        | React.MouseEvent<HTMLElement, MouseEvent>
        | React.FocusEvent<HTMLElement, Element>
        | null
        | undefined,
    ) => {
      handleExpand(e, fieldRef.current);
    },
    [handleExpand],
  );

  // set anchor point for extra icons
  useEffect(() => {}, []);

  if (!defaultFieldDef) return <></>; // should not happen if fieldsDef is not empty

  /**
   * Add helper functions to this cloned element
   */
  const ComposedDefaultFieldComponent = React.cloneElement(
    defaultFieldDef.Component,
    {
      MyTextFieldProps: {
        ...defaultFieldDef.Component.props.MyTextFieldProps,
        label: undefined, // no need to display label
      },
    },
    React.Children.map(defaultFieldDef.Component.props.children, (children) => children),
  );

  const ResetButton = (
    <StyledIconButtonWithToolTip
      title={translate.buttons.reset()}
      onClick={(e) => {
        e.stopPropagation();
        handleReset();
      }}
    >
      <TableSVGIcon IconComponent={CloseIcon} IconComponentProps={{ color: 'inherit' }} />
    </StyledIconButtonWithToolTip>
  );

  const AdvanceSearchButton = (
    <StyledIconButtonWithToolTip
      title={translate.buttons.advanceSearch()}
      onClick={handleClick}
    >
      <TableSVGIcon
        IconComponent={ItechConfigIcon}
        IconComponentProps={{ color: 'inherit' }}
      />
    </StyledIconButtonWithToolTip>
  );

  return (
    <StyledPrimaryFieldInsideTableHeader>
      <StyledDefaultFieldWrapper ref={fieldRef}>
        <StyledDefaultFieldContainer>
          {ComposedDefaultFieldComponent}
        </StyledDefaultFieldContainer>
        <StyledExtraIconsContainer spacing={0} direction="row">
          {resetFormOnDirty ? isFormDirty && ResetButton : ResetButton}
          {AdvanceSearchButton}
          <DefaultFieldSelector
            fieldsDef={fieldsDef}
            currentFieldName={defaultFieldName}
            tableId={tableID}
          />
        </StyledExtraIconsContainer>
      </StyledDefaultFieldWrapper>
    </StyledPrimaryFieldInsideTableHeader>
  );
};

const StyledDefaultFieldContainer = styled('div')`
  &:first-child {
    width: 100%;
  }
`;

const StyledDefaultFieldWrapper = styled('div')`
  position: relative;
  display: flex;
  gap: ${(props) => props.theme.spacing(0.5)};
`;

const StyledExtraIconsContainer = styled(Stack)``;
