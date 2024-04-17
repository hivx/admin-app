import { FieldValues } from 'react-hook-form';

import { IFormControlInputProps } from '@/components/Form';

import { IMwlBase } from '../../types';
import { ITicketProcedure } from '../../types/procedure';

import { ProceduresCheckedInWrapper } from './ProceduresCheckedInWrapper';
import { ProceduresNotCheckedInCheckbox } from './ProceduresNotCheckedInCheckbox';

type ServiceInfomationWrapperProps = {
  name: string;
  controls: IFormControlInputProps<FieldValues>;
  procedures: ITicketProcedure[];
  mwlData?: IMwlBase;
};
export const TITLE_FONT_WEIGHT = 600;

export const ServiceInfomationWrapper = (props: ServiceInfomationWrapperProps) => {
  const { controls, name, procedures, mwlData } = props;

  const proceduresCheckedIn = procedures.filter((item) => !!item.ticketNumber);

  const proceduresNotCheckedIn = procedures.filter((item) => !item.ticketNumber);

  return (
    <>
      <ProceduresCheckedInWrapper
        proceduresCheckedIn={proceduresCheckedIn}
        mwlData={mwlData}
      />
      <>
        {proceduresNotCheckedIn.length !== 0 && (
          <ProceduresNotCheckedInCheckbox
            control={controls.control}
            name="serviceIDs"
            proceduresNotCheckedIn={proceduresNotCheckedIn}
            watch={controls.watch}
          />
        )}
      </>
    </>
  );
};
