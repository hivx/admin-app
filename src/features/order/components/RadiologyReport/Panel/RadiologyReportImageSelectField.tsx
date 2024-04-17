import { Stack, lighten, styled } from '@mui/material';
import { FC } from 'react';

import ItechAttachmentIcon from '@/assets/icon/AttachmentIcon';
import OrderInfoTypography from '@/components/Order/Panel/OrderInfoTypography';
import { useRadiologySelectImageField } from '@/hooks/radiology/useRadiologySelectImageField';
import { BaseEntity } from '@/types';

type RadiologyReportImageSelectFieldProps = {
  orderID: BaseEntity['id'];
  requestID: BaseEntity['id'];
};
export const RadiologyReportImageSelectField: FC<
  RadiologyReportImageSelectFieldProps
> = ({ orderID, requestID }) => {
  const { currentTemplate, numberImages } = useRadiologySelectImageField({
    orderID,
    requestID,
  });

  return currentTemplate?.keyImageNames?.length ? (
    <StyledRadiologyReportImageSelectField>
      <Stack direction="row" spacing={1}>
        <OrderInfoTypography>{`(${numberImages}/${currentTemplate?.keyImageNames?.length}) Ảnh đính kèm kết quả`}</OrderInfoTypography>
        <StyledItechAttachmentIcon sx={{ fontSize: '1rem' }} />
      </Stack>
      {/* {currentImageReportImage && Object.keys(currentImageReportImage).length !== 0 && (
        <StyledImageList>
          <RadiologySelectImagesList orderID={orderID} requestID={requestID} />
        </StyledImageList>
      )} */}
    </StyledRadiologyReportImageSelectField>
  ) : (
    <></>
  );
};

const StyledRadiologyReportImageSelectField = styled(Stack)``;
const StyledItechAttachmentIcon = styled(ItechAttachmentIcon)`
  color: ${(props) => lighten(props.theme.palette.common.black, 0.5)};
`;
const StyledImageList = styled('div')`
  width: 100%;
  display: grid;
  --gap: ${(props) => props.theme.spacing(2)};
  grid-template-columns: repeat(auto-fill, 100px);
  height: calc(100px + var(--gap));
  grid-template-rows: auto;
  gap: var(--gap);
  overflow-x: auto;
`;
