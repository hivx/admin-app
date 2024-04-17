import { zodResolver } from '@hookform/resolvers/zod';
import { FC } from 'react';
import { UseFormProps } from 'react-hook-form';
import { z } from 'zod';

import { MyFormTextField } from '@/components';
import { MyFormGroupUnstyled } from '@/components/Form';
import { ExpandableFormContainer } from '@/components/Form/ExpandableFormContainer';
import { MyFormPrimaryFilterField } from '@/components/Form/MyFormPrimaryFilterField';
import { TableFooterFormGroup } from '@/components/Form/TableFooterFormGroup';
import { useAppDispatch, useAppSelector, useTranslate } from '@/hooks';
import { TABLE_CERTIFICATE } from '@/stores/table/tableInitialState';
import { getCurrentTableQuery } from '@/stores/table/tableSelectors';
import { setTableFilter } from '@/stores/table/tableSlice';
import { ICertificateFilter } from '@/types/dto';
import { mapNullOrEmptyStringToUndefined } from '@/utils/format';

import { useLazyGetListCertificateQuery } from '../../api/certificate';

const DEFAULT_VALUES: ICertificateFilter = {
  name: '',
  account: '',
};

export const CertificateListFilterForm: FC = () => {
  const translate = useTranslate();
  const dispatch = useAppDispatch();
  const [trigger] = useLazyGetListCertificateQuery();
  const query = useAppSelector(
    getCurrentTableQuery<ICertificateFilter>(TABLE_CERTIFICATE),
  );
  const formOptions: UseFormProps<ICertificateFilter> = {
    mode: 'onChange',
    // form validation and pre-processing
    resolver: zodResolver(
      z.object({
        name: z.string().trim().optional().transform(mapNullOrEmptyStringToUndefined),
        account: z.string().trim().optional().transform(mapNullOrEmptyStringToUndefined),
      }),
    ),
    defaultValues: {
      name: query?.filter.name ?? '',
      account: query?.filter.account ?? '',
    },
  };
  const handleSubmit = (formData: ICertificateFilter) => {
    dispatch(setTableFilter({ tableId: TABLE_CERTIFICATE, filter: formData }));
    trigger({ ...query, filter: formData });
  };

  return (
    <TableFooterFormGroup
      formOptions={formOptions}
      onSubmit={handleSubmit}
      autoSubmit
      submitOnEnter
      renderInputs={(formControlProps) => (
        <ExpandableFormContainer
          handleSubmit={formControlProps.submit}
          renderPrimaryField={({ open, isOpen }) => (
            <MyFormPrimaryFilterField
              name="name"
              control={formControlProps.control}
              handleSubmit={formControlProps.submit}
              handleExpand={open}
              isExpanded={isOpen}
              resetFormOnDirty={false}
              isFormDirty={formControlProps.formState.isDirty}
              handleReset={() => formControlProps.reset(DEFAULT_VALUES)}
              MyTextFieldProps={{
                placeholder: translate.resources.certificate.name(),
                fullWidth: true,
                onKeyDown: formControlProps.onKeyDown,
              }}
            />
          )}
          ExtraFieldsComponent={
            <MyFormTextField
              name="account"
              control={formControlProps.control}
              MyTextFieldProps={{
                label: translate.resources.certificate.account(),
                placeholder: translate.resources.certificate.account(),
                fullWidth: true,
                onKeyDown: formControlProps.onKeyDown,
              }}
            />
          }
        />
      )}
    ></TableFooterFormGroup>
  );
};
