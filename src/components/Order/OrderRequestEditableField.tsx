import { styled, alpha, Typography } from '@mui/material';
import { FC, useRef } from 'react';

import { TextWithToolTip } from '@/components/Elements/Tooltip/TextWithToolTip';
import { ContextMenuItemShell } from '@/components/Menu/ContextMenuItemShell';
import { ActionComponentWithMenu } from '@/components/Table/ActionComponentWithMenu';
import { globalStyles } from '@/providers/ThemeProvider';
import { IOrderDTO, IOrderRequestDTO } from '@/types/dto';

type OrderRequestEditableFieldProps = {
  order?: IOrderDTO;
  request?: IOrderRequestDTO;
  readonly?: boolean;
  onRequestChange?: (newRequest: IOrderRequestDTO) => void;
};

export const OrderRequestEditableField: FC<OrderRequestEditableFieldProps> = (props) => {
  const { order, request, readonly, onRequestChange } = props;
  const requests = order?.requests;
  const ref = useRef<HTMLElement>(null);
  const numExtraRequests = requests && requests.length ? requests.length - 1 : 0;
  /**
   * Filter requests doesn't exist request selected id
   */
  const requestsFilter = requests && requests.filter((item) => item.id !== request?.id);
  /**
   * Current request id in list request
   */
  const selectedRequest = request?.id;

  const ReadonlyComponent = (
    <StyledOrderRequestEditableFieldContainer>
      <TextWithToolTip ellipsisEffect title={request?.procedure?.name ?? ''}>
        {request?.procedure?.name}
      </TextWithToolTip>
    </StyledOrderRequestEditableFieldContainer>
  );
  /**
   * If readonly = true or requestsFilter length < 0 just readonly can't show select list request
   */
  if (readonly || !requestsFilter?.length) return ReadonlyComponent;
  else
    return (
      <StyleOrderRequestWrapper>
        {ReadonlyComponent}
        {numExtraRequests && (
          <ActionComponentWithMenu
            anchorRef={ref}
            MyMenuProps={{
              transformOrigin: { horizontal: 'right', vertical: 'top' },
              anchorOrigin: { horizontal: 'right', vertical: 'bottom' },
            }}
            ActionComponent={
              <StyledDiagnosisCount variant="body2" ref={ref}>
                {`+${numExtraRequests}`}
              </StyledDiagnosisCount>
            }
            ListMenu={
              requests &&
              requests.map((request) => {
                return (
                  selectedRequest !== request.id && (
                    <ContextMenuItemShell
                      key={request.id}
                      MenuItemProps={{
                        onClick: () => {
                          onRequestChange && onRequestChange(request);
                        },
                      }}
                      MainComponent={
                        <Typography variant="body1">
                          {request?.procedure?.name}
                        </Typography>
                      }
                      isDisplayIcon={false}
                    />
                  )
                );
              })
            }
          />
        )}
      </StyleOrderRequestWrapper>
    );
};

const StyledOrderRequestEditableFieldContainer = styled('div')`
  display: grid;
`;

const StyledDiagnosisCount = styled(Typography)`
  /* position: absolute; */
  padding: 0 ${(props) => props.theme.spacing(0.5)};
  border-radius: 5px;
  margin-left: ${(props) => props.theme.spacing(1)};
  background-color: ${(props) => alpha(props.theme.palette.primary.main, 0.1)};
  :hover {
    ${globalStyles.onMenuHover};
  }
`;
const StyleOrderRequestWrapper = styled('div')`
  display: flex;
`;
