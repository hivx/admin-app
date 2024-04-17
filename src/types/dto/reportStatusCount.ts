import { IModalityDTO } from './modality';
import { IModalityTypeDTO } from './modalityType';
import { ORDER_DIAGNOSIS_STEP_STATUS } from './radiologyReport';

export type IOrderStatusCountDTO = {
  status: `${ORDER_DIAGNOSIS_STEP_STATUS}`;
  total: number;
};

export type IOrderStatusCountFilter = Partial<{
  fromDate: string;
  toDate: string;
  modalityIDs: IModalityDTO['id'][];
  modalityTypes: IModalityTypeDTO['name'][];
}>;
