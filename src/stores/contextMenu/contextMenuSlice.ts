/**
 * Handle Context Menu (Right Click menu or Drop down menu) state
 */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ValueOf } from 'type-fest';

import { RootState } from '@/stores/redux';
import { IOrderDTO, IDepartmentDTO, IOrderFileDTO } from '@/types/dto';

type MenuID = string;
/**
 * The state that is supplied to a menu
 * For example, right click menu under Order List table receives an OrderDTO object as the data
 * for that menu, therefore we define OrderListTable: IOrderDTO
 */
type MenuContext = {
  OrderListTable: IOrderDTO;
  DepartmentTable: IDepartmentDTO;
  AttachmentTable: IOrderFileDTO;
};
/**
 * The state for EACH menuID
 */
export type IContextMenuState = {
  isOpen: boolean;
  /**
   * The value avalable to Context Menu component
   */
  meta?: ValueOf<MenuContext>;
};

type ContextMenuStoreState = {
  /**
   * There may be several different Context menu available
   * we use an object to manage these
   */
  menuState: Record<MenuID, IContextMenuState>;
  /**
   *  Anchor Coordinates
   */
  position: {
    x: number;
    y: number;
  };
};

/**
 * Action payload type
 */
type MenuPayloadOpenAction = {
  menuID: MenuID;
  meta?: IContextMenuState['meta'];
};

const initialState: ContextMenuStoreState = {
  menuState: {
    DEFAULT_MENU_ID: {
      isOpen: false,
    },
  },
  position: {
    x: 0,
    y: 0,
  },
};

export const DEFAULT_MENU_ID = 'contextmenu';

export const CONTEXT_MENU_REDUCER = 'contextMenu';

export const contextMenuSlice = createSlice({
  name: CONTEXT_MENU_REDUCER,
  initialState,
  reducers: {
    updateContextMenuPosition: (
      state,
      action: PayloadAction<{ x: number; y: number }>,
    ) => {
      const { x, y } = action.payload;
      state.position.x = x;
      state.position.y = y;
    },
    open: (state, action: PayloadAction<MenuPayloadOpenAction>) => {
      const { menuID, meta } = action.payload;
      state.menuState[menuID] = {
        isOpen: true,
        meta,
      };
    },
    close: (state, action: PayloadAction<MenuID>) => {
      const menuID = action.payload;
      if (state.menuState[menuID]) {
        state.menuState[menuID].isOpen = false;
      }
    },
    toggle: (state, action: PayloadAction<MenuID>) => {
      const menuID = action.payload;
      if (state.menuState[menuID]) {
        state.menuState[menuID].isOpen = !state.menuState[menuID].isOpen;
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  updateContextMenuPosition,
  open: openContextMenu,
  close: closeContextMenu,
  toggle: toggleContextMenu,
} = contextMenuSlice.actions;

export const contextMenuReducer = contextMenuSlice.reducer;

// For simple reducer, we can include getters here
// New naming convention: https://redux.js.org/style-guide/#name-selector-functions-as-selectthing
export const selectContextMenuOpenState = (menuID?: string) => (state: RootState) =>
  state.contextMenu.menuState[menuID || DEFAULT_MENU_ID]?.isOpen || false;
export const selectContextMenuPosition = (state: RootState) => state.contextMenu.position;

export const selectContextMenuMetadata =
  <T extends IContextMenuState['meta']>(menuID?: string) =>
  (state: RootState) =>
    state.contextMenu.menuState[menuID || DEFAULT_MENU_ID]?.meta as T;
