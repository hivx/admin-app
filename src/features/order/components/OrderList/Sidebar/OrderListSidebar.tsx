import { Stack } from '@mui/material';
import { useCallback, useEffect, useMemo } from 'react';

import { useGetListModalityQuery } from '@/api/modality';
import { FolderIcon, ItechIconModality } from '@/assets/icon';
import { IRenderTree, MyTreeView } from '@/components';
// import { useAppDispatch } from '@/hooks';
import { SidebarLayout } from '@/components/Elements/Navigation/SidebarLayout';
import { OrderListSidebarCollapse } from '@/components/Order/Sidebar/OrderListSidebarCollapse';
import { SidebarRequestedDateWrapper } from '@/components/Order/Sidebar/OrderRequestedDate/SidebarRequestedDateWrapper';
import { OrderStatusCountWrapper } from '@/components/Order/Sidebar/StatusCount/OrderStatusCount';
import { useAppDispatch, useAppSelector, useTranslate } from '@/hooks';
import {
  ALL_CHOICE_NODE_ID,
  MODALITY_GROUP_PREFIX,
  MODALITY_PREFIX,
  makeModalityKey,
  modalitiesByGroup,
} from '@/lib/dataHelper/modalityHelper';
import { TABLE_ORDER } from '@/stores/table/tableInitialState';
import { getCurrentTableQuery } from '@/stores/table/tableSelectors';
import { setTableFilter } from '@/stores/table/tableSlice';
import { BaseEntity } from '@/types';
import { IModalityDTO, ISearchOrderFilter } from '@/types/dto';

// configure ID Prefixes for node select handling

export const OrderListSidebar = () => {
  // const dispatch = useAppDispatch();
  const query = useAppSelector(getCurrentTableQuery<ISearchOrderFilter>(TABLE_ORDER));
  const { data: modalityData } = useGetListModalityQuery({
    filter: {},
  });
  const dispatch = useAppDispatch();
  const translate = useTranslate();

  const modalitiesByGroupData = useMemo(
    () => modalitiesByGroup(modalityData?.list),
    [modalityData?.list],
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

    modalitiesByGroupData.forEach((modalities, groupKey) => {
      const treeItem = {
        MyTreeItemProps: {
          nodeId: groupKey,
          label: groupKey.replace(MODALITY_GROUP_PREFIX, ''),
          ContentProps: {
            labelCollapsedIcon: <FolderIcon color="primary" />,
            labelIcon: <FolderIcon color="primary" />,
          },
        },
        children: modalities.map((modality) => ({
          MyTreeItemProps: {
            nodeId: makeModalityKey(modality.id),
            label: modality.name,
            ContentProps: {
              labelIcon: <ItechIconModality color="primary" />,
            },
          },
        })),
      };
      res.push(treeItem);
    });

    return res;
  }, [modalitiesByGroupData, translate.pages.orderList]);
  const handleNodeSelect = useCallback<
    (event: React.SyntheticEvent, nodeId: string) => void
  >(
    (event, nodeId) => {
      if (nodeId === ALL_CHOICE_NODE_ID) {
        dispatch(
          setTableFilter({
            tableId: TABLE_ORDER,
            filter: { modalityIDs: modalityData?.list.map((modality) => modality.id) },
            merge: true,
          }),
        );
        return;
      }
      if (nodeId.includes(MODALITY_GROUP_PREFIX)) {
        /**
         * If user clicks on Modality Group, we send all of its modalityIds to filter
         */
        const modalityGroup = modalitiesByGroupData.get(nodeId);
        dispatch(
          setTableFilter({
            tableId: TABLE_ORDER,
            filter: { modalityIDs: modalityGroup?.map((modality) => modality.id) },
            merge: true,
          }),
        );
      } else {
        /**
         * If user clicks on a modality, we send only its modalityId to filter
         */
        const modalityId = nodeId.replace(MODALITY_PREFIX, '');
        dispatch(
          setTableFilter({
            tableId: TABLE_ORDER,
            filter: { modalityIDs: [parseInt(modalityId)] },
            merge: true,
          }),
        );
      }
    },
    [dispatch, modalitiesByGroupData, modalityData?.list],
  );
  /**
   * If we have a new list, set filter to this list
   * this is useful when first loading the page, so that
   * we can load the orders with these modalityIDs
   */
  useEffect(() => {
    if (modalityData?.list.length && !query?.filter.modalityIDs?.length) {
      dispatch(
        setTableFilter({
          tableId: TABLE_ORDER,
          filter: { modalityIDs: modalityData?.list.map((modality) => modality.id) },
          merge: true,
        }),
      );
    }
  }, [dispatch, modalityData?.list, query]);

  const defaultExpanded = Array.from(modalitiesByGroupData.keys());
  return (
    <SidebarLayout
      title={translate.pages.orderList.sidebarHeader()}
      collapsible
      MenuCollapse={
        <OrderListSidebarCollapse
          trees={trees}
          handleNodeSelect={handleNodeSelect}
          currentSelected={getCurrentNodeIdFromModalityIDs(
            query?.filter.modalityIDs || [],
            modalitiesByGroupData,
          )}
        />
      }
    >
      {modalityData ? (
        <Stack height={'100%'} justifyContent={'space-between'}>
          <MyTreeView
            trees={trees}
            multiSelect={false}
            defaultExpanded={defaultExpanded}
            onNodeSelect={handleNodeSelect}
            selected={getCurrentNodeIdFromModalityIDs(
              query?.filter.modalityIDs || [],
              modalitiesByGroupData,
            )}
          />
          <div>
            <OrderStatusCountWrapper tableID={TABLE_ORDER} />
            <SidebarRequestedDateWrapper tableID={TABLE_ORDER} />
          </div>
        </Stack>
      ) : (
        <></>
      )}
    </SidebarLayout>
  );
};

const getCurrentNodeIdFromModalityIDs = (
  modalityIDs: BaseEntity['id'][],
  modalitiesByGroupData: Map<string, IModalityDTO[]>,
): string | undefined => {
  if (!modalityIDs.length) return;
  if (modalityIDs.length === 1) {
    // single modality selected
    return makeModalityKey(modalityIDs[0]);
  } else {
    // multiple modality, check if it belongs to a group
    const sortFn = (a: BaseEntity['id'], b: BaseEntity['id']) => a - b;
    const currentIDsSorted = modalityIDs.slice().sort(sortFn);
    const groupKeys = modalitiesByGroupData.keys();
    for (const groupKey of groupKeys) {
      const ids = modalitiesByGroupData
        .get(groupKey)
        ?.map((modality) => modality.id)
        .sort(sortFn);
      // found
      if (ids && ids.join() === currentIDsSorted.join()) {
        return groupKey;
      }
    }
  }
};
