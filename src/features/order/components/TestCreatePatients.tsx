import { MyButton } from '@/components';
import { patientCreateGenerator } from '@/test/data/patientGenerator';

import { useCreateOnePatientMutation } from '../api/patient';

export const TestCreatePatients = (props: { numPatients?: number }) => {
  const { numPatients = 1 } = props;
  const [trigger] = useCreateOnePatientMutation();

  const createPatients = () => {
    for (let i = 0; i < numPatients; ++i) {
      trigger(patientCreateGenerator());
    }
  };
  return <MyButton onClick={createPatients}>Submit test patients</MyButton>;
};
