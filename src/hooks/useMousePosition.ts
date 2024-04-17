import { useEffect, useState } from 'react';

export type IMousePosition = {
  x: number | null;
  y: number | null;
};

type UseMousePosition = {
  /**
   * Only update mouse position when this flag is true
   * @default true
   */
  isActive?: boolean;
};
/**
 * https://www.joshwcomeau.com/snippets/react-hooks/use-mouse-position/
 */
export const useMousePosition = (props: UseMousePosition = {}) => {
  const { isActive = true } = props;
  const [mousePosition, setMousePosition] = useState<IMousePosition>({ x: 0, y: 0 });
  useEffect(() => {
    const updateMousePosition = (ev: MouseEvent) => {
      isActive && setMousePosition({ x: ev.clientX, y: ev.clientY });
    };
    window.addEventListener('mousemove', updateMousePosition);
    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
    };
  }, [isActive]);
  return mousePosition;
};
