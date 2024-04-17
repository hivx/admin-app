import { debounce } from 'lodash';
import { useEffect } from 'react';
import { FieldValues, useForm } from 'react-hook-form';

type FormAutoSubmitterProps<T extends FieldValues> = {
  watch: ReturnType<typeof useForm<T>>['watch'];
  execSubmit: () => void;
  submitDelay: number;
};
/**
 * Component to watch and run submit function with debounce
 */
export const FormAutoSubmitter = <T extends FieldValues>(
  props: FormAutoSubmitterProps<T>,
) => {
  const { watch, execSubmit, submitDelay } = props;
  useEffect(() => {
    const debouncedSubmit = debounce(() => {
      execSubmit();
    }, submitDelay);
    const subscription = watch(debouncedSubmit);
    return () => subscription.unsubscribe();
  }, [execSubmit, submitDelay, watch]);
  return <></>;
};
