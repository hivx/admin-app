import { Box, BoxProps, styled, Typography } from '@mui/material';
import { forwardRef, ReactNode, Ref, useCallback, useState } from 'react';
import { LocalizedString } from 'typesafe-i18n';

import { MyButton } from '@/components';
import { ModalContent } from '@/components/Elements/Modal/ModalContent';
import { ModalFooterLayout } from '@/components/Layout/ModalFooterLayout';
import { StyledDivCenterChildren } from '@/components/Layout/StyledDiv';
import { useTranslate } from '@/hooks';

export type ICommonAppModalProps = {
  /**
   * Close modal handler
   */
  closeModal: () => void;

  /**
   * show modal or not
   */
  isOpen?: boolean;
};

type AppModalContentProps = {
  /**
   * Modal title
   */
  title: string | LocalizedString;
  /**
   * Confirm button label
   * @default translate.buttons.confirm
   */
  confirmLabel?: string | LocalizedString;
  /**
   * Confirm button
   */
  ConfirmButton?: ReactNode;
  /**
   * Close button label
   * @default translate.buttons.close
   */
  closeLabel?: string | LocalizedString;
  /**
   * Delete button label
   * @default translate.buttons.delete
   */
  deleteLabel?: string | LocalizedString;
  /**
   * Run on Confirm button click
   */
  handleConfirm: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  /**
   * Run on Close button click
   */
  handleClose: () => void;
  /**
   * Run on Delete button click
   */
  handleDelete?: () => void;
  /**
   * Render modal body
   */
  BodyComponent: ReactNode;
  /**
   * Render extra buttons on the left side of the optional buttons
   */
  renderExtraButtons?: () => ReactNode;
  /**
   * Height and width
   */
  height?: string;
  width?: string;
  isLoading?: boolean;
  /**
   * Custom body props of box container
   */
  BoxBodyProps?: BoxProps;
};

const PADDING = 2;
export const AppModalContent = forwardRef(
  (props: AppModalContentProps, ref: Ref<HTMLElement>) => {
    const translate = useTranslate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const {
      handleClose,
      handleConfirm,
      title,
      confirmLabel = translate.buttons.confirm(),
      closeLabel = translate.buttons.close(),
      deleteLabel = translate.buttons.delete(),
      BodyComponent,
      handleDelete,
      height,
      width,
      ConfirmButton,
      BoxBodyProps,
    } = props;

    const handleSubmit = useCallback(
      async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setIsSubmitting(true);
        await handleConfirm(e);
        setIsSubmitting(false);
      },
      [handleConfirm],
    );

    return (
      <StyledAppModalContent
        isLoading={isSubmitting || props.isLoading}
        ref={ref}
        renderTitle={() => (
          <StyledAppModalHeader>
            <StyledTitle>{title}</StyledTitle>
          </StyledAppModalHeader>
        )}
        height={height ? height : 'fit-content'}
        width={width ? width : 'fit-content'}
        renderBody={() => (
          <Box
            p={PADDING}
            overflow="auto"
            maxHeight="80vh"
            minHeight="20vh"
            minWidth="20vw"
            {...BoxBodyProps}
          >
            {BodyComponent}
          </Box>
        )}
        renderFooter={() => (
          <Box p={PADDING}>
            <ModalFooterLayout
              ActionButton={
                ConfirmButton || (
                  <StyledPrimaryButton
                    variant="contained"
                    onClick={(e) => handleSubmit(e)}
                  >
                    {confirmLabel}
                  </StyledPrimaryButton>
                )
              }
              OptionalButtons={[
                props.renderExtraButtons?.(),
                deleteLabel && handleDelete && (
                  <MyButton
                    key={deleteLabel}
                    variant="outlined"
                    color="error"
                    onClick={handleDelete}
                  >
                    {deleteLabel}
                  </MyButton>
                ),
                <MyButton key={closeLabel} variant="outlined" onClick={handleClose}>
                  {closeLabel}
                </MyButton>,
              ]}
            />
          </Box>
        )}
      />
    );
  },
);

AppModalContent.displayName = 'AppModalContent';

/**
 * Styles
 */

const StyledAppModalHeader = styled(StyledDivCenterChildren)`
  background-color: ${(props) => props.theme.pacs?.customColors.tableHeaderBackground};
  border-radius: ${(props) => props.theme.pacs?.layout.borderRadius}
    ${(props) => props.theme.pacs?.layout.borderRadius} 0 0;
`;

const StyledTitle = styled(Typography)`
  ${(props) => props.theme.typography.body1}
  font-size: 16px;
  padding: ${(props) => props.theme.spacing(0.5)};
  text-transform: uppercase;
`;

const StyledAppModalContent = styled(ModalContent)`
  max-height: 100%;
`;

export const StyledPrimaryButton = styled(MyButton)`
  background-color: ${(props) =>
    props.theme.pacs?.customColors.backgroundButtonActiveColor};
`;
