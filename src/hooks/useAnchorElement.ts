import { useCallback, useState } from 'react';

type AnchorEl = null | HTMLElement;
/**
 * Hook to set anchor element for menu to know where to position itself
 */
export const useAnchorElement = () => {
  const [anchorEl, setAnchorEl] = useState<AnchorEl>(null);

  const open = useCallback(
    (
      event: React.MouseEvent<HTMLElement> | React.FocusEvent<HTMLElement> | null = null,
      target: HTMLElement | null = null,
    ) => {
      if (target) setAnchorEl(target);
      else if (event) {
        setAnchorEl(event.currentTarget);
      }
    },
    [],
  );
  const close = useCallback(() => {
    setAnchorEl(null);
  }, []);
  const toggle = useCallback(
    (
      event: React.MouseEvent<HTMLElement> | null = null,
      target: HTMLElement | null = null,
    ) => {
      setAnchorEl((prev) => (prev ? null : event?.currentTarget || target));
    },
    [],
  );

  return { anchorEl, isOpen: !!anchorEl, open, close, toggle };
};
