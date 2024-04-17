import React from 'react';
import { UseFormGetValues, FieldValues, Control } from 'react-hook-form';

import { MyFormHtmlEditor } from '@/components/Form/MyFormHtmlEditor';
import { useDisclosure, useTranslate } from '@/hooks';

import { ILayoutFormFields } from './LayoutFormFields';
import { PreviewPdfModal } from './PreviewPdfModal';

type LayoutHtmlEditorPorps<T extends FieldValues> = {
  getValues: UseFormGetValues<ILayoutFormFields>;
  control?: Control<T>;
};

export const LayoutHtmlEditor = (props: LayoutHtmlEditorPorps<ILayoutFormFields>) => {
  const { getValues, control } = props;
  const disclosure = useDisclosure();

  const translate = useTranslate();
  return (
    <>
      <PreviewPdfModal disclosure={disclosure} getValues={getValues} />
      <MyFormHtmlEditor
        name="data"
        control={control}
        required
        label={translate.resources.layout.data()}
        placeholder={translate.resources.layout.data()}
        MyHtmlEditorProp={{
          customAddButtons: [
            {
              name: 'viewpdf',
              options: {
                text: 'View PDF',
                onAction() {
                  disclosure.open();
                },
                tooltip: 'View PDF',
              },
            },
          ],
        }}
      />
    </>
  );
};
