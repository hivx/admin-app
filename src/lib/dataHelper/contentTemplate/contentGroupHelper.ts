import { IContentGroupDTO } from '@/types/dto';

export type ContentGroupByModalityType = Map<string, IContentGroupDTO[]>;

export const CONTENT_GROUP_PREFIX = 'MODALITY_GROUP_';
export const MODALITY_TYPE_PREFIX = 'MODALITY_TYPE_';
export const ALL_CHOICE_NODE_ID = 'ALL_';

export const makeContentGroupKey = (modalityGroupName: string): string =>
  `${CONTENT_GROUP_PREFIX}${modalityGroupName}`;

export const makeModalityTypeKey = (modalityType: string): string =>
  `${MODALITY_TYPE_PREFIX}${modalityType}`;

export const contentGroupByModalityType = (contentGroups?: IContentGroupDTO[]) => {
  const modalityTypeList =
    [...new Set(contentGroups?.map((item) => item.modalityType))] ?? [];

  const res: ContentGroupByModalityType = new Map();
  if (contentGroups && modalityTypeList) {
    // pre-create modalitiesByGroup entries
    modalityTypeList.forEach((modalityType) => {
      // if (group.name) res[makeModalityGroupKey(group.name)] = [];
      if (modalityType) res.set(makeModalityTypeKey(modalityType), []);
    });
    contentGroups.forEach((contentGroup) => {
      if (contentGroup.modalityType) {
        const key = makeModalityTypeKey(contentGroup.modalityType);
        // if (res[key]) res[key].push(modality);
        if (res.get(key)) res.get(key)?.push(contentGroup);
      }
    });
  }
  return res;
};
