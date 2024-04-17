import { Stack } from '@mui/material';
import React, { useCallback, useMemo } from 'react';

import { useGetListModalityTypeQuery } from '@/api/modalityType';
import { FolderIcon } from '@/assets/icon';
import { IRenderTree, MyTreeView } from '@/components';
import { SidebarLayout } from '@/components/Elements/Navigation/SidebarLayout';
import { OrderListSidebarCollapse } from '@/components/Order/Sidebar/OrderListSidebarCollapse';
import { SidebarRequestedDateWrapper } from '@/components/Order/Sidebar/OrderRequestedDate/SidebarRequestedDateWrapper';
import { OrderStatusCountWrapper } from '@/components/Order/Sidebar/StatusCount/OrderStatusCount';
import { useAppDispatch, useAppSelector, useTranslate } from '@/hooks';
import {
  ALL_CHOICE_NODE_ID,
  MODALITY_TYPE_PREFIX,
  makeModalityTypeKey,
} from '@/lib/dataHelper/modalityHelper';
import { TABLE_EXAMINATION } from '@/stores/table/tableInitialState';
import { getCurrentTableQuery } from '@/stores/table/tableSelectors';
import { setTableFilter } from '@/stores/table/tableSlice';
import { ISearchOrderFilter } from '@/types/dto';

export const ExaminationSidebar = () => {
  const translate = useTranslate();
  const dispatch = useAppDispatch();
  const query = useAppSelector(
    getCurrentTableQuery<ISearchOrderFilter>(TABLE_EXAMINATION),
  );
  const { data: modalityTypeData } = useGetListModalityTypeQuery({
    filter: {},
  });
  const modalityTypes = useMemo(
    () => modalityTypeData?.list ?? [],
    [modalityTypeData?.list],
  );

  const trees = useMemo<IRenderTree[]>(() => {
    // initialize with Select all option
    const res: IRenderTree[] = [
      {
        MyTreeItemProps: {
          nodeId: ALL_CHOICE_NODE_ID,
          label: translate.pages.orderList.selectAllOrder(),
          ContentProps: {
            labelCollapsedIcon: <FolderIcon color="primary" />,
            labelIcon: <FolderIcon color="primary" />,
          },
        },
      },
    ];

    modalityTypes.forEach((modalityType) => {
      const treeItem = {
        MyTreeItemProps: {
          nodeId: makeModalityTypeKey(modalityType.name ?? ''),
          label: modalityType.name,
          ContentProps: {
            labelCollapsedIcon: <FolderIcon color="primary" />,
            labelIcon: <FolderIcon color="primary" />,
          },
        },
      };
      res.push(treeItem);
    });

    return res;
  }, [modalityTypes, translate.pages.orderList]);

  const handleNodeSelect = useCallback<
    (event: React.SyntheticEvent, nodeId: string) => void
  >(
    (event, nodeId) => {
      if (nodeId === ALL_CHOICE_NODE_ID) {
        dispatch(
          setTableFilter({
            tableId: TABLE_EXAMINATION,
            filter: { ...query?.filter, modalityType: undefined },
          }),
        );
        return;
      }
      if (nodeId.includes(MODALITY_TYPE_PREFIX)) {
        const modalityType = nodeId.replace(MODALITY_TYPE_PREFIX, '');
        /**
         * If user clicks on Modality Group, we send all of its modalityIds to filter
         */
        dispatch(
          setTableFilter({
            tableId: TABLE_EXAMINATION,
            filter: { modalityType: modalityType },
            merge: true,
          }),
        );
      }
    },
    [dispatch, query?.filter],
  );

  return (
    <SidebarLayout
      title={translate.pages.examinationList.sidebarHeader()}
      collapsible
      MenuCollapse={
        <OrderListSidebarCollapse
          handleNodeSelect={handleNodeSelect}
          trees={trees}
          currentSelected={getCurrentNodeIdFromModalityType(query?.filter.modalityType)}
        />
      }
    >
      <Stack height={'100%'} justifyContent={'space-between'}>
        <MyTreeView
          trees={trees}
          multiSelect={false}
          onNodeSelect={handleNodeSelect}
          selected={getCurrentNodeIdFromModalityType(query?.filter.modalityType)}
        />
        <div>
          <OrderStatusCountWrapper tableID={TABLE_EXAMINATION} />
          <SidebarRequestedDateWrapper tableID={TABLE_EXAMINATION} />
        </div>
      </Stack>
    </SidebarLayout>
  );
};

/**
 * get selected node for tree
 */
const getCurrentNodeIdFromModalityType = (
  modalityType: ISearchOrderFilter['modalityType'],
): string | undefined => {
  return modalityType ? makeModalityTypeKey(modalityType) : ALL_CHOICE_NODE_ID;
};
