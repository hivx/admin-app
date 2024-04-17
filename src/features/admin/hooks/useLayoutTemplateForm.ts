import { useGetListModalityTypeNameQuery } from '@/api/modalityTypeName';

export const useLayoutTemplateForm = () => {
  const { data: modalityTypeNameData } = useGetListModalityTypeNameQuery({
    filter: {},
  });

  const modalityTypeNames = modalityTypeNameData?.list;

  return {
    modalityTypeNames,
  };
};
