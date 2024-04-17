import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { Stack, MenuItem, styled } from '@mui/material';
import { FC, MouseEventHandler, useState } from 'react';

import { useGetListContentsQuery } from '@/api/content';
import { useGetListContentGroupsQuery } from '@/api/contentGroup';
import { MySelect } from '@/components';
import { FullPageSpinner } from '@/components/Layout/FullPageSpinner';
import { useCurrentOrderID } from '@/features/order';
import { useAnchorElement, useAppSelector, useDisclosure } from '@/hooks';
import { useOrderLockState } from '@/hooks/lockOrder/useOrderLockState';
import { selectCurrentUser } from '@/stores/auth';
import {
  selectCurrentRequestID,
  selectContentTemplateID,
  selectRadiologyReportButtonsState,
  selectRadiologyReportPersonalContentTemplateButtonState,
} from '@/stores/OrderRadiology';
import { BaseEntity, BUTTON_STATE } from '@/types';
import { IOrderDTO } from '@/types/dto';

import { useContentTemplateSelectField } from '../../../hooks/useContentTemplateSelectField';

import { ContentTemplateSubMenu } from './ContentTemplateSubMenu';
type ContentTemplateSelectFieldProps = {
  modalityType: IOrderDTO['modalityType'];
};
const ContentTemplateSelectField: FC<ContentTemplateSelectFieldProps> = (props) => {
  const { modalityType } = props;
  const { anchorEl, isOpen, open, close } = useAnchorElement();
  const {
    isOpen: isMainMenuOpen,
    close: closeMainMenu,
    open: openMainMenu,
  } = useDisclosure();
  const orderID = useCurrentOrderID();
  const [contentGroupSelectedID, setContentGroupSelectedID] = useState<
    BaseEntity['id'] | undefined
  >();
  const requestID = useAppSelector(selectCurrentRequestID(orderID));
  const currentUser = useAppSelector(selectCurrentUser);
  const selectedContentID = useAppSelector(
    selectContentTemplateID({ orderID, requestID }),
  );
  const selectFieldState = useAppSelector(
    selectRadiologyReportButtonsState(orderID, 'CONTENT_TEMPLATE_SELECT'),
  );

  const disabled = selectFieldState === BUTTON_STATE.DISABLED;

  const selectPersonalContentTemplateState = useAppSelector(
    selectRadiologyReportPersonalContentTemplateButtonState(orderID),
  );
  const isLock = useOrderLockState({ orderID });
  useContentTemplateSelectField();
  /**
   *  Get list content group filter modality type
   */
  const { data: contentGroupData, isFetching: contentGroupIsFetching } =
    useGetListContentGroupsQuery(
      {
        filter: {
          modalityTypes: modalityType ? [modalityType] : [],
        },
      },
      { skip: !isLock },
    );
  const contentGroupList = contentGroupData?.list;

  /**
   * Get list content
   */
  const { data: contentData, isFetching: contentIsFetching } = useGetListContentsQuery(
    {
      filter: {
        modalityTypes: modalityType ? [modalityType] : [],
        groupID: contentGroupSelectedID,
      },
    },
    { skip: !isLock || !contentGroupSelectedID },
  );

  /**
   * Get list content
   */
  const { data: contentDataView } = useGetListContentsQuery(
    {
      filter: {
        modalityTypes: modalityType ? [modalityType] : [],
      },
    },
    { skip: !isLock },
  );

  const contentList = contentData?.list ?? contentDataView?.list;
  const personalContentList = contentList?.filter(
    (content) => content.user?.id === currentUser?.id,
  );

  const currentContentList = selectPersonalContentTemplateState
    ? personalContentList
    : contentList;

  const handleMouseEnter: MouseEventHandler<HTMLElement> = (e) => {
    if (e.target instanceof HTMLElement && isMainMenuOpen) {
      open(e);
      e.target.dataset['id'] &&
        setContentGroupSelectedID(parseInt(e.target.dataset['id']));
    }
  };

  /**
   * Close all menu
   */
  const handleCloseAll = () => {
    close();
    closeMainMenu();
  };

  const selectedContent = contentDataView?.list?.find(
    (content) => content.id === selectedContentID,
  );

  return (
    <Stack key={selectedContentID} direction="row" alignItems="center" spacing={1}>
      <StyledMySelect
        open={isMainMenuOpen}
        onOpen={openMainMenu}
        onClose={handleCloseAll}
        value={selectedContentID}
        size="extrasmall"
        fullWidth
        sx={{ minWidth: '250px', maxWidth: '250px', padding: 0 }}
        disabled={disabled}
        title={selectedContent?.name ?? ''}
        IconComponent={disabled ? () => <></> : undefined}
      >
        {contentGroupIsFetching &&
        contentIsFetching &&
        !selectPersonalContentTemplateState ? (
          <FullPageSpinner />
        ) : (
          []
        )}
        {contentGroupList?.map((item) => (
          <MenuItem
            key={`contentGroup-${item.id}`}
            data-id={item.id}
            title={item.name ?? ''}
            onMouseEnter={handleMouseEnter}
            onClick={() => close()}
          >
            <Stack direction="row" spacing={2}>
              <KeyboardArrowLeftIcon />
              {item.name}
            </Stack>
          </MenuItem>
        ))}
        {currentContentList?.map((item) => (
          <MenuItem
            key={`content-${item.id}`}
            value={item.id ?? ''}
            title={item.name ?? ''}
            sx={{ display: 'none' }}
          >
            {item.name}
          </MenuItem>
        ))}
      </StyledMySelect>
      {currentContentList && (
        <ContentTemplateSubMenu
          key={contentGroupSelectedID}
          isOpen={isOpen}
          close={close}
          closeAllMenu={handleCloseAll}
          anchorEl={anchorEl}
          contentList={currentContentList}
        />
      )}
    </Stack>
  );
};

export default ContentTemplateSelectField;

const StyledMySelect = styled(MySelect)`
  /* .MuiSelect-select {
    padding: 0 ${(props) => props.theme.spacing(1)};
  } */
`;
