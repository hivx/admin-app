import React, { useState } from 'react';
import { FieldValues } from 'react-hook-form';

import { MyFormSelectField, MyFormSelectFieldProps } from './MyFormSelectField';
import { MyTextField } from './MyTextField';

enum CustomSelectFieldState {
  DISABLED = 'DISABLED',
  NON_CLICKED = 'NON_CLICKED',
  CLICKED = 'CLICKED',
}

type RenderSelectFieldType<T extends FieldValues, K> = (props: {
  listData: K[];
  formSelectFieldProps: MyFormSelectFieldProps<T>;
}) => React.ReactElement;

type MyLazyFormSelectFieldProps<T extends FieldValues, K> = MyFormSelectFieldProps<T> & {
  /**
   * Value for text field
   */
  disableValue?: string;
  /**
   * Func get data
   */
  onGetListRecord: () => Promise<K[]>;
  /**
   * Func render Select Field
   */
  renderSelectField: RenderSelectFieldType<T, K>;
};

/**
 * Display some type of select field,
 * When select field disabled -> display text field
 * When select field not disabled and not clicked -> display select field with fake data
 * When select field clicked -> display select field with data
 * K is a generic type for list to display select menu
 */
export const MyLazyFormSelectField = <T extends FieldValues, K>(
  props: MyLazyFormSelectFieldProps<T, K>,
) => {
  const { disableValue, onGetListRecord, renderSelectField, ...rest } = props;
  const [listData, setListData] = useState<K[]>([]);
  const disabled = props.MySelectProps?.disabled;

  const customFieldState = getCustomFieldState(
    props.MySelectProps?.disabled ?? false,
    listData,
  );

  /**
   * When FakeSelectField selected ,get data from API and set to listData state
   */
  const onOpenSelectField = async (event: React.SyntheticEvent<Element, Event>) => {
    const data = await onGetListRecord();
    setListData(data);
  };

  /**
   * return FakeSelectField
   * FakeSelectField display when field active and not clicked
   */
  const renderFakeSelectField = () => {
    return (
      <MyFormSelectField
        {...rest}
        MySelectProps={{
          ...rest.MySelectProps,
          onOpen: onOpenSelectField,
          renderValue: () => <div>{disableValue}</div>,
        }}
      ></MyFormSelectField>
    );
  };
  /**
   * Get field rendering by customFieldState
   *
   * If customFieldState = DISABLED --> render disabled TextField
   *
   * If customFieldState = NON_CLICKED --> render FakeSelectField
   *
   * If customFieldState = CLICKED --> render SelectField
   */
  const renderLazyFormSelectField = () => {
    switch (customFieldState) {
      case CustomSelectFieldState.DISABLED:
        return (
          <MyTextField
            size={props.MySelectProps?.size || 'small'}
            fullWidth
            value={disableValue}
            disabled={disabled}
            label={props.MySelectProps?.label}
            required={props.required}
          />
        );
      case CustomSelectFieldState.NON_CLICKED:
        return renderFakeSelectField();
      case CustomSelectFieldState.CLICKED:
        return renderSelectField({
          listData: listData,
          formSelectFieldProps: rest,
        });
    }
  };

  return <>{renderLazyFormSelectField()}</>;
};

/**
 * Func get select field state
 */
function getCustomFieldState<K>(disabled: boolean, listData: K[]) {
  if (disabled) {
    return CustomSelectFieldState.DISABLED;
  }
  if (!listData.length) {
    return CustomSelectFieldState.NON_CLICKED;
  } else {
    return CustomSelectFieldState.CLICKED;
  }
}
