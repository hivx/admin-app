import { useRef } from 'react';
import { Control, Controller, FieldPath, FieldValues } from 'react-hook-form';

import { uuidv4 } from '@/utils/uuidv4';

import { IHtmlEditorProps } from '../Editor/HtmlEditor';
import { HtmlEditorWithLabel } from '../Editor/HtmlEditorWithLabel';
import { ErrorTooltip } from '../Elements/Tooltip/ErrorTooltip';

export type MyFormHtmlEditorProps<T extends FieldValues> = {
  name: FieldPath<T>;
  control?: Control<T>;
  /**
   * @default true
   */
  label?: string;
  required?: boolean;
  placeholder?: string;
  MyHtmlEditorProp?: IHtmlEditorProps;
};

export const MyFormHtmlEditor = <T extends FieldValues>(
  props: MyFormHtmlEditorProps<T>,
) => {
  const { control, name } = props;
  const fieldState = control?.getFieldState(name);
  const errorMessage = fieldState?.error?.message;

  const textFieldRef = useRef<HTMLDivElement>(null); // for tooltip to get anchor position
  return (
    <Controller
      name={props.name}
      control={props.control}
      render={({ field }) => {
        return (
          <>
            <ErrorTooltip
              errorMessage={errorMessage}
              fieldRef={textFieldRef}
              key={uuidv4()} // create a new component when re-render
            />
            {/* <Box ref={textFieldRef}> */}
            <HtmlEditorWithLabel
              ref={textFieldRef}
              label={props.label}
              onEditorChange={(value) => {
                field.onChange(value);
              }}
              value={field.value}
              placeholder={props.placeholder}
              error={!!errorMessage}
              required={props.required}
              {...props.MyHtmlEditorProp}
            />
            {/* </Box> */}
          </>
        );
      }}
    />
  );
};
