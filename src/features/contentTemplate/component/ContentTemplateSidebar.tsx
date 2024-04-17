import { Stack } from '@mui/material';
import React, { useCallback, useMemo } from 'react';

import { useGetListContentGroupsQuery } from '@/api/contentGroup';
import { FolderIcon, ItechIconModality } from '@/assets/icon';
import { IRenderTree, MyTreeView } from '@/components';
import { SidebarLayout } from '@/components/Elements/Navigation/SidebarLayout';
import { useAppDispatch, useAppSelector, useTranslate } from '@/hooks';
import {
  ALL_CHOICE_NODE_ID,
  CONTENT_GROUP_PREFIX,
  MODALITY_TYPE_PREFIX,
  contentGroupByModalityType,
  makeContentGroupKey,
  makeModalityTypeKey,
} from '@/lib/dataHelper/contentTemplate/contentGroupHelper';
import { TABLE_CONTENT_BY_USER } from '@/stores/table/tableInitialState';
import { getCurrentTableQuery } from '@/stores/table/tableSelectors';
import { setTableFilter } from '@/stores/table/tableSlice';
import { ISearchContentFilter } from '@/types/dto';

export const ContentTemplateSidebar = () => {
  const translate = useTranslate();
  const dispatch = useAppDispatch();
  const query = useAppSelector(
    getCurrentTableQuery<ISearchContentFilter>(TABLE_CONTENT_BY_USER),
  );
  const { data: contentGroupData } = useGetListContentGroupsQuery({
    filter: {},
  });
  const contentGroups = useMemo(
    () => contentGroupData?.list ?? [],
    [contentGroupData?.list],
  );

  const treeData = contentGroupByModalityType(contentGroups);

  const trees = useMemo<IRenderTree[]>(() => {
    // initialize with Select all option
    const res: IRenderTree[] = [
      {
        MyTreeItemProps: {
          nodeId: ALL_CHOICE_NODE_ID,
          label: translate.buttons.all(),
          ContentProps: {
            labelCollapsedIcon: <FolderIcon color="primary" />,
            labelIcon: <FolderIcon color="primary" />,
          },
        },
      },
    ];
    treeData.forEach((groups, key) => {
      const treeItem = {
        MyTreeItemProps: {
          nodeId: key,
          label: key.replace(MODALITY_TYPE_PREFIX, ''),
          ContentProps: {
            labelCollapsedIcon: <FolderIcon color="primary" />,
            labelIcon: <FolderIcon color="primary" />,
          },
        },
        children: groups.map((group) => ({
          MyTreeItemProps: {
            nodeId: makeContentGroupKey(group.id.toString()),
            label: group.name,
            ContentProps: {
              labelIcon: <ItechIconModality color="primary" />,
            },
          },
        })),
      };
      res.push(treeItem);
    });

    return res;
  }, [translate.buttons, treeData]);

  const handleNodeSelect = useCallback<
    (event: React.SyntheticEvent, nodeId: string) => void
  >(
    (event, nodeId) => {
      if (nodeId === ALL_CHOICE_NODE_ID) {
        dispatch(
          setTableFilter({
            tableId: TABLE_CONTENT_BY_USER,
            filter: { ...query?.filter, modalityTypes: undefined, groupID: undefined },
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
            tableId: TABLE_CONTENT_BY_USER,
            filter: {
              ...query?.filter,
              modalityTypes: [modalityType],
              groupID: undefined,
            },
          }),
        );
      }

      if (nodeId.includes(CONTENT_GROUP_PREFIX)) {
        const groupID = nodeId.replace(CONTENT_GROUP_PREFIX, '');
        /**
         * If user clicks on Modality Group, we send all of its modalityIds to filter
         */
        dispatch(
          setTableFilter({
            tableId: TABLE_CONTENT_BY_USER,
            filter: { ...query?.filter, modalityTypes: undefined, groupID },
          }),
        );
      }
    },
    [dispatch, query],
  );

  return (
    <SidebarLayout title={translate.pages.template.sidebarTitle()} collapsible>
      <Stack height={'100%'} justifyContent={'space-between'}>
        <MyTreeView
          trees={trees}
          multiSelect={false}
          onNodeSelect={handleNodeSelect}
          selected={getCurrentSelectedNode(
            query?.filter.modalityTypes,
            query?.filter.groupID,
          )}
        />
      </Stack>
    </SidebarLayout>
  );
};

const getCurrentSelectedNode = (modalityTypes?: string[], groupId?: number) => {
  if (modalityTypes) {
    return makeModalityTypeKey(modalityTypes[0]);
  }
  if (groupId) {
    return makeContentGroupKey(groupId.toString());
  }
  return ALL_CHOICE_NODE_ID;
};
