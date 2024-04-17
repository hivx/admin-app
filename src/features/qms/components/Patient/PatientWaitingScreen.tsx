import { useParams } from 'react-router-dom';

import { PatientWaitingScreenHeader } from './PatientWaitingScreenHeader';
import { PatientWaitingScreenLayout } from './PatientWaitingScreenLayout';
import { PatientWaitingScreenMain } from './PatientWaitingScreenMain';
import { PatientWaitingScreenShell } from './PatientWaitingScreenShell';

export const PatientWaitingScreen = () => {
  const { modalityID } = useParams();
  return (
    <>
      <PatientWaitingScreenLayout>
        <PatientWaitingScreenShell
          HeaderComponent={<PatientWaitingScreenHeader />}
          MainComponent={
            modalityID && <PatientWaitingScreenMain modalityID={parseInt(modalityID)} />
          }
        ></PatientWaitingScreenShell>
      </PatientWaitingScreenLayout>
    </>
  );
};
