import { styled } from '@mui/material';

import { IOrderDTO } from '@/types/dto';

import { MobileApproveButton } from '../../buttons/radiologyButton/MobileApproveButton';
import { MobileLockOrderButton } from '../../buttons/radiologyButton/MobileLockOrderButton';
import { MobileSaveDraftButton } from '../../buttons/radiologyButton/MobileSaveDraftButton';
import { MobileSelectTemplateButton } from '../../buttons/radiologyButton/MobileSelectTemplateButton';
import { MobileViewImageButton } from '../../buttons/radiologyButton/MobileViewImageButton';

export const MobileRadiologyButton = ({ order }: { order: IOrderDTO }) => {
  const isLocked = !!order.lockedBy;
  return (
    <StyledButtonWrapper>
      {isLocked ? (
        <>
          {/**
           * Duyệt ca
           */}
          <MobileApproveButton order={order} />
          {/**
           * Lưu nháp
           */}
          <MobileSaveDraftButton order={order} />
        </>
      ) : (
        <MobileLockOrderButton />
      )}
      {/**
       * Xem ảnh
       */}
      <MobileViewImageButton order={order} />
      {/**
       * Chọn mẫu
       */}
      {isLocked && <MobileSelectTemplateButton order={order} />}
    </StyledButtonWrapper>
  );
};

const StyledButtonWrapper = styled('div')`
  display: flex;
  flex-direction: row;
  gap: ${(props) => props.theme.spacing(1)};
`;
