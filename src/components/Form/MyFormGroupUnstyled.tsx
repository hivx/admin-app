import {
  ComponentProps,
  KeyboardEvent,
  MutableRefObject,
  ReactElement,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
} from 'react';
import {
  FieldValues,
  useForm,
  UseFormHandleSubmit,
  UseFormProps,
  UseFormReturn,
} from 'react-hook-form';

import { FormAutoSubmitter } from './FormAutoSubmitter';
export interface IFormControlInputProps<T extends FieldValues> extends UseFormReturn<T> {
  onKeyDown: (event: KeyboardEvent<HTMLElement>) => void;
  submit: ReturnType<UseFormHandleSubmit<T>>;
}
export interface MyFormGroupUnstyledProps<T extends FieldValues> {
  /**
   * className passed down by styled-components
   */
  className?: string;
  /**
   * Form Options from react-hook-form with type UseFormProps<T>
   * @required
   */
  formOptions: UseFormProps<T>;
  /**
   * Optional ref object to assign custom form functions and state
   * @default undefined
   */
  formRef?: MutableRefObject<AccessibleFormInstance<T>>;
  /**
   * If enabled, will submit on user Enter keypress
   * @required
   */
  submitOnEnter?: boolean;
  /**
   * If true, will auto submit when change input
   */
  autoSubmit?: boolean;
  /**
   * If auto submit is on, define submit delay after user stops input in ms
   * @default 500
   */
  submitDelay?: number;
  /**
   * Custom onSubmit function with T as inputs
   * Will run on form submit
   * @required
   */
  onSubmit: (payload: T) => void;
  /**
   * Custom Input Components to be rendered in the form
   * @required
   */
  renderInputs: (data: IFormControlInputProps<T>) => ReactNode;
  /**
   * Custom submit button to be rendered in the form
   * @default undefined
   */
  renderSubmit?: (data: IFormControlInputProps<T>) => ReactNode;
  /**
   * Allow external ref to access this form's utility functions
   * This is an alternative way to formRef
   */
  registerFormFunctions?: (args: AccessibleFormInstance<T>) => void;
  /**
   * Props of form element
   */
  formProps?: ComponentProps<'form'>;
}
/**
 * Accessible form functions and state from outside this component
 * Must provide formRef to get access to these properties
 */
export type AccessibleFormInstance<T extends FieldValues> = {
  submit?: ReturnType<UseFormHandleSubmit<T>>;
} & UseFormReturn<T>;
/**
 * A form wrapper with its own state and functions to handle:
 * onSubmit events
 * Press enter to submit
 */
export function MyFormGroupUnstyled<T extends FieldValues>(
  props: MyFormGroupUnstyledProps<T>,
): ReactElement {
  const {
    renderInputs,
    renderSubmit,
    onSubmit,
    registerFormFunctions,
    formOptions,
    autoSubmit,
    submitDelay = 500,
    className,
    submitOnEnter,
    formRef,
    formProps,
  } = props;
  const methods = useForm<T>(formOptions);
  const { handleSubmit, formState } = methods;
  const execSubmit = useMemo(
    () => handleSubmit(async (data) => await onSubmit(data)),
    [handleSubmit, onSubmit],
  );

  const onKeyDown: IFormControlInputProps<T>['onKeyDown'] = useCallback(
    (event) => {
      if (submitOnEnter) {
        event.code === 'Enter' && execSubmit();
      }
    },
    [execSubmit, submitOnEnter],
  );
  /**
   * Define accessible form values from outside
   */
  useEffect(() => {
    const accessibleFormInstance = {
      ...methods,
      submit: execSubmit,
    };
    if (formRef?.current) {
      formRef.current = accessibleFormInstance;
    }
    if (registerFormFunctions) {
      registerFormFunctions(accessibleFormInstance);
    }
  }, [execSubmit, formRef, methods, registerFormFunctions]);

  const controls: IFormControlInputProps<T> = useMemo(
    () => ({
      onKeyDown,
      submit: execSubmit,
      ...methods,
    }),
    [execSubmit, methods, onKeyDown],
  );

  if (Object.keys(formState.errors).length) {
    undefined;
  }
  return (
    <form className={className} onSubmit={execSubmit} {...formProps}>
      {renderInputs(controls)}
      {renderSubmit && renderSubmit(controls)}
      {autoSubmit && (
        <FormAutoSubmitter<T>
          watch={methods.watch}
          submitDelay={submitDelay}
          execSubmit={execSubmit}
        />
      )}
    </form>
  );
}
MyFormGroupUnstyled.displayName = 'MyFormGroupUnstyled';
