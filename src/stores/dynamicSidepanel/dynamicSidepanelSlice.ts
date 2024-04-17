/**
 * Handle storage of dynamic sidebar feature
 */
import { CaseReducer, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { partition } from 'lodash';

import extensionAPI from '@/api/extension';
import { IExtensionDTO, USER_MODULE } from '@/types/dto';
import {
  IDynamicSidePanelReduxState,
  ISidepanelReduxLayout,
} from '@/types/dynamicSidepanel';
import { SIDEPANEL_IDS } from '@/types/dynamicSidepanel/sidebarPanels';

import { dynamicSidebarInitialState } from './dynamicSidepanelInitialState';

export const DYNAMIC_SIDEBAR_REDUCER = 'dynamicSidebar';

export type ISidepanelPayload = {
  page: USER_MODULE;
  panelID: SIDEPANEL_IDS;
};

const MAX_ACTIVE_PANELS = 2;

export const dynamicSidepanelSlice = createSlice({
  name: DYNAMIC_SIDEBAR_REDUCER,
  initialState: dynamicSidebarInitialState,
  reducers: {
    togglePanel: (state, action: PayloadAction<ISidepanelPayload>) => {
      const { page, panelID } = action.payload;
      const [currentPanels, otherPanels] = partition(
        state[page],
        (item) => item.id === panelID,
      );
      const currentPanel = currentPanels[0];
      if (!currentPanel) return;
      currentPanel.isActive = !currentPanel.isActive;
      // if type is STANDALONE, destroy other panels
      if (currentPanel.config.fullscreen) {
        otherPanels.forEach((panel) => (panel.isActive = false));
      } else {
        // if type is not STANDALONE, destroy currently active STANDALONE panel
        otherPanels.map((panel) => {
          if (panel.config.fullscreen) {
            panel.isActive = false;
          }
        });
      }
      // run added item effect
      if (currentPanel.isActive) onItemAdded(state, page, currentPanel.id);
    },
    resizePanel: (
      state,
      action: PayloadAction<{
        page: USER_MODULE;
        activePanelIndex: number;
        delta: number;
      }>,
    ) => {
      const MIN_NORMALIZED_RATIO = 0.1; // a panel is not allowed to shrink to 10% of total height
      const { page, delta, activePanelIndex } = action.payload;
      const activePanels = state[page].filter((item) => item.isActive);
      const topPanel = activePanels[activePanelIndex];
      const bottomPanel = activePanels[activePanelIndex + 1];
      if (!topPanel || !bottomPanel) return;
      const totalRatio = state[page].reduce(
        (acc, curr) => acc + (curr.isActive ? curr.ratio : 0),
        0,
      );

      // compute new ratios
      const minRatio = MIN_NORMALIZED_RATIO * totalRatio;
      const topPanelRatio = topPanel.ratio + delta;
      const bottomPanelRatio = bottomPanel.ratio - delta;

      if (topPanelRatio > minRatio && bottomPanelRatio > minRatio) {
        topPanel.ratio = topPanelRatio;
        bottomPanel.ratio = bottomPanelRatio;
      }
    },
    closePanel: (state, action: PayloadAction<ISidepanelPayload>) => {
      const { page, panelID } = action.payload;
      const currentPanel = state[page].find((item) => item.id === panelID);
      if (!currentPanel) return;
      currentPanel.isActive = false;
    },
    closeAllPanel: (state, action: PayloadAction<Pick<ISidepanelPayload, 'page'>>) => {
      const { page } = action.payload;
      state[page].map((item) => {
        if (item.isActive) item.isActive = false;
      });
    },
  },
  extraReducers: (builder) => {
    /**
     * Initialize redux state based on extensions config from backend
     */
    builder.addMatcher(
      extensionAPI.endpoints.getListModuleExtension.matchFulfilled,
      (state, { payload }) => {
        const buildInitialList = (
          extensions: IExtensionDTO[],
          oldList: ISidepanelReduxLayout[],
        ): ISidepanelReduxLayout[] => {
          return extensions.map((extension) => {
            const oldState = oldList.find((val) => val.id === extension.extensionType);
            return {
              id: extension.extensionType,
              isActive: extension.activeOnInit,
              ratio: oldState?.ratio ?? 1,
              config: extension,
            };
          });
        };

        Object.entries(payload).forEach(([page, extensionSet]) => {
          if (state[page as USER_MODULE].length === 0) {
            state[page as USER_MODULE] = buildInitialList(
              [...extensionSet].sort((a, b) => a.index - b.index),
              state[page as USER_MODULE],
            );
          }
        });
      },
    );
  },
});

// Action creators are generated for each case reducer function
export const { togglePanel, resizePanel, closeAllPanel } = dynamicSidepanelSlice.actions;

export const dynamicSidepanelReducer = dynamicSidepanelSlice.reducer;

// utility functions

/**
 * determine if we should remove extra panels if maximum number of panels is exceeded
 */
const onItemAdded = (
  state: Parameters<CaseReducer<IDynamicSidePanelReduxState>>[0],
  page: USER_MODULE,
  id: ISidepanelReduxLayout['id'],
) => {
  const numActivePanels = state[page].reduce(
    (acc, curr) => acc + (curr.isActive ? 1 : 0),
    0,
  );
  // remove extra panel that is not added panel
  if (numActivePanels > MAX_ACTIVE_PANELS) {
    // the panel to be removed is the last panel that is not the added panel
    const otherPanels = state[page].filter((item) => item.id != id);
    otherPanels[otherPanels.length - 1].isActive = false;
  }
};

/**
 * On item changed effect
 */
// const onItemChanged = (
//   state: Parameters<CaseReducer<IDynamicSidePanelReduxState>>[0],
//   page: PAGES_WITH_SIDEBAR,
// ) => {
//   resetPanelHeights(state[page]);
// };
