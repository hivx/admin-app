import { Typography, styled } from '@mui/material';
import { FC } from 'react';

import { useGetOneModalityQuery } from '@/api/modality';
import { ModalityRoomIcon } from '@/assets/icon';
import { IOrderRequestDTO, IOrderRequestDTOCreate } from '@/types/dto';

type RequestModalityInfo = {
  index: number;
  /**
   * Request ở form tạo
   */
  localRequests: IOrderRequestDTOCreate[];
  /**
   * Request ở form sửa
   */
  orderRequests?: IOrderRequestDTO[];
};

/**
 * Component hiển thị thông tin máy chụp
 * theo từng request
 */
export const RequestModalityInfo: FC<RequestModalityInfo> = ({
  index,
  localRequests,
  orderRequests,
}) => {
  /**
   * Vì request lưu trong store, chỉ lưu ID của máy
   * -> cần gọi getOne để lấy object modality
   */
  const { data: modalityData } = useGetOneModalityQuery(
    { id: localRequests[index]?.modalityID },
    { skip: !localRequests[index]?.modalityID },
  );

  /**
   * Nếu request từ order -> tên máy chụp lấy từ object request
   * Nếu request local -> tên máy chụp lấy từ object modalityData
   */
  const getModalityNameDisplay = () => {
    if (orderRequests) {
      return orderRequests[index]?.modality?.name ?? '';
    } else if (modalityData) {
      return modalityData.name;
    }
    return '';
  };

  return getModalityNameDisplay() ? (
    <StyledModalityInfo>
      <ModalityRoomIcon fontSize="inherit" />
      <Typography variant="body2">{getModalityNameDisplay()}</Typography>
    </StyledModalityInfo>
  ) : (
    <></>
  );
};

const StyledModalityInfo = styled('div')`
  display: flex;
  flex-direction: 'row';
  justify-content: center;
  align-items: center;
  gap: ${(props) => props.theme.spacing(1)};
  color: ${(props) => props.theme.pacs?.customColors.text.gray};
`;
