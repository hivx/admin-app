import { zodResolver } from '@hookform/resolvers/zod';
import { styled } from '@mui/material';
import { useContext } from 'react';
import { UseFormProps } from 'react-hook-form';
import { z } from 'zod';

import { MyFormGroupUnstyled } from '@/components/Form';
import { useAppDispatch, useAppSelector, useTranslate } from '@/hooks';
import { printDocumentHTML } from '@/lib/dataHelper/htmlElementHelper';
import {
  useGenericNotifySnackbar,
  useNotifySnackbar,
} from '@/providers/NotificationProvider';
import { getisAutoSelectModalityed } from '@/stores/qms/autoSelectSlice';

import { useGetListMwlQuery } from '../../api/mwl';
import { useCreateTicketMutation } from '../../api/ticket';
import { getProcedureInfomation } from '../../lib/dataHelper/getProcedureInfomation';
import {
  ReceptionContext,
  useRegisterReceptionFunctions,
  useReceptionFunctions,
} from '../../providers/ReceptionProvider';
import { getTicketInfomation, setTicketInfomation } from '../../stores';
import { IMwlBase } from '../../types';
import { ITicketProcedure } from '../../types/procedure';

import { generateTicketHTML } from './generateTicketHTML';
import { InfomationShell } from './InfomationShell';
import { PatientInfomationWrapper } from './PatientInfomationWrapper';
import { ServiceInfomationWrapper } from './ServiceInfomationWrapper';

export type InfomationTypes = {
  serviceIDs?: number[];
};

type ConnectedTicketInfomationFormProps = {
  siteID: number;
};

type TicketInfomationFormProps = {
  procedures: ITicketProcedure[];
  mwlData: IMwlBase;
};

export const HEIGHT_INFOMATION_CONTENT = {
  RECEPTION: '25%',
  PATIENT: '30%',
  SERVICES: '40%',
};

export const ConnectedTicketInfomationForm = (
  props: ConnectedTicketInfomationFormProps,
) => {
  const translate = useTranslate();
  const { filter } = useContext(ReceptionContext);

  const { pid, checkIn, fromDate, toDate } = filter;
  const { data } = useGetListMwlQuery(
    { filter: { pid, checkIn, fromDate, toDate, siteID: props.siteID } },
    { skip: !pid },
  );

  const mwlData = data?.list[0];

  const { procedures } = getProcedureInfomation({ mwlListData: data?.list });

  const isDisplayForm = pid && mwlData && procedures && procedures.length !== 0;
  return (
    <>
      {isDisplayForm ? (
        // Tạo component mới ứng với pid
        <TicketInfomationForm
          key={mwlData.pid}
          mwlData={mwlData}
          procedures={procedures}
        />
      ) : (
        <>
          <PatientInfomationWrapper />
          <InfomationShell
            label={translate.pages.reception.servicesInfomation()}
            key={3}
            height={HEIGHT_INFOMATION_CONTENT.SERVICES}
          />
        </>
      )}
    </>
  );
};

const TicketInfomationForm = (props: TicketInfomationFormProps) => {
  const { mwlData, procedures } = props;
  const notifyModal = useNotifySnackbar();
  const translate = useTranslate();
  const [createTicket] = useCreateTicketMutation();

  const dispatch = useAppDispatch();
  const { ticketInfomation } = useAppSelector(getTicketInfomation);

  const isAutoSelectModality = useAppSelector(getisAutoSelectModalityed);

  const { address, birthDate, patientName, pid, gender } = mwlData;

  const register = useRegisterReceptionFunctions();
  const receptionFunctions = useReceptionFunctions();
  const proceduresNotCheckedIn = procedures.filter((item) => !item.ticketNumber);

  const formOptions: UseFormProps<InfomationTypes> = {
    mode: 'onChange',
    criteriaMode: 'all',
    resolver: zodResolver(
      z.object({
        serviceIDs: z.array(z.number()).optional(),
      }),
    ),
    defaultValues: {
      serviceIDs: proceduresNotCheckedIn.map((item) => item.serviceID),
    },
  };

  const notifySuccess = useGenericNotifySnackbar(
    'success',
    translate.messages.titles.createResource({
      resource: translate.pages.reception.ticket().toLowerCase(),
    }),
  );

  const notifyError = useGenericNotifySnackbar(
    'error',
    translate.messages.titles.createResource({
      resource: translate.pages.reception.ticket().toLowerCase(),
    }),
  );

  const handleSubmit = async (formData: InfomationTypes) => {
    const { serviceIDs } = formData;
    // lấy ra mảng object procedure theo serviceID đã select
    const selectedProcedure = procedures?.filter(
      (item) => serviceIDs && serviceIDs.includes(item.serviceID) && !item.ticketNumber,
    );

    dispatch(
      setTicketInfomation({
        ...ticketInfomation,
        address,
        birthDate,
        patientName,
        pid,
        gender,
        services: selectedProcedure,
      }),
    );
  };

  /**
   *
   * func when click button 'In phiếu'
   *
   */
  const printTicketCraft = async () => {
    const { modalityID, services } = ticketInfomation;

    const execServices = services ? services : proceduresNotCheckedIn;

    if (pid && modalityID && execServices && execServices.length !== 0) {
      try {
        const res = await createTicket({
          address,
          birthDate,
          patientName,
          pid,
          gender,
          services: execServices,
          modalityID,
        });
        if ('error' in res) {
          notifyError();
        } else {
          notifySuccess();
          const ticketData = res.data;
          const externalDoc = await generateTicketHTML({
            ...ticketData,
            roomName: ticketData.modality?.roomName ?? '',
          });
          printDocumentHTML(externalDoc);
          receptionFunctions.clearPID();
          receptionFunctions.autoFocusPID();
        }
      } catch (e) {
        notifyError();
      }
    } else {
      notifyModal({
        message: `Vui lòng chọn đủ thông tin phiếu in`,
        options: {
          variant: 'warning',
        },
      });
    }
  };

  return (
    <>
      <StyledTicketFormWrapper
        registerFormFunctions={(formInstance) =>
          register(
            'submitTicketInfomationForm',
            () => formInstance.submit && formInstance.submit(),
          )
        }
        formOptions={formOptions}
        autoSubmit
        onSubmit={handleSubmit}
        submitOnEnter
        renderInputs={(controls) => {
          return (
            <>
              <PatientInfomationWrapper
                mwlData={mwlData}
                printTicket={printTicketCraft}
              />
              <InfomationShell
                label={translate.pages.reception.servicesInfomation()}
                key={3}
                height={HEIGHT_INFOMATION_CONTENT.SERVICES}
                Content={
                  <ServiceInfomationWrapper
                    mwlData={mwlData}
                    controls={controls}
                    name="serviceIDStrings"
                    procedures={procedures}
                  />
                }
              />
            </>
          );
        }}
      />
    </>
  );
};

const StyledTicketFormWrapper = styled(MyFormGroupUnstyled)`
  height: 100%;
`;
