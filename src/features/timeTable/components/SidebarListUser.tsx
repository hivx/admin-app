import { zodResolver } from '@hookform/resolvers/zod';
import { Stack, Typography, lighten, styled } from '@mui/material';
import { UseFormProps } from 'react-hook-form';
import { z } from 'zod';

import { MyCheckbox } from '@/components';
import { MyFormMultiCheckbox } from '@/components/Elements/Inputs/MyFormMultiCheckbox';
import { MultiCheckboxController } from '@/components/Elements/Inputs/MyMultiCheckboxController';
import { MyFormGroupUnstyled } from '@/components/Form';
import { CollapsibleBoxLayout } from '@/components/Order/Sidebar/CollapsibleBox/CollapsibleBoxLayout';
import { useAppDispatch, useAppSelector, useTranslate } from '@/hooks';
import { TABLE_SCHEDULE } from '@/stores/table/tableInitialState';
import { getCurrentTableQuery } from '@/stores/table/tableSelectors';
import { setTableFilter } from '@/stores/table/tableSlice';

import { useSidebarUserData } from '../hook/useSidebarUserData';

import { SideBarTimetableFilter } from './SidebarCalendar';

type SidebarListUserForm = {
  userIDs: number[];
};

export const SidebarListUser = () => {
  const translate = useTranslate();
  const dispatch = useAppDispatch();
  const query = useAppSelector(
    getCurrentTableQuery<SideBarTimetableFilter>(TABLE_SCHEDULE),
  );

  const checkboxData = useSidebarUserData();

  const formOptions: UseFormProps<SidebarListUserForm> = {
    mode: 'onBlur',
    criteriaMode: 'all',
    resolver: zodResolver(
      z.object({
        userIDs: z.array(z.number()).optional(),
      }),
    ),
    defaultValues: {
      userIDs: query?.filter.userIDs,
    },
  };

  const handleSubmit = (formData: SidebarListUserForm) => {
    dispatch(
      setTableFilter({
        tableId: TABLE_SCHEDULE,
        filter: { ...query?.filter, userIDs: formData.userIDs },
      }),
    );
  };
  return (
    <CollapsibleBoxLayout title={'Lịch theo tên'} collapsible>
      <MyFormGroupUnstyled
        onSubmit={handleSubmit}
        autoSubmit
        formOptions={formOptions}
        renderInputs={(controls) => (
          <MyFormMultiCheckbox
            control={controls.control}
            name="userIDs"
            renderInput={(field) => {
              return (
                <Stack
                  padding={1}
                  spacing={0.5}
                  style={{ maxHeight: '25vh', overflow: 'auto' }}
                >
                  <MultiCheckboxController
                    value={checkboxData}
                    onSelectCallback={(data) => {
                      const userSelected = data.map((item) => {
                        if (item.isSelected) return item.data?.id;
                      });
                      field.onChange(userSelected.filter((item) => item));
                    }}
                    renderOptionSelectAll={({ onSelectAll, isAllCheckboxSelected }) => {
                      return (
                        <>
                          <StyledSelectItemWrapper>
                            <StyledCheckboxAndTitleWrapper>
                              <StyledStatusCheckbox
                                value={''}
                                onChange={(e) => {
                                  onSelectAll && onSelectAll(e);
                                }}
                                checked={isAllCheckboxSelected}
                              />
                              <Typography>{translate.buttons.all()}</Typography>
                            </StyledCheckboxAndTitleWrapper>
                          </StyledSelectItemWrapper>
                        </>
                      );
                    }}
                    renderInput={({ onItemClick, checkboxDataState }) => {
                      return (
                        <>
                          {checkboxDataState.map((item, index) => {
                            return (
                              <StyledSelectItemWrapper key={index}>
                                <StyledCheckboxAndTitleWrapper>
                                  <StyledStatusCheckbox
                                    value={item.data?.id}
                                    onChange={(e) => {
                                      onItemClick && onItemClick(e, item);
                                    }}
                                    checked={item.isSelected}
                                  />
                                  <Typography>{item.data?.fullname}</Typography>
                                </StyledCheckboxAndTitleWrapper>
                                <StyledUserType>{item.data?.title}</StyledUserType>
                              </StyledSelectItemWrapper>
                            );
                          })}
                        </>
                      );
                    }}
                  />
                </Stack>
              );
            }}
          />
        )}
      />
    </CollapsibleBoxLayout>
  );
};

const StyledSelectItemWrapper = styled(Stack)`
  padding: ${(props) => props.theme.spacing(0.25)} 0;
  flex-direction: row;
  justify-content: space-between;
`;

const StyledCheckboxAndTitleWrapper = styled(Stack)`
  flex-direction: row;
  align-items: center;
  gap: ${(props) => props.theme.spacing(1)};
`;
const StyledStatusCheckbox = styled(MyCheckbox)`
  padding: 0;
`;
const StyledUserType = styled(Typography)`
  color: ${(props) => lighten(props.theme.palette.text.primary, 0.5)};
`;
