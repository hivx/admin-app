import { useGetListModalityTypeNameQuery } from '@/api/modalityTypeName';
import { useGetListProcedureQuery } from '@/api/procedure';
import { IProcedureDTO } from '@/types/dto';

type UseProcedureFormOptions = {
  record?: IProcedureDTO;
};

export const useProcedureForm = (props?: UseProcedureFormOptions) => {
  const { record } = props || {};

  const { data: procedureData } = useGetListProcedureQuery({
    filter: {},
  });

  const { data: modalityAbbrData } = useGetListModalityTypeNameQuery({
    filter: {},
  });

  const listProcedure = procedureData?.list;
  const listProcedureFiltedred: IProcedureDTO[] | undefined = (
    listProcedure || []
  ).filter((item) => item.id !== record?.id);

  return {
    modalityAbbrData,
    listProcedureFiltedred,
    listProcedure,
  };
};
