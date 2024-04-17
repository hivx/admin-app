import { useLocation, matchPath } from 'react-router-dom';

type ItemWithRoute = {
  route: string | null;
};
/**
 * Select node items based on its route
 * Matching is based on matchPath of react-router-dom
 */
export const useMatchItemsByPathname = <T extends ItemWithRoute>(items: T[]) => {
  const { pathname } = useLocation();

  const matchedItems = items.filter(
    (item) => item.route && Boolean(matchPath(`${item.route}/*`, pathname)),
  );

  return matchedItems;
};
