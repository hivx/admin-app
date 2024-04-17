import Mousetrap from 'mousetrap';
import { useEffect } from 'react';

import { HOTKEYS } from '@/config';

export const useKeybinds = (
  keybinds:
    | (typeof HOTKEYS)[keyof typeof HOTKEYS]['key']
    | (typeof HOTKEYS)[keyof typeof HOTKEYS]['key'][]
    | undefined,
  callback: (e: Mousetrap.ExtendedKeyboardEvent) => void,
  options: {
    disabled?: boolean;
  } = {},
) => {
  const { disabled } = options;
  useEffect(() => {
    if (!keybinds) return;

    if (!disabled) {
      Mousetrap.bind(keybinds, (event) => {
        event.preventDefault();
        event.stopPropagation();
        callback(event);
      });
    } else {
      Mousetrap.unbind(keybinds);
    }
    return () => {
      if (!disabled && keybinds) Mousetrap.unbind(keybinds);
    };
  }, [callback, disabled, keybinds]);
  return null;
};
