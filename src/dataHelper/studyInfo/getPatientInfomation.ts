import { useLazyGetListPatientsQuery } from '@/features/order';
import { IPatientDTO } from '@/types/dto';

type getPatientInfomationProps = {
  triggerGetListPatient: ReturnType<typeof useLazyGetListPatientsQuery>[0];
  pid: IPatientDTO['pid'];
};

/**
 * trigger lấy list patient theo pid,
 * Kiểm tra, trả về patient ứng với pid
 */
export const getPatientInfomation = async (props: getPatientInfomationProps) => {
  const { triggerGetListPatient, pid } = props;
  if (pid) {
    const patients = await triggerGetListPatient({ filter: { pid } }, false).unwrap();
    const patient = patients.list.find((patient) => patient.pid === pid);
    return patient;
  }
  return undefined;
};
