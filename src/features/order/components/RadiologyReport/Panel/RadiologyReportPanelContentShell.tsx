import { styled } from '@mui/material';
import { FC, ReactNode } from 'react';

type RadiologyReportPanelContentShellProps = {
  FindingsEditor: ReactNode;
  ImpressionEditor: ReactNode;
  CommentEditor: ReactNode;
  ComponentLeftSide: ReactNode;
  SelectImagesField: ReactNode;
};
/**
 * Report content layout
 * we have 3 rows:
 * - Findings editor
 * - Impression - Comments
 * - Technician - Nurse
 */
export const RadiologyReportPanelContentShell: FC<
  RadiologyReportPanelContentShellProps
> = (props) => {
  const {
    FindingsEditor,
    ImpressionEditor,
    SelectImagesField,
    ComponentLeftSide,
    CommentEditor,
  } = props;
  return (
    <StyledContainer>
      <StyledTopContainer>
        {ComponentLeftSide}
        <StyledImpressionEditorContainer>
          {FindingsEditor}
          {ImpressionEditor}
          {CommentEditor}
          {SelectImagesField}
        </StyledImpressionEditorContainer>
      </StyledTopContainer>
    </StyledContainer>
  );
};

const StyledImpressionEditorContainer = styled('div')`
  display: grid;
  height: 100%;
  grid-template-rows: 2.5fr 0.5fr 0.5fr auto;
  gap: ${(props) => props.theme.spacing(1)};
  max-height: 100%;
  width: 100%;
`;

const StyledContainer = styled('div')`
  width: 100%;
  height: 100%;
  max-height: 100%;
  max-width: 100%;
  display: grid;
  /* grid-template-rows: minmax(50%, 10fr) minmax(10%, 1fr) auto; // 3 rows */
  grid-template-rows: minmax(75%, 5fr);
  gap: ${(props) => props.theme.spacing(0.5)};
`;

const StyledTopContainer = styled('div')`
  width: 100%;
  height: 100%;
  max-height: 100%;
  max-width: 100%;
  display: flex;
  /* grid-template-rows: minmax(50%, 10fr) minmax(10%, 1fr) auto; // 3 rows */
  grid-template-columns: minmax(400px, 1fr) 2.5fr;
`;
