import { QMSDisplayTable } from '../QMSDisplayTable';

import { ConnectedWaitingListTable } from './ConnectedWaitingListTable';
import { WaitingListHeader } from './WaitingListHeader';
import { WaitingListLayout } from './WaitingListLayout';
import { WaitingListShell } from './WaitingListShell';

export const WaitingList = () => {
  return (
    <WaitingListLayout>
      <WaitingListShell
        HeaderComponent={<WaitingListHeader />}
        TableComponent={
          <QMSDisplayTable TableComponent={<ConnectedWaitingListTable />} />
        }
      />
    </WaitingListLayout>
  );
};
