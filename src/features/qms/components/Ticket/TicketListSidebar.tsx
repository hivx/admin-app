import { useCallback, useMemo } from 'react';

import { FolderIcon } from '@/assets/icon';
import { IRenderTree, MyTreeView } from '@/components';
// import { useAppDispatch } from '@/hooks';
import { useAppDispatch, useAppSelector, useTranslate } from '@/hooks';
import { TABLE_TICKET } from '@/stores/table/tableInitialState';
import { selectCurrentTableFilter } from '@/stores/table/tableSelectors';
import { setTableFilter } from '@/stores/table/tableSlice';
import { QMS_RESOURCES } from '@/types/resources';

import { useGetListQmsModalityQuery } from '../../api/qmsModality';
import { IQmsModalityDTO } from '../../types';
import { ISearchTicketFilter } from '../../types/ticket';

// configure ID Prefixes for node select handling
const MODALITY_GROUP_PREFIX = 'MODALITY_GROUP_';
const MODALITY_PREFIX = 'MODALITY_';
const ALL_CHOICE_NODE_ID = 'ALL_';

export const TicketListSidebar = () => {
  // const dispatch = useAppDispatch();
  const { data: modalityData } = useGetListQmsModalityQuery({
    filter: {},
  });

  const currentTicketFilter = useAppSelector(
    selectCurrentTableFilter<ISearchTicketFilter>(QMS_RESOURCES.QMS_TICKET),
  );

  const selectedNodeId =
    currentTicketFilter?.modalityID && makeModalityKey(currentTicketFilter?.modalityID);

  const dispatch = useAppDispatch();
  const translate = useTranslate();

  const modalitiesByGroup = useMemo(() => {
    const modalities = modalityData?.list;

    const modalityGroupList = modalities?.map((modality) => modality.modalityType) || [];
    const uniqModalityGroups = [...new Set(modalityGroupList)];
    // create sorted modalityGroup entries
    // const sortedModalitiesGroups = modalityGroupList.slice().sort((a, b) => {
    //   if (a?.index !== null && b?.index !== null)
    //     return (a?.index || 0) - (b?.index || 0);
    //   return 0;
    // });
    // use Map instead of Object to remember order of insertion
    const res = new Map<string, IQmsModalityDTO[]>();
    if (modalities && uniqModalityGroups) {
      // pre-create modalitiesByGroup entries
      uniqModalityGroups.forEach((group) => {
        if (group) res.set(makeModalityGroupKey(group), []);
      });
      modalities.forEach((modality) => {
        if (modality.modalityType) {
          const key = makeModalityGroupKey(modality.modalityType);
          // if (res[key]) res[key].push(modality);
          if (res.get(key)) res.get(key)?.push(modality);
        }
      });
    }

    return res;
  }, [modalityData?.list]);

  const trees = useMemo<IRenderTree[]>(() => {
    // initialize with Select all option
    const res: IRenderTree[] = [];
    res.push({
      MyTreeItemProps: {
        nodeId: ALL_CHOICE_NODE_ID,
        label: translate.buttons.all(),
        ContentProps: {
          labelCollapsedIcon: <FolderIcon color="primary" />,
          labelIcon: <FolderIcon color="primary" />,
        },
      },
    });
    modalitiesByGroup.forEach((modalities, groupKey) => {
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
              labelIcon: <FolderIcon color="primary" />,
            },
          },
        })),
      };
      res.push(treeItem);
    });

    return res;
  }, [modalitiesByGroup, translate]);

  const handleNodeSelect = useCallback<
    (event: React.SyntheticEvent, nodeId: string) => void
  >(
    (event, nodeId) => {
      if (nodeId === ALL_CHOICE_NODE_ID) {
        dispatch(
          setTableFilter({
            tableId: TABLE_TICKET,
            filter: { modalityID: null },
            merge: true,
          }),
        );
        return;
      }
      if (nodeId.includes(MODALITY_GROUP_PREFIX)) {
        /**
         * If user clicks on Modality Group, we send all of its modalityIds to filter
         */
        const modalityGroup = modalitiesByGroup.get(nodeId);
        dispatch(
          setTableFilter({
            tableId: TABLE_TICKET,
            filter: { modalityID: null },
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
            tableId: TABLE_TICKET,
            filter: {
              modalityID: parseInt(modalityId),
            },
            merge: true,
          }),
        );
      }
    },
    [dispatch, modalitiesByGroup],
  );

  const defaultExpanded = Array.from(modalitiesByGroup.keys());

  return modalityData ? (
    <MyTreeView
      trees={trees}
      multiSelect={false}
      defaultExpanded={defaultExpanded}
      onNodeSelect={handleNodeSelect}
      selected={selectedNodeId ? selectedNodeId : ''}
    />
  ) : (
    <></>
  );
};

const makeModalityGroupKey = (modalityGroupCode: string): string =>
  `${MODALITY_GROUP_PREFIX}${modalityGroupCode}`;
const makeModalityKey = (modalityId: number): string => `${MODALITY_PREFIX}${modalityId}`;
