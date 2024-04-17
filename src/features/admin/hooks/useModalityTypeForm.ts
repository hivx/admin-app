import { useGetListModalityQuery } from '@/api/modality';
import { useGetListModalityTypeQuery } from '@/api/modalityType';
import { useGetListModalityTypeNameQuery } from '@/api/modalityTypeName';
import { useGetListProcedureQuery } from '@/api/procedure';
import { IModalityTypeNameDTO } from '@/types/dto';

export const useModalityTypeForm = ({
  modalityType,
}: {
  modalityType?: IModalityTypeNameDTO['name'];
}) => {
  const { data: modalityTypeData } = useGetListModalityTypeQuery({
    filter: {},
  });
  const { data: modalityTypeNameData } = useGetListModalityTypeNameQuery({ filter: {} });

  const { data: modalityData } = useGetListModalityQuery({
    filter: { modalityTypes: modalityType ? [modalityType] : undefined },
  });

  const { data: procedureData } = useGetListProcedureQuery({
    filter: { modalityTypes: modalityType ? [modalityType] : undefined },
  });

  const modalityTypes = modalityTypeData?.list;
  const modalities = modalityData?.list;
  const modalityTypeNames = modalityTypeNameData?.list;
  const procedures = procedureData?.list;
  return {
    modalityTypes,
    modalities,
    modalityTypeNames,
    procedures,
  };
};
