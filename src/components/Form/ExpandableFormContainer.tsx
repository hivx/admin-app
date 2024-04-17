import { Box, ClickAwayListener, css, Paper, Popper, Stack, styled } from '@mui/material';
import { FC, PropsWithChildren, ReactNode } from 'react';

import { useAnchorElement, useTranslate } from '@/hooks';
import { globalStyles } from '@/providers/ThemeProvider';
import { getElementWidthById } from '@/utils/domUtils';
import { filterTransientProps } from '@/utils/filterTransientProps';

import { MyButton } from '../Elements';
import { StyledPrimaryButton } from '../Elements/Modal/AppModalContent';
import { ModalFooterLayout } from '../Layout/ModalFooterLayout';

type ExpandableFormContainerProps = {
  /**
   * Table ID to determine width of expanded field
   */
  tableID?: string;
  /**
   * Primary field is always shown, it will have the controls to open and
   * close expanded filters
   */
  renderPrimaryField: (props: ReturnType<typeof useAnchorElement>) => ReactNode;
  /**
   * All of the components that is in the expanded area will be defined here
   */
  ExtraFieldsComponent: ReactNode;
  /**
   * Form submit function
   */
  handleSubmit: () => void;
};

// Handle UI and expand state of expandable form group
export const ExpandableFormContainer: FC<
  PropsWithChildren<ExpandableFormContainerProps>
> = (props) => {
  const { renderPrimaryField, ExtraFieldsComponent, handleSubmit } = props;
  const anchorControls = useAnchorElement();
  const translate = useTranslate();
  const { anchorEl, isOpen, close } = anchorControls;
  const parentWidth = anchorEl?.getBoundingClientRect().width;

  const handleSubmitWithClose = () => {
    handleSubmit();
    close();
  };

  /**
   * NOTE: set mouseEvent="onMouseUp" fixes child Select component triggering onClickAway function
   */
  return (
    <ClickAwayListener onClickAway={close} mouseEvent="onMouseUp">
      <StyledExpandableFormContainer>
        <StyledExpandedWidthCalculator $tableID={props.tableID}>
          <StyledPrimaryFieldContainer $isOpen={isOpen}>
            {renderPrimaryField(anchorControls)}
          </StyledPrimaryFieldContainer>
          {/* render this box because StyledPrimaryFieldContainer is position absolute --> container will be collapsed */}
          <Box height={'36px'}></Box>
        </StyledExpandedWidthCalculator>

        <StyledPopover
          open={isOpen}
          anchorEl={anchorEl}
          popperOptions={{ placement: 'bottom-end' }}
        >
          <StyledExpandedWidthCalculator $tableID={props.tableID}>
            <StyledPaper
              $width={props.tableID ? 'var(--expanded-width)' : `${parentWidth}px`}
            >
              <Stack spacing={1}>
                {ExtraFieldsComponent}
                <ModalFooterLayout
                  ActionButton={
                    <StyledPrimaryButton
                      type="submit"
                      variant="contained"
                      onClick={handleSubmitWithClose}
                    >
                      {translate.buttons.search()}
                    </StyledPrimaryButton>
                  }
                  OptionalButtons={[
                    <MyButton
                      key={translate.buttons.close()}
                      variant="outlined"
                      onClick={close}
                    >
                      {translate.buttons.close()}
                    </MyButton>,
                  ]}
                />
              </Stack>
            </StyledPaper>
          </StyledExpandedWidthCalculator>
        </StyledPopover>
      </StyledExpandableFormContainer>
    </ClickAwayListener>
  );
};

/**
 * Styles
 */

const StyledPopover = styled(Popper)`
  z-index: ${(props) => props.theme.zIndex.modal};
`;

const StyledPaper = styled(Paper, filterTransientProps)<{ $width: string }>`
  width: ${(props) => props.$width};
  padding: ${(props) => props.theme.spacing(2)};
  ${globalStyles.inputBackground}
`;

const StyledPrimaryFieldContainer = styled('div', filterTransientProps)<{
  $isOpen: boolean;
}>`
  position: absolute;
  right: 0;
  top: 0;
  width: 100%;
  /* ${(props) => {
    if (props.$isOpen) {
      return css`
        width: var(--expanded-width);
      `;
    }
  }} */
`;

const StyledExpandableFormContainer = styled('div', filterTransientProps)`
  position: relative;
  width: 100%;
  height: 100%;
`;

const StyledExpandedWidthCalculator = styled('div', filterTransientProps)<{
  $tableID?: string;
}>`
  --table-width: ${(props) =>
    props.$tableID ? getElementWidthById(props.$tableID) : ''};
  --expanded-width: ${(props) =>
    props.$tableID ? 'calc(var(--table-width, 300%) * 0.45)' : '100%'};
  // use table width or default to % value
`;
