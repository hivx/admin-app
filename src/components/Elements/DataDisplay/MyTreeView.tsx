import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { TreeViewProps, TreeView } from '@mui/lab';
import { styled } from '@mui/material';

import { IMyTreeItemProps, MyTreeItem } from './MyTreeItem';

export interface IRenderTree {
  // The props applied to MyTreeItem
  MyTreeItemProps: IMyTreeItemProps;
  children?: readonly IRenderTree[];
}

type IMyTreeViewProps = TreeViewProps & {
  trees: IRenderTree[];
};

const StyledTreeView = styled(TreeView)`
  min-width: 250px;
  overflow-y: auto;
`;

// Recursion can downgrade the performance of rendering if number of nodes is large enough
// TODO using queue technique instead
const render = (trees: IRenderTree[]) =>
  trees.length
    ? trees.map((tree) => (
        <MyTreeItem key={tree.MyTreeItemProps.nodeId} {...tree.MyTreeItemProps}>
          {Array.isArray(tree.children) ? render(tree.children) : null}
        </MyTreeItem>
      ))
    : '';

export const MyTreeView = (props: IMyTreeViewProps) => {
  return (
    <StyledTreeView
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      {...props}
    >
      {render(props.trees)}
    </StyledTreeView>
  );
};
