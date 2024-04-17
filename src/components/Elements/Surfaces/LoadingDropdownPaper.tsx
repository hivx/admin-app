import { forwardRef } from 'react';

import { FullPageSpinner } from '@/components/Layout/FullPageSpinner';

import { DropdownPaper } from './DropdownPaper';
import { IMyPaperProps } from './MyPaper';

export const LoadingDropdownPaper = forwardRef<HTMLDivElement, IMyPaperProps>(
  (props, ref) => {
    return (
      <DropdownPaper ref={ref} {...props} sx={{ height: '100px' }}>
        <FullPageSpinner />
      </DropdownPaper>
    );
  },
);

LoadingDropdownPaper.displayName = 'LoadingPaper';
