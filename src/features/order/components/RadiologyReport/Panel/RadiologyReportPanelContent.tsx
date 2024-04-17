import { FC } from 'react';

import { CommentsEditor } from '@/components/Order/RadiologyReport/Editors/CommentsEditor';
import { FindingsEditor } from '@/components/Order/RadiologyReport/Editors/FindingsEditor';
import { ImpressionEditor } from '@/components/Order/RadiologyReport/Editors/ImpressionEditor';
import { useRequestAndCurrentActiveRadiologyReport } from '@/hooks/radiology/useRequestAndCurrentActiveRadiologyReport';
import { IOrderRequestDTO } from '@/types/dto';

import { useCurrentOrderID } from '../../../providers';

import { RadiologyPageLeftSideWrapper } from './LeftSide/RadiologyPageLeftSideWrapper';
import { RadiologyReportImageSelectField } from './RadiologyReportImageSelectField';
import { RadiologyReportPanelContentShell } from './RadiologyReportPanelContentShell';

type RadiologyReportPanelContentProps = {
  isQuickReportTab?: boolean;
  onRequestChange?: (newRequest: IOrderRequestDTO) => void;
};
export const RadiologyReportPanelContent: FC<RadiologyReportPanelContentProps> = (
  props,
) => {
  const orderID = useCurrentOrderID();
  const requestID = useRequestAndCurrentActiveRadiologyReport();

  return (
    <>
      <RadiologyReportPanelContentShell
        FindingsEditor={<FindingsEditor />}
        ImpressionEditor={<ImpressionEditor />}
        CommentEditor={<CommentsEditor />}
        SelectImagesField={
          <RadiologyReportImageSelectField orderID={orderID} requestID={requestID} />
        }
        ComponentLeftSide={
          <RadiologyPageLeftSideWrapper
            key={orderID}
            orderID={orderID}
            requestID={requestID}
          />
        }
      />
    </>
  );
};
