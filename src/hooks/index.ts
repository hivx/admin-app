import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { AppDispatch, RootState } from '@/stores/redux';

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export * from './useDisclosure';
export * from './useLocalStorage';
export * from './useTranslate';
export * from './useAnchorElement';
export * from './useToggleTheme';
export * from './useDynamicFields';
export * from './useTablePagination';
export * from './useTableSortingState';
export * from './usePrevious';
export * from './useMousePosition';
export * from './useDragEvents';
export * from './useDebounce';
export * from './useKeybinds';
