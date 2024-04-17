import { TreeItemProps, TreeItem, TreeItemContentProps, useTreeItem } from '@mui/lab';
import { Box, styled, SxProps, Theme } from '@mui/material';
import Typography, { TypographyProps } from '@mui/material/Typography';
import clsx from 'clsx';
import * as React from 'react';

import { globalStyles } from '@/providers/ThemeProvider';

type ICustomContentProps = {
  /**
   * Callback function for handling expanded state and nodeId information
   * This function runs when users click on expanded/ collapsed icon.
   */
  handleExpansionClick?: (expanded: boolean, nodeId: string) => void;
  /**
   * The icon to display next to the tree node's label. This is a collapsed icon applied only to parent node.
   */
  labelCollapsedIcon?: React.ReactNode;
  /**
   * The icon to display next to the tree node's label. This is an expanded icon applied only to parent node.
   */
  labelExpandedIcon?: React.ReactNode;
  /**
   * The icon to display next to the tree node's label. This is an icon applied only to end node.
   */
  labelIcon?: React.ReactNode;
  /**
   * The props of default label component <Typography>
   * If sx prop is provided, it will be merged with default sx prop from the default component
   */
  LabelProps?: Omit<Partial<TypographyProps>, 'ref'>;
  /**
   * Render Custom label component, will replace default label component <Typography>
   */
  renderLabel?: (args?: {
    onClick?: (e: React.SyntheticEvent) => void;
  }) => React.ReactNode;
};

type MyTreeItemContentProps = TreeItemContentProps & ICustomContentProps;

/**
 * Customize content of TreeItem
 * Use the CustomContentProps to further customize the content and behaviour of the TreeItem
 */
const CustomContent = React.forwardRef(function CustomContent(
  props: MyTreeItemContentProps,
  ref,
) {
  const {
    classes,
    className,
    label,
    nodeId,
    expansionIcon,
    labelCollapsedIcon,
    labelExpandedIcon,
    labelIcon: labelIconProps,
    handleExpansionClick,
    LabelProps,
    renderLabel,
  } = props;

  const {
    disabled,
    expanded,
    selected,
    focused,
    handleExpansion,
    handleSelection,
    preventSelection,
  } = useTreeItem(nodeId);

  const initLabelIcon = expanded ? labelExpandedIcon : labelCollapsedIcon;
  const onExpansionClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    handleExpansion(event);
    handleExpansionClick && handleExpansionClick(expanded, nodeId);
  };

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <StyledCustomContentContainer
      className={clsx(className, classes.root, {
        [classes.expanded]: expanded,
        [classes.selected]: selected,
        [classes.focused]: focused,
        [classes.disabled]: disabled,
      })}
      onMouseDown={(event) => preventSelection(event)}
      ref={ref as React.Ref<HTMLDivElement>}
    >
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
      {expansionIcon && (
        <Box
          onClick={onExpansionClick}
          className={classes.iconContainer}
          sx={{ ...IconContainerHoverStyle }}
        >
          {expansionIcon}
        </Box>
      )}

      {initLabelIcon || labelIconProps ? (
        <div className={classes.iconContainer}>{initLabelIcon ?? labelIconProps}</div>
      ) : (
        <></>
      )}
      {renderLabel ? (
        renderLabel({ onClick: handleSelection })
      ) : (
        <Typography
          onClick={handleSelection}
          component="div"
          className={classes.label}
          {...LabelProps}
          sx={
            {
              ...LinkElementAsTextStyle,
              ...(LabelProps?.sx && LabelProps.sx),
            } as SxProps
          } // merge LabelProps sx with default sx
        >
          {label}
        </Typography>
      )}
    </StyledCustomContentContainer>
  );
});

export type IMyTreeItemProps = TreeItemProps & {
  ContentProps?: ICustomContentProps;
};

const StyledCustomContentContainer = styled('div')`
  display: flex;
  align-items: center;
  &:hover {
    background-color: ${(props) =>
      props.theme.pacs?.customColors.backgroundButtonActiveColor};
    cursor: pointer;
    /* color: ${(props) => props.theme.pacs?.customColors.textIconHoverColor}; */
    /* svg {
      color: ${(props) => props.theme.pacs?.customColors.textIconHoverColor};
    } */
  }
`;

const StyledTreeItem = styled(TreeItem)`
  padding: ${(props) => props.theme.spacing(0.3)} ${(props) => props.theme.spacing(1)};
  ${globalStyles.ellipsisEffect};
  & > .MuiTreeItem-content.Mui-selected,
  .MuiTreeItem-content.Mui-selected.Mui-focused,
  .MuiTreeItem-content.Mui-focused {
    color: ${(props) => props.theme.pacs?.customColors.textIconHoverColor};
    background-color: ${(props) =>
      props.theme.pacs?.customColors.selectedItemSidebarColor};
    svg {
      color: ${(props) => props.theme.pacs?.customColors.textIconHoverColor};
    }
    &:hover {
      background-color: ${(props) =>
        props.theme.pacs?.customColors.selectedItemSidebarColor};
      cursor: pointer;
    }
  }
  svg {
    color: ${(props) => props.theme.pacs?.customColors.sidebarHeaderTitle};
  }
`;

export const MyTreeItem = (props: IMyTreeItemProps) => {
  return (
    <StyledTreeItem ContentComponent={CustomContent} {...props}>
      {props.children}
    </StyledTreeItem>
  );
};

/**
 * Internal styles
 */

const IconContainerHoverStyle: SxProps = {
  '&:hover': {
    borderRadius: '3px',
    background: 'rgb(0 0 0 / 4%)',
    transition: 'background 500ms ease',
    // background: 'blue',
  },
};

const LinkElementAsTextStyle: SxProps<Theme> = {
  '&:visited': {
    textDecoration: 'none',
    color: 'inherit',
  },
  '&:link': {
    textDecoration: 'none',
    color: 'inherit',
  },
  '&>a:visited': {
    textDecoration: 'none',
    color: 'inherit',
  },
  '&>a:link': {
    textDecoration: 'none',
    color: 'inherit',
  },
};
