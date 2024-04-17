import { IModalityDTO } from '@/types/dto';

// configure ID Prefixes for node select handling
export const MODALITY_GROUP_PREFIX = 'MODALITY_GROUP_';
export const MODALITY_TYPE_PREFIX = 'MODALITY_TYPE_';
export const MODALITY_PREFIX = 'MODALITY_';
export const ALL_CHOICE_NODE_ID = 'ALL_';

export type ModalitiesByGroupType = Map<string, IModalityDTO[]>;

export const makeModalityGroupKey = (modalityGroupName: string): string =>
  `${MODALITY_GROUP_PREFIX}${modalityGroupName}`;

export const makeModalityKey = (modalityId: number): string =>
  `${MODALITY_PREFIX}${modalityId}`;

export const makeModalityTypeKey = (modalityType: string): string =>
  `${MODALITY_TYPE_PREFIX}${modalityType}`;

export const modalitiesByGroup = (modalities: IModalityDTO[] | undefined) => {
  const modalityGroupList = modalities?.map((modality) => modality.group) || [];
  // create sorted modalityGroup entries
  const sortedModalitiesGroups = modalityGroupList.slice().sort((a, b) => {
    if (a?.index !== null && b?.index !== null) return (a?.index || 0) - (b?.index || 0);
    return 0;
  });
  // use Map instead of Object to remember order of insertion
  const res: ModalitiesByGroupType = new Map();
  if (modalities && sortedModalitiesGroups) {
    // pre-create modalitiesByGroup entries
    sortedModalitiesGroups.forEach((group) => {
      // if (group.name) res[makeModalityGroupKey(group.name)] = [];
      if (group?.name) res.set(makeModalityGroupKey(group.name), []);
    });
    modalities.forEach((modality) => {
      if (modality.group?.name) {
        const key = makeModalityGroupKey(modality.group.name);
        // if (res[key]) res[key].push(modality);
        if (res.get(key)) res.get(key)?.push(modality);
      }
    });
  }
  return res;
};

/**
 * From modalityByGroupData && modalityID
 * get group name with prefix of modality
 */
export const getGroupFromModalityID = (
  modalityByGroupData: ModalitiesByGroupType,
  modalityIDs?: number[],
) => {
  if (modalityIDs) {
    let listModality: IModalityDTO[] = [];
    let groupModalities = '';

    /**
     * get list modality from modalityByGroupData
     */

    [...modalityByGroupData.values()].forEach((item) => {
      listModality = item.concat(listModality);
    });

    /**
     * get group name with prefix of modality
     */
    if (modalityIDs.length !== listModality.length) {
      listModality.forEach((item) => {
        if (item.id === modalityIDs[0]) {
          groupModalities = `${MODALITY_GROUP_PREFIX}${item.group?.name}`;
        }
      });
    }
    return groupModalities;
  }
};
