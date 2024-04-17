import { MouseEventHandler, useCallback, useEffect, useState, useRef } from 'react';

import { IMousePosition, useMousePosition } from './useMousePosition';

export type DragEventHandler = (e: MouseEvent, delta: IMousePosition) => void;

export type IUseDragEventsProps = {
  /**
   * Runs when handleDragStart gets triggered
   */
  onDragStart?: (e: React.MouseEvent) => void;
  /**
   * Runs when drag ends and provide a mouse position delta in X and Y direction
   */
  onDragEnd?: DragEventHandler;
  /**
   * Runs on every mouse move changed and user is dragging
   */
  onUpdate?: DragEventHandler;
};

/**
 * Handle mouse dragging logic and tracks mouse position
 * When user starts dragging, the initial mouse position will be recorded
 * A delta position from initial mouse position and current mouse position will be calculated
 * and used in callbacks
 * NOTE: WILL RE-RENDER COMPONENT WHENEVER MOUSE POSITION IS UPDATED
 * Reference: https://www.joshwcomeau.com/snippets/react-hooks/use-mouse-position/
 */
export const useDragEvents = (props: IUseDragEventsProps) => {
  const { onDragStart, onDragEnd, onUpdate } = props;
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [initialPosition, setInitialPosition] = useState<IMousePosition>({
    x: 0,
    y: 0,
  });
  const mousePosition = useMousePosition({ isActive: isDragging });
  // useRef to avoid re triggering UseEffect bellow
  const deltaRef = useRef<IMousePosition>({ x: 0, y: 0 });
  deltaRef.current = getDeltaMousePosition(mousePosition, initialPosition);

  const handleDragStart: MouseEventHandler<HTMLDivElement> = useCallback(
    (e) => {
      setIsDragging(true);
      setInitialPosition({ x: e.clientX, y: e.clientY });
      e.preventDefault();
      e.stopPropagation();
      onDragStart && onDragStart(e);
    },
    [onDragStart],
  );

  const handleDragEnd = useCallback(
    (e: MouseEvent) => {
      if (isDragging) {
        setIsDragging(false);
        onDragEnd && onDragEnd(e, deltaRef.current);
      }
    },
    [isDragging, onDragEnd],
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (isDragging) {
        onUpdate && onUpdate(e, { x: e.movementX, y: e.movementY });
      }
    },
    [isDragging, onUpdate],
  );

  useEffect(() => {
    let iframes: NodeListOf<HTMLIFrameElement>;
    if (isDragging) {
      window.addEventListener('mouseup', handleDragEnd);
      // select all iframes in the window to add drag end callback
      iframes = registerIframesEvents('mouseup', handleDragEnd as EventListener);
    }

    return () => {
      window.removeEventListener('mouseup', handleDragEnd);
      if (iframes) {
        unregisterIframesEvents(iframes, 'mouseup', handleDragEnd as EventListener);
      }
    };
  }, [handleDragEnd, isDragging]);

  useEffect(() => {
    let iframes: NodeListOf<HTMLIFrameElement>;
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      // select all iframes in the window to add mouse move callback
      iframes = registerIframesEvents('mousemove', handleMouseMove as EventListener);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (iframes) {
        unregisterIframesEvents(iframes, 'mousemove', handleMouseMove as EventListener);
      }
    };
  }, [handleMouseMove, isDragging]);

  return {
    handleDragStart,
    initialPosition,
    mousePosition,
    isDragging,
    delta: deltaRef.current,
  };
};

const getDeltaMousePosition = (
  currentMousePos: IMousePosition,
  prevMousePos: IMousePosition,
): IMousePosition => {
  const delta = {
    x: (currentMousePos.x ?? 0) - (prevMousePos.x ?? 0),
    y: (currentMousePos.y ?? 0) - (prevMousePos.y ?? 0),
  };
  return delta;
};

/**
 * Register every iframe in the window with a specific callback and event
 */
const registerIframesEvents = (
  eventType: Parameters<typeof window.addEventListener>[0],
  callback: Parameters<typeof window.addEventListener>[1],
) => {
  const iframes = document.querySelectorAll('iframe');
  iframes.forEach((frame) => {
    try {
      frame.contentWindow?.addEventListener(eventType, callback);
    } catch (e) {
      undefined;
    }
  });
  return iframes;
};

/**
 * Unregister every iframe in the window with a specific callback and event
 */
const unregisterIframesEvents = (
  iframes: NodeListOf<HTMLIFrameElement>,
  eventType: Parameters<typeof window.addEventListener>[0],
  callback: Parameters<typeof window.addEventListener>[1],
) => {
  iframes.forEach((frame) => {
    try {
      frame.contentWindow?.removeEventListener(eventType, callback);
    } catch (e) {
      undefined;
    }
  });
};
