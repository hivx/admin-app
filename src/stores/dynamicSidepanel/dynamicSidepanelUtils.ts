import { IMousePosition, useAppDispatch } from '@/hooks';
import { USER_MODULE } from '@/types/dto';

import { resizePanel } from './dynamicSidepanelSlice';

type GetResizePanelHeightHandlerOptions = {
  index: number;
  page: USER_MODULE;
  dispatch: ReturnType<typeof useAppDispatch>;
  parentHeight?: number;
  sumHeightRatio: number;
};
/**
 * modify height ratio of 2 adjacent panels
 */
export const getResizePanelHeightHandler =
  (options: GetResizePanelHeightHandlerOptions) =>
  (e: MouseEvent, delta: IMousePosition) => {
    const { index, page, dispatch, parentHeight, sumHeightRatio } = options;
    if (parentHeight && delta.y) {
      const deltaRatio = convertPixelToRatio(delta.y, parentHeight, sumHeightRatio);
      dispatch(resizePanel({ page, activePanelIndex: index, delta: deltaRatio }));
    }
  };

export const convertPixelToRatio = (
  deltaHeight: number,
  parentHeight: number,
  totalRatio: number,
) => (deltaHeight / parentHeight) * totalRatio;
