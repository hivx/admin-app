import { zodResolver } from '@hookform/resolvers/zod';
import { Paper, styled, ToggleButton } from '@mui/material';
import { useContext } from 'react';
import { UseFormProps } from 'react-hook-form';
import { z } from 'zod';

import { MyFormGroupUnstyled } from '@/components/Form';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { useContextMenu } from '@/hooks/useContextMenu';
import { setSelectModality } from '@/stores/qms/selectModalitySlice';

import { useGetListQmsModalityQuery } from '../../api/qmsModality';
import { ReceptionContext } from '../../providers/ReceptionProvider';
import { getTicketInfomation, setTicketInfomation } from '../../stores';
import { IQmsModalityDTO } from '../../types';

import { ModalityCardContent } from './ModalityCardContent';
import { ModalityRightClick } from './ModalityRightClick';
import { ModalitySelect } from './ModalitySelect';

type ModalityListProps = {
  id: number;
};

type ModalityItemListProps = {
  siteID: number;
};

export const ModalityItemList = (props: ModalityItemListProps) => {
  const { siteID } = props;
  const { filter } = useContext(ReceptionContext);
  const { modalityTypes } = filter;
  const { data: modalities } = useGetListQmsModalityQuery({
    filter: { modalityTypes, siteID },
  });

  const dispatch = useAppDispatch();
  const { ticketInfomation } = useAppSelector(getTicketInfomation);
  const { open } = useContextMenu();

  const formOptions: UseFormProps<ModalityListProps> = {
    mode: 'onChange',
    criteriaMode: 'all',
    resolver: zodResolver(
      z.object({
        id: z
          .number()
          .optional()
          .transform((id) => (id ? id : undefined)),
      }),
    ),
    defaultValues: {
      id: undefined,
    },
  };

  const handleSubmit = async (formData: ModalityListProps) => {
    const { id } = formData;
    dispatch(setTicketInfomation({ ...ticketInfomation, modalityID: id }));
  };

  // xếp các máy bị khóa vào cuối list hiển thị
  const getListModalitySorted = (modalities: IQmsModalityDTO[]) => {
    const listModalityEnabled: IQmsModalityDTO[] = [];
    const listModalityDisabled: IQmsModalityDTO[] = [];
    modalities.forEach((modality) => {
      if (modality.enabled) {
        listModalityEnabled.push(modality);
      } else {
        listModalityDisabled.push(modality);
      }
    });
    return listModalityEnabled.concat(listModalityDisabled);
  };

  return (
    <MyFormGroupUnstyled
      formOptions={formOptions}
      onSubmit={handleSubmit}
      autoSubmit
      renderInputs={({ control, watch, setValue }) => {
        const currentID = watch('id');
        return (
          <>
            <StyledModalityShell>
              {modalities && (
                <>
                  <ModalitySelect
                    name="id"
                    control={control}
                    ModalityButtons={getListModalitySorted(modalities.list).map(
                      (modality: IQmsModalityDTO) => {
                        return (
                          <>
                            <Paper
                              key={modality.id}
                              elevation={3}
                              sx={{ cursor: 'pointer' }}
                              onClick={() => {
                                if (!modality.enabled) {
                                  return;
                                }
                                currentID === modality.id
                                  ? setValue('id', 0)
                                  : setValue('id', modality.id);
                              }}
                              onContextMenu={(e) => {
                                dispatch(setSelectModality(modality));
                                open(e);
                                e.preventDefault();
                              }}
                            >
                              <StyledModalityBox
                                color="primary"
                                value={modality.id}
                                selected={currentID === modality.id}
                                disabled={!modality.enabled}
                              >
                                <ModalityCardContent modality={modality} />
                              </StyledModalityBox>
                            </Paper>
                          </>
                        );
                      },
                    )}
                  />
                </>
              )}
              <ModalityRightClick />
            </StyledModalityShell>
          </>
        );
      }}
    />
  );
};

const StyledModalityBox = styled(ToggleButton)`
  background-color: ${(props) => props.theme.palette.background.paper};
  width: ${(props) => props.theme.qms?.layout.qmsModalityItem.width};
  height: ${(props) => props.theme.qms?.layout.qmsModalityItem.height};
  color: ${(props) => props.theme.palette.text.primary};
  border-radius: 0px;
`;

const StyledModalityShell = styled('div')`
  height: 100%;
  padding: ${(props) => props.theme.spacing(2)};
  padding-top: ${(props) => props.theme.spacing(1)};
  padding-bottom: ${(props) => props.theme.spacing(1)};
`;
