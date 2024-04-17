import { forwardRef, useState } from 'react';

import { MyFormLabel } from '../Form/MyFormLabel';

import { HtmlEditor, IHtmlEditorProps } from './HtmlEditor';

type HtmlEditorWithLabelProps = {
  label?: string;
  error?: boolean;
  required?: boolean;
} & IHtmlEditorProps;

/**
 * Wrap HtmlEditor with MUI-like label
 */
export const HtmlEditorWithLabel = forwardRef<HTMLElement, HtmlEditorWithLabelProps>(
  (props, ref) => {
    const { label, onFocus, onBlur, onChange, error, required, ...rest } = props;
    const [focused, setFocused] = useState<boolean>(false);
    const [isFilled, setIsFilled] = useState<boolean>(!!rest.initialValue);
    return (
      <MyFormLabel
        label={label}
        focused={focused}
        isFilled={isFilled || !!rest.value}
        InputLabelProps={{ error, required }}
        alwaysShrinkLabel={!rest.inline}
      >
        <HtmlEditor
          ref={ref}
          onFocus={(e, editor) => {
            setFocused(true);
            onFocus && onFocus(e, editor);
          }}
          onBlur={(e, editor) => {
            setFocused(false);
            onBlur && onBlur(e, editor);
          }}
          onChange={(e, editor) => {
            setIsFilled(!!editor.getContent().length);
            onChange && onChange(e, editor);
          }}
          {...rest}
        />
      </MyFormLabel>
    );
  },
);

HtmlEditorWithLabel.displayName = 'HtmlEditorWithLabel';
