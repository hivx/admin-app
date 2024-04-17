import React, { useState } from 'react';

export type MultiCheckboxData<T> = {
  id: string | number;
  data?: T;
  /**
   * State tick or untick of checkbox item
   */
  isSelected: boolean;
};

type RenderInputProps<T> = {
  /**
   * Data to render component list checkbox
   */
  checkboxDataState: MultiCheckboxData<T>[];
  /**
   * All checkbox has been selected or not
   */
  isAllCheckboxSelected?: boolean;
  /**
   * Action when click 'Tất cà'
   */
  onSelectAll?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /**
   * Action when click a checkbox
   */
  onItemClick?: (
    e: React.ChangeEvent<HTMLInputElement>,
    item?: MultiCheckboxData<T>,
  ) => void;
};

export type RenderInputType<T> = (props: RenderInputProps<T>) => React.ReactElement;

type MultiCheckboxCommonProps<T> = {
  /**
   * is select only one checkbox
   */
  isSingleSelect?: boolean;
  /**
   * render component list checkbox
   */
  renderInput: RenderInputType<T>;
  /**
   * render component select All
   */
  renderOptionSelectAll?: RenderInputType<T>;
  onSelectCallback?: (
    newData: MultiCheckboxData<T>[],
    selectedItem?: MultiCheckboxData<T>,
  ) => void;
};

type ControlledMultiCheckboxProps<T> = {
  /**
   * Controlled state
   */
  value: MultiCheckboxData<T>[];
} & MultiCheckboxCommonProps<T>;

type UncontrolledMultiCheckboxProps<T> = {
  /**
   * Uncontrolled state
   */
  initialData: MultiCheckboxData<T>[];
} & MultiCheckboxCommonProps<T>;

export type MultiCheckboxControllerProps<T> =
  | ControlledMultiCheckboxProps<T>
  | UncontrolledMultiCheckboxProps<T>;

export const MultiCheckboxController = <T,>(props: MultiCheckboxControllerProps<T>) => {
  if ('value' in props) {
    // controlled state
    return <ControlledMultiCheckbox {...props} />;
  } else return <UncontrolledMultiCheckbox {...props} />;
};

/**
 * Logic when tick/unTick 'Tất cả'
 * common for Controlled & Uncontrolled  MultiCheckbox
 */
const onSelectAllOptions = <T,>(
  isAllCheckboxSelected: boolean,
  currentCheckboxData: MultiCheckboxData<T>[],
  onSelectCallback: MultiCheckboxCommonProps<T>['onSelectCallback'],
  setCheckboxDataState?: (value: React.SetStateAction<MultiCheckboxData<T>[]>) => void,
) => {
  const newData = currentCheckboxData.slice().map((object) => {
    return { ...object, isSelected: !isAllCheckboxSelected };
  });
  onSelectCallback && onSelectCallback(newData);
  // for uncontrolled component
  setCheckboxDataState && setCheckboxDataState(newData);
};

/**
 * Logic when tick/untick an item
 * common for Controlled & Uncontrolled  MultiCheckbox
 */
const onItemClick = <T,>(
  e: React.ChangeEvent<HTMLInputElement>,
  currentCheckboxData: MultiCheckboxData<T>[],
  onSelectCallback: MultiCheckboxCommonProps<T>['onSelectCallback'],
  item?: MultiCheckboxData<T>,
  setCheckboxDataState?: (value: React.SetStateAction<MultiCheckboxData<T>[]>) => void,
  isSingleSelect?: boolean,
) => {
  if (item) {
    item.isSelected = !item.isSelected;
    if (isSingleSelect) {
      currentCheckboxData.forEach((data, index) => {
        if (data.id !== item.id) {
          currentCheckboxData[index] = { ...data, isSelected: false };
        }
      });
    }
    const newData = currentCheckboxData.slice();
    onSelectCallback && onSelectCallback(newData, item);
    // for uncontrolled component
    setCheckboxDataState && setCheckboxDataState(newData);
  }
};

/**
 * Controlled MultiCheckbox component
 */
const ControlledMultiCheckbox = <T,>(props: ControlledMultiCheckboxProps<T>) => {
  const {
    value,
    onSelectCallback,
    renderOptionSelectAll,
    renderInput,
    isSingleSelect = false,
  } = props;
  const isAllCheckboxSelected = value.every((item) => item.isSelected);
  const onSelectAll = () =>
    onSelectAllOptions(isAllCheckboxSelected, value, onSelectCallback);
  const onClick = (e: React.ChangeEvent<HTMLInputElement>, item?: MultiCheckboxData<T>) =>
    onItemClick(e, value, onSelectCallback, item, undefined, isSingleSelect);

  return (
    <MultiCheckbox
      checkboxDataState={value}
      onItemClick={onClick}
      onSelectAll={onSelectAll}
      renderInput={renderInput}
      renderOptionSelectAll={renderOptionSelectAll}
      isAllCheckboxSelected={isAllCheckboxSelected}
    />
  );
};

/**
 * Uncontrolled MultiCheckbox component
 */
const UncontrolledMultiCheckbox = <T,>(props: UncontrolledMultiCheckboxProps<T>) => {
  const {
    initialData,
    renderInput,
    renderOptionSelectAll,
    onSelectCallback,
    isSingleSelect = false,
  } = props;
  const [checkboxDataState, setCheckboxDataState] =
    useState<MultiCheckboxData<T>[]>(initialData);
  const isAllCheckboxSelected = checkboxDataState.every((item) => item.isSelected);

  const onSelectAll = () =>
    onSelectAllOptions(
      isAllCheckboxSelected,
      checkboxDataState,
      onSelectCallback,
      setCheckboxDataState,
    );
  const onClick = (e: React.ChangeEvent<HTMLInputElement>, item?: MultiCheckboxData<T>) =>
    onItemClick(
      e,
      checkboxDataState,
      onSelectCallback,
      item,
      setCheckboxDataState,
      isSingleSelect,
    );

  return (
    <MultiCheckbox
      checkboxDataState={checkboxDataState}
      onItemClick={onClick}
      onSelectAll={onSelectAll}
      renderInput={renderInput}
      renderOptionSelectAll={renderOptionSelectAll}
      isAllCheckboxSelected={isAllCheckboxSelected}
    />
  );
};

const MultiCheckbox = <T,>(props: RenderInputProps<T> & MultiCheckboxCommonProps<T>) => {
  const {
    onItemClick,
    onSelectAll,
    checkboxDataState,
    renderInput,
    renderOptionSelectAll,
    isAllCheckboxSelected,
  } = props;
  return (
    <div>
      {renderOptionSelectAll &&
        renderOptionSelectAll({
          onSelectAll: onSelectAll,
          checkboxDataState,
          isAllCheckboxSelected,
        })}
      {renderInput({ onItemClick, checkboxDataState })}
    </div>
  );
};
