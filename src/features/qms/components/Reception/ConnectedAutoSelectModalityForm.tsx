import { Box, Typography } from '@mui/material';
import { useContext } from 'react';
import { UseFormProps } from 'react-hook-form';

import { MyCheckbox } from '@/components';
import { MyFormMultiCheckbox } from '@/components/Elements/Inputs/MyFormMultiCheckbox';
import { MyFormGroupUnstyled } from '@/components/Form';
import { FullPageSpinner } from '@/components/Layout/FullPageSpinner';
import { useTranslate } from '@/hooks';

import { usePrintMultiTicket } from '../../hooks/usePrintMultiTicket';
import {
  ReceptionContext,
  useRegisterReceptionFunctions,
} from '../../providers/ReceptionProvider';

type ProcedureSelect = {
  procedureCodes: string[];
};

export type AutoSelectModalityFormProps = {
  siteID: number;
};

type ConnectedAutoSelectModalityFormProps = {
  siteID: number;
};

export const ConnectedAutoSelectModalityForm = (
  props: ConnectedAutoSelectModalityFormProps,
) => {
  const { siteID } = props;

  return <AutoSelectModalityForm siteID={siteID} />;
};

const AutoSelectModalityForm = (props: AutoSelectModalityFormProps) => {
  const translate = useTranslate();
  const { filter } = useContext(ReceptionContext);

  const register = useRegisterReceptionFunctions();

  const { printTicket } = usePrintMultiTicket();

  const formOptions: UseFormProps<ProcedureSelect> = {
    mode: 'onChange',
    criteriaMode: 'all',
    defaultValues: {},
  };

  /**
   *
   * submit print ticket in AutoSelectModalityForm
   */
  const handleSubmit = async (formData: ProcedureSelect) => {
    printTicket(
      {
        checkIn: filter.checkIn,
        fromDate: filter.fromDate,
        toDate: filter.toDate,
        pid: filter.pid,
      },
      props.siteID,
    );
  };

  // In phieu nhanh khong con thao tac theo luong click 'in phieu' ->  hien thi form -> click submit 'in'
  return (
    // <MyFormGroupUnstyled
    //   registerFormFunctions={(formInstance) =>
    //     register(
    //       'submitFormAutoSelectModality',
    //       () => formInstance.submit && formInstance.submit(),
    //     )
    //   }
    //   formOptions={formOptions}
    //   onSubmit={handleSubmit}
    //   submitOnEnter
    //   renderInputs={({ control }) => {
    //     return (
    //       <>
    //         <MyFormMultiCheckbox
    //           control={control}
    //           name="procedureCodes"
    //           renderInput={({ field }) => {
    //             return (
    //               <>
    //                 {execModalityData &&
    //                   Object.values(execModalityData).map((modality) => (
    //                     <>
    //                       <Typography key={modality.roomName}>
    //                         {translate.pages.reception.roomName()} {modality.roomName}
    //                       </Typography>
    //                       <>
    //                         {modality.ticketProcedures &&
    //                           modality.ticketProcedures.map((item, index) => {
    //                             return (
    //                               <Box key={index} display="flex" alignItems="center">
    //                                 <MyCheckbox
    //                                   key={item.procedureCode}
    //                                   defaultValue={0}
    //                                   disabled
    //                                   {...field}
    //                                   defaultChecked
    //                                   value={item.procedureCode}
    //                                   onChange={(e) => {
    //                                     let valueCopy = field.value as string[];
    //                                     if (e.target.checked) {
    //                                       valueCopy.push(e.target.value);
    //                                     } else {
    //                                       valueCopy = valueCopy.filter(
    //                                         (item) => item !== e.target.value,
    //                                       );
    //                                     }
    //                                     field.onChange(valueCopy);
    //                                   }}
    //                                   checked={(field.value as string[])?.includes(
    //                                     item.procedureCode,
    //                                   )}
    //                                 />
    //                                 <Typography>{item.procedureName}</Typography>
    //                               </Box>
    //                             );
    //                           })}
    //                       </>
    //                     </>
    //                   ))}
    //               </>
    //             );
    //           }}
    //         />
    //       </>
    //     );
    //   }}
    // />
    <></>
  );
};
