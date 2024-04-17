import { alpha, ClickAwayListener, colors, styled } from '@mui/material';
import React, {
  forwardRef,
  MouseEventHandler,
  ReactElement,
  useCallback,
  useState,
} from 'react';

type DynamicEditableFieldProps = {
  DisplayComponent: ReactElement;
  EditComponent: ReactElement;
};

/**
 * This component handles switching between display component and edit component
 * by user mouse action
 * On click, the component turns into Edit Component
 * On click outside, the component goes back to DisplayComponent
 */
export const DynamicEditableField = forwardRef<HTMLElement, DynamicEditableFieldProps>(
  (props, ref) => {
    const { DisplayComponent, EditComponent } = props;
    const [isEditing, setIsEditing] = useState<boolean>(false);

    const handleDisplayElementClick: MouseEventHandler = useCallback(
      (e) => {
        if (DisplayComponent.props.onClick) DisplayComponent.props.onClick(e);
        setIsEditing(true);
      },
      [DisplayComponent.props],
    );

    const handleClickAway = useCallback(() => {
      setIsEditing(false);
    }, []);

    const ComposedDisplayComponent = React.cloneElement(
      DisplayComponent,
      {
        ref,
        onClick: handleDisplayElementClick,
      },
      React.Children.map(DisplayComponent.props.children, (children) => children),
    );

    return isEditing ? (
      <ClickAwayListener onClickAway={handleClickAway} mouseEvent="onMouseDown">
        {EditComponent}
      </ClickAwayListener>
    ) : (
      <StyledDisplayComponentContainer>
        {ComposedDisplayComponent}
      </StyledDisplayComponentContainer>
    );
  },
);

const StyledDisplayComponentContainer = styled('div')`
  cursor: pointer;
  transition: background-color ease 300ms;
  border-radius: ${(props) => props.theme.pacs?.layout.borderRadius};
  height: 100%;

  &:hover {
    background-color: ${alpha(colors.grey[400], 0.5)};
  }
`;

DynamicEditableField.displayName = 'DynamicEditableField';
